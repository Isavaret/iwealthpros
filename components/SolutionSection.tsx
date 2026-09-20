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
    <section className="bg-[#0A192C] py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#CBAE6B]/10 border border-[#CBAE6B]/30 mb-6">
            <Sparkles size={16} className="text-[#CBAE6B]" />
            <span className="text-[#CBAE6B] text-sm font-medium">
              ทางเลือกที่ดีกว่า
            </span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold text-white mb-4">
            PVD คุ้มกว่า
            <span className="text-[#CBAE6B]"> ทุกมิติ</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            กองทุนสำรองเลี้ยงชีพ (PVD) ไม่ใช่แค่การปฏิบัติตามกฎหมาย
            แต่คือเครื่องมือวางแผนการเงินที่ให้ผลดีกับทั้งองค์กรและพนักงาน
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {/* PVD card */}
          <div className="bg-[#132845] rounded-2xl p-8 border border-[#CBAE6B]/30 relative overflow-hidden">
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
          <div className="bg-[#132845]/50 rounded-2xl p-8 border border-white/10">
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
        <div className="bg-gradient-to-r from-[#CBAE6B]/20 to-[#F0DA8F]/10 border border-[#CBAE6B]/30 rounded-2xl p-6 sm:p-8 text-center">
          <p className="text-white text-lg sm:text-xl font-medium leading-relaxed">
            บริษัทที่{" "}
            <span className="text-[#CBAE6B] font-bold">
              จัดตั้ง PVD ก่อน 1 ต.ค. 2569
            </span>{" "}
            จะได้รับการ
            <span className="text-[#CBAE6B] font-bold">
              {" "}
              ยกเว้นโดยอัตโนมัติ
            </span>{" "}
            จากกองทุนสงเคราะห์ลูกจ้าง
            <br className="hidden sm:block" />
            พร้อมได้ประโยชน์ด้านภาษีและสวัสดิการที่ดีกว่า
          </p>
          <a
            href="#contact-form"
            className="inline-flex items-center justify-center mt-6 px-8 py-3 rounded-full bg-[#CBAE6B] hover:bg-[#F0DA8F] text-[#0A192C] font-bold transition-all hover:scale-105 shadow-lg shadow-[#CBAE6B]/30"
          >
            เริ่มต้นวางแผน PVD ตอนนี้
          </a>
        </div>
      </div>
    </section>
  );
}
