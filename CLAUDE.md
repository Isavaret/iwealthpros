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

Public email/password sign-up is off (`allow_sign_up: false`) and no OAuth provider is configured, so the only way in is an account created deliberately. The allowlist still stands as the second gate: **a session alone does not mean admin**. `lib/auth/admins.ts` gates `/admin` and `PATCH /api/leads/[id]` against the `ADMIN_EMAILS` allowlist; a signed-in address outside it is bounced to `/admin/login?denied=1`. Keep that check in place on any new admin surface, and add the address to `ADMIN_EMAILS` when onboarding someone.

`scripts/create-admin.mjs` creates accounts through the sign-up endpoint, so it now needs sign-up temporarily re-enabled:

```bash
npx neon@latest neon-auth config email-password update --no-disable-sign-up \
  --project-id green-band-83884962 --branch br-withered-heart-azb7u5r5
node --env-file=.env.local scripts/create-admin.mjs        # or --email/--name + ADMIN_PASSWORD
npx neon@latest neon-auth config email-password update --disable-sign-up \
  --project-id green-band-83884962 --branch br-withered-heart-azb7u5r5
```

The Neon Auth endpoints reject requests without an `Origin` header, and the origin must be a trusted domain (`https://iwealthpros.com`, plus localhost).

## Known Configuration

- Neon project: `iwealthpros` / `green-band-83884962`, branch `main` (`br-withered-heart-azb7u5r5`), region ap-southeast-1. Migrated off Supabase (`jzfegdghcdavncayeybf`) — nothing was carried over, the old `leads` table was empty.
- `@neondatabase/auth` is currently a beta release (0.5.0-beta); pin deliberately when upgrading.
- Vercel project: `iwealthpros` under team `iw-ealth-pros-projects`, connected to the GitHub repo: pushing to `main` deploys to production on its own, so prefer pushing over running `vercel --prod` by hand. The CLI stays as a fallback and needs `vercel login` as `isavaret` — the account that owns the team.
- GitHub: `Isavaret/iwealthpros`. The local machine authenticates as `oboberon`, now a collaborator, so pushes work; the credential helper in `~/.gitconfig` points at a `gh` binary that cannot run here, so pushing needs `git -c credential.https://github.com.helper=osxkeychain push`.
- `.claude/settings.local.json` disables the project-level `neon` MCP server; Neon tooling in this session comes from the separately configured Neon MCP instead.
- `Footer.tsx` carries the real Line, phone and email contacts plus Facebook, TikTok and Line social buttons. lucide-react 1.x dropped brand icons, so those three are hand-drawn SVG components at the top of the file.
- `public/profile.png` is a placeholder image — owner will provide the real one later.
- `public/awards/` holds the award-ceremony photos (2.3 MB, 17 files) pulled from the owner's shared Drive folder and resized to a 1600px long edge. `lib/awards.ts` groups them into the two albums that `AwardBadges.tsx` opens from the Hero. The 2022 badge's photos are from the *AIA Annual Agency Awards Presentation 2020 & 2021* ceremony — the badge year is the ceremony year, the trophy reads 2021.
- `gh` CLI in this environment is an x86 binary and cannot run on this machine.
