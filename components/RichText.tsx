import Link from "next/link";

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/**
 * แสดงข้อความบทความที่มีลิงก์แบบ [ชื่อ](/ลิงก์)
 * ลิงก์ภายในเว็บใช้ <Link /> ส่วนลิงก์ภายนอกเปิดแท็บใหม่
 */
export default function RichText({
  text,
  linkClassName = "font-medium text-[#856A2E] underline decoration-[#CBAE6B]/50 underline-offset-4 hover:decoration-[#856A2E]",
}: {
  text: string;
  linkClassName?: string;
}) {
  const parts: React.ReactNode[] = [];
  let last = 0;

  for (const match of text.matchAll(LINK)) {
    const [whole, label, href] = match;
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push(
      href.startsWith("/") ? (
        <Link key={match.index} href={href} className={linkClassName}>
          {label}
        </Link>
      ) : (
        <a
          key={match.index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          {label}
        </a>
      )
    );
    last = match.index + whole.length;
  }
  if (last < text.length) parts.push(text.slice(last));

  return <>{parts}</>;
}
