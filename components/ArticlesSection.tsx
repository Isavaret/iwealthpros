import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import ArticleCard from "@/components/ArticleCard";
import { articleSeries, articlesInSeries, seriesOrder } from "@/lib/articles";

// หน้าแรกโชว์แค่ 4 บทความแรกของชุดล่าสุด ที่เหลืออยู่ในหน้า /articles
const latest = seriesOrder[0];
const featured = articlesInSeries(latest).slice(0, 4);

export default function ArticlesSection() {
  return (
    <section id="articles" className="scroll-mt-28 bg-navy-gradient section-y relative overflow-hidden">
      <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-[#CBAE6B]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="container-page relative">
        <div className="text-center mb-12 sm:mb-14">
          <div className="eyebrow mb-6 border border-[#CBAE6B]/30 bg-[#CBAE6B]/10 text-[#F0DA8F]">
            <BookOpen size={16} className="shrink-0 text-[#CBAE6B]" />
            ความรู้เรื่อง PVD
          </div>
          <h2 className="h2-fluid font-bold text-white mb-4 text-balance">
            บทความ<span className="text-gold-metallic">ที่เจ้าของธุรกิจควรอ่าน</span>
          </h2>
          <p className="lead text-white/60 max-w-2xl mx-auto text-pretty">
            ชุดบทความล่าสุด “{articleSeries[latest].title}”
            สรุปสั้น อ่านจบได้ใน 4–6 นาที
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
          {featured.map((article) => (
            <ArticleCard key={article.slug} article={article} variant="dark" />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/articles"
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 font-semibold text-[#CBAE6B] transition-colors hover:text-[#F0DA8F]"
          >
            ดูบทความทั้งหมด
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
