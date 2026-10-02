import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import { site, siteUrl } from "@/lib/site";

const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const title = `${site.name} | ${site.tagline}`;

export const metadata: Metadata = {
  // ทำให้ทุก URL ใน metadata (canonical, OG image) กลายเป็น absolute อัตโนมัติ
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "กองทุนสำรองเลี้ยงชีพ",
    "PVD",
    "Provident Fund",
    "จัดตั้งกองทุนสำรองเลี้ยงชีพ",
    "กองทุนสงเคราะห์ลูกจ้าง",
    "ประกันกลุ่ม",
    "Key Man Insurance",
    "สวัสดิการพนักงาน",
    "ลดหย่อนภาษีนิติบุคคล",
    "ที่ปรึกษาการเงินองค์กร",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    title,
    description: site.description,
    url: "/",
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  // ตั้งค่าได้ภายหลังเมื่อยืนยันเว็บไซต์กับ Search Console / Bing
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : {},
  },
  category: "finance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={prompt.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
