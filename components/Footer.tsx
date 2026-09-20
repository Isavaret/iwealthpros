import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MessageCircle, Share2, Camera, Trophy } from "lucide-react";

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
    value: "isavaret@gmail.com",
    href: "mailto:isavaret@gmail.com",
  },
];

const socialLinks = [
  {
    icon: Share2,
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61589894085994",
  },
  {
    icon: Camera,
    label: "Instagram",
    href: "https://instagram.com/iwealth",
    placeholder: true,
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
                <span className="block text-[11px] font-semibold tracking-[0.35em] text-[#CBAE6B]/70">
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
                    className="flex items-center gap-3 text-white/70 hover:text-[#CBAE6B] transition-colors group"
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
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 transition-colors hover:bg-[#CBAE6B]/20"
                >
                  <s.icon size={18} className="text-[#CBAE6B]" />
                </a>
              ))}
            </div>

            <div className="mb-8">
              <Link
                href="/articles"
                className="text-white/60 hover:text-[#CBAE6B] text-sm transition-colors"
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
