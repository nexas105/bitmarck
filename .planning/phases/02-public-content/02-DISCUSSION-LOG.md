# Phase 2: Public Content - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-19
**Phase:** 02-public-content
**Areas discussed:** Seitenstruktur, Hero & Metriken, Karriere-Timeline, Projekt-Karten & Skills

---

## Seitenstruktur

### Seitenaufbau

| Option | Description | Selected |
|--------|-------------|----------|
| Single-page Scroll | Alles auf einer Seite mit Anker-Navigation. Projekt-Detail-Seiten als separate Routes. | ✓ |
| Multi-page mit Hub | Startseite als Hub, Karriere/Projekte/Skills als eigene Seiten. | |
| Hybrid | Single-page + Karriere-Timeline auch als eigene Seite. | |

**User's choice:** Single-page Scroll
**Notes:** Recruiter scrollt einmal durch — kein Klick nötig für den Hauptfluss.

### Navigation

| Option | Description | Selected |
|--------|-------------|----------|
| Sticky Header | Kompakte Leiste oben, immer sichtbar. Scroll-Spy. | ✓ |
| Header nur oben | Verschwindet beim Scrollen. | |
| Sticky + Reveal | Versteckt sich runter, erscheint beim Hochscrollen. | |

**User's choice:** Sticky Header

### Sektions-Reihenfolge

| Option | Description | Selected |
|--------|-------------|----------|
| Hero → Weg → Projekte → Skills → FAQ | Story-First: Erst wer, dann Weg, dann Beweise. | ✓ |
| Hero → Projekte → Weg → Skills → FAQ | Impact-First: Projekte direkt nach Hero. | |
| Hero → Skills → Weg → Projekte → FAQ | Kompetenz-First. | |

**User's choice:** Hero → Weg → Projekte → Skills → FAQ

### Projekt-Detail-Seiten

| Option | Description | Selected |
|--------|-------------|----------|
| Problem/Ansatz/Ergebnis | Drei klare Abschnitte + Tech-Stack-Tags + GitHub-Link. | ✓ |
| Case-Study-Format | Ausführlicher mit Screenshots, Kontext, Learnings. | |
| Du entscheidest | Claude wählt passendes Format. | |

**User's choice:** Problem/Ansatz/Ergebnis

---

## Hero & Metriken

### Hero-Layout

| Option | Description | Selected |
|--------|-------------|----------|
| Zentriert + Metriken darunter | Name/Rolle mittig, Metrik-Karten darunter. | |
| Split-Layout | Links Text, rechts Dashboard-Metriken. | ✓ |
| Minimal + Statement | Reduziert, Metriken als Inline-Text. | |

**User's choice:** Split-Layout

### Metriken

| Option | Description | Selected |
|--------|-------------|----------|
| 3 Kern-Metriken | Jahre, Projekte, Zertifikate. | |
| 4 Metriken mit B.Sc. | + B.Sc. Informatik (laufend). | ✓ |
| 3 Metriken + Tagline | + Fließtext statt 4. Karte. | |

**User's choice:** 4 Metriken mit B.Sc.

### Hero CTA

| Option | Description | Selected |
|--------|-------------|----------|
| "Mehr erfahren" | Smooth-Scroll zur nächsten Sektion. | |
| "CV herunterladen" | Direkter Download-Link (Phase 4 funktional). | ✓ |
| Nein | Kein CTA. | |

**User's choice:** CV herunterladen

---

## Karriere-Timeline

### Timeline-Format

| Option | Description | Selected |
|--------|-------------|----------|
| Vertikale Timeline | Klassische Linie mit Stationen links/rechts. | ✓ |
| Karten-Stack | Gestapelte Karten ohne verbindende Linie. | |
| Kompakte Liste | Einfache Auflistung. | |

**User's choice:** Vertikale Timeline

### Stationen

| Option | Description | Selected |
|--------|-------------|----------|
| 5 Stationen | Telekom → BWI → Xecuro → Freelancer → Bitmarck. | ✓ |
| 4 Stationen | Ohne Freelancer. | |
| Du entscheidest | Claude wählt Aufteilung. | |

**User's choice:** 5 Stationen

### Detailtiefe

| Option | Description | Selected |
|--------|-------------|----------|
| Kompakt: 2-3 Sätze | Scanbar, analytischer Fokus. | ✓ |
| Ausführlich: 4-6 Sätze | Mehr Kontext pro Station. | |
| Gemischt | Wichtige ausführlicher. | |

**User's choice:** Kompakt: 2-3 Sätze

### Einleitender Absatz

| Option | Description | Selected |
|--------|-------------|----------|
| Ja — kurzer Absatz | 2-3 Sätze Framing vor der Timeline. | ✓ |
| Nein | Direkt in Stationen. | |

**User's choice:** Ja — kurzer Absatz

---

## Projekt-Karten & Skills

### Projekt-Karten

| Option | Description | Selected |
|--------|-------------|----------|
| Kompakte Karten | Name, Beschreibung, Tags, Detail-Link. 3 nebeneinander. | ✓ |
| Karten mit Highlight-Metrik | + auffällige Zahl pro Karte. | |
| Karten mit Screenshot | + Bild-Bereich oben. | |

**User's choice:** Kompakte Karten

### Skills-Übersicht

| Option | Description | Selected |
|--------|-------------|----------|
| Gruppierte Tags/Chips | 4 Gruppen mit Tags. Keine Prozentbalken. | ✓ |
| Skill-Grid mit Icons | Karten mit Icon + Label im Grid. | |
| Kompakte Liste | Kommasepariert pro Gruppe. | |

**User's choice:** Gruppierte Tags/Chips

### FAQ

| Option | Description | Selected |
|--------|-------------|----------|
| Accordion/Aufklapp | Klickbare Zeilen, Antwort klappt auf. | ✓ |
| Alle sichtbar | Alles direkt sichtbar. | |
| Du entscheidest | Claude wählt. | |

**User's choice:** Accordion/Aufklapp

---

## Claude's Discretion

- Footer-Gestaltung und Tech-Stack-Darstellung
- Exakte Spacing, Typografie, Tag-Farben
- Mobile Hamburger-Menü Interaction
- Empty States, Ladezustände
- Scroll-Spy Implementierung

## Deferred Ideas

None — discussion stayed within phase scope.
