import { Trophy, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#0A192C] flex items-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#CBAE6B]/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#CBAE6B]/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 39px, #CBAE6B 39px, #CBAE6B 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, #CBAE6B 39px, #CBAE6B 40px)",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="order-2 lg:order-1">
            {/* Award badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {["Provident Fund Of the Year 2025", "Provident Fund Of the Year 2022"].map(
                (award) => (
                  <div
                    key={award}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#CBAE6B]/40 bg-[#CBAE6B]/10"
                  >
                    <Trophy size={14} className="text-[#CBAE6B]" />
                    <span className="text-[#F0DA8F] text-xs font-medium">
                      {award}
                    </span>
                  </div>
                )
              )}
            </div>

            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              บริษัทคุณ
              <br />
              <span className="text-[#CBAE6B]">พร้อมรับมือ</span>
              <br />
              กองทุนสงเคราะห์
              <br />
              ลูกจ้างหรือยัง?
            </h1>

            <p className="text-white/70 text-lg leading-relaxed mb-4">
              กฎหมายกำหนดให้บริษัทที่มีพนักงาน{" "}
              <span className="text-white font-semibold">ตั้งแต่ 10 คนขึ้นไป</span>{" "}
              ต้องเข้าร่วมกองทุนสงเคราะห์ลูกจ้างภายใน{" "}
              <span className="text-[#CBAE6B] font-semibold">1 ตุลาคม 2569</span>
            </p>
            <p className="text-white/70 text-lg leading-relaxed mb-10">
              แต่มีทางออกที่{" "}
              <span className="text-white font-semibold">ดีกว่า</span> —
              กองทุนสำรองเลี้ยงชีพ (PVD) ที่บริษัทจัดให้แก่พนักงาน{" "}
              <span className="text-[#CBAE6B] font-semibold">
                ยกเว้นการเข้ากองทุนสงเคราะห์โดยอัตโนมัติ
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact-form"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#CBAE6B] hover:bg-[#F0DA8F] text-[#0A192C] font-bold text-lg transition-all shadow-lg shadow-[#CBAE6B]/30 hover:shadow-[#CBAE6B]/50 hover:scale-105"
              >
                รับคำปรึกษาฟรี
              </a>
              <a
                href="#pvd"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/20 text-white hover:border-[#CBAE6B] hover:text-[#CBAE6B] font-semibold text-lg transition-all"
              >
                ดูรายละเอียด
              </a>
            </div>
          </div>

          {/* Profile image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Gold ring decoration */}
              <div className="absolute inset-0 rounded-2xl border-2 border-[#CBAE6B]/30 scale-110 rotate-3" />
              <div className="absolute inset-0 rounded-2xl border border-[#CBAE6B]/15 scale-105 -rotate-2" />

              {/* Profile image */}
              <div className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-2xl overflow-hidden border border-[#CBAE6B]/20">
                <Image
                  src="/profile.png"
                  alt="I Wealth Pros — ที่ปรึกษาการเงินและการลงทุน"
                  fill
                  className="object-cover object-top"
                  priority
                />
                {/* Gold gradient overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0A192C]/90 to-transparent h-28 flex items-end p-4">
                  <div className="text-center w-full">
                    <p className="text-[#CBAE6B] font-semibold text-sm">
                      I Wealth Pros Advisory
                    </p>
                    <p className="text-white/70 text-xs">
                      ที่ปรึกษาการเงินและการลงทุน
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs">เลื่อนดูเพิ่มเติม</span>
          <ChevronDown size={20} className="animate-bounce" />
        </div>
      </div>
    </section>
  );
}
