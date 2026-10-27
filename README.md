# Web-Dev-Projekte (eigene Praxisprojekte)

Fünf eigenständige, kleine Webprojekte (HTML/CSS/TypeScript), die ich parallel zum
Studium — unabhängig von Kursen/Abgaben — gebaut habe, um mein Wissen in
Webentwicklung praktisch zu vertiefen. Jedes ist ein fiktives Beispielprojekt aus
einem anderen Themenbereich, mit echtem TypeScript-Setup (`tsc`, `tsconfig.json`)
und ohne heruntergeladene Bilder — alle visuellen Elemente sind bewusst mit
CSS/SVG selbst gebaut, damit keinerlei Lizenzfrage entsteht.

## Projekte

### [`fitnessstudio/`](fitnessstudio/) — "IronFlow Studio"
Fiktive Fitnessstudio-Seite mit filterbarem Kursplan, 3 Mitgliedschafts-Tarifen und
einem echten Trainingsziel-Rechner (BMI + Kalorienbedarf nach Mifflin-St-Jeor),
plus validiertem Kontaktformular.

### [`eventseite/`](eventseite/) — "CodeWelle Conf 2026"
Fiktive Tech-Konferenz-Seite mit Live-Countdown zum Eventdatum, Sprecher-Karten,
Agenda mit Track-Filter, Ticket-Preisen und einem Anmeldeformular, das eine
Bestätigungsnummer generiert.

### [`foto-portfolio/`](foto-portfolio/) — "Lichtform Fotografie"
Fiktives Fotografie-Portfolio mit filterbarer Galerie und einer Lightbox mit
Tastatur-Navigation (Pfeiltasten/Escape). Alle "Fotos" sind bewusst CSS/SVG-
generierte Grafik statt echter Bilder (siehe Projekt-README).

### [`marketing-landingpage/`](marketing-landingpage/) — "Klarblick"
Fiktive B2C-Marketing-Landingpage für eine Produktivitäts-App: Feature-Grid,
Testimonials, barrierefreies FAQ-Akkordeon (ARIA), Preistabelle mit echtem
Monats-/Jahres-Umschalter und Live-Validierung im Anmeldeformular.

### [`saas-landingpage/`](saas-landingpage/) — "Sentrix"
Fiktive B2B-SaaS-Landingpage (Observability/Incident-Management): "Vertraut
von"-Kundenleiste (rein fiktiv, nur Text), Feature-Vergleichstabelle über drei
Tarife, und ein interaktiver Preis-Rechner mit echtem Mengenrabatt (Slider für
Nutzeranzahl, live berechneter Preis inkl. Rabattstufen).

## Bauen & Starten

Jedes Projekt einzeln:

```bash
cd fitnessstudio   # oder eines der anderen vier
tsc                # kompiliert src/main.ts nach dist/main.js
```

Danach `index.html` im Browser öffnen.

## Technischer Hintergrund

Alle fünf Projekte sind bewusst gleich aufgebaut: `index.html` + `css/styles.css`
+ `src/main.ts` (echtes TypeScript mit eigenen `interface`/`type`-Deklarationen,
typisierten Datenarrays, die den Inhalt rendern, und mindestens einer echten
interaktiven Funktion mit richtiger Logik statt nur Show/Hide). Kein Framework,
kein Build-Tool außer dem TypeScript-Compiler selbst — zeigt die Grundlagen ohne
Abkürzung über ein Frontend-Framework.
