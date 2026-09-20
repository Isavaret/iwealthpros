"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, CheckCircle2, Loader2, FileText } from "lucide-react";

/** แบบฟอร์มนี้อ้างอิงจาก "รายละเอียดลูกค้าสำหรับการออกข้อเสนอกองทุนสำรองเลี้ยงชีพ"
 *  (Requisition for Provident Fund Proposal) */
const schema = z.object({
  proposal_language: z.enum(["th", "en"]),

  company_name: z.string().min(2, "กรุณาระบุชื่อบริษัท"),
  contact_person: z.string().min(2, "กรุณาระบุชื่อผู้ติดต่อ"),
  position: z.string().optional(),
  company_address: z.string().optional(),
  phone: z
    .string()
    .min(9, "กรุณาระบุเบอร์โทรที่ถูกต้อง")
    .regex(/^[0-9+\-\s()]+$/, "รูปแบบเบอร์โทรไม่ถูกต้อง"),
  business_type: z.string().optional(),
  employees_count: z.string().optional(),
  total_basic_salary: z.string().optional(),
  email: z.string().email("รูปแบบอีเมลไม่ถูกต้อง"),

  has_existing_pvd: z.boolean(),
  pvd_data_as_of: z.string().optional(),
  pvd_fund_size: z.string().optional(),
  pvd_monthly_contribution: z.string().optional(),
  pvd_members_count: z.string().optional(),
  pvd_current_manager: z.string().optional(),
  pvd_investment_policy: z.string().optional(),
  pvd_management_fee: z.string().optional(),
  pvd_ytd_yield: z.string().optional(),

  has_group_insurance: z.boolean(),
  group_insurance_company: z.string().optional(),

  message: z.string().optional(),
  website: z.string().optional(), // honeypot
});

type FormData = z.infer<typeof schema>;

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#CBAE6B] focus:ring-2 focus:ring-[#CBAE6B]/20 text-[#0A192C] placeholder:text-gray-400 transition";

function Field({
  label,
  en,
  required,
  error,
  children,
}: {
  label: string;
  en?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#0A192C] mb-1.5">
        {label}
        {en && <span className="text-gray-400 font-normal"> / {en}</span>}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-red-500 text-xs">{error}</p>}
    </div>
  );
}

function SectionTitle({
  step,
  label,
  en,
}: {
  step: number;
  label: string;
  en: string;
}) {
  return (
    <div className="flex items-center gap-3 pt-2">
      <span className="w-7 h-7 rounded-lg bg-[#0A192C] text-[#F0DA8F] text-sm font-bold flex items-center justify-center flex-shrink-0">
        {step}
      </span>
      <div>
        <p className="font-bold text-[#0A192C] leading-tight">{label}</p>
        <p className="text-gray-400 text-xs">{en}</p>
      </div>
    </div>
  );
}

export default function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      proposal_language: "th",
      has_existing_pvd: false,
      has_group_insurance: false,
    },
  });

  const hasExistingPvd = watch("has_existing_pvd");
  const hasGroupInsurance = watch("has_group_insurance");

  async function onSubmit(data: FormData) {
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
      id="contact-form"
      className="scroll-mt-28 section-y bg-gradient-to-b from-[#F6F8FB] to-white"
    >
      <div className="container-page max-w-3xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="eyebrow mb-6 bg-[#0A192C] text-[#F0DA8F]">
            <FileText size={15} className="shrink-0" />
            ขอข้อเสนอกองทุนสำรองเลี้ยงชีพ
          </div>
          <h2 className="h2-fluid font-bold text-[#0A192C] mb-4 text-balance">
            รับข้อเสนอ<span className="text-[#856A2E]">ฟรี</span> ไม่มีค่าใช้จ่าย
          </h2>
          <p className="lead text-gray-600 max-w-xl mx-auto text-pretty">
            กรอกรายละเอียดบริษัทตามแบบฟอร์มด้านล่าง
            ทีมงานจะจัดทำข้อเสนอกองทุนสำรองเลี้ยงชีพให้เหมาะกับองค์กรของคุณ
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
              ได้รับข้อมูลเรียบร้อยแล้ว
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              ขอบคุณที่สนใจบริการของ I Wealth Pros
              <br />
              ทีมงานจะจัดทำข้อเสนอและติดต่อกลับภายใน 24 ชั่วโมงทำการ
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-[#856A2E] text-sm font-semibold hover:underline"
            >
              ส่งข้อมูลอีกครั้ง
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

            {/* ภาษาข้อเสนอ */}
            <div>
              <p className="text-sm font-medium text-[#0A192C] mb-3">
                ต้องการข้อเสนอเป็นภาษา
                <span className="text-gray-400 font-normal"> / Proposal language</span>
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "th", label: "ต้องการข้อเสนอภาษาไทย" },
                  { value: "en", label: "Proposal requested in English" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-gray-200 cursor-pointer hover:border-[#CBAE6B] transition has-[:checked]:border-[#CBAE6B] has-[:checked]:bg-[#F7EBC6]/30"
                  >
                    <input
                      type="radio"
                      value={opt.value}
                      className="accent-[#856A2E] w-4 h-4"
                      {...register("proposal_language")}
                    />
                    <span className="text-sm text-[#0A192C]">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="h-px bg-gray-100" />

            {/* 1. ข้อมูลบริษัท */}
            <SectionTitle
              step={1}
              label="ข้อมูลบริษัท"
              en="Company information"
            />

            <div className="grid sm:grid-cols-2 gap-5">
              <Field
                label="ชื่อบริษัท"
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

            <Field label="ที่อยู่บริษัท" en="Address">
              <textarea
                rows={2}
                placeholder="เลขที่ ถนน แขวง/ตำบล เขต/อำเภอ จังหวัด รหัสไปรษณีย์"
                className={`${inputClass} resize-none`}
                {...register("company_address")}
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

              <Field label="จำนวนพนักงาน" en="No. of Employees">
                <input
                  type="number"
                  min={0}
                  placeholder="เช่น 50"
                  className={inputClass}
                  {...register("employees_count")}
                />
              </Field>
            </div>

            <Field
              label="เงินเดือนพื้นฐานรวมจ่ายต่อเดือน (ไม่รวมโอที/โบนัส)"
              en="Total Basic Salary per month (excl. OT/Bonus)"
            >
              <input
                type="number"
                min={0}
                step="0.01"
                placeholder="ระบุเป็นบาท เช่น 1500000"
                className={inputClass}
                {...register("total_basic_salary")}
              />
            </Field>

            <Field
              label="ให้ส่งข้อเสนอไปที่อีเมล"
              en="Send the proposal via Email at"
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

            <div className="h-px bg-gray-100" />

            {/* 2. กรณีมี PVD อยู่แล้ว */}
            <SectionTitle
              step={2}
              label="กรณีบริษัทมีกองทุนสำรองเลี้ยงชีพแล้ว"
              en="With an existing provident fund"
            />

            <label className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-gray-200 cursor-pointer hover:border-[#CBAE6B] transition has-[:checked]:border-[#CBAE6B] has-[:checked]:bg-[#F7EBC6]/30">
              <input
                type="checkbox"
                className="accent-[#856A2E] w-4 h-4"
                {...register("has_existing_pvd")}
              />
              <span className="text-sm text-[#0A192C]">
                บริษัทมีกองทุนสำรองเลี้ยงชีพอยู่แล้ว
                <span className="text-gray-400"> (ติ๊กเพื่อกรอกข้อมูลกองทุนปัจจุบัน)</span>
              </span>
            </label>

            {hasExistingPvd && (
              <div className="grid sm:grid-cols-2 gap-5 rounded-xl bg-gray-50 border border-gray-100 p-5">
                <Field label="ข้อมูล ณ วันที่" en="Data as of">
                  <input
                    type="date"
                    className={inputClass}
                    {...register("pvd_data_as_of")}
                  />
                </Field>

                <Field label="มูลค่าทรัพย์สินสุทธิ" en="Fund Size">
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    placeholder="บาท"
                    className={inputClass}
                    {...register("pvd_fund_size")}
                  />
                </Field>

                <Field label="เงินกองทุนนำส่งต่อเดือน" en="Monthly Contribution">
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    placeholder="บาท"
                    className={inputClass}
                    {...register("pvd_monthly_contribution")}
                  />
                </Field>

                <Field label="จำนวนสมาชิก" en="No. of Members">
                  <input
                    type="number"
                    min={0}
                    placeholder="คน"
                    className={inputClass}
                    {...register("pvd_members_count")}
                  />
                </Field>

                <Field label="บริษัทจัดการปัจจุบัน" en="Existing Fund Manager">
                  <input
                    type="text"
                    placeholder="ชื่อ บลจ."
                    className={inputClass}
                    {...register("pvd_current_manager")}
                  />
                </Field>

                <Field label="นโยบายการลงทุนปัจจุบัน" en="Current Investment Policy">
                  <input
                    type="text"
                    placeholder="เช่น ตราสารหนี้ 80% / ตราสารทุน 20%"
                    className={inputClass}
                    {...register("pvd_investment_policy")}
                  />
                </Field>

                <Field label="ค่าจัดการกองทุน (%)" en="Management Fee (%)">
                  <input
                    type="number"
                    min={0}
                    step="0.001"
                    placeholder="เช่น 0.45"
                    className={inputClass}
                    {...register("pvd_management_fee")}
                  />
                </Field>

                <Field label="อัตราผลตอบแทน (%)" en="YTD Net Yield (%)">
                  <input
                    type="number"
                    step="0.001"
                    placeholder="เช่น 3.25"
                    className={inputClass}
                    {...register("pvd_ytd_yield")}
                  />
                </Field>
              </div>
            )}

            <div className="h-px bg-gray-100" />

            {/* 3. ประกันชีวิตกลุ่ม */}
            <SectionTitle
              step={3}
              label="ประกันชีวิตกลุ่มสำหรับพนักงาน"
              en="Group Insurance provided to employees"
            />

            <label className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-gray-200 cursor-pointer hover:border-[#CBAE6B] transition has-[:checked]:border-[#CBAE6B] has-[:checked]:bg-[#F7EBC6]/30">
              <input
                type="checkbox"
                className="accent-[#856A2E] w-4 h-4"
                {...register("has_group_insurance")}
              />
              <span className="text-sm text-[#0A192C]">
                มีประกันชีวิตกลุ่มให้พนักงานแล้ว
                <span className="text-gray-400"> (ไม่ติ๊ก = ยังไม่มี)</span>
              </span>
            </label>

            {hasGroupInsurance && (
              <Field label="ทำอยู่กับบริษัท" en="Insured with">
                <input
                  type="text"
                  placeholder="ชื่อบริษัทประกัน"
                  className={inputClass}
                  {...register("group_insurance_company")}
                />
              </Field>
            )}

            <div className="h-px bg-gray-100" />

            <Field label="ข้อมูลเพิ่มเติม" en="Additional notes">
              <textarea
                rows={3}
                placeholder="ระบุสิ่งที่ต้องการปรึกษา หรือข้อมูลเพิ่มเติม..."
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
              ส่งข้อมูลเพื่อขอข้อเสนอ
            </button>

            <p className="text-center text-gray-400 text-xs leading-relaxed">
              ข้อมูลของคุณจะถูกใช้เพื่อจัดทำข้อเสนอกองทุนสำรองเลี้ยงชีพเท่านั้น
              และไม่ถูกเปิดเผยต่อบุคคลภายนอก
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
