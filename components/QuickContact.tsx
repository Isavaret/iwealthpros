import { MessageCircle, Phone } from "lucide-react";
import { site } from "@/lib/site";

/**
 * ปุ่ม LINE / โทร วางคู่กับปุ่มขอข้อเสนอ — คนที่ไม่อยากกรอกฟอร์มคุยกับทีมได้ทันที
 * ลิงก์ใช้รูปแบบเดียวกับ Footer เพื่อให้ tag "LINE OA Click" และ "Website Click to Call" ใน GTM นับได้
 */
export default function QuickContact({
  tone = "dark",
  label = "หรือคุยกับที่ปรึกษาโดยตรง",
  className = "",
}: {
  tone?: "dark" | "light";
  label?: string;
  className?: string;
}) {
  const pill =
    tone === "dark"
      ? "border-white/15 bg-white/[0.04] text-white/85 hover:border-[#CBAE6B]/60 hover:text-[#F0DA8F]"
      : "border-[#0A192C]/15 bg-white text-[#0A192C] hover:border-[#856A2E] hover:text-[#856A2E]";
  const caption = tone === "dark" ? "text-white/50" : "text-gray-500";

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className={`w-full text-sm sm:w-auto ${caption}`}>{label}</span>
      <a
        href={site.lineUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors ${pill}`}
      >
        <MessageCircle size={16} className="shrink-0 text-[#06C755]" />
        LINE {site.lineId}
      </a>
      <a
        href={`tel:${site.phone}`}
        className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors ${pill}`}
      >
        <Phone size={16} className="shrink-0 text-[#CBAE6B]" />
        โทร {site.phoneDisplay}
      </a>
    </div>
  );
}
