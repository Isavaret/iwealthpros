import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { articles, getArticle } from "@/lib/articles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "ไม่พบบทความ | I Wealth Pros" };

  return {
    title: `${article.title} | I Wealth Pros`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      locale: "th_TH",
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const others = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main>
        {/* Article header */}
        <header className="relative overflow-hidden bg-navy-gradient pt-28 pb-12 sm:pt-36 sm:pb-16">
          <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-[#CBAE6B]/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />
          <div className="container-page relative max-w-3xl">
            <Link
              href="/articles"
              className="inline-flex items-center gap-1.5 text-white/50 hover:text-[#CBAE6B] text-sm transition-colors mb-8"
            >
              <ArrowLeft size={15} />
              กลับไปหน้าบทความทั้งหมด
            </Link>

            <p className="text-[#CBAE6B] text-xs font-semibold uppercase tracking-widest mb-4">
              บทความที่ {article.order} · {article.category}
            </p>
            <h1 className="h2-fluid font-bold text-white mb-5 text-balance">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-white/40 text-sm">
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                อ่านจบใน {article.readMinutes} นาที
              </span>
              <span className="hidden sm:block text-white/20">|</span>
              <span>I WEALTH PROS — ความรู้เรื่องกองทุนสำรองเลี้ยงชีพ</span>
            </div>
            <div className="rule-gold mt-8" />
          </div>
        </header>

        {/* Article body */}
        <article className="bg-white py-14 sm:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            {article.blocks.map((block, i) => {
              switch (block.type) {
                case "h2":
                  return (
                    <h2
                      key={i}
                      className="font-sans text-xl sm:text-2xl font-bold text-[#0A192C] mt-10 mb-4 scroll-mt-24"
                    >
                      {block.text}
                    </h2>
                  );

                case "p":
                  return (
                    <p
                      key={i}
                      className="text-gray-700 leading-[1.9] mb-5 text-[15px] sm:text-base"
                    >
                      {block.text}
                    </p>
                  );

                case "steps":
                  return (
                    <ol key={i} className="space-y-6 my-10">
                      {block.items.map((item, n) => (
                        <li
                          key={item.title}
                          className="relative pl-14 sm:pl-16"
                        >
                          <span className="absolute left-0 top-0 w-10 h-10 rounded-xl bg-[#0A192C] text-[#F0DA8F] font-bold flex items-center justify-center">
                            {n + 1}
                          </span>
                          <h3 className="font-bold text-[#0A192C] text-lg mb-2 leading-snug">
                            {item.title}
                          </h3>
                          <p className="text-gray-700 leading-[1.9] text-[15px] sm:text-base">
                            {item.text}
                          </p>
                        </li>
                      ))}
                    </ol>
                  );

                case "quote":
                  return (
                    <blockquote
                      key={i}
                      className="my-10 border-l-4 border-[#CBAE6B] bg-[#F7EBC6]/30 rounded-r-xl px-6 py-5"
                    >
                      <p className="text-[#0A192C] font-medium leading-[1.8]">
                        {block.text}
                      </p>
                    </blockquote>
                  );

                case "table":
                  return (
                    <div
                      key={i}
                      className="my-8 overflow-x-auto rounded-xl border border-gray-100 shadow-sm"
                    >
                      <table className="w-full text-sm min-w-[640px]">
                        <thead className="bg-[#0A192C]">
                          <tr>
                            {block.head.map((h) => (
                              <th
                                key={h}
                                className="text-left px-4 py-3 text-[#F0DA8F] font-semibold text-xs"
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {block.rows.map((row, r) => (
                            <tr key={r} className={r % 2 ? "bg-gray-50/60" : ""}>
                              {row.map((cell, c) => (
                                <td
                                  key={c}
                                  className={`px-4 py-3 align-top leading-relaxed ${
                                    c === 0
                                      ? "font-semibold text-[#0A192C] whitespace-nowrap"
                                      : "text-gray-700"
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
            })}

            {/* CTA */}
            <div className="mt-12 bg-[#0A192C] rounded-2xl p-7 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#CBAE6B]/10 rounded-full blur-2xl" />
              <div className="relative">
                <p className="text-white/80 leading-[1.9] text-[15px] sm:text-base mb-6">
                  {article.cta}
                </p>
                <Link
                  href="/#contact-form"
                  className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-gold-metallic text-[#0A192C] font-bold text-sm transition-all hover:scale-105"
                >
                  ขอข้อเสนอ PVD ฟรี
                </Link>
              </div>
            </div>

            <p className="mt-8 text-gray-400 text-xs leading-relaxed">
              บทความนี้จัดทำเพื่อเป็นความรู้ทั่วไป อ้างอิงกฎหมายและอัตราภาษี ณ ปี 2569
              ไม่ถือเป็นคำแนะนำการลงทุน
            </p>
          </div>
        </article>

        {/* Other articles */}
        <section className="bg-gray-50 py-14 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="font-sans text-2xl font-bold text-[#0A192C] mb-8">
              บทความอื่นในชุดนี้
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {others.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
