# Bitmarck Bewerbungs-Website

## Project

Interactive web-based job application for the "Business Analyst IAM" position at Bitmarck. Built with Next.js 16 (App Router), Tailwind CSS v4, Framer Motion (`motion`), next-intl, and self-hosted via Docker.

## Planning

All planning artifacts live in `.planning/`:
- `PROJECT.md` — project context and requirements
- `REQUIREMENTS.md` — 22 v1 requirements with REQ-IDs
- `ROADMAP.md` — 4 phases
- `STATE.md` — current progress
- `config.json` — workflow config
- `research/` — domain research

## GSD Workflow

This project uses the GSD (Get Shit Done) workflow. Key commands:
- `/gsd-progress` — check current state
- `/gsd-plan-phase N` — plan a phase
- `/gsd-execute-phase N` — execute a phase
- `/gsd-discuss-phase N` — discuss before planning

## Conventions

- **Language**: TypeScript, strict mode
- **Styling**: Tailwind CSS v4 (CSS-based config)
- **Animations**: `motion` package (import from `motion/react`), `"use client"` required
- **i18n**: next-intl v4, `app/[locale]/` route structure, URL-based `/de` `/en`
- **PDF**: `@react-pdf/renderer` (no Puppeteer)
- **Admin Auth**: `iron-session` with `.env` credentials
- **Data**: JSON files in `data/`, read via `lib/data.ts` (server-only)
- **Docker**: `output: "standalone"` in next.config.ts
