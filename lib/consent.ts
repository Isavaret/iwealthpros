/**
 * ความยินยอมคุกกี้ (PDPA) ผ่าน Google Consent Mode v2
 *
 * ค่าเริ่มต้นคือ "ปฏิเสธ" คุกกี้วัดผลและโฆษณาทั้งหมด จนกว่าผู้เข้าชมจะกดยอมรับในแบนเนอร์
 * tag ใน GTM ที่ตั้ง consent check ไว้จะรอจนได้รับความยินยอมเอง
 */

export type ConsentChoice = "granted" | "denied";

/** เปลี่ยนเลขเวอร์ชันเมื่อเปลี่ยนวัตถุประสงค์การใช้คุกกี้ — ทุกคนจะถูกถามใหม่ */
export const CONSENT_KEY = "iwp-cookie-consent-v1";

/** อีเวนต์บน window สำหรับเปิดแบนเนอร์อีกครั้งจากลิงก์ "ตั้งค่าคุกกี้" */
export const OPEN_CONSENT_EVENT = "iwp:open-cookie-settings";

/** ประเภทคุกกี้ที่ต้องขอความยินยอม — ส่วนที่จำเป็นต่อการทำงานของเว็บเปิดไว้เสมอ */
const OPTIONAL_STORAGE = [
  "ad_storage",
  "ad_user_data",
  "ad_personalization",
  "analytics_storage",
] as const;

export const consentState = (choice: ConsentChoice) =>
  Object.fromEntries(OPTIONAL_STORAGE.map((key) => [key, choice]));

/**
 * รันก่อน GTM โหลด (beforeInteractive ใน root layout)
 * ตั้งค่า default = denied แล้วอัปเดตทันทีถ้าเคยกดยอมรับไว้ จะได้ไม่ต้องรอ React
 */
export const consentDefaultScript = `
window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };
window.gtag('consent', 'default', ${JSON.stringify({
  ...consentState("denied"),
  functionality_storage: "granted",
  security_storage: "granted",
  wait_for_update: 500,
})});
try {
  if (localStorage.getItem(${JSON.stringify(CONSENT_KEY)}) === 'granted') {
    window.gtag('consent', 'update', ${JSON.stringify(consentState("granted"))});
  }
} catch (e) {}
`;
