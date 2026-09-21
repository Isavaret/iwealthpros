import type { Lead, LeadStatus } from "@/types/lead";

export const statusLabels: Record<LeadStatus, string> = {
  new: "ใหม่",
  contacted: "ติดต่อแล้ว",
  converted: "ปิดการขาย",
  closed: "ปิด",
};

/**
 * ระบุ timeZone ตายตัว — ถ้าปล่อยให้ใช้โซนเวลาของเครื่อง ฝั่ง server (UTC บน Vercel)
 * กับ browser (ไทย) จะได้คนละค่า แล้ว React จะ hydration mismatch
 */
export function formatThaiDateTime(value: string): string {
  return new Date(value).toLocaleString("th-TH", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Asia/Bangkok",
  });
}

/** กันค่าที่ไม่ใช่ string (เช่น Date) ไม่ให้ถูกส่งเข้า JSX ตรง ๆ จนหน้าพังทั้งหน้า */
export function text(v: unknown): string {
  if (v === null || v === undefined) return "";
  if (v instanceof Date) return v.toLocaleDateString("th-TH");
  return typeof v === "string" ? v : String(v);
}

export function fmt(v: number | null | undefined): string {
  if (v === null || v === undefined) return "";
  return Number(v).toLocaleString("th-TH");
}

/** NUMERIC ของ Postgres กลับมาเป็น string — แปลงเป็นตัวเลขให้ Excel คำนวณต่อได้ */
function num(v: number | string | null | undefined): number | null {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export type LeadField = {
  label: string;
  /** ข้อความสำหรับหน้าจอและ CSV */
  get: (l: Lead) => string;
  /** ค่าดิบสำหรับ Excel — ถ้าไม่ระบุจะใช้ get() */
  raw?: (l: Lead) => number | null;
  /** รูปแบบตัวเลขของ Excel */
  numFmt?: string;
  /** ความกว้างคอลัมน์ใน Excel */
  width?: number;
};

/** ทุกฟิลด์ตามแบบฟอร์มขอข้อเสนอ — ใช้ร่วมกันทั้งแถวรายละเอียด, CSV และ Excel */
export const leadFields: LeadField[] = [
  { label: "ชื่อบริษัท", get: (l) => l.company_name, width: 30 },
  { label: "ชื่อผู้ติดต่อ", get: (l) => l.contact_person, width: 22 },
  { label: "ตำแหน่ง", get: (l) => l.position ?? "", width: 18 },
  { label: "เบอร์โทร", get: (l) => l.phone, width: 14 },
  { label: "อีเมล", get: (l) => l.email, width: 30 },
  { label: "ที่อยู่บริษัท", get: (l) => l.company_address ?? "", width: 40 },
  { label: "ประเภทธุรกิจ", get: (l) => l.business_type ?? "", width: 22 },
  {
    label: "จำนวนพนักงาน",
    get: (l) => fmt(l.employees_count),
    raw: (l) => num(l.employees_count),
    numFmt: "#,##0",
    width: 14,
  },
  {
    label: "เงินเดือนพื้นฐานรวม/เดือน",
    get: (l) => fmt(l.total_basic_salary),
    raw: (l) => num(l.total_basic_salary),
    numFmt: "#,##0.00",
    width: 22,
  },
  {
    label: "ภาษาข้อเสนอ",
    get: (l) => (l.proposal_language === "en" ? "English" : "ไทย"),
    width: 12,
  },
  { label: "มี PVD แล้ว", get: (l) => (l.has_existing_pvd ? "มี" : "ไม่มี"), width: 11 },
  { label: "ข้อมูล ณ วันที่", get: (l) => l.pvd_data_as_of ?? "", width: 14 },
  {
    label: "มูลค่าทรัพย์สินสุทธิ",
    get: (l) => fmt(l.pvd_fund_size),
    raw: (l) => num(l.pvd_fund_size),
    numFmt: "#,##0.00",
    width: 20,
  },
  {
    label: "เงินนำส่งต่อเดือน",
    get: (l) => fmt(l.pvd_monthly_contribution),
    raw: (l) => num(l.pvd_monthly_contribution),
    numFmt: "#,##0.00",
    width: 18,
  },
  {
    label: "จำนวนสมาชิก",
    get: (l) => fmt(l.pvd_members_count),
    raw: (l) => num(l.pvd_members_count),
    numFmt: "#,##0",
    width: 13,
  },
  { label: "บริษัทจัดการปัจจุบัน", get: (l) => l.pvd_current_manager ?? "", width: 22 },
  { label: "นโยบายการลงทุน", get: (l) => l.pvd_investment_policy ?? "", width: 26 },
  {
    label: "ค่าจัดการกองทุน (%)",
    get: (l) => fmt(l.pvd_management_fee),
    raw: (l) => num(l.pvd_management_fee),
    numFmt: "0.000",
    width: 18,
  },
  {
    label: "ผลตอบแทน YTD (%)",
    get: (l) => fmt(l.pvd_ytd_yield),
    raw: (l) => num(l.pvd_ytd_yield),
    numFmt: "0.000",
    width: 18,
  },
  { label: "ประกันกลุ่ม", get: (l) => (l.has_group_insurance ? "มี" : "ไม่มี"), width: 12 },
  { label: "ประกันกลุ่มกับ", get: (l) => l.group_insurance_company ?? "", width: 20 },
  { label: "ข้อมูลเพิ่มเติม", get: (l) => l.message ?? "", width: 40 },
];
