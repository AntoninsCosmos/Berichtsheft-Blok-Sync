# Berichtsheft-Automatisierung

Werkzeuge, um den IHK-Ausbildungsnachweis (Fachinformatiker) aus gebuchten Zeiteinträgen zu erzeugen und in [BLok – online-ausbildungsnachweis.de](https://www.online-ausbildungsnachweis.de/) einzutragen.

```
Zeiterfassung (Excel/CSV)
        │  Copilot-Skill "berichtsheft-qualifikation"
        ▼
2026/KWnn/MM-DD-YYYY.md          Tagesdateien mit Zusammenfassung nach Qualifikation
2026/KWnn/Wochenzusammenfassung.md
        │  tools/blok-sync/parse.mjs
        ▼
tools/blok-sync/entries.json
        │  tools/blok-sync/sync.mjs (Playwright + Edge)
        ▼
BLok – Wochenansicht (Text, Stunden, Qualifikationen, Ort, Anwesenheit)
```

## Inhalt

| Pfad | Zweck |
|---|---|
| [.github/skills/berichtsheft-qualifikation/SKILL.md](.github/skills/berichtsheft-qualifikation/SKILL.md) | GitHub-Copilot-Skill: ordnet Zeiteinträge den Qualifikationen zu und schreibt Tages- und Wochenzusammenfassungen |
| [Qualifikationen.md](Qualifikationen.md) | Ausbildungsrahmenplan (Codes `A.1` … `F.5`) als Grundlage für die Zuordnung |
| [tools/blok-sync/parse.mjs](tools/blok-sync/parse.mjs) | Liest die Tagesdateien und erzeugt `entries.json` |
| [tools/blok-sync/sync.mjs](tools/blok-sync/sync.mjs) | Trägt die Einträge per Browser-Automatisierung in BLok ein |

Die persönlichen Daten (`2026/`, CSV-Exporte) sind per [.gitignore](.gitignore) vom Repository ausgeschlossen.

## 1. Tagesdateien erzeugen (Copilot-Skill)

Voraussetzung: VS Code mit GitHub Copilot (Agent-Modus). Der Skill wird über `.github/skills/` automatisch erkannt.

1. Zeiteinträge eines Tages (Spalten `Beschreibung`, `Projekt`, `Projekt Beschaffungsnummer`, `Start`, `Ende`, `Dauer`) in eine Datei `2026/KW<nn>/MM-DD-YYYY.md` einfügen – als Tab-Text, Tabelle oder Screenshot.
2. Im Chat z. B. schreiben: *„Berichtsheft für 23.06 nach Qualifikation sortieren“*.
3. Der Skill
   - schreibt die Rohdaten als Markdown-Tabelle,
   - ordnet jede Tätigkeit passenden Qualifikationen zu, fasst gleichartige Einträge zusammen und formuliert ganze Sätze,
   - hängt `## Zusammenfassung nach Qualifikation` an (`Qualifikation | Beschreibung | Dauer | Industriezeit`, auf Viertelstunden gerundet),
   - aktualisiert `Wochenzusammenfassung.md` der Kalenderwoche.

Regeln (Pausen, Platzhalter-Projekt `Intern`, wiederkehrende Ausbilder-Termine usw.) stehen im [SKILL.md](.github/skills/berichtsheft-qualifikation/SKILL.md) und lassen sich dort anpassen.

### Abwesenheitstage

Schul-, Urlaubs- und Krankheitstage werden als Tagesdatei mit einer einzigen Zusammenfassungszeile ohne Qualifikation angelegt; der Beschreibungstext entscheidet über den Status:

```markdown
## Zusammenfassung nach Qualifikation

| Qualifikation | Beschreibung | Dauer | Industriezeit |
|---|---|---|---|
| – | Berufsschule | 08:00 | 8,00 |
```

Erkannt werden Texte mit `Berufsschul…`, `Urlaub` und `Krank…`. Feiertage bekommen keine Tagesdatei.

## 2. In BLok eintragen (`tools/blok-sync`)

### Einrichtung

Voraussetzungen: Node.js ≥ 18 und Microsoft Edge (das Tool nutzt das installierte Edge, weil der Playwright-Browser-Download hinter Firmenproxys oft scheitert).

```powershell
cd tools/blok-sync
npm install
node sync.mjs login      # einmalig im geöffneten Browser bei BLok anmelden, dann Enter
```

Die Anmeldung bleibt im lokalen Browserprofil `tools/blok-sync/profile/` gespeichert (nicht versioniert). Zugangsdaten werden vom Tool weder gelesen noch gespeichert.

### Ablauf

```powershell
node parse.mjs                                               # entries.json aus den Tagesdateien erzeugen
node sync.mjs plan --from 2026-07-21 --to 2026-07-24         # nur anzeigen, was eingetragen würde
node sync.mjs fill --from 2026-07-21 --to 2026-07-24         # eintragen
```

Bei `fill` öffnet sich Edge. In BLok die Wochenansicht des Berichtshefts öffnen und im Terminal Enter drücken. Das Tool

- aktiviert den Bearbeitungsmodus und blättert per Wochenpfeil zur passenden Kalenderwoche,
- setzt pro Tag **Ort** und **Anwesenheit**:

  | Status in der Tagesdatei | Ort | Anwesenheit |
  |---|---|---|
  | Arbeitstag | Ausbildungsbetrieb | Anwesend |
  | Berufsschule | Berufsschule | Anwesend |
  | Urlaub | Ausbildungsbetrieb | Urlaub |
  | Krank | Ausbildungsbetrieb | Arbeitsunfähig |

- legt je Zusammenfassungszeile eine Tätigkeit an (Text, Stunden als Dezimalzahl mit Komma, z. B. `1,5`) und hakt im Dialog „Qualifikationen zuordnen“ die passenden Codes an,
- klickt bei Bedarf „Nochmal speichern!“.

Sicherheitsregeln:

- Tage, die in BLok bereits Text enthalten, werden **übersprungen**. Mit `--force` werden sie überschrieben.
- Die Woche wird **nie** automatisch freigegeben/unterschrieben – das bleibt manuell.
- Empfehlung: zuerst eine einzelne Woche eintragen und in BLok prüfen, dann größere Zeiträume.

### Fehlersuche

```powershell
node sync.mjs inspect
```

speichert HTML und Screenshot der aktuellen BLok-Seite unter `tools/blok-sync/inspect/` (nicht versioniert). Damit lassen sich geänderte Selektoren nachvollziehen; die verwendeten Selektoren stehen in [sync.mjs](tools/blok-sync/sync.mjs) (`name`-Attribute wie `tableComp:<tag>:inputs:<n>:report`, da BLok dynamische IDs verwendet).
