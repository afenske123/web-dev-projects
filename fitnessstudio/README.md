# IronFlow Studio – Demo-Website

Privates Übungs- und Portfolio-Projekt, keine echte Firma oder ein
Kundenprojekt. "IronFlow Studio" ist ein frei erfundenes Fitnessstudio,
das nur dazu dient, saubere HTML-, CSS- und TypeScript-Umsetzung zu zeigen.

## Was die Seite zeigt

- Semantisches, responsives HTML (funktioniert ab ca. 375px Breite)
- CSS-Design-System auf Basis von Custom Properties, ohne externe Bilder –
  nur CSS-Formen und Inline-SVG
- Aus TypeScript-Daten gerenderter Kursplan mit echter Filterlogik
  (nach Wochentag und Kategorie)
- Drei Mitgliedschafts-Tarife aus typisierten Daten gerendert
- "Trainingsziel-Rechner" (BMI + Kalorienbedarf nach Mifflin-St-Jeor)
  mit echter Eingabevalidierung
- Kontakt-/Anmeldeformular mit clientseitiger Validierung (Pflichtfelder,
  E-Mail-Regex, Fehlermeldungen je Feld, simulierter Erfolg ohne Netzwerk)

## Build

```bash
tsc
```

Kompiliert `src/main.ts` nach `dist/main.js`. Anschließend `index.html`
im Browser öffnen.

Entstanden als persönliches Übungsprojekt neben dem Studium, um die
eigenen Webentwicklungs-Kenntnisse zu vertiefen.
