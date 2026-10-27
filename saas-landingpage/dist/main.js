"use strict";
/* ==========================================================================
   Sentrix – B2B SaaS Landingpage (Portfolio-Demoprojekt)
   src/main.ts – Typisierte Rendering- und Interaktionslogik
   ========================================================================== */
/* --------------------------------------------------------------------------
   Typisierte Daten
   -------------------------------------------------------------------------- */
const kunden = [
    { name: "Nordkreis Logistik" },
    { name: "Veltrona Group" },
    { name: "Baumeister & Cie." },
    { name: "Solvix Industries" },
    { name: "Kaltenberg Systems" },
    { name: "Arvano Dynamics" },
];
const features = [
    {
        titel: "Echtzeit-Monitoring",
        beschreibung: "Metriken aus Infrastruktur, Anwendungen und Netzwerk laufen in einem einzigen Live-Dashboard zusammen.",
        iconSvg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l5-6 4 4 6-8"/><path d="M3 21h18"/></svg>`,
    },
    {
        titel: "Intelligentes Alerting",
        beschreibung: "Schwellenwerte passen sich an historische Muster an, damit nur relevante Alarme Ihr Team erreichen.",
        iconSvg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a5 5 0 0 0-5 5v3l-2 4h14l-2-4V8a5 5 0 0 0-5-5z"/><path d="M9.5 19a2.5 2.5 0 0 0 5 0"/></svg>`,
    },
    {
        titel: "Incident-Timeline",
        beschreibung: "Jeder Vorfall wird automatisch mit Logs, Deploys und Kommentaren zu einer nachvollziehbaren Timeline verknüpft.",
        iconSvg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>`,
    },
    {
        titel: "On-Call-Planung",
        beschreibung: "Rotationspläne, Eskalationsstufen und Übergaben lassen sich zentral verwalten und automatisch synchronisieren.",
        iconSvg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18"/><path d="M8 3v3M16 3v3"/></svg>`,
    },
    {
        titel: "Automatisierte Post-Mortems",
        beschreibung: "Nach jedem Incident erstellt Sentrix automatisch einen Bericht mit Zeitachse, Kennzahlen und Handlungsempfehlungen.",
        iconSvg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h9l3 3v15H6z"/><path d="M9 9h6M9 13h6M9 17h4"/></svg>`,
    },
    {
        titel: "Offene API &amp; Integrationen",
        beschreibung: "Über 60 native Integrationen sowie eine offene REST-API binden Sentrix nahtlos in Ihren bestehenden Stack ein.",
        iconSvg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><path d="M10 6.5h4a3 3 0 0 1 3 3v4"/></svg>`,
    },
];
const plaene = [
    { id: "starter", name: "Starter", preisAbMonat: 0, hervorgehoben: false },
    { id: "business", name: "Business", preisAbMonat: 49, hervorgehoben: true },
    { id: "enterprise", name: "Enterprise", preisAbMonat: 199, hervorgehoben: false },
];
const vergleichszeilen = [
    {
        label: "Monitoring-Ziele",
        werte: { starter: "bis 5", business: "bis 50", enterprise: "unbegrenzt" },
    },
    {
        label: "Datenaufbewahrung",
        werte: { starter: "7 Tage", business: "90 Tage", enterprise: "24 Monate" },
    },
    {
        label: "Intelligentes Alerting",
        werte: { starter: false, business: true, enterprise: true },
    },
    {
        label: "On-Call-Planung",
        werte: { starter: false, business: true, enterprise: true },
    },
    {
        label: "Automatisierte Post-Mortems",
        werte: { starter: false, business: false, enterprise: true },
    },
    {
        label: "Single Sign-On (SSO)",
        werte: { starter: false, business: false, enterprise: true },
    },
    {
        label: "SLA-Garantie",
        werte: { starter: "-", business: "99,9 %", enterprise: "99,95 %" },
    },
    {
        label: "Support",
        werte: { starter: "Community", business: "E-Mail, 24h", enterprise: "Dediziert, 24/7" },
    },
];
/* --------------------------------------------------------------------------
   Konstanten des Preisrechners
   -------------------------------------------------------------------------- */
const GRUNDGEBUEHR_MONATLICH = 49;
const PREIS_PRO_SEAT = 19;
const SCHWELLE_RABATT_KLEIN = 10;
const SCHWELLE_RABATT_GROSS = 25;
const RABATT_KLEIN_PROZENT = 10;
const RABATT_GROSS_PROZENT = 20;
const waehrungsFormat = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});
/* --------------------------------------------------------------------------
   Hilfsfunktionen
   -------------------------------------------------------------------------- */
/** Holt ein Element per ID und wirft einen Fehler, falls es fehlt (statt "null" durchzureichen). */
function holeElement(id) {
    const element = document.getElementById(id);
    if (element === null) {
        throw new Error(`Erwartetes Element mit ID "${id}" wurde im DOM nicht gefunden.`);
    }
    return element;
}
/** Erstellt ein DOM-Element mit optionalen Klassen und HTML-Inhalt. */
function erstelleElement(tag, klassen = [], innerHTML = "") {
    const el = document.createElement(tag);
    if (klassen.length > 0) {
        el.classList.add(...klassen);
    }
    if (innerHTML) {
        el.innerHTML = innerHTML;
    }
    return el;
}
/* --------------------------------------------------------------------------
   Preisberechnung (Kern-Business-Logik des Kalkulators)
   -------------------------------------------------------------------------- */
/**
 * Berechnet den monatlichen Preis für eine gegebene Anzahl an Nutzern (Seats).
 * Regel: Grundgebühr + (Preis pro Seat * Anzahl), abzüglich Mengenrabatt.
 *   - ab 25 Seats: 20 % Rabatt auf die Gesamtsumme
 *   - ab 10 Seats: 10 % Rabatt auf die Gesamtsumme
 *   - darunter: kein Rabatt
 */
function berechnePreis(anzahlNutzer) {
    const nutzerSicher = Math.max(1, Math.round(anzahlNutzer));
    const zwischensumme = GRUNDGEBUEHR_MONATLICH + PREIS_PRO_SEAT * nutzerSicher;
    let rabattProzent = 0;
    if (nutzerSicher >= SCHWELLE_RABATT_GROSS) {
        rabattProzent = RABATT_GROSS_PROZENT;
    }
    else if (nutzerSicher >= SCHWELLE_RABATT_KLEIN) {
        rabattProzent = RABATT_KLEIN_PROZENT;
    }
    const preisProMonat = zwischensumme * (1 - rabattProzent / 100);
    return { zwischensumme, rabattProzent, preisProMonat };
}
/* --------------------------------------------------------------------------
   Rendering: Trusted-by-Leiste
   -------------------------------------------------------------------------- */
function renderKunden() {
    const liste = holeElement("trusted-by-list");
    const fragment = document.createDocumentFragment();
    for (const kunde of kunden) {
        const item = erstelleElement("li", [], kunde.name);
        fragment.appendChild(item);
    }
    liste.appendChild(fragment);
}
/* --------------------------------------------------------------------------
   Rendering: Feature-Grid
   -------------------------------------------------------------------------- */
function renderFeatures() {
    const grid = holeElement("features-grid");
    const fragment = document.createDocumentFragment();
    for (const feature of features) {
        const card = erstelleElement("div", ["feature-card"]);
        const icon = erstelleElement("span", ["feature-icon"], feature.iconSvg);
        icon.setAttribute("aria-hidden", "true");
        const titel = erstelleElement("h3", [], feature.titel);
        const beschreibung = erstelleElement("p", [], feature.beschreibung);
        card.append(icon, titel, beschreibung);
        fragment.appendChild(card);
    }
    grid.appendChild(fragment);
}
/* --------------------------------------------------------------------------
   Rendering: Preisrechner (Anzeige-Synchronisation)
   -------------------------------------------------------------------------- */
function aktualisierePreisanzeige(anzahlNutzer) {
    const ergebnis = berechnePreis(anzahlNutzer);
    const seatCount = holeElement("seat-count");
    const priceDisplay = holeElement("price-per-month");
    const discountBadge = holeElement("discount-badge");
    const subtotalDisplay = holeElement("price-subtotal");
    const discountAmountDisplay = holeElement("price-discount-amount");
    const yearlyDisplay = holeElement("price-yearly");
    seatCount.textContent = String(Math.round(anzahlNutzer));
    priceDisplay.textContent = waehrungsFormat.format(ergebnis.preisProMonat);
    subtotalDisplay.textContent = waehrungsFormat.format(ergebnis.zwischensumme);
    discountAmountDisplay.textContent = `${ergebnis.rabattProzent} %`;
    yearlyDisplay.textContent = waehrungsFormat.format(ergebnis.preisProMonat * 12);
    if (ergebnis.rabattProzent > 0) {
        discountBadge.hidden = false;
        discountBadge.textContent = `−${ergebnis.rabattProzent} % Mengenrabatt aktiv`;
    }
    else {
        discountBadge.hidden = true;
    }
}
function initialisierePreisrechner() {
    const slider = holeElement("seat-slider");
    const baseFeeDisplay = holeElement("base-fee-display");
    const perSeatDisplay = holeElement("per-seat-display");
    baseFeeDisplay.textContent = waehrungsFormat.format(GRUNDGEBUEHR_MONATLICH);
    perSeatDisplay.textContent = waehrungsFormat.format(PREIS_PRO_SEAT);
    slider.addEventListener("input", () => {
        aktualisierePreisanzeige(Number(slider.value));
    });
    // Initialer Zustand beim Laden der Seite.
    aktualisierePreisanzeige(Number(slider.value));
}
/* --------------------------------------------------------------------------
   Rendering: Vergleichstabelle
   -------------------------------------------------------------------------- */
function formatiereWert(wert) {
    if (typeof wert === "boolean") {
        return wert
            ? `<span class="check-yes" aria-label="enthalten">&#10003;</span>`
            : `<span class="check-no" aria-label="nicht enthalten">&#8211;</span>`;
    }
    return wert;
}
function renderVergleichstabelle() {
    const thead = holeElement("comparison-thead");
    const tbody = holeElement("comparison-tbody");
    // --- Kopfzeile aus den Plan-Daten aufbauen ---
    const headRow = erstelleElement("tr");
    headRow.appendChild(erstelleElement("th", [], "Funktion"));
    for (const plan of plaene) {
        const klassen = plan.hervorgehoben ? ["plan-col", "is-highlighted"] : ["plan-col"];
        const preisText = plan.preisAbMonat === 0
            ? "Kostenlos"
            : `<span class="plan-price">${waehrungsFormat.format(plan.preisAbMonat)}</span><span class="plan-price-period">pro Monat, ab</span>`;
        const th = erstelleElement("th", klassen, `${plan.name}<br>${preisText}`);
        headRow.appendChild(th);
    }
    thead.appendChild(headRow);
    // --- Datenzeilen aus den Vergleichsdaten aufbauen ---
    const fragment = document.createDocumentFragment();
    for (const zeile of vergleichszeilen) {
        const tr = erstelleElement("tr");
        tr.appendChild(erstelleElement("th", [], zeile.label));
        for (const plan of plaene) {
            const wert = zeile.werte[plan.id];
            const td = erstelleElement("td", ["plan-cell"], formatiereWert(wert));
            tr.appendChild(td);
        }
        fragment.appendChild(tr);
    }
    tbody.appendChild(fragment);
}
/* --------------------------------------------------------------------------
   Kontaktformular: Validierung
   -------------------------------------------------------------------------- */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function leseFormularDaten(form) {
    const nameInput = holeElement("input-name");
    const emailInput = holeElement("input-email");
    const companyInput = holeElement("input-company");
    const messageInput = holeElement("input-message");
    // form wird nur zur eindeutigen Zuordnung des aufrufenden Formulars mitgegeben.
    void form;
    return {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        unternehmen: companyInput.value.trim(),
        nachricht: messageInput.value.trim(),
    };
}
function setzeFehler(inputId, errorId, nachricht) {
    const input = document.getElementById(inputId);
    const errorEl = holeElement(errorId);
    errorEl.textContent = nachricht;
    if (input instanceof HTMLElement) {
        input.classList.toggle("is-invalid", nachricht.length > 0);
    }
}
function validiereFormular(daten) {
    let istGueltig = true;
    if (daten.name.length === 0) {
        setzeFehler("input-name", "error-name", "Bitte geben Sie Ihren Namen an.");
        istGueltig = false;
    }
    else {
        setzeFehler("input-name", "error-name", "");
    }
    if (daten.email.length === 0) {
        setzeFehler("input-email", "error-email", "Bitte geben Sie Ihre E-Mail-Adresse an.");
        istGueltig = false;
    }
    else if (!EMAIL_REGEX.test(daten.email)) {
        setzeFehler("input-email", "error-email", "Bitte geben Sie eine gültige E-Mail-Adresse an.");
        istGueltig = false;
    }
    else {
        setzeFehler("input-email", "error-email", "");
    }
    if (daten.unternehmen.length === 0) {
        setzeFehler("input-company", "error-company", "Bitte geben Sie Ihren Unternehmensnamen an.");
        istGueltig = false;
    }
    else {
        setzeFehler("input-company", "error-company", "");
    }
    // Nachricht ist optional, aber auf eine sinnvolle Maximallänge begrenzt.
    if (daten.nachricht.length > 1000) {
        setzeFehler("input-message", "error-message", "Die Nachricht darf maximal 1000 Zeichen umfassen.");
        istGueltig = false;
    }
    else {
        setzeFehler("input-message", "error-message", "");
    }
    return istGueltig;
}
function initialisiereFormular() {
    const form = holeElement("demo-form");
    const successBox = holeElement("form-success");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        successBox.hidden = true;
        const daten = leseFormularDaten(form);
        const istGueltig = validiereFormular(daten);
        if (!istGueltig) {
            return;
        }
        // Es werden keine Daten an einen Server gesendet – reine Demo-Simulation.
        successBox.hidden = false;
        form.reset();
    });
}
/* --------------------------------------------------------------------------
   Einstiegspunkt
   -------------------------------------------------------------------------- */
function init() {
    renderKunden();
    renderFeatures();
    renderVergleichstabelle();
    initialisierePreisrechner();
    initialisiereFormular();
}
document.addEventListener("DOMContentLoaded", init);
