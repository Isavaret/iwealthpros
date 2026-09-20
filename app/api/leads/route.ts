import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
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

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabase
      .from("leads")
      .insert(
        Object.fromEntries(
          Object.entries(record).map(([k, v]) => [k, v === undefined ? null : v])
        )
      )
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่" },
        { status: 500 }
      );
    }

    // แจ้งเตือนอีเมล — ไม่ให้อีเมลล้มเหลวมาทำให้ลูกค้าเห็น error
    try {
      await sendLeadNotification({ ...record, id: data.id });
    } catch (err) {
      console.error("Notification error:", err);
    }

    return NextResponse.json({ success: true, id: data.id }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาด กรุณาลองใหม่" },
      { status: 500 }
    );
  }
}
