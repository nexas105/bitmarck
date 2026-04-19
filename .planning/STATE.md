# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-04-19)

**Core value:** Der Recruiter versteht in 30 Sekunden: Tobias ist kein "nur Techniker" — analytisches Denken, großes Bild, Technik UND Anforderungsübersetzung
**Current focus:** Phase 3 — Animations & Polish

## Current Position

Phase: 3 of 5 (Animations & Polish)
Plan: 2 of 2 in current phase
Status: Phase 3 Complete
Last activity: 2026-04-19 — Plan 03-02 complete (Terminal Easter Egg)

Progress: [████████░░] 80%

## Performance Metrics

**Velocity:**
- Total plans completed: 8
- Average duration: 2 min
- Total execution time: 0.31 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 1. Foundation | 2/2 | 8 min | 4 min |
| 2. Public Content | 4/4 | 8 min | 2 min |
| 3. Animations & Polish | 2/2 | 3 min | 1.5 min |

**Recent Trend:**
- Last 5 plans: 02-02 (2 min), 02-03 (2 min), 02-04 (2 min), 03-01 (1 min), 03-02 (2 min)
- Trend: stable at 1-2 min

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
- 02-04: Scroll-spy uses IntersectionObserver with rootMargin '-64px 0px -50% 0px' for header offset
- 02-04: HamburgerMenu body scroll lock via overflow-hidden class with useEffect cleanup
- 03-01: HeroSection not wrapped in AnimateOnScroll -- above-the-fold renders instantly
- 03-01: viewport margin=-64px accounts for sticky header height in scroll trigger
- 03-01: AnimateOnScroll wrapper pattern -- wrap server components from page.tsx, never convert to client
- 03-02: CustomEvent bridge pattern -- TerminalHint dispatches toggle-terminal event, Terminal listens, no shared state
- 03-02: Terminal z-[60] above StickyHeader z-50 for proper overlay stacking
- 03-02: Command allowlist as const tuple -- input trimmed+lowercased, matched against allowlist only

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
Stopped at: Completed 03-02-PLAN.md (Terminal Easter Egg) -- Phase 3 complete
Resume file: Phase 4 planning
