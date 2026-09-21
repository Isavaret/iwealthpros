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
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <p className="font-sans text-base font-bold whitespace-nowrap text-[#CBAE6B] sm:text-xl">
            I Wealth Pros{" "}
            <span className="ml-1 text-sm font-normal text-white/40">Admin</span>
          </p>
          <div className="flex min-w-0 items-center gap-2 sm:gap-4">
            <span className="hidden truncate text-sm text-white/50 sm:block">
              {session.user.email}
            </span>
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
