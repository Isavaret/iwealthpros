import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // รวมถึง crawler ของ AI (GPTBot, ClaudeBot, PerplexityBot, Google-Extended ฯลฯ)
        // ตั้งใจเปิดให้เข้า เพราะเป้าหมายคือให้ถูกอ้างอิงในคำตอบของ AI ไม่ใช่กันออก
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
