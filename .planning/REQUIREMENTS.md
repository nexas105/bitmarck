# Requirements: Bitmarck Bewerbungs-Website

**Defined:** 2026-04-19
**Core Value:** Der Recruiter versteht in 30 Sekunden: Tobias ist kein "nur Techniker" — er denkt analytisch, sieht das große Bild, versteht Technik UND kann Anforderungen übersetzen.

## v1 Requirements

### Hero & Navigation

- [x] **HERO-01**: User sieht Hero mit Name, Ziel-Rolle "Business Analyst IAM" und Value Proposition above-the-fold
- [x] **HERO-02**: User sieht animierte Dashboard-Metriken (10+ Jahre IT, 15 Projekte, 6 Zertifikate) im Hero
- [x] **HERO-03**: User kann über responsive Navigation zu Sektionen scrollen (Desktop + Mobile Hamburger)
- [x] **HERO-04**: User kann zwischen Deutsch und Englisch wechseln via URL-basiertem Toggle (/de, /en) ohne Reload

### Karriere-Narrativ

- [x] **NARR-01**: User sieht eigene Sektion "Mein Weg zum Business Analyst" — explizite Transformations-Story vom Techniker zum Analysten
- [x] **NARR-02**: User erkennt bei jeder Karriere-Station den roten Faden — analytische und konzeptionelle Aspekte hervorgehoben
- [x] **NARR-03**: User erlebt scroll-getriebene Karriere-Timeline mit dezenten Framer Motion Animationen

### Projekte & Skills

- [x] **PROJ-01**: User sieht 3 Projekt-Showcase-Karten (Auth API Service, Next CMS, Server-Cluster) mit Tech-Stack-Tags
- [x] **PROJ-02**: User sieht Skills-Gesamtübersicht als gruppierte Tags/Icons (IAM, BA-Methoden, DevOps, Sprachen)
- [x] **PROJ-03**: User kann auf Projekt-Detail-Seiten navigieren mit Problem/Ansatz/Ergebnis-Narrativ
- [x] **PROJ-04**: Projekt-Karten zeigen Live-Daten von GitHub API (Languages, Stars, letzter Commit)

### Downloads & Bewerbung

- [x] **DL-01**: User kann CV als gestyltes PDF herunterladen (Design passend zur Website, ATS-kompatibel, max 2 Seiten)
- [x] **DL-02**: User findet FAQ-Bereich mit direkten Antworten: Standort (flexibel), Starttermin (1-3 Monate), Warum Bitmarck, Warum Business Analyst
- [x] **DL-03**: User kann Anschreiben als PDF herunterladen

### Admin

- [x] **ADM-01**: Tobias kann sich via .env-basierte Credentials in geschützten Admin-Bereich einloggen (iron-session)
- [x] **ADM-02**: Tobias kann im Admin Projekte anlegen/bearbeiten/löschen (Git-Link, Titel, Beschreibung, Tech Stack, Screenshot)
- [x] **ADM-03**: Beim Einfügen eines Git-Links werden Repo-Daten automatisch via GitHub API gezogen mit Möglichkeit zur manuellen Überschreibung

### Technisch

- [x] **TECH-01**: Scroll-Animationen sind dezent und GPU-optimiert (nur x, y, scale, opacity) mit prefers-reduced-motion Fallback
- [x] **TECH-02**: Website läuft als Docker Container auf eigenem Server mit HTTPS (Production Dockerfile, standalone output)
- [x] **TECH-03**: Terminal Easter Egg: verstecktes CLI-Interface mit 3-5 Befehlen (whoami, skills, projects, motivation, contact)
- [x] **TECH-04**: Website ist responsive — getestet auf Mobile (375px) und Desktop (1440px)
- [x] **TECH-05**: Website-eigener Tech Stack ist im Footer sichtbar ("Built with Next.js, Tailwind, ...")

## v2 Requirements

### Enhancements

- **ENH-01**: Live-Server-Daten (Uptime, Response-Time) aus eigenem Cluster als Widget
- **ENH-02**: Anschreiben als integrierte Sektion auf der Website (nicht nur PDF)
- **ENH-03**: JSON-LD structured data (Person schema) für SEO

## Out of Scope

| Feature | Reason |
|---------|--------|
| Dark/Light Mode Toggle | Ein durchdachtes Theme statt zwei halbgare — reduziert Komplexität |
| Contact Form | Email-Link reicht, kein Backend-Overhead für Formular |
| Skills Percentage Bars | Anti-Pattern — subjektive Prozente sind unseriös |
| Intro Preloader/Splash Screen | Blockiert Recruiter-Content, kontraproduktiv |
| Cookie Consent Banner | Keine Cookies für Tracking, kein Banner nötig |
| Bitmarck-Branding kopieren | Eigenes Design zeigt Persönlichkeit |
| CMS für Texte | Texte sind statisch, nur Projekte dynamisch via Admin |
| Multi-Stelle Support | Website ist spezifisch für diese eine Bewerbung |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| HERO-01 | Phase 2 | Complete (02-02) |
| HERO-02 | Phase 2 | Complete (02-02) |
| HERO-03 | Phase 2 | Complete (02-04) |
| HERO-04 | Phase 1 | Complete (01-01) |
| NARR-01 | Phase 2 | Complete (02-02) |
| NARR-02 | Phase 2 | Complete (02-02) |
| NARR-03 | Phase 3 | Complete (03-01) |
| PROJ-01 | Phase 2 | Complete (02-03) |
| PROJ-02 | Phase 2 | Complete (02-03) |
| PROJ-03 | Phase 2 | Complete (02-04) |
| PROJ-04 | Phase 4 | Complete (04-01) |
| DL-01 | Phase 4 | Complete (04-02) |
| DL-02 | Phase 2 | Complete (02-03) |
| DL-03 | Phase 4 | Complete (04-02) |
| ADM-01 | Phase 4 | Complete (04-03) |
| ADM-02 | Phase 4 | Complete (04-04) |
| ADM-03 | Phase 4 | Complete (04-04) |
| TECH-01 | Phase 3 | Complete (03-01) |
| TECH-02 | Phase 1 | Complete (01-01, 01-02) |
| TECH-03 | Phase 3 | Complete (03-02) |
| TECH-04 | Phase 2 | Complete (02-04) |
| TECH-05 | Phase 2 | Complete (02-03) |

**Coverage:**
- v1 requirements: 22 total
- Mapped to phases: 22
- Unmapped: 0

---
*Requirements defined: 2026-04-19*
*Last updated: 2026-04-19 after roadmap creation*
