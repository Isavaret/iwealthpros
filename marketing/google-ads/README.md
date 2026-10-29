# Google Ads — Search Campaigns (iwealthpros.com)

ชุดแคมเปญ Google Search สำหรับหา lead ฝั่งนายจ้าง/บริษัท ที่สนใจกองทุนสำรองเลี้ยงชีพ (PVD), สวัสดิการพนักงาน, Key Man Insurance และการวางแผนภาษีนิติบุคคล ทุกโฆษณาพาไปที่ `https://iwealthpros.com/`

## ไฟล์ในโฟลเดอร์นี้

| ไฟล์ | ใช้ทำอะไร |
|---|---|
| `iwealthpros-search-campaigns.csv` | ไฟล์สำหรับ import เข้า Google Ads Editor (UTF-16 LE, คั่นด้วย tab ซึ่งเป็นรูปแบบเดียวกับไฟล์ที่ Editor export ออกมา ภาษาไทยไม่เพี้ยน) |
| `build_ads.py` | สคริปต์สร้างไฟล์ CSV ข้างบน ข้อความโฆษณา, keyword, negative, งบ และ CPC ทั้งหมดอยู่ในไฟล์นี้ |
| `README.md` | ไฟล์นี้ |

> ไม่ควรแก้ CSV ด้วยมือใน Excel เพราะ Excel อาจเซฟทับเป็น encoding อื่นจนภาษาไทยเพี้ยน ให้แก้ใน `build_ads.py` แล้วสร้างไฟล์ใหม่แทน (ดูหัวข้อ "แก้ไขและสร้างไฟล์ใหม่")

## สิ่งที่อยู่ในไฟล์

**4 แคมเปญ · 11 กลุ่มโฆษณา · 135 keywords · negative 81 คำต่อแคมเปญ · Responsive Search Ad กลุ่มละ 1 ชิ้น**

| แคมเปญ | งบ/วัน | กลุ่มโฆษณา (Max CPC) |
|---|---|---|
| TH \| PVD \| กองทุนสำรองเลี้ยงชีพ | ฿500 | กองทุนสงเคราะห์ลูกจ้าง (฿25) · จัดตั้ง PVD (฿30) · มี PVD แล้ว - เทียบ บลจ. (฿20) · PVD ทั่วไป - เงินสมทบ (฿12) |
| TH \| สวัสดิการองค์กร & Key Man | ฿300 | สวัสดิการพนักงาน - ประกันกลุ่ม (฿20) · ผู้บริหาร - Key Man (฿25) |
| TH \| ภาษีนิติบุคคล & ที่ปรึกษาการเงินองค์กร | ฿150 | ลดหย่อนภาษีนิติบุคคล (฿15) · ที่ปรึกษาการเงินองค์กร (฿15) |
| EN \| Provident Fund & Benefits | ฿200 | Provident Fund Setup (฿30) · PVD Consultant (฿25) · Employee & Executive Benefits (฿25) |

งบรวม ฿1,150/วัน (ประมาณ ฿35,000/เดือน) เป็นค่าตั้งต้น ปรับได้ตามจริง

ค่าที่ตั้งไว้ทุกแคมเปญ:

- **Campaign type:** Search, network = Google search เท่านั้น (ไม่รวม Search Partners และ Display)
- **Location:** Thailand · **Languages:** ไทย + อังกฤษ
- **Bid strategy:** Manual CPC (ยังไม่มี conversion tracking จึงใช้ smart bidding ไม่ได้)
- **Status:** แคมเปญเข้ามาเป็น **Paused** ทั้งหมด กด Post แล้วยังไม่เสียเงินจนกว่าจะเปิดเอง
- **Match type:** Phrase เป็นหลัก และ Exact สำหรับคำหลัก (ไม่ใช้ Broad เพราะยังไม่มี smart bidding คอยคุม)
- **Negative keywords:** ระดับแคมเปญ (Campaign Negative Phrase) กันกลุ่มคนต่อไปนี้
  - สมาชิกกองทุนที่หาข้อมูลของตัวเอง เช่น ถอน, เช็คยอด, ลาออก, ย้ายกองทุน
  - ชื่อ บลจ. อื่น
  - คนหางาน
  - กองทุนอื่น เช่น ประกันสังคม, กบข, กอช, RMF/SSF/ThaiESG
  - กองทุนของต่างประเทศ เช่น EPF/CPF/MPF/KWSP

ข้อความโฆษณาใช้เฉพาะข้อเท็จจริงที่มีบนเว็บแล้ว (อ้างอิง `lib/faqs.ts`, `public/llms.txt`, `components/CorpSolutionsSection.tsx`) และ:

- ไม่ใช้ชื่อ AIA ในโฆษณา เพราะเป็นเครื่องหมายการค้า อาจโดนระงับ
- ไม่ระบุปีรางวัล ใช้คำว่า "รางวัลระดับประเทศด้าน PVD 2 ปี" แทน
- ไม่ใส่เบอร์โทร, ไม่ใช้ "!" ใน headline, ไม่มีคำโอ้อวดเกินจริงหรือการันตีผลตอบแทน

### Keyword จากรายการต้นฉบับที่ไม่ได้ใส่

- **ปรับเป็นคำฝั่งนายจ้าง:** คำที่กว้างเกินไปจนดึงคนทั่วไป เช่น เงินสมทบ, เงินสะสม, ลดหย่อนภาษี, เงินเกษียณ, retirement plan, วางแผนเกษียณ ถูกเปลี่ยนเป็น "เงินสมทบนายจ้าง", "ลดหย่อนภาษีนิติบุคคล", "สวัสดิการเกษียณ พนักงาน", "employee retirement plan thailand" เพราะฟอร์มบนเว็บรับเฉพาะลูกค้าบริษัท
- **ตัดออก เพราะเว็บไม่มีบริการนี้:**
  - บริหารเงินลงทุนนิติบุคคล, บริหารสภาพคล่ององค์กร, ลงทุนเงินเย็นนิติบุคคล, บริหารพอร์ตลงทุนองค์กร, บริหารเงินสดองค์กร
  - corporate wealth management, corporate treasury management, corporate investment advisor, corporate cash management
  - กองทุนส่วนบุคคลนิติบุคคล, corporate private fund management
  - executive wealth management, c-level financial planning
  - Personal income tax, เกษียณสำราญ (เป็นเรื่องของบุคคลทั่วไป ไม่ใช่บริษัท)

  ถ้าลงโฆษณาคำเหล่านี้ จะเสียค่าคลิกจากคนที่หาบริการอื่น และ Quality Score จะตก ถ้าจะทำบริการเหล่านี้จริง ให้เพิ่มเนื้อหาบนเว็บก่อน แล้วค่อยเพิ่ม keyword

## วิธี import เข้า Google Ads Editor

1. เปิด **Google Ads Editor** แล้วกด **Get recent changes** ของบัญชีที่จะใช้ให้เป็นข้อมูลล่าสุดก่อน
2. ดูสกุลเงินของบัญชี ตัวเลขงบและ Max CPC ในไฟล์เป็น **บาท (THB)** ถ้าบัญชีเป็น USD ต้องแก้ใน `build_ads.py` แล้วสร้างไฟล์ใหม่ก่อน import
3. ไปที่เมนู **Account → Import → From file…** (Windows: **Import → Import from file**)
4. เลือกไฟล์ `iwealthpros-search-campaigns.csv`
5. Editor จะแสดงตัวอย่างการจับคู่คอลัมน์ ถ้ามีคอลัมน์ที่ไม่รู้จัก (เช่น `EU political ads` ใน Editor บางเวอร์ชัน) ให้จับคู่เองหรือข้ามคอลัมน์นั้นได้
6. ตรวจหน้าสรุปการ import ว่าแคมเปญ, ad group, keyword, negative keyword และ ad ถูกสร้างครบ
   - แคมเปญ 4
   - ad group 11
   - keyword 135
   - negative 324 แถว (81 × 4)
   - ad 11
7. กด **Finish and review changes** → ตรวจรายการที่เพิ่มเข้ามา → **Keep**
8. ตั้งค่าที่ไฟล์ import ใส่ให้ไม่ได้ (ดู TODO ข้อ 2 ด้านล่าง)
9. กด **Check changes** แก้ error/warning ที่ขึ้น แล้วกด **Post** แคมเปญจะขึ้นไปที่บัญชีในสถานะ Paused
10. เมื่อทำ TODO "ก่อนเปิดแคมเปญ" ครบแล้ว ค่อยเปลี่ยนสถานะแคมเปญเป็น **Enabled**

> import ซ้ำได้: ถ้าชื่อแคมเปญ/กลุ่มโฆษณาตรงกับของเดิม Editor จะอัปเดตของเดิมแทนการสร้างใหม่ แต่โฆษณา RSA ที่ข้อความเปลี่ยนจะถูกสร้างเป็นโฆษณาชิ้นใหม่ ต้องลบหรือ pause ชิ้นเก่าเอง

## แก้ไขและสร้างไฟล์ใหม่

แก้ข้อมูลใน `build_ads.py` ได้ดังนี้

- `CAMPAIGNS`: ชื่อแคมเปญ, งบ, กลุ่มโฆษณา, CPC, keyword (`phrase` / `exact`), headline, description และ path
- `NEG_ALL`: negative keywords

แก้เสร็จแล้วรัน:

```bash
python3 -I marketing/google-ads/build_ads.py marketing/google-ads/iwealthpros-search-campaigns.csv
```

สคริปต์จะตรวจให้ก่อนเขียนไฟล์ ถ้าไม่ผ่านจะแสดง error และไม่สร้างไฟล์

- headline ≤ 30 ตัวอักษร, description ≤ 90, path ≤ 15 (นับตาม code point ซึ่งนับสระบน/ล่างและวรรณยุกต์ด้วย จึงเผื่อไว้มากกว่าที่ Google นับจริง)
- แต่ละกลุ่มต้องมี headline 15 อันไม่ซ้ำ และ description 4 อัน
- ห้ามมี "!" ใน headline
- negative keyword ต้องไม่ไปบล็อก keyword ของเราเอง

## TODO

### ก่อนเปิดแคมเปญ (ต้องทำ)

- [ ] **ติดตั้ง conversion tracking:** ตอนนี้เว็บยังไม่มี Google Ads tag
  - ติดตั้ง Google tag (`AW-…`) ใน `app/layout.tsx`
  - ยิง conversion event เมื่อส่งฟอร์มที่ `POST /api/leads` สำเร็จ (ใน `components/LeadForm.tsx`)
  - สร้าง conversion action "Lead form submit" ใน Google Ads
  - ทดสอบด้วย Tag Assistant ว่า conversion ถูกบันทึก
- [ ] **ตั้งค่าที่ไฟล์ import ใส่ไม่ได้ (ทำใน Editor ก่อน Post):**
  - Location options → **Presence: People in or regularly in your targeted locations** (ไม่งั้นคนต่างประเทศที่สนใจเรื่องไทยจะเห็นโฆษณาด้วย โดยเฉพาะแคมเปญ EN)
  - Ad schedule ถ้าต้องการ เช่น จันทร์–ศุกร์ 08:00–20:00 ซึ่งเป็นเวลาที่ HR และเจ้าของกิจการค้นหา
- [ ] **เช็คสกุลเงินบัญชี:** งบและ CPC ในไฟล์เป็นบาท
- [ ] **ยืนยันงบรายวันกับเจ้าของ:** ค่าตั้งต้นรวม ฿1,150/วัน
- [ ] **ยืนยันตัวตนผู้ให้บริการทางการเงิน:** เช็คว่าบัญชีต้องทำ **Advertiser verification / Financial services verification** สำหรับโฆษณาประกันและกองทุนในไทยหรือไม่ ถ้าต้องทำแต่ยังไม่ได้ทำ โฆษณาจะไม่ขึ้น
- [ ] **ตรวจข้อความโฆษณากับเจ้าของ:** โดยเฉพาะประโยคเรื่องใบอนุญาต, รางวัล และสิทธิประโยชน์ทางภาษี ว่าตรงกับที่ทำได้จริงและไม่ขัดกฎของ AIA เรื่องการโฆษณาของตัวแทน
- [ ] **แก้ปีรางวัลบนเว็บให้ตรงกัน:** หน้าแรก (`HeroSection.tsx`) เขียน 2022 แต่ `lib/faqs.ts` / `lib/site.ts` / `llms.txt` เขียน 2021 ตอนนี้โฆษณาเลี่ยงไม่ระบุปีไว้แล้ว

### หลังเปิดแคมเปญ

- [ ] **ดู Search terms report ทุกสัปดาห์ในช่วง 2–3 สัปดาห์แรก:** เพิ่ม negative จากคำค้นที่ไม่เกี่ยว โดยเฉพาะกลุ่ม "PVD ทั่วไป - เงินสมทบ" และ "มี PVD แล้ว - เทียบ บลจ." ที่น่าจะดึงสมาชิกกองทุนมามากที่สุด
- [ ] **ย้ายคำค้นที่ได้ lead จริงไปเป็น Exact:** ตั้ง CPC ให้กลุ่มนั้นสูงขึ้น
- [ ] **ดู Ad strength และ asset performance ของ RSA:** เปลี่ยน headline ที่ได้คะแนน "Low" หลังมีข้อมูลพอ
- [ ] **ปรับ CPC ตาม Impression share / First page bid ที่ Editor แจ้ง**
- [ ] **เปลี่ยน bid strategy เป็น Maximize conversions เมื่อมี 15–30 conversions:** แล้วค่อยขยับเป็น Target CPA

### ส่วนที่ทำเพิ่มได้ภายหลัง

- [ ] **Callout assets:** เช่น "ปรึกษาฟรี", "ตอบกลับใน 24 ชม.", "ที่ปรึกษาที่ได้รับใบอนุญาต", "รับข้อเสนอไทย/อังกฤษ"
- [ ] **Structured snippet:** Services: กองทุนสำรองเลี้ยงชีพ, ประกันกลุ่ม, Key Man Insurance
- [ ] **Call asset / Lead form asset:** ใช้เบอร์ 098-939-1466 ตาม `lib/site.ts` (ใส่เบอร์ใน asset ได้ แต่ห้ามใส่ในข้อความโฆษณา)
- [ ] **Sitelinks:** ต้องชี้ไปหน้าที่เนื้อหาต่างกันจริง เช่น `/articles` และหน้าบทความแต่ละหน้า
- [ ] **ทำ landing page แยกตามกลุ่ม:** เช่น หน้ากองทุนสงเคราะห์ลูกจ้าง, หน้า Key Man, หน้า EN จะได้ Quality Score และ conversion rate ดีกว่าการพาทุกคนไปหน้าแรก
- [ ] **ทำ Remarketing list:** สำหรับคนที่เข้าเว็บแต่ยังไม่กรอกฟอร์ม
