

"use client";

import React from "react";
import HeroToAbout from "@/components/HeroToAbout";
import AboutSection from "@/components/AboutSection";
import EcosystemSection from "@/components/EcosystemSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import TeamSection from "@/components/TeamSection";
import ClientsSection from "@/components/ClientsSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden">
      
      <div className="relative z-10 w-full max-w-[1400px] mx-auto">
        <HeroToAbout />
        
        <div className="relative w-full">
          <div className="relative z-10 w-full">
            <AboutSection />
            <EcosystemSection />
            <ServicesSection />
            <PortfolioSection />
            <TeamSection />
            <ClientsSection />
            <CtaSection />
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}
