import { sql } from "@/lib/db";
import type { Lead } from "@/types/lead";

/** คอลัมน์ DATE/TIMESTAMPTZ กลับมาจาก driver เป็น Date object ไม่ใช่ string */
type LeadRow = Omit<Lead, "pvd_data_as_of" | "created_at"> & {
  pvd_data_as_of: string | Date | null;
  created_at: string | Date;
};

/** YYYY-MM-DD ตามวันที่ท้องถิ่น — ใช้ toISOString ไม่ได้เพราะ timezone จะเลื่อนวันถอยหลัง */
function toDateString(value: string | Date): string {
  if (typeof value === "string") return value.slice(0, 10);
  const y = value.getFullYear();
  const m = String(value.getMonth() + 1).padStart(2, "0");
  const d = String(value.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** แปลงค่าที่ไม่ใช่ string ให้ตรงกับ types/lead.ts ก่อนส่งออกจาก server */
function normalizeLead(row: LeadRow): Lead {
  return {
    ...row,
    pvd_data_as_of: row.pvd_data_as_of ? toDateString(row.pvd_data_as_of) : null,
    created_at:
      typeof row.created_at === "string"
        ? row.created_at
        : row.created_at.toISOString(),
  };
}

/** ดึง leads ทั้งหมด เรียงจากใหม่ไปเก่า — ใช้ทั้งหน้า /admin และไฟล์ export */
export async function getLeads(): Promise<Lead[]> {
  const rows = (await sql`
    SELECT * FROM leads ORDER BY created_at DESC
  `) as LeadRow[];
  return rows.map(normalizeLead);
}
