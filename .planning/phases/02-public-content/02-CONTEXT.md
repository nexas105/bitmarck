# Phase 2: Public Content - Context

**Gathered:** 2026-04-19
**Status:** Ready for planning

<domain>
## Phase Boundary

Vollständiger recruiter-sichtbarer Content ohne Animationen — Hero, Karriere-Narrativ, Projekte, Skills, FAQ, responsive Navigation und Footer. Projekt-Detail-Seiten als separate Routes. Animationen sind Phase 3, Live-Daten und PDFs sind Phase 4.

</domain>

<decisions>
## Implementation Decisions

### Seitenstruktur
- **D-01:** Single-page Scroll mit Anker-Navigation zu Sektionen. Projekt-Detail-Seiten als separate Routes (`/de/projekte/auth-api`).
- **D-02:** Sticky Header — kompakte Leiste oben, immer sichtbar. Desktop: Sektions-Links + Locale Toggle. Mobile: Hamburger-Menü. Scroll-Spy hebt aktive Sektion hervor.
- **D-03:** Sektions-Reihenfolge: Hero → Mein Weg zum BA → Projekte → Skills → FAQ → Footer (mit Tech Stack).
- **D-04:** Projekt-Detail-Seiten im Format Problem/Ansatz/Ergebnis — drei klare Abschnitte plus Tech-Stack-Tags und optionaler GitHub-Link.

### Hero & Metriken
- **D-05:** Split-Layout Hero — Links: Name, Rolle "Business Analyst IAM", Value Proposition. Rechts: Dashboard mit 4 Metrik-Karten (10+ Jahre IT, 15 Projekte, 6 Zertifikate, B.Sc. Informatik laufend).
- **D-06:** CTA-Button "CV herunterladen" im Hero (wird in Phase 4 funktional, vorerst als Platzhalter/disabled).

### Karriere-Timeline
- **D-07:** Vertikale Timeline mit 5 Stationen: Telekom-Ausbildung → BWI (Infrastruktur/Planung) → Xecuro (SINA/Sicherheit) → Freelancer (Fullstack/Kunden) → Bitmarck (Ziel/Ankunft).
- **D-08:** Kompakter Text pro Station: 2-3 Sätze mit Fokus auf analytische und konzeptionelle Aspekte jeder Rolle.
- **D-09:** Einleitender Absatz vor der Timeline — 2-3 Sätze die den Transformations-Bogen vom Techniker zum Analysten zusammenfassen.

### Projekt-Karten
- **D-10:** 3 kompakte Karten nebeneinander (Desktop) / gestapelt (Mobile): Auth API Service, Next CMS, Server-Cluster. Jede Karte: Name, 1-Satz-Beschreibung, Tech-Stack als Tags, "Details →" Link zur Detail-Seite.

### Skills-Übersicht
- **D-11:** Gruppierte Tags/Chips in 4 Kategorien: IAM & Security, BA-Methoden, DevOps & Infra, Sprachen & Frameworks. Keine Prozentbalken — reine Tag-Darstellung.

### FAQ
- **D-12:** Accordion/Aufklapp-Format. Fragen als klickbare Zeilen, Antwort klappt auf. Fragen: Standort (flexibel), Starttermin (1-3 Monate), Warum Bitmarck, Warum Business Analyst.

### Claude's Discretion
- Exakte Spacing und Typografie innerhalb des bestehenden Design-Token-Systems
- Footer-Gestaltung und Tech-Stack-Darstellung (TECH-05)
- Empty States und Ladezustände
- Exakte Tag-Farben und -Styles
- Mobile Hamburger-Menü Interaction Pattern
- Scroll-Spy Implementierungsdetails

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

No external specs — requirements fully captured in decisions above and in:
- `.planning/REQUIREMENTS.md` — HERO-01, HERO-02, HERO-03, NARR-01, NARR-02, PROJ-01, PROJ-02, PROJ-03, DL-02, TECH-04, TECH-05
- `.planning/PROJECT.md` — Bewerber-Kontext, Karriere-Narrativ, Kernbotschaften
- `.planning/ROADMAP.md` §Phase 2 — Success Criteria

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `LocaleToggle` (`src/components/locale-toggle.tsx`): Locale-Wechsel DE/EN, kann in den Header integriert werden
- i18n Setup (`src/i18n/`): routing.ts, navigation.ts, request.ts — vollständig konfiguriert
- Message Files (`messages/de.json`, `messages/en.json`): Müssen mit Content-Texten erweitert werden

### Established Patterns
- Tailwind CSS v4 mit Design Tokens: 8-point Spacing (xs/sm/md/lg/xl/2xl/3xl/4xl), Farben (surface, accent #2563EB, text-primary/secondary), Inter Font
- `setRequestLocale(locale)` Pattern für Server Components
- `'use client'` Directive für interaktive Components (LocaleToggle als Referenz)
- `@/` Import-Alias konfiguriert

### Integration Points
- `src/app/[locale]/page.tsx`: Aktuell Platzhalter — wird zur Single-page mit allen Sektionen
- Neue Routes: `src/app/[locale]/projekte/[slug]/page.tsx` für Projekt-Detail-Seiten
- Layout (`src/app/[locale]/layout.tsx`): Header/Nav muss hier oder als Component eingebaut werden

</code_context>

<specifics>
## Specific Ideas

- Split-Layout Hero inspiriert vom Dashboard-Look — Metriken rechts als eigenständiges visuelles Element
- Karriere-Timeline soll den "roten Faden" visuell erlebbar machen — jede Station hebt den analytischen/konzeptionellen Aspekt hervor
- CTA "CV herunterladen" als Brücke zu Phase 4 — kann vorerst disabled oder mit Platzhalter-Hinweis versehen werden
- FAQ als Accordion: Recruiter wählt selbst was relevant ist, spart Scroll-Weg

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-public-content*
*Context gathered: 2026-04-19*
