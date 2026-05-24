"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, CheckCircle2, Loader2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "กรุณาระบุชื่อ (อย่างน้อย 2 ตัวอักษร)"),
  phone: z
    .string()
    .min(9, "กรุณาระบุเบอร์โทรที่ถูกต้อง")
    .regex(/^[0-9+\-\s()]+$/, "รูปแบบเบอร์โทรไม่ถูกต้อง"),
  email: z.string().email("รูปแบบอีเมลไม่ถูกต้อง").or(z.literal("")).optional(),
  company: z.string().optional(),
  employees_count: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const employeeRanges = [
  "10–29 คน",
  "30–49 คน",
  "50–99 คน",
  "100–499 คน",
  "500 คนขึ้นไป",
];

export default function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

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
    <section id="contact-form" className="bg-gray-50 py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0D1E45] border border-[#C9A84C]/30 mb-6">
            <Clock size={16} className="text-[#C9A84C]" />
            <span className="text-[#C9A84C] text-sm font-medium">
              ทีมงานติดต่อกลับภายใน 24 ชั่วโมง
            </span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold text-[#0D1E45] mb-4">
            รับคำปรึกษา<span className="text-[#C9A84C]">ฟรี</span>
          </h2>
          <p className="text-gray-600 text-lg">
            กรอกข้อมูลด้านล่าง ทีมผู้เชี่ยวชาญจะติดต่อกลับเพื่อให้คำแนะนำที่เหมาะกับธุรกิจของคุณ
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200 border border-gray-100 p-8 sm:p-10">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-green-500" />
              </div>
              <h3 className="font-sans text-2xl font-bold text-[#0D1E45] mb-2">
                ส่งข้อมูลสำเร็จแล้ว!
              </h3>
              <p className="text-gray-600 mb-6">
                ทีมงานจะติดต่อกลับหาคุณภายใน 24 ชั่วโมง
                <br />
                ขอบคุณที่สนใจบริการของ I Wealth
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-[#C9A84C] text-sm hover:underline"
              >
                ส่งข้อมูลอีกครั้ง
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-[#0D1E45] mb-1.5">
                    ชื่อ – นามสกุล <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("name")}
                    placeholder="กรุณาระบุชื่อ"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 text-[#0D1E45] placeholder:text-gray-400 transition"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-[#0D1E45] mb-1.5">
                    เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("phone")}
                    placeholder="08X-XXX-XXXX"
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 text-[#0D1E45] placeholder:text-gray-400 transition"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-[#0D1E45] mb-1.5">
                  อีเมล <span className="text-gray-400 font-normal">(ไม่บังคับ)</span>
                </label>
                <input
                  {...register("email")}
                  placeholder="example@company.com"
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 text-[#0D1E45] placeholder:text-gray-400 transition"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {/* Company */}
                <div>
                  <label className="block text-sm font-semibold text-[#0D1E45] mb-1.5">
                    ชื่อบริษัท <span className="text-gray-400 font-normal">(ไม่บังคับ)</span>
                  </label>
                  <input
                    {...register("company")}
                    placeholder="ชื่อบริษัท / องค์กร"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 text-[#0D1E45] placeholder:text-gray-400 transition"
                  />
                </div>

                {/* Employees */}
                <div>
                  <label className="block text-sm font-semibold text-[#0D1E45] mb-1.5">
                    จำนวนพนักงาน <span className="text-gray-400 font-normal">(ไม่บังคับ)</span>
                  </label>
                  <select
                    {...register("employees_count")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 text-[#0D1E45] bg-white transition"
                  >
                    <option value="">เลือกจำนวนพนักงาน</option>
                    {employeeRanges.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-[#0D1E45] mb-1.5">
                  ข้อความเพิ่มเติม <span className="text-gray-400 font-normal">(ไม่บังคับ)</span>
                </label>
                <textarea
                  {...register("message")}
                  rows={3}
                  placeholder="ระบุสิ่งที่ต้องการปรึกษา หรือข้อมูลเพิ่มเติม..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 text-[#0D1E45] placeholder:text-gray-400 transition resize-none"
                />
              </div>

              {error && (
                <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-[#0D1E45] hover:bg-[#122050] text-white font-bold text-lg transition-all hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    กำลังส่งข้อมูล...
                  </>
                ) : (
                  "ส่งข้อมูลเพื่อรับคำปรึกษาฟรี"
                )}
              </button>

              <p className="text-center text-xs text-gray-400">
                ข้อมูลของคุณจะถูกเก็บเป็นความลับและใช้เพื่อการติดต่อกลับเท่านั้น
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
