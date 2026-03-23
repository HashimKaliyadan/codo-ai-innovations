"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";

/**
 * QR deep-link spotlight system.
 * Reads `?employee=slug` from the URL, scrolls to the card,
 * applies a golden spotlight animation, then cleans up.
 */
export function useSpotlight() {
  const searchParams = useSearchParams();
  const spotlightSlug = searchParams.get("employee");
  const [isSpotlighting, setIsSpotlighting] = useState(false);
  const [spotlightName, setSpotlightName] = useState<string | null>(null);

  const triggerSpotlight = useCallback((slug: string, name?: string) => {
    const targetCard = document.getElementById(`employee-${slug}`);
    if (!targetCard) return;

    setIsSpotlighting(true);
    if (name) setSpotlightName(name);

    // Wait for page to settle, then scroll + spotlight
    setTimeout(() => {
      targetCard.scrollIntoView({ behavior: "smooth", block: "center" });

      // Add spotlight class after scroll starts
      setTimeout(() => {
        targetCard.classList.add("qr-spotlight-active");

        // Remove after 3s
        setTimeout(() => {
          targetCard.classList.remove("qr-spotlight-active");
          setIsSpotlighting(false);
        }, 3000);
      }, 400);
    }, 600);
  }, []);

  useEffect(() => {
    if (!spotlightSlug) return;
    // Derive name from slug for the banner
    const derivedName = spotlightSlug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    setSpotlightName(derivedName);
    triggerSpotlight(spotlightSlug, derivedName);
  }, [spotlightSlug, triggerSpotlight]);

  return { spotlightSlug, isSpotlighting, spotlightName };
}
