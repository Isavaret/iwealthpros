import Link from "next/link";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faqs } from "@/lib/faqs";

export default function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-28 bg-light-gradient section-y">
      <div className="container-page">
        <div className="text-center mb-12 sm:mb-14">
          <div className="eyebrow mb-6 border border-[#CBAE6B]/30 bg-[#CBAE6B]/10 text-[#856A2E]">
            <HelpCircle size={16} className="shrink-0 text-[#856A2E]" />
            คำถามที่พบบ่อย
          </div>
          <h2 className="h2-fluid font-bold text-[#0A192C] mb-4 text-balance">
            เรื่อง PVD ที่นายจ้าง
            <br />
            ถามเรามากที่สุด
          </h2>
          <p className="lead text-gray-600 max-w-2xl mx-auto text-pretty">
            รวมคำตอบสั้น ๆ เรื่องกองทุนสำรองเลี้ยงชีพ กองทุนสงเคราะห์ลูกจ้าง
            และสิทธิประโยชน์ทางภาษีขององค์กร
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq) => (
            /* ใช้ details/summary — เปิดอ่านได้โดยไม่ต้องใช้ JS และ crawler เห็นคำตอบเสมอ */
            <details
              key={faq.question}
              name="faq"
              className="card-light group overflow-hidden px-5 py-1 sm:px-6"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-semibold text-[#0A192C] [&::-webkit-details-marker]:hidden">
                <h3 className="text-sm sm:text-base">{faq.question}</h3>
                <ChevronDown
                  size={18}
                  className="shrink-0 text-[#856A2E] transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <p className="border-t border-[#0A192C]/8 pt-4 pb-5 text-sm leading-relaxed text-gray-600">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-gray-600">
          ยังไม่เจอคำตอบที่ต้องการ?{" "}
          <Link
            href="#contact-form"
            className="font-semibold text-[#856A2E] underline underline-offset-4 hover:text-[#0A192C]"
          >
            ขอคำปรึกษาฟรี ทีมงานตอบกลับภายใน 24 ชั่วโมง
          </Link>
        </p>
      </div>
    </section>
  );
}
