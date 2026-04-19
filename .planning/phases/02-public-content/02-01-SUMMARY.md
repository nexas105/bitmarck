---
phase: 02-public-content
plan: 01
subsystem: i18n, data
tags: [next-intl, i18n, typescript, lucide-react, design-tokens]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: "Next.js app with i18n routing, Tailwind CSS v4 design tokens, message file structure"
provides:
  - "Complete DE/EN message files with 10 namespaces for all Phase 2 sections"
  - "Typed project data module with 3 projects and accessor functions"
  - "Reusable Tag component with design token styling"
  - "lucide-react in production dependencies for Docker builds"
affects: [02-public-content, 03-animations, 04-admin-pdf]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Translation keys in project data (titleKey, descriptionKey) instead of inline text"
    - "Server-only Tag component for zero JS bundle presentational elements"

key-files:
  created:
    - src/data/projects.ts
    - src/components/tag.tsx
  modified:
    - messages/de.json
    - messages/en.json
    - package.json

key-decisions:
  - "Project data uses translation keys (dot notation) referencing message file namespaces for bilingual content"
  - "Tag component is a server component (no 'use client') since it has no interactivity"
  - "lucide-react moved to dependencies for Docker standalone builds"

patterns-established:
  - "ProjectData namespace pattern: structured i18n keys for data-driven content"
  - "Server component Tag with design token classes (surface-subtle, border, text-secondary)"

requirements-completed: [HERO-01, HERO-02, NARR-01, NARR-02, PROJ-01, PROJ-02, DL-02, TECH-05]

# Metrics
duration: 2min
completed: 2026-04-19
---

# Phase 2 Plan 01: Data Foundation Summary

**Complete DE/EN i18n message files (10 namespaces), typed project data module for 3 showcase projects, and reusable Tag component with design tokens**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-19T16:50:36Z
- **Completed:** 2026-04-19T16:52:46Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- Extended both DE/EN message files from 2 namespaces to 10 (Nav, Hero, Metrics, Career, Projects, ProjectDetail, Skills, FAQ, Footer, ProjectData)
- Created typed project data module exporting Project type, getAllProjects, getProject, getAllProjectSlugs for 3 projects (auth-api, next-cms, server-cluster)
- Created reusable Tag server component with pill-shaped design using design tokens
- Moved lucide-react from devDependencies to dependencies to prevent Docker build failures

## Task Commits

Each task was committed atomically:

1. **Task 1: Create i18n message files and project data module** - `5c15be2` (feat)
2. **Task 2: Create reusable Tag component** - `ae12b35` (feat)

## Files Created/Modified
- `messages/de.json` - German translations for all Phase 2 sections (10 namespaces)
- `messages/en.json` - English translations for all Phase 2 sections (10 namespaces)
- `src/data/projects.ts` - Typed project data with 3 projects and accessor functions
- `src/components/tag.tsx` - Reusable pill-shaped tag/chip server component
- `package.json` - lucide-react moved to dependencies

## Decisions Made
- Project data uses translation keys (e.g., `ProjectData.authApi.title`) referencing message file namespaces rather than inline bilingual objects, keeping all translatable content in one place
- Tag component kept as server component (no `'use client'`) since it is purely presentational with no interactivity
- lucide-react moved to dependencies since it is imported in rendered components and needed at runtime

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- All section translations available for component development in Plans 02-03
- Project data module ready for ProjectCard and ProjectDetailPage consumption
- Tag component ready for reuse in SkillsSection and ProjectCard tech stack tags
- lucide-react available in production builds for icon usage in header/navigation

---
*Phase: 02-public-content*
*Completed: 2026-04-19*
