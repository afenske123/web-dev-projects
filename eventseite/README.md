# CodeWelle Conf 2026 – Demo-Landingpage

Ein **persönliches Übungs-/Portfolio-Projekt**, keine echte Veranstaltung.
"CodeWelle Conf", alle Sprecher:innen, Firmen und Orte sind frei erfunden.

Eine responsive Konferenz-Landingpage mit Hero-Bereich inkl. live berechnetem
Countdown, Sprecher-Grid, filterbarer Agenda, Ticket-Preisen und validiertem
Anmeldeformular.

## Technisch demonstriert

- Semantisches HTML5 und responsives CSS mit Custom Properties (Design-System)
- Strikt typisiertes TypeScript (`interface`/`type`, kein unnötiges `any`)
- Rendering von Sprechern, Agenda und Tickets aus typisierten Daten statt
  hartcodiertem HTML
- Mit `setInterval` laufender, aus einem `Date`-Objekt berechneter Countdown
- Client-seitige Formularvalidierung mit Fehlermeldungen pro Feld
- Nur selbst gezeichnete Inline-SVGs und CSS-Effekte, keine externen Bilder

## Build

`tsc` ausführen, danach `index.html` im Browser öffnen.

Entstanden als privates Projekt neben dem Studium, um Webentwicklung mit
TypeScript zu vertiefen.
