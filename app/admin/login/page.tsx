"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import { Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-[#0D1E45] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="font-sans text-3xl font-bold text-[#C9A84C]">I Wealth</p>
          <p className="text-white/50 text-sm mt-1">Admin Dashboard</p>
        </div>
        <form
          onSubmit={handleLogin}
          className="bg-[#122050] rounded-2xl p-8 border border-white/10 shadow-2xl"
        >
          <h1 className="text-white font-bold text-xl mb-6">เข้าสู่ระบบ</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-white/60 text-sm mb-1.5">อีเมล</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-[#0D1E45] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#C9A84C] transition"
                placeholder="admin@iwealth.co.th"
              />
            </div>
            <div>
              <label className="block text-white/60 text-sm mb-1.5">รหัสผ่าน</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-[#0D1E45] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#C9A84C] transition"
                placeholder="••••••••"
              />
            </div>
          </div>
          {error && (
            <p className="mt-3 text-red-400 text-sm">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full py-3 rounded-xl bg-[#C9A84C] hover:bg-[#E0C070] text-[#0D1E45] font-bold transition disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : null}
            เข้าสู่ระบบ
          </button>
        </form>
      </div>
    </div>
  );
}
