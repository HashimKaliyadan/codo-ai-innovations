"use client";

import { useRef, useEffect } from "react";
import { useInView, useScroll, useTransform, motion } from "framer-motion";
import { useFloatingLines } from "@/components/FloatingLinesController";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MEDIA_QUERIES } from "@/constants/breakpoints";
import { getResponsiveFont } from "@/lib/responsive";

// ─── Letter config ────────────────────────────────────────────────────────────
const LETTERS: { char: string; green: boolean }[] = [
  { char: "C", green: false },
  { char: "O", green: false },
  { char: "D", green: false },
  { char: "O", green: true  },
];

// ─── Pure-Tailwind button styles ──────────────────────────────────────────────
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

  // ── Floating lines visibility ──
  const inView = useInView(containerRef, { margin: "-40% 0px -25% 0px" });
  const { setOpacity } = useFloatingLines();

  useEffect(() => {
    setOpacity(inView ? 1 : 0);
  }, [inView, setOpacity]);

  // ── Parallax: track global scroll progress ──
  const { scrollY } = useScroll();

  // Text drifts upward based on absolute scroll position (pixels)
  // When scrolled 800px down, the text will have moved -200px up
  const y = useTransform(scrollY, [0, 800], [0, -200]);

  return (
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
          overflow: "hidden",
        }}
      >
        {/* ── Parallax wrapper — only this layer moves ── */}
        <motion.div
          style={{ y }}
          transition={{ type: "tween", ease: "linear" }}
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
                overflow: "hidden",
              }}
            >
              {LETTERS.map(({ char, green }, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    color: green ? "#00B663" : "white",
                  }}
                >
                  {char}
                </span>
              ))}
            </h1>

            {/* ── Subtitle ── */}
            <p
              style={{
                fontSize: getResponsiveFont(14, 28),
                fontWeight: 500,
                color: "rgba(255,255,255,0.55)",
                marginTop: "1.25rem",
                textTransform: "uppercase",
                letterSpacing: "0.32em",
              }}
            >
              AI INNOVATIONS
            </p>

            {/* ── CTA Buttons ── */}
            <div
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
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}