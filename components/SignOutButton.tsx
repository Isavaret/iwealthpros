"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth/client";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    await authClient.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      disabled={loading}
      className="flex min-h-11 cursor-pointer items-center gap-1.5 rounded-xl px-3 text-sm whitespace-nowrap text-white/60 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50"
      aria-label="ออกจากระบบ"
    >
      <LogOut size={16} />
      <span className="hidden sm:inline">ออกจากระบบ</span>
    </button>
  );
}
