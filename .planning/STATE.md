# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-04-19)

**Core value:** Der Recruiter versteht in 30 Sekunden: Tobias ist kein "nur Techniker" — analytisches Denken, großes Bild, Technik UND Anforderungsübersetzung
**Current focus:** Phase 2 — Public Content

## Current Position

Phase: 2 of 4 (Public Content)
Plan: 1 of 4 in current phase
Status: Executing Phase 2
Last activity: 2026-04-19 — Plan 02-01 complete (Data foundation, i18n messages, Tag component)

Progress: [███░░░░░░░] 30%

## Performance Metrics

**Velocity:**
- Total plans completed: 3
- Average duration: 3 min
- Total execution time: 0.17 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 1. Foundation | 2/2 | 8 min | 4 min |
| 2. Public Content | 1/4 | 2 min | 2 min |

**Recent Trend:**
- Last 5 plans: 01-01 (4 min), 01-02 (4 min), 02-01 (2 min)
- Trend: accelerating

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
- 02-01: Project data uses translation keys (dot notation) for bilingual content instead of inline objects
- 02-01: Tag component is server component (no 'use client') -- purely presentational
- 02-01: lucide-react moved to dependencies for Docker standalone builds

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
Stopped at: Completed 02-01-PLAN.md
Resume file: .planning/phases/02-public-content/02-02-PLAN.md
