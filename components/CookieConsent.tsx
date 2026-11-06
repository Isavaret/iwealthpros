"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Cookie } from "lucide-react";
import {
  CONSENT_KEY,
  OPEN_CONSENT_EVENT,
  consentState,
  type ConsentChoice,
} from "@/lib/consent";

// window.dataLayer ประกาศไว้แล้วใน @next/third-parties
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const CHANGE_EVENT = "iwp:cookie-consent-changed";

function readChoice(): ConsentChoice | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    // บล็อก storage (เช่น private mode บางเบราว์เซอร์) — ถือว่ายังไม่ได้เลือก
    return null;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** gtag ต้องส่ง arguments object เข้า dataLayer — ส่งเป็น array ธรรมดา GTM จะไม่รู้จักคำสั่ง consent */
function gtag(...args: unknown[]) {
  if (window.gtag) return window.gtag(...args);
  window.dataLayer ??= [];
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

function saveChoice(choice: ConsentChoice) {
  try {
    localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // บันทึกไม่ได้ก็ยังใช้ค่าที่เลือกในหน้านี้ได้ — รอบหน้าจะถามใหม่
  }
  gtag("consent", "update", consentState(choice));
  // ให้ GTM ใช้เป็น trigger ได้ เช่น ยิง page view ตามหลังเมื่อเพิ่งกดยอมรับ
  (window.dataLayer ??= []).push({ event: "consent_update", consent: choice });
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export default function CookieConsent() {
  // ฝั่ง server ไม่รู้ว่าเคยเลือกไว้หรือยัง — ตอบ "granted" เพื่อไม่ render แบนเนอร์จน client อ่านค่าจริง
  const choice = useSyncExternalStore(subscribe, readChoice, () => "granted" as const);
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(OPEN_CONSENT_EVENT, open);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open);
  }, []);

  if (choice !== null && !reopened) return null;

  const choose = (c: ConsentChoice) => {
    saveChoice(c);
    setReopened(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-5"
    >
      <div className="mx-auto max-w-4xl rounded-2xl border border-[#CBAE6B]/30 bg-[#0A192C]/95 p-5 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
          <div className="flex gap-4">
            <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#CBAE6B]/15 sm:flex">
              <Cookie size={22} className="text-[#CBAE6B]" />
            </div>
            <div>
              <p id="cookie-consent-title" className="mb-1 font-bold text-white">
                เว็บไซต์นี้ใช้คุกกี้
              </p>
              <p id="cookie-consent-desc" className="text-sm leading-relaxed text-white/65">
                เราใช้คุกกี้ที่จำเป็นต่อการทำงานของเว็บไซต์ และขอความยินยอมใช้คุกกี้เพื่อวิเคราะห์การใช้งาน
                และวัดผลโฆษณา (Google Analytics / Google Ads) เปลี่ยนการตั้งค่าได้ทุกเมื่อที่
                “ตั้งค่าคุกกี้” ท้ายเว็บไซต์
                {choice && (
                  <span className="mt-1 block text-white/45">
                    ตอนนี้คุณเลือก: {choice === "granted" ? "ยอมรับทั้งหมด" : "ใช้เฉพาะที่จำเป็น"}
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* ปุ่มสองปุ่มขนาดเท่ากัน — ปฏิเสธต้องทำได้ง่ายเท่ากับยอมรับ */}
          <div className="grid shrink-0 grid-cols-2 gap-3 md:w-80">
            <button
              type="button"
              onClick={() => choose("denied")}
              className="btn btn-ghost-light !px-4 text-sm"
            >
              ใช้เฉพาะที่จำเป็น
            </button>
            <button
              type="button"
              onClick={() => choose("granted")}
              className="btn btn-gold !px-4 text-sm"
            >
              ยอมรับทั้งหมด
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
