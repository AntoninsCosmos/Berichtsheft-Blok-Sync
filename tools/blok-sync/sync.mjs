// BLok-Sync: Anmeldung erfolgt manuell im sichtbaren Browser, das Profil bleibt lokal in ./profile.
// Verwendung:
//   node sync.mjs login
//   node sync.mjs inspect
//   node sync.mjs plan --from 2026-01-05 --to 2026-01-09
//   node sync.mjs fill --from 2026-01-05 --to 2026-01-09 [--force]
import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline/promises';

const here = dirname(fileURLToPath(import.meta.url));
const BLOK_URL = 'https://www.online-ausbildungsnachweis.de/blok/';
const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const LOCATION = { Berufsschule: '0', default: '1' };
const PRESENCE = { Anwesend: '0', Berufsschule: '0', Krank: '1', Urlaub: '3' };

const [mode, ...rest] = process.argv.slice(2);
const arg = (name) => { const i = rest.indexOf(`--${name}`); return i >= 0 ? rest[i + 1] : undefined; };
const force = rest.includes('--force');

function loadEntries() {
  const from = arg('from') ?? '0000-00-00';
  const to = arg('to') ?? '9999-99-99';
  return JSON.parse(readFileSync(join(here, 'entries.json'), 'utf8'))
    .filter(e => e.date >= from && e.date <= to);
}

const hoursText = (h) => (Math.round(h * 100) / 100).toString().replace('.', ',');

function mondayOf(dateStr) {
  const d = new Date(`${dateStr}T12:00:00`);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d;
}
const fmtDe = (d) => `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;

if (mode === 'plan') {
  for (const e of loadEntries()) {
    const day = DAYS[new Date(`${e.date}T12:00:00`).getDay()];
    console.log(`${e.date} (${day}) Ort=${e.status === 'Berufsschule' ? 'Berufsschule' : 'Ausbildungsbetrieb'} Status=${e.status}`);
    for (const r of e.rows) console.log(`   ${hoursText(r.hours).padStart(5)} h  [${r.quals.join(', ')}]  ${r.text}`);
  }
  process.exit(0);
}

const ctx = await chromium.launchPersistentContext(join(here, 'profile'), {
  // Lokal installiertes Edge statt Playwright-Download (Firmenproxy blockiert den Download).
  channel: 'msedge',
  headless: false,
  viewport: { width: 1400, height: 1000 },
});
const page = ctx.pages()[0] ?? await ctx.newPage();
await page.goto(BLOK_URL);
const rl = createInterface({ input: process.stdin, output: process.stdout });

async function settle() {
  await page.waitForTimeout(250);
  await page.waitForLoadState('networkidle');
}

async function currentWeekStart() {
  return (await page.locator('.calendar_switch span.time').first().innerText()).trim();
}

async function gotoWeek(monday) {
  const target = fmtDe(monday);
  for (let i = 0; i < 80; i++) {
    const cur = await currentWeekStart();
    if (cur === target) return;
    const [d, m, y] = cur.split('.').map(Number);
    const forward = new Date(y, m - 1, d) < monday;
    await page.locator(forward ? 'a.timeforward' : 'a.timebackward').click();
    await page.waitForFunction((c) => document.querySelector('.calendar_switch span.time')?.textContent.trim() !== c, cur);
    await settle();
  }
  throw new Error(`Woche ${target} nicht erreicht.`);
}

async function setQualifications(globalIndex, quals) {
  await page.locator('a.entw_arrow').nth(globalIndex).click();
  const dialog = page.locator('.k-window:visible', { hasText: 'Qualifikationen zuordnen' });
  await dialog.waitFor();
  const rows = dialog.locator('table.selection_options_content_list > tbody > tr');
  const count = await rows.count();
  for (let i = 0; i < count; i++) {
    const row = rows.nth(i);
    const code = (await row.locator('strong').first().innerText()).trim();
    const checked = (await row.locator('input[name$=":colLnk:inp"]').inputValue()) === '1';
    if (checked !== quals.includes(code)) await row.locator('a.selection_options').click();
  }
  await dialog.locator('button[name$="okContainer:closeOK"]').click();
  await dialog.waitFor({ state: 'hidden' });
  await settle();
}

async function fillDay(entry) {
  const day = DAYS[new Date(`${entry.date}T12:00:00`).getDay()];
  const rowTexts = page.locator(`textarea[name^="tableComp:${day}:inputs:"][name$=":report"]`);
  const existing = (await rowTexts.evaluateAll(els => els.map(e => e.value))).filter(v => v.trim());
  if (existing.length && !force) {
    console.log(`  ${entry.date}: bereits ${existing.length} Eintrag/Einträge vorhanden – übersprungen (--force zum Überschreiben).`);
    return;
  }

  await page.selectOption(`select[name="tableComp:${day}:trspaceplus:location"]`, entry.status === 'Berufsschule' ? LOCATION.Berufsschule : LOCATION.default);
  await settle();
  await page.selectOption(`select[name="tableComp:${day}:trspaceplus:presence"]`, PRESENCE[entry.status]);
  await settle();

  for (let i = 0; i < entry.rows.length; i++) {
    const r = entry.rows[i];
    if (i >= await rowTexts.count()) {
      const before = await rowTexts.count();
      await page.locator(`a[name="tableComp:${day}:addRow"]`).click();
      await page.waitForFunction(([sel, n]) => document.querySelectorAll(sel).length > n,
        [`textarea[name^="tableComp:${day}:inputs:"][name$=":report"]`, before]);
      await settle();
    }
    const text = rowTexts.nth(i);
    const name = await text.getAttribute('name');
    await text.fill(r.text);
    await text.blur();
    await settle();
    const has = page.locator(`input[name="${name.replace(/:report$/, ':has')}"]`);
    await has.fill(hoursText(r.hours));
    await has.blur();
    await settle();
    // Qualifikations-Buttons stehen im DOM in derselben Reihenfolge wie die Textfelder.
    const globalIndex = await page.locator('textarea.report').evaluateAll((els, n) => els.findIndex(e => e.name === n), name);
    await setQualifications(globalIndex, r.quals);
  }

  const saveState = page.locator(`input[name="tableComp:${day}:trspaceplus:savestatecont:savestatefield"]`).locator('xpath=..');
  if (/unsaved/.test(await saveState.getAttribute('class') ?? '')) {
    await saveState.locator('a.savebutton').click();
    await settle();
  }
  console.log(`  ${entry.date}: ${entry.status}, ${entry.rows.length} Zeile(n) eingetragen.`);
}

if (mode === 'login') {
  await rl.question('Bitte im Browser anmelden, dann hier Enter drücken ... ');
} else if (mode === 'inspect') {
  await rl.question('Im Browser Berichtsheft > Woche öffnen, Bearbeitungsmodus aktivieren und den Qualifikationen-Dialog einer Zeile offen lassen. Dann Enter ... ');
  const dir = join(here, 'inspect');
  mkdirSync(dir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  writeFileSync(join(dir, `week-${stamp}.html`), await page.content());
  await page.screenshot({ path: join(dir, `week-${stamp}.png`), fullPage: true });
  console.log(`DOM und Screenshot unter tools/blok-sync/inspect/ gespeichert (${stamp}).`);
} else if (mode === 'fill') {
  const entries = loadEntries();
  if (!entries.length) throw new Error('Keine Einträge im gewählten Zeitraum.');
  await rl.question('Im Browser Berichtsheft > Woche öffnen (angemeldet), dann Enter ... ');
  const editmode = page.locator('#editmodeCheck');
  if (!(await editmode.isChecked())) { await editmode.check(); await settle(); }

  const byWeek = new Map();
  for (const e of entries) {
    const key = fmtDe(mondayOf(e.date));
    if (!byWeek.has(key)) byWeek.set(key, { monday: mondayOf(e.date), days: [] });
    byWeek.get(key).days.push(e);
  }
  for (const [key, week] of byWeek) {
    console.log(`Woche ab ${key}`);
    await gotoWeek(week.monday);
    for (const e of week.days) await fillDay(e);
  }
  await rl.question('Fertig. Bitte Ergebnis im Browser prüfen (Woche NICHT automatisch freigegeben). Enter schließt den Browser ... ');
} else {
  console.log('Verwendung: node sync.mjs login | inspect | plan|fill --from YYYY-MM-DD --to YYYY-MM-DD [--force]');
}
rl.close();
await ctx.close();
