import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import WorkshopHero from "@/components/WorkshopHero";
import WorkshopBenefits from "@/components/WorkshopBenefits";
import WorkshopCurriculum from "@/components/WorkshopCurriculum";
import WorkshopProcess from "@/components/WorkshopProcess";
import WorkshopForm from "@/components/WorkshopForm";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { workshop } from "@/lib/workshop";
import { workshopPageSchema } from "@/lib/schema";

const title = `${workshop.name} ฟรี`;

export const metadata: Metadata = {
  title,
  description: workshop.description,
  alternates: { canonical: "/workshop" },
  openGraph: {
    type: "website",
    title,
    description: workshop.description,
    url: "/workshop",
    locale: "th_TH",
    // การกำหนด openGraph ระดับหน้าจะแทนที่ของ layout ทั้งก้อน — ต้องใส่ภาพแชร์ซ้ำเอง
    images: "/opengraph-image.jpg",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: workshop.description,
  },
};

export default function WorkshopPage() {
  return (
    <>
      <JsonLd data={workshopPageSchema} />
      <Navbar cta={{ label: "จอง Workshop ฟรี", href: "#workshop-form" }} />
      <main>
        <WorkshopHero />
        <WorkshopBenefits />
        <WorkshopCurriculum />
        <WorkshopProcess />
        <WorkshopForm />
      </main>
      <Footer />
    </>
  );
}
