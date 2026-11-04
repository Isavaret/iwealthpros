import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { articles, articleSeries, articlesInSeries, seriesOrder } from "@/lib/articles";
import JsonLd from "@/components/JsonLd";
import { articleListSchema } from "@/lib/schema";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "บทความความรู้ PVD",
  alternates: { canonical: "/articles" },
  description:
    "บทความความรู้เรื่องกองทุนสำรองเลี้ยงชีพ (PVD) สำหรับเจ้าของธุรกิจและฝ่าย HR โดยทีม I Wealth Pros — กองทุนสงเคราะห์ลูกจ้าง ต้นทุนการตั้ง PVD ขั้นตอนจัดตั้ง การออกแบบอัตราสมทบ ภาษี และการรักษาพนักงาน",
};

export default function ArticlesPage() {
  return (
    <>
      <JsonLd data={articleListSchema(articles)} />
      <Navbar />
      <main>
        {/* Header */}
        <section className="relative overflow-hidden bg-navy-gradient pt-28 pb-14 sm:pt-36 sm:pb-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#CBAE6B]/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
          <div className="container-page relative text-center">
            <div className="eyebrow mb-6 border border-[#CBAE6B]/30 bg-[#CBAE6B]/10 text-[#F0DA8F]">
              <BookOpen size={16} className="shrink-0 text-[#CBAE6B]" />
              {seriesOrder.length} ชุด · {articles.length} บทความ
            </div>
            <h1 className="h1-fluid font-bold text-white mb-5 text-balance">
              บทความความรู้ PVD
              <br />
              <span className="text-gold-metallic">สำหรับเจ้าของธุรกิจ</span>
            </h1>
            <p className="lead text-white/60 max-w-2xl mx-auto text-pretty">
              รวมบทความที่เจ้าของกิจการและฝ่าย HR ควรรู้ ก่อนตัดสินใจจัดตั้งกองทุนสำรองเลี้ยงชีพ
              พร้อมอัปเดตกฎหมายกองทุนสงเคราะห์ลูกจ้างล่าสุด
            </p>
            <div className="rule-gold max-w-xs mx-auto mt-8" />
            <p className="text-white/30 text-xs mt-5">
              จัดทำโดยทีม I Wealth Pros · ข้อมูลอ้างอิงกฎหมายและอัตราภาษี ณ ปี 2569
            </p>
          </div>
        </section>

        {/* Article grid */}
        <section className="bg-light-gradient section-y">
          <div className="container-page">
            <div className="space-y-16 sm:space-y-20">
              {seriesOrder.map((id) => (
                <div key={id}>
                  <div className="mb-8 sm:mb-10">
                    <p className="mb-2 text-xs font-semibold tracking-[0.3em] text-[#856A2E] uppercase">
                      ชุดที่ {id}
                    </p>
                    <h2 className="h3-fluid font-bold text-[#0A192C] mb-2 text-balance">
                      {articleSeries[id].title}
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base max-w-3xl text-pretty">
                      {articleSeries[id].description}
                    </p>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                    {articlesInSeries(id).map((article) => (
                      <ArticleCard key={article.slug} article={article} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-3xl bg-navy-gradient p-8 text-center ring-1 ring-[#CBAE6B]/20 sm:p-10">
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
