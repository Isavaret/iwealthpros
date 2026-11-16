"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, type UseFormRegister } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { trackLead } from "@/lib/lead-tracking";
import { Clock, CheckCircle2, Loader2, FileText, ChevronDown } from "lucide-react";
import { Field, SectionTitle, choiceClass, inputClass } from "@/components/FormFields";
import QuickContact from "@/components/QuickContact";

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
type Register = UseFormRegister<FormData>;

/**
 * variant
 * - "new"    หน้าแรก: บริษัทที่ยังไม่มี PVD — ข้อมูลกองทุนเดิมซ่อนอยู่ในส่วน "ไม่บังคับ"
 * - "review" หน้า /pvd-review: บริษัทที่มี PVD แล้ว — โชว์ 4 ช่องที่โฆษณาสัญญาไว้ (บลจ. นโยบาย ค่าจัดการ ผลตอบแทน) ทันที
 */
export type LeadFormVariant = "new" | "review";

const copy = {
  new: {
    eyebrow: "ขอข้อเสนอกองทุนสำรองเลี้ยงชีพ",
    lead: "กรอกแค่ 4 ช่องที่มีเครื่องหมาย * ก็ส่งได้ ทีมงานจะจัดทำข้อเสนอกองทุนสำรองเลี้ยงชีพให้เหมาะกับองค์กรของคุณ",
    submit: "ส่งข้อมูลเพื่อขอข้อเสนอ",
  },
  review: {
    eyebrow: "ขอข้อเสนอเปรียบเทียบ PVD",
    lead: "กรอกแค่ 4 ช่องที่มีเครื่องหมาย * ก็ส่งได้ ข้อมูลกองทุนปัจจุบันไม่บังคับ แต่ยิ่งกรอกได้มาก ข้อเสนอก็ยิ่งเทียบได้ชัด",
    submit: "ส่งข้อมูลเพื่อขอข้อเสนอเปรียบเทียบ",
  },
} as const;

export default function LeadForm({ variant = "new" }: { variant?: LeadFormVariant }) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const text = copy[variant];
  const isReview = variant === "review";

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
      has_existing_pvd: isReview,
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
      // conversion สำหรับ GTM (Custom Event generate_lead) + Enhanced Conversions
      trackLead("provident_fund", { email: data.email, phone: data.phone });
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
            {text.eyebrow}
          </div>
          <h2 className="h2-fluid font-bold text-[#0A192C] mb-4 text-balance">
            รับข้อเสนอ<span className="text-[#856A2E]">ฟรี</span> ไม่มีค่าใช้จ่าย
          </h2>
          <p className="lead text-gray-600 max-w-xl mx-auto text-pretty">{text.lead}</p>
          <p className="inline-flex items-center gap-1.5 text-gray-500 text-sm mt-4">
            <Clock size={15} className="text-[#856A2E]" />
            ทีมงานติดต่อกลับภายใน 24 ชั่วโมงทำการ
          </p>
          <QuickContact
            tone="light"
            label="ไม่สะดวกกรอกฟอร์ม? ทักหรือโทรหาเราได้เลย"
            className="mt-5 justify-center"
          />
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

            {/* ช่องบังคับ 4 ช่อง — ส่งได้ทันทีโดยไม่ต้องเปิดส่วนอื่น */}
            <SectionTitle step={1} label="ข้อมูลติดต่อ" en="Contact details" />

            <div className="grid sm:grid-cols-2 gap-5">
              <Field
                label="ชื่อบริษัท"
                en="Company's Name"
                required
                error={errors.company_name?.message}
              >
                <input
                  type="text"
                  autoComplete="organization"
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
                  autoComplete="name"
                  placeholder="ชื่อ-นามสกุล"
                  className={inputClass}
                  {...register("contact_person")}
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
                  autoComplete="tel"
                  placeholder="08X-XXX-XXXX"
                  className={inputClass}
                  {...register("phone")}
                />
              </Field>

              <Field
                label="ให้ส่งข้อเสนอไปที่อีเมล"
                en="Email"
                required
                error={errors.email?.message}
              >
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="hr@company.com"
                  className={inputClass}
                  {...register("email")}
                />
              </Field>
            </div>

            {/* /pvd-review: 4 ช่องที่โฆษณาสัญญาไว้ แสดงทันที (ไม่บังคับ) */}
            {isReview && (
              <>
                <div className="h-px bg-gray-100" />
                <SectionTitle
                  step={2}
                  label="ข้อมูลกองทุนปัจจุบัน (ไม่บังคับ)"
                  en="Your existing provident fund (optional)"
                />
                <div className="grid sm:grid-cols-2 gap-5">
                  <PvdKeyFields register={register} />
                </div>
              </>
            )}

            {/* ส่วนเสริม — ปิดไว้ก่อนเพื่อให้ฟอร์มดูสั้น แต่ช่องยังอยู่ใน DOM จึงส่งค่าได้ตามปกติ */}
            <details className="group rounded-2xl border border-gray-200 open:bg-gray-50/60">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-[#0A192C] [&::-webkit-details-marker]:hidden">
                <span>
                  {isReview
                    ? "เพิ่มรายละเอียดกองทุนและบริษัท"
                    : "เพิ่มรายละเอียดบริษัท ให้ข้อเสนอแม่นยำขึ้น"}
                  <span className="font-normal text-gray-400"> (ไม่บังคับ)</span>
                </span>
                <ChevronDown
                  size={18}
                  className="shrink-0 text-[#856A2E] transition-transform group-open:rotate-180"
                />
              </summary>

              <div className="space-y-6 border-t border-gray-100 px-4 pt-5 pb-6">
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
                      <label key={opt.value} className={`${choiceClass} bg-white`}>
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

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="ตำแหน่ง" en="Position">
                    <input
                      type="text"
                      placeholder="เช่น ผู้จัดการฝ่ายบุคคล"
                      className={inputClass}
                      {...register("position")}
                    />
                  </Field>

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

                  <Field
                    label="เงินเดือนพื้นฐานรวมต่อเดือน"
                    en="Total Basic Salary / month (excl. OT/Bonus)"
                  >
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      placeholder="บาท ไม่รวมโอที/โบนัส"
                      className={inputClass}
                      {...register("total_basic_salary")}
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

                {/* ข้อมูลกองทุนเดิม — หน้าแรกต้องติ๊กก่อน, หน้า /pvd-review แสดงส่วนที่เหลือเลย */}
                {isReview ? (
                  <div className="grid sm:grid-cols-2 gap-5">
                    <PvdExtraFields register={register} />
                  </div>
                ) : (
                  <>
                    <label className={`${choiceClass} bg-white`}>
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
                      <div className="grid sm:grid-cols-2 gap-5 rounded-xl bg-white border border-gray-100 p-5">
                        <PvdKeyFields register={register} />
                        <PvdExtraFields register={register} />
                      </div>
                    )}
                  </>
                )}

                {/* ประกันชีวิตกลุ่ม */}
                <label className={`${choiceClass} bg-white`}>
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

                <Field label="ข้อมูลเพิ่มเติม" en="Additional notes">
                  <textarea
                    rows={3}
                    placeholder="ระบุสิ่งที่ต้องการปรึกษา หรือข้อมูลเพิ่มเติม..."
                    className={`${inputClass} resize-none`}
                    {...register("message")}
                  />
                </Field>
              </div>
            </details>

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
              {text.submit}
            </button>

            <p className="text-center text-gray-400 text-xs leading-relaxed">
              ข้อมูลของคุณจะถูกใช้เพื่อจัดทำข้อเสนอกองทุนสำรองเลี้ยงชีพเท่านั้น
              และไม่ถูกเปิดเผยต่อบุคคลภายนอก ·{" "}
              <Link
                href="/privacy"
                className="text-[#856A2E] underline underline-offset-4 hover:text-[#0A192C]"
              >
                นโยบายความเป็นส่วนตัว
              </Link>
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

/** 4 ช่องหลักที่ใช้เทียบกองทุน — ตรงกับที่โฆษณากลุ่ม "มี PVD แล้ว" ขอให้ระบุ */
function PvdKeyFields({ register }: { register: Register }) {
  return (
    <>
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
    </>
  );
}

/** ข้อมูลขนาดกองทุน — มีก็ดี ไม่มีก็ส่งได้ */
function PvdExtraFields({ register }: { register: Register }) {
  return (
    <>
      <Field label="ข้อมูล ณ วันที่" en="Data as of">
        <input type="date" className={inputClass} {...register("pvd_data_as_of")} />
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
    </>
  );
}
