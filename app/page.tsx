import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PainPointSection from "@/components/PainPointSection";
import SolutionSection from "@/components/SolutionSection";
import LeadForm from "@/components/LeadForm";
import CorpSolutionsSection from "@/components/CorpSolutionsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <PainPointSection />
      <SolutionSection />
      <LeadForm />
      <CorpSolutionsSection />
      <Footer />
    </main>
  );
}
