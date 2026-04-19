# Bitmarck Bewerbungs-Website

## What This Is

Eine interaktive, design-first Bewerbungs-Website von Tobias Ludwig für die Stelle "Business Analyst IAM (m/w/d)" bei Bitmarck. Statt klassischer PDF-Bewerbung eine Web-Experience die technische Kompetenz demonstriert und gleichzeitig inhaltlich überzeugt — Lebenslauf, Anschreiben, Projekte und Motivation als durchdachtes digitales Erlebnis.

## Core Value

Der Recruiter soll innerhalb von 30 Sekunden verstehen: Tobias ist kein "nur Techniker" — er denkt analytisch, sieht das große Bild, versteht Technik UND kann Anforderungen übersetzen. Die Website selbst ist der Beweis.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Interaktives Hybrid-Layout: Dashboard-Hero mit Key-Metriken, Story-Scroll durch Karriere, Terminal als Easter Egg
- [ ] Karriere-Narrativ "Vom Techniker zum Business Analyst": Roter Faden durch alle Stationen + eigene "Mein Weg zum BA" Sektion
- [ ] Kernbotschaften: "Technik verstehen, Prozesse gestalten" + "Breites Spektrum, analytischer Blick"
- [ ] Anschreiben integriert in die Website-Experience + PDF-Download
- [ ] CV-Download als neu generiertes, zum Website-Design passendes PDF
- [ ] FAQ-Bereich mit direkten Antworten: Standort (flexibel), Starttermin (1-3 Monate), Warum Bitmarck
- [ ] Projekt-Showcases mit Detail-Seiten: Auth API Service (IAM-Bezug), Next CMS (Fullstack), Server-Cluster (DevOps)
- [ ] Tech Stack pro Projekt als Tags auf den Showcase-Karten
- [ ] Skills-Gesamtübersicht als visuelle Section (Icons/Tags)
- [ ] Website-eigener Tech Stack sichtbar (Footer oder Easter Egg)
- [ ] Admin-Bereich: Login via .env-Credentials, Git-Links eintragen, GitHub API Auto-Pull + manuelle Überschreibungen, Projektdaten als JSON-File
- [ ] Projekt-Detail-Seiten dynamisch aus Admin-Daten generiert
- [ ] Deutsch/Englisch Toggle ohne Reload, URL-basiert (/de, /en)
- [ ] Dezente Scroll-Animationen mit Framer Motion
- [ ] Live-Server-Daten (Uptime, Response-Time) aus eigenem Cluster als Proof-of-Skill
- [ ] Clean & Elegant Design: Viel Whitespace, feine Details, sanfte Animationen, klare Typografie
- [ ] Eigenes Design (kein Bitmarck-Branding-Klon) — eigenständig und professionell
- [ ] Self-Hosting auf eigenem Server (Docker)
- [ ] Responsive Design (Mobile + Desktop)

### Out of Scope

- Bitmarck-Branding kopieren — eigenes Design zeigt Persönlichkeit
- Dark/Light Mode Toggle — fokussiert auf ein durchdachtes Theme
- Gehaltsvorstellung im FAQ — zu früh, besser im Gespräch
- CMS-artige Content-Verwaltung — Texte sind statisch, nur Projekte dynamisch via Admin
- Multi-Tenant / Multi-Stelle — Website ist spezifisch für diese eine Bewerbung

## Context

**Die Stelle:** Business Analyst IAM bei Bitmarck (Holding GmbH). Aufgaben: Anforderungsanalyse für digitale Identitäten (Telematik/GKV), fachliche Spezifikationen für bitIAM, Use Cases/Epics/User Stories, Prozessmodellierung (BPMN), Schnittstelle zum Testmanagement.

**Bitmarck:** Digitalisiert das Gesundheitswesen für gesetzliche Krankenkassen. Produkte: 21c|ng, ePA, GeCo. Leitsatz: "Wir digitalisieren und vernetzen für das Wichtigste im Leben — Gesundheit."

**Der Bewerber — Tobias Ludwig:**
- Aktuell: IT-Systemadministrator Secure Client Manager bei Xecuro (SINA, hochsichere IT)
- Hintergrund: 10+ Jahre IT-Erfahrung, Telekom-Ausbildung als IT-Systemelektroniker, BWI (BMVg-Projekte, SINA-Systeme), diverse Techniker-Rollen
- Freelancer: Next.js Websites für Kunden, eigenes CMS, mehrere Supabase-Instanzen, 5 Server im Cluster
- Studium: Informatik B.Sc. an der FernUni Hagen (laufend)
- Zertifikate: ITIL, SINA Core/Basics, DevOps, Linux System Admin, Software Developer Expert
- Projekte: Auth API Service (JWT/OAuth/RBAC — direkt IAM-relevant), Next CMS (Headless CMS mit Supabase), Partner App (Flutter), DBFV Wettkampfsoftware (Ehrenamt), MyFitCoach PRO
- Kernmotivation: Will raus aus der reinen Techniker-Schublade. Denkt analytisch, sieht Zusammenhänge, hat breites Spektrum — will das als Business Analyst offiziell machen

**Karriere-Narrativ:**
Tobias wurde beruflich immer in die Technik-Ecke gestellt, aber seine Stärken liegen im analytischen Denken, in der Koordination und im großen Bild. Bei BWI hat er IT-Infrastrukturprojekte geplant, bei Xecuro Sicherheitskonzepte entwickelt, als Freelancer Kundenanforderungen analysiert und Architekturen entworfen, beim Auth API Service IAM-Konzepte (Use Cases, Datenmodelle, Zugriffskonzepte) eigenständig erarbeitet. Die Stelle bei Bitmarck ist der logische nächste Schritt — nicht ein Wechsel, sondern eine Ankunft.

## Constraints

- **Tech Stack**: Next.js (App Router), Tailwind CSS, Framer Motion, TypeScript
- **Hosting**: Eigener Server, Docker-basiert
- **Datenhaltung**: JSON-File für Projektdaten (kein DB-Overhead)
- **Auth Admin**: Einfache .env-basierte Credentials (kein vollständiges Auth-System)
- **Sprache**: Primär Deutsch, Englisch als Toggle
- **Design**: Clean & Elegant — nicht überladen, Inhalt im Fokus
- **GitHub API**: Für Auto-Pull von Repo-Daten (Languages, Readme, etc.)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Eigenes Design statt Bitmarck-Branding | Zeigt Persönlichkeit und Kreativität, kein Nachmachen | — Pending |
| JSON-File statt Datenbank für Projekte | Kein Overhead, Git-trackbar, reicht für den Scope | — Pending |
| Hybrid-Layout (Dashboard + Story + Terminal) | Zeigt Bandbreite ohne zu überladen — Terminal als Easter Egg bleibt subtil | — Pending |
| Neu generiertes CV-PDF statt Original | Konsistentes Design-Erlebnis, zeigt PDF-Generierungs-Skill | — Pending |
| Self-Hosting statt Vercel | Demonstriert DevOps-Kompetenz direkt | — Pending |
| Kein Dark/Light Toggle | Ein durchdachtes Theme statt zwei halbgare — reduziert Komplexität | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? -> Move to Out of Scope with reason
2. Requirements validated? -> Move to Validated with phase reference
3. New requirements emerged? -> Add to Active
4. Decisions to log? -> Add to Key Decisions
5. "What This Is" still accurate? -> Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-19 after initialization*
