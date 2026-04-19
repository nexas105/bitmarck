# Technology Stack

**Project:** Bitmarck Bewerbungs-Website (Interactive Resume/Application)
**Researched:** 2026-04-19

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 16.x (latest stable) | Full-stack React framework | App Router, server components, Route Handlers, standalone Docker output. v16 is stable with Turbopack default. Project constraint already specifies Next.js. |
| TypeScript | 5.x | Type safety | Required by project. next-intl v4 requires TypeScript 5+. |
| Tailwind CSS | 4.x | Styling | Project constraint. v4 uses a CSS-based config (no tailwind.config.js needed), faster than v3. |
| React | 19.x | UI rendering | Bundled with Next.js 16. |

### Animations

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `motion` (formerly framer-motion) | 12.x | Scroll animations, whileInView, page transitions | The package was rebranded from `framer-motion` to `motion`. Both npm packages are maintained with identical APIs — use `motion` for new projects, import from `motion/react`. `whileInView` and `useScroll` are verified and well-documented. All Framer Motion components require `"use client"` in Next.js App Router — they cannot run in Server Components. |

### Internationalisation (i18n)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `next-intl` | 4.9.x | DE/EN toggle, URL-based (`/de`, `/en`), no-reload routing | Designed ground-up for App Router and Server Components. Fastest growth in the i18n ecosystem (4x YoY as of 2025). Supports `defineRouting` for type-safe locale config shared between middleware and navigation. Handles locale detection, redirects, and URL rewrites via middleware. v4 reduces bundle size by ~7% and centralises type registration. The two-locale scope (`de`, `en`) is trivial to configure. |

### PDF Generation

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `@react-pdf/renderer` | 4.5.x | Server-side CV and cover letter PDF generation | React-first: build PDF layout as JSX components with familiar CSS-like styling. Runs server-side via `renderToBuffer` in a Next.js Route Handler — output is streamed as `application/pdf`. No headless browser needed: significantly lighter (~860k weekly downloads, 15.9k stars). Puppeteer is explicitly NOT recommended for this scope (see below). |

### GitHub API Integration

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `@octokit/rest` | 22.0.x | Fetch repo metadata (languages, description, stars) for project showcases | Official GitHub SDK. Used exclusively server-side (Next.js Server Components or Route Handlers) with a `GITHUB_TOKEN` env var — never exposes the token to the client. Lightweight alternative to the full `octokit` bundle (which includes GraphQL, webhooks, etc. — unnecessary here). |

### Admin Authentication

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `iron-session` | 8.0.x | Stateless, encrypted cookie-based session for admin panel | Matches the project constraint exactly: `.env` credentials, no external auth service, no database. `getIronSession()` works natively with Next.js App Router's `cookies()` from `next/headers`. Sessions are encrypted (not just signed like plain JWT), so credentials never leave the server. A simple credential check against `process.env.ADMIN_PASSWORD` on login satisfies the scope. v8 has a minimal API surface. |

### Containerisation

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Docker | Latest stable | Self-hosting on own server | Project constraint. Next.js `output: "standalone"` in `next.config.ts` produces a minimal runtime directory — no `node_modules` in the image. Official Vercel multi-stage Dockerfile pattern (deps → builder → runner using `node:24-slim`) is the standard. Pair with a Traefik or nginx reverse proxy on the host. |

---

## Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `lucide-react` | latest | Icon set (skills tags, nav, social links) | All icon needs — consistent, tree-shakeable, Tailwind-friendly |
| `clsx` + `tailwind-merge` | latest | Conditional class composition | Every component with dynamic Tailwind classes |
| `zod` | 3.x | Validate admin form input and JSON data files | Admin login form + project JSON schema validation |
| `sharp` | latest | Next.js image optimisation (required when self-hosting) | Next.js Image component needs sharp when not on Vercel |
| `server-only` | latest | Prevent server modules leaking to the client | Mark GitHub API and iron-session modules as server-only |

---

## Dev Tools

| Tool | Version | Purpose |
|------|---------|---------|
| ESLint + `eslint-config-next` | bundled with Next.js 16 | Linting |
| Prettier | 3.x | Formatting |
| `@types/node`, `@types/react` | latest | TypeScript definitions |

---

## Installation

```bash
# Core
npm install next react react-dom typescript

# Styling
npm install tailwindcss @tailwindcss/postcss

# Animations
npm install motion

# i18n
npm install next-intl

# PDF generation
npm install @react-pdf/renderer

# GitHub API
npm install @octokit/rest

# Session / Auth
npm install iron-session

# Utilities
npm install lucide-react clsx tailwind-merge zod sharp server-only

# Dev
npm install -D @types/node @types/react @types/react-dom eslint eslint-config-next prettier
```

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Animation | `motion` (motion/react) | CSS animations / GSAP | Framer/Motion is the project constraint. GSAP is heavier and license-restricted for commercial use. |
| i18n | `next-intl` | `next-i18next` | `next-i18next` is Pages Router-first; App Router support is bolted on. `next-intl` is the current community default for App Router. |
| i18n | `next-intl` | `next-international` | Smaller ecosystem, less documentation, fewer contributors. |
| PDF | `@react-pdf/renderer` | Puppeteer / headless Chrome | Puppeteer requires a full Chromium binary in Docker (~400MB), causes deployment timeouts at scale, and is overkill for a 2-page CV. react-pdf is purpose-built for document generation and renders server-side without a browser. |
| PDF | `@react-pdf/renderer` | `react-to-pdf` / `html2canvas` | Client-side only, quality depends on browser rendering, cannot be served via API route. |
| Auth | `iron-session` | Auth.js (NextAuth v5) | Auth.js is designed for OAuth providers and user databases. For `.env` credential check with a single admin, it's massive overkill and adds complex configuration. |
| Auth | `iron-session` | Raw `jose` / JWT in cookies | Iron-session wraps jose internally and adds a cleaner API. No reason to use raw jose unless you need custom claims. |
| GitHub API | `@octokit/rest` | Raw `fetch` to GitHub API | Octokit handles rate limiting, pagination, auth headers, and type safety out of the box. |
| Containerisation | Docker standalone | Vercel / Netlify | Self-hosting is a project constraint and demonstrates DevOps competence. |
| Bundler | Turbopack (default in Next.js 16) | Webpack | Turbopack is stable default in Next.js 16, 2-5x faster builds. No action needed — it's on by default. |

---

## What NOT to Use

| Library | Reason |
|---------|--------|
| Puppeteer / `playwright` for PDF | 400MB+ Chromium in Docker, memory limits at 50-100 pages, deployment timeouts. Wrong tool for document generation. |
| `next-i18next` | Pages Router-first. App Router is a second-class citizen. Not maintained with App Router priorities. |
| Auth.js / Clerk / Auth0 | All designed for multi-user, OAuth-based systems. The admin panel needs one credential check — this is a `.env` username/password comparison, not a user management system. |
| `react-pdf` (wojtekmaj) | This is a PDF *viewer* (renders existing PDFs), not a PDF *generator*. Different library from `@react-pdf/renderer`. Easy to confuse on npm. |
| `jsPDF` | Imperative API, no React integration, produces lower-quality output than @react-pdf/renderer for structured documents. |
| Redux / Zustand / Jotai | No global client state needed. Next.js App Router server components + URL state handle all data needs. Adding a state manager would be over-engineering. |
| `next/font` alternatives (Google Fonts CDN) | Use `next/font` built-in — fonts load locally, no GDPR network request to Google, faster. |
| `framer-motion` (old package name) | Still works, but new installs should use `motion`. Both packages are identical in API but `motion` is the canonical going-forward name. |

---

## Critical Configuration Notes

1. **motion components need `"use client"`** — every component using `motion.div`, `useScroll`, or `useInView` must be a Client Component. Create thin client wrapper components (`AnimatedSection.tsx`) and keep page-level components as Server Components.

2. **next-intl middleware must run before auth checks** — in `middleware.ts` (or `proxy.ts` in Next.js 16+), chain the intl middleware with the admin route protection.

3. **`output: "standalone"` required for Docker** — add to `next.config.ts`. Without it, the Docker image will be 2-3x larger and require the full `node_modules` directory at runtime.

4. **sharp must be installed explicitly when self-hosting** — Next.js Image optimisation relies on sharp; it is not auto-installed outside of Vercel.

5. **`@react-pdf/renderer` server-only** — PDF generation runs in a Next.js Route Handler (`/api/cv/route.ts`). Mark the PDF component file with `server-only` to prevent it from being bundled into client JS. The response is `Content-Type: application/pdf` streamed via `renderToBuffer`.

6. **GitHub API token scoped minimally** — use a fine-grained Personal Access Token with read-only access to public repository metadata only. Store as `GITHUB_TOKEN` env var, never expose to client.

---

## Sources

- [next-intl App Router docs (Context7)](https://github.com/amannn/next-intl)
- [next-intl v4.0 release notes](https://next-intl.dev/blog/next-intl-4-0)
- [next-intl npm (v4.9.1)](https://www.npmjs.com/package/next-intl)
- [Motion (framer-motion) npm (v12.38.0)](https://www.npmjs.com/package/framer-motion)
- [motion/react upgrade guide](https://motion.dev/docs/react-upgrade-guide)
- [@react-pdf/renderer npm (v4.5.1)](https://www.npmjs.com/package/@react-pdf/renderer)
- [@octokit/rest npm (v22.0.1)](https://www.npmjs.com/package/@octokit/rest)
- [iron-session npm (v8.0.4)](https://www.npmjs.com/package/iron-session)
- [Next.js 16 release](https://nextjs.org/blog/next-16)
- [Next.js self-hosting guide](https://nextjs.org/docs/app/guides/self-hosting)
- [Next.js with-docker official example](https://github.com/vercel/next.js/tree/canary/examples/with-docker)
- [Medium: Best i18n libraries Next.js App Router 2025](https://medium.com/better-dev-nextjs-react/the-best-i18n-libraries-for-next-js-app-router-in-2025-21cb5ab2219a)
- [DEV: 6 open-source PDF generation libraries 2025](https://dev.to/ansonch/6-open-source-pdf-generation-and-modification-libraries-every-react-dev-should-know-in-2025-13g0)
- [Framer Motion + Next.js Server Components workaround](https://www.hemantasundaray.com/blog/use-framer-motion-with-nextjs-server-components)
