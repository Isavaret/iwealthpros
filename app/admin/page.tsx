import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";
import { isAdminEmail } from "@/lib/auth/admins";
import { getLeads } from "@/lib/leads";
import AdminLeadsTable from "@/components/AdminLeadsTable";
import SignOutButton from "@/components/SignOutButton";
import type { Lead } from "@/types/lead";

// ใช้ session + query ฐานข้อมูล จึงต้อง render แบบ dynamic
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const { data: session } = await auth.getSession();
  if (!session?.user) redirect("/admin/login");
  // มี session แต่ไม่ได้อยู่ใน allowlist = ไม่ใช่แอดมิน
  if (!isAdminEmail(session.user.email)) redirect("/admin/login?denied=1");

  let leads: Lead[] = [];
  try {
    leads = await getLeads();
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
