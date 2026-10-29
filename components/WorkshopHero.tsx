import { BadgeCheck, Clock3, Gift, Sparkles } from "lucide-react";
import Image from "next/image";
import AwardBadges from "@/components/AwardBadges";
import { workshopModules } from "@/lib/workshop";

const trustPoints = [
  { icon: Gift, label: "ไม่มีค่าใช้จ่ายสำหรับองค์กร" },
  { icon: BadgeCheck, label: "ไม่มีข้อผูกมัด" },
  { icon: Clock3, label: "ตอบกลับภายใน 24 ชม." },
];

export default function WorkshopHero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-gradient pt-28 pb-16 sm:pt-36 sm:pb-24">
      {/* ฉากหลัง */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-grid-gold" />
        <div className="absolute -top-40 -right-24 w-[38rem] h-[38rem] max-w-[90vw] rounded-full bg-[#CBAE6B]/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-24 w-[28rem] h-[28rem] max-w-[90vw] rounded-full bg-[#24446C]/25 blur-3xl" />
      </div>

      <div className="container-page relative w-full">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/* เนื้อหา */}
          <div>
            <AwardBadges />

            <div className="eyebrow mb-6 border border-[#CBAE6B]/30 bg-[#CBAE6B]/10 text-[#F0DA8F]">
              <Sparkles size={16} className="shrink-0 text-[#CBAE6B]" />
              Corporate Workshop · ฟรีสำหรับองค์กร
            </div>

            <h1 className="h1-fluid font-bold text-white mb-6 text-balance">
              Workshop
              <br />
              <span className="text-gold-metallic">วางแผนเกษียณ</span>
              <br />
              ให้พนักงาน
              <br />
              ทั้งองค์กร
            </h1>

            <p className="lead text-white/70 mb-4 max-w-xl">
              พาพนักงานตั้งแต่{" "}
              <span className="text-white font-semibold">
                รู้ว่าต้องมีเงินเท่าไรในวันเกษียณ
              </span>{" "}
              คำนวณยอดที่ต้องออมแต่ละเดือน ไปจนถึง{" "}
              <span className="text-[#F0DA8F] font-semibold">
                เปิดบัญชีกองทุนและเริ่มออมได้จริง
              </span>
            </p>
            <p className="lead text-white/70 mb-9 max-w-xl">
              ทีม I Wealth Pros จัดเตรียมเนื้อหาและวิทยากรให้ทั้งหมด{" "}
              <span className="text-white font-semibold whitespace-nowrap">
                ฟรี ไม่มีข้อผูกมัด
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a href="#workshop-form" className="btn btn-gold text-base sm:text-lg">
                จัด Workshop ให้องค์กรฟรี
              </a>
              <a href="#curriculum" className="btn btn-ghost-light text-base sm:text-lg">
                ดูหัวข้อ Workshop
              </a>
            </div>

            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
              {trustPoints.map((point) => (
                <li
                  key={point.label}
                  className="flex items-start gap-2 text-sm text-white/55"
                >
                  <point.icon
                    size={15}
                    className="mt-0.5 text-[#CBAE6B] shrink-0"
                  />
                  <span>{point.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* การ์ดกำหนดการ — สรุปหัวข้อทั้งหมดแบบบัตรเชิญ */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div
                className="absolute -inset-3 rounded-[2rem] border border-[#CBAE6B]/20 rotate-2"
                aria-hidden="true"
              />

              <div className="card-dark ring-gold relative overflow-hidden border p-6 shadow-2xl shadow-black/50 sm:p-8">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#CBAE6B]/10 rounded-full blur-2xl" />

                <div className="relative flex items-center gap-4">
                  <Image
                    src="/logo-iwealthpros.jpg"
                    alt="โลโก้ I Wealth Pros"
                    width={128}
                    height={136}
                    sizes="64px"
                    className="logo-glow h-16 w-16 shrink-0 rounded-xl border border-[#CBAE6B]/40 object-cover"
                  />
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.3em] text-[#CBAE6B] uppercase">
                      Retirement Workshop
                    </p>
                    <p className="font-bold text-white leading-snug">
                      หลักสูตรสำหรับพนักงานในองค์กรของคุณ
                    </p>
                  </div>
                </div>

                <div className="rule-gold my-6" />

                <ol className="relative space-y-3.5">
                  {workshopModules.map((m, i) => (
                    <li key={m.key} className="flex items-start gap-3">
                      <span className="mt-0.5 w-7 shrink-0 text-sm font-bold tabular-nums text-gold-metallic">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm leading-relaxed text-white/80">
                        {m.title}
                        {m.optional && (
                          <span className="ml-1.5 whitespace-nowrap rounded-full border border-[#CBAE6B]/30 px-2 py-0.5 text-[11px] text-[#F0DA8F]/80">
                            Optional
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ol>

                <div className="rule-gold my-6" />

                <dl className="relative grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3">
                    <dt className="text-xs text-white/50">ค่าใช้จ่าย</dt>
                    <dd className="text-lg font-bold text-gold-metallic">ฟรี</dd>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3">
                    <dt className="text-xs text-white/50">ข้อผูกมัด</dt>
                    <dd className="text-lg font-bold text-gold-metallic">ไม่มี</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
