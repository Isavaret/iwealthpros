-- I Wealth Pros — Supabase Schema
-- รันใน SQL Editor ใน Supabase Dashboard
-- โครงสร้างตรงตามแบบฟอร์ม "รายละเอียดลูกค้าสำหรับการออกข้อเสนอกองทุนสำรองเลี้ยงชีพ"
-- (Requisition for Provident Fund Proposal)

-- 1. สร้าง leads table
CREATE TABLE IF NOT EXISTS leads (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- ภาษาของข้อเสนอ / Proposal language
  proposal_language        TEXT NOT NULL DEFAULT 'th'
                             CHECK (proposal_language IN ('th', 'en')),

  -- ข้อมูลบริษัท / Company information
  company_name             TEXT NOT NULL,   -- ชื่อบริษัท
  contact_person           TEXT NOT NULL,   -- ชื่อผู้ติดต่อ
  position                 TEXT,            -- ตำแหน่ง
  company_address          TEXT,            -- ที่อยู่บริษัท
  phone                    TEXT NOT NULL,   -- เบอร์โทร
  business_type            TEXT,            -- ประเภทธุรกิจ
  employees_count          INTEGER,         -- จำนวนพนักงาน
  total_basic_salary       NUMERIC(14,2),   -- เงินเดือนพื้นฐานรวมต่อเดือน (ไม่รวม OT/โบนัส)
  email                    TEXT NOT NULL,   -- อีเมลสำหรับส่งข้อเสนอ

  -- กรณีลูกค้ามีกองทุนสำรองเลี้ยงชีพแล้ว / With an existing provident fund
  has_existing_pvd         BOOLEAN NOT NULL DEFAULT FALSE,
  pvd_data_as_of           DATE,            -- ข้อมูล ณ วันที่
  pvd_fund_size            NUMERIC(16,2),   -- มูลค่าทรัพย์สินสุทธิ
  pvd_monthly_contribution NUMERIC(14,2),   -- เงินกองทุนนำส่งต่อเดือน
  pvd_members_count        INTEGER,         -- จำนวนสมาชิก
  pvd_current_manager      TEXT,            -- บริษัทจัดการปัจจุบัน
  pvd_investment_policy    TEXT,            -- นโยบายการลงทุนปัจจุบัน
  pvd_management_fee       NUMERIC(6,3),    -- ค่าจัดการกองทุน (%)
  pvd_ytd_yield            NUMERIC(6,3),    -- อัตราผลตอบแทน YTD (%)

  -- ประกันชีวิตกลุ่ม / Group insurance
  has_group_insurance      BOOLEAN NOT NULL DEFAULT FALSE,
  group_insurance_company  TEXT,            -- ทำอยู่กับบริษัท

  message                  TEXT,            -- ข้อมูลเพิ่มเติม
  interest                 TEXT DEFAULT 'provident_fund',
  status                   TEXT DEFAULT 'new'
                             CHECK (status IN ('new', 'contacted', 'converted', 'closed')),
  created_at               TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_status_idx ON leads (status);

-- 2. Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- 3. Policy: service_role อ่าน/เขียนได้ทุกอย่าง (ใช้ใน API route และ admin dashboard)
DROP POLICY IF EXISTS "service_role_full_access" ON leads;
CREATE POLICY "service_role_full_access" ON leads
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 4. Policy: ผู้ใช้ที่ล็อกอินแล้ว (admin) อ่านและอัปเดตสถานะ lead ได้
--    จำเป็นสำหรับปุ่มเปลี่ยนสถานะในหน้า /admin ซึ่งเรียกผ่าน browser client
DROP POLICY IF EXISTS "authenticated_can_read" ON leads;
CREATE POLICY "authenticated_can_read" ON leads
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "authenticated_can_update" ON leads;
CREATE POLICY "authenticated_can_update" ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- หมายเหตุ: ฟอร์มหน้าเว็บส่งข้อมูลผ่าน POST /api/leads ซึ่งใช้ service_role key
-- จึงไม่ต้องเปิด policy ให้ anon INSERT (ลดความเสี่ยงการยิงข้อมูลขยะเข้าตารางโดยตรง)

-- 5. สร้าง admin user ได้ที่ Authentication > Users ใน Supabase Dashboard
