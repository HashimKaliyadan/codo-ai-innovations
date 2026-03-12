

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
          {/* Unified Background for About and Ecosystem */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: "linear-gradient(to bottom, transparent 0%, var(--glass-bg-solid) 5%, var(--glass-bg-solid) 95%, transparent 100%)",
            }}
          />
          
          <div
            aria-hidden="true"
            className="absolute z-0 pointer-events-none"
            style={{
              top: "5%",
              right: "-15%",
              width: "550px",
              height: "550px",
              background: "var(--shadow-glow)",
              filter: "blur(90px)",
              borderRadius: "50%",
              transform: "translateZ(0)",
            }}
          />
          
          <div
            aria-hidden="true"
            className="absolute z-0 pointer-events-none"
            style={{
              top: "45%",
              left: "-10%",
              width: "450px",
              height: "450px",
              background: "rgba(0,32,63,0.12)",
              filter: "blur(80px)",
              borderRadius: "50%",
              transform: "translateZ(0)",
            }}
          />

          <div
            aria-hidden="true"
            className="absolute z-0 pointer-events-none"
            style={{
              bottom: "5%",
              right: "-10%",
              width: "450px",
              height: "450px",
              background: "var(--shadow-glow)",
              filter: "blur(90px)",
              borderRadius: "50%",
              transform: "translateZ(0)",
            }}
          />

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
