import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import { site } from "@/lib/site";
import { CONSENT_KEY } from "@/lib/consent";

/**
 * นโยบายความเป็นส่วนตัวตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)
 * ข้อเท็จจริงในหน้านี้ต้องตรงกับระบบจริง — ถ้าเพิ่มฟอร์ม ผู้ให้บริการ หรือ tag ใหม่ ให้แก้หน้านี้และ
 * site.privacyPolicyUpdatedAt ด้วย
 */

export const metadata: Metadata = {
  title: "นโยบายความเป็นส่วนตัว",
  description:
    "นโยบายความเป็นส่วนตัวและการใช้คุกกี้ของเว็บไซต์ I Wealth Pros ตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 — ข้อมูลที่เก็บ วัตถุประสงค์ ระยะเวลาเก็บ และสิทธิของเจ้าของข้อมูล",
  alternates: { canonical: "/privacy" },
};

const updatedAt = new Date(site.privacyPolicyUpdatedAt).toLocaleDateString("th-TH", {
  dateStyle: "long",
  timeZone: "Asia/Bangkok",
});

const sections = [
  { id: "controller", title: "1. ผู้ควบคุมข้อมูลส่วนบุคคล" },
  { id: "data", title: "2. ข้อมูลที่เราเก็บ" },
  { id: "purposes", title: "3. วัตถุประสงค์และฐานทางกฎหมาย" },
  { id: "sharing", title: "4. การเปิดเผยและผู้ให้บริการ" },
  { id: "transfer", title: "5. การส่งข้อมูลไปต่างประเทศ" },
  { id: "retention", title: "6. ระยะเวลาเก็บรักษา" },
  { id: "cookies", title: "7. คุกกี้" },
  { id: "rights", title: "8. สิทธิของเจ้าของข้อมูล" },
  { id: "security", title: "9. การรักษาความปลอดภัย" },
  { id: "changes", title: "10. การเปลี่ยนแปลงนโยบาย" },
];

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="scroll-mt-28 font-sans text-xl sm:text-2xl font-bold text-[#0A192C] mt-12 mb-4"
    >
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-gray-700 leading-[1.9] mb-4 text-[15px] sm:text-base">{children}</p>
  );
}

function List({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="my-4 space-y-2.5">
      {items.map((item, i) => (
        <li
          key={i}
          className="relative pl-6 text-gray-700 leading-[1.9] text-[15px] sm:text-base"
        >
          <span
            className="absolute left-0 top-[0.8em] h-2 w-2 rounded-full bg-[#CBAE6B]"
            aria-hidden="true"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

function Table({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
      <table className="w-full min-w-[600px] text-sm">
        <thead className="bg-[#0A192C]">
          <tr>
            {head.map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#F0DA8F]">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row, r) => (
            <tr key={r} className={r % 2 ? "bg-gray-50/60" : ""}>
              {row.map((cell, c) => (
                <td
                  key={c}
                  className={`px-4 py-3 align-top leading-relaxed ${
                    c === 0 ? "font-semibold text-[#0A192C]" : "text-gray-700"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const a = "font-medium text-[#856A2E] underline decoration-[#CBAE6B]/50 underline-offset-4 hover:decoration-[#856A2E]";

export default function PrivacyPage() {
  const { dataController } = site;
  const line = site.social.find((url) => url.includes("lin.ee"));

  const contact = (
    <List
      items={[
        <>
          อีเมล:{" "}
          <a href={`mailto:${site.email}`} className={a}>
            {site.email}
          </a>
        </>,
        <>
          โทรศัพท์:{" "}
          <a href={`tel:${site.phone}`} className={a}>
            {site.phoneDisplay}
          </a>
        </>,
        ...(line
          ? [
              <>
                LINE:{" "}
                <a href={line} target="_blank" rel="noopener noreferrer" className={a}>
                  {line.replace("https://", "")}
                </a>
              </>,
            ]
          : []),
      ]}
    />
  );

  return (
    <>
      <Navbar />
      <main>
        <header className="relative overflow-hidden bg-navy-gradient pt-28 pb-12 sm:pt-36 sm:pb-16">
          <div className="container-page relative max-w-3xl">
            <div className="eyebrow mb-6 border border-[#CBAE6B]/30 bg-[#CBAE6B]/10 text-[#F0DA8F]">
              <ShieldCheck size={16} className="shrink-0 text-[#CBAE6B]" />
              PDPA
            </div>
            <h1 className="h2-fluid font-bold text-white mb-4 text-balance">
              นโยบายความเป็นส่วนตัว
            </h1>
            <p className="text-white/60 leading-relaxed">
              ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 · มีผลตั้งแต่ {updatedAt}
            </p>
            <div className="rule-gold mt-8" />
          </div>
        </header>

        <article className="bg-white py-12 sm:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <P>
              นโยบายนี้อธิบายว่า {site.name} เก็บ ใช้ และเปิดเผยข้อมูลส่วนบุคคลของผู้เข้าชมเว็บไซต์{" "}
              {site.url.replace("https://", "")} และผู้ที่ส่งข้อมูลผ่านแบบฟอร์มบนเว็บไซต์อย่างไร
              รวมถึงสิทธิของท่านในฐานะเจ้าของข้อมูลส่วนบุคคล
            </P>

            <nav
              aria-label="สารบัญ"
              className="my-8 rounded-2xl border border-gray-100 bg-gray-50 p-5 sm:p-6"
            >
              <p className="mb-3 text-sm font-semibold text-[#0A192C]">สารบัญ</p>
              <ol className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="inline-flex min-h-9 items-center text-sm text-gray-600 hover:text-[#856A2E]"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <H2 id="controller">{sections[0].title}</H2>
            <P>
              ผู้ควบคุมข้อมูลส่วนบุคคลสำหรับเว็บไซต์นี้คือ
              {dataController.name ? (
                <>
                  {" "}
                  <strong className="text-[#0A192C]">{dataController.name}</strong>{" "}
                  ที่ปรึกษาผู้ให้บริการภายใต้ชื่อ {site.name}
                </>
              ) : (
                <> ที่ปรึกษาผู้ให้บริการภายใต้ชื่อ {site.name}</>
              )}
              {dataController.address && <> ที่อยู่ {dataController.address}</>} ติดต่อเรื่องข้อมูลส่วนบุคคลได้ที่
            </P>
            {contact}

            <H2 id="data">{sections[1].title}</H2>
            <P>เราเก็บเฉพาะข้อมูลที่ท่านกรอกเองและข้อมูลการใช้งานเว็บไซต์ ดังนี้</P>
            <Table
              head={["แหล่งข้อมูล", "ข้อมูลที่เก็บ"]}
              rows={[
                [
                  "แบบฟอร์มขอข้อเสนอกองทุนสำรองเลี้ยงชีพ",
                  "ชื่อผู้ติดต่อ ตำแหน่ง เบอร์โทร อีเมล ชื่อบริษัท ที่อยู่บริษัท ประเภทธุรกิจ จำนวนพนักงาน เงินเดือนพื้นฐานรวมต่อเดือน ข้อมูลกองทุนสำรองเลี้ยงชีพและประกันกลุ่มที่บริษัทมีอยู่ (ถ้าระบุ) ภาษาของข้อเสนอ และข้อความเพิ่มเติม",
                ],
                [
                  "แบบฟอร์มขอจัด Workshop วางแผนเกษียณ",
                  "ชื่อผู้ติดต่อ ตำแหน่ง เบอร์โทร อีเมล ชื่อองค์กร ประเภทธุรกิจ จำนวนพนักงาน จำนวนผู้เข้าร่วม รูปแบบและช่วงเวลาที่สะดวก การมีกองทุนสำรองเลี้ยงชีพ และข้อความเพิ่มเติม",
                ],
                [
                  "การใช้งานเว็บไซต์",
                  "หมายเลข IP ประเภทเบราว์เซอร์และอุปกรณ์ หน้าที่เข้าชม และข้อมูลจากคุกกี้ — คุกกี้วิเคราะห์และโฆษณาจะเก็บเฉพาะเมื่อท่านให้ความยินยอม (ดูข้อ 7)",
                ],
              ]}
            />
            <P>
              ข้อมูลในแบบฟอร์มส่วนใหญ่เป็นข้อมูลขององค์กร ข้อมูลส่วนบุคคลคือข้อมูลของผู้ติดต่อ
              โปรดอย่าระบุข้อมูลส่วนบุคคลที่อ่อนไหว เช่น ข้อมูลสุขภาพ ศาสนา หรือเลขประจำตัวประชาชน
              ในช่องข้อความเพิ่มเติม
            </P>

            <H2 id="purposes">{sections[2].title}</H2>
            <Table
              head={["วัตถุประสงค์", "ฐานทางกฎหมาย"]}
              rows={[
                [
                  "ติดต่อกลับ จัดทำข้อเสนอ และนัดหมาย workshop ตามที่ท่านร้องขอ",
                  "เพื่อดำเนินการตามคำขอของท่านก่อนเข้าทำสัญญา (มาตรา 24(3))",
                ],
                [
                  "บันทึกและติดตามสถานะคำขอภายในทีม",
                  "ประโยชน์โดยชอบด้วยกฎหมายในการให้บริการตามคำขอ (มาตรา 24(5))",
                ],
                [
                  "วิเคราะห์การใช้งานเว็บไซต์และวัดผลโฆษณา (Google Analytics / Google Ads)",
                  "ความยินยอมของท่าน (มาตรา 19) — ถอนได้ทุกเมื่อ",
                ],
                [
                  "รักษาความปลอดภัยและป้องกันการใช้งานเว็บไซต์โดยมิชอบ",
                  "ประโยชน์โดยชอบด้วยกฎหมาย (มาตรา 24(5))",
                ],
              ]}
            />

            <H2 id="sharing">{sections[3].title}</H2>
            <P>
              เราไม่ขาย และไม่ส่งต่อข้อมูลที่ท่านกรอกในแบบฟอร์มให้บริษัทประกัน
              บริษัทจัดการกองทุน หรือบุคคลภายนอกอื่นเพื่อจัดทำข้อเสนอ
              ทีมงาน {site.name} เป็นผู้จัดทำข้อเสนอและติดต่อท่านเอง
            </P>
            <P>
              เราใช้ผู้ให้บริการต่อไปนี้ในการดำเนินงานเว็บไซต์ ซึ่งประมวลผลข้อมูลตามคำสั่งของเราเท่านั้น
            </P>
            <Table
              head={["ผู้ให้บริการ", "หน้าที่"]}
              rows={[
                ["Vercel", "โฮสต์เว็บไซต์และรับข้อมูลจากแบบฟอร์ม"],
                ["Neon", "ฐานข้อมูลที่เก็บข้อมูลจากแบบฟอร์ม"],
                ["Resend", "ส่งอีเมลแจ้งเตือนคำขอใหม่ถึงทีมงาน"],
                [
                  "Google (Tag Manager, Analytics, Ads)",
                  "วิเคราะห์การใช้งานและวัดผลโฆษณา — ทำงานเฉพาะเมื่อท่านยินยอม",
                ],
              ]}
            />
            <P>
              นอกจากนี้ เราอาจเปิดเผยข้อมูลเมื่อกฎหมายกำหนด หรือตามคำสั่งของหน่วยงานรัฐที่มีอำนาจ
            </P>

            <H2 id="transfer">{sections[4].title}</H2>
            <P>
              ผู้ให้บริการข้างต้นจัดเก็บและประมวลผลข้อมูลบนเซิร์ฟเวอร์ในต่างประเทศ
              โดยฐานข้อมูลตั้งอยู่ที่สิงคโปร์ และระบบเว็บไซต์ อีเมล และเครื่องมือของ Google
              อาจประมวลผลข้อมูลในสหรัฐอเมริกาหรือประเทศอื่น เราเลือกใช้ผู้ให้บริการที่มีมาตรการคุ้มครองข้อมูลส่วนบุคคล
              และส่งข้อมูลเท่าที่จำเป็นต่อการให้บริการเท่านั้น
            </P>

            <H2 id="retention">{sections[5].title}</H2>
            <List
              items={[
                "ข้อมูลจากแบบฟอร์ม: เก็บไว้ไม่เกิน 2 ปีนับจากการติดต่อครั้งล่าสุด หรือจนกว่าท่านจะขอให้ลบ แล้วแต่อย่างใดถึงก่อน",
                "หากท่านเข้าทำสัญญาใช้บริการกับเรา ข้อมูลที่เกี่ยวข้องจะเก็บต่อตามระยะเวลาที่จำเป็นต่อการให้บริการหรือที่กฎหมายกำหนด",
                "คุกกี้: เก็บตามอายุของคุกกี้แต่ละประเภท ส่วนการตั้งค่าความยินยอมเก็บไว้ในเบราว์เซอร์ของท่านจนกว่าท่านจะลบหรือเปลี่ยนการตั้งค่า",
              ]}
            />

            <H2 id="cookies">{sections[6].title}</H2>
            <P>
              คุกกี้คือไฟล์ข้อความขนาดเล็กที่เว็บไซต์บันทึกไว้ในเบราว์เซอร์ของท่าน
              เว็บไซต์นี้ใช้คุกกี้และพื้นที่จัดเก็บในเบราว์เซอร์ดังนี้
            </P>
            <Table
              head={["ประเภท", "ใช้ทำอะไร", "ต้องขอความยินยอม"]}
              rows={[
                [
                  "จำเป็น",
                  <>
                    จดจำการตั้งค่าความยินยอมคุกกี้ของท่าน (
                    <code className="text-xs">{CONSENT_KEY}</code>) และให้เว็บไซต์ทำงานได้อย่างปลอดภัย
                  </>,
                  "ไม่ต้อง",
                ],
                [
                  "วิเคราะห์การใช้งาน",
                  "Google Analytics — นับจำนวนผู้เข้าชมและหน้าที่ได้รับความสนใจ เพื่อปรับปรุงเว็บไซต์",
                  "ต้อง",
                ],
                [
                  "โฆษณา",
                  "Google Ads — วัดผลว่าโฆษณาพาผู้เข้าชมมาติดต่อเราหรือไม่",
                  "ต้อง",
                ],
              ]}
            />
            <P>
              เมื่อเข้าเว็บไซต์ครั้งแรก คุกกี้วิเคราะห์และโฆษณาจะปิดไว้จนกว่าท่านจะกด “ยอมรับทั้งหมด”
              ในแบนเนอร์คุกกี้ ท่านเปลี่ยนหรือถอนความยินยอมได้ทุกเมื่อ
            </P>
            <div className="mb-4">
              <CookieSettingsButton className="btn border border-[#0A192C] text-sm text-[#0A192C] hover:bg-[#0A192C] hover:text-white" />
            </div>
            <P>ท่านยังตั้งค่าเบราว์เซอร์ให้ปฏิเสธหรือลบคุกกี้ได้เอง แต่บางส่วนของเว็บไซต์อาจทำงานไม่สมบูรณ์</P>

            <H2 id="rights">{sections[7].title}</H2>
            <P>ภายใต้ พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล ท่านมีสิทธิดังต่อไปนี้</P>
            <List
              items={[
                "ถอนความยินยอมที่เคยให้ไว้ได้ทุกเมื่อ โดยไม่กระทบการประมวลผลที่ทำไปก่อนหน้า",
                "ขอเข้าถึงและขอรับสำเนาข้อมูลส่วนบุคคลของท่าน",
                "ขอรับหรือขอให้ส่งข้อมูลของท่านไปยังผู้ควบคุมข้อมูลรายอื่นในรูปแบบที่อ่านได้ด้วยเครื่องมืออัตโนมัติ",
                "คัดค้านการเก็บ ใช้ หรือเปิดเผยข้อมูลของท่าน",
                "ขอให้ลบ ทำลาย หรือทำให้ข้อมูลไม่สามารถระบุตัวตนได้",
                "ขอให้ระงับการใช้ข้อมูล",
                "ขอให้แก้ไขข้อมูลให้ถูกต้อง เป็นปัจจุบัน และสมบูรณ์",
                "ร้องเรียนต่อสำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล (สคส.) หากเห็นว่าเราไม่ปฏิบัติตามกฎหมาย",
              ]}
            />
            <P>
              ใช้สิทธิได้โดยติดต่อช่องทางในข้อ 1 เราจะตอบกลับภายใน 30 วันนับจากวันที่ได้รับคำขอ
              และอาจขอข้อมูลเพื่อยืนยันตัวตนก่อนดำเนินการ
            </P>

            <H2 id="security">{sections[8].title}</H2>
            <P>
              ข้อมูลส่งผ่านการเชื่อมต่อที่เข้ารหัส (HTTPS) และระบบจัดการข้อมูลจากแบบฟอร์มเข้าถึงได้เฉพาะทีมงานที่ได้รับอนุญาต
              ซึ่งต้องเข้าสู่ระบบและอยู่ในรายชื่อที่กำหนดไว้เท่านั้น
            </P>

            <H2 id="changes">{sections[9].title}</H2>
            <P>
              เราอาจปรับปรุงนโยบายนี้เป็นครั้งคราว ฉบับล่าสุดจะแสดงที่หน้านี้พร้อมวันที่มีผลด้านบน
              หากมีการเปลี่ยนแปลงวัตถุประสงค์การใช้คุกกี้ เราจะขอความยินยอมจากท่านใหม่
            </P>

            <div className="mt-12 rounded-2xl bg-[#0A192C] p-6 sm:p-8">
              <p className="mb-2 text-lg font-bold text-[#F0DA8F]">มีคำถามเรื่องข้อมูลส่วนบุคคล?</p>
              <p className="text-white/70 leading-relaxed">
                ติดต่อเราได้ที่{" "}
                <a href={`mailto:${site.email}`} className="text-[#F0DA8F] underline underline-offset-4">
                  {site.email}
                </a>{" "}
                หรือโทร{" "}
                <a href={`tel:${site.phone}`} className="text-[#F0DA8F] underline underline-offset-4">
                  {site.phoneDisplay}
                </a>
              </p>
              <Link
                href="/"
                className="mt-5 inline-flex min-h-11 items-center text-sm text-white/50 hover:text-[#CBAE6B]"
              >
                ← กลับหน้าแรก
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
