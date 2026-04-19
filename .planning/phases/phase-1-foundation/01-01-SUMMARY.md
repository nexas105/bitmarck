---
phase: 01-foundation
plan: 01
subsystem: infra
tags: [next.js, next-intl, tailwind-v4, i18n, typescript]

# Dependency graph
requires: []
provides:
  - "Next.js 16 App Router scaffold with TypeScript strict mode"
  - "next-intl v4 i18n routing (/de, /en) with proxy.ts middleware"
  - "Tailwind CSS v4 design token system (@theme) for colors, spacing, typography"
  - "LocaleToggle client component for DE/EN switching"
  - "Inter font via next/font/google (GDPR self-hosted)"
  - "standalone output config for Docker deployment"
affects: [02-core-content, 03-interactive, 04-polish]

# Tech tracking
tech-stack:
  added: [next@16, react@19, next-intl@4, tailwindcss@4, lucide-react, typescript@6]
  patterns: [app-router-locale-routing, css-theme-tokens, proxy-middleware]

key-files:
  created:
    - src/i18n/routing.ts
    - src/i18n/request.ts
    - src/i18n/navigation.ts
    - src/proxy.ts
    - src/app/[locale]/layout.tsx
    - src/app/[locale]/page.tsx
    - src/app/[locale]/not-found.tsx
    - src/components/locale-toggle.tsx
    - src/app/globals.css
    - messages/de.json
    - messages/en.json
    - next.config.ts
  modified: []

key-decisions:
  - "Used proxy.ts (Next.js 16) instead of middleware.ts for next-intl locale detection"
  - "localePrefix: 'always' ensures /de and /en always visible in URL"
  - "Inter font loaded via next/font/google with CSS variable --font-inter for GDPR compliance"

patterns-established:
  - "i18n routing: all pages under app/[locale]/, locale from params Promise (await)"
  - "Design tokens: @theme block in globals.css, referenced via Tailwind utilities (bg-surface, text-text-primary)"
  - "Client components: 'use client' directive required for interactive components"
  - "Navigation: use @/i18n/navigation exports (Link, usePathname) for locale-aware routing"

requirements-completed: [HERO-04, TECH-02]

# Metrics
duration: 4min
completed: 2026-04-19
---

# Phase 1 Plan 1: Next.js 16 + i18n + Design Tokens Summary

**Next.js 16 App Router with next-intl v4 URL-based i18n (/de, /en), Tailwind CSS v4 design token system, and locale toggle component**

## Performance

- **Duration:** 4 min
- **Started:** 2026-04-19T15:39:02Z
- **Completed:** 2026-04-19T15:43:31Z
- **Tasks:** 2 (1 auto + 1 checkpoint auto-approved)
- **Files modified:** 23

## Accomplishments
- Next.js 16 application scaffolded with App Router, TypeScript strict, and standalone output
- next-intl v4 i18n routing with proxy.ts middleware, /de and /en routes returning correct lang attributes
- Tailwind CSS v4 design token system with 9 colors, 8 spacing values, and 4 typography scales
- LocaleToggle component with accessible aria-labels and 44px touch targets
- Inter font self-hosted via next/font/google (no external CDN, GDPR compliant)

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold Next.js 16 and configure i18n routing with design tokens** - `6cf335b` (feat)
2. **Task 2: Verify locale toggle and routing** - auto-approved (checkpoint, no commit)

## Files Created/Modified
- `next.config.ts` - Next.js config with standalone output and next-intl plugin
- `postcss.config.mjs` - Tailwind v4 PostCSS plugin config
- `tsconfig.json` - TypeScript strict config from scaffold
- `src/i18n/routing.ts` - defineRouting with de/en locales, always prefix
- `src/i18n/request.ts` - getRequestConfig with locale validation
- `src/i18n/navigation.ts` - createNavigation exports (Link, usePathname, etc.)
- `src/proxy.ts` - next-intl middleware for locale detection and URL rewriting
- `src/app/globals.css` - Tailwind v4 @theme tokens for colors, spacing, typography
- `src/app/[locale]/layout.tsx` - Root layout with NextIntlClientProvider and Inter font
- `src/app/[locale]/page.tsx` - Scaffold home page with LocaleToggle
- `src/app/[locale]/not-found.tsx` - Translated 404 page
- `src/components/locale-toggle.tsx` - DE/EN switcher with accessible touch targets
- `messages/de.json` - German translations (Metadata, NotFound)
- `messages/en.json` - English translations (Metadata, NotFound)

## Decisions Made
- Used proxy.ts (Next.js 16 convention) instead of middleware.ts -- runs on Node.js runtime, not Edge
- Set localePrefix: 'always' so both /de and /en are always explicit in the URL
- Inter font loaded via next/font/google CSS variable (--font-inter) for GDPR-compliant self-hosting
- Scaffolded via create-next-app in temp directory then copied files to avoid conflicts with existing .planning/ files

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Scaffold in temp directory due to existing files**
- **Found during:** Task 1 (create-next-app)
- **Issue:** create-next-app refused to scaffold in directory with existing files (.planning/, CLAUDE.md, etc.)
- **Fix:** Scaffolded in /tmp/bitmarck-scaffold, then copied relevant files to project root
- **Files modified:** All scaffold files
- **Verification:** npm install succeeded, tsc --noEmit passed
- **Committed in:** 6cf335b (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Minor workaround for scaffold tool limitation. No scope creep.

## Issues Encountered
None beyond the scaffold workaround documented above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- i18n routing foundation complete, all future pages go under app/[locale]/
- Design token system established, all components should use Tailwind utilities (bg-surface, text-text-primary, etc.)
- LocaleToggle pattern established for client components needing locale awareness
- Ready for plan 01-02 (Docker + deployment) or phase 2 (core content)

---
*Phase: 01-foundation*
*Completed: 2026-04-19*
