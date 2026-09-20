import { Trophy, ChevronDown, ShieldCheck, Clock3 } from "lucide-react";
import Image from "next/image";

const awards = [
  "Provident Fund Of the Year 2025",
  "Provident Fund Of the Year 2022",
];

const trustPoints = [
  { icon: ShieldCheck, label: "ที่ปรึกษาที่ได้รับใบอนุญาต" },
  { icon: Clock3, label: "ตอบกลับภายใน 24 ชม." },
  { icon: Trophy, label: "รางวัลระดับประเทศ 2 ปี" },
];

export default function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy-gradient pt-28 pb-20 sm:pt-32">
      {/* ฉากหลัง */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-grid-gold" />
        <div className="absolute -top-40 -right-24 w-[38rem] h-[38rem] max-w-[90vw] rounded-full bg-[#CBAE6B]/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-24 w-[28rem] h-[28rem] max-w-[90vw] rounded-full bg-[#24446C]/25 blur-3xl" />

        {/* โลโก้ขนาดใหญ่เป็นลายน้ำ — mix-blend-screen ทำให้พื้นกรมท่าของไฟล์โลโก้กลืนไปกับพื้นหลัง เหลือแต่เส้นทอง */}
        <div
          className="absolute -right-24 top-1/2 aspect-[5/3] w-[min(85vw,42rem)] -translate-y-[55%] overflow-hidden opacity-[0.2] mix-blend-screen [mask-image:radial-gradient(circle_at_center,black_30%,transparent_65%)] [-webkit-mask-image:radial-gradient(circle_at_center,black_30%,transparent_65%)]">
          <Image
            src="/logo-iwealthpros.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 85vw, 42rem"
            className="object-cover object-top"
          />
        </div>
      </div>

      <div className="container-page relative w-full">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* เนื้อหา */}
          <div className="order-2 lg:order-1">
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-7">
              {awards.map((award) => (
                <div
                  key={award}
                  className="eyebrow border border-[#CBAE6B]/40 bg-[#CBAE6B]/10 text-[#F0DA8F] !px-3 !text-xs"
                >
                  <Trophy size={14} className="text-[#CBAE6B] shrink-0" />
                  <span>{award}</span>
                </div>
              ))}
            </div>

            <h1 className="h1-fluid font-bold text-white mb-6 text-balance">
              บริษัทคุณ
              <br />
              <span className="text-gold-metallic">พร้อมรับมือ</span>
              <br />
              กองทุนสงเคราะห์
              <br />
              ลูกจ้างหรือยัง?
            </h1>

            <p className="lead text-white/70 mb-4 max-w-xl">
              กฎหมายกำหนดให้บริษัทที่มีพนักงาน{" "}
              <span className="text-white font-semibold">ตั้งแต่ 10 คนขึ้นไป</span>{" "}
              ต้องเข้าร่วมกองทุนสงเคราะห์ลูกจ้างภายใน{" "}
              <span className="text-[#F0DA8F] font-semibold">1 ตุลาคม 2569</span>
            </p>
            <p className="lead text-white/70 mb-9 max-w-xl">
              แต่มีทางออกที่{" "}
              <span className="text-white font-semibold">ดีกว่า</span> —
              กองทุนสำรองเลี้ยงชีพ (PVD) ที่บริษัทจัดให้แก่พนักงาน{" "}
              <span className="text-[#F0DA8F] font-semibold">
                ยกเว้นการเข้ากองทุนสงเคราะห์โดยอัตโนมัติ
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a href="#contact-form" className="btn btn-gold text-base sm:text-lg">
                รับคำปรึกษาฟรี
              </a>
              <a href="#pvd" className="btn btn-ghost-light text-base sm:text-lg">
                ดูรายละเอียด
              </a>
            </div>

            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
              {trustPoints.map((point) => (
                <li
                  key={point.label}
                  className="flex items-center gap-2 text-sm text-white/55"
                >
                  <point.icon size={15} className="text-[#CBAE6B] shrink-0" />
                  {point.label}
                </li>
              ))}
            </ul>
          </div>

          {/* ภาพที่ปรึกษา + ตราโลโก้ */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-[min(20rem,82vw)] sm:w-[22rem]">
              <div
                className="absolute -inset-3 rounded-[2rem] border border-[#CBAE6B]/25 rotate-3"
                aria-hidden="true"
              />
              <div
                className="absolute -inset-6 rounded-[2.5rem] border border-[#CBAE6B]/10 -rotate-2"
                aria-hidden="true"
              />

              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-[#CBAE6B]/25 bg-[#132845] shadow-2xl shadow-black/50">
                <Image
                  src="/profile.png"
                  alt="ที่ปรึกษาของ I Wealth Pros"
                  fill
                  sizes="(max-width: 640px) 82vw, 22rem"
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end bg-gradient-to-t from-[#061020] via-[#061020]/80 to-transparent p-5 pt-14">
                  <div className="w-full text-center">
                    <p className="text-[#F0DA8F] font-semibold text-sm">
                      I Wealth Pros Advisory
                    </p>
                    <p className="text-white/60 text-xs">
                      ที่ปรึกษาการเงินและการลงทุน
                    </p>
                  </div>
                </div>
              </div>

              {/* ตราโลโก้ซ้อนมุมบน */}
              <div className="logo-glow absolute -top-5 -left-5 h-20 w-20 overflow-hidden rounded-2xl border border-[#CBAE6B]/40 sm:-top-7 sm:-left-7 sm:h-28 sm:w-28">
                <Image
                  src="/logo-iwealthpros.jpg"
                  alt="โลโก้ I Wealth Pros"
                  width={224}
                  height={238}
                  sizes="(max-width: 640px) 80px, 112px"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ตัวบอกให้เลื่อนลง — ซ่อนบนจอเตี้ยเพื่อไม่ให้ทับปุ่ม */}
      <div className="absolute bottom-9 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-white/35 lg:flex">
        <span className="text-xs">เลื่อนดูเพิ่มเติม</span>
        <ChevronDown size={18} className="animate-bounce" />
      </div>
    </section>
  );
}
