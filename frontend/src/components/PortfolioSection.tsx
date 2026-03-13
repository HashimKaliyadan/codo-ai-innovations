"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { getResponsiveFont, getResponsiveSpacing } from "@/utils/responsive";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MEDIA_QUERIES } from "@/constants/breakpoints";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Project {
  id: number;
  category: string;
  name: string;
  description: string;
  gradient: string;
  accentColor: string;
  tags: string[];
  year: string;
}

// ── Project data ──────────────────────────────────────────────────────────────
const projects: Project[] = [
  {
    id: 1,
    category: "Web Platform",
    name: "Europecalling CRM",
    description:
      "A full-scale recruitment CRM built for European hiring pipelines — featuring AI-powered candidate matching, smart dashboards, and end-to-end workflow automation.",
    gradient: "linear-gradient(135deg, #008764 0%, #008764 60%, #00203F 100%)",
    accentColor: "#008764",
    tags: ["Next.js", "AI Integration", "CRM"],
    year: "2024",
  },
  {
    id: 2,
    category: "Mobile App",
    name: "Evoka Learning",
    description:
      "A cross-platform mobile learning app delivering personalized AI-driven study paths, live sessions, and progress tracking for students across skill levels.",
    gradient: "linear-gradient(135deg, #00203F 0%, #1a3c5e 60%, #008764 100%)",
    accentColor: "#008764",
    tags: ["React Native", "AI", "EdTech"],
    year: "2024",
  },
  {
    id: 3,
    category: "Software",
    name: "Albedo ERP",
    description:
      "An enterprise resource planning system tailored for educational institutions — managing admissions, billing, staff, and student performance in one unified platform.",
    gradient: "linear-gradient(135deg, #1a3c5e 0%, #00203F 60%, #008764 100%)",
    accentColor: "#008764",
    tags: ["Enterprise", "ERP", "Education"],
    year: "2025",
  },
  {
    id: 4,
    category: "AI Solution",
    name: "CODO AI Assistant",
    description:
      "An intelligent conversational AI assistant deployed across CODO's internal tools — automating repetitive workflows, surfacing insights, and accelerating team velocity.",
    gradient: "linear-gradient(135deg, #008764 0%, #00203F 80%, #008764 100%)",
    accentColor: "#008764",
    tags: ["LLM", "Automation", "AI"],
    year: "2025",
  },
];

// ── Spinner ───────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

// ── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
  inView,
}: {
  project: Project;
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const isEven = index % 2 !== 0;

  return (
    <motion.article
      className="no-transition"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          borderRadius: "32px",
          overflow: "hidden",
          background: "var(--bg-secondary)",
          border: "1px solid var(--glass-border)",
          backdropFilter: hovered ? "blur(8px)" : "none",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
          transform: hovered ? "translateY(-12px) scale(1.01)" : "translateY(0) scale(1)",
          boxShadow: hovered
            ? `0 40px 80px rgba(0,0,0,0.4), 0 0 0 1px ${project.accentColor}22`
            : "0 10px 30px rgba(0,0,0,0.1)",
          borderColor: hovered ? `${project.accentColor}44` : "var(--glass-border)",
        }}
      >

        {/* ── Image area ── */}
        <div
          style={{
            width: "100%",
            height: "clamp(220px, 30vw, 380px)",
            background: project.gradient,
            position: "relative",
            overflow: "hidden",
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          {/* Animated noise texture overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.75\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')",
              opacity: 0.08,
              mixBlendMode: "overlay",
            }}
          />

          {/* Hover overlay — slides up from bottom */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(10,10,11,0.25)",
              backdropFilter: "blur(2px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.35s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.75rem 1.75rem",
                borderRadius: "999px",
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                backdropFilter: "blur(8px)",
                color: "var(--text-primary)",
                fontWeight: 700,
                fontSize: "0.8rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                transform: hovered ? "translateY(0)" : "translateY(12px)",
                transition: "transform 0.35s ease",
              }}
            >
              View Project
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Year badge — top right */}
          <div
            style={{
              position: "absolute",
              top: "1.25rem",
              right: "1.25rem",
              padding: "0.3rem 0.75rem",
              borderRadius: "8px",
              background: "var(--glass-bg)",
              backdropFilter: "blur(8px)",
              border: "1px solid var(--glass-border)",
              color: "var(--text-secondary)",
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            {project.year}
          </div>

          {/* Large ghost project number */}
          <div
            style={{
              position: "absolute",
              bottom: "-0.5rem",
              left: "1.5rem",
              fontSize: getResponsiveFont(80, 144),
              fontWeight: 900,
              lineHeight: 1,
              color: "transparent",
              WebkitTextStroke: "1px var(--glass-border)",
              userSelect: "none",
              pointerEvents: "none",
              letterSpacing: "-0.04em",
            }}
          >
            0{project.id}
          </div>
        </div>

        {/* ── Card content ── */}
        <div style={{ padding: getResponsiveSpacing(24, 32, 40) }}>

          {/* Category */}
          <span
            style={{
              display: "inline-block",
              fontSize: "0.65rem",
              fontWeight: 800,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#008764",
              marginBottom: "0.75rem",
            }}
          >
            {project.category}
          </span>

          {/* Project name */}
          <h3
            style={{
              fontSize: getResponsiveFont(22.5, 32),
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              color: "var(--text-primary)",
              marginBottom: "0.85rem",
              transition: "color 0.3s ease",
            }}
          >
            {project.name}
          </h3>

          {/* Description */}
          <p
            style={{
              fontSize: getResponsiveFont(14, 16),
              lineHeight: 1.8,
              color: "var(--text-secondary)",
              fontWeight: 400,
              marginBottom: "1.5rem",
            }}
          >
            {project.description}
          </p>

          {/* Tags row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {project.tags.map((tag, i) => (
              <span
                key={i}
                style={{
                  display: "inline-flex",
                  padding: "0.25rem 0.7rem",
                  borderRadius: "6px",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  border: "1px solid var(--glass-border)",
                  color: "var(--text-secondary)",
                  background: "var(--glass-bg)",
                  transition: "all 0.3s ease",
                  borderColor: hovered ? `${project.accentColor}33` : "rgba(255,255,255,0.1)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ── CTA Button ────────────────────────────────────────────────────────────────
function PortfolioCta() {
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(false);

  /**
   * Anti-double-click guard for the View Full Portfolio CTA.
   * Disables on first click, re-enables after navigation resolves.
   */
  const handleClick = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      aria-label="View the full CODO Agency portfolio"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        transition-all duration-300
        min-h-[44px] min-w-[44px]
        flex items-center justify-center gap-3
        focus-visible:outline focus-visible:outline-2
        focus-visible:outline-offset-3
        focus-visible:outline-[#008764]
        ${loading ? "opacity-50 cursor-not-allowed" : ""}
      `}
      style={{
        padding: "1rem 3rem",
        borderRadius: "999px",
        background: hovered ? "#008764" : "transparent",
        border: `2px solid #008764`,
        color: hovered ? "#ffffff" : "#008764",
        fontWeight: 800,
        fontSize: "0.85rem",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        cursor: loading ? "not-allowed" : "pointer",
        transform: hovered && !loading ? "scale(1.05)" : "scale(1)",
        transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
      }}
    >
      {loading ? (
        <>
          <Spinner />
          Loading...
        </>
      ) : (
        <>
          View All Projects
          <motion.span
            className="no-transition"
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
  const inView = useInView(sectionRef, { once: true, margin: "-8% 0px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Smooth out the parallax value
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Vertical parallax for the right column: moves slower or faster
  const yParallax = useTransform(smoothProgress, [0, 1], [0, -120]);

  return (
    <section
      ref={sectionRef}
      aria-label="CODO Agency Portfolio Highlights"
      style={{
        position: "relative",
        zIndex: 2,
        overflow: "hidden",
        padding: `${getResponsiveSpacing(80, 120, 192)} ${getResponsiveSpacing(24, 40, 60)}`,
        fontFamily: "'DM Sans', sans-serif",
        background: "#008764",
        marginTop: "-60px",
        marginBottom: "-60px",
        borderRadius: "60px",
        boxShadow: "0 0 60px rgba(0,0,0,0.05)",
      }}
    >

      {/* ── BACKGROUND: Radial gradient blobs ──────────────────────────────── ── */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        {/* Subtle light blobs for texture on white */}
        <div style={{
          position: "absolute", top: "0%", right: "0%",
          width: "800px", height: "800px",
          background: "radial-gradient(circle, rgba(1,182,103,0.03) 0%, transparent 70%)",
          filter: "blur(100px)",
        }} />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* ── SECTION HEADER ─────────────────────────────────────────────────── ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: getResponsiveSpacing(48, 64, 80),
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          {/* Left: headline */}
          <div>
            <motion.div
              className="no-transition"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}
            >
              <div style={{ height: "1px", width: "40px", background: "var(--brand-green)", opacity: 0.5 }} />
              <span style={{
                fontSize: "0.65rem", fontWeight: 700,
                letterSpacing: "0.3em", color: "var(--brand-green)",
                textTransform: "uppercase",
              }}>
                04 — Portfolio
              </span>
            </motion.div>

            <motion.h2
              className="no-transition"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
              style={{
                fontSize: getResponsiveFont(35, 72),
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
              }}
            >
              Work That{" "}
              <span style={{ color: "var(--brand-green)" }}>Speaks</span>
              <br />
              for Itself.
            </motion.h2>
          </div>

          {/* Right: selected works label */}
          <motion.div
            className="no-transition hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            style={{ textAlign: "right" }}
          >
            <div style={{
              fontSize: "0.65rem", fontWeight: 700,
              letterSpacing: "0.25em", textTransform: "uppercase",
              color: "var(--text-secondary)", opacity: 0.5,
              marginBottom: "0.5rem",
            }}>
              Selected Works
            </div>
            <div style={{
              fontSize: getResponsiveFont(32, 56),
              fontWeight: 900,
              color: "var(--glass-border)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}>
              {String(projects.length).padStart(2, "0")}
            </div>
          </motion.div>
        </div>

        {/* ── ASYMMETRIC PROJECT GRID WITH PARALLAX ─────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start mb-24 relative">
          <div className="flex flex-col gap-8 md:gap-12">
            {projects.filter((_, i) => i % 2 === 0).map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i * 2}
                inView={inView}
              />
            ))}
          </div>

          <motion.div 
            className="flex flex-col gap-8 md:gap-12 md:mt-24 no-transition"
            style={{ y: typeof window !== "undefined" && window.innerWidth > 768 ? yParallax : 0 }}
          >
            {projects.filter((_, i) => i % 2 !== 0).map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i * 2 + 1}
                inView={inView}
              />
            ))}
          </motion.div>
        </div>

        {/* ── BOTTOM DIVIDER LINE ─────────────────────────────────────────────── ── */}
        <motion.div
          className="no-transition"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.65 }}
          style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, var(--glass-border), transparent)",
            transformOrigin: "center",
            marginBottom: getResponsiveSpacing(40, 60, 64),
          }}
          aria-hidden="true"
        />

        {/* ── CTA ROW ────────────────────────────────────────────────────────── ── */}
        <motion.div
          className="no-transition"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.25rem",
            textAlign: "center",
          }}
        >
          <p style={{
            fontSize: getResponsiveFont(13.5, 16),
            color: "var(--text-secondary)",
            fontWeight: 400,
            maxWidth: "44ch",
            lineHeight: 1.7,
            opacity: 0.8,
          }}>
            These are just the highlights.
            The full portfolio spans{" "}
            <strong style={{ color: "var(--text-primary)", fontWeight: 700 }}>
              websites, apps, software & AI systems.
            </strong>
          </p>

          <PortfolioCta />
        </motion.div>

      </div>
    </section>
  );
}
