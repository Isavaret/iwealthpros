import { Resend } from "resend";
import type { LeadInsert } from "@/types/lead";

export async function sendLeadNotification(lead: LeadInsert & { id: string }) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail || !process.env.RESEND_API_KEY) return;

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "I Wealth <noreply@iwealth.co.th>",
    to: adminEmail,
    subject: `New Lead: ${lead.name} — I Wealth`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0A1628; padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #C9A435; margin: 0; font-size: 24px;">I Wealth</h1>
          <p style="color: rgba(255,255,255,0.6); margin: 4px 0 0;">Lead ใหม่จากเว็บไซต์</p>
        </div>
        <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #eee; border-top: none;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; width: 140px;">ชื่อ</td><td style="padding: 8px 0; font-weight: bold; color: #0A1628;">${lead.name}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">เบอร์โทร</td><td style="padding: 8px 0; font-weight: bold; color: #0A1628;">${lead.phone}</td></tr>
            ${lead.email ? `<tr><td style="padding: 8px 0; color: #666;">อีเมล</td><td style="padding: 8px 0; color: #0A1628;">${lead.email}</td></tr>` : ""}
            ${lead.company ? `<tr><td style="padding: 8px 0; color: #666;">บริษัท</td><td style="padding: 8px 0; color: #0A1628;">${lead.company}</td></tr>` : ""}
            ${lead.employees_count ? `<tr><td style="padding: 8px 0; color: #666;">จำนวนพนักงาน</td><td style="padding: 8px 0; color: #0A1628;">${lead.employees_count}</td></tr>` : ""}
            ${lead.message ? `<tr><td style="padding: 8px 0; color: #666; vertical-align: top;">ข้อความ</td><td style="padding: 8px 0; color: #0A1628;">${lead.message}</td></tr>` : ""}
          </table>
          <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #eee;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://iwealthpros.vercel.app"}/admin"
               style="background: #0A1628; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">
              ดู Lead ในระบบ Admin
            </a>
          </div>
        </div>
      </div>
    `,
  });
}
