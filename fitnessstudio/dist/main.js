"use strict";
/**
 * IRONFLOW STUDIO – Portfolio-Demoprojekt
 * ----------------------------------------
 * Reines TypeScript ohne Frameworks. Demonstriert:
 *  - Interfaces/Types für Domänendaten
 *  - Rendering von Daten in den DOM (kein hartkodiertes HTML für den Kursplan)
 *  - Filterlogik über Array.prototype.filter
 *  - Formularvalidierung mit Regex und Fehleranzeige pro Feld
 *  - Einen echten Rechner (BMI + Kalorienbedarf nach Mifflin-St Jeor)
 *
 * Dieses Projekt ist rein fiktiv und dient ausschließlich als
 * Programmier-Demonstration (siehe README.md).
 */
/* -------------------------------------------------------------------------
 * 2. Statische Beispieldaten (typisiert)
 * ---------------------------------------------------------------------- */
const KURSE = [
    { id: 'k1', name: 'Sunrise Yoga', kategorie: 'Yoga', tag: 'Montag', uhrzeit: '07:00', dauerMinuten: 60, trainer: 'Mara Feld', level: 'Alle Level' },
    { id: 'k2', name: 'HIIT Blast', kategorie: 'HIIT', tag: 'Montag', uhrzeit: '18:30', dauerMinuten: 45, trainer: 'Jonas Reuter', level: 'Fortgeschritten' },
    { id: 'k3', name: 'Grundlagen Krafttraining', kategorie: 'Krafttraining', tag: 'Dienstag', uhrzeit: '17:00', dauerMinuten: 60, trainer: 'Sina Bode', level: 'Einsteiger' },
    { id: 'k4', name: 'Cardio Pulse', kategorie: 'Cardio', tag: 'Dienstag', uhrzeit: '19:15', dauerMinuten: 45, trainer: 'Jonas Reuter', level: 'Alle Level' },
    { id: 'k5', name: 'Power Pilates', kategorie: 'Pilates', tag: 'Mittwoch', uhrzeit: '08:00', dauerMinuten: 50, trainer: 'Mara Feld', level: 'Alle Level' },
    { id: 'k6', name: 'Box Camp', kategorie: 'Boxen', tag: 'Mittwoch', uhrzeit: '18:00', dauerMinuten: 60, trainer: 'Deniz Aksoy', level: 'Fortgeschritten' },
    { id: 'k7', name: 'Yoga Flow', kategorie: 'Yoga', tag: 'Donnerstag', uhrzeit: '07:00', dauerMinuten: 60, trainer: 'Mara Feld', level: 'Alle Level' },
    { id: 'k8', name: 'Hantel & Hypertrophie', kategorie: 'Krafttraining', tag: 'Donnerstag', uhrzeit: '17:30', dauerMinuten: 75, trainer: 'Sina Bode', level: 'Fortgeschritten' },
    { id: 'k9', name: 'HIIT Express', kategorie: 'HIIT', tag: 'Freitag', uhrzeit: '12:15', dauerMinuten: 30, trainer: 'Deniz Aksoy', level: 'Alle Level' },
    { id: 'k10', name: 'Cardio Dance', kategorie: 'Cardio', tag: 'Freitag', uhrzeit: '18:45', dauerMinuten: 45, trainer: 'Sina Bode', level: 'Einsteiger' },
    { id: 'k11', name: 'Core & Pilates', kategorie: 'Pilates', tag: 'Samstag', uhrzeit: '10:00', dauerMinuten: 50, trainer: 'Mara Feld', level: 'Einsteiger' },
    { id: 'k12', name: 'Box Grundkurs', kategorie: 'Boxen', tag: 'Samstag', uhrzeit: '11:15', dauerMinuten: 60, trainer: 'Deniz Aksoy', level: 'Einsteiger' },
];
const MITGLIEDSCHAFTEN = [
    {
        id: 'basic',
        name: 'Basic',
        preisProMonat: 24.9,
        beschreibung: 'Der einfache Einstieg ins Training.',
        leistungen: [
            'Zugang zum Gerätepark',
            'Nutzung während der Kernzeiten (6–22 Uhr)',
            'Kostenloser Trainingsplan zum Start',
        ],
        empfohlen: false,
    },
    {
        id: 'premium',
        name: 'Premium',
        preisProMonat: 39.9,
        beschreibung: 'Für alle, die regelmäßig und flexibel trainieren.',
        leistungen: [
            'Alle Basic-Leistungen',
            '24/7 Zugang per App',
            'Alle Kursformate inklusive',
            '1x Personal-Training-Check pro Monat',
        ],
        empfohlen: true,
    },
    {
        id: 'elite',
        name: 'Elite',
        preisProMonat: 59.9,
        beschreibung: 'Maximale Betreuung für ambitionierte Ziele.',
        leistungen: [
            'Alle Premium-Leistungen',
            'Wöchentliches 1:1 Coaching',
            'Individuelle Ernährungsberatung',
            'Zugang zu Wellness-Bereich & Sauna',
        ],
        empfohlen: false,
    },
];
const AKTIVITAETSFAKTOR = {
    kaum: 1.2,
    leicht: 1.375,
    moderat: 1.55,
    hoch: 1.725,
    sehrHoch: 1.9,
};
/* -------------------------------------------------------------------------
 * 3. Hilfsfunktionen: DOM-Zugriff mit Typprüfung
 * ---------------------------------------------------------------------- */
function requireElement(selector) {
    const el = document.querySelector(selector);
    if (!el) {
        throw new Error(`Element nicht gefunden: ${selector}`);
    }
    return el;
}
function euro(betrag) {
    return betrag.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
/* -------------------------------------------------------------------------
 * 4. Kursplan: Rendering + Filter
 * ---------------------------------------------------------------------- */
const WOCHENTAGE = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
const KATEGORIEN = ['Yoga', 'HIIT', 'Krafttraining', 'Cardio', 'Pilates', 'Boxen'];
const filterState = {
    tag: 'alle',
    kategorie: 'alle',
};
function kursKarteHtml(kurs) {
    return `
    <article class="kurs-karte" data-kategorie="${kurs.kategorie}">
      <div class="kurs-karte__kopf">
        <span class="badge badge--${kurs.kategorie.toLowerCase()}">${kurs.kategorie}</span>
        <span class="kurs-karte__zeit">${kurs.tag}, ${kurs.uhrzeit} Uhr</span>
      </div>
      <h3 class="kurs-karte__titel">${kurs.name}</h3>
      <dl class="kurs-karte__details">
        <div><dt>Dauer</dt><dd>${kurs.dauerMinuten} Min.</dd></div>
        <div><dt>Trainer:in</dt><dd>${kurs.trainer}</dd></div>
        <div><dt>Level</dt><dd>${kurs.level}</dd></div>
      </dl>
    </article>
  `;
}
function gefilterteKurse() {
    return KURSE.filter((kurs) => {
        const tagPasst = filterState.tag === 'alle' || kurs.tag === filterState.tag;
        const kategoriePasst = filterState.kategorie === 'alle' || kurs.kategorie === filterState.kategorie;
        return tagPasst && kategoriePasst;
    });
}
function renderKursplan() {
    const container = requireElement('#kursplan-liste');
    const treffer = gefilterteKurse();
    if (treffer.length === 0) {
        container.innerHTML = `<p class="kursplan-leer">Keine Kurse für diese Auswahl gefunden. Bitte Filter anpassen.</p>`;
        return;
    }
    container.innerHTML = treffer.map(kursKarteHtml).join('');
}
function initKursplanFilter() {
    const tagAuswahl = requireElement('#filter-tag');
    const kategorieContainer = requireElement('#filter-kategorie');
    // Tag-Optionen dynamisch erzeugen
    const alleOption = document.createElement('option');
    alleOption.value = 'alle';
    alleOption.textContent = 'Alle Tage';
    tagAuswahl.appendChild(alleOption);
    WOCHENTAGE.forEach((tag) => {
        const option = document.createElement('option');
        option.value = tag;
        option.textContent = tag;
        tagAuswahl.appendChild(option);
    });
    tagAuswahl.addEventListener('change', () => {
        const wert = tagAuswahl.value;
        filterState.tag = (wert === 'alle' ? 'alle' : wert);
        renderKursplan();
    });
    // Kategorie-Buttons dynamisch erzeugen
    const kategorieOptionen = ['alle', ...KATEGORIEN];
    kategorieOptionen.forEach((kategorie) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'filter-chip';
        button.textContent = kategorie === 'alle' ? 'Alle Kategorien' : kategorie;
        button.dataset.kategorie = kategorie;
        if (kategorie === 'alle') {
            button.classList.add('filter-chip--aktiv');
        }
        button.addEventListener('click', () => {
            filterState.kategorie = kategorie === 'alle' ? 'alle' : kategorie;
            kategorieContainer
                .querySelectorAll('.filter-chip')
                .forEach((chip) => chip.classList.remove('filter-chip--aktiv'));
            button.classList.add('filter-chip--aktiv');
            renderKursplan();
        });
        kategorieContainer.appendChild(button);
    });
    renderKursplan();
}
/* -------------------------------------------------------------------------
 * 5. Mitgliedschaften: Rendering
 * ---------------------------------------------------------------------- */
function mitgliedschaftKarteHtml(tarif) {
    const leistungenHtml = tarif.leistungen
        .map((leistung) => `<li>${leistung}</li>`)
        .join('');
    return `
    <article class="tarif-karte ${tarif.empfohlen ? 'tarif-karte--empfohlen' : ''}">
      ${tarif.empfohlen ? '<span class="tarif-karte__ribbon">Beliebteste Wahl</span>' : ''}
      <h3 class="tarif-karte__name">${tarif.name}</h3>
      <p class="tarif-karte__preis"><span>${euro(tarif.preisProMonat)} €</span>/ Monat</p>
      <p class="tarif-karte__beschreibung">${tarif.beschreibung}</p>
      <ul class="tarif-karte__leistungen">${leistungenHtml}</ul>
      <button type="button" class="button button--block ${tarif.empfohlen ? 'button--primary' : 'button--outline'}" data-tarif="${tarif.id}">
        ${tarif.name} wählen
      </button>
    </article>
  `;
}
function renderMitgliedschaften() {
    const container = requireElement('#tarife-liste');
    container.innerHTML = MITGLIEDSCHAFTEN.map(mitgliedschaftKarteHtml).join('');
    container.querySelectorAll('button[data-tarif]').forEach((button) => {
        button.addEventListener('click', () => {
            const auswahl = requireElement('#anmeldung-tarif');
            auswahl.value = button.dataset.tarif ?? '';
            requireElement('#kontakt').scrollIntoView({ behavior: 'smooth' });
        });
    });
}
/* -------------------------------------------------------------------------
 * 6. Trainingsziel-Rechner (BMI + Kalorienbedarf nach Mifflin-St Jeor)
 * ---------------------------------------------------------------------- */
function berechneTrainingsziel(eingabe) {
    const groesseM = eingabe.groesseCm / 100;
    const bmi = eingabe.gewichtKg / (groesseM * groesseM);
    let bmiKategorie;
    if (bmi < 18.5) {
        bmiKategorie = 'Untergewicht';
    }
    else if (bmi < 25) {
        bmiKategorie = 'Normalgewicht';
    }
    else if (bmi < 30) {
        bmiKategorie = 'Übergewicht';
    }
    else {
        bmiKategorie = 'Starkes Übergewicht';
    }
    // Mifflin-St Jeor Formel für den Grundumsatz (Basalstoffwechsel)
    const geschlechtsKonstante = eingabe.geschlecht === 'maennlich' ? 5 : -161;
    const grundumsatzKcal = 10 * eingabe.gewichtKg + 6.25 * eingabe.groesseCm - 5 * eingabe.alter + geschlechtsKonstante;
    const gesamtumsatzKcal = grundumsatzKcal * AKTIVITAETSFAKTOR[eingabe.aktivitaet];
    return {
        bmi: Math.round(bmi * 10) / 10,
        bmiKategorie,
        grundumsatzKcal: Math.round(grundumsatzKcal),
        gesamtumsatzKcal: Math.round(gesamtumsatzKcal),
    };
}
function leseTrainingszielFormular(form) {
    const alterInput = form.elements.namedItem('alter');
    const groesseInput = form.elements.namedItem('groesse');
    const gewichtInput = form.elements.namedItem('gewicht');
    const geschlechtInput = form.elements.namedItem('geschlecht');
    const aktivitaetInput = form.elements.namedItem('aktivitaet');
    if (!(alterInput instanceof HTMLInputElement) ||
        !(groesseInput instanceof HTMLInputElement) ||
        !(gewichtInput instanceof HTMLInputElement) ||
        !(geschlechtInput instanceof HTMLSelectElement) ||
        !(aktivitaetInput instanceof HTMLSelectElement)) {
        return null;
    }
    return {
        alter: Number(alterInput.value),
        groesseCm: Number(groesseInput.value),
        gewichtKg: Number(gewichtInput.value),
        geschlecht: geschlechtInput.value,
        aktivitaet: aktivitaetInput.value,
    };
}
function validiereTrainingsziel(eingabe) {
    const fehler = [];
    if (!Number.isFinite(eingabe.alter) || eingabe.alter <= 0 || eingabe.alter > 120) {
        fehler.push('Bitte ein gültiges Alter zwischen 1 und 120 Jahren angeben.');
    }
    if (!Number.isFinite(eingabe.groesseCm) || eingabe.groesseCm <= 0 || eingabe.groesseCm > 250) {
        fehler.push('Bitte eine gültige Körpergröße zwischen 1 und 250 cm angeben.');
    }
    if (!Number.isFinite(eingabe.gewichtKg) || eingabe.gewichtKg <= 0 || eingabe.gewichtKg > 400) {
        fehler.push('Bitte ein gültiges Gewicht zwischen 1 und 400 kg angeben.');
    }
    return fehler;
}
function initTrainingszielRechner() {
    const form = requireElement('#rechner-formular');
    const ergebnisBox = requireElement('#rechner-ergebnis');
    const fehlerBox = requireElement('#rechner-fehler');
    const platzhalter = document.querySelector('#rechner-platzhalter');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const eingabe = leseTrainingszielFormular(form);
        if (!eingabe) {
            fehlerBox.textContent = 'Formular konnte nicht ausgelesen werden.';
            fehlerBox.hidden = false;
            ergebnisBox.hidden = true;
            return;
        }
        const fehler = validiereTrainingsziel(eingabe);
        if (fehler.length > 0) {
            fehlerBox.innerHTML = fehler.map((f) => `<p>${f}</p>`).join('');
            fehlerBox.hidden = false;
            ergebnisBox.hidden = true;
            return;
        }
        fehlerBox.hidden = true;
        if (platzhalter) {
            platzhalter.hidden = true;
        }
        const ergebnis = berechneTrainingsziel(eingabe);
        ergebnisBox.innerHTML = `
      <div class="ergebnis-grid">
        <div class="ergebnis-kachel">
          <span class="ergebnis-kachel__label">BMI</span>
          <span class="ergebnis-kachel__wert">${ergebnis.bmi.toLocaleString('de-DE')}</span>
          <span class="ergebnis-kachel__zusatz">${ergebnis.bmiKategorie}</span>
        </div>
        <div class="ergebnis-kachel">
          <span class="ergebnis-kachel__label">Grundumsatz</span>
          <span class="ergebnis-kachel__wert">${ergebnis.grundumsatzKcal}</span>
          <span class="ergebnis-kachel__zusatz">kcal / Tag (Ruhe)</span>
        </div>
        <div class="ergebnis-kachel ergebnis-kachel--akzent">
          <span class="ergebnis-kachel__label">Tagesbedarf</span>
          <span class="ergebnis-kachel__wert">${ergebnis.gesamtumsatzKcal}</span>
          <span class="ergebnis-kachel__zusatz">kcal / Tag (inkl. Aktivität)</span>
        </div>
      </div>
      <p class="ergebnis-hinweis">
        Hinweis: Diese Werte sind Richtwerte auf Basis der Mifflin-St-Jeor-Formel und
        ersetzen keine individuelle Ernährungsberatung.
      </p>
    `;
        ergebnisBox.hidden = false;
    });
}
/* -------------------------------------------------------------------------
 * 7. Kontaktformular / Anmeldung: Validierung
 * ---------------------------------------------------------------------- */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function leseKontaktformular(form) {
    const daten = new FormData(form);
    return {
        name: String(daten.get('name') ?? '').trim(),
        email: String(daten.get('email') ?? '').trim(),
        telefon: String(daten.get('telefon') ?? '').trim(),
        wunschMitgliedschaft: String(daten.get('tarif') ?? '').trim(),
        nachricht: String(daten.get('nachricht') ?? '').trim(),
    };
}
function validiereKontaktformular(daten) {
    const fehler = {};
    if (daten.name.length < 2) {
        fehler.name = 'Bitte den vollständigen Namen angeben (mind. 2 Zeichen).';
    }
    if (!EMAIL_REGEX.test(daten.email)) {
        fehler.email = 'Bitte eine gültige E-Mail-Adresse angeben.';
    }
    if (daten.telefon.length > 0 && !/^[0-9+\s/()-]{6,20}$/.test(daten.telefon)) {
        fehler.telefon = 'Bitte eine gültige Telefonnummer angeben oder Feld leer lassen.';
    }
    if (daten.nachricht.length < 10) {
        fehler.nachricht = 'Bitte kurz beschreiben, wobei wir helfen können (mind. 10 Zeichen).';
    }
    return fehler;
}
function zeigeFeldfehler(form, fehler) {
    const felder = ['name', 'email', 'telefon', 'nachricht'];
    felder.forEach((feld) => {
        const fehlerElement = form.querySelector(`[data-fehler-fuer="${feld}"]`);
        const inputElement = form.elements.namedItem(feld === 'wunschMitgliedschaft' ? 'tarif' : feld);
        if (fehlerElement) {
            fehlerElement.textContent = fehler[feld] ?? '';
        }
        if (inputElement instanceof HTMLElement) {
            inputElement.classList.toggle('eingabe--fehlerhaft', Boolean(fehler[feld]));
        }
    });
}
function initKontaktformular() {
    const form = requireElement('#anmeldung-formular');
    const erfolgsBox = requireElement('#anmeldung-erfolg');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        erfolgsBox.hidden = true;
        const daten = leseKontaktformular(form);
        const fehler = validiereKontaktformular(daten);
        zeigeFeldfehler(form, fehler);
        const istGueltig = Object.keys(fehler).length === 0;
        if (!istGueltig) {
            return;
        }
        // Kein echter Netzwerk-Request: simulierter Erfolgszustand für die Demo.
        erfolgsBox.textContent = `Danke, ${daten.name}! Deine Anfrage wurde erfasst. Wir melden uns per E-Mail an ${daten.email}.`;
        erfolgsBox.hidden = false;
        form.reset();
        zeigeFeldfehler(form, {});
    });
}
/* -------------------------------------------------------------------------
 * 8. Sonstiges: mobile Navigation, Jahr im Footer
 * ---------------------------------------------------------------------- */
function initMobileNavigation() {
    const toggle = requireElement('#nav-toggle');
    const menu = requireElement('#nav-menu');
    toggle.addEventListener('click', () => {
        const istOffen = menu.classList.toggle('nav__menu--offen');
        toggle.setAttribute('aria-expanded', String(istOffen));
    });
    menu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            menu.classList.remove('nav__menu--offen');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
}
function setzeAktuellesJahr() {
    const jahrElement = requireElement('#aktuelles-jahr');
    jahrElement.textContent = String(new Date().getFullYear());
}
/* -------------------------------------------------------------------------
 * 9. Initialisierung
 * ---------------------------------------------------------------------- */
function init() {
    initMobileNavigation();
    initKursplanFilter();
    renderMitgliedschaften();
    initTrainingszielRechner();
    initKontaktformular();
    setzeAktuellesJahr();
}
document.addEventListener('DOMContentLoaded', init);
