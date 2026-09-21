import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";
import { isAdminEmail } from "@/lib/auth/admins";
import { sql } from "@/lib/db";
import AdminLeadsTable from "@/components/AdminLeadsTable";
import SignOutButton from "@/components/SignOutButton";
import type { Lead } from "@/types/lead";

// ใช้ session + query ฐานข้อมูล จึงต้อง render แบบ dynamic
export const dynamic = "force-dynamic";

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

/** แปลงค่าที่ไม่ใช่ string ให้ตรงกับ types/lead.ts ก่อนส่งเข้า client component */
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

export default async function AdminPage() {
  const { data: session } = await auth.getSession();
  if (!session?.user) redirect("/admin/login");
  // มี session แต่ไม่ได้อยู่ใน allowlist = ไม่ใช่แอดมิน
  if (!isAdminEmail(session.user.email)) redirect("/admin/login?denied=1");

  let leads: Lead[] = [];
  try {
    const rows = (await sql`
      SELECT * FROM leads ORDER BY created_at DESC
    `) as LeadRow[];
    leads = rows.map(normalizeLead);
  } catch (err) {
    console.error("Leads fetch error:", err);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-[#0A192C] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <p className="font-sans text-xl font-bold text-[#CBAE6B]">
            I Wealth Pros <span className="text-white/40 text-sm font-normal ml-1">Admin</span>
          </p>
          <div className="flex items-center gap-4">
            <span className="text-white/50 text-sm">{session.user.email}</span>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <AdminLeadsTable initialLeads={leads} />
      </main>
    </div>
  );
}
