import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { articles } from "@/lib/articles";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "บทความความรู้ PVD | I Wealth Pros",
  description:
    "ชุดบทความให้ความรู้ “กองทุนสำรองเลี้ยงชีพ (PVD) เพื่อธุรกิจยุคใหม่” โดยทีม I Wealth Pros — ข้อดีของ PVD, การเลือกผู้บริหารกองทุน, การรักษาพนักงาน และการวางแผนภาษีนิติบุคคล",
};

export default function ArticlesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-18">
        {/* Header */}
        <section className="bg-[#0A192C] py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#CBAE6B]/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#CBAE6B]/10 border border-[#CBAE6B]/30 mb-6">
              <BookOpen size={16} className="text-[#CBAE6B]" />
              <span className="text-[#CBAE6B] text-sm font-medium">
                ชุดบทความให้ความรู้
              </span>
            </div>
            <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
              กองทุนสำรองเลี้ยงชีพ (PVD)
              <br />
              <span className="text-gold-metallic">เพื่อธุรกิจยุคใหม่</span>
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto leading-relaxed">
              รวมบทความที่เจ้าของกิจการและฝ่าย HR ควรรู้ ก่อนตัดสินใจจัดตั้งกองทุนสำรองเลี้ยงชีพ
              พร้อมอัปเดตกฎหมายที่จะมีผลบังคับใช้ 1 ตุลาคม 2569
            </p>
            <div className="rule-gold max-w-xs mx-auto mt-8" />
            <p className="text-white/30 text-xs mt-5">
              จัดทำโดยทีม I Wealth Pros · ข้อมูลอ้างอิงกฎหมายและอัตราภาษี ณ ปี 2569
            </p>
          </div>
        </section>

        {/* Article grid */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid sm:grid-cols-2 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>

            <div className="mt-12 bg-[#0A192C] rounded-2xl p-8 sm:p-10 text-center">
              <h2 className="text-white text-xl sm:text-2xl font-bold mb-3">
                อยากรู้ว่าแบบไหนเหมาะกับบริษัทคุณ?
              </h2>
              <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto mb-6 leading-relaxed">
                กรอกรายละเอียดบริษัทเพื่อให้ทีมงานจัดทำข้อเสนอกองทุนสำรองเลี้ยงชีพ
                ให้เหมาะกับขนาดองค์กรและงบประมาณของคุณโดยเฉพาะ
              </p>
              <Link
                href="/#contact-form"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gold-metallic text-[#0A192C] font-bold transition-all hover:scale-105 shadow-lg shadow-[#CBAE6B]/20"
              >
                ขอข้อเสนอ PVD ฟรี
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
