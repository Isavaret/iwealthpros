import { NextRequest, NextResponse } from "next/server";
import { sendLeadNotification } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const lead = await req.json();
    await sendLeadNotification(lead);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Notification error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
