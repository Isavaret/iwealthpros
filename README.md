# I Wealth Pros

เว็บไซต์การตลาดของ **I Wealth Pros** — ที่ปรึกษาการเงินและการลงทุน ผู้เชี่ยวชาญกองทุนสำรองเลี้ยงชีพ (PVD)
มีหน้า Landing page สำหรับขาย, บทความให้ความรู้ และฟอร์มขอข้อเสนอกองทุนพร้อมหลังบ้านสำหรับดู leads

## Stack

Next.js 16 (App Router) · Tailwind CSS v4 · Supabase (Postgres + Auth) · Resend · Vercel

## เริ่มต้นใช้งาน

```bash
npm install
cp .env.local.example .env.local   # แล้วเติมค่าให้ครบ
npm run dev                        # http://localhost:3000
```

### Environment variables

| ตัวแปร | ใช้ทำอะไร | หาได้จาก |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | เชื่อมต่อ Supabase | Dashboard → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | client-side auth (หน้า `/admin/login`) | ที่เดียวกัน |
| `SUPABASE_SERVICE_ROLE_KEY` | เขียน lead จาก `/api/leads` (ข้าม RLS) | ที่เดียวกัน — **ห้าม** ให้หลุดไปฝั่ง client |
| `RESEND_API_KEY` | ส่งอีเมลแจ้งเตือน lead ใหม่ | resend.com/api-keys |
| `ADMIN_EMAIL` | ปลายทางอีเมลแจ้งเตือน | — |
| `NEXT_PUBLIC_APP_URL` | ใช้ทำ absolute URL ตอน redirect | — |

### ตั้งค่าฐานข้อมูล

รัน `supabase/schema.sql` ใน SQL Editor ของ Supabase (ถ้าฐานข้อมูลเดิมสร้างจาก schema เวอร์ชันก่อน ให้รัน `supabase/migrations/0002_requisition_fields.sql` แทน) จากนั้นสร้างผู้ใช้ admin ที่ Authentication → Users เพื่อเข้าหน้า `/admin`

## โครงสร้าง

```
app/
  page.tsx              หน้า landing (ประกอบจาก components/)
  articles/             หน้ารวมบทความ + บทความรายชิ้น (SSG)
  admin/                ตาราง leads + หน้า login
  api/leads/            รับข้อมูลฟอร์ม → Supabase → อีเมลแจ้งเตือน
  api/auth/signout/     ออกจากระบบ
components/             section components ของหน้า landing + ฟอร์ม + ตาราง admin
lib/                    articles content, email template, supabase clients
supabase/               schema.sql + migrations
proxy.ts                ป้องกันเส้นทาง /admin (Next.js 16 middleware)
```

## Scripts

```bash
npm run dev     # dev server
npm run build   # production build
npm run lint    # ESLint
```
