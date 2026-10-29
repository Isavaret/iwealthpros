import { FilePenLine, PhoneCall, SlidersHorizontal, Presentation } from "lucide-react";

const steps = [
  {
    icon: FilePenLine,
    title: "กรอกฟอร์มด้านล่าง",
    description: "แจ้งชื่อองค์กร ผู้ติดต่อ และจำนวนผู้เข้าร่วมโดยประมาณ",
  },
  {
    icon: PhoneCall,
    title: "ทีมงานติดต่อกลับ",
    description: "ภายใน 24 ชั่วโมงทำการ เพื่อสอบถามรายละเอียดและพื้นฐานของผู้ฟัง",
  },
  {
    icon: SlidersHorizontal,
    title: "นัดวันและปรับเนื้อหา",
    description: "เลือกวันที่สะดวก และปรับระดับเนื้อหาให้เหมาะกับพนักงานในองค์กร",
  },
  {
    icon: Presentation,
    title: "จัด Workshop",
    description: "บรรยาย คำนวณตัวเลขของแต่ละคน พาเปิดบัญชีกองทุน และเริ่มออม",
  },
];

export default function WorkshopProcess() {
  return (
    <section className="bg-white section-y">
      <div className="container-page">
        <div className="text-center mb-12 sm:mb-14">
          <p className="mb-3 text-xs font-semibold tracking-[0.35em] text-[#856A2E] uppercase">
            How it works
          </p>
          <h2 className="h2-fluid font-bold text-[#0A192C] mb-4 text-balance">
            จัด Workshop ให้องค์กร
            <br />
            ง่ายใน <span className="text-[#856A2E]">4 ขั้นตอน</span>
          </h2>
        </div>

        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="relative">
              {/* เส้นเชื่อมระหว่างขั้นตอน — แสดงเฉพาะเดสก์ท็อปที่เรียงเป็นแถวเดียว */}
              {i < steps.length - 1 && (
                <div
                  className="absolute top-7 left-[calc(50%+2.25rem)] hidden h-px w-[calc(100%-4.5rem)] bg-gradient-to-r from-[#CBAE6B]/60 to-[#CBAE6B]/10 lg:block"
                  aria-hidden="true"
                />
              )}
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#0A192C] flex items-center justify-center shadow-lg shadow-[#0A192C]/20">
                    <s.icon size={24} className="text-[#F0DA8F]" />
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold-metallic text-xs font-bold text-[#0A192C]">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-bold text-[#0A192C] mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed max-w-[16rem]">
                  {s.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-14 relative overflow-hidden rounded-3xl bg-navy-gradient p-7 ring-1 ring-[#CBAE6B]/25 sm:p-10">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#CBAE6B]/10 rounded-full blur-3xl" />
          <div className="relative flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
            <div>
              <p className="text-xl font-bold text-white sm:text-2xl">
                บริการจัดทำให้<span className="text-gold-metallic"> ฟรี </span>
                ไม่มีข้อผูกมัด
              </p>
              <p className="mt-2 text-white/60 text-sm sm:text-base">
                องค์กรไม่มีค่าใช้จ่าย — ทีมงานเตรียมเนื้อหาและวิทยากรให้ครบ
              </p>
            </div>
            <a href="#workshop-form" className="btn btn-gold shrink-0 text-base">
              จองวันจัด Workshop
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
