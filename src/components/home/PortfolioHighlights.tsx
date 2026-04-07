"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { TransitionLink as Link } from "@/components/transition/TransitionLink";
import Image from "next/image";

/* ─────────────────────────────────────────────
   Types & Data
───────────────────────────────────────────── */
interface Project {
  id: number;
  category: string;
  name: string;
  description: string;
  gradient: string;
  tags: string[];
  year: string;
  stat: string;
  statLabel: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    category: "Travel Platform",
    name: "Europecalling CRM",
    description:
      "A specialist travel consultancy platform offering custom tour packages, visa guidance, and 24/7 dedicated support across Europe and Eurasia.",
    gradient: "linear-gradient(135deg, #FFD700 0%, #003366 55%, #000000 100%)",
    tags: ["Next.js", "AI Integration", "CRM"],
    year: "2024",
    stat: "24/7",
    statLabel: "Global Support",
    image: "/images/portfolio/Europecalling-project.png",
  },
  {
    id: 2,
    category: "EdTech Platform",
    name: "Thazqu Islamic Study",
    description:
      "A modern digital education platform providing structured Quranic studies and Arabic language learning through a personalized one-to-one digital classroom.",
    gradient: "linear-gradient(135deg, #004D40 0%, #003366 55%, #FFC107 100%)",
    tags: ["React", "Firebase", "EdTech"],
    year: "2024",
    stat: "5K+",
    statLabel: "Active Students",
    image: "/images/portfolio/thazquedu-project.png",
  },
  {
    id: 3,
    category: "Enterprise Software",
    name: "Albedo ERP",
    description:
      "A unified enterprise resource planning system for educational institutions, managing admissions, billing, and performance tracking across campuses.",
    gradient: "linear-gradient(135deg, #6366f1 0%, #003366 55%, #000000 100%)",
    tags: ["Enterprise", "ERP", "Next.js"],
    year: "2025",
    stat: "100%",
    statLabel: "Unified Ops",
    image: "/images/portfolio/albedo-project.png",
  },
  {
    id: 4,
    category: "Health & Wellness",
    name: "KUG Oriental Academy",
    description:
      "An ISO-certified institution platform for holistic health education, offering digital curriculum delivery for professional Acupuncture and Ayurveda courses.",
    gradient: "linear-gradient(135deg, #FFC107 0%, #003366 55%, #004D40 100%)",
    tags: ["Health Tech", "Education", "React"],
    year: "2025",
    stat: "98%",
    statLabel: "Placement Rate",
    image: "/images/portfolio/Kug-project.png",
  },
];

/* ─────────────────────────────────────────────
   Scroll-reveal wrapper
───────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0 }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Layout & animation constants
───────────────────────────────────────────── */
const CARD_H = 340; // front card height in px

// How many px of each peek card are visible above the front card
const PEEK_1_STRIP = 16; // 1st behind card — visible strip height
const PEEK_2_STRIP = 14; // 2nd behind card — visible strip height

// How far above the front card top each strip sits
const PEEK_1_OFFSET = PEEK_1_STRIP;                      // 16px above front top
const PEEK_2_OFFSET = PEEK_1_STRIP + PEEK_2_STRIP;       // 30px above front top

// Wrapper paddingTop = total space above the front card
const TOP_SPACE = PEEK_2_OFFSET; // 30px

/*
  clipPath helper — controls exactly which vertical slice is visible.
  `inset(top right bottom left round radius)`
  We clip from the bottom to keep only `stripPx` of the card's top visible,
  and inset sides to match the visual scaleX narrowing.
*/
function peekClip(stripPx: number, hInsetPc: number) {
  return `inset(0% ${hInsetPc}% ${CARD_H - stripPx}px ${hInsetPc}% round 14px 14px 0px 0px)`;
}

/*
  Full visible clip — used when a card is the front card.
  No inset, full height, rounded on all corners.
*/
const FULL_CLIP = "inset(0% 0% 0px 0% round 16px)";

/*
  Off-screen clip — used for cards that are fully hidden (neither peeking nor front).
  Clips to 0 height so nothing is visible.
*/
const HIDDEN_CLIP = `inset(0% 8% ${CARD_H}px 8% round 14px)`;

/*
  Spring preset — buttery smooth, slight overshoot on position,
  critically damped on scale/opacity.
*/
const SPRING = {
  type: "spring" as const,
  stiffness: 380,
  damping: 36,
  mass: 1,
};

const SPRING_FAST = {
  type: "spring" as const,
  stiffness: 420,
  damping: 40,
  mass: 0.9,
};

/*
  Per-card animated state based on relative position in the stack.
  rel 0  → front (active)
  rel 1  → peek 1 (one behind, narrower strip visible)
  rel 2  → peek 2 (two behind, even narrower)
  rel -1 → just exited (falls down below)
  other  → fully hidden (waiting to cycle in)
*/
function getState(rel: number) {
  switch (rel) {
    case 0:
      return {
        y: TOP_SPACE,
        scaleX: 1,
        scaleY: 1,
        rotate: 0,
        opacity: 1,
        clipPath: FULL_CLIP,
        zIndex: 20,
        filter: "blur(0px)",
      };
    case 1:
      return {
        y: TOP_SPACE - PEEK_1_OFFSET,      // peeks above front card top
        scaleX: 0.90,
        scaleY: 1,
        rotate: 0,
        opacity: 0.80,
        clipPath: peekClip(PEEK_1_STRIP, 5),
        zIndex: 12,
        filter: "blur(0px)",
      };
    case 2:
      return {
        y: TOP_SPACE - PEEK_2_OFFSET,      // peeks above peek-1 top
        scaleX: 0.82,
        scaleY: 1,
        rotate: 0,
        opacity: 0.55,
        clipPath: peekClip(PEEK_2_STRIP, 9),
        zIndex: 11,
        filter: "blur(0px)",
      };
    case -1:
      // Falling card — drops below the front card with a slight tilt
      return {
        y: CARD_H + TOP_SPACE + 80,        // way below the slot
        scaleX: 0.93,
        scaleY: 0.93,
        rotate: 3,
        opacity: 0,
        clipPath: FULL_CLIP,
        zIndex: 30,                        // above everything so it visually drops over
        filter: "blur(6px)",
      };
    default:
      // Hidden — sitting at peek-2 position but fully clipped
      return {
        y: TOP_SPACE - PEEK_2_OFFSET,
        scaleX: 0.82,
        scaleY: 1,
        rotate: 0,
        opacity: 0,
        clipPath: HIDDEN_CLIP,
        zIndex: 10,
        filter: "blur(0px)",
      };
  }
}

/* ─────────────────────────────────────────────
   Card content
───────────────────────────────────────────── */
function CardContent({ project }: { project: Project }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "16px",
        overflow: "hidden",
        background: "rgba(0,0,0,0.8)", // Dark backdrop for text readability
        border: "1px solid rgba(255,255,255,0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "2rem",
        position: "relative",
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: 0.6, // Balanced for visibility and text readability
        }}
      >
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>
      {/* Noise texture */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.75\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')",
          opacity: 0.07,
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}
      />

      {/* Subtle inner glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 70% 0%, rgba(255,255,255,0.07) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Top row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "0.26rem 0.65rem",
            borderRadius: "8px",
            background: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.12)",
            fontSize: "0.56rem",
            fontWeight: 800,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.78)",
          }}
        >
          {project.category}
        </div>
        <div
          style={{
            fontSize: "0.56rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.36)",
            textTransform: "uppercase",
            padding: "0.26rem 0.65rem",
            borderRadius: "8px",
            background: "rgba(0,0,0,0.18)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {project.year}
        </div>
      </div>

      {/* Diagonal link arrow — centred */}
      <div
        style={{
          width: 40, height: 40,
          borderRadius: "12px",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.14)",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "absolute",
          top: "2rem", left: "50%",
          transform: "translateX(-50%)",
          opacity: 0.45,
          zIndex: 1,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 2h10M12 2v10M2 12L12 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Bottom content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "0.65rem" }}>
          <span style={{ fontSize: "2.4rem", fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-0.04em" }}>
            {project.stat}
          </span>
          <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {project.statLabel}
          </span>
        </div>

        <h3 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#fff", lineHeight: 1.15, letterSpacing: "-0.025em", marginBottom: "0.55rem" }}>
          {project.name}
        </h3>

        <p
          style={{
            fontSize: "0.81rem", lineHeight: 1.72, color: "rgba(255,255,255,0.58)",
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
            overflow: "hidden", marginBottom: "1rem",
          }}
        >
          {project.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
          {project.tags.map((tag, i) => (
            <span
              key={i}
              style={{
                padding: "0.18rem 0.55rem", borderRadius: "6px",
                fontSize: "0.54rem", fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "uppercase",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "rgba(255,255,255,0.5)",
                background: "rgba(255,255,255,0.05)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Autoplay progress bar (animated fill)
───────────────────────────────────────────── */
const AUTOPLAY_MS = 4000;

function ProgressBar({
  index,
  active,
  isActive,
  onClick,
  paused,
}: {
  index: number;
  active: number;
  isActive: boolean;
  onClick: () => void;
  paused: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={`View project ${index + 1}`}
      style={{
        flex: 1,
        height: "3px",
        borderRadius: "2px",
        border: "none",
        padding: 0,
        cursor: "pointer",
        position: "relative",
        background: "color-mix(in srgb, var(--text-primary) 12%, transparent)",
        overflow: "hidden",
      }}
    >
      {/* Static fill for already-passed segments */}
      {index < active && (
        <div style={{ position: "absolute", inset: 0, background: "var(--brand-green)", borderRadius: "2px" }} />
      )}

      {/* Animated fill for the currently active segment */}
      {isActive && (
        <motion.div
          key={active} // re-mounts on each advance to restart the animation
          initial={{ scaleX: 0 }}
          animate={{ scaleX: paused ? undefined : 1 }}
          transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--brand-green)",
            transformOrigin: "left center",
            borderRadius: "2px",
          }}
        />
      )}
    </button>
  );
}

/* ─────────────────────────────────────────────
   Stacked carousel
───────────────────────────────────────────── */
function StackedCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = projects.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((p) => (p + 1) % total), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, total]);

  const go = useCallback((next: number) => {
    setActive((next + total) % total);
    setPaused(true);
  }, [total]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ display: "flex", flexDirection: "column", gap: "1.5rem", width: "100%", maxWidth: "520px" }}
    >

      {/* ── Stack area ───────────────────────────────────────────────── */}
      {/*
        No overflow:hidden here — we use clipPath on each card individually
        so the peek strips are pixel-perfect without any container clipping
        accidentally cutting into the front card's rounded corners.
      */}
      <div
        style={{
          position: "relative",
          height: `${CARD_H + TOP_SPACE}px`,
        }}
      >
        {projects.map((project, i) => {
          // Relative position in the stack cycle
          let rel = (i - active + total) % total;
          // Cards that are "behind" in cycle but have wrapped around
          // should be treated as hidden, not as falling
          if (rel > 2) rel = -2; // fully hidden — not falling, not peeking

          // Only the card that just got replaced is "falling" (rel === total-1 after modulo)
          // We need to track the actual previous active card
          // Simple approach: rel === total-1 means it just exited
          let relActual = (i - active + total) % total;
          if (relActual === total - 1) relActual = -1; // the card just behind in cycle = exiting

          const state = getState(relActual);

          return (
            <motion.div
              key={project.id}
              initial={false}
              animate={{
                y: state.y,
                scaleX: state.scaleX,
                scaleY: state.scaleY,
                rotate: state.rotate,
                opacity: state.opacity,
                clipPath: state.clipPath,
                zIndex: state.zIndex,
                filter: state.filter,
              }}
              transition={{
                y: { ...SPRING },
                scaleX: { ...SPRING_FAST },
                scaleY: { ...SPRING_FAST },
                rotate: { ...SPRING_FAST },
                opacity: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
                clipPath: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                filter: { duration: 0.35, ease: "easeOut" },
                zIndex: { duration: 0 }, // snap instantly
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${CARD_H}px`,
                transformOrigin: "top center",
                pointerEvents: relActual === 0 ? "auto" : "none",
                willChange: "transform, opacity, clip-path",
              }}
            >
              <CardContent project={project} />
            </motion.div>
          );
        })}
      </div>

      {/* ── Animated progress indicators ─────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        {projects.map((_, i) => (
          <ProgressBar
            key={i}
            index={i}
            active={active}
            isActive={i === active}
            onClick={() => go(i)}
            paused={paused}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Section
───────────────────────────────────────────── */
export default function PortfolioSection() {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      aria-label="CODO Agency Portfolio"
      className="relative z-10 w-full"
      style={{
        padding: "clamp(0.75rem, 1.5vw, 1.2rem) clamp(1.25rem, 5vw, 3.5rem) clamp(0.75rem, 1.5vw, 1.2rem)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div className="mx-auto max-w-[1320px]">
        {/* ── Header Block ── */}
        <Reveal delay={0}>
          <div
            className="rounded-2xl p-8 md:p-12 mb-12"
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid var(--glass-border)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Ambient glow — top right */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: -80,
                right: -40,
                width: 320,
                height: 320,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--brand-green) 12%, transparent) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />



            {/* ── Heading ── */}
            <div className="relative z-10">
              <h2
                style={{
                  fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  color: "var(--text-primary)",
                  margin: 0,
                }}
              >
                Work That <span style={{ color: "var(--brand-green)" }}>Speaks</span>
                <br />for <span style={{ color: "var(--brand-green)", fontStyle: "italic" }}>Itself.</span>
              </h2>
            </div>
          </div>
        </Reveal>

        <div
          className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6"
        >

          {/* ════════════════════════════════
              BOX 1 — Introduction
              top-left
          ════════════════════════════════ */}
          <Reveal delay={0.1} className="md:col-span-6">
            <div
              className="rounded-2xl p-8 md:p-12 flex flex-col h-full"
              style={{
                background: "var(--glass-bg)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid var(--glass-border)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Corner glow */}
              <div aria-hidden="true" style={{ position: "absolute", top: -50, left: -50, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, color-mix(in srgb, var(--brand-green) 10%, transparent) 0%, transparent 70%)", pointerEvents: "none" }} />
              
              <div className="flex flex-col gap-5 h-full relative z-10 justify-center">
                <p
                  style={{
                    fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                    lineHeight: 1.5,
                    color: "var(--text-primary)",
                    fontWeight: 500,
                  }}
                >
                  We don't just build software. We engineer <span style={{ color: "var(--brand-green)" }}>scalable engines of growth</span>.
                </p>

                <p
                  style={{
                    fontSize: "clamp(0.85rem, 1.4vw, 1rem)",
                    lineHeight: 1.85,
                    color: "var(--text-secondary)",
                    maxWidth: "42ch",
                  }}
                >
                  From AI-powered CRMs to cross-platform mobile apps and enterprise ERP systems — every product we ship is built to last, designed to perform, and strategically crafted to push your business forward.
                </p>
              </div>
            </div>
          </Reveal>

          {/* ════════════════════════════════
              BOX 2 — Tech Stack & Metrics
              bottom-left
          ════════════════════════════════ */}
          <Reveal delay={0.18} className="md:col-span-6 flex flex-col h-full">
            <div
              className="rounded-2xl p-8 md:p-12 flex flex-col justify-center h-full flex-1"
              style={{
                background: "color-mix(in srgb, var(--brand-green) 6%, var(--glass-bg))",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid color-mix(in srgb, var(--brand-green) 18%, var(--glass-border))",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Bottom-right glow */}
              <div aria-hidden="true" style={{ position: "absolute", bottom: -60, right: -60, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, color-mix(in srgb, var(--brand-green) 14%, transparent) 0%, transparent 70%)", pointerEvents: "none" }} />

              <div className="relative z-10 flex flex-col gap-6">
                <div>
                  <div
                    style={{
                      fontSize: "clamp(2rem, 4vw, 2.8rem)",
                      fontWeight: 900,
                      lineHeight: 1,
                      color: "var(--brand-green)",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    40+
                  </div>
                  <div
                    style={{
                      fontSize: "0.67rem",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--text-primary)",
                      marginTop: "0.3rem",
                    }}
                  >
                    Digital Products Built
                  </div>
                  <p
                    style={{
                      fontSize: "0.82rem",
                      lineHeight: 1.75,
                      color: "var(--text-secondary)",
                      maxWidth: "38ch",
                      marginTop: "0.6rem",
                    }}
                  >
                    These are just the highlights — our full portfolio spans scalable websites, native applications, and complex AI integrations.
                  </p>
                </div>



                {/* CTA Button */}
                <div className="mt-2">
                  <Link
                    href="/portfolio"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.85rem 1.75rem", borderRadius: "100px", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--brand-green)", background: "color-mix(in srgb, var(--brand-green) 8%, transparent)", border: "1.5px solid color-mix(in srgb, var(--brand-green) 30%, transparent)", textDecoration: "none", transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)" }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "color-mix(in srgb, var(--brand-green) 18%, transparent)"; el.style.borderColor = "color-mix(in srgb, var(--brand-green) 55%, transparent)"; el.style.transform = "translateX(4px)"; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "color-mix(in srgb, var(--brand-green) 8%, transparent)"; el.style.borderColor = "color-mix(in srgb, var(--brand-green) 30%, transparent)"; el.style.transform = "translateX(0)"; }}
                  >
                    View All Projects
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ════════════════════════════════
              BOX 3 — Sliding Stacked Carousel
              right column, spans both rows
          ════════════════════════════════ */}
          <Reveal delay={0.26} className="md:col-span-12">
            <div
              className="rounded-2xl p-8 md:p-12 w-full flex flex-col py-16"
              style={{
                position: "relative",
                background: "var(--glass-bg)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid var(--glass-border)",
                overflow: "hidden",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Ambient right-side glow */}
              <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, color-mix(in srgb, var(--brand-green) 7%, transparent) 0%, transparent 70%)", pointerEvents: "none" }} />
              
              <div className="relative z-10 w-full flex justify-center">
                <StackedCarousel />
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}