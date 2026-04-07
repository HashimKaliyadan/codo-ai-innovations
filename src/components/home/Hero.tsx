"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { TransitionLink as Link } from "@/components/transition/TransitionLink";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MEDIA_QUERIES } from "@/constants/breakpoints";
import { getResponsiveFont } from "@/lib/responsive";

const LETTERS: { char: string; green: boolean }[] = [
  { char: "C", green: false },
  { char: "O", green: false },
  { char: "D", green: false },
  { char: "O", green: true },
];

const CTAClass = [
  "h-12 px-10",
  "flex items-center justify-center gap-3",
  "rounded-full",
  "bg-transparent",
  "border border-white/10",
  "backdrop-blur-2xl",
  "text-white/80 hover:text-white",
  "cursor-pointer",
  "relative overflow-hidden",
  "group",
].join(" ");

const CTALabelClass =
  "text-[0.7rem] sm:text-xs font-black tracking-[0.22em] uppercase whitespace-nowrap transition-transform duration-300 group-hover:-translateX-1";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery(MEDIA_QUERIES.mobile);

  // Animation Sequence State
  // 0: Dot Stacked | 1: Logo | 2: 2x2 Grid | 3: Horizontal Row | 4: Morph to Text
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Orchestrate the timeline of the animation sequence for a buttery smooth and snappy effect
    const t1 = setTimeout(() => setPhase(1), 400);  // Reveal Logo
    const t2 = setTimeout(() => setPhase(2), 1200); // Split Logo to 2x2 Grid
    const t3 = setTimeout(() => setPhase(3), 1800); // Spread into Row
    const t4 = setTimeout(() => setPhase(4), 2400); // Crossfade morph to Text

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

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
            padding: isMobile ? "0 1.5rem" : "0",
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
              {/* ─ (A) The Static Logo Step ─ */}
              <AnimatePresence>
                {phase === 1 && (
                  <motion.img
                    key="hero-logo"
                    src="/logos/codo.png"
                    alt="CODO Logo"
                    initial={{ opacity: 0, scale: 0.4, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 0.8, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      height: "clamp(60px, 15vw, 180px)",
                      width: "auto",
                      position: "absolute",
                    }}
                  />
                )}
              </AnimatePresence>

              {/* ─ (B) The Animated Dots Overlay ─ */}
              <motion.div
                layout
                initial={false}
                style={{
                  display: phase < 3 ? "grid" : "flex",
                  gridTemplateColumns: phase === 2 ? "1fr 1fr" : "1fr",
                  gap: phase === 2 ? "12px" : phase >= 3 ? "clamp(50px, 12vw, 150px)" : "0px",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: (phase === 0 || phase >= 2) ? (phase === 4 ? 0 : 1) : 0,
                }}
              >
                {LETTERS.map((l, i) => (
                  <motion.div
                    key={`dot-${i}`}
                    layout
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: phase === 0 ? 1 : phase === 4 ? 4 : 1,
                      opacity: phase === 0 ? 1 : (phase >= 2 && phase < 4 ? 1 : 0),
                    }}
                    transition={{
                      layout: { type: "spring", stiffness: 250, damping: 22 },
                      scale: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.3, delay: phase === 4 ? i * 0.05 : 0 },
                    }}
                    style={{
                      gridArea: phase === 0 ? "1 / 1" : "auto",
                      width: "clamp(16px, 2vw, 24px)",
                      height: "clamp(16px, 2vw, 24px)",
                      borderRadius: "50%",
                      backgroundColor: l.green ? "#00B663" : "white",
                    }}
                  />
                ))}
              </motion.div>
            </div>

            {/* ─── 2. The Final Text Reveal ─── */}
            {LETTERS.map(({ char, green }, i) => (
              <motion.span
                key={`text-${i}`}
                aria-hidden="true"
                initial={{ opacity: 0, filter: "blur(12px)", scale: 0.6 }}
                animate={{
                  opacity: phase >= 4 ? 1 : 0,
                  filter: phase >= 4 ? "blur(0px)" : "blur(12px)",
                  scale: phase >= 4 ? 1 : 0.6,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: phase >= 4 ? i * 0.05 : 0,
                }}
                style={{
                  display: "inline-block",
                  color: green ? "#00B663" : "white",
                }}
              >
                {char}
              </motion.span>
            ))}
          </h1>

          {/* ─── Subtitle ───────────────────────── */}
          <motion.p
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{
              opacity: phase >= 4 ? 1 : 0,
              y: phase >= 4 ? 0 : 10,
              filter: phase >= 4 ? "blur(0px)" : "blur(4px)",
            }}
            transition={{ duration: 0.8, delay: phase >= 4 ? 0.2 : 0, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: getResponsiveFont(14, 28),
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.65)",
              marginTop: "1.25rem",
              textTransform: "uppercase",
              letterSpacing: "0.32em",
            }}
          >
            AI INNOVATIONS
          </motion.p>

          {/* ─── CTA Buttons ────────────────────── */}
          <div
            className={`flex gap-5 justify-center mt-12 ${isMobile ? "flex-col items-center" : "flex-row"
              }`}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: phase >= 4 ? 1 : 0,
                y: phase >= 4 ? 0 : 20,
              }}
              transition={{ duration: 0.8, delay: phase >= 4 ? 0.3 : 0, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href="/portfolio">
                <motion.div
                  className={CTAClass}
                  whileHover={{
                    y: -6,
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(0, 182, 99, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 0 0 1px rgba(0, 182, 99, 0.3)",
                    borderColor: "rgba(0, 182, 99, 0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                >
                  <span className={CTALabelClass}>Explore Agency</span>
                  <motion.div
                    className="absolute right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0"
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowUpRight size={16} className="text-[#00B663]" />
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: phase >= 4 ? 1 : 0,
                y: phase >= 4 ? 0 : 20,
              }}
              transition={{ duration: 0.8, delay: phase >= 4 ? 0.45 : 0, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href="https://www.codoacademy.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  className={CTAClass}
                  whileHover={{
                    y: -6,
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(255, 255, 255, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                >
                  <span className={CTALabelClass}>Explore Academy</span>
                  <motion.div
                    className="absolute right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0"
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight size={16} className="text-white/60" />
                  </motion.div>
                </motion.div>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}