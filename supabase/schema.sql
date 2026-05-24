-- I Wealth — Supabase Schema
-- รันใน SQL Editor ใน Supabase Dashboard

-- 1. สร้าง leads table
CREATE TABLE IF NOT EXISTS leads (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  phone           TEXT NOT NULL,
  email           TEXT,
  company         TEXT,
  employees_count TEXT,
  message         TEXT,
  interest        TEXT DEFAULT 'provident_fund',
  status          TEXT DEFAULT 'new'
                    CHECK (status IN ('new', 'contacted', 'converted', 'closed')),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- 3. Policy: อนุญาตให้ anon (public form) INSERT ได้
CREATE POLICY "anon_can_insert" ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 4. Policy: service_role อ่าน/เขียนได้ทุกอย่าง (ใช้ใน admin dashboard)
CREATE POLICY "service_role_full_access" ON leads
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 5. สร้าง admin user (ทำใน Authentication > Users ก็ได้
--    หรือรัน SQL นี้ — เปลี่ยน email/password ตามต้องการ)
-- SELECT auth.create_user('admin@iwealth.co.th', 'your-password-here');
