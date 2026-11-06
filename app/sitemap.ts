import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { absoluteUrl, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const articlesUpdatedAt = articles
    .map((a) => a.updatedAt)
    .sort()
    .at(-1);

  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/workshop"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/privacy"),
      lastModified: new Date(site.privacyPolicyUpdatedAt),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: absoluteUrl("/articles"),
      lastModified: new Date(articlesUpdatedAt ?? Date.now()),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...articles.map((article) => ({
      url: absoluteUrl(`/articles/${article.slug}`),
      lastModified: new Date(article.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
