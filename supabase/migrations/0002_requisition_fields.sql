-- Migration: ปรับ leads table ให้ตรงกับแบบฟอร์มขอข้อเสนอกองทุนสำรองเลี้ยงชีพ
-- ใช้เฉพาะกรณีที่เคยรัน schema.sql เวอร์ชันเดิมไปแล้ว
-- (ถ้าเป็นฐานข้อมูลใหม่ ให้รัน schema.sql อย่างเดียวพอ)

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS proposal_language        TEXT NOT NULL DEFAULT 'th',
  ADD COLUMN IF NOT EXISTS company_name             TEXT,
  ADD COLUMN IF NOT EXISTS contact_person           TEXT,
  ADD COLUMN IF NOT EXISTS position                 TEXT,
  ADD COLUMN IF NOT EXISTS company_address          TEXT,
  ADD COLUMN IF NOT EXISTS business_type            TEXT,
  ADD COLUMN IF NOT EXISTS total_basic_salary       NUMERIC(14,2),
  ADD COLUMN IF NOT EXISTS has_existing_pvd         BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS pvd_data_as_of           DATE,
  ADD COLUMN IF NOT EXISTS pvd_fund_size            NUMERIC(16,2),
  ADD COLUMN IF NOT EXISTS pvd_monthly_contribution NUMERIC(14,2),
  ADD COLUMN IF NOT EXISTS pvd_members_count        INTEGER,
  ADD COLUMN IF NOT EXISTS pvd_current_manager      TEXT,
  ADD COLUMN IF NOT EXISTS pvd_investment_policy    TEXT,
  ADD COLUMN IF NOT EXISTS pvd_management_fee       NUMERIC(6,3),
  ADD COLUMN IF NOT EXISTS pvd_ytd_yield            NUMERIC(6,3),
  ADD COLUMN IF NOT EXISTS has_group_insurance      BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS group_insurance_company  TEXT;

-- ย้ายข้อมูลเดิม: name -> contact_person, company -> company_name
UPDATE leads SET contact_person = COALESCE(contact_person, name) WHERE contact_person IS NULL;
UPDATE leads SET company_name   = COALESCE(company_name, company, '-') WHERE company_name IS NULL;

-- employees_count เดิมเป็น TEXT (เช่น "30–49 คน") -> แปลงเป็นตัวเลข
ALTER TABLE leads
  ALTER COLUMN employees_count TYPE INTEGER
  USING NULLIF(regexp_replace(employees_count::text, '[^0-9]', '', 'g'), '')::INTEGER;

ALTER TABLE leads
  ALTER COLUMN company_name   SET NOT NULL,
  ALTER COLUMN contact_person SET NOT NULL,
  ALTER COLUMN email          SET NOT NULL;

ALTER TABLE leads DROP COLUMN IF EXISTS name;
ALTER TABLE leads DROP COLUMN IF EXISTS company;

ALTER TABLE leads
  ADD CONSTRAINT leads_proposal_language_check
  CHECK (proposal_language IN ('th', 'en'));
