import Image from "next/image";
import { CheckCircle2, XCircle, Sparkles } from "lucide-react";

const pvdBenefits = [
  "ยกเว้นกองทุนสงเคราะห์ลูกจ้างโดยอัตโนมัติ",
  "นายจ้างสมทบได้ตามที่ตกลง (สูงกว่า 0.25%)",
  "พนักงานลดหย่อนภาษีได้สูงสุด 500,000 บาท/ปี",
  "นายจ้างนำเงินสมทบเป็นค่าใช้จ่ายบริษัทได้ 100%",
  "เลือกนโยบายการลงทุนได้ตามความเสี่ยงที่ยอมรับ",
  "เงินเติบโตพร้อมดอกผลจากการลงทุน",
];

const welfareDrawbacks = [
  "อัตราคงที่ 0.25% → 0.5% ตามกฎหมาย",
  "ไม่มีผลตอบแทนจากการลงทุน",
  "ไม่ได้รับสิทธิลดหย่อนภาษีส่วนตัวเพิ่ม",
  "ไม่สามารถกำหนดอัตราสมทบพิเศษได้",
];

export default function SolutionSection() {
  return (
    <section className="relative overflow-hidden bg-navy-gradient section-y">
      <div className="container-page relative">
        <div className="text-center mb-12 sm:mb-16">
          <div className="eyebrow mb-6 border border-[#CBAE6B]/30 bg-[#CBAE6B]/10 text-[#F0DA8F]">
            <Sparkles size={16} className="shrink-0 text-[#CBAE6B]" />
            ทางเลือกที่ดีกว่า
          </div>
          <h2 className="h2-fluid font-bold text-white mb-4 text-balance">
            PVD คุ้มกว่า
            <span className="text-gold-metallic"> ทุกมิติ</span>
          </h2>
          <p className="lead text-white/60 max-w-2xl mx-auto text-pretty">
            กองทุนสำรองเลี้ยงชีพ (PVD) ไม่ใช่แค่การปฏิบัติตามกฎหมาย
            แต่คือเครื่องมือวางแผนการเงินที่ให้ผลดีกับทั้งองค์กรและพนักงาน
          </p>
        </div>

        <div className="grid gap-5 sm:gap-6 lg:grid-cols-2 mb-10 sm:mb-12">
          {/* PVD card */}
          <div className="card-dark ring-gold hover-lift relative overflow-hidden border p-6 sm:p-8">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#CBAE6B]/5 rounded-full blur-2xl" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#CBAE6B]/20 flex items-center justify-center">
                  <CheckCircle2 size={20} className="text-[#CBAE6B]" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">
                    กองทุนสำรองเลี้ยงชีพ (PVD)
                  </h3>
                  <p className="text-[#CBAE6B] text-sm">ทางเลือกที่แนะนำ</p>
                </div>
              </div>
              <ul className="space-y-3">
                {pvdBenefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle2
                      size={18}
                      className="text-[#CBAE6B] flex-shrink-0 mt-0.5"
                    />
                    <span className="text-white/80 text-sm leading-relaxed">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Welfare fund card */}
          <div className="card-dark hover-lift border p-6 sm:p-8 opacity-90">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                <XCircle size={20} className="text-white/40" />
              </div>
              <div>
                <h3 className="text-white/60 font-bold text-lg">
                  กองทุนสงเคราะห์ลูกจ้าง
                </h3>
                <p className="text-white/40 text-sm">ขั้นต่ำตามกฎหมาย</p>
              </div>
            </div>
            <ul className="space-y-3">
              {welfareDrawbacks.map((d) => (
                <li key={d} className="flex items-start gap-3">
                  <XCircle
                    size={18}
                    className="text-white/30 flex-shrink-0 mt-0.5"
                  />
                  <span className="text-white/40 text-sm leading-relaxed">
                    {d}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Key message banner */}
        <div className="relative overflow-hidden rounded-3xl border border-[#CBAE6B]/30 bg-gradient-to-br from-[#CBAE6B]/20 via-[#132845]/60 to-[#F0DA8F]/10 p-6 sm:p-9">
          <div className="relative flex flex-col items-center gap-6 text-center lg:flex-row lg:items-center lg:gap-9 lg:text-left">
            <Image
              src="/logo-iwealthpros.jpg"
              alt="โลโก้ I Wealth Pros"
              width={288}
              height={306}
              sizes="(max-width: 1024px) 7rem, 9rem"
              className="logo-glow w-28 shrink-0 rounded-2xl border border-[#CBAE6B]/40 object-cover lg:w-36"
            />

            <div className="flex-1">
              <p className="text-lg font-medium leading-relaxed text-white sm:text-xl">
                บริษัทที่{" "}
                <span className="font-bold text-gold-metallic">
                  จัดตั้ง PVD ก่อน 1 ต.ค. 2569
                </span>{" "}
                จะได้รับการ
                <span className="font-bold text-gold-metallic"> ยกเว้นโดยอัตโนมัติ</span>{" "}
                จากกองทุนสงเคราะห์ลูกจ้าง พร้อมได้ประโยชน์ด้านภาษีและสวัสดิการที่ดีกว่า
              </p>
              <a href="#contact-form" className="btn btn-gold mt-6 w-full sm:w-auto">
                เริ่มต้นวางแผน PVD ตอนนี้
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
