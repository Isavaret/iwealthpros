import { Phone, Mail, MessageCircle, Share2, Camera, Trophy } from "lucide-react";

const contactLinks = [
  {
    icon: MessageCircle,
    label: "Line",
    value: "@iwealth",
    href: "https://line.me/ti/p/~@iwealth",
    placeholder: true,
  },
  {
    icon: Phone,
    label: "โทรศัพท์",
    value: "0X-XXXX-XXXX",
    href: "tel:+660XXXXXXXX",
    placeholder: true,
  },
  {
    icon: Mail,
    label: "อีเมล",
    value: "contact@iwealth.co.th",
    href: "mailto:contact@iwealth.co.th",
    placeholder: true,
  },
];

const socialLinks = [
  {
    icon: Share2,
    label: "Facebook",
    href: "https://facebook.com/iwealth",
    placeholder: true,
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
    <footer id="footer" className="bg-[#0D1E45] text-white">
      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <p className="text-3xl font-bold text-[#C9A84C] tracking-wide mb-3">
              I Wealth
            </p>
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
                    className="flex items-center gap-2 text-xs text-[#E0C070]"
                  >
                    <Trophy size={13} className="text-[#C9A84C]" />
                    <span>{award}</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#C9A84C] font-semibold text-sm uppercase tracking-wider mb-5">
              ติดต่อเรา
            </h4>
            <ul className="space-y-4">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="flex items-center gap-3 text-white/70 hover:text-[#C9A84C] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-[#C9A84C]/10 flex items-center justify-center transition-colors">
                      <link.icon size={15} className="text-[#C9A84C]" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40">{link.label}</p>
                      <p className="text-sm">
                        {link.value}
                        {link.placeholder && (
                          <span className="ml-1 text-xs text-white/20">
                            [อัปเดต]
                          </span>
                        )}
                      </p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + CTA */}
          <div>
            <h4 className="text-[#C9A84C] font-semibold text-sm uppercase tracking-wider mb-5">
              ติดตามเรา
            </h4>
            <div className="flex gap-3 mb-8">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#C9A84C]/20 flex items-center justify-center transition-all hover:scale-110"
                >
                  <s.icon size={18} className="text-[#C9A84C]" />
                </a>
              ))}
            </div>

            <div className="bg-[#122050] rounded-xl p-4 border border-[#C9A84C]/20">
              <p className="text-white/80 text-sm mb-3">
                พร้อมรับคำปรึกษาฟรีแล้วใช่ไหม?
              </p>
              <a
                href="#contact-form"
                className="block text-center py-2 px-4 rounded-lg bg-[#C9A84C] hover:bg-[#E0C070] text-[#0D1E45] font-semibold text-sm transition-colors"
              >
                กรอกฟอร์มด้านบน
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/30 text-xs">
            © 2025 I Wealth. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            ข้อมูลนี้จัดทำเพื่อเป็นความรู้ทั่วไป ไม่ถือเป็นคำแนะนำการลงทุน
          </p>
        </div>
      </div>
    </footer>
  );
}
