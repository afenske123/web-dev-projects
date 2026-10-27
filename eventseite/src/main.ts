/* ==========================================================================
   CodeWelle Conf 2026 – main.ts
   Rendert Sprecher, Agenda und Tickets aus typisierten Daten, betreibt einen
   live berechneten Countdown und validiert das Anmeldeformular clientseitig.
   ========================================================================== */

/* ---------------------------------------------------------------------- */
/*  Typen                                                                  */
/* ---------------------------------------------------------------------- */

interface Sprecher {
  id: string;
  name: string;
  rolle: string;
  firma: string;
  bio: string;
  initialen: string;
}

type Track = "Keynote" | "A" | "B" | "C";
type TrackFilter = Track | "Alle";

interface AgendaEintrag {
  id: string;
  zeit: string;
  titel: string;
  sprecherName: string;
  raum: string;
  track: Track;
}

interface Ticket {
  id: string;
  name: string;
  preisEuro: number;
  einheit: string;
  merkmale: string[];
  hervorgehoben: boolean;
  badge?: string;
}

interface Anmeldedaten {
  name: string;
  email: string;
  firma: string;
  ticketTyp: string;
}

/* ---------------------------------------------------------------------- */
/*  DOM-Hilfsfunktionen                                                    */
/* ---------------------------------------------------------------------- */

function holeElement<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (el === null) {
    throw new Error(`Element mit id="${id}" wurde nicht gefunden.`);
  }
  return el as T;
}

/* ---------------------------------------------------------------------- */
/*  Daten                                                                  */
/* ---------------------------------------------------------------------- */

const sprecherListe: Sprecher[] = [
  {
    id: "vogt",
    name: "Dr. Lena Vogt",
    rolle: "Principal Engineer",
    firma: "Nordwind Systems",
    bio: "Baut seit 15 Jahren verteilte Systeme und erklärt Architekturentscheidungen so, dass sie auch am Montagmorgen Sinn ergeben.",
    initialen: "LV",
  },
  {
    id: "brandt",
    name: "Jonas Brandt",
    rolle: "Head of DevOps",
    firma: "Kettner Digital",
    bio: "Verantwortet CI/CD-Pipelines für über 40 Teams und liebt es, Deployments langweilig zu machen.",
    initialen: "JB",
  },
  {
    id: "odei",
    name: "Prof. Dr. Amara Odei",
    rolle: "Lehrstuhl für Verteilte Systeme",
    firma: "TH Rheinland",
    bio: "Forscht zu Event-Driven Architectures und übersetzt akademische Konzepte in Praxistipps für Entwicklerteams.",
    initialen: "AO",
  },
  {
    id: "falkner",
    name: "Mika Falkner",
    rolle: "Staff Frontend Engineer",
    firma: "Bitgarten GmbH",
    bio: "Setzt sich seit Jahren für barrierefreie Weboberflächen ein und hat schon mehr Design-Systeme gebaut, als sie zählen möchte.",
    initialen: "MF",
  },
  {
    id: "lindqvist",
    name: "Sara Lindqvist",
    rolle: "Security Consultant",
    firma: "Graufalke Security",
    bio: "Hilft Teams, Supply-Chain-Risiken zu erkennen, bevor sie zu Vorfällen werden – pragmatisch statt panisch.",
    initialen: "SL",
  },
  {
    id: "ahrens",
    name: "Tobias Ahrens",
    rolle: "Founder",
    firma: "Kleinlicht Labs",
    bio: "Hat aus einem Wochenend-Projekt ein tragfähiges Produkt gemacht und teilt ungeschönt, was dabei schiefging.",
    initialen: "TA",
  },
];

const agendaListe: AgendaEintrag[] = [
  { id: "a1", zeit: "09:30", titel: "Software als Handwerk: Warum Sorgfalt gewinnt", sprecherName: "Dr. Lena Vogt", raum: "Hauptbühne", track: "Keynote" },
  { id: "a2", zeit: "10:30", titel: "Microservices ohne Chaos", sprecherName: "Jonas Brandt", raum: "Raum 1", track: "A" },
  { id: "a3", zeit: "10:30", titel: "Design Systems, die Entwickler:innen lieben", sprecherName: "Mika Falkner", raum: "Raum 2", track: "B" },
  { id: "a4", zeit: "10:30", titel: "Zero Trust für kleine Teams", sprecherName: "Sara Lindqvist", raum: "Raum 3", track: "C" },
  { id: "a5", zeit: "11:30", titel: "Event-Driven Architecture in der Praxis", sprecherName: "Prof. Dr. Amara Odei", raum: "Raum 1", track: "A" },
  { id: "a6", zeit: "11:30", titel: "Barrierefreie Formulare, die niemand hasst", sprecherName: "Mika Falkner", raum: "Raum 2", track: "B" },
  { id: "a7", zeit: "11:30", titel: "Vom Hobby zum Startup: Lessons Learned", sprecherName: "Tobias Ahrens", raum: "Raum 3", track: "C" },
  { id: "a8", zeit: "13:00", titel: "Observability: Logs, Metrics, Traces", sprecherName: "Jonas Brandt", raum: "Raum 1", track: "A" },
  { id: "a9", zeit: "13:00", titel: "State Management im Jahr 2026", sprecherName: "Mika Falkner", raum: "Raum 2", track: "B" },
  { id: "a10", zeit: "13:00", titel: "Supply-Chain-Sicherheit für Open Source", sprecherName: "Sara Lindqvist", raum: "Raum 3", track: "C" },
  { id: "a11", zeit: "14:30", titel: "Die nächsten zehn Jahre Softwareentwicklung", sprecherName: "Prof. Dr. Amara Odei", raum: "Hauptbühne", track: "Keynote" },
];

const ticketListe: Ticket[] = [
  {
    id: "early-bird",
    name: "Early Bird",
    preisEuro: 149,
    einheit: "pro Person",
    merkmale: [
      "Zugang zu allen Talks & Tracks",
      "Digitale Konferenzunterlagen",
      "Mittagessen an beiden Tagen",
      "Gültig nur bis 15. Oktober 2026",
    ],
    hervorgehoben: false,
  },
  {
    id: "standard",
    name: "Standard",
    preisEuro: 219,
    einheit: "pro Person",
    merkmale: [
      "Zugang zu allen Talks & Tracks",
      "Digitale Konferenzunterlagen",
      "Mittagessen an beiden Tagen",
      "Zugang zum Networking-Abend",
    ],
    hervorgehoben: true,
    badge: "Beliebt",
  },
  {
    id: "team",
    name: "Team",
    preisEuro: 179,
    einheit: "pro Person, ab 3 Tickets",
    merkmale: [
      "Alle Leistungen aus Standard",
      "Dediziertes Team-Meeting-Room",
      "Gemeinsame Rechnung für das Team",
      "Rabatt ab dem dritten Ticket",
    ],
    hervorgehoben: false,
  },
];

/* ---------------------------------------------------------------------- */
/*  Rendering: Sprecher                                                    */
/* ---------------------------------------------------------------------- */

function renderSprecher(): void {
  const container = holeElement<HTMLDivElement>("sprecher-grid");
  container.innerHTML = "";

  for (const person of sprecherListe) {
    const card = document.createElement("article");
    card.className = "speaker-card";

    const avatar = document.createElement("div");
    avatar.className = "speaker-card__avatar";
    avatar.style.background = `linear-gradient(135deg, var(--color-accent-1), var(--color-accent-2))`;
    avatar.textContent = person.initialen;

    const name = document.createElement("h3");
    name.className = "speaker-card__name";
    name.textContent = person.name;

    const rolle = document.createElement("p");
    rolle.className = "speaker-card__role";
    rolle.textContent = `${person.rolle} · ${person.firma}`;

    const bio = document.createElement("p");
    bio.className = "speaker-card__bio";
    bio.textContent = person.bio;

    card.append(avatar, name, rolle, bio);
    container.appendChild(card);
  }
}

/* ---------------------------------------------------------------------- */
/*  Rendering: Agenda + Filter                                             */
/* ---------------------------------------------------------------------- */

function trackLabel(track: Track): string {
  switch (track) {
    case "Keynote":
      return "Keynote";
    case "A":
      return "Track A";
    case "B":
      return "Track B";
    case "C":
      return "Track C";
  }
}

function renderAgenda(filter: TrackFilter): void {
  const liste = holeElement<HTMLUListElement>("agenda-liste");
  const leerHinweis = holeElement<HTMLParagraphElement>("agenda-leer");

  const gefiltert: AgendaEintrag[] =
    filter === "Alle" ? agendaListe : agendaListe.filter((eintrag) => eintrag.track === filter);

  liste.innerHTML = "";

  if (gefiltert.length === 0) {
    leerHinweis.hidden = false;
    return;
  }
  leerHinweis.hidden = true;

  for (const eintrag of gefiltert) {
    const item = document.createElement("li");
    item.className = "agenda-item";

    const zeit = document.createElement("span");
    zeit.className = "agenda-item__time";
    zeit.textContent = eintrag.zeit;

    const mitte = document.createElement("div");
    const titel = document.createElement("p");
    titel.className = "agenda-item__title";
    titel.textContent = eintrag.titel;
    const meta = document.createElement("p");
    meta.className = "agenda-item__meta";
    meta.textContent = `${eintrag.sprecherName} · ${eintrag.raum}`;
    mitte.append(titel, meta);

    const trackTag = document.createElement("span");
    trackTag.className = `agenda-item__track track--${eintrag.track}`;
    trackTag.textContent = trackLabel(eintrag.track);

    item.append(zeit, mitte, trackTag);
    liste.appendChild(item);
  }
}

function initAgendaFilter(): void {
  const filterContainer = holeElement<HTMLDivElement>("agenda-filter");
  const buttons = Array.from(filterContainer.querySelectorAll<HTMLButtonElement>(".filter-btn"));

  filterContainer.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement)) {
      return;
    }
    const track = target.dataset["track"];
    if (track === undefined) {
      return;
    }

    for (const btn of buttons) {
      btn.classList.toggle("is-active", btn === target);
    }

    renderAgenda(track as TrackFilter);
  });
}

/* ---------------------------------------------------------------------- */
/*  Rendering: Tickets                                                     */
/* ---------------------------------------------------------------------- */

function renderTickets(): void {
  const container = holeElement<HTMLDivElement>("tickets-grid");
  container.innerHTML = "";

  const waehrung = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  for (const ticket of ticketListe) {
    const card = document.createElement("article");
    card.className = ticket.hervorgehoben ? "ticket-card ticket-card--highlight" : "ticket-card";

    if (ticket.badge !== undefined) {
      const badge = document.createElement("span");
      badge.className = "ticket-card__badge";
      badge.textContent = ticket.badge;
      card.appendChild(badge);
    }

    const name = document.createElement("h3");
    name.className = "ticket-card__name";
    name.textContent = ticket.name;

    const preis = document.createElement("p");
    preis.className = "ticket-card__price";
    const einheitSpan = document.createElement("span");
    einheitSpan.textContent = ` / ${ticket.einheit}`;
    preis.textContent = waehrung.format(ticket.preisEuro);
    preis.appendChild(einheitSpan);

    const merkmale = document.createElement("ul");
    merkmale.className = "ticket-card__features";
    for (const merkmal of ticket.merkmale) {
      const li = document.createElement("li");
      li.textContent = merkmal;
      merkmale.appendChild(li);
    }

    const cta = document.createElement("a");
    cta.className = ticket.hervorgehoben ? "btn btn--primary btn--block" : "btn btn--ghost btn--block";
    cta.href = "#anmeldung";
    cta.textContent = "Ticket wählen";

    card.append(name, preis, merkmale, cta);
    container.appendChild(card);
  }
}

/* ---------------------------------------------------------------------- */
/*  Countdown                                                              */
/* ---------------------------------------------------------------------- */

const EVENT_START = new Date(2026, 10, 12, 9, 0, 0); // 12. November 2026, 09:00 Uhr
const EVENT_ENDE = new Date(2026, 10, 13, 18, 0, 0); // 13. November 2026, 18:00 Uhr

function zweistellig(wert: number): string {
  return wert.toString().padStart(2, "0");
}

function starteCountdown(): void {
  const tageEl = holeElement<HTMLSpanElement>("countdown-tage");
  const stundenEl = holeElement<HTMLSpanElement>("countdown-stunden");
  const minutenEl = holeElement<HTMLSpanElement>("countdown-minuten");
  const sekundenEl = holeElement<HTMLSpanElement>("countdown-sekunden");
  const statusEl = holeElement<HTMLParagraphElement>("countdown-status");

  let intervalId: number | undefined;

  function aktualisiere(): void {
    const jetzt = new Date();
    const diffStart = EVENT_START.getTime() - jetzt.getTime();

    if (diffStart <= 0) {
      const diffEnde = EVENT_ENDE.getTime() - jetzt.getTime();

      tageEl.textContent = "00";
      stundenEl.textContent = "00";
      minutenEl.textContent = "00";
      sekundenEl.textContent = "00";

      if (diffEnde > 0) {
        statusEl.textContent = "Das Event läuft gerade live!";
      } else {
        statusEl.textContent = "Das Event ist vorbei. Bis zum nächsten Mal!";
      }

      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
      }
      return;
    }

    const sekundenGesamt = Math.floor(diffStart / 1000);
    const tage = Math.floor(sekundenGesamt / (24 * 60 * 60));
    const stunden = Math.floor((sekundenGesamt % (24 * 60 * 60)) / (60 * 60));
    const minuten = Math.floor((sekundenGesamt % (60 * 60)) / 60);
    const sekunden = sekundenGesamt % 60;

    tageEl.textContent = zweistellig(tage);
    stundenEl.textContent = zweistellig(stunden);
    minutenEl.textContent = zweistellig(minuten);
    sekundenEl.textContent = zweistellig(sekunden);
    statusEl.textContent = "Bis zum Einlass im Rheinforum Congress Center.";
  }

  aktualisiere();
  intervalId = window.setInterval(aktualisiere, 1000);
}

/* ---------------------------------------------------------------------- */
/*  Anmeldeformular                                                        */
/* ---------------------------------------------------------------------- */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function leseFormular(form: HTMLFormElement): Anmeldedaten {
  const nameInput = form.elements.namedItem("name");
  const emailInput = form.elements.namedItem("email");
  const firmaInput = form.elements.namedItem("firma");
  const ticketSelect = form.elements.namedItem("ticketTyp");

  const name = nameInput instanceof HTMLInputElement ? nameInput.value.trim() : "";
  const email = emailInput instanceof HTMLInputElement ? emailInput.value.trim() : "";
  const firma = firmaInput instanceof HTMLInputElement ? firmaInput.value.trim() : "";
  const ticketTyp = ticketSelect instanceof HTMLSelectElement ? ticketSelect.value : "";

  return { name, email, firma, ticketTyp };
}

function setzeFeldFehler(feldId: string, fehlerId: string, nachricht: string): void {
  const feldWrapper = holeElement<HTMLElement>(feldId).closest(".form-row");
  const fehlerEl = holeElement<HTMLParagraphElement>(fehlerId);

  fehlerEl.textContent = nachricht;
  if (feldWrapper !== null) {
    feldWrapper.classList.toggle("has-error", nachricht.length > 0);
  }
}

function validiereAnmeldung(daten: Anmeldedaten): boolean {
  let istGueltig = true;

  if (daten.name.length === 0) {
    setzeFeldFehler("feld-name", "fehler-name", "Bitte gib deinen Namen ein.");
    istGueltig = false;
  } else {
    setzeFeldFehler("feld-name", "fehler-name", "");
  }

  if (daten.email.length === 0) {
    setzeFeldFehler("feld-email", "fehler-email", "Bitte gib deine E-Mail-Adresse ein.");
    istGueltig = false;
  } else if (!EMAIL_REGEX.test(daten.email)) {
    setzeFeldFehler("feld-email", "fehler-email", "Bitte gib eine gültige E-Mail-Adresse ein.");
    istGueltig = false;
  } else {
    setzeFeldFehler("feld-email", "fehler-email", "");
  }

  if (daten.ticketTyp.length === 0) {
    setzeFeldFehler("feld-ticket", "fehler-ticket", "Bitte wähle einen Ticket-Typ aus.");
    istGueltig = false;
  } else {
    setzeFeldFehler("feld-ticket", "fehler-ticket", "");
  }

  return istGueltig;
}

function erzeugeBestaetigungsnummer(): string {
  const jahr = EVENT_START.getFullYear();
  const zufallsteil = Math.floor(Math.random() * 900000 + 100000);
  return `CWC-${jahr}-${zufallsteil}`;
}

function zeigeErfolg(daten: Anmeldedaten, form: HTMLFormElement): void {
  const erfolgBox = holeElement<HTMLDivElement>("anmelde-erfolg");
  const erfolgName = holeElement<HTMLSpanElement>("erfolg-name");
  const erfolgCode = holeElement<HTMLParagraphElement>("erfolg-code");

  erfolgName.textContent = daten.name;
  erfolgCode.textContent = erzeugeBestaetigungsnummer();

  form.hidden = true;
  erfolgBox.hidden = false;
  erfolgBox.scrollIntoView({ behavior: "smooth", block: "center" });
}

function initAnmeldeformular(): void {
  const form = holeElement<HTMLFormElement>("anmelde-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const daten = leseFormular(form);
    const istGueltig = validiereAnmeldung(daten);

    if (!istGueltig) {
      return;
    }

    zeigeErfolg(daten, form);
  });
}

/* ---------------------------------------------------------------------- */
/*  Start                                                                  */
/* ---------------------------------------------------------------------- */

function init(): void {
  renderSprecher();
  renderAgenda("Alle");
  initAgendaFilter();
  renderTickets();
  starteCountdown();
  initAnmeldeformular();
}

document.addEventListener("DOMContentLoaded", init);
