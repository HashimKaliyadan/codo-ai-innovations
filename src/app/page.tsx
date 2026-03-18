import Hero from "@/components/home/Hero";

import AboutSection from "@/components/home/About";
import EcosystemSection from "@/components/home/Ecosystem";
import ServicesSection from "@/components/home/Services";
import PortfolioSection from "@/components/home/PortfolioHighlights";
import TeamSection from "@/components/home/TeamPreview";
import ClientsSection from "@/components/home/Clients";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-transparent">
      <Hero />
      <AboutSection />
      <EcosystemSection />
      <ServicesSection />
      <PortfolioSection />
      <TeamSection />
      <ClientsSection />
      <CTASection />
    </main>
  );
}
