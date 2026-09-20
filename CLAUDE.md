# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**I Wealth Pros** — financial advisory & investment consulting brand website. Sales site focused on Provident Fund (กองทุนสำรองเลี้ยงชีพ / PVD), with a lead-capture form modelled on the *Requisition for Provident Fund Proposal* paper form.

## Tech Stack

- **Next.js 16** (App Router, Turbopack) — see `AGENTS.md`: read `node_modules/next/dist/docs/` before relying on older Next.js conventions
- **Tailwind CSS v4** (theme tokens live in `app/globals.css`, no `tailwind.config`)
- **Supabase** — `leads` table + Auth (admin)
- **Resend** — email notifications for new leads
- **Vercel** — deployment target

## Brand Colors

Defined as Tailwind v4 theme tokens in `app/globals.css`:

```
navy-900 / navy-dark:  #0A192C   (page background, footer, admin header)
navy-800 / navy:       #132845   (cards on navy)
navy-700 / navy-light: #1B3557
gold:                  #CBAE6B   (primary accent, buttons, links)
gold-light:            #F0DA8F   (hover / highlight)
gold-deep:             #856A2E   (gold text on light backgrounds)
gold-pale:             #F7EBC6
```

Helper classes `.text-gold-metallic` / `.bg-gold-metallic` produce the brushed-gold gradient used for the wordmark and primary buttons.

## Commands

```bash
npm run dev       # development server
npm run build     # production build
npm run lint      # ESLint
```

## Architecture

Landing page (`app/page.tsx`) composed of section components:

`Navbar` → `HeroSection` → `PainPointSection` → `SolutionSection` → `LeadForm` → `CorpSolutionsSection` → `ArticlesSection` → `Footer`

Other routes:
- `/articles` — article index; `/articles/[slug]` — statically generated article pages. Content lives in `lib/articles.ts` as typed blocks (`paragraph` / `list` / `steps`), not MDX.
- `/admin` — leads dashboard (status updates + CSV export); `/admin/login` — Supabase Auth sign-in.

Route protection lives in **`proxy.ts`** (Next.js 16 renamed middleware to proxy) — matcher `/admin/:path*`, redirects anonymous users to `/admin/login` and logged-in users away from the login page.

API routes:
- `POST /api/leads` — validates the payload with zod (plus a `website` honeypot field), inserts into Supabase using the service-role key, then sends the notification email via `lib/email.ts`
- `POST /api/auth/signout` — signs out and redirects to `/admin/login`

`lib/supabase-server.ts` exports `createClient()` (cookie-based, respects RLS) and `createServiceClient()` (service-role, bypasses RLS — server only).

## Database

`supabase/schema.sql` is the source of truth; `supabase/migrations/0002_requisition_fields.sql` upgrades databases created from the older schema. RLS is on: `service_role` has full access, `authenticated` can select/update. Anonymous inserts are deliberately **not** allowed — the public form writes through `/api/leads` with the service-role key.

Both have been applied to the live project (`jzfegdghcdavncayeybf`). The `leads` table has 26 columns matching `types/lead.ts`.

## Known Configuration

- Supabase project: `jzfegdghcdavncayeybf` (region ap-south-1) — no admin user exists yet; create one under Authentication → Users before `/admin` can be used.
- Vercel project: `iwealthpros` under team `iw-ealth-pros-projects`.
- GitHub: `Isavaret/iwealthpros` — the local machine authenticates to GitHub as `oboberon`, which does not have write access to that repo.
- The Neon MCP server is disabled (`.claude/settings.local.json`). Do not suggest Neon.
- Contact details in `Footer.tsx` (Line, phone, email, social links) are placeholders, flagged with `placeholder: true` — owner will fill in later.
- `public/profile.png` is a placeholder image — owner will provide the real one later.
- `gh` CLI in this environment is an x86 binary and cannot run on this machine.
