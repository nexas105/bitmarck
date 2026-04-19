# Roadmap: Bitmarck Bewerbungs-Website

## Overview

Vom leeren Repo zur fertigen Bewerbungs-Experience in fünf Phasen. Phase 1 legt das technische Fundament (i18n-Routing als architektonische Pflicht ab dem ersten Commit). Phase 2 liefert den gesamten recruiter-sichtbaren Content — das eigentliche Produkt. Phase 3 schichtet Animationen und Interaktivität auf den verifizierten Content. Phase 4 schließt dynamische Daten, PDF-Generierung und den Admin-Bereich ab und produziert das deploybare Docker-Image.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Next.js App Router mit i18n-Routing, Tailwind, TypeScript und Docker-Stub
- [ ] **Phase 2: Public Content** - Vollständiger recruiter-sichtbarer Content (Hero, Narrativ, Projekte, Skills, FAQ)
- [x] **Phase 3: Animations & Polish** - Framer Motion Scroll-Animationen, Terminal Easter Egg, finale visuelle Qualität
- [ ] **Phase 4: Dynamic Data, PDFs & Admin** - GitHub API, PDF-Generierung, Admin-Panel, Production Docker
- [ ] **Phase 5: Enterprise UI Redesign** - Professionelles visuelles Redesign — die Website muss optisch und technisch die BA-IAM-Stelle und den Lebenslauf repräsentieren
- [ ] **Phase 6: Content Expansion** - Karriere-Stationen und Projekte mit echten CV-Daten anreichern, Details als Collapse-Sektionen, alle 6 Projekte zeigen

## Phase Details

### Phase 1: Foundation
**Goal**: Das Projekt ist deploybar, i18n-Routing ist permanent verankert, alle Technologien sind integriert
**Depends on**: Nothing (first phase)
**Requirements**: HERO-04, TECH-02
**Success Criteria** (what must be TRUE):
  1. `next dev` startet ohne Fehler mit `app/[locale]/` Routingstruktur
  2. `/de` und `/en` laden die korrekte Locale ohne Reload — next-intl Middleware aktiv
  3. Ein Docker-Build (`docker build`) schlägt nicht fehl — standalone output konfiguriert
  4. Tailwind CSS v4 und TypeScript kompilieren fehlerfrei
**Plans:** 2 plans
Plans:
- [x] 01-01-PLAN.md — Scaffold Next.js 16 + i18n routing + design tokens + locale toggle
- [x] 01-02-PLAN.md — Docker standalone build + container verification
**UI hint**: yes

### Phase 2: Public Content
**Goal**: Der Recruiter kann die vollständige Bewerbungs-Experience ohne Animationen erleben — alle Inhalte sind vorhanden, korrekt strukturiert und auf Mobile + Desktop lesbar
**Depends on**: Phase 1
**Requirements**: HERO-01, HERO-02, HERO-03, NARR-01, NARR-02, PROJ-01, PROJ-02, PROJ-03, DL-02, TECH-04, TECH-05
**Success Criteria** (what must be TRUE):
  1. Nutzer sieht Hero mit Name, "Business Analyst IAM" und Value Proposition above-the-fold — kein Layout Shift, LCP < 2.5s
  2. Nutzer sieht Sektion "Mein Weg zum Business Analyst" mit expliziter Transformations-Story und Karriere-Timeline
  3. Nutzer sieht 3 Projekt-Karten mit Tech-Stack-Tags und kann zu Detail-Seiten navigieren (Problem/Ansatz/Ergebnis)
  4. Nutzer sieht Skills-Übersicht als gruppierte Tags (IAM, BA, DevOps, Sprachen) und FAQ mit Standort/Starttermin/Warum Bitmarck
  5. Website ist auf 375px (Mobile) und 1440px (Desktop) vollständig nutzbar — Navigation, Hamburger-Menü, alle Sektionen
**Plans:** 4 plans
Plans:
- [x] 02-01-PLAN.md — Data layer, i18n messages (DE/EN), Tag component, lucide-react fix
- [x] 02-02-PLAN.md — Hero section (split layout, metrics dashboard) + Career section (timeline)
- [x] 02-03-PLAN.md — Projects cards, Skills tags, FAQ accordion, Footer
- [x] 02-04-PLAN.md — Sticky header, hamburger menu, page assembly, project detail routes
**UI hint**: yes

### Phase 3: Animations & Polish
**Goal**: Die Website ist visuell fertig — dezente Animationen verstärken die Story ohne den Content zu blockieren, das Terminal Easter Egg ist funktional
**Depends on**: Phase 2
**Requirements**: NARR-03, TECH-01, TECH-03
**Success Criteria** (what must be TRUE):
  1. Karriere-Timeline und Sektionen blenden beim Scrollen dezent ein (x/y/opacity only, keine Layout Shifts)
  2. `prefers-reduced-motion` deaktiviert alle Animationen — Content bleibt vollständig sichtbar
  3. Terminal Easter Egg ist aufrufbar (versteckte Tastenkombination oder Hinweis im Footer) und antwortet auf `whoami`, `skills`, `projects`, `motivation`, `contact`
**Plans:** 2 plans
Plans:
- [x] 03-01-PLAN.md — Install motion, AnimateOnScroll wrapper, MotionProvider, scroll animations on all sections
- [x] 03-02-PLAN.md — Terminal Easter Egg with i18n commands, footer hint, keyboard shortcut
**UI hint**: yes

### Phase 4: Dynamic Data, PDFs & Admin
**Goal**: Projektdaten kommen live von GitHub, PDFs sind herunterladbar, Tobias kann Projekte ohne Redeployment verwalten — die Website läuft produktiv auf dem eigenen Server
**Depends on**: Phase 3
**Requirements**: PROJ-04, DL-01, DL-03, ADM-01, ADM-02, ADM-03
**Success Criteria** (what must be TRUE):
  1. Projekt-Karten zeigen Live-Daten von GitHub (Languages, letzter Commit) — gecacht, kein Rate-Limit-Fehler
  2. Nutzer kann CV als gestyltes, ATS-kompatibles 2-Seiten-PDF herunterladen — Design konsistent mit Website
  3. Nutzer kann Anschreiben als PDF herunterladen
  4. Tobias kann sich in `/admin` einloggen, Projekte anlegen/bearbeiten/löschen und Git-Links eintragen mit Auto-Pull
  5. Website läuft als Docker Container mit HTTPS auf eigenem Server — kein HTTP-Fehler, kein fehlender Static Asset
**Plans:** 4 plans
Plans:
- [ ] 04-01-PLAN.md — GitHub API client with caching + project card enrichment
- [ ] 04-02-PLAN.md — CV and cover letter PDF generation with real CV data
- [ ] 04-03-PLAN.md — Admin authentication with iron-session
- [ ] 04-04-PLAN.md — Admin project CRUD with GitHub auto-pull + Docker volume

### Phase 5: Enterprise UI Redesign
**Goal**: Die Website sieht aus wie ein professionelles Enterprise-Produkt — visuelles Design repräsentiert die BA-IAM-Stelle und den Lebenslauf überzeugend, nicht wie ein generisches Template
**Depends on**: Phase 4
**Requirements**: (new — UI/UX quality requirements)
**Success Criteria** (what must be TRUE):
  1. Ein Recruiter sieht sofort: hier hat jemand Anspruch an visuelle Qualität — kein generisches Bootstrap/Template-Feeling
  2. Farbschema, Typografie und Spacing wirken professionell und enterprise-tauglich (nicht "Entwickler-Hobby-Seite")
  3. Hero-Bereich hat visuellen Impact — nicht nur Text auf weißem Hintergrund
  4. Karriere-Timeline und Projekt-Karten haben visuelle Tiefe (Schatten, Hover-Effekte, Farbakzente)
  5. Mobile und Desktop haben konsistentes, hochwertiges Design
**Plans**: TBD
**UI hint**: yes

### Phase 6: Content Expansion
**Goal**: Karriere-Stationen und Projekte werden mit echten CV-Daten angereichert — jede Station hat ausklappbare Details, alle 6 Projekte aus dem CV sind sichtbar, Kontext ist rund und umfangreich
**Depends on**: Phase 5
**Requirements**: (new — content depth requirements)
**Success Criteria** (what must be TRUE):
  1. Alle 7 beruflichen Stationen aus dem CV sind sichtbar mit ausklappbaren Detail-Abschnitten (Aufgaben, Technologien, Erfolge)
  2. Alle 6 Projekte aus dem CV sind als Karten dargestellt (Auth API, Next CMS, MyFitCoach PRO, Partner App, Logbuch App, MPA Nutrition Shop)
  3. Karriere-Stationen haben logischen Kontext — der rote Faden vom Techniker zum Analysten ist in jeder Station spürbar
  4. Collapse/Expand funktioniert auf Mobile und Desktop — Details sind optional, Überblick bleibt clean
  5. Zertifikate und Ausbildung sind vollständig dargestellt (ITIL, SINA, DevOps, Linux, etc.)
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 2/2 | Complete | 2026-04-19 |
| 2. Public Content | 4/4 | Complete | 2026-04-19 |
| 3. Animations & Polish | 2/2 | Complete | 2026-04-19 |
| 4. Dynamic Data, PDFs & Admin | 0/4 | Not started | - |
| 5. Enterprise UI Redesign | 0/TBD | Not started | - |
| 6. Content Expansion | 0/TBD | Not started | - |
