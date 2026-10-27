/**
 * Klarblick – Marketing Landingpage
 * ----------------------------------------------------------------
 * Reines, abhängigkeitsfreies TypeScript (kompiliert zu einer einzigen
 * dist/main.js). Zuständig für:
 *  - Rendern von Feature-, Testimonial-, Preis- und FAQ-Daten ins DOM
 *  - Ein barrierefreies FAQ-Akkordeon (Buttons + aria-expanded)
 *  - Ein Monats-/Jahres-Umschalter mit echter Preisberechnung
 *  - Live-Validierung des Newsletter-Formulars (as-you-type)
 * ----------------------------------------------------------------
 */

/* ==========================================================================
   Typen
   ========================================================================== */

interface Feature {
  id: string;
  titel: string;
  beschreibung: string;
  /** Akzentfarbe des Icon-Badges als CSS-Farbwert */
  farbe: string;
  /** Handgezeichnetes Inline-SVG (kein externes Bild) */
  iconSvg: string;
}

interface Testimonial {
  id: string;
  zitat: string;
  name: string;
  rolle: string;
  initialen: string;
  avatarFarbe: string;
}

interface FaqEintrag {
  id: string;
  frage: string;
  antwort: string;
}

type Abrechnungszeitraum = "monatlich" | "jaehrlich";

interface Preisplan {
  id: string;
  name: string;
  monatspreis: number;
  beschreibung: string;
  hervorgehoben: boolean;
  merkmale: string[];
}

/* ==========================================================================
   Daten
   ========================================================================== */

const features: Feature[] = [
  {
    id: "fokus-timer",
    titel: "Sanfter Fokus-Timer",
    beschreibung:
      "Konzentrierte Arbeitsblöcke mit automatischen Pausen – ohne aggressive Alarmtöne.",
    farbe: "#ffe4da",
    iconSvg:
      '<svg viewBox="0 0 24 24" width="26" height="26"><circle cx="12" cy="13" r="8" fill="none" stroke="#f0552f" stroke-width="2"/><path d="M12 8v5l3.2 2" stroke="#f0552f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M9 2h6" stroke="#f0552f" stroke-width="2" stroke-linecap="round"/></svg>',
  },
  {
    id: "gewohnheiten",
    titel: "Gewohnheiten ohne Druck",
    beschreibung:
      "Baue kleine Routinen auf. Ein ausgelassener Tag zerstört keine Serie – wir zählen den Trend, nicht die Lücke.",
    farbe: "#e4dcff",
    iconSvg:
      '<svg viewBox="0 0 24 24" width="26" height="26"><path d="M4 18 L9 11 L13 15 L20 6" stroke="#7c5cff" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="20" cy="6" r="2" fill="#7c5cff"/></svg>',
  },
  {
    id: "tagesrueckblick",
    titel: "Ehrlicher Tagesrückblick",
    beschreibung:
      "Ein 30-Sekunden-Check-in am Abend zeigt dir, was wirklich gewirkt hat – in einfachen Worten, keine Excel-Tabellen.",
    farbe: "#ddf5eb",
    iconSvg:
      '<svg viewBox="0 0 24 24" width="26" height="26"><rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="#2fb787" stroke-width="2"/><path d="M8 12h8M8 16h5" stroke="#2fb787" stroke-width="2" stroke-linecap="round"/></svg>',
  },
  {
    id: "ablenkungsschutz",
    titel: "Ablenkungsschutz",
    beschreibung:
      "Blendet laute Apps während Fokuszeiten sanft aus und erinnert dich freundlich statt zu bevormunden.",
    farbe: "#ffe4da",
    iconSvg:
      '<svg viewBox="0 0 24 24" width="26" height="26"><path d="M12 3 L20 7v5c0 5-3.4 8.4-8 9-4.6-.6-8-4-8-9V7z" fill="none" stroke="#f0552f" stroke-width="2" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="#f0552f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>',
  },
  {
    id: "wochenrhythmus",
    titel: "Natürlicher Wochenrhythmus",
    beschreibung:
      "Klarblick passt Vorschläge an deine Energie über die Woche an, statt jeden Tag gleich zu behandeln.",
    farbe: "#e4dcff",
    iconSvg:
      '<svg viewBox="0 0 24 24" width="26" height="26"><path d="M4 16c2-6 4-9 8-9s6 3 8 9" stroke="#7c5cff" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="12" cy="16" r="2" fill="#7c5cff"/></svg>',
  },
  {
    id: "synchron",
    titel: "Überall synchron",
    beschreibung:
      "Handy, Tablet und Web bleiben automatisch im Gleichschritt – ganz ohne Konten-Wirrwarr.",
    farbe: "#ddf5eb",
    iconSvg:
      '<svg viewBox="0 0 24 24" width="26" height="26"><rect x="3" y="7" width="9" height="12" rx="2" fill="none" stroke="#2fb787" stroke-width="2"/><rect x="14" y="4" width="7" height="9" rx="1.5" fill="none" stroke="#2fb787" stroke-width="2"/></svg>',
  },
];

const testimonials: Testimonial[] = [
  {
    id: "julia",
    zitat:
      "Endlich eine App, die mir nicht das Gefühl gibt, im Rückstand zu sein. Ich mache tatsächlich mehr – aber entspannter.",
    name: "Julia K.",
    rolle: "Grafikdesignerin",
    initialen: "JK",
    avatarFarbe: "#ff7a5c",
  },
  {
    id: "mehmet",
    zitat:
      "Der Tagesrückblick dauert wirklich nur eine halbe Minute. Nach drei Wochen wusste ich, wann ich am produktivsten bin.",
    name: "Mehmet A.",
    rolle: "Werkstudent Informatik",
    initialen: "MA",
    avatarFarbe: "#7c5cff",
  },
  {
    id: "sophie",
    zitat:
      "Ich habe zehn Habit-Tracker ausprobiert. Klarblick ist der erste, den ich nach zwei Monaten noch benutze.",
    name: "Sophie R.",
    rolle: "Physiotherapeutin",
    initialen: "SR",
    avatarFarbe: "#2fb787",
  },
  {
    id: "tom",
    zitat:
      "Der Fokus-Timer mit den sanften Pausen hat mein Homeoffice-Chaos ziemlich geordnet. Klare Empfehlung.",
    name: "Tom B.",
    rolle: "Freiberuflicher Texter",
    initialen: "TB",
    avatarFarbe: "#f0552f",
  },
];

const faqEintraege: FaqEintrag[] = [
  {
    id: "kosten",
    frage: "Ist Klarblick wirklich kostenlos nutzbar?",
    antwort:
      "Ja. Der Plan „Kostenlos“ bietet dauerhaft Zugriff auf Fokus-Timer, Gewohnheiten-Tracking und Tagesrückblick. Für erweiterte Statistiken und unbegrenzte Gewohnheiten gibt es die Pläne Plus und Pro.",
  },
  {
    id: "geraete",
    frage: "Auf welchen Geräten läuft die App?",
    antwort:
      "Klarblick funktioniert auf iOS, Android und im Browser. Deine Daten synchronisieren sich automatisch zwischen allen Geräten, sobald du angemeldet bist.",
  },
  {
    id: "kuendigung",
    frage: "Wie kündige ich mein Abo?",
    antwort:
      "Jederzeit mit einem Klick in den Kontoeinstellungen – ohne Anruf, ohne Wartezeit, ohne versteckte Fristen. Du behältst Zugriff bis zum Ende des bezahlten Zeitraums.",
  },
  {
    id: "streaks",
    frage: "Was passiert, wenn ich einen Tag verpasse?",
    antwort:
      "Nichts Schlimmes. Klarblick zeigt dir einen langfristigen Trend statt einer zerbrechlichen Serie, damit ein verpasster Tag nicht wie ein Rückschlag wirkt.",
  },
  {
    id: "datenschutz",
    frage: "Wie steht es um meine Daten?",
    antwort:
      "Deine Einträge gehören dir. Wir verkaufen keine Nutzerdaten an Dritte und du kannst deinen kompletten Verlauf jederzeit exportieren oder löschen.",
  },
  {
    id: "teams",
    frage: "Gibt es Klarblick auch für Teams?",
    antwort:
      "Aktuell ist Klarblick bewusst auf Einzelpersonen zugeschnitten. Ein Team-Angebot ist in Planung – trag dich in die Warteliste ein, um informiert zu werden.",
  },
  {
    id: "sprache",
    frage: "Ist die App auch auf Englisch verfügbar?",
    antwort:
      "Ja, du kannst in den Einstellungen jederzeit zwischen Deutsch und Englisch wechseln. Weitere Sprachen sind in Vorbereitung.",
  },
];

const preisplaene: Preisplan[] = [
  {
    id: "kostenlos",
    name: "Kostenlos",
    monatspreis: 0,
    beschreibung: "Für den entspannten Einstieg",
    hervorgehoben: false,
    merkmale: [
      "Fokus-Timer ohne Limit",
      "Bis zu 3 Gewohnheiten",
      "Täglicher Tagesrückblick",
      "Synchronisation auf 1 Gerät",
    ],
  },
  {
    id: "plus",
    name: "Plus",
    monatspreis: 4.99,
    beschreibung: "Für alle, die dranbleiben wollen",
    hervorgehoben: true,
    merkmale: [
      "Alles aus Kostenlos",
      "Unbegrenzte Gewohnheiten",
      "Wochentrends &amp; Auswertungen",
      "Synchronisation auf allen Geräten",
      "Ablenkungsschutz",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    monatspreis: 9.99,
    beschreibung: "Für maximale Klarheit",
    hervorgehoben: false,
    merkmale: [
      "Alles aus Plus",
      "Erweiterte Jahresstatistiken",
      "Persönliche Wochenplanung",
      "Priorisierter Support",
    ],
  },
];

/* ==========================================================================
   Hilfsfunktionen
   ========================================================================== */

/** Holt ein Element per ID und wirft einen sprechenden Fehler, falls es fehlt. */
function holeElement<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Element mit id="${id}" wurde im DOM nicht gefunden.`);
  }
  return element as T;
}

function formatiereEuro(betrag: number): string {
  return betrag.toLocaleString("de-DE", {
    minimumFractionDigits: betrag % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

/* ==========================================================================
   Rendering: Features
   ========================================================================== */

function renderFeatures(): void {
  const grid = holeElement<HTMLDivElement>("feature-grid");
  const markup = features
    .map(
      (feature) => `
      <article class="feature-card" role="listitem">
        <div class="feature-icon" style="background:${feature.farbe}">
          ${feature.iconSvg}
        </div>
        <h3>${feature.titel}</h3>
        <p>${feature.beschreibung}</p>
      </article>`
    )
    .join("");
  grid.innerHTML = markup;
}

/* ==========================================================================
   Rendering: Testimonials
   ========================================================================== */

function renderTestimonials(): void {
  const grid = holeElement<HTMLDivElement>("testimonial-grid");
  const markup = testimonials
    .map(
      (t) => `
      <article class="testimonial-card">
        <p class="testimonial-quote">&bdquo;${t.zitat}&ldquo;</p>
        <div class="testimonial-author">
          <span class="testimonial-avatar" style="background:${t.avatarFarbe}">${t.initialen}</span>
          <span class="testimonial-author-meta">
            <strong>${t.name}</strong>
            <span>${t.rolle}</span>
          </span>
        </div>
      </article>`
    )
    .join("");
  grid.innerHTML = markup;
}

/* ==========================================================================
   Rendering + Verhalten: FAQ-Akkordeon
   ========================================================================== */

function renderFaq(): void {
  const container = holeElement<HTMLDivElement>("faq-accordion");

  const markup = faqEintraege
    .map((eintrag) => {
      const triggerId = `faq-trigger-${eintrag.id}`;
      const panelId = `faq-panel-${eintrag.id}`;
      return `
      <div class="faq-item">
        <h3>
          <button
            type="button"
            class="faq-trigger"
            id="${triggerId}"
            aria-expanded="false"
            aria-controls="${panelId}"
          >
            <span>${eintrag.frage}</span>
            <span class="faq-icon" aria-hidden="true">
              <svg viewBox="0 0 20 20" width="16" height="16">
                <path d="M10 4v12M4 10h12" stroke="#7c5cff" stroke-width="2.2" stroke-linecap="round"/>
              </svg>
            </span>
          </button>
        </h3>
        <div
          class="faq-panel"
          id="${panelId}"
          role="region"
          aria-labelledby="${triggerId}"
          hidden
        >
          <p>${eintrag.antwort}</p>
        </div>
      </div>`;
    })
    .join("");

  container.innerHTML = markup;

  const trigger = container.querySelectorAll<HTMLButtonElement>(".faq-trigger");

  trigger.forEach((button) => {
    button.addEventListener("click", () => {
      oeffneOderSchliesseFaq(button, trigger);
    });
  });
}

/**
 * Öffnet den geklickten FAQ-Eintrag und schließt alle anderen
 * ("nur ein Panel gleichzeitig offen"). Reiner State-Wechsel über
 * aria-expanded + hidden-Attribut, ohne <details>-Element.
 */
function oeffneOderSchliesseFaq(
  geklickterButton: HTMLButtonElement,
  alleButtons: NodeListOf<HTMLButtonElement>
): void {
  const warOffen = geklickterButton.getAttribute("aria-expanded") === "true";

  alleButtons.forEach((button) => {
    const panelId = button.getAttribute("aria-controls");
    if (!panelId) {
      return;
    }
    const panel = document.getElementById(panelId);
    if (!panel) {
      return;
    }
    button.setAttribute("aria-expanded", "false");
    panel.hidden = true;
  });

  if (!warOffen) {
    const panelId = geklickterButton.getAttribute("aria-controls");
    const panel = panelId ? document.getElementById(panelId) : null;
    geklickterButton.setAttribute("aria-expanded", "true");
    if (panel) {
      panel.hidden = false;
    }
  }
}

/* ==========================================================================
   Rendering + Verhalten: Preistabelle mit Monats-/Jahres-Umschalter
   ========================================================================== */

/** Anzahl der Monate, die bei jährlicher Zahlung effektiv berechnet werden ("2 Monate gratis"). */
const JAEHRLICHE_ABRECHNUNGSMONATE = 10;
const MONATE_PRO_JAHR = 12;

let aktuellerZeitraum: Abrechnungszeitraum = "monatlich";

/** Berechnet den anzuzeigenden Preis für einen Plan im gewählten Abrechnungszeitraum. */
function berechnePreis(plan: Preisplan, zeitraum: Abrechnungszeitraum): { betrag: number; einheit: string } {
  if (plan.monatspreis === 0) {
    return { betrag: 0, einheit: "" };
  }

  if (zeitraum === "monatlich") {
    return { betrag: plan.monatspreis, einheit: "/ Monat" };
  }

  // Jährliche Zahlung: 10 Monate zum Preis von 12 ("2 Monate gratis"),
  // dargestellt als effektiver Monatspreis bei Jahresabrechnung.
  const jahresgesamtpreis = plan.monatspreis * JAEHRLICHE_ABRECHNUNGSMONATE;
  const effektiverMonatspreis = jahresgesamtpreis / MONATE_PRO_JAHR;
  return { betrag: effektiverMonatspreis, einheit: "/ Monat (jährlich abgerechnet)" };
}

function renderPricing(): void {
  const grid = holeElement<HTMLDivElement>("pricing-grid");

  const markup = preisplaene
    .map((plan) => {
      const preis = berechnePreis(plan, aktuellerZeitraum);
      const preisText = plan.monatspreis === 0 ? "0" : formatiereEuro(preis.betrag);
      const jahresHinweis =
        aktuellerZeitraum === "jaehrlich" && plan.monatspreis > 0
          ? `<p class="pricing-note">entspricht ${formatiereEuro(plan.monatspreis * JAEHRLICHE_ABRECHNUNGSMONATE)} € im Jahr &ndash; 2 Monate gratis</p>`
          : `<p class="pricing-note">&nbsp;</p>`;

      return `
      <article class="pricing-card ${plan.hervorgehoben ? "is-highlighted" : ""}">
        ${plan.hervorgehoben ? '<span class="pricing-badge">Beliebt</span>' : ""}
        <h3>${plan.name}</h3>
        <p class="pricing-price">${preisText} €<span>${preis.einheit}</span></p>
        ${jahresHinweis}
        <ul class="pricing-features">
          ${plan.merkmale.map((merkmal) => `<li>${merkmal}</li>`).join("")}
        </ul>
        <a href="#signup" class="btn ${plan.hervorgehoben ? "btn-primary" : "btn-ghost"} btn-large">
          ${plan.monatspreis === 0 ? "Kostenlos starten" : "Plan wählen"}
        </a>
      </article>`;
    })
    .join("");

  grid.innerHTML = markup;
}

function initPricingToggle(): void {
  const toggle = holeElement<HTMLButtonElement>("billing-toggle");
  const labelMonatlich = holeElement<HTMLSpanElement>("toggle-label-monthly");
  const labelJaehrlich = holeElement<HTMLSpanElement>("toggle-label-yearly");

  toggle.addEventListener("click", () => {
    const istAktuellJaehrlich = toggle.getAttribute("aria-checked") === "true";
    aktuellerZeitraum = istAktuellJaehrlich ? "monatlich" : "jaehrlich";

    toggle.setAttribute("aria-checked", String(!istAktuellJaehrlich));
    labelMonatlich.classList.toggle("is-active", aktuellerZeitraum === "monatlich");
    labelJaehrlich.classList.toggle("is-active", aktuellerZeitraum === "jaehrlich");

    renderPricing();
  });
}

/* ==========================================================================
   Verhalten: Newsletter-Signup mit Live-Validierung
   ========================================================================== */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function initSignupForm(): void {
  const form = holeElement<HTMLFormElement>("signup-form");
  const input = holeElement<HTMLInputElement>("email-input");
  const submitButton = holeElement<HTMLButtonElement>("signup-submit");
  const feedback = holeElement<HTMLParagraphElement>("email-feedback");
  const statusIcon = holeElement<HTMLSpanElement>("email-status-icon");
  const successBox = holeElement<HTMLDivElement>("signup-success");

  const CHECK_ICON =
    '<svg viewBox="0 0 20 20" width="20" height="20"><circle cx="10" cy="10" r="9" fill="#2fb787"/><path d="M6 10.5 8.5 13 14 7.5" stroke="#fff" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const ERROR_ICON =
    '<svg viewBox="0 0 20 20" width="20" height="20"><circle cx="10" cy="10" r="9" fill="#f0552f"/><path d="M10 6v5" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/><circle cx="10" cy="14" r="1" fill="#fff"/></svg>';

  function aktualisiereValidierung(): void {
    const wert = input.value.trim();

    if (wert.length === 0) {
      input.setAttribute("aria-invalid", "false");
      statusIcon.innerHTML = "";
      feedback.textContent = "";
      feedback.classList.remove("is-valid");
      submitButton.disabled = true;
      return;
    }

    const istGueltig = EMAIL_REGEX.test(wert);

    input.setAttribute("aria-invalid", String(!istGueltig));
    submitButton.disabled = !istGueltig;

    if (istGueltig) {
      statusIcon.innerHTML = CHECK_ICON;
      feedback.textContent = "Sieht gut aus – diese Adresse können wir verwenden.";
      feedback.classList.add("is-valid");
    } else {
      statusIcon.innerHTML = ERROR_ICON;
      feedback.textContent = "Bitte gib eine gültige E-Mail-Adresse ein (z. B. name@beispiel.de).";
      feedback.classList.remove("is-valid");
    }
  }

  input.addEventListener("input", aktualisiereValidierung);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const wert = input.value.trim();
    if (!EMAIL_REGEX.test(wert)) {
      // Sicherheitsnetz: Absenden ungültiger Adressen wird zusätzlich verhindert,
      // selbst falls der Button je aktiviert würde.
      aktualisiereValidierung();
      return;
    }

    // Mocked Erfolg – hier würde in einer echten App ein API-Call stehen.
    form.hidden = true;
    feedback.hidden = true;
    successBox.hidden = false;
  });
}

/* ==========================================================================
   Initialisierung
   ========================================================================== */

function init(): void {
  renderFeatures();
  renderTestimonials();
  renderFaq();
  renderPricing();
  initPricingToggle();
  initSignupForm();
}

document.addEventListener("DOMContentLoaded", init);
