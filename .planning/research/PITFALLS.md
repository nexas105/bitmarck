# Domain Pitfalls: Interactive Resume/Portfolio Website

**Domain:** Interactive job application website (Next.js, Framer Motion, PDF gen, i18n, self-hosted Docker)
**Researched:** 2026-04-19
**Project:** Bitmarck Bewerbungs-Website (Tobias Ludwig)

---

## Critical Pitfalls

Mistakes that cause rewrites, security breaches, or zero recruiter conversions.

---

### Pitfall 1: Animations That Block the Recruiter's First Impression

**What goes wrong:** Scroll-triggered intro animations, entry sequences, or preloaders delay content visibility. A recruiter who opens the site on a slow office connection sees a spinner or blank screen for 3+ seconds and closes the tab. The 30-second window to communicate "I'm the right candidate" starts from when content is visible — not from when the JavaScript is parsed.

**Why it happens:** Developers build animations on fast local machines with hot-reload. The experience on a cold-loaded production URL on a 20 Mbit office connection is never tested. AnimatePresence entry animations that run on mount can orphan the LCP (Largest Contentful Paint) element behind an opacity:0 initial state.

**Consequences:** Recruiter never reads the content. The animation "showing technical skill" achieves the opposite — it demonstrates poor product thinking.

**Prevention:**
- Hero content (name, role, key message) must be visible within 1.5 seconds on a 3G throttle simulation (Chrome DevTools)
- Use `viewport={{ once: true }}` on all `whileInView` animations — never re-fire on scroll-back
- Set `initial={{ opacity: 0 }}` only on elements below the fold; above-the-fold content must render at full opacity on first paint
- No intro preloaders or loading screens — the site has one purpose (convince one recruiter), not a creative agency portfolio goal
- Test with `network: Fast 3G` in DevTools before each deploy

**Warning signs:**
- LCP > 2.5s in Lighthouse
- Hero section has `initial={{ opacity: 0 }}` with a `delay` prop
- A preloader component exists in the codebase

**Phase mapping:** Must be enforced from Phase 1 (core layout). Never bolt on performance fixes at the end.

---

### Pitfall 2: Framer Motion Animating Layout-Triggering CSS Properties

**What goes wrong:** Animating `width`, `height`, `top`, `left`, `padding`, or `margin` via Framer Motion triggers browser layout recalculations on every frame. On mobile devices this causes visible jank, drops below 60fps, and drains battery. A recruiter checking the site on an iPhone sees choppy scrolling and leaves.

**Why it happens:** The intent is right (animate between states) but the CSS property choice is wrong. `height: 0 → height: auto` transitions are a common culprit in accordion/FAQ sections.

**Consequences:** Janky scroll experience signals poor frontend craft — exactly the opposite of what this site must communicate.

**Prevention:**
- Only animate GPU-composited properties: `x`, `y`, `scale`, `rotate`, `opacity`, `skew`
- For FAQ accordion: use `scaleY` + `overflow: hidden` instead of `height` animation, or use `AnimatePresence` with `exit` variants
- Add `will-change: transform` sparingly (only on actively animating elements — it increases GPU memory usage if overused)
- Run Chrome DevTools Performance tab on a simulated mid-range Android device before shipping any animation

**Warning signs:**
- Framer Motion variants that include `height`, `width`, `top`, `left`, `padding`, `margin`
- `blur` filter animations (cost escalates sharply with blur radius)
- Lighthouse Performance score drops below 85 on mobile

**Phase mapping:** Animation implementation phase. Define an "allowed animation properties" constraint in the design system from the start.

---

### Pitfall 3: PDF Generation Adds ~950MB to Docker Image

**What goes wrong:** Puppeteer (headless Chrome) downloads a full Chromium binary. In a Next.js Docker container this inflates the image to ~950MB. On a self-hosted server with limited disk space or slow pulls, this is operationally painful. Additionally, Puppeteer in Docker requires specific Linux dependencies (libatk, libgbm, etc.) that are not present in slim Node base images.

**Why it happens:** `npm install puppeteer` triggers a post-install Chromium download. In a Next.js standalone build (which uses a slim Node image), these system libraries are absent.

**Consequences:** Docker build fails with missing shared library errors. Or the image builds but the PDF endpoint crashes at runtime with "Failed to launch the browser process".

**Prevention:**
- Use `puppeteer-core` (no auto-Chromium download) + install `google-chrome-stable` from the Debian/Ubuntu package manager in the Dockerfile
- Or consider `@react-pdf/renderer` (react-pdf) as an alternative — it runs purely in Node without a headless browser, has zero Chromium dependency, produces smaller images, but only supports Flexbox layout (no CSS Grid)
- For this project's scope (a styled CV PDF), react-pdf is likely sufficient and avoids the Docker complexity entirely
- If Puppeteer is used: use multi-stage Docker build; never run Puppeteer as root in the container

**Warning signs:**
- `puppeteer` (not `puppeteer-core`) in package.json
- Docker base image is `node:alpine` or `node:slim` with Puppeteer (missing system libs)
- PDF generation route returns 500 in Docker but works locally

**Phase mapping:** PDF generation phase. Decide react-pdf vs Puppeteer before writing any PDF code — this is not an easy swap later.

---

### Pitfall 4: .env Admin Auth Exposed via Client Bundle or Git

**What goes wrong:** The admin login compares a submitted password against `process.env.ADMIN_PASSWORD`. If this env var is accidentally prefixed with `NEXT_PUBLIC_`, it is bundled into the client-side JavaScript and visible to anyone who opens DevTools → Sources. Even without the prefix, if `.env.local` is committed to Git, the credential is exposed permanently (Git history).

**Additionally:** CVE-2025-29927 (CVSS 9.1, March 2025) — Next.js middleware can be bypassed by sending an `x-middleware-subrequest` header, skipping auth entirely if the protection lives only in middleware. If the admin route is protected via middleware only, this vulnerability allows unauthenticated access.

**Why it happens:** Simple .env auth feels harmless for a personal project. But the threat model is real: a recruiter or anyone with the URL could access the admin panel and modify project data.

**Consequences:** Credential leak; potential data modification on the live application.

**Prevention:**
- Store `ADMIN_PASSWORD` without `NEXT_PUBLIC_` prefix (server-side only)
- Validate credentials in a Server Action or Route Handler — never in middleware alone
- Add `.env.local` to `.gitignore` before the first commit (verify with `git check-ignore -v .env.local`)
- Store the actual password as a bcrypt hash (`bcryptjs` is lightweight); compare with `bcrypt.compare()` not string equality
- Use `httpOnly` session cookies (e.g., `iron-session` or a simple JWT in an httpOnly cookie) to persist the admin session — never in localStorage
- The admin panel is low-value (it's a personal portfolio), but doing auth correctly is itself a demonstration of craft

**Warning signs:**
- `NEXT_PUBLIC_ADMIN_PASSWORD` in any .env file
- Auth check lives only in `middleware.ts` without a secondary check in the Route Handler
- `.env.local` not in `.gitignore`

**Phase mapping:** Admin panel phase. These patterns must be set up correctly from the first commit of the admin route — retrofitting security is brittle.

---

### Pitfall 5: GitHub API Rate Limits Hitting Recruiters' Sessions

**What goes wrong:** The GitHub API allows only 60 unauthenticated requests per hour per IP. If the server fetches live GitHub data on each page load (or each admin panel open), a shared IP (office network, VPN) can exhaust this quickly. The result: project cards show empty data or error states when the recruiter views the site.

**Why it happens:** Local development uses a fresh IP with low request counts. Production under multiple concurrent viewers (or repeated admin refreshes) hits the limit fast.

**Consequences:** Project showcase shows broken/empty data at the exact moment it needs to impress.

**Prevention:**
- Use a GitHub Personal Access Token (PAT) — authenticated requests get 5,000 requests/hour
- Store the PAT in `.env.local` as `GITHUB_TOKEN` (never `NEXT_PUBLIC_`)
- Implement server-side caching: cache GitHub API responses for at least 1 hour (use `next/cache` revalidation or a simple in-memory/JSON file cache)
- The admin panel "manual refresh" should update the JSON cache file, not bypass caching to hit the API directly on every page load
- Consider pre-fetching all GitHub data at build time (static generation) for the public-facing project pages

**Warning signs:**
- GitHub API calls in client components (these run in the browser, with the user's IP)
- No caching layer between the API and the rendered output
- API calls happen on every page visit rather than being revalidated on a schedule

**Phase mapping:** GitHub integration in admin panel phase. Cache strategy must be defined before the first API call is written.

---

## Moderate Pitfalls

---

### Pitfall 6: next-intl Middleware Complexity Creates 404s on Certain Routes

**What goes wrong:** Next.js App Router removed built-in i18n routing. Third-party libraries (next-intl is the 2025 standard) use middleware to rewrite URLs. When nested layouts or catch-all routes are combined with i18n middleware, certain route patterns produce 404 errors that only appear in production (different middleware behavior) or on specific path combinations.

**Prevention:**
- Use `next-intl` with the recommended middleware configuration — do not mix with next.config.js i18n setting (they conflict)
- Implement i18n from the beginning, not as a retrofit — the App Router folder structure (`/app/[locale]/...`) must be the base structure
- Test all routes (including `/`, `/de`, `/en`, project detail pages) after any middleware change
- Keep middleware lean — only locale detection and redirect, no auth logic in the same middleware function

**Warning signs:**
- i18n added after the route structure was already built without locale prefix
- `next.config.js` has both an `i18n` key AND next-intl middleware active
- `/` works but `/de` or `/en/projects/[slug]` returns 404

**Phase mapping:** Must be established in Phase 1 scaffolding — retrofitting `/[locale]/` into an existing route tree requires renaming every file and fixing every `useRouter` call.

---

### Pitfall 7: Docker Standalone Build — Static Assets 404

**What goes wrong:** Next.js `output: 'standalone'` creates a minimal Node server that does NOT include the `public/` folder or `.next/static/`. Images, fonts, and other public assets return 404 in the Docker container because the Dockerfile only `COPY`s the standalone output.

**Prevention:**
```dockerfile
# Required in Dockerfile after build:
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
```
- Nginx should serve `/public` and `/_next/static` directly without proxying to Node (performance)
- Set `proxy_buffering off` in Nginx config for streaming/SSR routes, otherwise streaming renders break

**Warning signs:**
- Images or fonts load locally but 404 in Docker
- Lighthouse reports missing resources in the Docker deployment

**Phase mapping:** Docker deployment phase. Write the Dockerfile with static asset copies in the first working Docker build — don't discover this in production.

---

### Pitfall 8: `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` Not Set — Admin Sessions Break on Redeploy

**What goes wrong:** Without a fixed `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY`, Server Action IDs are regenerated on every build. This means any Server Action (including form submissions, admin saves) issued before a redeploy becomes invalid. Admin sessions based on Server Actions will silently break after each deployment.

**Prevention:**
- Generate a random 32-byte hex key once: `openssl rand -hex 32`
- Set it in `.env.local` and in the Docker environment
- This is especially important for the admin panel write operations

**Warning signs:**
- Admin form submissions return 404 or "Action not found" after a redeploy without code changes

**Phase mapping:** Docker/deployment configuration phase.

---

### Pitfall 9: i18n Content Drift — German and English Getting Out of Sync

**What goes wrong:** The site is written in German first. English translations are added as an afterthought. Over time (or under time pressure), English sections lag behind German — some FAQ entries exist only in German, some project descriptions are untranslated, and the recruiter who switches to English gets a broken experience.

**Prevention:**
- All user-visible strings must have a key in both locale files before a feature is considered done
- Use TypeScript-typed translation keys (next-intl supports this) — missing keys become compile errors, not silent fallbacks
- Automate: `missing keys = build warning` via next-intl's TypeScript integration

**Warning signs:**
- Translation files have different key counts
- `t('key')` falls back to the key name (visible as raw strings in the UI)

**Phase mapping:** i18n setup phase — establish the dual-locale discipline from the first string added.

---

## Minor Pitfalls

---

### Pitfall 10: react-pdf Flexbox-Only Layout Constraint Surprises

**What goes wrong:** `@react-pdf/renderer` does not support CSS Grid, standard HTML elements, or browser-targeted React components. Developers start building a CV PDF template using familiar CSS patterns (Grid, position: absolute for decorative elements) and discover mid-build that none of it works.

**Prevention:**
- Plan the PDF layout in Flexbox from the first design mockup
- Test the PDF render output in the browser (react-pdf has a `PDFViewer` component) before investing in complex layouts
- Keep the PDF design simpler than the web design — it's a complement, not a replica

---

### Pitfall 11: Terminal Easter Egg Scope Creep

**What goes wrong:** "Terminal as Easter Egg" sounds simple but can become an open-ended feature. Supporting multiple commands, command history, animated typing, responses for edge cases — each adds hours. The terminal delivers zero recruiter value (recruiters don't use Easter Eggs) and risks delaying the core content.

**Prevention:**
- Define exactly 3-5 commands the terminal supports before writing any code
- Cap implementation time at 2 hours — if it takes longer, cut
- Ship the core site first, terminal last

---

### Pitfall 12: Live Server Metrics Showing Downtime

**What goes wrong:** The site displays live uptime/response-time from Tobias's own server cluster as a "proof of DevOps skill." If the cluster goes down (maintenance, ISP issue, power), the widget shows red/broken metrics at exactly the moment a recruiter is viewing it.

**Prevention:**
- Implement graceful degradation — if the metrics endpoint is unreachable, show "Monitoring temporarily unavailable" instead of an error state
- Set a short timeout (3 seconds) on the metrics fetch; never let a failing external call block page render
- Use a static fallback value if the live data is more than 5 minutes stale

---

## Performance Traps Specific to This Project

| Trap | Risk | Mitigation |
|------|------|------------|
| `whileInView` without `once: true` | Animations re-fire on scroll-back, wasting CPU | Always set `viewport={{ once: true }}` |
| Too many simultaneous `motion.div` elements | Framer Motion overhead per-element is non-trivial | Limit animated elements per viewport to ~10 |
| Blur filter animations | GPU memory spike, especially on mobile | Avoid blur transitions entirely |
| GitHub API on every SSR request | Rate limit exhaustion + slow TTFB | Cache responses, use PAT |
| Puppeteer in Docker | +950MB image, missing system libs | Use react-pdf or pre-configure Dockerfile with Chrome |
| Non-optimized project images | Slow LCP | Use Next.js `<Image>` with proper `sizes` prop |

---

## Security Mistakes Specific to This Project

| Mistake | Severity | Prevention |
|---------|----------|------------|
| `NEXT_PUBLIC_ADMIN_PASSWORD` in env | Critical | Never prefix secrets with NEXT_PUBLIC_ |
| Auth only in middleware (CVE-2025-29927) | High | Validate session in every Route Handler/Server Action |
| `.env.local` committed to Git | High | Add to .gitignore before first commit |
| Admin password stored as plain text | Medium | Hash with bcryptjs |
| GitHub PAT in client-side code | Medium | Only in server-side env vars, never NEXT_PUBLIC_ |

---

## UX Pitfalls Specific to a Job Application Context

| Pitfall | Why It Matters Here | Prevention |
|---------|---------------------|------------|
| Intro animation delays content | Recruiter gives 10-15 seconds — blocking content wastes it | Above-fold content renders at full opacity on first paint |
| "Look at my animations" over "here's why I'm the right candidate" | Recruiters care about the work, not the wrapper | Every animation must serve navigation or emphasis — never pure decoration |
| Key info buried below scroll-heavy sections | If role/company/contact is not in the hero, recruiter misses it | Hero must contain: name, target role, key message, CTA |
| FAQ that doesn't answer the real questions | "Warum Bitmarck?" must be genuine and specific, not generic | Write the FAQ answers before designing the FAQ UI |
| Mobile experience broken by desktop-designed scroll animations | Recruiters read on phones | Test scroll sections on real iPhone/Android before shipping |
| No clear primary CTA | "What should I do after reading this?" | One prominent action: contact / download CV — not five options |

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|----------------|------------|
| Scaffolding & i18n | Route structure incompatible with next-intl if added late | Add `[locale]` to route tree in Phase 1 |
| Animation implementation | Layout-triggering properties, missing `once: true` | Define allowed animation properties upfront |
| Admin panel | .env auth exposed; middleware-only auth bypassed | bcrypt hash, server-side validation in Route Handler |
| GitHub integration | Rate limits, no caching | PAT + server-side cache from first implementation |
| PDF generation | Puppeteer Docker size; react-pdf layout constraints | Choose library before writing any PDF code |
| Docker deployment | Static assets 404; missing encryption key | Copy static folders in Dockerfile; set encryption key |
| Live server metrics | Downtime exposes infrastructure issues at worst time | Graceful degradation with timeout + fallback |

---

## Sources

- [Framer Motion Performance Tier List](https://motion.dev/magazine/web-animation-performance-tier-list) — official Motion docs on GPU compositing
- [Framer Motion Patterns and Pitfalls — DEV Community](https://dev.to/whoffagents/framer-motion-animations-that-dont-kill-performance-patterns-and-pitfalls-5cki)
- [GitHub API Rate Limits — Official Docs](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api)
- [Updated Rate Limits for Unauthenticated Requests — GitHub Changelog 2025](https://github.blog/changelog/2025-05-08-updated-rate-limits-for-unauthenticated-requests/)
- [Next.js Self-Hosting Guide — Official](https://nextjs.org/docs/app/guides/self-hosting)
- [Escape from Vercel: Self-Hosting Next.js with Docker 2025](https://eastondev.com/blog/en/posts/dev/20251220-nextjs-docker-self-hosting/)
- [Security Advice for Self-Hosting Next.js in Docker](https://blog.arcjet.com/security-advice-for-self-hosting-next-js-in-docker/)
- [CVE-2025-29927: Next.js Middleware Auth Bypass](https://projectdiscovery.io/blog/nextjs-middleware-authorization-bypass)
- [Next.js Environment Variables Security Guide 2025](https://hashbuilds.com/articles/next-js-environment-variables-complete-security-guide-2025)
- [next-intl App Router Getting Started](https://next-intl.dev/docs/getting-started/app-router)
- [Next.js i18n App Router Latency Issue — GitHub Discussion](https://github.com/vercel/next.js/discussions/75928)
- [Puppeteer in Docker — Official Guide](https://pptr.dev/guides/docker)
- [react-pdf + Next.js PDF Generation](https://03balogun.medium.com/building-a-pdf-generation-service-using-nextjs-and-react-pdf-78d5931a13c7)
- [Portfolio UX Mistakes — UX Playbook](https://uxplaybook.org/articles/6-ux-portfolio-homepage-mistakes-2025)
- [Framer Motion Layout Issues in Next.js App Router](https://github.com/framer/motion/issues/2250)
