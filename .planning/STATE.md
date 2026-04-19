# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-04-19)

**Core value:** Der Recruiter versteht in 30 Sekunden: Tobias ist kein "nur Techniker" — analytisches Denken, großes Bild, Technik UND Anforderungsübersetzung
**Current focus:** Phase 2 — Public Content

## Current Position

Phase: 1 of 4 (Foundation)
Plan: 2 of 2 in current phase
Status: Phase 1 Complete
Last activity: 2026-04-19 — Plan 01-02 complete (Docker standalone deployment)

Progress: [██░░░░░░░░] 20%

## Performance Metrics

**Velocity:**
- Total plans completed: 2
- Average duration: 4 min
- Total execution time: 0.13 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 1. Foundation | 2/2 | 8 min | 4 min |

**Recent Trend:**
- Last 5 plans: 01-01 (4 min), 01-02 (4 min)
- Trend: stable

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Roadmap: i18n-Routing (`app/[locale]/`) muss im ersten Commit existieren — kein Retrofit
- Roadmap: `@react-pdf/renderer` statt Puppeteer — kein Chromium in Docker
- Roadmap: Terminal Easter Egg und Live Server Metrics sind v2 (TECH-03 bleibt v1 als Phase 3 Scope, Live Metrics in v2)
- 01-01: proxy.ts (Next.js 16) statt middleware.ts -- Node.js Runtime, nicht Edge
- 01-01: localePrefix: 'always' -- /de und /en immer sichtbar in URL
- 01-01: Inter Font via next/font/google CSS Variable (--font-inter) -- GDPR self-hosting
- 01-02: package-lock.json regeneriert wegen npm 10/11 Kompatibilitaet im Docker Container

### Pending Todos

None yet.

### Blockers/Concerns

- Phase 4: react-pdf Flexbox-Constraint — CV-Design muss Flexbox-only berücksichtigen (kein Grid)
- Phase 4: Live-Server-Metrics-Endpoint braucht CORS auf dem Cluster (v2 — nicht in Roadmap)

## Deferred Items

| Category | Item | Status | Deferred At |
|----------|------|--------|-------------|
| v2 | ENH-01: Live Server Metrics Widget | Deferred | Roadmap init |
| v2 | ENH-02: Anschreiben als integrierte Website-Sektion | Deferred | Roadmap init |
| v2 | ENH-03: JSON-LD structured data | Deferred | Roadmap init |

## Session Continuity

Last session: 2026-04-19
Stopped at: Phase 2 context gathered
Resume file: .planning/phases/02-public-content/02-CONTEXT.md
