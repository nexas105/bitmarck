---
phase: 06-content-expansion
plan: 02
subsystem: ui
tags: [motion, AnimatePresence, accordion, career-timeline, certifications, next-intl]

# Dependency graph
requires:
  - phase: 06-01
    provides: expanded career station data in messages JSON (8 stations with details, narrative, technologies)
provides:
  - Expandable CareerStationCard with animated accordion transitions
  - Rebuilt CareerTimeline rendering all 8 career stations
  - CertificationsSection with 10 certification pills and 3 education cards
  - Navigation updated with certifications link
affects: [06-content-expansion]

# Tech tracking
tech-stack:
  added: []
  patterns: [server-to-client data passing for animated components, t.raw() for array data from next-intl]

key-files:
  created:
    - src/components/career-station-card.tsx
    - src/components/certifications-section.tsx
  modified:
    - src/components/career-timeline.tsx
    - src/app/[locale]/page.tsx
    - src/components/sticky-header.tsx
    - src/components/hamburger-menu.tsx

key-decisions:
  - "Server-client hybrid: CareerTimeline stays server component, passes translated data as props to client CareerStationCard"
  - "Used t.raw() to extract detail arrays directly from next-intl JSON structure"

patterns-established:
  - "Accordion pattern: AnimatePresence with spring-based height animation (stiffness 250, damping 30)"
  - "Server-to-client i18n: server component reads translations, passes as string props to client component"

requirements-completed: [CONTENT-01, CONTENT-04, CONTENT-05]

# Metrics
duration: 2min
completed: 2026-04-19
---

# Phase 06 Plan 02: Career Timeline & Certifications Summary

**Expandable career timeline with 8 animated accordion stations and certifications section with 10 certs and 3 education entries**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-19T18:25:46Z
- **Completed:** 2026-04-19T18:27:36Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- CareerStationCard with AnimatePresence accordion, keyboard accessibility, staggered scroll-in animations
- CareerTimeline rebuilt to render all 8 stations (telekom, mediacom, biermann, bwi, persona, bhf, xecuro, bitmarck) with expandable details
- CertificationsSection with 10 accent-tinted certification pills and 3 education cards with status badges
- Navigation updated in both desktop sticky header and mobile hamburger menu

## Task Commits

Each task was committed atomically:

1. **Task 1: Create expandable CareerStationCard component** - `a840122` (feat)
2. **Task 2: Rebuild CareerTimeline + CertificationsSection + Wire into page** - `7d55688` (feat)

## Files Created/Modified
- `src/components/career-station-card.tsx` - Client component with animated accordion expand/collapse, keyboard accessible
- `src/components/certifications-section.tsx` - Server component rendering 10 certs as pills and 3 education cards
- `src/components/career-timeline.tsx` - Rebuilt with 8 STATION_KEYS, passes data to CareerStationCard
- `src/app/[locale]/page.tsx` - Added CertificationsSection between Skills and FAQ
- `src/components/sticky-header.tsx` - Added certifications to SECTION_IDS and NAV_KEYS
- `src/components/hamburger-menu.tsx` - Added certifications to NAV_KEYS

## Decisions Made
- Server-client hybrid approach: CareerTimeline stays async server component, passes translated strings as props to client CareerStationCard (avoids making timeline a client component)
- Used `t.raw()` from next-intl to extract detail arrays directly from JSON rather than indexing by key

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Career timeline fully interactive with all 8 stations expandable
- Certifications section complete with all content from messages JSON
- Ready for any remaining content expansion plans

## Self-Check: PASSED

- All 3 created/modified source files exist on disk
- Both task commits (a840122, 7d55688) found in git log

---
*Phase: 06-content-expansion*
*Completed: 2026-04-19*
