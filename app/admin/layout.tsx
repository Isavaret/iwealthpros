import type { Metadata } from "next";

/** หน้าหลังบ้าน — กัน search engine และ AI crawler ไม่ให้เก็บ index */
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
