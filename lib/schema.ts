import { absoluteUrl, site } from "@/lib/site";
import type { Article } from "@/lib/articles";
import { faqs } from "@/lib/faqs";

const ORG_ID = absoluteUrl("/#organization");
const WEBSITE_ID = absoluteUrl("/#website");

/** องค์กร — ผูกไว้ที่ @id เดียวแล้วอ้างถึงจากทุก schema อื่น */
export const organizationSchema = {
  "@type": "FinancialService",
  "@id": ORG_ID,
  name: site.name,
  url: site.url,
  description: site.description,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/logo-iwealthpros.jpg"),
  },
  image: absoluteUrl("/opengraph-image.jpg"),
  email: site.email,
  telephone: site.phone,
  sameAs: [...site.social],
  award: [...site.awards],
  areaServed: { "@type": "Country", name: "Thailand" },
  availableLanguage: ["th", "en"],
  knowsAbout: [
    "กองทุนสำรองเลี้ยงชีพ",
    "Provident Fund",
    "กองทุนสงเคราะห์ลูกจ้าง",
    "ประกันกลุ่ม",
    "Key Man Insurance",
    "การวางแผนภาษีนิติบุคคล",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: site.phone,
    email: site.email,
    areaServed: site.areaServed,
    availableLanguage: ["Thai", "English"],
  },
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: site.url,
  name: site.name,
  inLanguage: site.language,
  publisher: { "@id": ORG_ID },
};

/** บริการที่ให้ — ตรงกับการ์ดในหัวข้อ Corporate Solutions */
const services = [
  {
    name: "จัดตั้งกองทุนสำรองเลี้ยงชีพ (PVD)",
    alternateName: "Provident Fund",
    description:
      "จัดตั้งกองทุนสำรองเลี้ยงชีพสำหรับพนักงาน นายจ้างสมทบได้ตามที่ตกลง (2-15%) นำเงินสมทบเป็นค่าใช้จ่ายบริษัทได้ 100% พนักงานลดหย่อนภาษีได้สูงสุด 500,000 บาทต่อปี และได้รับยกเว้นการเข้าร่วมกองทุนสงเคราะห์ลูกจ้าง",
  },
  {
    name: "ประกันกลุ่มสำหรับองค์กร",
    alternateName: "Group Insurance",
    description:
      "ประกันสุขภาพและประกันอุบัติเหตุสำหรับพนักงานทั้งองค์กร รับตั้งแต่ 5 คนขึ้นไป เลือกความคุ้มครองและแบ่งกลุ่มตามระดับพนักงานได้ เบี้ยประกันนำเป็นค่าใช้จ่ายบริษัทได้",
  },
  {
    name: "Key Man Insurance",
    alternateName: "ประกันผู้บริหาร",
    description:
      "แผนประกันสำหรับผู้บริหารองค์กร เบี้ยประกันนำมาเป็นค่าใช้จ่ายบริษัทได้เต็ม 100% ตามที่สรรพากรยอมรับ และผู้บริหารยังได้รับสิทธิลดหย่อนภาษีส่วนตัวตามเกณฑ์",
  },
];

export const servicesSchema = services.map((s) => ({
  "@type": "Service",
  name: s.name,
  alternateName: s.alternateName,
  description: s.description,
  serviceType: s.name,
  provider: { "@id": ORG_ID },
  areaServed: { "@type": "Country", name: "Thailand" },
  audience: { "@type": "BusinessAudience", name: "องค์กรและนายจ้างในประเทศไทย" },
}));

/** FAQPage — ตัวที่ AI หยิบไปตอบคำถามตรง ๆ ได้มากที่สุด */
export const faqSchema = {
  "@type": "FAQPage",
  "@id": absoluteUrl("/#faq"),
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export const homePageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema,
    websiteSchema,
    {
      "@type": "WebPage",
      "@id": absoluteUrl("/#webpage"),
      url: site.url,
      name: `${site.name} | ${site.tagline}`,
      description: site.description,
      inLanguage: site.language,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORG_ID },
      primaryImageOfPage: absoluteUrl("/opengraph-image.jpg"),
    },
    faqSchema,
    ...servicesSchema,
  ],
};

export function articleSchema(article: Article) {
  const url = absoluteUrl(`/articles/${article.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: article.title,
        description: article.excerpt,
        articleSection: article.category,
        inLanguage: site.language,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        wordCount: article.blocks.reduce((n, b) => {
          if (b.type === "p" || b.type === "h2" || b.type === "quote")
            return n + b.text.length;
          if (b.type === "steps")
            return (
              n + b.items.reduce((m, i) => m + i.title.length + i.text.length, 0)
            );
          return n;
        }, 0),
        author: { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        image: absoluteUrl("/opengraph-image.jpg"),
      },
      organizationSchema,
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "หน้าแรก", item: site.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "บทความ",
            item: absoluteUrl("/articles"),
          },
          { "@type": "ListItem", position: 3, name: article.title, item: url },
        ],
      },
    ],
  };
}

export const articleListSchema = (list: Article[]) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": absoluteUrl("/articles#webpage"),
      url: absoluteUrl("/articles"),
      name: "บทความความรู้ PVD",
      inLanguage: site.language,
      isPartOf: { "@id": WEBSITE_ID },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: list.map((a, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: absoluteUrl(`/articles/${a.slug}`),
          name: a.title,
        })),
      },
    },
    organizationSchema,
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "หน้าแรก", item: site.url },
        {
          "@type": "ListItem",
          position: 2,
          name: "บทความ",
          item: absoluteUrl("/articles"),
        },
      ],
    },
  ],
});
