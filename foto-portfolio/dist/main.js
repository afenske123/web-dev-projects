"use strict";
/* =========================================================
   Lichtform Fotografie — Demo-Portfolio
   Reine TypeScript-Logik für Galerie, Lightbox und Kontaktformular.
   Alle "Fotos" sind Metadaten-Objekte, die per CSS/SVG in
   abstrakte Kacheln übersetzt werden — es werden keinerlei
   externe oder eingebettete Bilddateien geladen.
   ========================================================= */
// ===== Daten =====
const fotos = [
    {
        id: 1, category: 'Porträt', title: 'Stilles Licht', jahr: 2025,
        brennweite: '85mm', blende: 'f/1.8', belichtungszeit: '1/200s', iso: 200,
        variant: 'v1',
        beschreibung: 'Fensterlicht auf ruhigem Gesichtsausdruck, reduzierte Farbpalette, offene Blende für weichen Hintergrund.'
    },
    {
        id: 2, category: 'Porträt', title: 'Zwischen den Zeilen', jahr: 2024,
        brennweite: '50mm', blende: 'f/2.0', belichtungszeit: '1/160s', iso: 250,
        variant: 'v2',
        beschreibung: 'Ein Blick zur Seite, halb im Schatten — Studie über Zurückhaltung und Nähe.'
    },
    {
        id: 3, category: 'Porträt', title: 'Konturen des Augenblicks', jahr: 2025,
        brennweite: '135mm', blende: 'f/2.5', belichtungszeit: '1/320s', iso: 160,
        variant: 'v1',
        beschreibung: 'Seitenlicht zeichnet die Kontur nach, Hintergrund bewusst dunkel gehalten.'
    },
    {
        id: 4, category: 'Porträt', title: 'Nahaufnahme No. 7', jahr: 2023,
        brennweite: '90mm', blende: 'f/1.4', belichtungszeit: '1/500s', iso: 100,
        variant: 'v2',
        beschreibung: 'Siebter Teil einer Serie über Hände und Ausdruck in engem Bildausschnitt.'
    },
    {
        id: 5, category: 'Landschaft', title: 'Nebel über dem Tal', jahr: 2024,
        brennweite: '24mm', blende: 'f/8', belichtungszeit: '1/60s', iso: 100,
        variant: 'v3',
        beschreibung: 'Frühmorgendlicher Nebel schichtet sich über den Hügeln, Aufnahme kurz nach Sonnenaufgang.'
    },
    {
        id: 6, category: 'Landschaft', title: 'Horizontlinie', jahr: 2025,
        brennweite: '35mm', blende: 'f/11', belichtungszeit: '1/125s', iso: 100,
        variant: 'v4',
        beschreibung: 'Minimalistische Komposition entlang der Küstenlinie, ruhiges Wasser, weiter Himmel.'
    },
    {
        id: 7, category: 'Landschaft', title: 'Dünenwind', jahr: 2023,
        brennweite: '70mm', blende: 'f/9', belichtungszeit: '1/250s', iso: 125,
        variant: 'v3',
        beschreibung: 'Sandstrukturen im Streiflicht, herausgearbeitet durch tiefstehende Sonne.'
    },
    {
        id: 8, category: 'Landschaft', title: 'Letztes Licht am See', jahr: 2025,
        brennweite: '50mm', blende: 'f/5.6', belichtungszeit: '1/30s', iso: 200,
        variant: 'v4',
        beschreibung: 'Goldene Stunde, Spiegelung auf ruhigem Wasser, warme Farbstimmung.'
    },
    {
        id: 9, category: 'Architektur', title: 'Vertikale Perspektive', jahr: 2024,
        brennweite: '16mm', blende: 'f/10', belichtungszeit: '1/125s', iso: 100,
        variant: 'v5',
        beschreibung: 'Blick entlang einer Fassade nach oben, starke Linienführung, symmetrischer Aufbau.'
    },
    {
        id: 10, category: 'Architektur', title: 'Betonpoesie', jahr: 2025,
        brennweite: '35mm', blende: 'f/8', belichtungszeit: '1/160s', iso: 100,
        variant: 'v6',
        beschreibung: 'Studie über Licht und Schatten auf rohem Sichtbeton, reduzierte Formensprache.'
    },
    {
        id: 11, category: 'Architektur', title: 'Fassade No. 12', jahr: 2023,
        brennweite: '24mm', blende: 'f/11', belichtungszeit: '1/100s', iso: 125,
        variant: 'v5',
        beschreibung: 'Zwölfte Aufnahme einer Serie über Fensterraster moderner Bürogebäude.'
    },
    {
        id: 12, category: 'Reportage', title: 'Marktstunden', jahr: 2024,
        brennweite: '35mm', blende: 'f/4', belichtungszeit: '1/500s', iso: 320,
        variant: 'v7',
        beschreibung: 'Bewegte Szene auf dem Wochenmarkt, kurze Belichtungszeit fängt Gesten ein.'
    },
    {
        id: 13, category: 'Reportage', title: 'Zwischen den Gleisen', jahr: 2025,
        brennweite: '28mm', blende: 'f/2.8', belichtungszeit: '1/250s', iso: 400,
        variant: 'v8',
        beschreibung: 'Wartende Reisende im Gegenlicht der Bahnhofshalle, dokumentarischer Stil.'
    },
    {
        id: 14, category: 'Reportage', title: 'Straßenmoment', jahr: 2023,
        brennweite: '35mm', blende: 'f/2.8', belichtungszeit: '1/320s', iso: 200,
        variant: 'v7',
        beschreibung: 'Beiläufige Begegnung im Vorbeigehen, spontane Komposition ohne Inszenierung.'
    }
];
// ===== Hilfsfunktionen =====
/** Holt ein Element per ID oder wirft einen Fehler, falls es fehlt. */
function getEl(id) {
    const el = document.getElementById(id);
    if (!el) {
        throw new Error(`Element mit id "${id}" wurde nicht gefunden.`);
    }
    return el;
}
function assertNever(value) {
    throw new Error(`Unerwarteter Wert: ${JSON.stringify(value)}`);
}
function metaString(foto) {
    return `${foto.blende} · ${foto.belichtungszeit} · ISO ${foto.iso} · ${foto.brennweite}`;
}
/** Statisches, handgeschriebenes Linien-Art-SVG je Kategorie (kein externes Bildmaterial). */
function svgForCategory(category) {
    switch (category) {
        case 'Porträt':
            return '<svg class="foto-kachel__linie" viewBox="0 0 120 120" aria-hidden="true">' +
                '<circle cx="60" cy="46" r="26"/>' +
                '<path d="M28 108c6-24 26-38 32-38s26 14 32 38"/>' +
                '</svg>';
        case 'Landschaft':
            return '<svg class="foto-kachel__linie" viewBox="0 0 120 120" aria-hidden="true">' +
                '<path d="M4 78 L40 52 L64 68 L86 40 L116 78"/>' +
                '<circle cx="88" cy="30" r="11"/>' +
                '</svg>';
        case 'Architektur':
            return '<svg class="foto-kachel__linie" viewBox="0 0 120 120" aria-hidden="true">' +
                '<path d="M20 116V24l40-14 40 14v92"/>' +
                '<path d="M20 60h80M20 88h80M60 10v106"/>' +
                '</svg>';
        case 'Reportage':
            return '<svg class="foto-kachel__linie" viewBox="0 0 120 120" aria-hidden="true">' +
                '<path d="M8 100 L48 40 L72 76 L112 16"/>' +
                '<path d="M8 20 L48 76 L112 100"/>' +
                '</svg>';
        default:
            return assertNever(category);
    }
}
const KATEGORIEN = ['Porträt', 'Landschaft', 'Architektur', 'Reportage'];
function isFilter(value) {
    return value === 'Alle' || KATEGORIEN.includes(value);
}
// ===== Galerie-Zustand =====
/** Aktuell sichtbare Liste (nach Filter), bestimmt auch die Reihenfolge in der Lightbox. */
let currentList = fotos;
/** Index des in der Lightbox geöffneten Fotos innerhalb von currentList, oder null wenn geschlossen. */
let currentIndex = null;
/** Auslösendes Element, damit der Fokus beim Schließen dorthin zurückkehrt. */
let lastTrigger = null;
function getFilteredFotos(filter) {
    if (filter === 'Alle') {
        return fotos;
    }
    return fotos.filter((foto) => foto.category === filter);
}
function createTile(foto, indexInList) {
    const tile = document.createElement('button');
    tile.type = 'button';
    tile.className = 'foto-kachel';
    tile.dataset.id = String(foto.id);
    tile.setAttribute('aria-label', `${foto.title} – ${foto.category}, vergrößern`);
    const art = document.createElement('div');
    art.className = `foto-kachel__art art-${foto.variant}`;
    // Statisches, fest verdrahtetes Linien-SVG ohne Nutzereingaben – unbedenklich per innerHTML gesetzt.
    art.innerHTML = svgForCategory(foto.category);
    const overlay = document.createElement('div');
    overlay.className = 'foto-kachel__overlay';
    const tag = document.createElement('span');
    tag.className = 'foto-kachel__tag';
    tag.textContent = foto.category;
    const title = document.createElement('h3');
    title.textContent = foto.title;
    const meta = document.createElement('p');
    meta.textContent = metaString(foto);
    overlay.append(tag, title, meta);
    tile.append(art, overlay);
    tile.addEventListener('click', () => openLightbox(indexInList, tile));
    return tile;
}
function renderGallery(filter) {
    // Falls die Lightbox offen ist und der Filter wechselt, schließen wir sie,
    // damit currentIndex nicht auf eine veraltete Liste zeigt.
    if (currentIndex !== null) {
        closeLightbox();
    }
    currentList = getFilteredFotos(filter);
    const grid = getEl('galerie-grid');
    const emptyState = getEl('galerie-leer');
    grid.innerHTML = '';
    if (currentList.length === 0) {
        emptyState.hidden = false;
        return;
    }
    emptyState.hidden = true;
    const fragment = document.createDocumentFragment();
    currentList.forEach((foto, idx) => {
        fragment.appendChild(createTile(foto, idx));
    });
    grid.appendChild(fragment);
}
function initFilterButtons() {
    const buttons = Array.from(document.querySelectorAll('.filter-btn'));
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const value = button.dataset.filter ?? 'Alle';
            if (!isFilter(value)) {
                return;
            }
            buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
            renderGallery(value);
        });
    });
}
// ===== Lightbox =====
function updateLightboxContent() {
    if (currentIndex === null) {
        return;
    }
    const foto = currentList[currentIndex];
    const art = getEl('lightbox-art');
    art.className = `lightbox__art foto-kachel__art art-${foto.variant}`;
    art.innerHTML = svgForCategory(foto.category);
    getEl('lightbox-tag').textContent = foto.category;
    getEl('lightbox-title').textContent = `${foto.title} (${foto.jahr})`;
    getEl('lightbox-meta').textContent = metaString(foto);
    getEl('lightbox-beschreibung').textContent = foto.beschreibung;
    getEl('lightbox-counter').textContent =
        `${currentIndex + 1} / ${currentList.length}`;
}
function openLightbox(index, trigger) {
    currentIndex = index;
    lastTrigger = trigger;
    updateLightboxContent();
    const overlay = getEl('lightbox');
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    getEl('lightbox-close').focus();
}
function closeLightbox() {
    const overlay = getEl('lightbox');
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    currentIndex = null;
    if (lastTrigger) {
        lastTrigger.focus();
        lastTrigger = null;
    }
}
/**
 * Navigation innerhalb der Lightbox läuft am Rand um (Wrap-around):
 * Vom letzten Foto aus führt "weiter" zurück zum ersten und umgekehrt.
 * Alternative wäre, Pfeile am Rand zu deaktivieren – hier bewusst nicht gewählt,
 * damit die Galerie sich für die Nutzer:in endlos anfühlt.
 */
function showNext() {
    if (currentIndex === null || currentList.length === 0) {
        return;
    }
    currentIndex = (currentIndex + 1) % currentList.length;
    updateLightboxContent();
}
function showPrev() {
    if (currentIndex === null || currentList.length === 0) {
        return;
    }
    currentIndex = (currentIndex - 1 + currentList.length) % currentList.length;
    updateLightboxContent();
}
function initLightbox() {
    const overlay = getEl('lightbox');
    getEl('lightbox-close').addEventListener('click', closeLightbox);
    getEl('lightbox-next').addEventListener('click', showNext);
    getEl('lightbox-prev').addEventListener('click', showPrev);
    // Klick auf den Hintergrund (nicht auf den Dialoginhalt) schließt die Lightbox.
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            closeLightbox();
        }
    });
    document.addEventListener('keydown', (event) => {
        if (currentIndex === null) {
            return;
        }
        switch (event.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowRight':
                showNext();
                break;
            case 'ArrowLeft':
                showPrev();
                break;
            default:
                break;
        }
    });
}
// ===== Kontaktformular =====
function validateEmail(value) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value);
}
function setFieldError(id, message) {
    const el = getEl(id);
    el.textContent = message ?? '';
}
function validateKontaktForm(name, email, nachricht) {
    const fehler = {};
    if (name.length < 2) {
        fehler.name = 'Bitte gib deinen Namen ein (mind. 2 Zeichen).';
    }
    if (!validateEmail(email)) {
        fehler.email = 'Bitte gib eine gültige E-Mail-Adresse ein.';
    }
    if (nachricht.length < 10) {
        fehler.nachricht = 'Deine Nachricht sollte mindestens 10 Zeichen umfassen.';
    }
    return fehler;
}
function handleKontaktSubmit(event) {
    event.preventDefault();
    const form = getEl('kontakt-formular');
    const nameInput = getEl('kontakt-name');
    const emailInput = getEl('kontakt-email');
    const nachrichtInput = getEl('kontakt-nachricht');
    const statusEl = getEl('kontakt-status');
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const nachricht = nachrichtInput.value.trim();
    const fehler = validateKontaktForm(name, email, nachricht);
    setFieldError('kontakt-name-fehler', fehler.name);
    setFieldError('kontakt-email-fehler', fehler.email);
    setFieldError('kontakt-nachricht-fehler', fehler.nachricht);
    const istGueltig = Object.keys(fehler).length === 0;
    if (!istGueltig) {
        statusEl.textContent = '';
        statusEl.className = 'kontakt-status';
        return;
    }
    // Mockup-Erfolg: Es gibt kein echtes Backend, die Seite ist eine Demo.
    statusEl.textContent =
        `Danke, ${name}! Deine Nachricht wurde simuliert versendet – ` +
            `dies ist eine Demo ohne echten Versand.`;
    statusEl.className = 'kontakt-status kontakt-status--erfolg';
    form.reset();
}
function initKontaktForm() {
    const form = getEl('kontakt-formular');
    form.addEventListener('submit', handleKontaktSubmit);
}
// ===== Initialisierung =====
function init() {
    renderGallery('Alle');
    initFilterButtons();
    initLightbox();
    initKontaktForm();
}
document.addEventListener('DOMContentLoaded', init);
