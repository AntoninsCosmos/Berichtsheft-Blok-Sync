// Liest die Tagesdateien (2026/KW*/MM-DD-YYYY.md) und erzeugt entries.json für den BLok-Sync.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const QUAL = /^[A-F]\.\d+$/;

function parseDay(file) {
  const lines = readFileSync(file, 'utf8').split(/\r?\n/);
  const start = lines.indexOf('## Zusammenfassung nach Qualifikation');
  if (start < 0) return null;
  const rows = [];
  for (const line of lines.slice(start + 1)) {
    if (!line.startsWith('|') || line.startsWith('|---') || line.startsWith('| Qualifikation')) continue;
    const [q, text, dauer] = line.split('|').slice(1).map(s => s.trim());
    const [h, m] = dauer.split(':').map(Number);
    rows.push({ quals: q.split(',').map(s => s.trim()).filter(s => QUAL.test(s)), text, hours: h + m / 60 });
  }
  let status = 'Anwesend';
  if (rows.length === 1 && rows[0].quals.length === 0) {
    const t = rows[0].text;
    if (/Berufsschul/i.test(t)) status = 'Berufsschule';
    else if (/Urlaub/i.test(t)) status = 'Urlaub';
    else if (/Krank/i.test(t)) status = 'Krank';
  }
  return { status, rows: status === 'Anwesend' ? rows : [] };
}

const entries = [];
for (const year of readdirSync(root).filter(n => /^\d{4}$/.test(n))) {
  for (const kw of readdirSync(join(root, year)).filter(n => /^KW\d+$/.test(n))) {
    const dir = join(root, year, kw);
    if (!statSync(dir).isDirectory()) continue;
    for (const f of readdirSync(dir).filter(n => /^\d{2}-\d{2}-\d{4}\.md$/.test(n))) {
      const day = parseDay(join(dir, f));
      if (!day) continue;
      const [mm, dd, yyyy] = f.slice(0, 10).split('-');
      entries.push({ date: `${yyyy}-${mm}-${dd}`, ...day });
    }
  }
}
entries.sort((a, b) => a.date.localeCompare(b.date));
writeFileSync(new URL('./entries.json', import.meta.url), JSON.stringify(entries, null, 2));
console.log(`${entries.length} Tage nach entries.json geschrieben.`);
