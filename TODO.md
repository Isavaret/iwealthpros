# TODO — I Wealth Pros web app

อัปเดตล่าสุด: 5 พ.ย. 2569 · ติ๊ก `[x]` เมื่อทำเสร็จ หรือลบทิ้งเมื่อไม่ต้องทำแล้ว

## ควรทำก่อน

- [ ] **ทดสอบส่งฟอร์ม `/workshop` บนเว็บจริง 1 ครั้ง** — ณ 4 พ.ย. ในฐานข้อมูลยังไม่มีคำขอ workshop เลย
      เช็กว่า lead ขึ้นใน `/admin` พร้อมป้าย "Workshop เกษียณ" และอีเมลแจ้งเตือนเข้า แล้วเปลี่ยนสถานะเป็น "ปิด"
- [ ] **เปิด `/admin` ดูว่าวันที่และเวลาแสดงในคอลัมน์แรก** (commit `29a3da6`) — ต้องล็อกอินแอดมิน

## เนื้อหาที่รอเจ้าของยืนยัน

- [ ] **ทบทวนเรื่องกองทุนสงเคราะห์ลูกจ้างเมื่อกฎหมายประกาศฉบับสมบูรณ์** — ตอนนี้ทั้งเว็บใช้ 1 ม.ค. 2570 ตามมติ ครม. 14 ต.ค. 2569
      ซึ่งยังเป็นร่าง เมื่อประกาศใช้จริง (กำหนดนำส่งงวดแรก บทลงโทษ ข้อยกเว้น) ให้ตรวจ:
      `HeroSection`, `PainPointSection`, `SolutionSection`, `lib/faqs.ts`, `public/llms.txt`,
      บทความชุด 1 บทความที่ 1, ชุด 2 บทความที่ 1, 2, 7 และ `marketing/google-ads/build_ads.py` — แล้ว bump `updatedAt` ของบทความที่แก้
- [ ] **Lead magnet ของบทความชุดที่ 2** — เช็กลิสต์ 1 หน้า, เครื่องคิดเลขต้นทุน PVD (Excel), SOP งาน HR, เทมเพลตคู่มือพนักงาน
      ยังไม่มีไฟล์ จึงตัดออกจากบทความไว้ก่อน

- [ ] **นิยาม "เงิน 3 ถัง"** — ตอนนี้บนเว็บยังเขียนไว้กว้าง ๆ แก้ที่ `lib/workshop.ts` (module `buckets`)
- [ ] **ยืนยันข้อความในหน้า workshop** — จัดแบบออนไลน์ได้จริงหรือไม่ (ตัวเลือกในฟอร์ม)
      และทีมเตรียมวิทยากรให้จริงหรือไม่ (`WorkshopHero`, `WorkshopBenefits`, `WorkshopProcess`)
- [ ] **รูปที่ปรึกษาจริง** — `public/profile.png` ยังเป็นรูปชั่วคราว ใช้อยู่ใน hero หน้าแรก
- [ ] **ปีรางวัลเขียนไม่ตรงกัน** — ต้องเลือกแบบเดียวก่อนนำไปใช้ในโฆษณา
  - `HeroSection.tsx` และ `lib/awards.ts` (ป้ายรางวัล) เขียน **2022** = ปีที่จัดงาน
  - `lib/site.ts`, `lib/faqs.ts`, `public/llms.txt` เขียน **2021** = ปีที่สลักบนถ้วย

## การวัดผลและ SEO

- [x] **ติดตั้ง Google Tag Manager** (`GTM-PJ7V4VGP`) — ฟอร์มทั้งสองยิง event `generate_lead` (พร้อม `lead_type`) เข้า dataLayer เมื่อส่งสำเร็จ
- [ ] **ตั้งค่า tag ในหน้า GTM** — ฝั่งเว็บพร้อมแล้ว เหลือสร้างใน GTM แล้วกด Publish
  - GA4 Configuration tag (trigger: All Pages)
  - GA4 Event / Google Ads Conversion tag (trigger: Custom Event `generate_lead`) — จำเป็นก่อนเปิด Google Ads
  - ทดสอบด้วย GTM Preview / Tag Assistant
- [x] **แบนเนอร์ขอความยินยอมคุกกี้ (PDPA)** — Google Consent Mode v2 ค่าเริ่มต้นปฏิเสธ เปลี่ยนได้ที่ "ตั้งค่าคุกกี้" ท้ายเว็บ
  - ใน GTM: เปิด consent check ของ tag (GA4 / Ads ใช้ built-in consent อยู่แล้ว) และใช้ Custom Event `consent_update` เป็น trigger ได้
- [x] **หน้านโยบายความเป็นส่วนตัว** — `/privacy` ลิงก์จากท้ายเว็บ แบนเนอร์คุกกี้ และใต้ฟอร์มทั้งสอง
- [x] **ชื่อผู้ควบคุมข้อมูล** — อิศวเรศ ตโมนุท (`site.dataController` ใน `lib/site.ts`)
- [ ] **ที่อยู่ติดต่อของผู้ควบคุมข้อมูล** — ใส่ที่ `site.dataController.address` (ตอนนี้หน้า `/privacy` แสดงเฉพาะอีเมล โทร และ LINE)
- [ ] **ให้ผู้เชี่ยวชาญกฎหมายตรวจหน้า `/privacy`** — ร่างจากระบบจริงของเว็บ แต่ยังไม่ได้ผ่านการตรวจทางกฎหมาย
- [ ] **ทำให้ระยะเวลาเก็บ 2 ปีเกิดขึ้นจริง** — นโยบายระบุว่าเก็บ lead ไม่เกิน 2 ปีนับจากติดต่อครั้งล่าสุด แต่ยังไม่มีระบบลบอัตโนมัติ
      (เช่น Vercel Cron ลบแถวที่ `created_at` เกิน 2 ปี หรือทบทวนลบเองปีละครั้ง)
- [ ] **ยืนยันเว็บกับ Google Search Console / Bing** — บนเว็บยังไม่มี verification meta
  - ตั้งค่า `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` ใน Vercel (และ `NEXT_PUBLIC_BING_SITE_VERIFICATION` ถ้าใช้ Bing)
  - จากนั้นส่ง `https://iwealthpros.com/sitemap.xml`
- [ ] **Google Ads** — ทำ checklist "ก่อนเปิดแคมเปญ" ใน `marketing/google-ads/README.md` ให้ครบ
      (งบรายวัน, financial services verification, ตรวจข้อความโฆษณากับกฎของ AIA)
  - แคมเปญตอนนี้ยังไม่มีกลุ่มโฆษณาสำหรับ workshop ฟรี

## งานเทคนิคและเอกสาร

- [ ] **README ล้าสมัย** — ยังเขียนว่า Neon Auth เปิดให้สมัครเองได้ (ปิดไปแล้ว) และยังไม่มีหน้า `/workshop`
- [ ] **เช็กว่าตั้ง `NEXT_PUBLIC_APP_URL` ใน Vercel แล้ว** — ถ้าไม่ได้ตั้ง ลิงก์ในอีเมลแจ้งเตือน (`lib/email.ts`)
      จะชี้ไป `iwealthpros.vercel.app` แทนโดเมนจริง
- [ ] **ให้สิทธิ์ Vercel MCP เข้าทีม `iw-ealth-pros-projects`** (ไม่บังคับ) — เพื่อดูสถานะ deploy และ log error ได้โดยตรง
- [ ] **อัปเดต Vercel CLI (60 → 65)** — `npm i -g vercel@latest`

## ไอเดียเพิ่ม (ไม่เร่ง)

- [ ] เครื่องคำนวณเงินเกษียณเบื้องต้นในหน้า workshop เพื่อดึงคนกรอกฟอร์ม — ต้องแสดงสมมติฐานให้ชัด
- [ ] ภาพแชร์ลงโซเชียลแยกสำหรับหน้า workshop (ตอนนี้ใช้ภาพเดียวกับหน้าแรก)
