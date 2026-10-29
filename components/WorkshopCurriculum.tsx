import {
  Compass,
  Calculator,
  CalendarClock,
  Layers,
  FolderOpen,
  PiggyBank,
  ArrowRight,
  BookOpenCheck,
  type LucideIcon,
} from "lucide-react";
import { workshopModules, type WorkshopModule } from "@/lib/workshop";

const icons: Record<WorkshopModule["key"], LucideIcon> = {
  define: Compass,
  target: Calculator,
  monthly: CalendarClock,
  buckets: Layers,
  account: FolderOpen,
  start: PiggyBank,
};

export default function WorkshopCurriculum() {
  return (
    <section
      id="curriculum"
      className="scroll-mt-28 relative overflow-hidden bg-navy-gradient section-y"
    >
      <div className="absolute inset-0 bg-grid-gold pointer-events-none" aria-hidden="true" />

      <div className="container-page relative">
        <div className="text-center mb-12 sm:mb-16">
          <div className="eyebrow mb-6 border border-[#CBAE6B]/30 bg-[#CBAE6B]/10 text-[#F0DA8F]">
            <BookOpenCheck size={16} className="shrink-0 text-[#CBAE6B]" />
            หัวข้อใน Workshop
          </div>
          <h2 className="h2-fluid font-bold text-white mb-4 text-balance">
            6 ขั้นตอน
            <span className="text-gold-metallic"> จากเป้าหมายสู่การออมจริง</span>
          </h2>
          <p className="lead text-white/60 max-w-2xl mx-auto text-pretty">
            เรียงลำดับให้ผู้เข้าร่วมค่อย ๆ เห็นภาพ — เข้าใจเป้าหมาย คำนวณตัวเลข
            จัดสรรเงิน แล้วลงมือทำทันที
          </p>
        </div>

        <ol className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {workshopModules.map((m, i) => {
            const Icon = icons[m.key];
            return (
              <li
                key={m.key}
                className={`card-dark hover-lift relative flex flex-col overflow-hidden border p-6 sm:p-7 ${
                  m.optional ? "!border-dashed !border-[#CBAE6B]/35" : ""
                }`}
              >
                <div className="relative mb-5 flex items-center justify-between gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#CBAE6B]/15 flex items-center justify-center">
                    <Icon size={21} className="text-[#CBAE6B]" />
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/60">
                    ขั้นที่ {i + 1} · {m.phase}
                  </span>
                </div>

                <h3 className="relative text-white font-bold text-lg leading-snug mb-3 text-pretty">
                  {m.title}
                </h3>

                {m.optional && (
                  <p className="relative mb-3 inline-flex w-fit items-center rounded-full bg-[#CBAE6B]/15 px-3 py-1 text-xs font-medium text-[#F0DA8F]">
                    Optional · {m.optional}
                  </p>
                )}

                <p className="relative text-white/60 text-sm leading-relaxed mb-6">
                  {m.description}
                </p>

                <div className="relative mt-auto flex items-start gap-2 border-t border-white/10 pt-4">
                  <ArrowRight size={16} className="mt-0.5 shrink-0 text-[#CBAE6B]" />
                  <p className="text-sm text-white/85">
                    <span className="text-white/45">ได้กลับไป: </span>
                    {m.takeaway}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
