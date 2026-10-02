import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BrandStrip from "@/components/BrandStrip";
import PainPointSection from "@/components/PainPointSection";
import SolutionSection from "@/components/SolutionSection";
import LeadForm from "@/components/LeadForm";
import CorpSolutionsSection from "@/components/CorpSolutionsSection";
import ArticlesSection from "@/components/ArticlesSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { homePageSchema } from "@/lib/schema";

export default function Home() {
  return (
    <main>
      <JsonLd data={homePageSchema} />
      <Navbar />
      <HeroSection />
      <BrandStrip />
      <PainPointSection />
      <SolutionSection />
      <LeadForm />
      <CorpSolutionsSection />
      <FaqSection />
      <ArticlesSection />
      <Footer />
    </main>
  );
}
