# Sentrix – B2B-SaaS-Landingpage (Demoprojekt)

Dies ist ein persönliches Übungs- und Demoprojekt für mein Portfolio – **kein reales
Produkt und keine Auftragsarbeit für einen echten Kunden**. "Sentrix" ist eine
frei erfundene Observability-/Incident-Management-Plattform, alle genannten
Referenzkunden, Preise und Kennzahlen sind fiktiv.

## Was die Seite zeigt

Im Gegensatz zu meiner emotionalen B2C-Landingpage "Klarblick" ist dies eine
technische, datengetriebene B2B-SaaS-Seite: eine "Vertraut von"-Kundenleiste,
eine Feature-Übersicht, ein **interaktiver Preisrechner** mit echter Rabattlogik,
eine **Feature-Vergleichstabelle** für drei Tarife sowie ein validiertes
Kontaktformular.

## Technisch demonstriert

- Sauberes, semantisches HTML5 und ein CSS-Design-System mit Custom Properties
- Responsives Layout (getestet ab ca. 375 px Breite) inkl. Grid/Dot-Hintergrund
  ausschließlich aus CSS, ohne externe Bilder
- Echtes, striktes TypeScript: Interfaces/Types, typisierte Datenarrays,
  DOM-Rendering ohne hartkodiertes HTML pro Eintrag
- Live-Preisberechnung über `berechnePreis()` mit echten Rabattstaffeln
- Formularvalidierung mit Regex und Inline-Fehlermeldungen, ohne Server

## Build

```bash
tsc
```

Kompiliert `src/main.ts` nach `dist/main.js`. Anschließend `index.html` im
Browser öffnen.

---

Entstanden als privates Nebenprojekt neben dem Informatikstudium, um meine
Webentwicklungs-Kenntnisse zu vertiefen.
