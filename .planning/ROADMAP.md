# Roadmap: Bitmarck Bewerbungs-Website

## Overview

Vom leeren Repo zur fertigen Bewerbungs-Experience in vier Phasen. Phase 1 legt das technische Fundament (i18n-Routing als architektonische Pflicht ab dem ersten Commit). Phase 2 liefert den gesamten recruiter-sichtbaren Content — das eigentliche Produkt. Phase 3 schichtet Animationen und Interaktivität auf den verifizierten Content. Phase 4 schließt dynamische Daten, PDF-Generierung und den Admin-Bereich ab und produziert das deploybare Docker-Image.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Next.js App Router mit i18n-Routing, Tailwind, TypeScript und Docker-Stub
- [ ] **Phase 2: Public Content** - Vollständiger recruiter-sichtbarer Content (Hero, Narrativ, Projekte, Skills, FAQ)
- [ ] **Phase 3: Animations & Polish** - Framer Motion Scroll-Animationen, Terminal Easter Egg, finale visuelle Qualität
- [ ] **Phase 4: Dynamic Data, PDFs & Admin** - GitHub API, PDF-Generierung, Admin-Panel, Production Docker

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
- [ ] 02-01-PLAN.md — Data layer, i18n messages (DE/EN), Tag component, lucide-react fix
- [ ] 02-02-PLAN.md — Hero section (split layout, metrics dashboard) + Career section (timeline)
- [ ] 02-03-PLAN.md — Projects cards, Skills tags, FAQ accordion, Footer
- [ ] 02-04-PLAN.md — Sticky header, hamburger menu, page assembly, project detail routes
**UI hint**: yes

### Phase 3: Animations & Polish
**Goal**: Die Website ist visuell fertig — dezente Animationen verstärken die Story ohne den Content zu blockieren, das Terminal Easter Egg ist funktional
**Depends on**: Phase 2
**Requirements**: NARR-03, TECH-01, TECH-03
**Success Criteria** (what must be TRUE):
  1. Karriere-Timeline und Sektionen blenden beim Scrollen dezent ein (x/y/opacity only, keine Layout Shifts)
  2. `prefers-reduced-motion` deaktiviert alle Animationen — Content bleibt vollständig sichtbar
  3. Terminal Easter Egg ist aufrufbar (versteckte Tastenkombination oder Hinweis im Footer) und antwortet auf `whoami`, `skills`, `projects`, `motivation`, `contact`
**Plans**: TBD
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
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 2/2 | Complete | 2026-04-19 |
| 2. Public Content | 0/4 | Not started | - |
| 3. Animations & Polish | 0/TBD | Not started | - |
| 4. Dynamic Data, PDFs & Admin | 0/TBD | Not started | - |
