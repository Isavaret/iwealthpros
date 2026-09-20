import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { z } from "zod";
import { sendLeadNotification } from "@/lib/email";

/** ช่องตัวเลขที่ปล่อยว่างได้ — ฟอร์มส่งมาเป็น "" เมื่อไม่กรอก */
const optionalNumber = z.preprocess(
  (v) => (v === "" || v === null || v === undefined ? undefined : v),
  z.coerce.number().nonnegative().optional()
);

const optionalText = z.preprocess(
  (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
  z.string().max(1000).optional()
);

const schema = z.object({
  proposal_language: z.enum(["th", "en"]).default("th"),

  company_name: z.string().min(2).max(300),
  contact_person: z.string().min(2).max(200),
  position: optionalText,
  company_address: optionalText,
  phone: z.string().min(9).max(30).regex(/^[0-9+\-\s()]+$/),
  business_type: optionalText,
  employees_count: optionalNumber,
  total_basic_salary: optionalNumber,
  email: z.string().email().max(200),

  has_existing_pvd: z.boolean().default(false),
  pvd_data_as_of: z.preprocess(
    (v) => (v === "" || v === null ? undefined : v),
    z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional()
  ),
  pvd_fund_size: optionalNumber,
  pvd_monthly_contribution: optionalNumber,
  pvd_members_count: optionalNumber,
  pvd_current_manager: optionalText,
  pvd_investment_policy: optionalText,
  pvd_management_fee: optionalNumber,
  pvd_ytd_yield: optionalNumber,

  has_group_insurance: z.boolean().default(false),
  group_insurance_company: optionalText,

  message: optionalText,
  /** honeypot — บอทมักกรอกทุกช่อง คนจริงจะไม่เห็นช่องนี้ */
  website: z.string().max(0).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบและลองใหม่" },
        { status: 400 }
      );
    }

    const { website: _honeypot, ...lead } = parsed.data;
    void _honeypot;

    // ถ้าไม่ได้ติ๊กว่ามี PVD / ประกันกลุ่มอยู่แล้ว ก็ไม่เก็บข้อมูลส่วนนั้น
    const record = {
      ...lead,
      ...(lead.has_existing_pvd
        ? {}
        : {
            pvd_data_as_of: undefined,
            pvd_fund_size: undefined,
            pvd_monthly_contribution: undefined,
            pvd_members_count: undefined,
            pvd_current_manager: undefined,
            pvd_investment_policy: undefined,
            pvd_management_fee: undefined,
            pvd_ytd_yield: undefined,
          }),
      ...(lead.has_group_insurance ? {} : { group_insurance_company: undefined }),
    };

    const [inserted] = await sql`
      INSERT INTO leads (
        proposal_language, company_name, contact_person, position,
        company_address, phone, business_type, employees_count,
        total_basic_salary, email,
        has_existing_pvd, pvd_data_as_of, pvd_fund_size,
        pvd_monthly_contribution, pvd_members_count, pvd_current_manager,
        pvd_investment_policy, pvd_management_fee, pvd_ytd_yield,
        has_group_insurance, group_insurance_company, message
      ) VALUES (
        ${record.proposal_language}, ${record.company_name},
        ${record.contact_person}, ${record.position ?? null},
        ${record.company_address ?? null}, ${record.phone},
        ${record.business_type ?? null}, ${record.employees_count ?? null},
        ${record.total_basic_salary ?? null}, ${record.email},
        ${record.has_existing_pvd}, ${record.pvd_data_as_of ?? null},
        ${record.pvd_fund_size ?? null}, ${record.pvd_monthly_contribution ?? null},
        ${record.pvd_members_count ?? null}, ${record.pvd_current_manager ?? null},
        ${record.pvd_investment_policy ?? null}, ${record.pvd_management_fee ?? null},
        ${record.pvd_ytd_yield ?? null}, ${record.has_group_insurance},
        ${record.group_insurance_company ?? null}, ${record.message ?? null}
      )
      RETURNING id
    `;

    // แจ้งเตือนอีเมล — ไม่ให้อีเมลล้มเหลวมาทำให้ลูกค้าเห็น error
    try {
      await sendLeadNotification({ ...record, id: inserted.id });
    } catch (err) {
      console.error("Notification error:", err);
    }

    return NextResponse.json({ success: true, id: inserted.id }, { status: 200 });
  } catch (err) {
    console.error("Lead insert error:", err);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาด กรุณาลองใหม่" },
      { status: 500 }
    );
  }
}
