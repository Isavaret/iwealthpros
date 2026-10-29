"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, CheckCircle2, Loader2, Presentation } from "lucide-react";
import { Field, SectionTitle, choiceClass, inputClass } from "@/components/FormFields";

/** ฟอร์มขอจัด workshop — ส่งเข้า /api/leads ตัวเดียวกับฟอร์มขอข้อเสนอ PVD โดยติดป้าย interest */
const schema = z.object({
  company_name: z.string().min(2, "กรุณาระบุชื่อบริษัท / องค์กร"),
  contact_person: z.string().min(2, "กรุณาระบุชื่อผู้ติดต่อ"),
  position: z.string().optional(),
  phone: z
    .string()
    .min(9, "กรุณาระบุเบอร์โทรที่ถูกต้อง")
    .regex(/^[0-9+\-\s()]+$/, "รูปแบบเบอร์โทรไม่ถูกต้อง"),
  email: z.string().email("รูปแบบอีเมลไม่ถูกต้อง"),
  business_type: z.string().optional(),
  employees_count: z.string().optional(),

  workshop_participants: z.string().optional(),
  workshop_format: z.enum(["onsite", "online", "undecided"]),
  workshop_preferred_period: z.string().optional(),
  has_existing_pvd: z.boolean(),

  message: z.string().optional(),
  website: z.string().optional(), // honeypot
});

type FormData = z.infer<typeof schema>;

const formatOptions: { value: FormData["workshop_format"]; label: string }[] = [
  { value: "onsite", label: "จัดที่บริษัท" },
  { value: "online", label: "ออนไลน์" },
  { value: "undecided", label: "ยังไม่แน่ใจ" },
];

export default function WorkshopForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      workshop_format: "onsite",
      has_existing_pvd: false,
    },
  });

  async function onSubmit(data: FormData) {
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, interest: "retirement_workshop" }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
      }
      setSubmitted(true);
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด กรุณาลองใหม่");
    }
  }

  return (
    <section
      id="workshop-form"
      className="scroll-mt-28 section-y bg-gradient-to-b from-[#F6F8FB] to-white"
    >
      <div className="container-page max-w-3xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="eyebrow mb-6 bg-[#0A192C] text-[#F0DA8F]">
            <Presentation size={15} className="shrink-0" />
            ขอจัด Workshop วางแผนเกษียณ
          </div>
          <h2 className="h2-fluid font-bold text-[#0A192C] mb-4 text-balance">
            จัด Workshop ให้องค์กร<span className="text-[#856A2E]">ฟรี</span>
          </h2>
          <p className="lead text-gray-600 max-w-xl mx-auto text-pretty">
            กรอกข้อมูลด้านล่าง ทีมงานจะติดต่อกลับเพื่อนัดวันและออกแบบเนื้อหาให้เหมาะกับพนักงานของคุณ
            ไม่มีค่าใช้จ่ายและไม่มีข้อผูกมัด
          </p>
          <p className="inline-flex items-center gap-1.5 text-gray-500 text-sm mt-4">
            <Clock size={15} className="text-[#856A2E]" />
            ทีมงานติดต่อกลับภายใน 24 ชั่วโมงทำการ
          </p>
        </div>

        {submitted ? (
          <div className="card-light p-8 text-center sm:p-10">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 size={32} className="text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-[#0A192C] mb-2">
              ได้รับคำขอจัด Workshop แล้ว
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              ขอบคุณที่สนใจ Workshop วางแผนเกษียณของ I Wealth Pros
              <br />
              ทีมงานจะติดต่อกลับเพื่อนัดวันภายใน 24 ชั่วโมงทำการ
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-[#856A2E] text-sm font-semibold hover:underline"
            >
              ส่งคำขออีกครั้ง
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-light space-y-7 p-5 sm:p-8"
          >
            {/* honeypot — ซ่อนจากผู้ใช้จริง */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              {...register("website")}
            />

            {/* 1. ข้อมูลองค์กร */}
            <SectionTitle step={1} label="ข้อมูลองค์กร" en="Company information" />

            <div className="grid sm:grid-cols-2 gap-5">
              <Field
                label="ชื่อบริษัท / องค์กร"
                en="Company's Name"
                required
                error={errors.company_name?.message}
              >
                <input
                  type="text"
                  placeholder="บริษัท ตัวอย่าง จำกัด"
                  className={inputClass}
                  {...register("company_name")}
                />
              </Field>

              <Field
                label="ชื่อผู้ติดต่อ"
                en="Contact Person"
                required
                error={errors.contact_person?.message}
              >
                <input
                  type="text"
                  placeholder="ชื่อ-นามสกุล"
                  className={inputClass}
                  {...register("contact_person")}
                />
              </Field>

              <Field label="ตำแหน่ง" en="Position">
                <input
                  type="text"
                  placeholder="เช่น ผู้จัดการฝ่ายบุคคล"
                  className={inputClass}
                  {...register("position")}
                />
              </Field>

              <Field
                label="เบอร์โทร"
                en="Tel. No."
                required
                error={errors.phone?.message}
              >
                <input
                  type="tel"
                  placeholder="08X-XXX-XXXX"
                  className={inputClass}
                  {...register("phone")}
                />
              </Field>
            </div>

            <Field
              label="อีเมล"
              en="Email"
              required
              error={errors.email?.message}
            >
              <input
                type="email"
                placeholder="hr@company.com"
                className={inputClass}
                {...register("email")}
              />
            </Field>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="ประเภทธุรกิจ" en="Type of Business">
                <input
                  type="text"
                  placeholder="เช่น ผลิตชิ้นส่วนยานยนต์"
                  className={inputClass}
                  {...register("business_type")}
                />
              </Field>

              <Field label="จำนวนพนักงานทั้งหมด" en="No. of Employees">
                <input
                  type="number"
                  min={0}
                  placeholder="เช่น 50"
                  className={inputClass}
                  {...register("employees_count")}
                />
              </Field>
            </div>

            <div className="h-px bg-gray-100" />

            {/* 2. รายละเอียด workshop */}
            <SectionTitle step={2} label="รายละเอียด Workshop" en="Workshop details" />

            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="จำนวนผู้เข้าร่วมโดยประมาณ" en="Participants">
                <input
                  type="number"
                  min={0}
                  placeholder="เช่น 30"
                  className={inputClass}
                  {...register("workshop_participants")}
                />
              </Field>

              <Field label="ช่วงเวลาที่สะดวก" en="Preferred date / time">
                <input
                  type="text"
                  placeholder="เช่น ต้นเดือน ธ.ค. ช่วงบ่าย"
                  className={inputClass}
                  {...register("workshop_preferred_period")}
                />
              </Field>
            </div>

            <div>
              <p className="text-sm font-medium text-[#0A192C] mb-3">
                รูปแบบที่สะดวก
                <span className="text-gray-400 font-normal"> / Format</span>
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {formatOptions.map((opt) => (
                  <label key={opt.value} className={choiceClass}>
                    <input
                      type="radio"
                      value={opt.value}
                      className="accent-[#856A2E] w-4 h-4"
                      {...register("workshop_format")}
                    />
                    <span className="text-sm text-[#0A192C]">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <label className={choiceClass}>
              <input
                type="checkbox"
                className="accent-[#856A2E] w-4 h-4"
                {...register("has_existing_pvd")}
              />
              <span className="text-sm text-[#0A192C]">
                บริษัทมีกองทุนสำรองเลี้ยงชีพ (PVD) ให้พนักงานอยู่แล้ว
              </span>
            </label>

            <div className="h-px bg-gray-100" />

            <Field label="ข้อมูลเพิ่มเติม" en="Additional notes">
              <textarea
                rows={3}
                placeholder="เช่น กลุ่มพนักงานที่ต้องการให้เข้าร่วม หรือหัวข้อที่อยากเน้นเป็นพิเศษ"
                className={`${inputClass} resize-none`}
                {...register("message")}
              />
            </Field>

            {error && (
              <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-gold w-full !rounded-2xl text-base disabled:opacity-60"
            >
              {isSubmitting && <Loader2 size={18} className="animate-spin" />}
              ส่งคำขอจัด Workshop ฟรี
            </button>

            <p className="text-center text-gray-400 text-xs leading-relaxed">
              ข้อมูลของคุณจะถูกใช้เพื่อติดต่อนัดหมายการจัด workshop เท่านั้น
              และไม่ถูกเปิดเผยต่อบุคคลภายนอก
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
