import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "I Wealth Pros | ที่ปรึกษาการเงินและกองทุนสำรองเลี้ยงชีพ",
  description:
    "I Wealth Pros — ที่ปรึกษาด้านการเงินและการลงทุน ผู้เชี่ยวชาญกองทุนสำรองเลี้ยงชีพ (PVD) รางวัล Provident Fund Of the Year 2022 & 2025",
  openGraph: {
    title: "I Wealth Pros | ที่ปรึกษาการเงินและกองทุนสำรองเลี้ยงชีพ",
    description: "รับคำปรึกษาฟรี ทีมงานติดต่อกลับภายใน 24 ชั่วโมง",
    locale: "th_TH",
    type: "website",
  },
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
