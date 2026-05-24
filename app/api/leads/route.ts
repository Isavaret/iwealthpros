import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(9).regex(/^[0-9+\-\s()]+$/),
  email: z.string().email().or(z.literal("")).optional(),
  company: z.string().optional(),
  employees_count: z.string().optional(),
  message: z.string().optional(),
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

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabase
      .from("leads")
      .insert({
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email || null,
        company: parsed.data.company || null,
        employees_count: parsed.data.employees_count || null,
        message: parsed.data.message || null,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่" },
        { status: 500 }
      );
    }

    // Fire-and-forget email notification
    fetch(`${process.env.NEXT_PUBLIC_APP_URL || ""}/api/notify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...parsed.data, id: data.id }),
    }).catch(() => {});

    return NextResponse.json({ success: true, id: data.id }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาด กรุณาลองใหม่" },
      { status: 500 }
    );
  }
}
