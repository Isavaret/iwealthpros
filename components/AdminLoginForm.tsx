"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import { Loader2 } from "lucide-react";
import { signInWithEmail } from "@/app/admin/login/actions";
import { authClient } from "@/lib/auth/client";

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-[#0A192C] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#CBAE6B] transition";

/** lucide-react 1.x ไม่มีไอคอนแบรนด์ — วาดโลโก้ Google เอง */
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3c-1.08.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.95H1.28v3.1A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.29 14.29A7.2 7.2 0 0 1 4.91 12c0-.8.14-1.57.38-2.29v-3.1H1.28A12 12 0 0 0 0 12c0 1.94.46 3.77 1.28 5.39l4.01-3.1z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.28 6.61l4.01 3.1C6.23 6.88 8.88 4.77 12 4.77z"
      />
    </svg>
  );
}

/** แปลง error code ที่ Neon Auth (Better Auth) ส่งกลับมาเป็นข้อความภาษาไทย */
function oauthErrorMessage(code: string): string {
  switch (code) {
    case "signup_disabled":
      return "ไม่พบบัญชีผู้ดูแลที่ใช้อีเมล Google นี้";
    case "account_not_linked":
      return "เชื่อมบัญชี Google กับผู้ใช้เดิมไม่ได้ เพราะ Google ไม่ยืนยันอีเมลนี้";
    case "access_denied":
      return "ยกเลิกการเข้าสู่ระบบด้วย Google";
    default:
      return "เข้าสู่ระบบด้วย Google ไม่สำเร็จ กรุณาลองใหม่";
  }
}

export default function AdminLoginForm({
  denied,
  oauthError,
}: {
  denied?: boolean;
  oauthError?: string;
}) {
  const [state, formAction, isPending] = useActionState(signInWithEmail, null);
  const [googlePending, setGooglePending] = useState(false);
  const [googleError, setGoogleError] = useState<string | null>(
    oauthError ? oauthErrorMessage(oauthError) : null
  );

  // บัญชี Google ที่อีเมลตรงกับผู้ใช้เดิม จะถูกผูกเข้ากับผู้ใช้คนนั้นโดยอัตโนมัติ
  // (Google ยืนยันอีเมลให้แล้ว) — สิทธิ์เข้า /admin ยังเช็กกับ ADMIN_EMAILS เหมือนเดิม
  async function signInWithGoogle() {
    setGoogleError(null);
    setGooglePending(true);
    const origin = window.location.origin;
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: `${origin}/admin`,
      errorCallbackURL: `${origin}/admin/login`,
    });
    if (error) {
      setGooglePending(false);
      setGoogleError(oauthErrorMessage(error.code ?? ""));
    }
  }

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
          <button
            type="button"
            onClick={signInWithGoogle}
            disabled={googlePending || isPending}
            className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#0A192C] transition hover:bg-white/90 disabled:opacity-60"
          >
            {googlePending ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <GoogleIcon />
            )}
            เข้าสู่ระบบด้วย Google
          </button>
          {googleError && (
            <p className="mt-3 text-red-400 text-sm">{googleError}</p>
          )}
          <div className="my-6 flex items-center gap-3 text-xs text-white/40">
            <span className="h-px flex-1 bg-white/10" />
            หรือใช้อีเมลและรหัสผ่าน
            <span className="h-px flex-1 bg-white/10" />
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-white/60 text-sm mb-1.5">อีเมล</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={inputClass}
                placeholder="you@example.com"
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
