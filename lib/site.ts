/**
 * ข้อมูลกลางของเว็บไซต์ — ใช้ร่วมกันระหว่าง metadata, sitemap, robots และ JSON-LD
 * แก้ที่เดียวแล้วมีผลทุกที่ ไม่ต้องไล่แก้ทีละไฟล์
 */

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://iwealthpros.com"
).replace(/\/$/, "");

export const site = {
  url: siteUrl,
  name: "I Wealth Pros",
  shortName: "I Wealth Pros",
  tagline: "ที่ปรึกษาการเงินและกองทุนสำรองเลี้ยงชีพ",
  description:
    "ที่ปรึกษาด้านการเงินและการลงทุนสำหรับองค์กร ผู้เชี่ยวชาญการจัดตั้งกองทุนสำรองเลี้ยงชีพ (PVD) ประกันกลุ่ม และ Key Man Insurance รับคำปรึกษาฟรี ตอบกลับภายใน 24 ชั่วโมง",
  locale: "th_TH",
  language: "th",
  email: "Info@iwealthpros.com",
  phone: "+66989391466",
  phoneDisplay: "098-939-1466",
  areaServed: "TH",
  /**
   * ผู้ควบคุมข้อมูลส่วนบุคคลตาม PDPA (บุคคลธรรมดา) — แสดงในหน้า /privacy
   * ใส่ชื่อ-นามสกุลและที่อยู่ติดต่อตามกฎหมาย; ปล่อย null ไว้หน้าเว็บจะแสดงเฉพาะช่องทางติดต่อ
   */
  dataController: {
    name: "อิศวเรศ ตโมนุท" as string | null,
    address: null as string | null,
  },
  /** วันที่มีผลของนโยบายความเป็นส่วนตัว — แก้ทุกครั้งที่เนื้อหาในหน้า /privacy เปลี่ยน */
  privacyPolicyUpdatedAt: "2026-11-06",
  /** Google Tag Manager container — tag ทั้งหมด (GA4, Google Ads conversion ฯลฯ) ตั้งค่าใน GTM */
  gtmId: "GTM-PJ7V4VGP",
  social: [
    "https://www.facebook.com/profile.php?id=61589894085994",
    "https://www.tiktok.com/@i.wealth.pros",
    "https://lin.ee/n8DTn16",
  ],
  awards: [
    "Provident Fund Top Producer Of The Year 2025 — 1st Runner Up (AIA Annual Agency Awards)",
    "Provident Fund Top Producer Awards Of The Year 2021 (AIA Annual Agency Awards)",
  ],
} as const;

export const absoluteUrl = (path = "/") =>
  `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
