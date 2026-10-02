/**
 * ฝัง structured data (schema.org) ให้ Google, Bing และ AI crawler อ่านได้
 * — ตัวที่ทำให้เว็บถูกหยิบไปตอบใน AI Overviews / ChatGPT / Perplexity
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // ข้อมูลทั้งหมดมาจากคอนสแตนต์ในโค้ด ไม่ใช่ input จากผู้ใช้
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
