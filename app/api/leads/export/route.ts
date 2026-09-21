import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { auth } from "@/lib/auth/server";
import { isAdminEmail } from "@/lib/auth/admins";
import { getLeads } from "@/lib/leads";
import { leadFields, statusLabels, formatThaiDateTime } from "@/lib/lead-fields";

export const dynamic = "force-dynamic";

const NAVY = "FF0A192C";
const GOLD = "FFCBAE6B";

/** ดาวน์โหลด leads ทั้งหมดเป็นไฟล์ Excel — ต้องล็อกอินและอยู่ใน allowlist */
export async function GET() {
  const { data: session } = await auth.getSession();
  if (!session?.user || !isAdminEmail(session.user.email)) {
    return NextResponse.json({ error: "ไม่ได้รับอนุญาต" }, { status: 401 });
  }

  try {
    const leads = await getLeads();

    const workbook = new ExcelJS.Workbook();
    workbook.creator = "I Wealth Pros";
    workbook.created = new Date();

    const sheet = workbook.addWorksheet("Leads", {
      views: [{ state: "frozen", ySplit: 1 }],
    });

    sheet.columns = [
      ...leadFields.map((f) => ({ header: f.label, width: f.width ?? 18 })),
      { header: "สถานะ", width: 14 },
      { header: "วันที่รับข้อมูล", width: 20 },
    ];

    const header = sheet.getRow(1);
    header.font = { bold: true, color: { argb: GOLD } };
    header.fill = { type: "pattern", pattern: "solid", fgColor: { argb: NAVY } };
    header.alignment = { vertical: "middle" };
    header.height = 22;

    for (const lead of leads) {
      sheet.addRow([
        ...leadFields.map((f) => (f.raw ? f.raw(lead) : f.get(lead))),
        statusLabels[lead.status],
        formatThaiDateTime(lead.created_at),
      ]);
    }

    // รูปแบบตัวเลขต่อคอลัมน์ + ตัดบรรทัดในช่องข้อความยาว
    leadFields.forEach((field, i) => {
      if (field.numFmt) sheet.getColumn(i + 1).numFmt = field.numFmt;
    });
    sheet.getColumn(1).font = { bold: true };
    sheet.autoFilter = {
      from: { row: 1, column: 1 },
      to: { row: 1, column: sheet.columnCount },
    };

    const buffer = await workbook.xlsx.writeBuffer();
    const filename = `iwealthpros-leads-${new Date()
      .toISOString()
      .slice(0, 10)}.xlsx`;

    return new NextResponse(buffer as ArrayBuffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("Excel export error:", err);
    return NextResponse.json(
      { error: "สร้างไฟล์ Excel ไม่สำเร็จ" },
      { status: 500 }
    );
  }
}
