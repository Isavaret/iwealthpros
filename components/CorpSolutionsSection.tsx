import { Shield, Users, PiggyBank, Check } from "lucide-react";

const products = [
  {
    icon: Shield,
    title: "Key Man Insurance",
    subtitle: "ประกันผู้บริหาร",
    description:
      "ออกแบบแผนประกันสำหรับผู้บริหารองค์กร ด้วยการนำเสนอแบบประกันชีวิต (ไม่ใช่ Unit Linked) ที่เบี้ยประกันสามารถนำมาเป็นค่าใช้จ่ายบริษัทได้เต็ม 100% และผู้บริหารยังได้รับสิทธิลดหย่อนภาษีส่วนตัวตามเกณฑ์",
    highlights: [
      "เบี้ยเป็นค่าใช้จ่ายบริษัท 100%",
      "ลดหย่อนภาษีส่วนตัวผู้บริหาร",
      "สรรพากรยอมรับ",
      "เฉพาะแบบ Non-Unit Linked",
    ],
    accentColor: "from-[#0A192C] to-[#132845]",
    badgeColor: "bg-[#CBAE6B]/10 text-[#CBAE6B] border-[#CBAE6B]/30",
  },
  {
    icon: Users,
    title: "ประกันกลุ่ม",
    subtitle: "Group Insurance",
    description:
      "ประกันสุขภาพและประกันอุบัติเหตุสำหรับพนักงานทั้งองค์กร ออกแบบได้ตามความต้องการ แบ่งกลุ่มความคุ้มครองตามระดับ รับตั้งแต่ 5 คนขึ้นไป และเบี้ยประกันนำเป็นค่าใช้จ่ายบริษัทได้",
    highlights: [
      "รับตั้งแต่ 5 คนขึ้นไป",
      "เลือกความคุ้มครองได้ตามต้องการ",
      "แบ่งกลุ่มตามระดับพนักงาน",
      "เบี้ยเป็นค่าใช้จ่ายบริษัท",
    ],
    accentColor: "from-[#1B3557] to-[#132845]",
    badgeColor: "bg-[#CBAE6B]/10 text-[#CBAE6B] border-[#CBAE6B]/30",
  },
  {
    icon: PiggyBank,
    title: "Provident Fund",
    subtitle: "กองทุนสำรองเลี้ยงชีพ",
    description:
      "จัดตั้งกองทุนสำรองเลี้ยงชีพสำหรับพนักงาน ด้วยการหักเงินเดือนพนักงานและสมทบโดยนายจ้าง เงินสมทบของนายจ้างนำมาเป็นค่าใช้จ่ายบริษัทได้ 100% พร้อมสิทธิประโยชน์ด้านภาษีทั้งสองฝ่าย",
    highlights: [
      "นายจ้างสมทบเป็นค่าใช้จ่ายบริษัท",
      "พนักงานลดหย่อนภาษีสูงสุด 500,000 บาท",
      "ยกเว้นกองทุนสงเคราะห์อัตโนมัติ",
      "เงินเติบโตพร้อมการลงทุน",
    ],
    accentColor: "from-[#1B3557] to-[#132845]",
    badgeColor: "bg-[#CBAE6B]/10 text-[#CBAE6B] border-[#CBAE6B]/30",
  },
];

export default function CorpSolutionsSection() {
  return (
    <section id="services" className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-[#856A2E] font-semibold text-sm uppercase tracking-widest mb-3">
            Corporate Solutions
          </p>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold text-[#0A192C] mb-4">
            โซลูชันครบวงจร
            <br />
            สำหรับองค์กรของคุณ
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            ค่าใช้จ่ายด้านประกันและสวัสดิการพนักงาน นำมาหักเป็นค่าใช้จ่ายบริษัทได้
            100% ตามที่สรรพากรยอมรับ
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.title}
              className="rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-100 transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Card header */}
              <div
                className={`bg-gradient-to-br ${product.accentColor} p-6 relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#CBAE6B]/5 rounded-full blur-2xl" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-[#CBAE6B]/20 flex items-center justify-center mb-4">
                    <product.icon size={24} className="text-[#CBAE6B]" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-0.5">
                    {product.title}
                  </h3>
                  <p className="text-[#CBAE6B] text-sm">{product.subtitle}</p>
                </div>
              </div>

              {/* Card body */}
              <div className="p-6 bg-white">
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  {product.description}
                </p>
                <ul className="space-y-2">
                  {product.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#CBAE6B]/10 flex items-center justify-center flex-shrink-0">
                        <Check size={12} className="text-[#856A2E]" />
                      </div>
                      <span className="text-gray-700 text-sm">{h}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact-form"
                  className="mt-6 block text-center py-2.5 px-4 rounded-xl border border-[#0A192C] text-[#0A192C] text-sm font-semibold hover:bg-[#0A192C] hover:text-white transition-all"
                >
                  สอบถามข้อมูล
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Tax benefit banner */}
        <div className="mt-12 bg-[#F7EBC6]/40 border border-[#CBAE6B]/30 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#CBAE6B]/20 flex items-center justify-center flex-shrink-0">
              <Shield size={24} className="text-[#856A2E]" />
            </div>
            <div>
              <h4 className="font-bold text-[#0A192C] mb-1">
                ประโยชน์ด้านภาษีสำหรับองค์กร
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                ค่าเบี้ยประกันและเงินสมทบกองทุนทั้งหมดสามารถนำมาหักเป็น
                <strong> ค่าใช้จ่ายบริษัทได้ 100%</strong> ตามประมวลรัษฎากร
                ในขณะที่พนักงานและผู้บริหารยังได้รับ
                <strong> สิทธิลดหย่อนภาษีส่วนบุคคล</strong> ตามเกณฑ์ภาษีบุคคลธรรมดา
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
