import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MessageCircle, Trophy } from "lucide-react";

const contactLinks = [
  {
    icon: MessageCircle,
    label: "Line",
    value: "@iwealthpros",
    href: "https://line.me/R/ti/p/@iwealthpros",
  },
  {
    icon: Phone,
    label: "โทรศัพท์",
    value: "098-939-1466",
    href: "tel:+66989391466",
  },
  {
    icon: Mail,
    label: "อีเมล",
    value: "Info@iwealthpros.com",
    href: "mailto:Info@iwealthpros.com",
  },
];

/* โลโก้แบรนด์ — lucide 1.x ตัดไอคอนแบรนด์ออกแล้ว จึงวาดเป็น SVG ตรงนี้ */
type BrandIconProps = { size?: number; className?: string };

function FacebookIcon({ size = 24, className }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
    </svg>
  );
}

function TiktokIcon({ size = 24, className }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z" />
    </svg>
  );
}

function LineIcon({ size = 24, className }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
    </svg>
  );
}

const socialLinks = [
  {
    icon: FacebookIcon,
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61589894085994",
  },
  {
    icon: TiktokIcon,
    label: "TikTok",
    href: "https://www.tiktok.com/@i.wealth.pros",
  },
  {
    icon: LineIcon,
    label: "Line",
    href: "https://lin.ee/n8DTn16",
  },
];

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative overflow-hidden bg-navy-gradient text-white"
    >
      {/* โลโก้ลายน้ำขนาดใหญ่ */}
      <div
        className="pointer-events-none absolute -bottom-28 left-1/2 w-[min(90vw,34rem)] -translate-x-1/2 opacity-[0.16] mix-blend-screen [mask-image:radial-gradient(circle_at_center,black_30%,transparent_70%)] [-webkit-mask-image:radial-gradient(circle_at_center,black_30%,transparent_70%)]"
        aria-hidden="true"
      >
        <div className="aspect-[3/2] w-full overflow-hidden">
          <Image
            src="/logo-iwealthpros.jpg"
            alt=""
            width={680}
            height={722}
            sizes="(max-width: 640px) 90vw, 34rem"
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>

      {/* Main footer */}
      <div className="container-page relative py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-5 flex items-center gap-4">
              <Image
                src="/logo-iwealthpros.jpg"
                alt="โลโก้ I Wealth Pros"
                width={256}
                height={272}
                sizes="(max-width: 640px) 80px, 96px"
                className="logo-glow h-20 w-20 rounded-2xl border border-[#CBAE6B]/40 object-cover sm:h-24 sm:w-24"
              />
              <span className="leading-none">
                <span className="block text-2xl font-bold tracking-[0.12em] text-gold-metallic sm:text-3xl">
                  I WEALTH
                </span>
                <span className="block text-xs font-semibold tracking-[0.3em] text-[#CBAE6B]/70">
                  PROS
                </span>
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              ที่ปรึกษาด้านการเงินและการลงทุน ผู้เชี่ยวชาญกองทุนสำรองเลี้ยงชีพและ
              Corporate Solutions สำหรับองค์กร
            </p>
            {/* Awards */}
            <div className="space-y-2">
              {["Provident Fund Of the Year 2025", "Provident Fund Of the Year 2022"].map(
                (award) => (
                  <div
                    key={award}
                    className="flex items-center gap-2 text-xs text-[#F0DA8F]"
                  >
                    <Trophy size={13} className="text-[#CBAE6B]" />
                    <span>{award}</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#CBAE6B] font-semibold text-sm uppercase tracking-wider mb-5">
              ติดต่อเรา
            </h4>
            <ul className="space-y-4">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex min-h-11 items-center gap-3 rounded-xl text-white/70 transition-colors hover:text-[#CBAE6B]"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-[#CBAE6B]/10 flex items-center justify-center transition-colors">
                      <link.icon size={15} className="text-[#CBAE6B]" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40">{link.label}</p>
                      <p className="text-sm">{link.value}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + CTA */}
          <div>
            <h4 className="text-[#CBAE6B] font-semibold text-sm uppercase tracking-wider mb-5">
              ติดตามเรา
            </h4>
            <div className="flex gap-3 mb-8">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 transition-colors hover:bg-[#CBAE6B]/20"
                >
                  <s.icon size={18} className="text-[#CBAE6B]" />
                </a>
              ))}
            </div>

            <div className="mb-8">
              <Link
                href="/articles"
                className="inline-flex min-h-11 items-center text-sm text-white/60 transition-colors hover:text-[#CBAE6B]"
              >
                บทความความรู้เรื่อง PVD →
              </Link>
            </div>

            <div className="bg-[#132845] rounded-xl p-4 border border-[#CBAE6B]/20">
              <p className="text-white/80 text-sm mb-3">
                พร้อมรับคำปรึกษาฟรีแล้วใช่ไหม?
              </p>
              <Link
                href="/#contact-form"
                className="btn btn-gold w-full text-sm"
              >
                ขอข้อเสนอ PVD
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-center sm:flex-row sm:text-left">
          <p className="text-white/30 text-xs">
            © 2569 I Wealth Pros. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            ข้อมูลนี้จัดทำเพื่อเป็นความรู้ทั่วไป ไม่ถือเป็นคำแนะนำการลงทุน
          </p>
        </div>
      </div>
    </footer>
  );
}
