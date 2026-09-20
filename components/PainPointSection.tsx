import { AlertTriangle, Calendar, Building2, Users } from "lucide-react";

export default function PainPointSection() {
  return (
    <section id="pvd" className="scroll-mt-28 bg-light-gradient section-y">
      <div className="container-page">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="eyebrow mb-6 border border-amber-200 bg-amber-50 text-amber-700">
            <AlertTriangle size={16} className="shrink-0 text-amber-600" />
            กฎหมายใหม่ที่นายจ้างต้องรู้
          </div>
          <h2 className="h2-fluid font-bold text-[#0A192C] mb-4 text-balance">
            กองทุนสงเคราะห์ลูกจ้าง
            <br />
            <span className="text-[#856A2E]">เริ่ม 1 ตุลาคม 2569</span>
          </h2>
          <p className="lead text-gray-600 max-w-2xl mx-auto text-pretty">
            ครม. อนุมัติแล้ว — บริษัทที่ยังไม่เตรียมพร้อมอาจต้องแบกรับภาระที่
            ไม่จำเป็น ในขณะที่มีทางเลือกที่ดีกว่าอยู่แล้ว
          </p>
        </div>

        {/* Timeline */}
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="rounded-3xl bg-navy-gradient p-6 sm:p-8 text-white shadow-[var(--shadow-card)] ring-1 ring-[#CBAE6B]/20">
            <h3 className="text-[#CBAE6B] font-semibold text-sm uppercase tracking-wider mb-6">
              ไทม์ไลน์บังคับใช้
            </h3>
            <div className="space-y-6">
              {[
                {
                  date: "1 ต.ค. 2569",
                  detail: "เริ่มหักเงินสะสมและสมทบ",
                  rate: "0.25% ของค่าจ้าง (ทั้งนายจ้างและลูกจ้าง)",
                  highlight: true,
                },
                {
                  date: "1 ต.ค. 2574",
                  detail: "ปรับอัตราเพิ่มขึ้น",
                  rate: "0.5% ของค่าจ้าง (ทั้งนายจ้างและลูกจ้าง)",
                  highlight: false,
                },
              ].map((item) => (
                <div key={item.date} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                        item.highlight ? "bg-[#CBAE6B]" : "bg-white/30"
                      }`}
                    />
                    <div className="w-px flex-1 bg-white/10 mt-2" />
                  </div>
                  <div className="pb-6">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar size={14} className="text-[#CBAE6B]" />
                      <span
                        className={`font-bold text-sm ${
                          item.highlight ? "text-[#CBAE6B]" : "text-white/60"
                        }`}
                      >
                        {item.date}
                      </span>
                    </div>
                    <p className="text-white font-medium mb-1">{item.detail}</p>
                    <p className="text-white/60 text-sm">{item.rate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Who must join */}
          <div className="space-y-4">
            <h3 className="text-[#856A2E] font-semibold text-sm uppercase tracking-wider">
              บริษัทไหนบ้างที่ต้องเข้าร่วม?
            </h3>
            {[
              {
                icon: Building2,
                title: "มีพนักงานตั้งแต่ 10 คนขึ้นไป",
                desc: "สถานประกอบการทุกประเภทที่มีลูกจ้างถึงเกณฑ์",
              },
              {
                icon: Users,
                title: "ยังไม่มีกองทุนสำรองเลี้ยงชีพ (PVD)",
                desc: "บริษัทที่ไม่ได้จัดให้มี PVD ให้แก่พนักงาน",
              },
              {
                icon: AlertTriangle,
                title: "มี PVD แต่ไม่ครอบคลุมพนักงานทุกคน",
                desc: "เช่น พนักงานทดลองงาน หรือพนักงานที่ไม่ได้เลือกเข้า PVD — กลุ่มนี้ต้องเข้ากองทุนสงเคราะห์แทน",
                warning: true,
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`hover-lift flex gap-4 rounded-2xl border p-5 ${
                  item.warning
                    ? "border-amber-200 bg-amber-50/80"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    item.warning ? "bg-amber-100" : "bg-[#0A192C]/5"
                  }`}
                >
                  <item.icon
                    size={20}
                    className={item.warning ? "text-amber-600" : "text-[#0A192C]"}
                  />
                </div>
                <div>
                  <p
                    className={`font-semibold mb-1 ${
                      item.warning ? "text-amber-800" : "text-[#0A192C]"
                    }`}
                  >
                    {item.title}
                  </p>
                  <p
                    className={`text-sm leading-relaxed ${
                      item.warning ? "text-amber-700" : "text-gray-600"
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
