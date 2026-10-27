# Lichtform Fotografie — Demo-Portfolio

Dies ist eine **persönliche Übungs-/Demoseite** und kein echtes Fotostudio und
keine reale Auftragsarbeit. Die fiktive Fotografin "Nora Vahlberg" und das
Studio "Lichtform Fotografie" dienen nur als Beispielinhalt, um eine
professionelle Portfolioseite zu gestalten und umzusetzen.

## Wichtiger Hinweis zu den Bildern

Alle "Fotos" in der Galerie sind **keine echten Fotografien**, sondern bewusst
gestaltete, abstrakte **CSS-Gradient- und handgeschriebene SVG-Grafiken**.
Damit werden gezielt jegliche Bildlizenz-Fragen vermieden (keine Stock-Fotos,
keine externen Bild-URLs, keine eingebetteten Fotos).

## Technisch demonstriert

- Semantisches, zugängliches HTML5 sowie responsives CSS mit einem
  konsistenten Design-System (CSS Custom Properties, `@media`-Breakpoints).
- Rein CSS/SVG-erzeugte Bildplatzhalter (Gradients, `repeating-gradient`,
  `clip-path`-nahe Formen, Blend-Modes) statt echter Bilddateien.
- TypeScript im `strict`-Modus: eigene `interface`/`type`-Definitionen,
  typisierte Datenarrays, generische Hilfsfunktionen, keine `any`-Typen.
- Datengetriebenes Rendering der Galerie-Kacheln, ein echter Kategoriefilter
  (`Array.filter`) inklusive Leerzustand.
- Eine Lightbox mit Tastatursteuerung (Pfeiltasten, Escape), Klick-außerhalb
  zum Schließen und Fokus-Rückgabe an das auslösende Element.
- Ein Kontaktformular mit clientseitiger Validierung (Regex-E-Mail-Prüfung,
  Inline-Fehlermeldungen, simulierter Erfolgsstatus).

## Build

```bash
tsc
```

Das kompiliert `src/main.ts` nach `dist/main.js`. Anschließend `index.html`
einfach im Browser öffnen — es wird kein Server benötigt.

---

Entstanden als persönliches Nebenprojekt neben dem Studium, um die eigenen
Webentwicklungs-Kenntnisse zu vertiefen.
