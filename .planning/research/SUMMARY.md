# Project Research Summary

**Project:** Bitmarck Bewerbungs-Website (Interactive Resume/Application)
**Domain:** Single-purpose job application website — Next.js App Router, self-hosted Docker
**Researched:** 2026-04-19
**Confidence:** HIGH

## Executive Summary

This is a one-target, one-role job application tool disguised as a website. The audience is a conservative German health-IT recruiter at Bitmarck evaluating Tobias Ludwig for a Business Analyst IAM role. Research is unambiguous on the core constraint: recruiter attention lasts 6-8 seconds on initial scan, and the entire site must communicate "technical analyst, not just technician" within 30 seconds. Every technical decision must serve that goal — not demonstrate cleverness.

The recommended approach is a Next.js 16 App Router application with Tailwind CSS v4, next-intl for DE/EN routing, `motion` (Framer Motion) for scroll-triggered section animations, `@react-pdf/renderer` for server-side PDF generation, `iron-session` for lightweight admin auth, and Docker standalone output for self-hosted deployment. This stack precisely matches project constraints and has well-documented patterns. The i18n routing structure (`app/[locale]/`) must be established in the first commit — retrofitting it later is painful and error-prone. The admin panel uses a JSON file as the data layer (no database), which is appropriate for this scope.

The biggest risks are not technical. They are: (1) animations that delay recruiter-visible content, (2) scope creep on low-value features like the Terminal Easter Egg and Live Server Metrics while core content is unfinished, and (3) Docker deployment surprises from Puppeteer's Chromium dependency (eliminated by using `@react-pdf/renderer`) and missing static asset copies. Ship content first; add polish only when the core story is told.

## Key Findings

### Recommended Stack

The stack is fully constrained by the project spec (Next.js, Tailwind, Framer Motion, TypeScript, Docker) and research validates all choices with specific versions. The only notable substitution research recommends: use `@react-pdf/renderer` instead of Puppeteer for PDF generation. Puppeteer adds ~950MB to Docker images and requires system Chromium libraries absent in slim Node base images. `@react-pdf/renderer` runs purely in Node, produces smaller images, and is sufficient for a 2-page CV with Flexbox-based layout.

**Core technologies:**
- Next.js 16 (App Router): full-stack framework — standalone Docker output, RSC-first, Turbopack default
- TypeScript 5.x: type safety — required; next-intl v4 needs TS5+
- Tailwind CSS 4.x: styling — CSS-based config (no tailwind.config.js), faster than v3
- `motion` 12.x (formerly framer-motion): scroll animations — import from `motion/react`; all motion components need `"use client"`
- `next-intl` 4.9.x: DE/EN i18n — App Router-native, type-safe locale config, middleware integration
- `@react-pdf/renderer` 4.5.x: PDF generation — React JSX layout, server-side via Route Handler, no Chromium
- `@octokit/rest` 22.0.x: GitHub API — server-side only, token hidden from client
- `iron-session` 8.0.x: admin auth — encrypted cookie sessions, no external auth service
- Docker (standalone): self-hosting — `output: "standalone"` in next.config.ts, multi-stage build

### Expected Features

**Must have (MVP):**
- Above-the-fold hero: name, "Business Analyst IAM" target role, value proposition, PDF download CTA
- Career narrative section: "Vom Techniker zum BA" — explicit transition story
- Skills overview: grouped tags by domain (IAM, BA methods, DevOps, languages)
- Project showcase cards (3): Auth API Service, Next CMS, Server Cluster
- FAQ section: location, start date, "Warum Bitmarck?", "Warum BA?"
- Integrated Anschreiben: dedicated section or modal
- PDF download (CV): clean, ATS-compatible, 2-page
- DE/EN toggle: URL-based `/de` / `/en` via next-intl
- Responsive design: mobile-first
- Deployed on own server with HTTPS

**Should have (Phase 2+):**
- Dashboard hero with key metrics
- Scroll-driven career timeline with Framer Motion animations
- Project detail pages with problem/approach/outcome narrative
- GitHub API auto-pull for live repo metadata
- Admin panel for JSON project management

**Defer (Post-launch):**
- Terminal Easter Egg — zero recruiter impact, hard cap 2 hours
- Live server metrics widget — graceful degradation mandatory
- JSON-LD structured data

### Architecture Approach

RSC-first with clear server/client boundary. All data fetching and auth in Server Components; only leaf components with animations get `"use client"`. `app/[locale]/` for public routes, `app/admin/` outside locale tree. Single middleware handles locale detection + admin session guard.

**Major components:**
1. `middleware.ts` — locale redirect + admin cookie guard
2. `app/[locale]/layout.tsx` — next-intl provider, global nav, footer
3. `lib/data.ts` (server-only) — read-only JSON access
4. `app/admin/*` — CRUD with Server Actions, session verified per action
5. `app/api/github/[repo]/route.ts` — GitHub proxy with 1-hour cache
6. `app/api/pdf/cv/route.ts` — react-pdf renders CV to buffer

### Critical Pitfalls

1. **Animations blocking recruiter content** — Hero must render at full opacity on first paint. LCP < 2.5s.
2. **i18n retrofitting** — `app/[locale]/` must exist from first file. No exceptions.
3. **Puppeteer in Docker** — Use `@react-pdf/renderer` instead. No Chromium needed.
4. **Admin auth: CVE-2025-29927** — Validate session in Server Actions, not just middleware. Bcrypt hash for password.
5. **GitHub API rate limits** — 60 req/hour unauthenticated. Use PAT server-side + cache.

## Implications for Roadmap

### Phase 1: Foundation & Scaffolding
**Rationale:** i18n routing and data layer are architectural prerequisites.
**Delivers:** Next.js project with `app/[locale]/` structure, next-intl, Tailwind, data schema, Docker stub
**Avoids:** i18n retrofit pitfall

### Phase 2: Core Public Content (MVP)
**Rationale:** Recruiter-facing content is the product. Ship hero, narrative, skills, FAQ, projects first.
**Delivers:** All MVP features as static RSC pages, DE/EN content, responsive layout
**Avoids:** Above-fold opacity pitfall

### Phase 3: Animations & Visual Polish
**Rationale:** Layer animations onto confirmed content.
**Delivers:** Framer Motion scroll entrances, career timeline, metrics counters
**Avoids:** GPU-composited properties only (x, y, scale, opacity)

### Phase 4: PDF Generation
**Rationale:** PDF requires finalized design.
**Delivers:** `/api/pdf/cv` Route Handler, react-pdf CV template, download button
**Avoids:** Puppeteer Docker pitfall

### Phase 5: Dynamic Data & GitHub Integration
**Rationale:** GitHub API adds depth without being MVP blocker.
**Delivers:** GitHub proxy with cache, project detail pages
**Avoids:** Rate limit pitfall

### Phase 6: Admin Panel
**Rationale:** Enables content updates without redeployment. After data model is stable.
**Delivers:** Admin CRUD, iron-session auth, Server Actions
**Avoids:** CVE-2025-29927, .env exposure

### Phase 7: Docker Deployment & Launch
**Rationale:** Final integration and production validation.
**Delivers:** Production Dockerfile, HTTPS, Lighthouse validation
**Avoids:** Static asset copy pitfall

### Phase 8: Enhancements (Post-Launch)
**Rationale:** Zero recruiter impact. Ship only after application submitted.
**Delivers:** Terminal Easter Egg (2h cap), Live Server Metrics (graceful degradation)

### Research Flags

Needs deeper research: Phase 4 (react-pdf layout constraints), Phase 7 (reverse proxy config)
Standard patterns: Phases 1, 2, 3, 6

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All libraries verified at specific versions |
| Features | HIGH | Recruiter behavior well-sourced |
| Architecture | HIGH | Official docs + next-intl guide |
| Pitfalls | HIGH | CVE documented, Docker pitfalls widely reported |

**Overall confidence:** HIGH

### Gaps to Address

- **PDF Flexbox constraint:** `@react-pdf/renderer` supports Flexbox only — CV design must be planned accordingly
- **Live server metrics endpoint:** Depends on cluster exposing metrics with CORS
- **Terminal command set:** Needs brief spec (3-5 commands) before implementation
- **Anschreiben format:** PDF vs rendered section — decide in Phase 2

---
*Research completed: 2026-04-19*
*Ready for roadmap: yes*
