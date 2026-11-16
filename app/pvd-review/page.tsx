import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PvdReviewHero from "@/components/PvdReviewHero";
import PvdReviewDetails from "@/components/PvdReviewDetails";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { pvdReview } from "@/lib/pvd-review";
import { pvdReviewPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: pvdReview.title,
  description: pvdReview.description,
  alternates: { canonical: pvdReview.path },
  openGraph: {
    type: "website",
    title: pvdReview.title,
    description: pvdReview.description,
    url: pvdReview.path,
    locale: "th_TH",
    // การกำหนด openGraph ระดับหน้าจะแทนที่ของ layout ทั้งก้อน — ต้องใส่ภาพแชร์ซ้ำเอง
    images: "/opengraph-image.jpg",
  },
  twitter: {
    card: "summary_large_image",
    title: pvdReview.title,
    description: pvdReview.description,
  },
};

/** Landing page ของโฆษณากลุ่ม "มี PVD แล้ว - เทียบ บลจ." */
export default function PvdReviewPage() {
  return (
    <>
      <JsonLd data={pvdReviewPageSchema} />
      <Navbar cta={{ label: "ขอข้อเสนอเปรียบเทียบ", href: "#contact-form" }} />
      <main>
        <PvdReviewHero />
        <PvdReviewDetails />
        <LeadForm variant="review" />
      </main>
      <Footer />
    </>
  );
}
