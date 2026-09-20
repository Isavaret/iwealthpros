"use client";

import Image from "next/image";
import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { signInWithEmail } from "@/app/admin/login/actions";

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-[#0A192C] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#CBAE6B] transition";

export default function AdminLoginForm({ denied }: { denied?: boolean }) {
  const [state, formAction, isPending] = useActionState(signInWithEmail, null);

  return (
    <div className="min-h-screen bg-[#0A192C] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image
            src="/logo-iwealthpros.jpg"
            alt="โลโก้ I Wealth Pros"
            width={224}
            height={238}
            priority
            sizes="112px"
            className="logo-glow mb-5 h-28 w-28 rounded-2xl border border-[#CBAE6B]/40 object-cover"
          />
          <p className="font-sans text-2xl font-bold tracking-[0.12em] text-gold-metallic sm:text-3xl">
            I WEALTH PROS
          </p>
          <p className="mt-1 text-sm text-white/50">Admin Dashboard</p>
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
          {denied && !state?.error && (
            <p className="mt-4 text-amber-400 text-sm">
              บัญชีนี้ไม่มีสิทธิ์เข้าหน้าผู้ดูแลระบบ
            </p>
          )}
          {state?.error && (
            <p className="mt-4 text-red-400 text-sm">{state.error}</p>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="btn btn-gold mt-6 w-full !rounded-xl disabled:opacity-60"
          >
            {isPending ? <Loader2 size={18} className="animate-spin" /> : null}
            เข้าสู่ระบบ
          </button>
        </form>
      </div>
    </div>
  );
}
