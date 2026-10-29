/** ชิ้นส่วนฟอร์มที่ใช้ร่วมกัน — ฟอร์มขอข้อเสนอ PVD และฟอร์มขอจัด workshop หน้าตาเหมือนกัน */

/** การ์ดตัวเลือก radio/checkbox — ขอบทองเมื่อถูกเลือก */
export const choiceClass =
  "flex items-center gap-2.5 px-4 py-3 rounded-xl border border-gray-200 cursor-pointer hover:border-[#CBAE6B] transition has-[:checked]:border-[#CBAE6B] has-[:checked]:bg-[#F7EBC6]/30";

export const inputClass =
  "w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#CBAE6B] focus:ring-2 focus:ring-[#CBAE6B]/20 text-[#0A192C] placeholder:text-gray-400 transition";

export function Field({
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

export function SectionTitle({
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
