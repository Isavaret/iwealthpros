import { Resend } from "resend";
import type { LeadInsert } from "@/types/lead";

const NAVY = "#0A192C";
const NAVY_SOFT = "#132845";
const GOLD = "#CBAE6B";
const GOLD_LIGHT = "#F0DA8F";

function esc(v: unknown): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function num(v: number | undefined | null, suffix = ""): string | null {
  if (v === undefined || v === null) return null;
  return `${v.toLocaleString("th-TH")}${suffix}`;
}

function row(label: string, value: string | null | undefined): string {
  if (!value) return "";
  return `<tr>
    <td style="padding: 7px 0; color: #6b7280; width: 190px; vertical-align: top; font-size: 13px;">${esc(
      label
    )}</td>
    <td style="padding: 7px 0; color: ${NAVY}; font-size: 14px;">${esc(value)}</td>
  </tr>`;
}

function sectionTitle(text: string): string {
  return `<tr><td colspan="2" style="padding: 18px 0 6px; border-bottom: 1px solid #e5e7eb;">
    <strong style="color: ${NAVY}; font-size: 13px; letter-spacing: .5px;">${esc(
      text
    )}</strong>
  </td></tr>`;
}

export async function sendLeadNotification(lead: LeadInsert & { id: string }) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail || !process.env.RESEND_API_KEY) return;

  const resend = new Resend(process.env.RESEND_API_KEY);
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://iwealthpros.vercel.app";

  const pvdSection = lead.has_existing_pvd
    ? sectionTitle("กองทุนสำรองเลี้ยงชีพปัจจุบัน") +
      row("ข้อมูล ณ วันที่", lead.pvd_data_as_of) +
      row("มูลค่าทรัพย์สินสุทธิ", num(lead.pvd_fund_size, " บาท")) +
      row("เงินนำส่งต่อเดือน", num(lead.pvd_monthly_contribution, " บาท")) +
      row("จำนวนสมาชิก", num(lead.pvd_members_count, " คน")) +
      row("บริษัทจัดการปัจจุบัน", lead.pvd_current_manager) +
      row("นโยบายการลงทุนปัจจุบัน", lead.pvd_investment_policy) +
      row("ค่าจัดการกองทุน", num(lead.pvd_management_fee, "%")) +
      row("อัตราผลตอบแทน (YTD)", num(lead.pvd_ytd_yield, "%"))
    : sectionTitle("กองทุนสำรองเลี้ยงชีพปัจจุบัน") +
      row("สถานะ", "ยังไม่มีกองทุนสำรองเลี้ยงชีพ");

  const insuranceSection =
    sectionTitle("ประกันชีวิตกลุ่ม") +
    row("มีประกันกลุ่มหรือไม่", lead.has_group_insurance ? "มี" : "ไม่มี") +
    row("ทำอยู่กับบริษัท", lead.group_insurance_company);

  await resend.emails.send({
    from: "I Wealth Pros <noreply@iwealthpros.com>",
    to: adminEmail,
    replyTo: lead.email,
    subject: `ขอข้อเสนอ PVD: ${lead.company_name} — I Wealth Pros`,
    html: `
      <div style="font-family: Arial, 'Helvetica Neue', sans-serif; max-width: 640px; margin: 0 auto;">
        <div style="background: ${NAVY}; padding: 24px; border-radius: 12px 12px 0 0; border-bottom: 2px solid ${GOLD};">
          <h1 style="color: ${GOLD_LIGHT}; margin: 0; font-size: 22px; letter-spacing: 2px;">I WEALTH PROS</h1>
          <p style="color: rgba(255,255,255,0.6); margin: 6px 0 0; font-size: 13px;">
            คำขอข้อเสนอกองทุนสำรองเลี้ยงชีพใหม่จากเว็บไซต์
          </p>
        </div>
        <div style="background: #ffffff; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
          <table style="width: 100%; border-collapse: collapse;">
            ${sectionTitle("ข้อมูลบริษัท")}
            ${row("ชื่อบริษัท", lead.company_name)}
            ${row("ชื่อผู้ติดต่อ", lead.contact_person)}
            ${row("ตำแหน่ง", lead.position)}
            ${row("เบอร์โทร", lead.phone)}
            ${row("อีเมลรับข้อเสนอ", lead.email)}
            ${row("ที่อยู่บริษัท", lead.company_address)}
            ${row("ประเภทธุรกิจ", lead.business_type)}
            ${row("จำนวนพนักงาน", num(lead.employees_count, " คน"))}
            ${row(
              "เงินเดือนพื้นฐานรวม/เดือน",
              num(lead.total_basic_salary, " บาท")
            )}
            ${row(
              "ภาษาข้อเสนอที่ต้องการ",
              lead.proposal_language === "en" ? "English" : "ภาษาไทย"
            )}
            ${pvdSection}
            ${insuranceSection}
            ${lead.message ? sectionTitle("ข้อมูลเพิ่มเติม") + row("ข้อความ", lead.message) : ""}
          </table>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
            <a href="${appUrl}/admin"
               style="background: ${NAVY_SOFT}; color: ${GOLD_LIGHT}; padding: 11px 22px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block;">
              เปิดดูใน Admin Dashboard
            </a>
          </div>
        </div>
      </div>
    `,
  });
}
