# Feature Landscape

**Domain:** Single-purpose job application website (interactive resume/portfolio)
**Target:** Recruiter at Bitmarck, Business Analyst IAM position
**Researched:** 2026-04-19

---

## Context: The Unusual Scope

This is not a generic developer portfolio. It is a one-target, one-role application tool
disguised as a website. The audience is a German health-IT recruiter who:
- Spends 6-8 seconds on initial scan before deciding to dig deeper
- Values professional credentials and structured qualifications over flashiness
- Likely forwards the link to a hiring manager or panel
- May or may not print/save a PDF version

Every feature decision must answer: "Does this help a conservative German health-IT
recruiter understand Tobias's value within 30 seconds?" If no, it is a differentiator at
best, a distraction at worst.

---

## Table Stakes

Features where absence causes the recruiter to leave or lose trust.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Above-the-fold clarity | Recruiter sees name, current role, target role, value proposition without scrolling | Low | "Tobias Ludwig — Business Analyst IAM" must be readable in 3 seconds |
| Responsive design (mobile + desktop) | Recruiters forward links; hiring managers open on phones | Medium | Mobile-first layout, test on 375px and 1440px |
| Fast initial load (<2s LCP) | Slow load = lack of care = bad signal for a BA role; affects SEO | Medium | Next.js SSG/ISR, optimized fonts/images, no blocking scripts on first paint |
| Clear navigation / sections | Resume, Projects, Contact must be reachable in one click | Low | Sticky nav or scroll-spy; no mystery meat navigation |
| Professional contact info | Email, LinkedIn, GitHub — immediately visible | Low | Footer + hero CTA; no contact form needed (it's a single application) |
| Skills overview | BA role requires specific competencies; recruiter needs fast scan | Low | Tags/icons, grouped by domain (IAM, BA methods, DevOps, languages) |
| CV / Resume content | Full career history, education, certifications | Low | Content, not presentation — story matters more than table |
| Accessible color contrast (WCAG AA) | Legal baseline in Germany (BITV 2.0); also professionalism signal | Low | Especially important given health-IT context (GKV/public-sector clients) |
| No broken links / no console errors | Any technical failure is a direct counter-signal for a tech role | Low | Critical: the website itself is the job application |
| PDF download (CV) | Recruiters store applications; some systems require file uploads | Medium | See PDF Generation section below |

---

## Differentiators

Features that distinguish this application from a standard PDF application.
These are the reasons to build a website at all.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Dashboard hero with key metrics | Signals "I think in KPIs and structured data" — exactly BA framing | Medium | 3-5 metrics: years of experience, projects shipped, certifications, tech stack size, IAM-specific credential |
| Career narrative section ("Vom Techniker zum BA") | The career change from technician to BA is the main concern a recruiter will have; addressing it proactively is decisive | Medium | Explicit "why this transition" prose, not just timeline |
| Scroll-driven story (career timeline) | Turns static CV into a legible journey; shows web craft without overloading | Medium | Framer Motion scroll-triggered reveals, not parallax — parallax risks nausea on mobile |
| Project showcases with IAM context | Auth API Service directly maps to bitIAM work; demonstrating real IAM experience is rare for a BA candidate | High | Detail pages per project: problem, approach, outcome, tech stack tags |
| GitHub API auto-pull for project data | Keeps project cards current without manual updates; demonstrates API integration thinking | Medium | Octokit, ISR revalidation; manual overrides in JSON for curated descriptions |
| Terminal Easter Egg | Shows personality and technical depth without making it the main story | High | Accessible via keyboard shortcut or footer hint; shows `whoami`, `skills`, `contact` commands |
| FAQ section (addresses recruiter objections) | German recruiters expect thoroughness; preempting "Where are you located?", "When can you start?", "Why Bitmarck?" reduces friction | Low | 5-7 tight Q&A pairs; no salary (per PROJECT.md) |
| Deutsch/Englisch toggle | Bitmarck operates nationally (German primary) but signals adaptability; some hiring panels include English speakers | Medium | URL-based (/de, /en) via next-intl; primary content German |
| Live server metrics widget | Concrete proof of self-hosting DevOps skill; not just claimed — demonstrated in production right now | High | Uptime %, response time from own cluster; fetch from /api/health endpoint on own infra |
| Website own tech stack visible | Meta-signal: "I chose these tools deliberately and can explain why" | Low | Footer or slide-out panel; Next.js, Tailwind, Framer Motion, Docker |
| Integrated cover letter (Anschreiben) | Contextualizes motivation within the experience; rare in portfolio sites | Low | Dedicated section or modal; same design language as rest of site |
| Admin panel (project management) | Demonstrates fullstack thinking; keeps project data fresh without redeployment | Medium | Password-protected via middleware + .env, JSON file read/write via API routes |

---

## Anti-Features

Things to deliberately NOT build. Each has a concrete reason.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Dark / light mode toggle | Doubles design complexity for a one-time-visit application; half-implemented themes look worse than one polished theme | Choose one theme and perfect it — per PROJECT.md |
| Contact form with validation | Tobias is not a freelancer fishing for inbound leads; a recruiter will use email or phone | Direct mailto link and LinkedIn; no server-side form handling needed |
| Multi-locale CMS-managed content | Application copy is fixed; managing translations in a CMS adds days of complexity for zero return | Static JSON translation files per locale |
| Blog / articles section | Dilutes the message; recruiter attention is finite; this is an application, not a brand | If content exists, link to external blog (LinkedIn articles) |
| Social proof / testimonials carousel | Looks like a freelancer acquisition site, not a job application | Single optional quote from a relevant reference if text is very strong |
| Skills progress bars (percentage) | "80% JavaScript" is meaningless and often seen as juvenile by technical reviewers | Use grouped tags with explicit project references as evidence |
| Animated loading screen / intro splash | Delays time-to-content for a recruiter who arrived to judge the application | Show content immediately; micro-animations on scroll only |
| Cookie consent banner | No tracking cookies needed for a single-purpose static site | Avoid analytics that require GDPR consent; no Google Analytics |
| PDF resume that mirrors the website 1:1 | A 6-page PDF full of design chrome does not print well and annoys HR systems | PDF should be clean, structured, ATS-friendly — design-consistent but optimized for print media query |
| Gehaltsvorstellung / salary in FAQ | Premature; weakens negotiating position | Explicitly omit per PROJECT.md; mention "to be discussed" if asked |
| Multi-tenant or multi-role targeting | Dilutes the specific value proposition for the IAM BA role | This site is for exactly one application; keep every line of copy on-target |
| Overly clever navigation | Hidden menus, scroll-jacking, non-standard interactions confuse conservative corporate audiences | Standard sticky nav with clear section labels |

---

## Feature Dependencies

```
GitHub API auto-pull
  └─ requires Admin Panel (to configure repo overrides)
       └─ requires JSON file structure (projects schema)
            └─ requires Project Detail Pages (consumes the data)

PDF Download
  └─ requires CV content finalized
  └─ requires print media query / PDF layout (separate CSS)

i18n (DE/EN toggle)
  └─ requires all content authored in both languages
  └─ requires next-intl routing ([locale] segment)
  └─ affects every feature that renders text

Live Server Metrics Widget
  └─ requires /api/health endpoint on own server cluster
  └─ requires CORS policy on cluster API
  └─ optional: graceful degradation if cluster is down (hide widget or show "maintenance")

Admin Panel
  └─ requires .env credentials (ADMIN_PASSWORD)
  └─ requires file system write access (not compatible with read-only hosting)
  └─ requires API routes (Next.js Route Handlers)

Terminal Easter Egg
  └─ independent (client-only component)
  └─ keyboard shortcut trigger is independent
  └─ content mirrors CV data (soft dependency — stay in sync)

Scroll-driven career timeline
  └─ requires Framer Motion
  └─ requires prefers-reduced-motion media query fallback (accessibility)

Project Showcases
  └─ requires JSON project data
  └─ requires GitHub API for enrichment (optional enrichment, not blocking)
  └─ requires Project Detail Pages (dynamic routes)
```

---

## MVP Definition

The minimum that makes this website better than a PDF application.

**Must ship for MVP:**

1. Above-the-fold hero with name, target role, value proposition, CTA (PDF download)
2. Career narrative section — the "Vom Techniker zum BA" story
3. Skills overview (grouped tags)
4. 3 project showcase cards (Auth API, Next CMS, Server Cluster) — no detail pages yet
5. FAQ section (location, availability, why Bitmarck, why BA)
6. Integrated Anschreiben (cover letter section or modal)
7. PDF download (CV, print-optimized)
8. Responsive design
9. Accessible (WCAG AA contrast, keyboard navigable)
10. DE/EN toggle (both locales authored)
11. Fast load — SSG, no blocking JS on first paint
12. Deployed on own server with HTTPS

**Defer post-MVP:**

- Project detail pages (cards link to GitHub repos as placeholder)
- GitHub API auto-pull (manual JSON data initially)
- Admin panel (update JSON via git commit initially)
- Terminal Easter Egg (build last — high effort, zero recruiter impact)
- Live server metrics widget (adds infra complexity; only add if cluster is stable)

---

## Prioritization Matrix

| Feature | Recruiter Impact | Build Effort | Ship When |
|---------|-----------------|--------------|-----------|
| Hero with value proposition | Critical | Low | MVP |
| Career narrative section | Critical | Low | MVP |
| FAQ (recruiter objections) | Critical | Low | MVP |
| PDF download (CV) | Critical | Medium | MVP |
| Skills overview | High | Low | MVP |
| Project showcase cards | High | Medium | MVP |
| Integrated Anschreiben | High | Low | MVP |
| DE/EN toggle | High | Medium | MVP |
| Responsive design | High | Medium | MVP |
| Scroll-driven timeline | Medium | Medium | Phase 2 |
| Project detail pages | Medium | Medium | Phase 2 |
| Dashboard hero metrics | Medium | Low-Medium | Phase 2 |
| GitHub API auto-pull | Medium | Medium | Phase 2 |
| Admin panel | Low (Tobias only) | Medium | Phase 2 |
| Live server metrics widget | Medium | High | Phase 3 |
| Terminal Easter Egg | Low (niche) | High | Phase 3 |

---

## Special Considerations

### PDF Generation Strategy

Two distinct PDFs serve different purposes:

1. **CV PDF** — ATS-compatible, minimal design, clean typography, structured data.
   Use Puppeteer/Playwright server-side rendering of a dedicated `/cv-print` route with
   `@media print` CSS. Keep to 2 pages. No sidebar design chrome, no background colors
   (use `printBackground: false` default). This is the file recruiters attach to HR
   systems.

2. **Anschreiben PDF** — Design-consistent with website, 1 page. Can use `printBackground:
   true` with color since it is a human-read document, not ATS-parsed.

Avoid the trap of generating one PDF that tries to be both — ATS systems break on
multi-column layouts and background graphics.

### Accessibility Context

Germany's BITV 2.0 (Barrierefreie-Informationstechnik-Verordnung) is binding for public
sector and health IT. Bitmarck serves GKV clients who are subject to public accessibility
law. Building an accessible application signals domain awareness. Minimum: WCAG AA color
contrast, keyboard navigation, focus rings visible, `prefers-reduced-motion` respected
for all Framer Motion animations.

### German Cultural Calibration

German recruiters value thoroughness and structure over creativity for its own sake.
The website must read as professional and considered — not flashy. The "clean & elegant"
design direction in PROJECT.md is correct. Specific signals:
- Formal language in DE locale (Sie-form in professional context)
- Complete information (no teaser sections that hide content behind "Contact me")
- Certifications explicitly listed (ITIL, SINA, etc. carry weight)
- No gimmicks as primary UI — easter eggs are fine but must not be discoverable
  accidentally on first recruiter scan

### SEO is Low Priority

This site will not rank organically for "Business Analyst IAM Germany." The audience
arrives via a direct link sent in the application. SEO basics matter (meta title,
description, canonical URL, no robots block) but aggressive SEO optimization is wasted
effort for this use case. Exception: structured data (JSON-LD Person schema) is worth
the 30 minutes because it makes the Google card clean if the recruiter searches the name.

---

## Sources

- UX Portfolio Playbook — recruiter behavior (6-8 second scan): https://blog.uxfol.io/ux-portfolio-playbook/
- How Design Recruiters Judge Portfolios: https://uxplanet.org/how-recruiters-judge-ux-portfolios-2026-59f77143ce1e
- PDF generation comparison (Puppeteer vs Playwright): https://medium.com/@coders.stop/pdf-generation-from-html-i-tested-puppeteer-playwright-and-wkhtmltopdf-so-you-dont-have-to-d14228d28c4c
- next-intl for Next.js App Router: https://next-intl.dev/docs/getting-started/app-router
- Core Web Vitals 2025: https://owdt.com/insight/how-to-improve-core-web-vitals/
- German recruitment culture 2025: https://www.eurojob-consulting.com/en/a/adapting-to-the-expectations-of-german-job-seekers-in-2025-a-recruitment-guide
- Scroll animations best practices: https://dev.to/okoye_ndidiamaka_5e3b7d30/scroll-like-a-pro-how-scroll-triggered-animations-turn-websites-into-interactive-stories-bp2
- GitHub API portfolio integration: https://dev.to/ramko9999/build-a-dynamic-portfolio-with-the-github-api-3eh9
- Password-protecting Next.js routes: https://www.alexchantastic.com/password-protecting-next
- Resume anti-patterns 2025: https://www.rezi.ai/posts/2025-resume-trends
