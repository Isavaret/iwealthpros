import { Building2, ClipboardCheck, Target, Footprints } from "lucide-react";

const benefits = [
  {
    icon: Target,
    who: "สำหรับพนักงาน",
    title: "รู้ตัวเลขเกษียณของตัวเอง",
    description:
      "กลับไปพร้อมเป้าหมายเงินเกษียณและยอดออมต่อเดือนที่คำนวณจากชีวิตของตัวเอง ไม่ใช่ตัวเลขกลาง ๆ จากอินเทอร์เน็ต",
  },
  {
    icon: Building2,
    who: "สำหรับองค์กร",
    title: "สวัสดิการความรู้ที่ไม่มีต้นทุน",
    description:
      "มอบความรู้ทางการเงินที่พนักงานนำไปใช้ได้จริงให้ทั้งองค์กร โดยบริษัทไม่มีค่าใช้จ่ายและไม่มีข้อผูกมัด",
  },
  {
    icon: ClipboardCheck,
    who: "สำหรับฝ่าย HR",
    title: "ไม่ต้องเตรียมอะไรเอง",
    description:
      "ทีมงานจัดเตรียมเนื้อหาและวิทยากรให้ พร้อมปรับระดับเนื้อหาให้เหมาะกับพื้นฐานของผู้ฟังในองค์กร",
  },
];

export default function WorkshopBenefits() {
  return (
    <section className="bg-light-gradient section-y">
      <div className="container-page">
        <div className="text-center mb-12 sm:mb-16">
          <p className="mb-3 text-xs font-semibold tracking-[0.35em] text-[#856A2E] uppercase">
            Why this workshop
          </p>
          <h2 className="h2-fluid font-bold text-[#0A192C] mb-4 text-balance">
            ความรู้เรื่องเกษียณ
            <br />
            ที่จบด้วย<span className="text-[#856A2E]">การลงมือทำ</span>
          </h2>
          <p className="lead text-gray-600 max-w-2xl mx-auto text-pretty">
            หลายคนรู้ว่าควรเก็บเงินเพื่อเกษียณ แต่ไม่รู้ว่าต้องเก็บเท่าไร
            และไม่เคยเริ่มจริง workshop นี้ออกแบบมาให้ทุกคนได้ตัวเลขของตัวเอง
            และเริ่มออมได้จริงภายใน workshop เดียว
          </p>
        </div>

        <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.title} className="card-light hover-lift flex flex-col p-6 sm:p-7">
              <div className="w-12 h-12 rounded-xl bg-[#0A192C] flex items-center justify-center mb-5">
                <b.icon size={22} className="text-[#F0DA8F]" />
              </div>
              <p className="text-xs font-semibold tracking-wide text-[#856A2E] mb-1">
                {b.who}
              </p>
              <h3 className="h3-fluid font-bold text-[#0A192C] mb-3">{b.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-[#F7EBC6]/40 border border-[#CBAE6B]/30 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#CBAE6B]/20 flex items-center justify-center flex-shrink-0">
              <Footprints size={24} className="text-[#856A2E]" />
            </div>
            <div>
              <h3 className="font-bold text-[#0A192C] mb-1">
                ไม่ใช่แค่ฟังบรรยายแล้วจบ
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                ช่วงท้ายของ workshop ทีมงาน
                <strong> พาเปิดบัญชีกองทุนเพื่อการเกษียณ</strong> และ
                <strong> เริ่มออมจริง</strong> ไปพร้อมกัน
                ผู้เข้าร่วมไม่ต้องกลับไปหาวิธีทำเองทีหลัง
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
