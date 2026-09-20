"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { signInWithEmail } from "./actions";

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-[#0A192C] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#CBAE6B] transition";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(signInWithEmail, null);

  return (
    <div className="min-h-screen bg-[#0A192C] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="font-sans text-3xl font-bold text-gold-metallic tracking-[0.12em]">I WEALTH PROS</p>
          <p className="text-white/50 text-sm mt-1">Admin Dashboard</p>
        </div>
        <form
          action={formAction}
          className="bg-[#132845] rounded-2xl p-8 border border-white/10 shadow-2xl"
        >
          <h1 className="text-white font-bold text-xl mb-6">เข้าสู่ระบบ</h1>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-white/60 text-sm mb-1.5">อีเมล</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={inputClass}
                placeholder="admin@iwealth.co.th"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-white/60 text-sm mb-1.5">รหัสผ่าน</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={inputClass}
                placeholder="••••••••"
              />
            </div>
          </div>
          {state?.error && (
            <p className="mt-4 text-red-400 text-sm">{state.error}</p>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="mt-6 w-full py-3 rounded-xl bg-[#CBAE6B] hover:bg-[#F0DA8F] text-[#0A192C] font-bold transition disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isPending ? <Loader2 size={18} className="animate-spin" /> : null}
            เข้าสู่ระบบ
          </button>
        </form>
      </div>
    </div>
  );
}
