"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { useFloatingLines } from "@/components/FloatingLinesController";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MEDIA_QUERIES } from "@/constants/breakpoints";
import { getResponsiveFont } from "@/lib/responsive";

// ─── Letter config ────────────────────────────────────────────────────────────
const LETTERS: { char: string; green: boolean; glow: boolean }[] = [
  { char: "C", green: false, glow: false },
  { char: "O", green: false, glow: false },
  { char: "D", green: false, glow: false },
  { char: "O", green: true,  glow: true  }, // final O — accent + glow pulse
];

// ─── Animation variants ───────────────────────────────────────────────────────
const letterVariants: Variants = {
  hidden: { y: 70, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.75,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

const subtitleVariants: Variants = {
  hidden:  { opacity: 0, letterSpacing: "0.05em" },
  visible: {
    opacity: 1,
    letterSpacing: "0.32em",
    transition: { duration: 1, delay: 0.55, ease: "easeOut" },
  },
};

const ctaVariants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

// ─── Pure-Tailwind button styles (no fighting inline objects) ─────────────────
const CTAClass = [
  "w-48 h-11 px-6",
  "flex items-center justify-center",
  "rounded-2xl",
  "bg-transparent",
  "border border-white/15",
  "backdrop-blur-2xl",
  "text-white/75 hover:text-white",
  "hover:bg-white/5",
  "shadow-lg",
  "transition-all duration-200",
  "cursor-pointer",
].join(" ");

const CTALabelClass = "text-xs sm:text-sm font-bold tracking-widest uppercase whitespace-nowrap";

// ─── Component ────────────────────────────────────────────────────────────────
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile     = useMediaQuery(MEDIA_QUERIES.mobile);

  const inView = useInView(containerRef, { margin: "-40% 0px -25% 0px" });
  const { setOpacity } = useFloatingLines();

  useEffect(() => {
    setOpacity(inView ? 1 : 0);
  }, [inView, setOpacity]);

  return (
    <>
      {/* ── Keyframe injected once into <head> ── */}
      <style>{`
        @keyframes glowPulse {
          0%, 100% { text-shadow: 0 0 18px rgba(0, 182, 99, 0.25); }
          50%       { text-shadow: 0 0 48px rgba(0, 182, 99, 0.75),
                                   0 0 96px rgba(0, 182, 99, 0.18); }
        }
        .glow-o {
          animation: glowPulse 3.2s ease-in-out 1.2s infinite;
        }
      `}</style>

      <div
        ref={containerRef}
        style={{
          height: "120vh",
          background: "transparent",
          position: "relative",
          zIndex: 1,
          fontFamily: "'DM Sans', system-ui, sans-serif",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              textAlign: "center",
              padding: isMobile ? "0 1.5rem" : "0",
            }}
          >

            {/* ── Wordmark ── */}
            <h1
              aria-label="CODO"
              style={{
                fontSize: getResponsiveFont(84, 260),
                fontWeight: 600,
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
                margin: 0,
                display: "flex",
                justifyContent: "center",
                overflow: "hidden",        // clip the slide-up
              }}
            >
              {LETTERS.map(({ char, green, glow }, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={letterVariants}
                  className={glow ? "glow-o" : undefined}
                  style={{
                    display: "inline-block",
                    color: green ? "#00B663" : "white",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </h1>

            {/* ── Subtitle — letterSpacing expand animation ── */}
            <motion.p
              initial="hidden"
              animate="visible"
              variants={subtitleVariants}
              style={{
                fontSize: getResponsiveFont(14, 28),
                fontWeight: 500,
                color: "rgba(255,255,255,0.55)",
                marginTop: "1.25rem",
                textTransform: "uppercase",
              }}
            >
              AI INNOVATIONS
            </motion.p>

            {/* ── CTA Buttons ── */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={ctaVariants}
              className={`flex gap-4 justify-center mt-12 ${isMobile ? "flex-col items-center" : "flex-row"}`}
            >
              <Link href="/portfolio" passHref>
                <button className={CTAClass}>
                  <span className={CTALabelClass}>Explore Agency</span>
                </button>
              </Link>

              <a
                href="https://www.codoacademy.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className={CTAClass}>
                  <span className={CTALabelClass}>Explore Academy</span>
                </button>
              </a>
            </motion.div>

          </div>
        </div>
      </div>
    </>
  );
}