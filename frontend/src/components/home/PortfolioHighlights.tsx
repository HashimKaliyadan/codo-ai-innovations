"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { getResponsiveFont, getResponsiveSpacing } from "@/lib/responsive";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MEDIA_QUERIES } from "@/constants/breakpoints";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Project {
  id: number;
  category: string;
  name: string;
  description: string;
  gradient: string;
  tags: string[];
  year: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────
const projects: Project[] = [
  {
    id: 1,
    category: "Web Platform",
    name: "Europecalling CRM",
    description:
      "A full-scale recruitment CRM built for European hiring pipelines — featuring AI-powered candidate matching, smart dashboards, and end-to-end workflow automation.",
    gradient: "linear-gradient(135deg, #005a42 0%, #003366 60%, #001f3f 100%)",
    tags: ["Next.js", "AI Integration", "CRM"],
    year: "2024",
  },
  {
    id: 2,
    category: "Mobile App",
    name: "Evoka Learning",
    description:
      "A cross-platform mobile learning app delivering personalized AI-driven study paths, live sessions, and progress tracking for students across skill levels.",
    gradient: "linear-gradient(135deg, #001f3f 0%, #1a3c5e 60%, #005a42 100%)",
    tags: ["React Native", "AI", "EdTech"],
    year: "2024",
  },
  {
    id: 3,
    category: "Software",
    name: "Albedo ERP",
    description:
      "An enterprise resource planning system tailored for educational institutions — managing admissions, billing, staff, and student performance in one unified platform.",
    gradient: "linear-gradient(135deg, #1a3c5e 0%, #001f3f 60%, #005a42 100%)",
    tags: ["Enterprise", "ERP", "Education"],
    year: "2025",
  },
  {
    id: 4,
    category: "AI Solution",
    name: "CODO AI Assistant",
    description:
      "An intelligent conversational AI assistant deployed across CODO's internal tools — automating repetitive workflows, surfacing insights, and accelerating team velocity.",
    gradient: "linear-gradient(135deg, #005a42 0%, #001f3f 80%, #00B663 100%)",
    tags: ["LLM", "Automation", "AI"],
    year: "2025",
  },
];

// 3 copies gives enough runway for both drag directions and auto-scroll
const INFINITE_ITEMS = [...projects, ...projects, ...projects];

// ── Colour tokens (green bg context) ─────────────────────────────────────────
const C = {
  textPrimary:   "#ffffff",
  textSecondary: "rgba(255,255,255,0.65)",
  glassBorder:   "rgba(255,255,255,0.12)",
  glassBg:       "rgba(0,0,0,0.22)",
  divider:       "linear-gradient(to right, transparent, rgba(255,255,255,0.18), transparent)",
};

// Card / scroll constants
const CARD_W    = 340;  // px
const CARD_GAP  = 20;   // px
const CARD_STEP = CARD_W + CARD_GAP;
const AUTO_PX   = 0.55; // px per rAF frame (~33px/s at 60fps)

// ── Spinner ───────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg"
      fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10"
        stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962
           7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}

// ── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: `0 0 ${CARD_W}px`,
        height: "420px",
        borderRadius: "28px",
        overflow: "hidden",
        background: C.glassBg,
        border: `1px solid ${hovered ? "rgba(255,255,255,0.22)" : C.glassBorder}`,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
        transform: hovered ? "translateY(-14px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: hovered
          ? "0 48px 96px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)"
          : "0 12px 32px rgba(0,0,0,0.18)",
        userSelect: "none",
      }}
    >
      {/* Gradient image area */}
      <div style={{
        width: "100%", height: "220px",
        background: project.gradient,
        position: "relative", overflow: "hidden", flexShrink: 0,
      }}>
        {/* Noise texture */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.75\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')",
          opacity: 0.07, mixBlendMode: "overlay",
        }} />

        {/* Bottom fade into card body */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "80px",
          background: `linear-gradient(to top, ${C.glassBg}, transparent)`,
        }} />

        {/* Year badge */}
        <div style={{
          position: "absolute", top: "1.1rem", right: "1.1rem",
          padding: "0.3rem 0.7rem", borderRadius: "8px",
          background: "rgba(0,0,0,0.35)", backdropFilter: "blur(8px)",
          border: `1px solid ${C.glassBorder}`,
          color: C.textSecondary, fontSize: "0.6rem",
          fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
        }}>
          {project.year}
        </div>

        {/* Ghost number */}
        <div style={{
          position: "absolute", bottom: "-0.5rem", left: "1.25rem",
          fontSize: "96px", fontWeight: 900, lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.08)",
          userSelect: "none", pointerEvents: "none",
          letterSpacing: "-0.04em",
        }}>
          0{project.id}
        </div>

        {/* Hover overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.28)",
          backdropFilter: "blur(2px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: hovered ? 1 : 0,
          pointerEvents: hovered ? "auto" : "none",
          transition: "opacity 0.35s ease",
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            padding: "0.65rem 1.5rem", borderRadius: "999px",
            background: "rgba(0,0,0,0.4)", border: `1px solid ${C.glassBorder}`,
            backdropFilter: "blur(12px)", color: C.textPrimary,
            fontWeight: 700, fontSize: "0.75rem",
            letterSpacing: "0.15em", textTransform: "uppercase",
            transform: hovered ? "translateY(0)" : "translateY(10px)",
            transition: "transform 0.35s ease",
          }}>
            View Project
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor"
                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: "1.5rem 1.5rem 1.75rem", display: "flex", flexDirection: "column", flex: 1 }}>
        <span style={{
          display: "inline-flex", alignSelf: "flex-start",
          fontSize: "0.6rem", fontWeight: 800,
          letterSpacing: "0.22em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.5)",
          background: "rgba(255,255,255,0.09)",
          padding: "0.2rem 0.6rem", borderRadius: "5px",
          border: `1px solid ${C.glassBorder}`,
          marginBottom: "0.7rem",
        }}>
          {project.category}
        </span>

        <h3 style={{
          fontSize: "1.2rem", fontWeight: 900, lineHeight: 1.15,
          letterSpacing: "-0.01em", color: C.textPrimary, marginBottom: "0.65rem",
        }}>
          {project.name}
        </h3>

        <p style={{
          fontSize: "0.82rem", lineHeight: 1.75, color: C.textSecondary, flex: 1,
          display: "-webkit-box", WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical", overflow: "hidden",
          marginBottom: "1rem",
        }}>
          {project.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
          {project.tags.map((tag, i) => (
            <span key={i} style={{
              padding: "0.2rem 0.6rem", borderRadius: "5px",
              fontSize: "0.58rem", fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase",
              border: `1px solid ${hovered ? "rgba(255,255,255,0.2)" : C.glassBorder}`,
              color: C.textSecondary, background: "rgba(255,255,255,0.06)",
              transition: "border-color 0.3s ease",
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Infinite Strip ────────────────────────────────────────────────────────────
function InfiniteStrip() {
  const trackRef   = useRef<HTMLDivElement>(null);
  const posRef     = useRef<number>(0);
  const rafRef     = useRef<number>(0);
  const pausedRef  = useRef<boolean>(false);
  const animating  = useRef<boolean>(false);

  const isDragging    = useRef(false);
  const dragStartX    = useRef(0);
  const dragStartPos  = useRef(0);

  // Width of a single full set of cards
  const SINGLE = projects.length * CARD_STEP;

  // Teleport silently if we drift outside the middle copy
  const normalise = useCallback((pos: number) => {
    if (pos >= SINGLE * 2) return pos - SINGLE;
    if (pos <  SINGLE)     return pos + SINGLE;
    return pos;
  }, [SINGLE]);

  const commit = useCallback((pos: number) => {
    if (!trackRef.current) return;
    trackRef.current.style.transform = `translateX(${-pos}px)`;
  }, []);

  // Auto-scroll loop
  useEffect(() => {
    posRef.current = SINGLE; // start mid-copy
    commit(posRef.current);

    const tick = () => {
      if (!pausedRef.current && !isDragging.current && !animating.current) {
        posRef.current = normalise(posRef.current + AUTO_PX);
        commit(posRef.current);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [commit, normalise, SINGLE]);

  // Smooth jump (arrows)
  const jumpBy = (delta: number) => {
    if (animating.current) return;
    animating.current = true;

    const start  = posRef.current;
    const end    = normalise(start + delta);
    const startT = performance.now();
    const dur    = 560;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

    const frame = (now: number) => {
      const t = Math.min((now - startT) / dur, 1);
      posRef.current = normalise(start + delta * easeOut(t));
      commit(posRef.current);
      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        animating.current = false;
      }
    };
    requestAnimationFrame(frame);
  };

  // Pointer drag
  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current   = true;
    dragStartX.current   = e.clientX;
    dragStartPos.current = posRef.current;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStartX.current;
    posRef.current = normalise(dragStartPos.current - dx);
    commit(posRef.current);
  };
  const onPointerUp = () => { isDragging.current = false; };

  return (
    <div style={{ position: "relative" }}>
      {/* Left fade mask */}
      <div aria-hidden="true" style={{
        position: "absolute", top: 0, left: 0, bottom: 0, width: "100px", zIndex: 2,
        background: "linear-gradient(to right, #008764 0%, transparent 100%)",
        pointerEvents: "none",
      }} />
      {/* Right fade mask */}
      <div aria-hidden="true" style={{
        position: "absolute", top: 0, right: 0, bottom: 0, width: "100px", zIndex: 2,
        background: "linear-gradient(to left, #008764 0%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* Overflow viewport */}
      <div
        style={{ overflow: "hidden", cursor: "grab" }}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; isDragging.current = false; }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: `${CARD_GAP}px`,
            willChange: "transform",
            paddingBottom: "16px",  // room for hover lift shadow
          }}
        >
          {INFINITE_ITEMS.map((project, i) => (
            <ProjectCard key={`${project.id}-${i}`} project={project} />
          ))}
        </div>
      </div>

      {/* Arrow navigation */}
      <div style={{
        display: "flex", gap: "0.75rem",
        marginTop: "2rem", justifyContent: "center",
      }}>
        {([
          { dir: -1 as const, label: "Previous projects", icon: "←" },
          { dir:  1 as const, label: "Next projects",     icon: "→" },
        ]).map(({ dir, label, icon }) => (
          <button
            key={dir}
            onClick={() => jumpBy(dir * CARD_STEP * 1.5)}
            aria-label={label}
            className="group"
            style={{
              width: "48px", height: "48px", borderRadius: "50%",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.14)",
              color: "#fff", fontSize: "18px",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background    = "rgba(255,255,255,0.15)";
              el.style.borderColor   = "rgba(255,255,255,0.3)";
              el.style.transform     = `scale(1.1)`;
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background    = "rgba(255,255,255,0.07)";
              el.style.borderColor   = "rgba(255,255,255,0.14)";
              el.style.transform     = `scale(1)`;
            }}
          >
            {icon}
          </button>
        ))}
      </div>

      {/* Drag hint */}
      <p style={{
        textAlign: "center", marginTop: "0.85rem",
        fontSize: "0.65rem", letterSpacing: "0.15em",
        color: "rgba(255,255,255,0.28)", textTransform: "uppercase",
      }}>
        ← drag to explore · auto-scrolling →
      </p>
    </div>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────────
function PortfolioCta() {
  const router              = useRouter();
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);
    try { await router.push("/portfolio"); }
    finally { setLoading(false); }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      aria-label="View the full CODO Agency portfolio"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#008764]"
      style={{
        padding: "1rem 3rem",
        borderRadius: "999px",
        background: hovered ? "#ffffff" : "transparent",
        border: "2px solid #ffffff",
        color: hovered ? "#008764" : "#ffffff",
        fontWeight: 800, fontSize: "0.85rem",
        letterSpacing: "0.15em", textTransform: "uppercase",
        cursor: loading ? "not-allowed" : "pointer",
        opacity: loading ? 0.5 : 1,
        transform: hovered && !loading ? "scale(1.05)" : "scale(1)",
        transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        display: "flex", alignItems: "center", gap: "0.75rem",
        minHeight: "44px", outline: "none",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {loading ? (
        <><Spinner /> Loading...</>
      ) : (
        <>
          View All Projects
          <motion.span
            animate={{ x: hovered ? 6 : 0 }}
            transition={{ duration: 0.25 }}
            style={{ display: "inline-flex" }}
          >
            →
          </motion.span>
        </>
      )}
    </button>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function PortfolioSection() {
  const sectionRef = useRef(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-8% 0px" });
  const isMobile   = useMediaQuery(MEDIA_QUERIES.mobile);

  return (
    <section
      ref={sectionRef}
      aria-label="CODO Agency Portfolio Highlights"
      style={{
        position: "relative",
        zIndex: 2,
        overflow: "hidden",
        paddingTop:    getResponsiveSpacing(80, 120, 160),
        paddingBottom: getResponsiveSpacing(80, 120, 160),
        fontFamily: "'DM Sans', sans-serif",
        background: "#008764",
        marginTop:  "-60px",
        marginBottom: "-60px",
        borderRadius: "60px",
        boxShadow: "0 0 80px rgba(0,0,0,0.12)",
      }}
    >
      {/* Ambient blobs */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 0,
        pointerEvents: "none", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "-10%", right: "-5%",
          width: "700px", height: "700px",
          background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />
        <div style={{
          position: "absolute", bottom: "5%", left: "-5%",
          width: "500px", height: "500px",
          background: "radial-gradient(circle, rgba(0,0,0,0.1) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />
      </div>

      <div className="relative z-10">

        {/* ── Header ── */}
        <div
          className="max-w-[1400px] mx-auto"
          style={{
            paddingLeft:  getResponsiveSpacing(24, 40, 60),
            paddingRight: getResponsiveSpacing(24, 40, 60),
          }}
        >
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-end", flexWrap: "wrap", gap: "2rem",
            marginBottom: getResponsiveSpacing(48, 64, 72),
          }}>
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}
              >
                <div style={{ height: "1px", width: "36px", background: "rgba(255,255,255,0.35)" }} />
                <span style={{
                  fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.3em",
                  color: "rgba(255,255,255,0.4)", textTransform: "uppercase",
                }}>
                  04 — Portfolio
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
                style={{
                  fontSize: getResponsiveFont(35, 68),
                  fontWeight: 900, lineHeight: 1.05,
                  letterSpacing: "-0.03em", color: "#ffffff",
                }}
              >
                Work That{" "}
                <span style={{
                  color: "rgba(255,255,255,0.88)",
                  textDecoration: "underline",
                  textDecorationColor: "rgba(255,255,255,0.22)",
                  textUnderlineOffset: "6px",
                }}>
                  Speaks
                </span>
                <br />
                for Itself.
              </motion.h2>
            </div>

            {!isMobile && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
                style={{ textAlign: "right" }}
              >
                <div style={{
                  fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.25em",
                  textTransform: "uppercase", color: "rgba(255,255,255,0.35)",
                  marginBottom: "0.4rem",
                }}>
                  Selected Works
                </div>
                <div style={{
                  fontSize: getResponsiveFont(32, 52), fontWeight: 900,
                  color: "rgba(255,255,255,0.1)", lineHeight: 1, letterSpacing: "-0.04em",
                }}>
                  {String(projects.length).padStart(2, "0")}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* ── Infinite strip (full-bleed with left padding start) ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{ paddingLeft: getResponsiveSpacing(24, 40, 60) }}
        >
          <InfiniteStrip />
        </motion.div>

        {/* ── Divider + CTA ── */}
        <div
          className="max-w-[1400px] mx-auto"
          style={{
            paddingLeft:  getResponsiveSpacing(24, 40, 60),
            paddingRight: getResponsiveSpacing(24, 40, 60),
          }}
        >
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={inView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.6 }}
            style={{
              height: "1px",
              background: C.divider,
              transformOrigin: "center",
              margin: `${getResponsiveSpacing(48, 64, 72)} 0 ${getResponsiveSpacing(40, 56, 64)}`,
            }}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              display: "flex", flexDirection: "column",
              alignItems: "center", gap: "1.25rem", textAlign: "center",
            }}
          >
            <p style={{
              fontSize: getResponsiveFont(13.5, 16),
              color: "rgba(255,255,255,0.6)",
              fontWeight: 400, maxWidth: "44ch", lineHeight: 1.7,
            }}>
              These are just the highlights. The full portfolio spans{" "}
              <strong style={{ color: "#ffffff", fontWeight: 700 }}>
                websites, apps, software & AI systems.
              </strong>
            </p>
            <PortfolioCta />
          </motion.div>
        </div>

      </div>
    </section>
  );
}