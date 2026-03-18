"use client";

import { useRef, useState } from "react";
import { useInView, motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

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
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const divisions = [
  {
    id: "academy",
    label: "Academy",
    name: "CODO Academy",
    tagline: "We train those who build tomorrow.",
    description:
      "Training, internships, and skill development programs that bridge industry demand with human potential. Hands-on AI, web, and emerging tech education for the next generation of innovators.",
    cta: "Visit Academy",
    link: "https://www.codoacademy.com",
    external: true,
    stat: "500+",
    statLabel: "Innovators Trained",
    features: ["AI & Emerging Tech", "Hands-on Projects", "Industry Mentors", "Placement Support"],
    // Deep forest green gradient — rich, warm
    gradient: "linear-gradient(145deg, #003d2b 0%, #005a3f 40%, #007a55 100%)",
    patternColor: "rgba(255,255,255,0.045)",
  },
  {
    id: "agency",
    label: "Agency",
    name: "CODO Agency",
    tagline: "We build what others imagine.",
    description:
      "Custom web applications, enterprise software, and mobile apps powered by cutting-edge AI. From concept to deployment — we deliver scalable digital solutions that drive real business impact.",
    cta: "View Portfolio",
    link: "/portfolio",
    external: false,
    stat: "30+",
    statLabel: "Solutions Delivered",
    features: ["Web & Mobile Apps", "AI Integration", "Enterprise Software", "End-to-end Delivery"],
    // Deep navy gradient — cool, technical
    gradient: "linear-gradient(145deg, #050d1a 0%, #0a1f3d 40%, #0d2952 100%)",
    patternColor: "rgba(0,183,100,0.055)",
  },
];

/* ─────────────────────────────────────────────
   Division Card
───────────────────────────────────────────── */
function DivisionCard({
  division,
  index,
  inView,
}: {
  division: (typeof divisions)[0];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.2 + index * 0.15,
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate-prop="custom"
      style={{ flex: "1 1 0", minWidth: 0 }}
    >
      <motion.div
        animate={{
          y: hovered ? -10 : 0,
          boxShadow: hovered
            ? "0 0 0 1px rgba(255,255,255,0.08)"
            : "0 0 0 1px rgba(255,255,255,0.05)",
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-3xl flex flex-col"
        style={{
          background: division.gradient,
          overflow: "hidden",
          position: "relative",
          minHeight: "clamp(500px, 60vw, 680px)",
          cursor: "default",
        }}
      >
        {/* ── Geometric pattern overlay ── */}
        <svg
          aria-hidden="true"
          viewBox="0 0 500 500"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "70%",
            height: "70%",
            opacity: 1,
            pointerEvents: "none",
          }}
        >
          {/* Concentric arcs top-right corner */}
          {[60, 120, 180, 240, 300].map((r, i) => (
            <circle
              key={i}
              cx="500"
              cy="0"
              r={r}
              fill="none"
              stroke={division.patternColor}
              strokeWidth="1"
            />
          ))}
          {/* Diagonal rule */}
          <line
            x1="500" y1="0" x2="0" y2="500"
            stroke={division.patternColor}
            strokeWidth="0.8"
          />
        </svg>

        {/* ── Noise grain ── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')",
            backgroundSize: "200px 200px",
            opacity: 0.04,
            mixBlendMode: "overlay",
            pointerEvents: "none",
          }}
        />

        {/* ── Bottom fade ── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "55%",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* ── Card content ── */}
        <div
          className="flex flex-col justify-between"
          style={{
            flex: 1,
            padding: "clamp(1.75rem, 3.5vw, 2.5rem)",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* TOP — label + stat */}
          <div className="flex items-start justify-between">
            {/* Division label pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                padding: "0.32rem 0.85rem",
                borderRadius: "100px",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--brand-green)",
                  display: "inline-block",
                  boxShadow: "0 0 8px var(--brand-green)",
                }}
              />
              <span
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                CODO {division.label}
              </span>
            </div>


          </div>

          {/* BOTTOM — everything else */}
          <div>
            {/* Tagline */}
            <p
              style={{
                fontSize: "clamp(0.72rem, 1.2vw, 0.82rem)",
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              {division.tagline}
            </p>

            {/* Division name */}
            <h3
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
                fontWeight: 900,
                color: "#ffffff",
                lineHeight: 1.04,
                letterSpacing: "-0.03em",
                marginBottom: "1rem",
              }}
            >
              {division.name.split(" ")[0]}{" "}
              <span
                style={{
                  color: "var(--brand-green)",
                  fontStyle: "italic",
                }}
              >
                {division.name.split(" ")[1]}
              </span>
            </h3>

            {/* Description */}
            <p
              style={{
                fontSize: "clamp(0.85rem, 1.4vw, 0.97rem)",
                lineHeight: 1.78,
                color: "rgba(255,255,255,0.58)",
                maxWidth: "44ch",
                marginBottom: "1.5rem",
              }}
            >
              {division.description}
            </p>

            {/* Feature chips */}
            <div className="flex flex-wrap" style={{ gap: "0.4rem", marginBottom: "1.75rem" }}>
              {division.features.map((f, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    delay: 0.5 + index * 0.15 + i * 0.07,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    padding: "0.28rem 0.7rem",
                    borderRadius: "8px",
                    fontSize: "0.58rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    border: "1px solid rgba(255,255,255,0.14)",
                    color: "rgba(255,255,255,0.55)",
                    background: "rgba(255,255,255,0.06)",
                  }}
                >
                  {f}
                </motion.span>
              ))}
            </div>

            {/* Divider */}
            <div
              style={{
                height: "1px",
                background: "rgba(255,255,255,0.1)",
                marginBottom: "1.5rem",
              }}
            />

            {/* CTA */}
            {division.external ? (
              <a
                href={division.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.55rem",
                  padding: "0.8rem 1.75rem",
                  borderRadius: "100px",
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#000",
                  background: "var(--brand-green)",
                  border: "1.5px solid var(--brand-green)",
                  textDecoration: "none",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.transform = "translateX(4px)";
                  el.style.boxShadow = "0 0 24px color-mix(in srgb, var(--brand-green) 50%, transparent)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.transform = "translateX(0)";
                  el.style.boxShadow = "none";
                }}
              >
                {division.cta}
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path
                    d="M1 10L10 1M10 1H4M10 1V7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            ) : (
              <Link
                href={division.link}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.55rem",
                  padding: "0.8rem 1.75rem",
                  borderRadius: "100px",
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#ffffff",
                  background: "rgba(255,255,255,0.1)",
                  border: "1.5px solid rgba(255,255,255,0.2)",
                  textDecoration: "none",
                  transition: "background 0.25s ease, border-color 0.25s ease, transform 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "rgba(255,255,255,0.18)";
                  el.style.borderColor = "rgba(255,255,255,0.35)";
                  el.style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "rgba(255,255,255,0.1)";
                  el.style.borderColor = "rgba(255,255,255,0.2)";
                  el.style.transform = "translateX(0)";
                }}
              >
                {division.cta}
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path
                    d="M1 10L10 1M10 1H4M10 1V7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main Section
───────────────────────────────────────────── */
export default function EcosystemSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-8% 0px" });

  return (
    <section
      ref={sectionRef}
      aria-label="CODO Ecosystem"
      className="relative w-full"
      style={{
        padding: "clamp(0.75rem, 1.5vw, 1.2rem) clamp(1.25rem, 5vw, 3.5rem) clamp(0.75rem, 1.5vw, 1.2rem)",
        fontFamily: "'DM Sans', sans-serif",
        overflow: "hidden",
      }}
    >
      <div className="mx-auto max-w-[1320px] relative" style={{ zIndex: 1 }}>

        {/* ── Header block — Glassmorphism Box ── */}
        <Reveal delay={0}>
          <div
            className="flex flex-col items-center text-center rounded-3xl"
            style={{
              marginBottom: "clamp(3rem, 6vw, 5rem)",
              padding: "clamp(2rem, 5vw, 4rem)",
              background: "var(--glass-bg)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid var(--glass-border)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Ambient green glow — behind the box text */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: -80,
                left: "50%",
                transform: "translateX(-50%)",
                width: 360,
                height: 360,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--brand-green) 10%, transparent) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            {/* Eyebrow with extending lines */}
            <div className="flex items-center gap-3 relative z-10" style={{ marginBottom: "2rem" }}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 40 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                style={{ height: 2, background: "var(--brand-green)", borderRadius: 2 }}
              />
              <span
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.35em",
                  color: "var(--brand-green)",
                  textTransform: "uppercase",
                }}
              >
                The Ecosystem
              </span>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 40 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                style={{ height: 2, background: "var(--brand-green)", borderRadius: 2 }}
              />
            </div>

            {/* Heading */}
            <h2
              className="relative z-10"
              style={{
                fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
                fontWeight: 900,
                lineHeight: 1.04,
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
                marginBottom: "1.25rem",
              }}
            >
              One Company.
              <br />
              <span style={{ color: "var(--brand-green)" }}>Two Powerful Arms.</span>
            </h2>

            {/* Subtext */}
            <p
              className="relative z-10"
              style={{
                fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
                lineHeight: 1.82,
                color: "var(--text-secondary)",
                maxWidth: "58ch",
                opacity: 0.75,
              }}
            >
              CODO AI Innovations operates through two specialized verticals — each with
              a distinct mission, united by the same commitment to innovation, quality,
              and lasting impact.
            </p>
          </div>
        </Reveal>

        {/* ── Two Division Cards — floating, no outer container ── */}
        <div
          className="flex flex-col md:flex-row"
          style={{ gap: "clamp(1rem, 2vw, 1.5rem)" }}
        >
          {divisions.map((division, i) => (
            <DivisionCard
              key={division.id}
              division={division}
              index={i}
              inView={inView}
            />
          ))}
        </div>

      </div>
    </section>
  );
}