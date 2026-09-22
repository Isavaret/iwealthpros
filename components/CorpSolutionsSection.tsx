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
      "เลือกแบบประกันได้ตามความต้องการทั้ง ประกันชีวิต / สุขภาพ / โรคร้ายแรง",
    ],
    cta: "ขอข้อมูลเพื่อการติดต่อกลับ",
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
    cta: "ขอข้อมูลเพื่อการติดต่อกลับ",
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
      "นายจ้างสมทบเป็นค่าใช้จ่ายบริษัท ลดหย่อนภาษีนิติบุคคลได้",
      "พนักงานลดหย่อนภาษีสูงสุด 500,000 บาท",
      "ยกเว้นการเข้าร่วมกองทุนสงเคราะห์ลูกจ้าง",
      "เงินเติบโตพร้อมการลงทุน",
    ],
    cta: "สอบถามข้อมูล",
    accentColor: "from-[#1B3557] to-[#132845]",
    badgeColor: "bg-[#CBAE6B]/10 text-[#CBAE6B] border-[#CBAE6B]/30",
  },
];

export default function CorpSolutionsSection() {
  return (
    <section id="services" className="scroll-mt-28 bg-light-gradient section-y">
      <div className="container-page">
        <div className="text-center mb-12 sm:mb-16">
          <p className="mb-3 text-xs font-semibold tracking-[0.35em] text-[#856A2E] uppercase">
            Corporate Solutions
          </p>
          <h2 className="h2-fluid font-bold text-[#0A192C] mb-4 text-balance">
            โซลูชันครบวงจร
            <br />
            สำหรับองค์กรของคุณ
          </h2>
          <p className="lead text-gray-600 max-w-2xl mx-auto text-pretty">
            ค่าใช้จ่ายด้านประกันและสวัสดิการพนักงาน นำมาหักเป็นค่าใช้จ่ายบริษัทได้
            100% ตามที่สรรพากรยอมรับ
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.title}
              className="card-light hover-lift group flex h-full flex-col overflow-hidden"
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
              <div className="flex flex-1 flex-col p-6">
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  {product.description}
                </p>
                <ul className="space-y-2.5">
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
                  className="btn mt-auto w-full border border-[#0A192C] pt-3 text-sm text-[#0A192C] hover:bg-[#0A192C] hover:text-white"
                >
                  {product.cta}
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
