"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Eye, Lightbulb, Globe, Handshake, GraduationCap } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* PRD Core Values — 5 values exactly as specified */
const values = [
  {
    icon: Lightbulb,
    number: "01",
    title: "Innovation & Excellence",
    description:
      "We push boundaries every day — combining cutting-edge AI with precision engineering to deliver solutions that don't just meet the bar, they redefine it.",
  },
  {
    icon: Eye,
    number: "02",
    title: "Integrity & Transparency",
    description:
      "We operate with radical honesty. No inflated timelines, no hidden costs, no vague deliverables. Our clients always know exactly where their product stands.",
  },
  {
    icon: Handshake,
    number: "03",
    title: "Client-Centric Approach",
    description:
      "Your success is our metric. We embed ourselves into your business context and make decisions the way a founding engineer would — with skin in the game.",
  },
  {
    icon: GraduationCap,
    number: "04",
    title: "Continuous Learning",
    description:
      "The technology landscape doesn't stand still, and neither do we. Our team stays at the frontier — through CODO Academy and relentless self-driven growth.",
  },
  {
    icon: Globe,
    number: "05",
    title: "Collaboration & Growth",
    description:
      "The best products are built together. We treat every engagement as a partnership, combining your domain knowledge with our technical depth to ship work that lasts.",
  },
];

function ValueRow({
  value,
  index,
  inView,
}: {
  value: (typeof values)[0];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE, delay: 0.1 + index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        padding: "2.25rem 0",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        cursor: "default",
        transition: "background 0.3s",
      }}
    >
      {/* Active left bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "2px",
          background: hovered ? "var(--brand-green)" : "transparent",
          transition: "background 0.35s ease",
          borderRadius: "1px",
        }}
      />

      {/* Hover row tint */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? "linear-gradient(90deg, rgba(0,255,136,0.03) 0%, transparent 60%)"
            : "transparent",
          transition: "background 0.35s ease",
          pointerEvents: "none",
        }}
      />

      <div
        className="flex items-start gap-8 pl-6"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Number */}
        <span
          style={{
            fontSize: "0.62rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            color: hovered ? "var(--brand-green)" : "rgba(255,255,255,0.18)",
            minWidth: "1.8rem",
            paddingTop: "0.35rem",
            transition: "color 0.35s ease",
            fontFamily: "'DM Sans', sans-serif",
            flexShrink: 0,
          }}
        >
          {value.number}
        </span>

        {/* Icon */}
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: "10px",
            background: hovered ? "rgba(0,255,136,0.08)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${hovered ? "rgba(0,255,136,0.2)" : "rgba(255,255,255,0.06)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.35s ease",
          }}
        >
          <value.icon
            size={17}
            style={{
              color: hovered ? "var(--brand-green)" : "rgba(255,255,255,0.3)",
              transition: "color 0.35s ease",
            }}
          />
        </div>

        {/* Text */}
        <div style={{ flex: 1 }}>
          <div
            className="flex flex-col md:flex-row md:items-baseline justify-between gap-2"
            style={{ marginBottom: "0.6rem" }}
          >
            <h3
              style={{
                fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
                fontWeight: 700,
                letterSpacing: "-0.015em",
                color: hovered ? "#fff" : "rgba(255,255,255,0.6)",
                transition: "color 0.35s ease",
                fontFamily: "'DM Sans', sans-serif",
                lineHeight: 1.2,
              }}
            >
              {value.title}
            </h3>
          </div>
          <p
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.75,
              color: hovered ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.28)",
              maxWidth: "56ch",
              transition: "color 0.35s ease",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {value.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ValuesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <section
      ref={ref}
      style={{
        background: "#000",
        padding: "clamp(5rem, 10vh, 8rem) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Section-level ambient glow — top left quadrant */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-10%",
          left: "-5%",
          width: "60vw",
          height: "80vh",
          background:
            "radial-gradient(ellipse 60% 60% at 20% 30%, color-mix(in srgb, var(--brand-green) 5%, transparent), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* Hairline top border */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "rgba(255,255,255,0.05)",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* ── Left column: sticky label + headline ── */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              style={{
                fontSize: "0.62rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                color: "var(--brand-green)",
                marginBottom: "1.5rem",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Core Values
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              style={{
                fontSize: "clamp(2rem, 3.2vw, 2.8rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "#fff",
                marginBottom: "1.75rem",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Principles that
              <br />
              <span style={{ color: "var(--brand-green)" }}>drive every</span>
              <br />
              decision.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.35)",
                maxWidth: "32ch",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              CODO AI Innovations was built on a foundation of five non-negotiable beliefs. These aren't aspirational — they're operational.
            </motion.p>

            {/* Count indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginTop: "3rem",
              }}
            >
              <span
                style={{
                  fontSize: "clamp(3rem, 5vw, 4rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                  lineHeight: 1,
                  color: "rgba(255,255,255,0.06)",
                  fontFamily: "'DM Sans', sans-serif",
                  userSelect: "none",
                }}
              >
                05
              </span>
              <span
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.18)",
                  fontFamily: "'DM Sans', sans-serif",
                  lineHeight: 1.5,
                  maxWidth: "10ch",
                }}
              >
                Core Principles
              </span>
            </motion.div>
          </div>

          {/* ── Right column: values list ── */}
          <div className="lg:col-span-8">
            {/* Top border of the list */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
              style={{
                height: "1px",
                background: "rgba(255,255,255,0.05)",
                transformOrigin: "left",
              }}
            />

            {values.map((v, i) => (
              <ValueRow key={v.number} value={v} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}