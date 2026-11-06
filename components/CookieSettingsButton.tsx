"use client";

import { OPEN_CONSENT_EVENT } from "@/lib/consent";

/** เปิดแบนเนอร์ความยินยอมคุกกี้อีกครั้ง — ให้ผู้เข้าชมถอนหรือเปลี่ยนความยินยอมได้ตาม PDPA */
export default function CookieSettingsButton({
  className = "inline-flex min-h-11 cursor-pointer items-center text-xs text-white/40 underline-offset-4 transition-colors hover:text-[#CBAE6B] hover:underline",
}: {
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      className={className}
    >
      ตั้งค่าคุกกี้
    </button>
  );
}
