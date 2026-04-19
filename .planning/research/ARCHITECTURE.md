# Architecture Patterns

**Project:** Bitmarck Bewerbungs-Website (bitmarck)
**Domain:** Interactive resume/application website — Next.js App Router
**Researched:** 2026-04-19
**Confidence:** HIGH (Next.js docs + verified patterns)

---

## System Overview

```
Browser
  │
  ├── / (root)  ──redirect──►  /de  (defaultLocale)
  │
  ├── /[locale]/*              Public pages (SSR/SSG)
  │     ├── /[locale]          Hero + Dashboard section
  │     ├── /[locale]/story    Career narrative scroll
  │     ├── /[locale]/projects Project listing
  │     ├── /[locale]/projects/[slug]  Project detail (dynamic)
  │     ├── /[locale]/faq      FAQ section
  │     └── /[locale]/contact  Contact / Anschreiben
  │
  ├── /admin/*                 Admin panel (middleware-protected)
  │     ├── /admin             Dashboard — project list
  │     ├── /admin/login       Login form (no locale prefix)
  │     └── /admin/projects/[slug]/edit  Edit project JSON
  │
  └── /api/*                   Route Handlers (Edge/Node)
        ├── /api/github/[repo]  GitHub API proxy
        ├── /api/status         Server cluster uptime/latency
        └── /api/pdf/cv         PDF generation endpoint

      middleware.ts  (runs before every request)
        ├── i18n: detect locale → redirect /path → /[locale]/path
        └── admin auth: check cookie → guard /admin/* (except /admin/login)
```

---

## Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| `middleware.ts` | Locale detection + redirect; admin session guard | Next.js routing, cookies |
| `app/[locale]/layout.tsx` | Locale provider, global nav, footer | `next-intl` provider, all public pages |
| `app/[locale]/*` pages | Public-facing UI (RSC default) | Data layer (lib/data), API routes |
| `app/admin/layout.tsx` | Admin shell (no locale) | Session cookie, admin components |
| `app/admin/*` pages | CRUD for project JSON | Server Actions → lib/projects-store |
| `app/api/github/[repo]/route.ts` | Proxy GitHub REST API, cache response | GitHub API (external), public pages |
| `app/api/status/route.ts` | Ping own cluster endpoints, return metrics | External server cluster |
| `app/api/pdf/cv/route.ts` | Generate CV PDF (Puppeteer or @react-pdf/renderer) | lib/data, returns `application/pdf` |
| `lib/data.ts` | Read-only access to JSON files (server-only) | JSON files in `data/` |
| `lib/projects-store.ts` | Read + write project JSON (admin only) | `data/projects.json` |
| `lib/auth.ts` | Validate admin credentials from .env | Server-only, used in middleware + Server Actions |
| `components/ui/*` | Reusable, headless UI (buttons, cards, tags) | Parent page/section components |
| `components/sections/*` | Full page sections (Hero, Story, Projects, FAQ) | `'use client'` where Framer Motion is used |
| `components/admin/*` | Admin-specific forms, project editor | Server Actions |
| `i18n/` | Translation files (de.json, en.json), routing config | `next-intl`, layout providers |

---

## Project Structure

```
bitmarck/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx              # Locale provider, nav, footer
│   │   ├── page.tsx                # Hero + dashboard (RSC)
│   │   ├── story/
│   │   │   └── page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx            # Project listing (RSC, reads JSON)
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # Dynamic project detail
│   │   ├── faq/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   ├── admin/
│   │   ├── layout.tsx              # Admin shell (no locale)
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── projects/
│   │       ├── page.tsx            # List + manage projects
│   │       └── [slug]/
│   │           └── edit/
│   │               └── page.tsx
│   └── api/
│       ├── github/
│       │   └── [repo]/
│       │       └── route.ts        # GET: proxy GitHub REST API
│       ├── status/
│       │   └── route.ts            # GET: ping cluster, return JSON metrics
│       └── pdf/
│           └── cv/
│               └── route.ts        # GET: return PDF binary
│
├── components/
│   ├── ui/                         # Pure UI: Button, Card, Tag, Badge
│   ├── sections/                   # Page sections (Hero, Story, ProjectCard…)
│   │   └── *.tsx                   # Each section has 'use client' if animated
│   ├── admin/                      # AdminForm, ProjectEditor
│   └── layout/                     # Navbar, Footer, LocaleSwitcher
│
├── lib/
│   ├── data.ts                     # server-only: read JSON, typed helpers
│   ├── projects-store.ts           # server-only: read + write projects.json
│   ├── auth.ts                     # server-only: compare .env credentials
│   ├── github.ts                   # fetch + cache GitHub API responses
│   └── pdf.ts                      # PDF generation helpers
│
├── data/
│   └── projects.json               # Source of truth for all project data
│
├── i18n/
│   ├── routing.ts                  # locales: ['de', 'en'], defaultLocale: 'de'
│   ├── request.ts                  # next-intl server-side locale resolution
│   └── messages/
│       ├── de.json
│       └── en.json
│
├── middleware.ts                   # i18n redirect + admin auth guard
├── next.config.ts
└── tailwind.config.ts
```

---

## Architectural Patterns

### Pattern 1: i18n with next-intl + [locale] segment

**What:** All public routes live under `app/[locale]/`. Middleware detects locale (cookie → Accept-Language → default `de`) and redirects bare paths. next-intl provides `useTranslations()` (client) and `getTranslations()` (server) hooks.

**Why:** next-intl is the dominant approach in 2026, supports React Server Components natively, ~2KB bundle, full TypeScript safety. Built-in middleware integration avoids custom locale detection logic.

**Boundary:** Admin routes (`/admin/*`) are intentionally excluded from locale prefixing — they are internal tooling and do not need translation.

```typescript
// middleware.ts (simplified)
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const i18nMiddleware = createMiddleware(routing)

export function middleware(request: NextRequest) {
  // 1. Guard /admin/* (except /admin/login)
  if (request.nextUrl.pathname.startsWith('/admin') &&
      !request.nextUrl.pathname.startsWith('/admin/login')) {
    const session = request.cookies.get('admin_session')
    if (!session?.value || !verifySession(session.value)) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }
  // 2. Run i18n middleware for everything else
  return i18nMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}
```

### Pattern 2: Admin Auth via .env Credentials + Signed Cookie

**What:** No external auth library. Single admin user. Login POST Server Action compares `ADMIN_USER` / `ADMIN_PASS_HASH` from `.env`. On success, sets an `HttpOnly` signed cookie (`admin_session`). Middleware verifies this cookie for all `/admin/*` routes.

**Security note:** After CVE-2025-29927 (middleware bypass via `x-middleware-subrequest` header), always patch to Next.js 15.2.3+ or 14.2.25+. Additionally verify auth inside Server Actions that mutate data (defense in depth — do not rely on middleware alone).

```typescript
// lib/auth.ts  (server-only)
import 'server-only'
import { SignJWT, jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.SESSION_SECRET)

export async function createSession(): Promise<string> {
  return new SignJWT({ admin: true })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('8h')
    .sign(secret)
}

export async function verifySession(token: string): Promise<boolean> {
  try { await jwtVerify(token, secret); return true }
  catch { return false }
}
```

### Pattern 3: JSON File Data Layer (server-only)

**What:** `data/projects.json` is the single source of truth. Reading happens in RSC pages via `lib/data.ts` (import is `server-only`). Writing happens only through `lib/projects-store.ts` inside admin Server Actions — never from client components.

**Caching:** Next.js caches `fs.readFile` results. After admin writes, call `revalidatePath('/[locale]/projects')` to bust the cache. Use `unstable_cache` wrapper for expensive reads.

```typescript
// lib/data.ts
import 'server-only'
import { readFile } from 'fs/promises'
import path from 'path'

export async function getProjects(): Promise<Project[]> {
  const raw = await readFile(path.join(process.cwd(), 'data/projects.json'), 'utf-8')
  return JSON.parse(raw)
}
```

### Pattern 4: Server Components First, Client Components at Leaves

**What:** All page-level components are RSC by default (no `'use client'`). Data fetching, JSON reads, and auth checks happen at the RSC level. Only leaf components that need interactivity or animations get `'use client'`.

**Framer Motion implication:** Section components like `<HeroSection>`, `<StorySection>`, `<ProjectCard>` need `'use client'` because Framer Motion uses browser APIs. Pass pre-fetched data as props from the RSC page into these client components.

```
app/[locale]/page.tsx          ← RSC: fetches data, reads JSON
  └── <HeroSection data={...}>  ← 'use client': Framer Motion animations
  └── <StatsBar data={...}>     ← 'use client': counter animations
```

### Pattern 5: Framer Motion Scroll Animation Pattern

**What:** Use `motion.div` with `whileInView` + `viewport={{ once: true }}` for entrance animations. For scroll-driven parallax use `useScroll` + `useTransform`. Avoid `AnimatePresence` for page transitions in App Router (known incompatibility — fragile workaround exists but unreliable).

**Package note:** `framer-motion` was renamed to `motion` in late 2024. Use `import { motion } from 'motion/react'` for new code.

```typescript
// components/sections/StorySection.tsx
'use client'
import { motion } from 'motion/react'

export function StoryCard({ item }: { item: CareerItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* content */}
    </motion.div>
  )
}
```

### Pattern 6: GitHub API Proxy Route

**What:** `/api/github/[repo]` is a Route Handler that fetches repo metadata from GitHub REST API using a server-side token, caches the response for 1 hour, and returns a sanitized subset to the client. This hides the GitHub token from browser requests.

```typescript
// app/api/github/[repo]/route.ts
export const revalidate = 3600 // cache 1h

export async function GET(
  _req: Request,
  { params }: { params: { repo: string } }
) {
  const data = await fetch(`https://api.github.com/repos/tobiasludwig/${params.repo}`, {
    headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` },
    next: { revalidate: 3600 }
  })
  const json = await data.json()
  return Response.json({ stars: json.stargazers_count, language: json.language, ... })
}
```

### Pattern 7: PDF Generation via Route Handler

**What:** `/api/pdf/cv` returns `application/pdf`. For self-hosted Docker deployment, Puppeteer (headless Chrome) is the recommended approach — it renders the CV page via SSR and captures it as PDF. `@react-pdf/renderer` is an alternative (no Chrome dependency, but cannot use Tailwind CSS directly).

**Recommendation for self-hosted Docker:** Use Puppeteer. Docker image includes `chromium-browser`. Avoid `@sparticuz/chromium-min` (designed for serverless — not needed here).

```typescript
// app/api/pdf/cv/route.ts
import puppeteer from 'puppeteer'

export async function GET() {
  const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium-browser', args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.goto(`${process.env.NEXT_PUBLIC_BASE_URL}/cv-print`, { waitUntil: 'networkidle0' })
  const pdf = await page.pdf({ format: 'A4', printBackground: true })
  await browser.close()
  return new Response(pdf, { headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': 'attachment; filename="CV_Tobias_Ludwig.pdf"' } })
}
```

---

## Data Flow

```
User requests /projects
       │
       ▼
middleware.ts
  ├── no locale? → redirect /de/projects
  └── locale ok? → continue
       │
       ▼
app/[locale]/projects/page.tsx   (RSC — runs on server)
  ├── getProjects() from lib/data.ts
  │     └── readFile('data/projects.json')
  └── getTranslations('projects') from next-intl
       │
       ▼
<ProjectsPageClient data={projects} t={translations}>   ('use client')
  └── <ProjectCard>  ← motion.div with whileInView


Admin updates a project:
       │
User submits form in /admin/projects/[slug]/edit
       ▼
Server Action: updateProject(formData)
  ├── verifySession(cookie)   ← auth check (NOT just middleware)
  ├── lib/projects-store.ts → writeFile('data/projects.json')
  ├── revalidatePath('/de/projects')
  └── revalidatePath('/en/projects')
       │
       ▼
Next.js purges cached pages → next visitor sees fresh data


GitHub API data flow:
       │
<ProjectCard> component fetches /api/github/[repo]   (client fetch or RSC fetch)
       ▼
/api/github/[repo]/route.ts
  ├── checks Next.js fetch cache (1h TTL)
  └── on miss: GitHub REST API (server-side, token hidden)
       │
       ▼
Returns sanitized JSON to client
```

---

## Build Order (Phase Dependencies)

The following dependency order drives phase sequencing:

```
1. Foundation
   ├── next.config, tailwind, TypeScript setup
   ├── i18n routing (middleware + next-intl) — everything public depends on this
   └── data/projects.json schema + lib/data.ts

2. Public Page Shell
   ├── app/[locale]/layout.tsx (nav, footer, locale switcher)
   └── Static page routes (hero, story, faq, contact)
       └── Depends on: i18n (step 1)

3. Framer Motion Animations
   ├── 'use client' section components with scroll animations
   └── Depends on: public page shell (step 2)

4. Dynamic Data Pages
   ├── /projects listing + /projects/[slug] detail
   └── Depends on: data layer (step 1), page shell (step 2)

5. API Routes
   ├── /api/github/[repo]  — proxy
   ├── /api/status         — cluster metrics
   └── Depends on: nothing (standalone), but public pages consume them

6. Admin Panel
   ├── auth.ts + middleware admin guard
   ├── /admin/login page
   ├── /admin CRUD for projects.json
   └── Depends on: data layer (step 1), Server Actions pattern

7. PDF Generation
   ├── /cv-print hidden route (print-optimized layout)
   ├── /api/pdf/cv route handler (Puppeteer)
   └── Depends on: public design being finalized (step 3)

8. Docker / Deployment
   ├── Dockerfile (Node + Chromium for PDF)
   └── Depends on: everything above
```

**Critical dependency:** i18n routing must be fully established before any other public route is built. Retrofitting locale prefixes into an existing routing structure is painful and error-prone.

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Reading JSON in Client Components
**What:** `fetch('/api/data')` or `import data from '../../data/projects.json'` inside a `'use client'` component.
**Why bad:** Exposes file paths, bypasses caching, increases client bundle.
**Instead:** Always read JSON in RSC pages via `lib/data.ts`, pass as props to client components.

### Anti-Pattern 2: Middleware-Only Auth for Admin Mutations
**What:** Trusting middleware alone to protect Server Actions / Route Handlers that write data.
**Why bad:** CVE-2025-29927 demonstrated middleware can be bypassed. Server Actions run independently.
**Instead:** Check `verifySession(cookie)` at the top of every Server Action that mutates data.

### Anti-Pattern 3: AnimatePresence for Page Transitions
**What:** Wrapping page layouts in `<AnimatePresence>` expecting smooth page transitions.
**Why bad:** App Router's rendering model conflicts with AnimatePresence. Known open issue in Next.js repo, fragile workarounds only.
**Instead:** Use `whileInView` entrance animations per section. No cross-page transitions — accept this constraint.

### Anti-Pattern 4: Locale Prefix on Admin Routes
**What:** Placing admin under `app/[locale]/admin/`.
**Why bad:** Admin is internal tooling — locale handling adds complexity with zero benefit.
**Instead:** `app/admin/` at root level, excluded from i18n middleware matcher.

### Anti-Pattern 5: Running Puppeteer on Vercel / Serverless
**What:** Using standard `puppeteer` package in API routes deployed to Vercel.
**Why bad:** Binary too large for serverless bundle limits.
**Instead:** Not applicable here (self-hosted Docker) — use standard `puppeteer` with system Chromium.

---

## Scalability Notes

This is a single-purpose application website, not a multi-tenant SaaS. Scalability concerns are minimal. The relevant constraint is **build-time vs runtime caching**:

| Data Type | Strategy | Cache TTL |
|-----------|----------|-----------|
| Project JSON | `readFile` + `revalidatePath` on write | Purged on admin save |
| GitHub API | `fetch` with `next: { revalidate: 3600 }` | 1 hour |
| Server status | `fetch` with `next: { revalidate: 60 }` | 1 minute |
| PDF generation | On-demand, no cache (generated fresh) | None |
| Translations | Bundled at build time via next-intl | Build-time |

---

## Sources

- Next.js App Router docs (i18n, middleware, route handlers): https://nextjs.org/docs/app
- next-intl App Router guide: https://next-intl.dev/docs/getting-started/app-router
- CVE-2025-29927 middleware auth bypass: https://projectdiscovery.io/blog/nextjs-middleware-authorization-bypass
- Framer Motion (motion) scroll patterns: https://motion.dev
- PDF generation with Puppeteer in Next.js 15: https://blog.devgenius.io/pdf-generation-in-next-js-15-with-puppeteer-3023df1ead95
- Next.js file system routing best practices 2025: https://medium.com/better-dev-nextjs-react/inside-the-app-router-best-practices-for-next-js-file-and-directory-structure-2025-edition-ed6bc14a8da3
