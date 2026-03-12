

"use client";

import React from "react";
import HeroToAbout from "@/components/HeroToAbout";
import AboutSection from "@/components/AboutSection";
import EcosystemSection from "@/components/EcosystemSection";

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden">
      
      <div className="relative z-10 w-full max-w-[1400px] mx-auto">
        <HeroToAbout />
        <AboutSection />
        <EcosystemSection />
      </div>
    </main>
  );
}
