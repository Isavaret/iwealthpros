import { Banknote, Building2, CheckCircle2, LineChart, SlidersHorizontal } from "lucide-react";
import { comparePoints, dataChecklist, reviewSteps } from "@/lib/pvd-review";

const icons = {
  manager: Building2,
  policy: SlidersHorizontal,
  fee: Banknote,
  yield: LineChart,
} as const;

export default function PvdReviewDetails() {
  return (
    <>
      {/* สิ่งที่เทียบ */}
      <section id="compare" className="scroll-mt-28 section-y bg-white">
        <div className="container-page">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="h2-fluid font-bold text-[#0A192C] mb-4 text-balance">
              ข้อเสนอ<span className="text-[#856A2E]">เปรียบเทียบ</span>ให้เห็นอะไรบ้าง
            </h2>
            <p className="lead text-gray-600 text-pretty">
              นำข้อมูลกองทุนที่บริษัทใช้อยู่มาวางคู่กับข้อเสนอของเรา ทีละเรื่อง
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {comparePoints.map((p) => {
              const Icon = icons[p.key];
              return (
                <div key={p.key} className="card-light p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0A192C]">
                    <Icon size={22} className="text-[#F0DA8F]" />
                  </div>
                  <h3 className="mb-2 font-bold text-[#0A192C]">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{p.description}</p>
                </div>
              );
            })}
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-gray-400">
            ผลตอบแทนในอดีตไม่ได้เป็นสิ่งยืนยันผลตอบแทนในอนาคต
            ข้อเสนอจัดทำเพื่อประกอบการตัดสินใจ ไม่ถือเป็นคำแนะนำการลงทุน
          </p>
        </div>
      </section>

      {/* เตรียมข้อมูล + ขั้นตอน */}
      <section className="section-y bg-[#F6F8FB]">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="h3-fluid mb-3 font-bold text-[#0A192C] text-balance">
              ข้อมูลที่ช่วยให้เทียบได้ชัด
            </h2>
            <p className="mb-6 text-gray-600">
              ไม่ต้องครบทุกข้อ มีข้อมูลเท่าไหร่ส่งมาเท่านั้น ทีมงานจะสอบถามส่วนที่ขาดตอนติดต่อกลับ
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {dataChecklist.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-[#0A192C]">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#856A2E]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="h3-fluid mb-6 font-bold text-[#0A192C] text-balance">ขั้นตอน</h2>
            <ol className="space-y-5">
              {reviewSteps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0A192C] text-sm font-bold text-[#F0DA8F]">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-bold text-[#0A192C]">{s.title}</p>
                    <p className="text-sm leading-relaxed text-gray-600">{s.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
