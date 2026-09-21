import Image from "next/image";
import { Trophy } from "lucide-react";

const stats = [
  { value: "10+ คน", label: "ขนาดองค์กรที่กฎหมายบังคับ" },
  { value: "100%", label: "เงินสมทบเป็นค่าใช้จ่ายบริษัท" },
  { value: "500,000฿", label: "เพดานลดหย่อนภาษีพนักงาน/ปี" },
];

export default function BrandStrip() {
  return (
    <section className="relative overflow-hidden bg-[#061020] py-14 sm:py-16">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#CBAE6B]/50 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#CBAE6B]/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page relative">
        <div className="flex flex-col items-center gap-9 text-center lg:flex-row lg:items-center lg:gap-14 lg:text-left">
          {/* โลโก้ขนาดใหญ่ */}
          <Image
            src="/logo-iwealthpros.jpg"
            alt="โลโก้ I Wealth Pros"
            width={480}
            height={510}
            sizes="(max-width: 640px) 60vw, (max-width: 1024px) 16rem, 15rem"
            className="logo-glow w-[min(60vw,15rem)] shrink-0 rounded-[1.75rem] border border-[#CBAE6B]/40 object-cover lg:w-60"
          />

          <div className="flex-1">
            <p className="text-xs font-semibold tracking-[0.35em] text-[#CBAE6B]/70 uppercase">
              Wealth with Integrity
            </p>
            <h2 className="h2-fluid mt-3 font-bold text-white">
              ที่ปรึกษาที่องค์กรไทย
              <span className="text-gold-metallic"> ไว้วางใจ</span>
            </h2>
            <div className="rule-gold my-5 lg:max-w-md" />
            <p className="lead max-w-2xl text-white/65">
              เราออกแบบกองทุนสำรองเลี้ยงชีพและสวัสดิการพนักงานให้เหมาะกับขนาดองค์กร
              งบประมาณ และเป้าหมายระยะยาวของธุรกิจคุณ — ตั้งแต่วันจัดตั้งจนถึงวันที่พนักงานเกษียณ
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-2.5 lg:justify-start">
              {["Provident Fund Of the Year 2025", "Provident Fund Of the Year 2022"].map(
                (award) => (
                  <span
                    key={award}
                    className="eyebrow border border-[#CBAE6B]/35 bg-[#CBAE6B]/10 text-[#F0DA8F]"
                  >
                    <Trophy size={14} className="shrink-0 text-[#CBAE6B]" />
                    {award}
                  </span>
                )
              )}
            </div>

            <dl className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4"
                >
                  <dt className="text-xl font-bold text-gold-metallic sm:text-2xl">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-xs leading-relaxed text-white/55">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
