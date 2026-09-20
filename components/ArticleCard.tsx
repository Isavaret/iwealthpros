import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import type { Article } from "@/lib/articles";

export default function ArticleCard({
  article,
  variant = "light",
}: {
  article: Article;
  variant?: "light" | "dark";
}) {
  const dark = variant === "dark";

  return (
    <Link
      href={`/articles/${article.slug}`}
      className={`group flex flex-col h-full rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
        dark
          ? "bg-[#132845] border-[#CBAE6B]/20 hover:border-[#CBAE6B]/50"
          : "bg-white border-gray-100 hover:shadow-xl hover:shadow-gray-100"
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <span
          className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold ${
            dark
              ? "bg-[#CBAE6B]/15 text-[#CBAE6B]"
              : "bg-[#0A192C] text-[#F0DA8F]"
          }`}
        >
          {article.order}
        </span>
        <span
          className={`text-xs font-semibold uppercase tracking-wider ${
            dark ? "text-[#CBAE6B]" : "text-[#856A2E]"
          }`}
        >
          {article.category}
        </span>
      </div>

      <h3
        className={`font-bold text-lg leading-snug mb-3 ${
          dark
            ? "text-white group-hover:text-[#F0DA8F]"
            : "text-[#0A192C] group-hover:text-[#856A2E]"
        } transition-colors`}
      >
        {article.title}
      </h3>

      <p
        className={`text-sm leading-relaxed mb-5 line-clamp-4 ${
          dark ? "text-white/60" : "text-gray-600"
        }`}
      >
        {article.excerpt}
      </p>

      <div
        className={`mt-auto flex items-center justify-between text-xs ${
          dark ? "text-white/40" : "text-gray-400"
        }`}
      >
        <span className="flex items-center gap-1.5">
          <Clock size={13} />
          อ่านจบใน {article.readMinutes} นาที
        </span>
        <span
          className={`flex items-center gap-1 font-semibold ${
            dark ? "text-[#CBAE6B]" : "text-[#856A2E]"
          }`}
        >
          อ่านต่อ
          <ArrowRight
            size={14}
            className="group-hover:translate-x-1 transition-transform"
          />
        </span>
      </div>
    </Link>
  );
}
