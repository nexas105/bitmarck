---
phase: 04-dynamic-data-pdfs-admin
plan: 02
subsystem: pdf
tags: [react-pdf, pdf-generation, inter-font, api-route, cv]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: Next.js App Router with i18n, project structure
provides:
  - GET /api/pdf/cv endpoint returning styled 2-page CV PDF
  - GET /api/pdf/cover-letter endpoint with DE/EN locale support
  - CvDocument react-pdf component with real CV data
  - CoverLetterDocument react-pdf component
  - PDF data layer (getCvData) and shared styles
affects: [04-dynamic-data-pdfs-admin]

# Tech tracking
tech-stack:
  added: ["@react-pdf/renderer"]
  patterns: [renderToBuffer in API route, Font.register at module level, Flexbox-only PDF layout]

key-files:
  created:
    - src/components/pdf/cv-document.tsx
    - src/components/pdf/cover-letter-document.tsx
    - src/components/pdf/pdf-styles.ts
    - src/lib/pdf-data.ts
    - src/data/cover-letter.ts
    - src/app/api/pdf/cv/route.tsx
    - src/app/api/pdf/cover-letter/route.tsx
    - public/fonts/Inter-Regular.ttf
    - public/fonts/Inter-Medium.ttf
    - public/fonts/Inter-Bold.ttf
  modified:
    - next.config.ts
    - package.json

key-decisions:
  - "Buffer-to-Uint8Array conversion needed for Response body (Node Buffer not BodyInit-compatible)"
  - "Font.register called at module level in pdf-styles.ts, imported as side-effect in document components"
  - "API routes use .tsx extension for JSX in renderToBuffer calls"
  - "Cover letter date generated dynamically at render time"

patterns-established:
  - "PDF document pattern: Font.register in shared module, import as side-effect, renderToBuffer in route handler"
  - "Flexbox-only PDF layout: flexDirection row for columns, column for stacks, percentage widths"

requirements-completed: [DL-01, DL-03]

# Metrics
duration: 5min
completed: 2026-04-19
---

# Phase 4 Plan 2: PDF Generation Summary

**CV and cover letter PDFs via @react-pdf/renderer with real CV data, Inter font, and accent color #2563EB matching website design**

## Performance

- **Duration:** 5 min
- **Started:** 2026-04-19T17:39:03Z
- **Completed:** 2026-04-19T17:44:00Z
- **Tasks:** 2
- **Files modified:** 12

## Accomplishments
- Downloadable 2-page CV PDF at /api/pdf/cv with all 7 positions, 3 education entries, 10 certifications, 6 projects, and volunteering
- Downloadable cover letter PDF at /api/pdf/cover-letter with DE/EN support (?lang=en)
- Inter font registered for PDF rendering matching website typography
- Shared PDF styles with website design tokens (accent #2563EB, text colors, border)

## Task Commits

Each task was committed atomically:

1. **Task 1: Install react-pdf, download Inter fonts, create PDF data layer and styles** - `98f6909` (feat)
2. **Task 2: CV and Cover Letter PDF document components + API routes** - `a929607` (feat)

## Files Created/Modified
- `src/lib/pdf-data.ts` - Complete CV data as typed TypeScript constant with getCvData()
- `src/components/pdf/pdf-styles.ts` - Shared PDF styles, Inter font registration, design tokens
- `src/data/cover-letter.ts` - DE/EN cover letter content for Bitmarck Business Analyst IAM position
- `src/components/pdf/cv-document.tsx` - 2-page A4 CV with Flexbox-only two-column layout
- `src/components/pdf/cover-letter-document.tsx` - Formal letter layout with locale prop
- `src/app/api/pdf/cv/route.tsx` - GET endpoint serving CV PDF via renderToBuffer
- `src/app/api/pdf/cover-letter/route.tsx` - GET endpoint with ?lang=en query param
- `public/fonts/Inter-*.ttf` - Inter font files (Regular, Medium, Bold)
- `next.config.ts` - Added serverExternalPackages for @react-pdf/renderer
- `package.json` - Added @react-pdf/renderer dependency

## Decisions Made
- Buffer-to-Uint8Array conversion: Node.js Buffer from renderToBuffer is not assignable to Response BodyInit; wrapping in new Uint8Array(buffer) resolves TypeScript error
- Font registration via side-effect import: pdf-styles.ts calls Font.register at module level, document components import it to ensure fonts load before render
- API route file extension .tsx: Route handlers use JSX (<CvDocument />) so they need .tsx extension
- Cover letter date: Generated dynamically at render time rather than hardcoded

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Buffer type incompatibility with Response constructor**
- **Found during:** Task 2 (API route implementation)
- **Issue:** renderToBuffer returns Node.js Buffer which TypeScript rejects as Response body (TS2345)
- **Fix:** Wrapped buffer in new Uint8Array(buffer) for both route handlers
- **Files modified:** src/app/api/pdf/cv/route.tsx, src/app/api/pdf/cover-letter/route.tsx
- **Verification:** npx tsc --noEmit passes, npm run build succeeds
- **Committed in:** a929607 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug fix)
**Impact on plan:** Standard type conversion fix. No scope creep.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- PDF endpoints ready for download buttons in UI (future plan can link to /api/pdf/cv and /api/pdf/cover-letter)
- Cover letter supports locale switching via query parameter

---
*Phase: 04-dynamic-data-pdfs-admin*
*Completed: 2026-04-19*
