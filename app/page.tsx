import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BrandStrip from "@/components/BrandStrip";
import PainPointSection from "@/components/PainPointSection";
import SolutionSection from "@/components/SolutionSection";
import LeadForm from "@/components/LeadForm";
import CorpSolutionsSection from "@/components/CorpSolutionsSection";
import ArticlesSection from "@/components/ArticlesSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <BrandStrip />
      <PainPointSection />
      <SolutionSection />
      <LeadForm />
      <CorpSolutionsSection />
      <ArticlesSection />
      <Footer />
    </main>
  );
}
