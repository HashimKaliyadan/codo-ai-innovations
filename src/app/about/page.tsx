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
      <main
        className="relative min-h-screen"
        style={{
          background: "#000",
          fontFamily: "'DM Sans', sans-serif",
          color: "#fff",
        }}
      >
        {/* Subtle noise grain overlay */}
        <div
          aria-hidden
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            opacity: 0.025,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "256px",
          }}
        />
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
