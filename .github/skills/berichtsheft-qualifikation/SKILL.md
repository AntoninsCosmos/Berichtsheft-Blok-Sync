---
name: berichtsheft-qualifikation
description: 'Sortiert und fasst tab-getrennte Berichtsheft-Zeiteinträge (Beschreibung, Projekt, Start, Ende, Dauer) nach Ausbildungs-Qualifikationen aus Qualifikationen.md zusammen und pflegt eine Wochenzusammenfassung. Nutzen bei: Berichtsheft-Eintrag ordnen, nach Qualifikation gruppieren, IHK-Ausbildungsnachweis, Zeiten pro Qualifikation summieren, Tagesbericht auswerten, Wochenübersicht erstellen.'
argument-hint: 'Datum (z. B. 23.06) oder Pfad zur Tages-Datei mit tab-getrennten Zeiteinträgen'
---

# Berichtsheft nach Qualifikation sortieren

Ordnet die tab-getrennten Zeiteinträge einer Tagesdatei (Spalten: `Beschreibung`, `Projekt`,
`Projekt Beschaffungsnummer`, `Start`, `Ende`, `Dauer`) den Qualifikationen aus
[Qualifikationen.md](../../../Qualifikationen.md) zu und hängt eine nach Qualifikation sortierte
Zusammenfassung an dieselbe Datei an. In der Zusammenfassung werden Einträge nicht nur bei exakt
gleicher Beschreibung zusammengefasst, sondern auch dann, wenn sie fachlich zusammenhängen oder
schlicht die gleiche(n) Qualifikation(en) bedienen (auch wenn sie inhaltlich nichts miteinander zu
tun haben); ihre Dauern werden addiert. Jede zusammengefasste oder eigenständige Beschreibung wird
als vollständiger Satz formuliert und nennt, sofern in der Rohzeile ein echtes Projekt (bzw. Ticket)
angegeben war, dieses; reine Buchungs-Platzhalter der Zeiterfassung wie `Intern` sind kein echtes
Projekt und werden nicht als Projekt genannt. Zusätzlich wird pro Kalenderwoche eine Wochenzusammenfassung
(`Wochenzusammenfassung.md`) gepflegt, die die Qualifikations-Zusammenfassung jedes bereits
verarbeiteten Tages der Woche bündelt.

## Wann verwenden

- Nutzer verweist auf eine Tagesdatei mit tab-getrennten Zeiteinträgen (Excel-Export) und möchte
  sie nach Qualifikationsnummern (z. B. `A.1`, `B.2`, `F.3`) ordnen.
- Nutzer möchte wissen, wie viel Zeit auf welche Ausbildungs-Qualifikation entfiel.
- Nutzer möchte eine Wochenübersicht über die bereits verarbeiteten Tage einer Kalenderwoche.

## Ordnerstruktur

Tagesdateien liegen unter `<Jahr>/KW<Kalenderwoche>/<MM-TT-JJJJ>.md`, z. B.
`2026/KW26/06-22-2026.md`. Es werden ausschließlich Markdown-Dateien (`.md`-Endung) angelegt.
Die Kalenderwoche ist die ISO-8601-Kalenderwoche des Datums. Nennt der Nutzer nur ein Datum
(z. B. „23.06“ oder „23.06.2026“), Jahr aus dem Kontext bzw. aktuellen Datum ableiten, die
ISO-Kalenderwoche berechnen und die Datei unter diesem Pfad suchen bzw. anlegen.

## Regeltermine (konfigurierbar)

Dieser Abschnitt dient als zentrale, leicht wartbare Regelbasis fuer wiederkehrende Termine.
Bei Bedarf hier Eintraege ergaenzen, aendern oder entfernen, ohne die Ablaufregeln an mehreren
Stellen anfassen zu muessen.

- **Entwicklerunterstuetzung (donnerstags)**
  - **Terminzweck**: Azubi-Rueckfragen zu aktuellen Themen klaeren und fachlichen Support einholen.
  - **Qualifikation**: Primaer `A.1`.
  - **Formulierung**: Als Rueckfragen-/Supporttermin formulieren.
  - **Abgrenzung**: Keine Aufgabenplanung oder Wochenplanung hineininterpretieren, sofern nicht
    explizit genannt.
- **Azubi Aufgabenplanung (dienstags)**
  - **Terminzweck**: Aufgaben abstimmen und die Woche planen.
  - **Qualifikation**: Primaer `A.1`.
  - **Formulierung**: Als Aufgabenabstimmungs-/Planungstermin formulieren.
  - **Abgrenzung**: Nicht als technische Umsetzungsarbeit formulieren, sofern nicht explizit genannt.

## Qualifikationen (Referenz)

Quelle: [Qualifikationen.md](../../../Qualifikationen.md). Jede `## X.N Titel (...)`-Überschrift
ist ein Qualifikationscode (z. B. `A.1`); die Unterpunkte a)-i) darunter beschreiben typische
Tätigkeiten dieser Qualifikation. Nachfolgend eingebettet, damit der Skill auch ohne Zugriff auf
diese Datei (z. B. in einem anderen Repo) nutzbar ist:

```markdown
# Qualifikationen

## A.1 Planen, Vorbereiten und Durchführen von Arbeitsaufgaben in Abstimmung mit den kundenspezifischen Geschäfts- und Leistungsprozessen (§ 4 Absatz 2 Nummer 1)

    a) Grundsätze und Methoden des Projektmanagements anwenden
    b) Auftragsunterlagen und Durchführbarkeit des Auftrags prüfen, insbesondere in Hinblick auf rechtliche, wirtschaftliche und terminliche Vorgaben, und den Auftrag mit den betrieblichen Prozessen und Möglichkeiten abstimmen
    c) Zeitplan und Reihenfolge der Arbeitsschritte für den eigenen Arbeitsbereich festlegen
    d) Termine planen und abstimmen sowie Terminüberwachung durchführen
    e) Probleme analysieren und als Aufgabe definieren sowie Lösungsalternativen entwickeln und beurteilen
    f) Arbeits- und Organisationsmittel wirtschaftlich und ökologisch unter Berücksichtigung der vorhandenen Ressourcen und der Budgetvorgaben einsetzen
    g) Aufgaben im Team sowie mit internen und externen Kunden und Kundinnen planen und abstimmen
    h) betriebswirtschaftlich relevante Daten erheben und bewerten und dabei Geschäfts- und Leistungsprozesse berücksichtigen
    i) eigene Vorgehensweise sowie die Aufgabendurchführung im Team reflektieren und bei der Verbesserung der Arbeitsprozesse mitwirken

## A.2 Informieren und Beraten von Kunden und Kundinnen (§ 4 Absatz 2 Nummer 2)

    a) im Rahmen der Marktbeobachtung Preise, Leistungen und Konditionen von Wettbewerbern vergleichen
    b) Bedarfe von Kunden und Kundinnen feststellen sowie Zielgruppen unterscheiden
    c) Kunden und Kundinnen unter Beachtung von Kommunikationsregeln informieren sowie Sachverhalte präsentieren und dabei deutsche und englische Fachbegriffe anwenden
    d) Maßnahmen für Marketing und Vertrieb unterstützen
    e) Informationsquellen auch in englischer Sprache aufgabenbezogen auswerten und für die Kundeninformation nutzen
    f) Gespräche situationsgerecht führen und Kunden und Kundinnen unter Berücksichtigung der Kundeninteressen beraten
    g) Kundenbeziehungen unter Beachtung rechtlicher Regelungen und betrieblicher Grundsätze gestalten
    h) Daten und Sachverhalte interpretieren, multimedial aufbereiten und situationsgerecht unter Nutzung digitaler Werkzeuge und unter Berücksichtigung der betrieblichen Vorgaben präsentieren

## A.3  Beurteilen marktgängiger IT-Systeme und kundenspezifischer Lösungen (§ 4 Absatz 2 Nummer 3)

    a) marktgängige IT-Systeme für unterschiedliche Einsatzbereiche hinsichtlich Leistungsfähigkeit, Wirtschaftlichkeit und Barrierefreiheit beurteilen
    b) Angebote zu IT-Komponenten, IT-Produkten und IT-Dienstleistungen einholen und bewerten sowie Spezifikationen und Konditionen vergleichen
    c) technologische Entwicklungstrends von IT-Systemen feststellen sowie ihre wirtschaftlichen, sozialen und beruflichen Auswirkungen aufzeigen
    d) Veränderungen von Einsatzfeldern für IT-Systeme aufgrund technischer, wirtschaftlicher und gesellschaftlicher Entwicklungen feststellen

## A.4  Entwickeln, Erstellen und Betreuen von IT-Lösungen (§ 4 Absatz 2 Nummer 4)

    a) IT-Systeme zur Bearbeitung betrieblicher Fachaufgaben analysieren sowie unter Beachtung insbesondere von Lizenzmodellen, Urheberrechten und Barrierefreiheit konzeptionieren, konfigurieren, testen und dokumentieren
    b) Programmiersprachen, insbesondere prozedurale und objektorientierte Programmiersprachen, unterscheiden
    c) systematisch Fehler erkennen, analysieren und beheben
    d) Algorithmen formulieren und Anwendungen in einer Programmiersprache erstellen
    e) Datenbankmodelle unterscheiden, Daten organisieren und speichern sowie Abfragen erstellen

## A.5 Durchführen und Dokumentieren von qualitätssichernden Maßnahmen (§ 4 Absatz 2 Nummer 5)

    a) betriebliche Vorgaben und rechtliche Regelungen zur IT-Sicherheit und zum Datenschutz einhalten
    b) Sicherheitsanforderungen von IT-Systemen analysieren und Maßnahmen zur IT-Sicherheit ableiten, abstimmen, umsetzen und evaluieren
    c) Bedrohungsszenarien erkennen und Schadenspotenziale unter Berücksichtigung wirtschaftlicher und technischer Kriterien einschätzen
    d) Kunden und Kundinnen im Hinblick auf Anforderungen an die IT-Sicherheit und an den Datenschutzberaten
    e) Wirksamkeit und Effizienz der umgesetzten Maßnahmen zur IT-Sicherheit und zum Datenschutz prüfen

## A.6 Umsetzen, Integrieren und Prüfen von Maßnahmen zur IT-Sicherheit und zum Datenschutz (§ 4 Absatz 2 Nummer 6)

    a) betriebliche Vorgaben und rechtliche Regelungen zur IT-Sicherheit und zum Datenschutz einhalten
    b) Sicherheitsanforderungen von IT-Systemen analysieren und Maßnahmen zur IT-Sicherheit ableiten, abstimmen, umsetzen und evaluieren
    c) Bedrohungsszenarien erkennen und Schadenspotenziale unter Berücksichtigung wirtschaftlicher und technischer Kriterien einschätzen
    d) Kunden und Kundinnen im Hinblick auf Anforderungen an die IT-Sicherheit und an den Datenschutzberaten
    e) Wirksamkeit und Effizienz der umgesetzten Maßnahmen zur IT-Sicherheit und zum Datenschutz prüfen

## A.7 Erbringen der Leistungen und Auftragsabschluss (§ 4 Absatz 2 Nummer 7)

    a) Leistungen nach betrieblichen und vertraglichen Vorgaben dokumentieren
    b) Leistungserbringung unter Berücksichtigung der organisatorischen und terminlichen Vorgaben mit Kunden und Kundinnen abstimmen und kontrollieren
    c) Veränderungsprozesse begleiten und unterstützen
    d) Kunden und Kundinnen in die Nutzung von Produkten und Dienstleistungen einweisen
    e) Leistungen und Dokumentationen an Kunden und Kundinnen übergeben sowie Abnahmeprotokolle anfertigen
    f) Kosten für erbrachte Leistungen erfassen sowie im Zeitvergleich und im Soll-Ist-Vergleich bewerten

## A.8 Betreiben von IT-Systemen (§ 4 Absatz 2 Nummer 8)

    a) Netzwerkkonzepte für unterschiedliche Anwendungsgebiete unterscheiden
    b) Datenaustausch von vernetzten Systemen realisieren
    c) Verfügbarkeit und Ausfallwahrscheinlichkeiten analysieren und Lösungsvorschläge unterbreiten
    d) Maßnahmen zur präventiven Wartung und zur Störungsvermeidung einleiten und durchführen
    e) Störungsmeldungen aufnehmen und analysieren sowie Maßnahmen zur Störungsbeseitigung ergreifen
    f) Dokumentationen zielgruppengerecht und barrierefrei anfertigen, bereitstellen und pflegen, insbesondere technische Dokumentationen, System- sowie Benutzerdokumentationen

## A.9 Inbetriebnehmen von Speicherlösungen (§ 4 Absatz 2 Nummer 9)

    a) Sicherheitsmechanismen, insbesondere Zugriffsmöglichkeiten und -rechte, festlegen und implementieren
    b) Speicherlösungen, insbesondere Datenbanksysteme, integrieren

## A.10 Programmieren von Softwarelösungen (§ 4 Absatz 2 Nummer 10)

    a) Programmspezifikationen festlegen, Datenmodelle und Strukturen aus fachlichen Anforderungen ableiten sowie Schnittstellen festlegen
    b) Programmiersprachen auswählen und unterschiedliche Programmiersprachen anwenden
    c) Teilaufgaben von IT-Systemen automatisieren

## B.1 Konzipieren und Umsetzen von kundenspezifischen Softwareanwendungen (§ 4 Absatz 3 Nummer 1)

    a) Vorgehensmodelle und -methoden sowie Entwicklungsumgebungen und -bibliotheken auswählen und einsetzen
    b) Analyse- und Designverfahren anwenden
    c) Benutzerschnittstellen ergonomisch gestalten und an Kundenanforderungen anpassen
    d) Anwendungslösungen unter Berücksichtigung der bestehenden Systemarchitektur entwerfen und realisieren
    e) bestehende Anwendungslösungen anpassen
    f) Datenaustausch zwischen Systemen realisieren und unterschiedliche Datenquellen nutzen
    g) komplexe Abfragen aus unterschiedlichen Datenquellen durchführen und Datenbestandsberichte erstellen

## B.2  Sicherstellen der Qualität von Softwareanwendungen (§ 4 Absatz 3 Nummer 2)

    a) Sicherheitsaspekte bei der Entwicklung von Softwareanwendungen berücksichtigen
    b) Datenintegrität mithilfe von Werkzeugen sicherstellen
    c) Modultests erstellen und durchführen
    d) Werkzeuge zur Versionsverwaltung einsetzen
    e) Testkonzepte erstellen und Tests durchführen sowie Testergebnisse bewerten und dokumentieren
    f) Daten und Sachverhalte aus Tests multimedial aufbereiten und situationsgerecht unter Nutzung digitaler Werkzeuge und unter Beachtung der betrieblichen Vorgaben präsentieren

## F.1 Berufsbildung sowie Arbeits- und Tarifrecht (§ 4 Absatz 7 Nummer 1)

## F.2 Aufbau und Organisation des Ausbildungsbetriebes (§ 4 Absatz 7 Nummer 2)

## F.3 Sicherheit und Gesundheitsschutz bei der Arbeit (§ 4 Absatz 7 Nummer 3)

## F.4 Umweltschutz (§ 4 Absatz 7 Nummer 4)

## F.5 Vernetztes Zusammenarbeiten unter Nutzung digitaler Medien (§ 4 Absatz 7 Nummer 5)
```

## Ablauf

1. **Qualifikationen laden**: Falls im Repo vorhanden, [Qualifikationen.md](../../../Qualifikationen.md)
   einlesen und als aktuellen Stand bevorzugen (kann neuere/andere Codes enthalten als die
   eingebettete Referenz oben); sonst die eingebettete Referenz oben verwenden. Jede
   `## X.N Titel (...)`-Überschrift ist ein Qualifikationscode (z. B. `A.1`). Die Unterpunkte
   a)-i) darunter beschreiben typische Tätigkeiten dieser Qualifikation.
2. **Tagesdatei parsen**: Header-Zeile ignorieren, jede folgende Zeile (egal ob aus tab-getrenntem
   Text, einer eingefügten Excel-Tabelle oder einem Screenshot/Bild einer Tabelle) in
   `Beschreibung`, `Projekt`, `Projekt Beschaffungsnummer`, `Start`, `Ende`, `Dauer` (Format `HH:MM`)
   zerlegen. Leere/fehlende Spalten sind erlaubt.
3. **Rohdaten als Markdown-Tabelle schreiben**: Die geparsten Zeilen aus Schritt 2 immer als
   Markdown-Tabelle (mit `|`-Spalten und Trennzeile) in die Tagesdatei schreiben — nie als
   tab-getrennten Fließtext. Das gilt unabhängig vom Eingabeformat (Tab-getrennter Text, Bild
   einer Tabelle, CSV o. Ä.):

   ```markdown
   | Beschreibung | Projekt | Projekt Beschaffungsnummer | Start | Ende | Dauer |
   |---|---|---|---|---|---|
   | Wöchentliches Team-Meeting | ST-223 | PPL0000101 | 10:00 | 11:00 | 01:00 |
   ```
4. **Zuordnung pro Zeile**: Für jede `Beschreibung` alle plausibel passenden Qualifikation(en)
   anhand der Tätigkeitsbeschreibungen in Qualifikationen.md bestimmen (inhaltlicher Abgleich,
   keine reine Keyword-Suche). Großzügig zuordnen: wenn eine Tätigkeit mehrere Bereiche berührt,
   alle passenden Codes auflisten (z. B. Programmieren/Testen/Verbessern einer Softwarelösung →
   `A.4, A.10, B.1, B.2`; Meeting mit Terminbezug → `A.1`). Im Zweifel eher einen zusätzlichen
   plausiblen Code ergänzen als ihn wegzulassen — aber nur Codes nennen, die inhaltlich wirklich
   Bezug zur Tätigkeit haben.
   - **Woechentliche Ausbilder-Termine differenziert zuordnen**: Eintraege wie
     `Entwicklerunterstuetzung` und `Azubi Aufgabenplanung` primaer `A.1` zuordnen, aber
     inhaltlich sauber trennen. Die genaue Semantik aus dem Abschnitt
     **Regeltermine (konfigurierbar)** uebernehmen. Solche Termine nicht vorschnell als
     technische Entwicklungsarbeit oder blosse allgemeine Zusammenarbeit (`F.5`) einstufen.
   - **Komma in der Beschreibung = meist mehrere eigenständige Tätigkeiten**: Kommagetrennte Teile
     einer einzigen `Beschreibung` sind in der Regel verschiedene Aufgaben, die nur im selben
     Zeitslot stattgefunden haben (z. B. `Intrastat Ticket bearbeitung, Container Problemlösungsfindung`
     oder `Monatsabschluss, .CORE Analyse`). Sie **nicht** automatisch als denselben Vorgang oder
     als fachlich zusammenhängend behandeln. Jeden Teil einzeln bewerten und den Qualifikationen
     zuordnen; die Codes der Zeile sind die Vereinigung der Codes aller Teile. Keinen kausalen oder
     thematischen Bezug zwischen den Teilen erfinden (das Ticket gehört nur zu dem Teil, der es
     nennt; eine `.CORE`-Analyse hat nichts mit einem daneben genannten Monatsabschluss zu tun).
   - **Pausen überspringen**: Zeilen, die eine Pause erfassen (Beschreibung `Pause` bzw. `Mittagspause`,
     `Mittag` o. Ä.), werden keiner Qualifikation zugeordnet und **nicht** in die Zusammenfassung
     oder Wochenzusammenfassung übernommen; ihre Dauer zählt nicht zur `**Gesamtdauer:**`. In der
     Rohdaten-Tabelle (Schritt 3) bleiben sie unverändert erhalten.
5. **Sortieren**: Zeilen aufsteigend nach ihrem (niedrigsten) Qualifikationscode sortieren (`A.1`
   vor `A.2` vor `A.10` vor `B.1` vor `F.5` — numerisch pro Segment vergleichen, nicht
   alphabetisch). Hat eine Zeile mehrere Codes, zählt für die Sortierung der niedrigste davon.
6. **Einträge zusammenfassen**: Zeilen in einer der folgenden Fälle zu einer einzigen
   Zusammenfassungszeile zusammenfassen; ihre `Dauer`-Werte werden dabei addiert (`HH:MM` +
   `HH:MM`, z. B. `02:00` + `00:45` + `04:00` = `06:45`):
   - **Exakt identische Beschreibung** (und dieselben zugeordneten Qualifikationscodes).
   - **Fachlicher Zusammenhang**: mehrere Zeilen gehören erkennbar zum selben Thema/Ticket/Vorgang
     (z. B. Übergabe, Abstimmung und Lösungsfindung zum selben Ticket) und bilden ungefähr die
     gleichen Qualifikationen ab. Ein Komma **innerhalb** einer Beschreibung begründet für sich
     genommen keinen fachlichen Zusammenhang (siehe Schritt 4) — kommagetrennte Teile nur dann als
     zusammenhängend behandeln, wenn sie inhaltlich erkennbar denselben Vorgang betreffen.
   - **Gleiche Qualifikation(en), auch ohne fachlichen Zusammenhang**: mehrere Zeilen bedienen
     dieselbe(n) Qualifikationscode(s), auch wenn die Tätigkeiten inhaltlich nichts miteinander zu
     tun haben (z. B. ein internes Meeting und eine administrative Aufgabe, die beide nur `A.1`
     zugeordnet sind).
   Zeilen, die keiner dieser Regeln entsprechen, bleiben eigenständig.
7. **Beschreibungen als ganze Sätze formulieren**: Für jede (ggf. zusammengefasste) Zeile die
   `Beschreibung` als vollständigen, gut lesbaren Satz bzw. Satzgefüge neu formulieren (keine
   Stichpunkte/Fragmente aus der Rohzeile übernehmen). War in der Rohzeile ein echtes `Projekt`
   (oder Ticket) angegeben, dieses im Satz nennen. Bei zusammengefassten Zeilen die einzelnen
   Tätigkeiten sinnvoll in einem Satz bzw. Satzgefüge verbinden, statt sie nur aneinanderzureihen.
   - **Platzhalter-Projekte (`Intern` u. Ä.) nicht als Projekt nennen**: Die Excel dient zugleich
     der Arbeitszeiterfassung; Zeilen mit `Projekt = Intern` (bzw. leerem oder vergleichbarem
     Platzhalter) werden nicht auf Projektzeiten gebucht. `Intern` ist daher kein echtes Projekt
     und darf nicht als „im Projekt Intern“ o. Ä. im Satz auftauchen.
   - **Fachlichen Kontext trotz `Intern` aus der Beschreibung ziehen**: Viele unter `Intern`
     erfasste Tätigkeiten (z. B. Ticket-Bearbeitung, Container-Lösungsfindung, `.CORE`-Analyse)
     sind inhaltlich nicht rein intern. Nennt die Beschreibung selbst ein Ticket/einen Vorgang
     (z. B. `CC-227884-N9Z6`) oder ein reales System/Thema, dieses im Satz benennen — auch wenn
     in der Projekt-Spalte nur `Intern` steht.
   - **Echt interne Tätigkeiten bleiben projektlos**: Aufgaben ohne fachlichen Außenbezug (z. B.
     Azubi-Aufgabenplanung, interne Ablage/Orga) ohne Projekt- oder Ticketnennung formulieren.
   - **Ausbilder-Termine praezise formulieren**: Wenn Eintraege woechentliche Termine mit dem
     Ausbilder beschreiben, den Satz passend zum Terminzweck aus dem Abschnitt
     **Regeltermine (konfigurierbar)** formulieren. Inhalte verschiedener Regeltermine nicht
     vermischen und statt dessen keine technische Umsetzungsarbeit hineininterpretieren.
   - **`Intern` mit anderen Zeilen zusammenfassbar**: Da `Intern` kein echtes Projekt ist,
     verhindert es keine Zusammenfassung; für die Zusammenfassung nach Schritt 6 zählt der
     fachliche Inhalt bzw. die zugeordnete(n) Qualifikation(en), nicht der Platzhalter `Intern`.
   - **Kommagetrennte Teiltätigkeiten als getrennte Tätigkeiten formulieren**: Stammen mehrere
     Tätigkeiten aus einer kommagetrennten Rohbeschreibung (gleicher Zeitslot, kein fachlicher
     Zusammenhang), diese im Satz klar als eigenständige, voneinander unabhängige Tätigkeiten
     darstellen und mit einem einfachen Bindestrich `-` voneinander trennen (z. B. „… Prototyp
     entwickelt - mit Jonas eine Container-Problemlösung erarbeitet“), ohne einen Bezug zwischen
     ihnen zu suggerieren. Die gemeinsame `Dauer` der Rohzeile wird dabei **nicht** aufgeteilt (die
     Rohdaten liefern keine getrennten Zeiten); die Teiltätigkeiten teilen sich den Zeitslot und
     die Dauer bleibt als ein Wert an der (ggf. zusammengefassten) Zeile.
8. **Ausgabe anhängen**: Eine Markdown-Tabelle mit den Spalten `Qualifikation`, `Beschreibung`,
   `Dauer` ans Ende derselben Tagesdatei anhängen (nicht die Original-Zeilen löschen oder
   überschreiben). Jede Zusammenfassungszeile erscheint genau einmal — nicht pro Qualifikation
   und nicht pro Vorkommen dupliziert:
   - `Qualifikation`: alle zugehörigen Codes kommagetrennt, z. B. `A.4, A.10, B.1, B.2`
   - `Beschreibung`: der in Schritt 7 formulierte vollständige Satz
   - `Dauer`: die (ggf. aufsummierte) Gesamtdauer dieser Zeile, auf die nächste Viertelstunde
     gerundet (`HH:MM`, nur Schritte `:00`, `:15`, `:30`, `:45`; kaufmännisch runden, z. B.
     `01:40` → `01:45`, `04:20` → `04:15`)
   - `Industriezeit`: dieselbe (gerundete) Dauer als Dezimalwert (Industriestunden), mit Komma und
     zwei Nachkommastellen (`00:15` = `0,25`, `00:30` = `0,50`, `00:45` = `0,75`, `01:00` = `1,00`;
     z. B. `01:45` = `1,75`)

   Beispiel-Anhang:

   ```markdown

   ## Zusammenfassung nach Qualifikation

   | Qualifikation | Beschreibung | Dauer | Industriezeit |
   |---|---|---|---|
   | A.1 | Wöchentliches Team-Meeting im Projekt ST-223 geführt und die Arbeitszeiterfassung gepflegt | 01:15 | 1,25 |
   | A.4, A.10, B.1, B.2 | Das HR-Template um ein Autofill für Textform-Felder erweitert, verbessert und die Testumgebung zurückgesetzt | 06:45 | 6,75 |
   ```
9. **Wochenzusammenfassung pflegen**: Nach dem Anhängen der Tages-Zusammenfassung zusätzlich
   `<Jahr>/KW<Kalenderwoche>/Wochenzusammenfassung.md` aktualisieren (anlegen, falls noch nicht
   vorhanden). Diese Datei bündelt für jeden bereits verarbeiteten Tag der Woche dessen
   Qualifikations-Zusammenfassungstabelle unter einer eigenen Datums-Überschrift, in
   aufsteigender Datumsreihenfolge:

   ```markdown
   # Wochenzusammenfassung KW26 (2026)

   ## 06-22-2026

   | Qualifikation | Beschreibung | Dauer | Industriezeit |
   |---|---|---|---|
   | A.1 | Wöchentliches Team-Meeting | 01:00 | 1,00 |
   | A.4, A.10, B.1, B.2 | HR-Template autofill weitere verbesserung für Textform felder, reset der Testumgebung | 07:00 | 7,00 |

   **Gesamtdauer:** 08:00 (8,00)

   ## 06-23-2026

   | Qualifikation | Beschreibung | Dauer | Industriezeit |
   |---|---|---|---|
   ...
   ```

   Für jeden Tagesabschnitt gilt:
   - Überschrift `## MM-DD-YYYY` mit dem Datum der Tagesdatei.
   - Die Tabelle ist eine 1:1-Kopie der `Zusammenfassung nach Qualifikation`-Tabelle aus der
     jeweiligen Tagesdatei (nicht neu erzeugen, nur übernehmen) — inklusive der Spalte
     `Industriezeit`.
   - Darunter eine Zeile `**Gesamtdauer:** HH:MM (I,II)` mit der Summe aller (gerundeten)
     `Dauer`-Werte dieses Tages und in Klammern der Summe der `Industriezeit`-Werte.
   - Wird eine bereits enthaltene Tagesdatei erneut verarbeitet (Korrektur), den zugehörigen
     Abschnitt in der Wochenzusammenfassung ersetzen statt zu duplizieren.
   - Tage ohne bisherige Qualifikations-Zusammenfassung (noch nicht verarbeitet) werden nicht
     aufgeführt.

## Hinweise

- Qualifikationen.md kann sich ändern (neue/andere Codes) — immer den aktuellen Stand der Datei
  laden, nichts hart codieren.
- Das Eingabeformat (Spalten/Trennzeichen) kann sich künftig ändern (z. B. CSV statt Tab). Vor der
  Verarbeitung kurz prüfen, ob Spaltennamen/Trennzeichen noch passen, und ggf. nachfragen.
- Bei mehreren Tagesdateien im Repo (`<Jahr>/KW<Kalenderwoche>/MM-DD-YYYY.md`) immer nur die vom Nutzer genannte Datei
  bearbeiten, nicht alle auf einmal.
- `Intern` (und vergleichbare Platzhalter) ist ein reiner Buchungs-Platzhalter der Zeiterfassung,
  kein echtes Projekt, und wird nie als Projekt im Satz genannt. Der fachliche Kontext solcher
  Zeilen wird — falls vorhanden — aus der Beschreibung (Ticket/Vorgang/System) abgeleitet.
- Die Wochenzusammenfassung (`Wochenzusammenfassung.md`) liegt im selben `KW<Kalenderwoche>`-Ordner
  wie die Tagesdateien und wird bei jeder Tagesverarbeitung inkrementell mitaktualisiert.
