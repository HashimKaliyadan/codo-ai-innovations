"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { TransitionLink as Link } from "@/components/transition/TransitionLink";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MEDIA_QUERIES } from "@/constants/breakpoints";
import { getResponsiveFont } from "@/lib/responsive";
import { motion } from "framer-motion";

gsap.registerPlugin(useGSAP);

const LETTERS: { char: string; green: boolean }[] = [
  { char: "C", green: false },
  { char: "O", green: false },
  { char: "D", green: false },
  { char: "O", green: true },
];

const CTAClass = [
  "h-11 px-8 sm:px-10",
  "flex items-center justify-center gap-3",
  "rounded-2xl",
  "text-white font-bold",
  "cursor-pointer",
  "relative overflow-hidden",
  "group",
  "transition-all duration-300",
  "shadow-lg",
].join(" ");

const CTALabelClass =
  "text-[10px] sm:text-xs md:text-sm font-bold tracking-widest uppercase whitespace-nowrap transition-transform duration-300 group-hover:-translateX-1";

// Using a custom ease comparable to Framer Motion's physical interpolation
const EASE_SMOOTH = "power3.inOut";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery(MEDIA_QUERIES.mobile);

  // Fix: prevent browser from restoring scroll position on reload
  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  useGSAP(() => {
    // Dynamically calculate coordinate offsets to prevent layout thrashing
    const getOffsets = () => {
      const w = window.innerWidth;
      const g2 = Math.max(10, Math.min(18, w * 0.014));
      const gRow = Math.max(42, Math.min(112, w * 0.09));
      const dotSize = Math.max(16, Math.min(24, w * 0.02));
      
      const d2 = (g2 + dotSize) / 2;
      const dRowOffset = gRow + dotSize;

      return { d2, dRowOffset };
    };

    const { d2, dRowOffset } = getOffsets();
    
    // Set initial states aggressively to prevent FOUC
    gsap.set(".hero-dot", { scale: 0, opacity: 0, x: 0, y: 0 });
    gsap.set(".hero-logo", { opacity: 0, scale: 0.4, filter: "blur(10px)" });
    gsap.set(".hero-letter", { opacity: 0, scale: 0.6, filter: "blur(12px)", y: 18 });
    gsap.set(".hero-subtitle, .hero-cta-1, .hero-cta-2", { opacity: 0, y: 20, filter: "blur(4px)" });
    // Remove blur for CTA explicitly
    gsap.set(".hero-cta-1, .hero-cta-2", { filter: "none" });

    const tl = gsap.timeline({ defaults: { ease: EASE_SMOOTH } });

    // 0: Initial Dot Entrance (0.0s)
    // Remove stagger so they enter as a perfect single unified dot
    tl.to(".hero-dot", { 
      scale: 1, 
      opacity: 1, 
      duration: 0.5, 
      ease: "back.out(1.5)"
    }, 0);

    // 1: Logo Phase (0.5s start)
    // Quickly scale/fade out the dots so they don't linger over the logo
    tl.to(".hero-dot", { scale: 0.5, opacity: 0, duration: 0.25 }, 0.5);
    tl.to(".hero-logo", { 
      opacity: 1, 
      scale: 0.8, 
      filter: "blur(0px)", 
      duration: 0.7 
    }, 0.5);

    // 2: 2x2 Grid Phase (Total Logo Presence: 1.1s, exit starts at exactly 1.5s)
    // Logo scales up and blurs away
    tl.to(".hero-logo", { 
      opacity: 0, 
      scale: 1.1, 
      filter: "blur(10px)", 
      duration: 0.6 
    }, 1.5);
    
    // Dots drop back in (restore scale) and translate mechanically
    tl.to(".hero-dot", { opacity: 1, scale: 1, duration: 0.45 }, 1.5);
    // Hardcoded absolute positioning utilizing `x` and `y` natively utilizes the GPU efficiently
    tl.to(".hero-dot-0", { x: -d2, y: -d2, duration: 0.6 }, 1.5);
    tl.to(".hero-dot-1", { x: d2, y: -d2, duration: 0.6 }, 1.5);
    tl.to(".hero-dot-2", { x: -d2, y: d2, duration: 0.6 }, 1.5);
    tl.to(".hero-dot-3", { x: d2, y: d2, duration: 0.6 }, 1.5);

    // 3: Row Phase (Shifted to 2.0s)
    tl.to(".hero-dot-0", { x: -1.5 * dRowOffset, y: 0, duration: 0.6 }, 2.0);
    tl.to(".hero-dot-1", { x: -0.5 * dRowOffset, y: 0, duration: 0.6 }, 2.0);
    tl.to(".hero-dot-2", { x: 0.5 * dRowOffset, y: 0, duration: 0.6 }, 2.0);
    tl.to(".hero-dot-3", { x: 1.5 * dRowOffset, y: 0, duration: 0.6 }, 2.0);

    // 4: Text Morph Phase (Shifted to 2.6s)
    // The dots expand immensely and fade out
    tl.to(".hero-dot", { 
      scale: 4, opacity: 0, duration: 0.45, ease: "power2.inOut", stagger: 0.06 
    }, 2.6);

    // The inner text emerges sharp, creating a visual morph
    tl.to(".hero-letter", { 
      opacity: 1, filter: "blur(0px)", scale: 1, y: 0, duration: 0.75, stagger: 0.06 
    }, 2.6 + 0.08);

    // 5: Support content enters (2.9s)
    tl.to(".hero-subtitle", { 
      opacity: 1, y: 0, filter: "blur(0px)", duration: 0.85 
    }, 2.6 + 0.3);

    tl.to(".hero-cta-1", { opacity: 1, y: 0, duration: 0.85 }, 2.6 + 0.45);
    tl.to(".hero-cta-2", { opacity: 1, y: 0, duration: 0.85 }, 2.6 + 0.6);

  }, { scope: containerRef }); // Binding context ensures proper cleanup and query selection

  return (
    <div
      ref={containerRef}
      className="font-sans"
      style={{
        height: "100vh",
        background: "transparent",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div className="h-screen flex items-center justify-center overflow-hidden">
        <div
          style={{
            textAlign: "center",
            padding: isMobile ? "0 1.5rem calc(1.5rem + 80px + env(safe-area-inset-bottom, 0px))" : "0",
          }}
        >
          {/* ─── Wordmark + Dots Animation ──────── */}
          <h1
            aria-label="CODO"
            style={{
              position: "relative",
              fontSize: getResponsiveFont(84, 260),
              fontWeight: 600,
              letterSpacing: "-0.04em",
              lineHeight: 0.9,
              margin: 0,
              display: "flex",
              justifyContent: "center",
              fontFamily: "'Miranda Sans', sans-serif",
            }}
          >
            {/* ─── 1. The Animation Layers (Dot, Logo, Grid) ─── */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
                zIndex: 10,
              }}
            >
              <img
                className="hero-logo"
                src="/logos/codowhite.png"
                alt="CODO Logo"
                style={{
                  height: "clamp(60px, 15vw, 180px)",
                  width: "auto",
                  position: "absolute",
                  willChange: "transform, opacity, filter"
                }}
              />

              {/* Central container to host coordinates for dots */}
              <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {LETTERS.map((l, i) => (
                  <div
                    key={`dot-${i}`}
                    className={`hero-dot hero-dot-${i}`}
                    style={{
                      position: "absolute",
                      width: "clamp(16px, 2vw, 24px)",
                      height: "clamp(16px, 2vw, 24px)",
                      borderRadius: "50%",
                      backgroundColor: l.green ? "#00B663" : "white",
                      willChange: "transform, opacity",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* ─── 2. The Final Text Reveal ─── */}
            <div style={{ display: "flex", zIndex: 11, position: "relative" }}>
              {LETTERS.map(({ char, green }, i) => (
                <span
                  key={`text-${i}`}
                  className="hero-letter"
                  aria-hidden="true"
                  style={{
                    display: "inline-block",
                    color: green ? "#00B663" : "white",
                    willChange: "transform, opacity, filter",
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          </h1>

          {/* ─── Subtitle ───────────────────────── */}
          <p
            className="hero-subtitle"
            style={{
              fontSize: getResponsiveFont(14, 28),
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.65)",
              marginTop: "1.25rem",
              textTransform: "uppercase",
              letterSpacing: "0.32em",
              willChange: "transform, opacity, filter",
            }}
          >
            AI INNOVATIONS
          </p>

          {/* ─── CTA Buttons ────────────────────── */}
          <div
            className={`flex gap-5 justify-center mt-12 ${isMobile ? "flex-col items-center" : "flex-row"}`}
          >
            <div className="hero-cta-1" style={{ willChange: "transform, opacity" }}>
              <Link href="/portfolio">
                <motion.div
                  className={CTAClass}
                  style={{
                    willChange: "transform",
                    transform: "translateZ(0)",
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                  whileHover={{
                    y: -6,
                    scale: 1.05,
                    border: "1px solid rgba(0, 182, 99, 0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                >
                  <div className="flex items-center">
                    <span className={CTALabelClass}>Explore Agency</span>
                  </div>
                  <motion.div
                    className="absolute right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0"
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowUpRight size={16} className="text-[#00B663]" />
                  </motion.div>
                </motion.div>
              </Link>
            </div>

            <div className="hero-cta-2" style={{ willChange: "transform, opacity" }}>
              <a
                href="https://www.codoacademy.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  className={CTAClass}
                  style={{
                    willChange: "transform",
                    transform: "translateZ(0)",
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                  whileHover={{
                    y: -6,
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                >
                  <div className="flex items-center">
                    <span className={CTALabelClass}>Explore Academy</span>
                  </div>
                  <motion.div
                    className="absolute right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0"
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight size={16} className="text-white/60" />
                  </motion.div>
                </motion.div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

