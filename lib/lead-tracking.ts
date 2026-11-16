import { sendGTMEvent } from "@next/third-parties/google";

export type LeadType = "provident_fund" | "retirement_workshop";

/** แปลงเบอร์โทรไทยเป็นรูปแบบ E.164 (+66…) ตามที่ Enhanced Conversions ต้องการ */
export function toE164(phone: string): string | undefined {
  const trimmed = phone.trim();
  const digits = trimmed.replace(/\D/g, "");
  if (!digits) return undefined;
  if (trimmed.startsWith("+")) return `+${digits}`;
  if (digits.startsWith("66")) return `+${digits}`;
  if (digits.startsWith("0")) return `+66${digits.slice(1)}`;
  return `+66${digits}`;
}

/**
 * แจ้ง GTM ว่ามี lead ใหม่ หลังบันทึกสำเร็จแล้วเท่านั้น
 *
 * - `lead_type` ใช้แยก conversion ใน Google Ads (PVD / Workshop) และส่งเป็น parameter ให้ GA4
 * - `user_data` ป้อน Enhanced Conversions ของ Google Ads ผ่านตัวแปร User-Provided Data ใน GTM
 *   Google tag จะ hash (SHA-256) ก่อนส่ง และส่งเฉพาะเมื่อผู้ใช้ยินยอม ad_user_data แล้ว
 *   ถ้าเปลี่ยนข้อมูลที่ส่งตรงนี้ ต้องแก้หน้า /privacy ให้ตรงกันด้วย
 */
export function trackLead(
  leadType: LeadType,
  contact: { email: string; phone: string }
) {
  sendGTMEvent({
    event: "generate_lead",
    lead_type: leadType,
    user_data: {
      email: contact.email.trim().toLowerCase(),
      phone_number: toE164(contact.phone),
    },
  });
}
