import { redirect } from "next/navigation";
import { createClient, createServiceClient } from "@/lib/supabase-server";
import AdminLeadsTable from "@/components/AdminLeadsTable";
import type { Lead } from "@/types/lead";
import { LogOut } from "lucide-react";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const serviceClient = createServiceClient();
  const { data: leads, error } = await serviceClient
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) console.error("Leads fetch error:", error);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-[#0D1E45] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <p className="font-sans text-xl font-bold text-[#C9A84C]">
            I Wealth <span className="text-white/40 text-sm font-normal ml-1">Admin</span>
          </p>
          <div className="flex items-center gap-4">
            <span className="text-white/50 text-sm">{user.email}</span>
            <form action="/api/auth/signout" method="POST">
              <button className="flex items-center gap-1.5 text-white/50 hover:text-white text-sm transition-colors">
                <LogOut size={14} />
                ออกจากระบบ
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <AdminLeadsTable initialLeads={(leads as Lead[]) ?? []} />
      </main>
    </div>
  );
}
