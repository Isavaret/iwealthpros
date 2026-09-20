import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import ArticleCard from "@/components/ArticleCard";
import { articles } from "@/lib/articles";

export default function ArticlesSection() {
  return (
    <section id="articles" className="bg-[#0A192C] py-20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-[#CBAE6B]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#CBAE6B]/10 border border-[#CBAE6B]/30 mb-6">
            <BookOpen size={16} className="text-[#CBAE6B]" />
            <span className="text-[#CBAE6B] text-sm font-medium">
              ความรู้เรื่อง PVD
            </span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold text-white mb-4">
            บทความ<span className="text-gold-metallic">ที่เจ้าของธุรกิจควรอ่าน</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            ชุดบทความ “กองทุนสำรองเลี้ยงชีพ (PVD) เพื่อธุรกิจยุคใหม่”
            สรุปสั้น อ่านจบได้ใน 4–6 นาที
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} variant="dark" />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-[#CBAE6B] hover:text-[#F0DA8F] font-semibold transition-colors"
          >
            ดูบทความทั้งหมด
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
