# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**I Wealth** — financial advisory & investment consulting brand website. Single-page sales site focused on Provident Fund (กองทุนสำรองเลี้ยงชีพ).

## Tech Stack

- **Next.js 15** (App Router)
- **Tailwind CSS v4**
- **shadcn/ui** for UI components
- **Supabase** — leads table + Auth (admin)
- **Resend** — email notifications for new leads
- **Vercel** — deployment target

## Brand Colors

```
Navy dark:  #0A1628
Navy:       #162040
Gold:       #C9A435
Gold light: #E2C063
```

## Commands

```bash
npm run dev       # development server
npm run build     # production build
npm run lint      # ESLint
```

## Architecture

Single landing page (`app/page.tsx`) composed of section components:
- `Navbar` → `HeroSection` → `PainPointSection` → `SolutionSection` → `LeadForm` → `CorpSolutionsSection` → `Footer`

Admin area at `/admin` — protected by Supabase Auth via middleware.

API routes:
- `POST /api/leads` — saves lead to Supabase, triggers email notification
- `POST /api/notify` — sends Resend email to admin

## Known Configuration

- The Neon MCP server is disabled (`.claude/settings.local.json`). Do not suggest Neon.
- Contact details (Line, phone, email, social links) are placeholders — owner will fill in later.
- Profile image is a placeholder — owner will provide the real image later.
