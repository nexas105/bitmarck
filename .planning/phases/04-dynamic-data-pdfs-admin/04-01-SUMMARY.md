---
phase: 04-dynamic-data-pdfs-admin
plan: 01
subsystem: api
tags: [github-api, caching, server-component, i18n]

# Dependency graph
requires:
  - phase: 02-public-content
    provides: ProjectCard component, Project type, i18n message files
provides:
  - GitHub API client with in-memory TTL caching (src/lib/github.ts)
  - Enriched ProjectCard with live GitHub stats
  - Project type with githubOwner/githubRepo fields
  - .env.example template for Phase 4 env vars
affects: [04-03-admin-crud, docker-deployment]

# Tech tracking
tech-stack:
  added: []
  patterns: [server-side API caching with in-memory Map, graceful degradation on API failure]

key-files:
  created:
    - src/lib/github.ts
    - .env.example
  modified:
    - src/data/projects.ts
    - src/components/project-card.tsx
    - messages/de.json
    - messages/en.json
    - .gitignore

key-decisions:
  - "In-memory Map cache with 1h TTL for GitHub API responses -- simple and sufficient for single-instance deployment"
  - "Graceful degradation: ProjectCard hides GitHub stats row entirely when API returns null"
  - "Added !.env.example exception to .gitignore (was blocked by .env* pattern)"

patterns-established:
  - "Server-side API caching: in-memory Map with timestamp-based TTL expiry"
  - "Graceful degradation: conditional rendering based on nullable API data"

requirements-completed: [PROJ-04]

# Metrics
duration: 2min
completed: 2026-04-19
---

# Phase 4 Plan 01: GitHub API Integration Summary

**Live GitHub data (languages, last commit) on project cards via server-side cached API client with graceful fallback**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-19T17:38:42Z
- **Completed:** 2026-04-19T17:41:34Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments
- GitHub API client with parallel fetch of repo + languages endpoints, in-memory 1h TTL cache
- ProjectCard enriched with top 3 languages and relative last-commit date
- Graceful degradation when GitHub API unavailable or PAT not set
- i18n keys for GitHub stats in both DE and EN

## Task Commits

Each task was committed atomically:

1. **Task 1: GitHub API client with caching + Project type update** - `56b7b83` (feat)
2. **Task 2: Enrich ProjectCard with live GitHub data** - `7d6bfcc` (feat)

## Files Created/Modified
- `src/lib/github.ts` - GitHub API client with getRepoData(), GitHubRepoData type, in-memory cache
- `src/data/projects.ts` - Added githubOwner/githubRepo fields to Project type and all 3 projects
- `src/components/project-card.tsx` - Calls getRepoData, renders languages and last commit below tech stack
- `messages/de.json` - Added Projects.languages, Projects.lastCommit, Projects.daysAgo keys
- `messages/en.json` - Added Projects.languages, Projects.lastCommit, Projects.daysAgo keys
- `.env.example` - Template with GITHUB_PAT, ADMIN_USERNAME, ADMIN_PASSWORD, SESSION_SECRET
- `.gitignore` - Added !.env.example exception

## Decisions Made
- In-memory Map cache with 1h TTL -- simple, no external dependencies, sufficient for single-instance
- Graceful degradation: stats row hidden entirely when getRepoData returns null (no error UI)
- Added !.env.example to .gitignore since .env* pattern was blocking it

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] .env.example blocked by .gitignore pattern**
- **Found during:** Task 1 (commit step)
- **Issue:** `.env*` pattern in .gitignore prevented committing .env.example
- **Fix:** Added `!.env.example` exception to .gitignore
- **Files modified:** .gitignore
- **Verification:** git add .env.example succeeded after the fix
- **Committed in:** 56b7b83 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Minor fix to allow .env.example to be tracked. No scope creep.

## Issues Encountered
- Prior commit 1e77985 (from a different plan execution) had already added src/lib/github.ts and src/data/projects.ts with the same content. Task 1 commit only captured .env.example and .gitignore changes as a result. All files are in correct state in HEAD.

## User Setup Required
For GitHub API to work with private repos, set `GITHUB_PAT` in `.env`:
```
GITHUB_PAT=ghp_your_token_here
```
Without PAT, project cards degrade gracefully (no GitHub stats shown).

## Next Phase Readiness
- GitHub API client ready for reuse in admin panel (ADM-03: auto-fetch on git link paste)
- .env.example template ready for Phase 4 admin credentials
- Project type extended and ready for admin CRUD operations

## Self-Check: PASSED

All 7 files verified present. Both task commits (56b7b83, 7d6bfcc) verified in git log.

---
*Phase: 04-dynamic-data-pdfs-admin*
*Completed: 2026-04-19*
