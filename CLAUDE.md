# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**I Wealth Pros** — financial advisory & investment consulting brand website. Sales site focused on Provident Fund (กองทุนสำรองเลี้ยงชีพ / PVD), with a lead-capture form modelled on the *Requisition for Provident Fund Proposal* paper form.

## Tech Stack

- **Next.js 16** (App Router, Turbopack) — see `AGENTS.md`: read `node_modules/next/dist/docs/` before relying on older Next.js conventions
- **Tailwind CSS v4** (theme tokens live in `app/globals.css`, no `tailwind.config`)
- **Neon** — serverless Postgres (`leads` table) via `@neondatabase/serverless`, plus Neon Auth (Managed Better Auth) for the admin login
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
- `/admin` — leads dashboard (status updates + CSV export); `/admin/login` — Neon Auth sign-in (server action in `app/admin/login/actions.ts`).

Route protection lives in **`proxy.ts`** (Next.js 16 renamed middleware to proxy) — `auth.middleware({ loginUrl: "/admin/login" })` with matcher `["/admin", "/admin/((?!login).*)"]`. The login page must stay outside the matcher or the redirect loops.

API routes:
- `POST /api/leads` — validates the payload with zod (plus a `website` honeypot field), inserts into Neon, then sends the notification email via `lib/email.ts`
- `PATCH /api/leads/[id]` — updates a lead's status; requires a session, called from `AdminLeadsTable`
- `GET|POST /api/auth/[...path]` — Neon Auth handler (`auth.handler()`), proxies every auth call

`lib/db.ts` exports `sql`, the Neon HTTP client (server only). `lib/auth/server.ts` exports `auth` (handler, middleware, `getSession`, `signIn`); `lib/auth/client.ts` exports `authClient` for client components such as `SignOutButton`.

## Database

`db/schema.sql` is the source of truth — a plain Postgres schema with no RLS, because the app connects as the database owner and the public form only ever writes through `/api/leads`. Admin users live in the `neon_auth` schema that Neon Auth manages.

## Admin access

Neon Auth allows public sign-up (`allow_sign_up: true`, plus shared Google OAuth), so **a session alone does not mean admin**. `lib/auth/admins.ts` gates `/admin` and `PATCH /api/leads/[id]` against the `ADMIN_EMAILS` allowlist; a signed-in address outside it is bounced to `/admin/login?denied=1`. Keep that check in place on any new admin surface, and add the address to `ADMIN_EMAILS` when onboarding someone.

Create an admin account with `node --env-file=.env.local scripts/create-admin.mjs` (prompts for email/password, no secrets on screen). The Neon Auth endpoints reject requests without an `Origin` header.

## Known Configuration

- Neon project: `iwealthpros` / `green-band-83884962`, branch `main` (`br-withered-heart-azb7u5r5`), region ap-southeast-1. Migrated off Supabase (`jzfegdghcdavncayeybf`) — nothing was carried over, the old `leads` table was empty.
- `@neondatabase/auth` is currently a beta release (0.5.0-beta); pin deliberately when upgrading.
- Vercel project: `iwealthpros` under team `iw-ealth-pros-projects`.
- GitHub: `Isavaret/iwealthpros` — the local machine authenticates to GitHub as `oboberon`, which does not have write access to that repo.
- `.claude/settings.local.json` disables the project-level `neon` MCP server; Neon tooling in this session comes from the separately configured Neon MCP instead.
- Contact details in `Footer.tsx` (Line, phone, email, social links) are placeholders, flagged with `placeholder: true` — owner will fill in later.
- `public/profile.png` is a placeholder image — owner will provide the real one later.
- `gh` CLI in this environment is an x86 binary and cannot run on this machine.
