# I Wealth Pros

เว็บไซต์การตลาดของ **I Wealth Pros** — ที่ปรึกษาการเงินและการลงทุน ผู้เชี่ยวชาญกองทุนสำรองเลี้ยงชีพ (PVD)
มีหน้า Landing page สำหรับขาย, บทความให้ความรู้ และฟอร์มขอข้อเสนอกองทุนพร้อมหลังบ้านสำหรับดู leads

## Stack

Next.js 16 (App Router) · Tailwind CSS v4 · Neon (Postgres + Neon Auth) · Resend · Vercel

## เริ่มต้นใช้งาน

```bash
npm install
cp .env.local.example .env.local   # แล้วเติมค่าให้ครบ
npm run dev                        # http://localhost:3000
```

### Environment variables

| ตัวแปร | ใช้ทำอะไร | หาได้จาก |
|---|---|---|
| `DATABASE_URL` | เชื่อมต่อ Neon Postgres (ใช้ connection string แบบ pooled) | Neon Console → Project → Connect |
| `NEON_AUTH_BASE_URL` | Neon Auth endpoint สำหรับหน้า `/admin` | Neon Console → Branch → Auth → Configuration |
| `NEON_AUTH_COOKIE_SECRET` | เข้ารหัส session cookie (≥32 ตัวอักษร) | สร้างเอง: `openssl rand -base64 32` |
| `RESEND_API_KEY` | ส่งอีเมลแจ้งเตือน lead ใหม่ | resend.com/api-keys |
| `ADMIN_EMAILS` | อีเมลที่เข้าหน้า `/admin` ได้ (คั่นด้วย comma) | กำหนดเอง |
| `ADMIN_EMAIL` | ปลายทางอีเมลแจ้งเตือน lead ใหม่ | — |
| `NEXT_PUBLIC_APP_URL` | ใช้ทำ absolute URL ตอน redirect | — |

### ตั้งค่าฐานข้อมูล

รัน `db/schema.sql` ใน SQL Editor ของ Neon เพื่อสร้างตาราง `leads` จากนั้นเปิด Auth ที่ Neon Console (Project → Branch → Auth → Enable Auth)

สร้างบัญชีแอดมิน:

```bash
node --env-file=.env.local scripts/create-admin.mjs
```

อีเมลที่สร้างต้องอยู่ใน `ADMIN_EMAILS` ด้วย ไม่งั้นล็อกอินได้แต่เข้าหน้า `/admin` ไม่ได้ (Neon Auth เปิดให้สมัครเองได้ จึงต้องมี allowlist กันคนนอก)

## โครงสร้าง

```
app/
  page.tsx              หน้า landing (ประกอบจาก components/)
  articles/             หน้ารวมบทความ + บทความรายชิ้น (SSG)
  admin/                ตาราง leads + หน้า login
  api/leads/            รับข้อมูลฟอร์ม → Neon → อีเมลแจ้งเตือน (+ PATCH [id] อัปเดตสถานะ)
  api/auth/[...path]/   Neon Auth handler (login / logout / session)
components/             section components ของหน้า landing + ฟอร์ม + ตาราง admin
lib/                    articles content, email template, Neon db + auth clients + allowlist
db/                     schema.sql
scripts/create-admin.mjs  สร้างบัญชีแอดมินใน Neon Auth
proxy.ts                ป้องกันเส้นทาง /admin (Next.js 16 middleware)
```

## Scripts

```bash
npm run dev     # dev server
npm run build   # production build
npm run lint    # ESLint
```
