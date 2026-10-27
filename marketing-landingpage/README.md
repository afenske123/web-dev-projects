# Klarblick – Marketing Landingpage (Demoprojekt)

Dies ist ein **persönliches Übungs-/Demoprojekt** für mein Portfolio – kein
echtes Produkt und keine Auftragsarbeit für eine Firma. "Klarblick" ist eine
frei erfundene Fokus- und Gewohnheiten-App für Privatnutzer:innen; alle
Nutzerzitate, Zahlen und Preise sind fiktiv.

## Ziel des Projekts

Die Seite zeigt eine typische B2C-Marketing-Landingpage: Hero-Bereich,
Feature-Grid, Testimonials, Preistabelle mit Monats-/Jahres-Umschalter,
FAQ-Akkordeon und ein Newsletter-Formular.

## Was hier technisch demonstriert wird

- Semantisches, barrierefreies HTML5 (u. a. `aria-expanded`, `role`,
  `aria-live` statt eines `<details>`-Elements)
- Ein reines CSS-Design-System über Custom Properties, responsive ab ~375 px
- Sämtliche Grafiken als CSS-Formen oder handgezeichnetes Inline-SVG –
  keine externen Bilder
- Striktes TypeScript ohne Frameworks: typisierte Datenmodelle
  (`Feature`, `Testimonial`, `FaqEintrag`, `Preisplan`), DOM-Rendering aus
  Daten, ein selbst gebautes FAQ-Akkordeon sowie ein Preis-Umschalter mit
  echter Berechnung ("2 Monate gratis" bei Jahreszahlung)
- Live-Formularvalidierung einer E-Mail-Adresse während des Tippens

## Bauen & Ansehen

```bash
tsc
```

Danach `index.html` einfach im Browser öffnen (kein Server nötig).

_Nebenbei zum Studium entstanden, um meine Webentwicklungs-Skills zu vertiefen._
