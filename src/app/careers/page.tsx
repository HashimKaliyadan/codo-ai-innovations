import CareersHero from "@/components/careers/CareersHero";
import WhyJoinUs from "@/components/careers/WhyJoinUs";
import OurValues from "@/components/careers/OurValues";
import OpenPositions from "@/components/careers/OpenPositions";

export default function CareersPage() {
  return (
    <main style={{ minHeight: "100dvh" }}>
      <CareersHero />
      <WhyJoinUs />
      <OurValues />
      <OpenPositions />
    </main>
  );
}
