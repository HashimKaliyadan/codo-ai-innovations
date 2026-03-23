"use client";

import { Suspense } from "react";
import HeroSection from "@/components/about/HeroSection";
import ValuesSection from "@/components/about/ValuesSection";
import StatsCounter from "@/components/about/StatsCounter";
import TeamGrid from "@/components/about/TeamGrid";
import CultureGallery from "@/components/about/CultureGallery";
import JoinCTA from "@/components/about/JoinCTA";

function AboutPageInner() {
  return (
    <>
      <main style={{ position: "relative", minHeight: "100dvh" }}>
        <HeroSection />
        <ValuesSection />
        <StatsCounter />
        <TeamGrid />
        <CultureGallery />
        <JoinCTA />
      </main>
    </>
  );
}

export default function AboutPage() {
  return (
    <Suspense fallback={null}>
      <AboutPageInner />
    </Suspense>
  );
}
