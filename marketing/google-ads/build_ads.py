"""Build a Google Ads Editor import file (UTF-16 LE, tab-separated) for iwealthpros.com."""
import csv, io, sys, re

URL = "https://iwealthpros.com/"
OUT = sys.argv[1]

COLS = [
    "Campaign", "Campaign Type", "Networks", "Budget", "Budget type",
    "Bid Strategy Type", "Languages", "EU political ads", "Campaign Status",
    "Location", "Ad Group", "Max CPC", "Ad Group Status",
    "Keyword", "Criterion Type", "Ad type",
    *[f"Headline {i}" for i in range(1, 16)],
    *[f"Description {i}" for i in range(1, 5)],
    "Path 1", "Path 2", "Final URL", "Status",
]

# ---------------------------------------------------------------- shared copy
TH_COMMON = {
    "free": "ขอข้อเสนอฟรี ไม่มีค่าใช้จ่าย",
    "reply": "ตอบกลับภายใน 24 ชั่วโมง",
    "licensed": "ที่ปรึกษาที่ได้รับใบอนุญาต",
    "award": "รางวัลด้าน PVD ระดับประเทศ",
    "lang": "รับข้อเสนอไทยหรืออังกฤษ",
    "brand": "I Wealth Pros",
}

NEG_ALL = [
    # employees managing their own fund, not employers buying one
    "ถอน", "ถอนเงิน", "เช็คยอด", "ตรวจสอบยอด", "ยอดเงิน", "ลาออก", "เปลี่ยนงาน",
    "โอนย้าย", "ย้ายกองทุน", "คงเงิน", "เข้าสู่ระบบ", "login", "รหัสผ่าน", "แอป",
    "เคลม", "ใช้สิทธิ", "บัตรประกัน", "โรงพยาบาล",
    # jobs / study
    "สมัครงาน", "หางาน", "งานว่าง", "ตำแหน่งงาน", "เงินเดือน", "ข้อสอบ", "รายงาน",
    "วิจัย", "pdf", "jobs", "job", "salary", "career", "careers", "internship",
    # other schemes and personal tax products
    "ประกันสังคม", "ม33", "ม40", "ว่างงาน", "กบข", "กอช", "ข้าราชการ",
    "เกษียณอายุราชการ", "ครู", "สหกรณ์", "rmf", "ssf", "thaiesg", "สินเชื่อ", "กู้",
    # other countries' provident funds
    "epf", "uan", "kwsp", "cpf", "mpf", "india", "malaysia", "singapore",
    "hong kong", "withdraw", "withdrawal", "balance",
    # existing fund managers (searchers are almost always members looking up their account)
    "กสิกร", "kasikorn", "kbank", "ไทยพาณิชย์", "scb", "กรุงไทย", "ktam", "ktb",
    "กรุงศรี", "krungsri", "tisco", "ทิสโก้", "บัวหลวง", "bbl", "uob", "principal",
    "ttb", "ทหารไทย", "ธนชาต", "kkp", "เกียรตินาคิน",
]

# ---------------------------------------------------------------- campaigns
CAMPAIGNS = [
  {
    "name": "TH | PVD | กองทุนสำรองเลี้ยงชีพ",
    "budget": 500,
    "groups": [
      {
        "name": "กองทุนสงเคราะห์ลูกจ้าง",
        "cpc": 25,
        "phrase": [
          "กองทุนสงเคราะห์ลูกจ้าง", "กองทุนสงเคราะห์ลูกจ้าง 2569",
          "กองทุนสงเคราะห์ลูกจ้าง นายจ้าง", "กองทุนสงเคราะห์ลูกจ้าง บริษัท",
          "กองทุนสงเคราะห์ลูกจ้าง บังคับ", "กองทุนสงเคราะห์ลูกจ้าง ยกเว้น",
          "กองทุนสงเคราะห์ลูกจ้าง 10 คน", "กองทุนสงเคราะห์ลูกจ้าง อัตรา",
          "กองทุนสงเคราะห์ลูกจ้าง กองทุนสำรองเลี้ยงชีพ", "กองทุนสงเคราะห์ลูกจ้าง pvd",
          "กฎหมายกองทุนสงเคราะห์ลูกจ้าง",
        ],
        "exact": ["กองทุนสงเคราะห์ลูกจ้าง", "กองทุนสงเคราะห์ลูกจ้าง คือ"],
        "headlines": [
          "กองทุนสงเคราะห์ลูกจ้าง 2569",
          "บังคับใช้แล้ว 1 ต.ค. 2569",
          "บริษัท 10 คนขึ้นไปต้องเข้าร่วม",
          "มี PVD แล้ว ได้รับยกเว้น",
          "เลือกตั้ง PVD แทนได้",
          "PVD ยืดหยุ่นกว่าในทุกมิติ",
          "นายจ้างสมทบได้ 2-15%",
          "เงินสมทบเป็นค่าใช้จ่ายได้ 100%",
          "พนักงานลดหย่อนภาษีสูงสุด 5 แสน",
          TH_COMMON["free"], TH_COMMON["reply"], TH_COMMON["licensed"],
          TH_COMMON["award"], TH_COMMON["lang"], "I Wealth Pros ที่ปรึกษา PVD",
        ],
        "descriptions": [
          "กองทุนสงเคราะห์ลูกจ้างบังคับใช้ 1 ต.ค. 2569 บริษัทที่มี PVD แล้วได้รับยกเว้นโดยอัตโนมัติ",
          "PVD นายจ้างสมทบได้ 2-15% เลือกนโยบายการลงทุนได้ และนำเงินสมทบเป็นค่าใช้จ่ายได้ 100%",
          "กรอกแบบฟอร์มขอข้อเสนอ ไม่มีค่าใช้จ่าย ทีมงานติดต่อกลับภายใน 24 ชั่วโมง",
          "ที่ปรึกษาที่ได้รับใบอนุญาต รางวัลระดับประเทศด้านกองทุนสำรองเลี้ยงชีพ 2 ปี",
        ],
        "path": ("กองทุนสงเคราะห์", "PVD"),
      },
      {
        "name": "จัดตั้ง PVD",
        "cpc": 30,
        "phrase": [
          "จัดตั้งกองทุนสำรองเลี้ยงชีพ", "ตั้งกองทุนสำรองเลี้ยงชีพ",
          "ขั้นตอนจัดตั้งกองทุนสำรองเลี้ยงชีพ", "เปิดกองทุนสำรองเลี้ยงชีพ",
          "สมัครกองทุนสำรองเลี้ยงชีพ บริษัท", "สมัครกองทุนสำรองเลี้ยงชีพ นิติบุคคล",
          "กองทุนสำรองเลี้ยงชีพ นิติบุคคล", "กองทุนสำรองเลี้ยงชีพ สำหรับบริษัท",
          "กองทุนสำรองเลี้ยงชีพ นายจ้าง", "กองทุนสำรองเลี้ยงชีพ sme",
          "กองทุนสำรองเลี้ยงชีพ ให้พนักงาน", "ทำกองทุนสำรองเลี้ยงชีพ",
          "ที่ปรึกษากองทุนสำรองเลี้ยงชีพ", "ปรึกษา กองทุนสำรองเลี้ยงชีพ",
          "จัดตั้ง pvd", "pvd บริษัท",
        ],
        "exact": ["จัดตั้งกองทุนสำรองเลี้ยงชีพ", "ปรึกษาจัดตั้งกองทุนสำรองเลี้ยงชีพ"],
        "headlines": [
          "จัดตั้งกองทุนสำรองเลี้ยงชีพ",
          "ที่ปรึกษากองทุนสำรองเลี้ยงชีพ",
          "ตั้ง PVD ให้พนักงานในบริษัท",
          "นายจ้างสมทบได้ 2-15%",
          "เงินสมทบเป็นค่าใช้จ่ายได้ 100%",
          "พนักงานลดหย่อนภาษีสูงสุด 5 แสน",
          "ยกเว้นกองทุนสงเคราะห์ลูกจ้าง",
          "เลือกนโยบายการลงทุนได้",
          "มัดใจคนเก่งให้อยู่กับบริษัท",
          TH_COMMON["free"], TH_COMMON["reply"], TH_COMMON["licensed"],
          TH_COMMON["award"], TH_COMMON["lang"], "I Wealth Pros ที่ปรึกษา PVD",
        ],
        "descriptions": [
          "จัดตั้งกองทุนสำรองเลี้ยงชีพให้พนักงาน เลือกนโยบายการลงทุนได้ตามความเสี่ยงที่ยอมรับ",
          "บริษัทนำเงินสมทบเป็นค่าใช้จ่ายได้ 100% พนักงานลดหย่อนภาษีได้สูงสุด 500,000 บาทต่อปี",
          "บริษัทที่ตั้ง PVD แล้วได้รับยกเว้นกองทุนสงเคราะห์ลูกจ้าง ขอข้อเสนอฟรี ตอบกลับใน 24 ชม.",
          "ที่ปรึกษาที่ได้รับใบอนุญาต รางวัลระดับประเทศด้านกองทุนสำรองเลี้ยงชีพ 2 ปี",
        ],
        "path": ("กองทุนสำรอง", "ขอข้อเสนอ"),
      },
      {
        "name": "มี PVD แล้ว - เทียบ บลจ.",
        "cpc": 20,
        "phrase": [
          "เลือก บลจ กองทุนสำรองเลี้ยงชีพ", "เปลี่ยน บลจ กองทุนสำรองเลี้ยงชีพ",
          "บลจ กองทุนสำรองเลี้ยงชีพ", "บริษัทจัดการกองทุนสำรองเลี้ยงชีพ",
          "เปรียบเทียบ กองทุนสำรองเลี้ยงชีพ", "ประเมินผล กองทุนสำรองเลี้ยงชีพ",
          "นโยบายการลงทุน กองทุนสำรองเลี้ยงชีพ", "ค่าธรรมเนียม กองทุนสำรองเลี้ยงชีพ",
          "คณะกรรมการกองทุนสำรองเลี้ยงชีพ", "คณะกรรมการกองทุน pvd",
        ],
        "exact": [],
        "headlines": [
          "มี PVD แล้ว? ขอข้อเสนอเทียบ",
          "เลือก บลจ. ให้กองทุน PVD",
          "เทียบค่าจัดการและผลตอบแทน",
          "ทบทวนนโยบายการลงทุน PVD",
          "ข้อเสนอสำหรับคณะกรรมการกองทุน",
          "เปรียบเทียบ PVD ของบริษัทคุณ",
          "เลือกนโยบายการลงทุนได้",
          "เงินสมทบเป็นค่าใช้จ่ายได้ 100%",
          "พนักงานลดหย่อนภาษีสูงสุด 5 แสน",
          TH_COMMON["free"], TH_COMMON["reply"], TH_COMMON["licensed"],
          TH_COMMON["award"], TH_COMMON["lang"], "I Wealth Pros ที่ปรึกษา PVD",
        ],
        "descriptions": [
          "บริษัทมีกองทุนสำรองเลี้ยงชีพอยู่แล้ว? ส่งข้อมูลกองทุนปัจจุบันเพื่อรับข้อเสนอเปรียบเทียบ",
          "ระบุ บลจ. นโยบายการลงทุน ค่าจัดการ และผลตอบแทนปัจจุบัน ทีมงานติดต่อกลับใน 24 ชม.",
          "ขอข้อเสนอไม่มีค่าใช้จ่าย เลือกรับข้อเสนอเป็นภาษาไทยหรือภาษาอังกฤษได้",
          "ที่ปรึกษาที่ได้รับใบอนุญาต รางวัลระดับประเทศด้านกองทุนสำรองเลี้ยงชีพ 2 ปี",
        ],
        "path": ("กองทุนสำรอง", "เปรียบเทียบ"),
      },
      {
        "name": "PVD ทั่วไป - เงินสมทบ",
        "cpc": 12,
        "phrase": [
          "เงินสมทบนายจ้าง", "เงินสมทบ นายจ้าง กองทุนสำรองเลี้ยงชีพ",
          "อัตราเงินสมทบ กองทุนสำรองเลี้ยงชีพ", "เงินสะสม เงินสมทบ กองทุนสำรองเลี้ยงชีพ",
          "เงินสมทบ ค่าใช้จ่าย บริษัท", "เงินสมทบ กองทุนสำรองเลี้ยงชีพ ภาษี",
          "กองทุนสำรองเลี้ยงชีพ ลดหย่อนภาษี นิติบุคคล", "กองทุนสำรองเลี้ยงชีพ ข้อดี",
          "กองทุนสำรองเลี้ยงชีพ pvd",
        ],
        "exact": ["กองทุนสำรองเลี้ยงชีพ", "pvd", "กองทุน pvd", "pvd คือ",
                  "กองทุนสำรองเลี้ยงชีพ คือ"],
        "headlines": [
          "กองทุนสำรองเลี้ยงชีพ (PVD)",
          "PVD สำหรับนายจ้างและบริษัท",
          "นายจ้างสมทบได้ 2-15%",
          "เงินสมทบเป็นค่าใช้จ่ายได้ 100%",
          "ลดหย่อนภาษีนิติบุคคลได้",
          "พนักงานลดหย่อนภาษีสูงสุด 5 แสน",
          "ยกเว้นกองทุนสงเคราะห์ลูกจ้าง",
          "เงินเติบโตพร้อมการลงทุน",
          "จัดตั้งกองทุนสำรองเลี้ยงชีพ",
          TH_COMMON["free"], TH_COMMON["reply"], TH_COMMON["licensed"],
          TH_COMMON["award"], TH_COMMON["lang"], "I Wealth Pros ที่ปรึกษา PVD",
        ],
        "descriptions": [
          "ประโยชน์ทางภาษีทั้งสองฝ่าย บริษัทนำเงินสมทบเป็นค่าใช้จ่ายได้ 100% ตามประมวลรัษฎากร",
          "พนักงานนำเงินสะสมไปลดหย่อนภาษีได้สูงสุด 500,000 บาทต่อปี เงินเติบโตพร้อมดอกผล",
          "นายจ้างสมทบได้ 2-15% ตามที่ตกลง สูงกว่าอัตรา 0.25% ของกองทุนสงเคราะห์ลูกจ้าง",
          "กรอกแบบฟอร์มขอข้อเสนอ ไม่มีค่าใช้จ่าย ทีมงานติดต่อกลับภายใน 24 ชั่วโมง",
        ],
        "path": ("กองทุนสำรอง", "เงินสมทบ"),
      },
    ],
  },
  {
    "name": "TH | สวัสดิการองค์กร & Key Man",
    "budget": 300,
    "groups": [
      {
        "name": "สวัสดิการพนักงาน - ประกันกลุ่ม",
        "cpc": 20,
        "phrase": [
          "วางแผนสวัสดิการพนักงาน", "สวัสดิการพนักงาน บริษัท", "จัดสวัสดิการพนักงาน",
          "แผนสวัสดิการองค์กร", "สวัสดิการองค์กร", "สวัสดิการวัยเกษียณ พนักงาน",
          "สวัสดิการเกษียณ พนักงาน", "วางแผนเกษียณ พนักงาน",
          "ประกันกลุ่ม", "ประกันกลุ่ม พนักงาน", "ประกันกลุ่ม บริษัท",
          "ประกันสุขภาพกลุ่ม", "ประกันชีวิตกลุ่ม",
        ],
        "exact": ["ประกันกลุ่ม", "สวัสดิการพนักงาน"],
        "headlines": [
          "วางแผนสวัสดิการพนักงาน",
          "สวัสดิการองค์กรครบวงจร",
          "PVD ประกันกลุ่ม และ Key Man",
          "ประกันกลุ่ม รับตั้งแต่ 5 คน",
          "แบ่งความคุ้มครองตามระดับ",
          "เลือกความคุ้มครองได้ตามต้องการ",
          "สวัสดิการวัยเกษียณให้พนักงาน",
          "เบี้ยเป็นค่าใช้จ่ายบริษัท",
          "มัดใจคนเก่งให้อยู่กับบริษัท",
          "ประกันสุขภาพและอุบัติเหตุกลุ่ม",
          TH_COMMON["free"], TH_COMMON["reply"], TH_COMMON["licensed"],
          TH_COMMON["award"], "I Wealth Pros สวัสดิการองค์กร",
        ],
        "descriptions": [
          "ประกันสุขภาพและอุบัติเหตุกลุ่มสำหรับพนักงานทั้งองค์กร รับตั้งแต่ 5 คนขึ้นไป",
          "ออกแบบได้ตามความต้องการ แบ่งกลุ่มความคุ้มครองตามระดับ เบี้ยเป็นค่าใช้จ่ายบริษัทได้",
          "ดูแลครบวงจร: กองทุนสำรองเลี้ยงชีพ ประกันกลุ่ม และ Key Man Insurance ในที่เดียว",
          "ขอข้อมูลไม่มีค่าใช้จ่าย ทีมงานที่ปรึกษาที่ได้รับใบอนุญาตติดต่อกลับภายใน 24 ชม.",
        ],
        "path": ("สวัสดิการ", "ประกันกลุ่ม"),
      },
      {
        "name": "ผู้บริหาร - Key Man",
        "cpc": 25,
        "phrase": [
          "ประกันคีย์แมน", "ประกัน key man", "key man insurance", "keyman insurance",
          "ประกัน keyman", "ประกันผู้บริหาร", "สวัสดิการผู้บริหาร",
          "สวัสดิการผู้บริหารระดับสูง", "วางแผนเกษียณ ผู้บริหาร",
          "วางแผนการเงิน ผู้บริหาร", "ประกันชีวิต ผู้บริหาร ค่าใช้จ่ายบริษัท",
        ],
        "exact": ["key man insurance", "ประกันคีย์แมน"],
        "headlines": [
          "Key Man Insurance",
          "ประกันผู้บริหาร Key Man",
          "สวัสดิการผู้บริหารระดับสูง",
          "เบี้ยเป็นค่าใช้จ่ายบริษัท 100%",
          "ผู้บริหารลดหย่อนภาษีตามเกณฑ์",
          "สรรพากรยอมรับ",
          "ประกันชีวิต ไม่ใช่ Unit Linked",
          "ชีวิต สุขภาพ โรคร้ายแรง",
          "วางแผนเกษียณผู้บริหาร",
          "ออกแบบแผนเฉพาะผู้บริหาร",
          TH_COMMON["free"], TH_COMMON["reply"], TH_COMMON["licensed"],
          TH_COMMON["award"], "I Wealth Pros ประกันผู้บริหาร",
        ],
        "descriptions": [
          "ออกแบบแผนประกันสำหรับผู้บริหาร เบี้ยประกันนำมาเป็นค่าใช้จ่ายบริษัทได้เต็ม 100%",
          "แบบประกันชีวิต (ไม่ใช่ Unit Linked) ผู้บริหารได้รับสิทธิลดหย่อนภาษีส่วนตัวตามเกณฑ์",
          "เลือกแบบประกันได้ตามความต้องการ ทั้งประกันชีวิต สุขภาพ และโรคร้ายแรง",
          "ขอข้อมูลไม่มีค่าใช้จ่าย ทีมงานที่ปรึกษาที่ได้รับใบอนุญาตติดต่อกลับภายใน 24 ชม.",
        ],
        "path": ("ประกันผู้บริหาร", "KeyMan"),
      },
    ],
  },
  {
    "name": "TH | ภาษีนิติบุคคล & ที่ปรึกษาการเงินองค์กร",
    "budget": 150,
    "groups": [
      {
        "name": "ลดหย่อนภาษีนิติบุคคล",
        "cpc": 15,
        "phrase": [
          "วางแผนภาษีนิติบุคคล", "ลดหย่อนภาษีนิติบุคคล", "ลดภาษีนิติบุคคล",
          "ลดหย่อนภาษี บริษัท", "ลดภาษีบริษัท", "ประหยัดภาษี บริษัท",
          "ค่าใช้จ่าย ลดหย่อนภาษี บริษัท", "ภาษีนิติบุคคล สวัสดิการพนักงาน",
          "วิธีลดภาษีนิติบุคคล", "ลดหย่อนภาษี นิติบุคคล ถูกกฎหมาย",
        ],
        "exact": [],
        "headlines": [
          "วางแผนภาษีนิติบุคคล",
          "ลดหย่อนภาษีบริษัทแบบถูกกฎหมาย",
          "3 เครื่องมือที่สรรพากรยอมรับ",
          "สมทบ PVD เป็นค่าใช้จ่าย 100%",
          "เบี้ย Key Man เป็นค่าใช้จ่าย",
          "เบี้ยประกันกลุ่มเป็นค่าใช้จ่าย",
          "ได้ทั้งบริษัทและพนักงาน",
          "PVD ประกันกลุ่ม และ Key Man",
          "ตามประมวลรัษฎากร",
          "สวัสดิการที่ช่วยลดภาษี",
          TH_COMMON["free"], TH_COMMON["reply"], TH_COMMON["licensed"],
          TH_COMMON["award"], "I Wealth Pros ที่ปรึกษาองค์กร",
        ],
        "descriptions": [
          "3 เครื่องมือลดหย่อนภาษีบริษัทที่สรรพากรยอมรับ: PVD ประกันกลุ่ม และ Key Man Insurance",
          "เงินสมทบ PVD และเบี้ย Key Man นำมาเป็นค่าใช้จ่ายบริษัทได้ 100% ตามที่สรรพากรยอมรับ",
          "ได้ประโยชน์ทั้งสองฝ่าย บริษัทลดภาษีนิติบุคคล พนักงานลดหย่อนภาษีได้สูงสุด 500,000 บาท",
          "ขอข้อมูลไม่มีค่าใช้จ่าย ทีมงานที่ปรึกษาที่ได้รับใบอนุญาตติดต่อกลับภายใน 24 ชม.",
        ],
        "path": ("ภาษีนิติบุคคล", "ลดหย่อน"),
      },
      {
        "name": "ที่ปรึกษาการเงินองค์กร",
        "cpc": 15,
        "phrase": [
          "ที่ปรึกษาการเงินองค์กร", "ที่ปรึกษาทางการเงิน บริษัท",
          "ที่ปรึกษาการเงิน นิติบุคคล", "วางแผนการเงิน บริษัท",
          "วางแผนการเงิน นิติบุคคล", "วางแผนการเงินองค์กร",
        ],
        "exact": [],
        "headlines": [
          "ที่ปรึกษาการเงินองค์กร",
          "วางแผนการเงินให้บริษัท",
          "ที่ปรึกษาการเงินนิติบุคคล",
          "วางแผนสวัสดิการและภาษีบริษัท",
          "PVD ประกันกลุ่ม และ Key Man",
          "สมทบ PVD เป็นค่าใช้จ่าย 100%",
          "เบี้ย Key Man เป็นค่าใช้จ่าย",
          "สวัสดิการที่ช่วยลดภาษี",
          "ดูแลองค์กรครบวงจร",
          "ลดหย่อนภาษีบริษัทแบบถูกกฎหมาย",
          TH_COMMON["free"], TH_COMMON["reply"], TH_COMMON["licensed"],
          TH_COMMON["award"], "I Wealth Pros ที่ปรึกษาองค์กร",
        ],
        "descriptions": [
          "ที่ปรึกษาด้านการเงินสำหรับองค์กร เชี่ยวชาญกองทุนสำรองเลี้ยงชีพ ประกันกลุ่ม และ Key Man",
          "วางแผนสวัสดิการที่บริษัทนำมาเป็นค่าใช้จ่ายได้ ลดภาษีนิติบุคคลแบบที่สรรพากรยอมรับ",
          "ที่ปรึกษาที่ได้รับใบอนุญาต รางวัลระดับประเทศด้านกองทุนสำรองเลี้ยงชีพ 2 ปี",
          "ขอคำปรึกษาไม่มีค่าใช้จ่าย ทีมงานติดต่อกลับภายใน 24 ชั่วโมง",
        ],
        "path": ("ที่ปรึกษา", "องค์กร"),
      },
    ],
  },
  {
    "name": "EN | Provident Fund & Benefits",
    "budget": 200,
    "groups": [
      {
        "name": "Provident Fund Setup",
        "cpc": 30,
        "phrase": [
          "provident fund thailand", "provident fund setup thailand",
          "set up provident fund thailand", "provident fund setup company",
          "provident fund for company thailand", "employer provident fund thailand",
          "provident fund for employees thailand", "pvd thailand",
          "employee welfare fund thailand", "thailand employee welfare fund",
          "employee retirement plan thailand",
        ],
        "exact": ["provident fund thailand", "thailand provident fund"],
        "headlines": [
          "Provident Fund in Thailand",
          "Set Up a PVD for Your Staff",
          "Free Provident Fund Proposal",
          "Licensed PVD Consultants",
          "Replies Within 24 Hours",
          "Proposal in English or Thai",
          "Employer Contributes 2-15%",
          "100% Deductible for Company",
          "Staff Tax Relief Up to 500k",
          "Exempt From the Welfare Fund",
          "Welfare Fund Law: 1 Oct 2026",
          "Choose Your Investment Policy",
          "Keep Your Best People Longer",
          "Award-Winning PVD Advisors",
          "I Wealth Pros PVD Advisors",
        ],
        "descriptions": [
          "Thailand's Employee Welfare Fund applies from 1 Oct 2026. Companies with a PVD are exempt.",
          "Employer contributes 2-15%, picks an investment policy and books it as company expense.",
          "Employees can deduct up to THB 500,000 a year. Request a free proposal in English.",
          "Licensed advisors with national provident fund awards. Our team replies within 24 hours.",
        ],
        "path": ("provident-fund", "proposal"),
      },
      {
        "name": "PVD Consultant",
        "cpc": 25,
        "phrase": [
          "pvd consultant thailand", "provident fund consultant thailand",
          "provident fund advisor thailand", "provident fund advisor corporate",
          "provident fund committee consultant", "pvd management thailand",
          "provident fund management thailand", "provident fund manager thailand",
          "compare provident fund thailand",
        ],
        "exact": ["pvd consultant thailand", "provident fund consultant"],
        "headlines": [
          "Provident Fund Consultant",
          "PVD Consultant in Thailand",
          "Licensed PVD Consultants",
          "Already Have a PVD? Compare",
          "Proposal for Fund Committees",
          "Compare Fees and Fund Yield",
          "Free Provident Fund Proposal",
          "Replies Within 24 Hours",
          "Proposal in English or Thai",
          "Employer Contributes 2-15%",
          "100% Deductible for Company",
          "Choose Your Investment Policy",
          "Exempt From the Welfare Fund",
          "Award-Winning PVD Advisors",
          "I Wealth Pros PVD Advisors",
        ],
        "descriptions": [
          "Already run a PVD? Share your current fund manager, fee and yield for a comparison.",
          "Set up or review your company provident fund with licensed advisors in Thailand.",
          "Free proposal, no consultation fee. Our team replies within 24 hours, in English or Thai.",
          "Employer contributions are 100% deductible. Staff can deduct up to THB 500,000 a year.",
        ],
        "path": ("pvd", "consultant"),
      },
      {
        "name": "Employee & Executive Benefits",
        "cpc": 25,
        "phrase": [
          "employee benefits consultant thailand", "corporate employee benefits thailand",
          "employee benefits thailand", "group insurance thailand",
          "group health insurance thailand", "executive benefits consultant thailand",
          "executive benefits thailand", "key person insurance corporate",
          "key person insurance thailand", "key man insurance thailand",
          "corporate financial planner thailand", "corporate financial advisor thailand",
        ],
        "exact": [],
        "headlines": [
          "Employee Benefits in Thailand",
          "Group Insurance From 5 Staff",
          "Key Man Insurance",
          "Executive Benefits Planning",
          "PVD, Group Cover and Key Man",
          "Premiums as Company Expense",
          "Cover Tiered by Staff Level",
          "Life, Health & Critical Cover",
          "Licensed Benefits Advisors",
          "Replies Within 24 Hours",
          "Proposal in English or Thai",
          "Free Consultation",
          "Keep Your Best People Longer",
          "Award-Winning PVD Advisors",
          "I Wealth Pros Benefits",
        ],
        "descriptions": [
          "Provident fund, group insurance and Key Man Insurance for Thai companies, in one place.",
          "Group health and accident cover from 5 employees, tiered by staff level as you need.",
          "Key Man premiums can be booked 100% as company expense, as accepted by the Revenue Dept.",
          "Free consultation with licensed advisors. Our team replies within 24 hours.",
        ],
        "path": ("benefits", "thailand"),
      },
    ],
  },
]

# ---------------------------------------------------------------- validate
errors = []
def check(label, text, limit):
    if len(text) > limit:
        errors.append(f"{label} > {limit} ({len(text)}): {text}")
    if "!" in text and label.startswith("H"):
        errors.append(f"{label} has '!': {text}")

positives = []
for c in CAMPAIGNS:
    for g in c["groups"]:
        hs, ds = g["headlines"], g["descriptions"]
        if len(hs) != 15 or len(set(hs)) != 15:
            errors.append(f"{g['name']}: need 15 unique headlines, got {len(set(hs))}")
        if len(ds) != 4:
            errors.append(f"{g['name']}: need 4 descriptions")
        for h in hs: check(f"H [{g['name']}]", h, 30)
        for d in ds: check(f"D [{g['name']}]", d, 90)
        for p in g["path"]: check(f"Path [{g['name']}]", p, 15)
        positives += g["phrase"] + g["exact"]

pos_tokens = {t for k in positives for t in k.lower().split()}
for n in NEG_ALL:
    if n in pos_tokens or any(n in k.lower().split() for k in positives):
        errors.append(f"negative '{n}' blocks a positive keyword")
    for k in positives:
        if n in k.lower():
            errors.append(f"negative '{n}' is a substring of positive '{k}' — check")

if errors:
    print("\n".join(errors)); sys.exit(1)

# ---------------------------------------------------------------- write
rows = []
def row(**kw):
    r = {c: "" for c in COLS}
    for k, v in kw.items():
        r[k.replace("_", " ")] = v
    rows.append(r)

for c in CAMPAIGNS:
    cn = c["name"]
    rows.append({**{x: "" for x in COLS}, "Campaign": cn, "Campaign Type": "Search",
                 "Networks": "Google search", "Budget": f"{c['budget']:.2f}",
                 "Budget type": "Daily", "Bid Strategy Type": "Manual CPC",
                 "Languages": "th;en", "EU political ads": "Doesn't have EU political ads",
                 "Campaign Status": "Paused"})
    rows.append({**{x: "" for x in COLS}, "Campaign": cn, "Location": "Thailand"})
    for n in NEG_ALL:
        rows.append({**{x: "" for x in COLS}, "Campaign": cn, "Keyword": n,
                     "Criterion Type": "Campaign Negative Phrase"})
    for g in c["groups"]:
        base = {**{x: "" for x in COLS}, "Campaign": cn, "Ad Group": g["name"]}
        rows.append({**base, "Max CPC": f"{g['cpc']:.2f}", "Ad Group Status": "Enabled"})
        for k in g["phrase"]:
            rows.append({**base, "Keyword": k, "Criterion Type": "Phrase", "Status": "Enabled"})
        for k in g["exact"]:
            rows.append({**base, "Keyword": k, "Criterion Type": "Exact", "Status": "Enabled"})
        ad = {**base, "Ad type": "Responsive search ad", "Final URL": URL,
              "Path 1": g["path"][0], "Path 2": g["path"][1], "Status": "Enabled"}
        for i, h in enumerate(g["headlines"], 1): ad[f"Headline {i}"] = h
        for i, d in enumerate(g["descriptions"], 1): ad[f"Description {i}"] = d
        rows.append(ad)

buf = io.StringIO()
w = csv.DictWriter(buf, fieldnames=COLS, delimiter="\t", lineterminator="\r\n")
w.writeheader(); w.writerows(rows)
with open(OUT, "w", encoding="utf-16") as f:  # utf-16 writes the BOM, LE on this machine
    f.write(buf.getvalue())

n_kw = len(positives)
print(f"OK: {len(CAMPAIGNS)} campaigns, {sum(len(c['groups']) for c in CAMPAIGNS)} ad groups, "
      f"{n_kw} keywords, {len(NEG_ALL)} negatives x {len(CAMPAIGNS)}, {len(rows)} rows -> {OUT}")
