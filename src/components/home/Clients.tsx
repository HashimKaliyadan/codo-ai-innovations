"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const clients = [
  "Europecalling",
  "Evoka",
  "Albedo",
  "CODO Academy",
  "TechCorp",
  "GlobalReach",
  "NovaSoft",
  "DataSync",
];

/* ─────────────────────────────────────────────
   Scroll-reveal wrapper (consistent with other sections)
───────────────────────────────────────────── */
function Reveal({
  children,

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
   Infinite Marquee Row
───────────────────────────────────────────── */
function MarqueeRow({
  items,
  direction = "left",
  speed = 30,
}: {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
}) {
  // Duplicate items enough times to fill viewport seamlessly
  const doubled = [...items, ...items, ...items, ...items];

  return (
    <div
      style={{
        overflow: "hidden",
        width: "100%",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <motion.div
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
        style={{
          display: "flex",
          gap: "clamp(0.75rem, 1.5vw, 1.2rem)",
          width: "fit-content",
          willChange: "transform",
        }}
      >
        {doubled.map((name, i) => (
          <div
            key={`${name}-${i}`}
            style={{
              flexShrink: 0,
              padding: "0.75rem 1.75rem",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              gap: "0.65rem",
              transition: "border-color 0.3s ease, background 0.3s ease",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor =
                "color-mix(in srgb, var(--brand-green) 40%, transparent)";
              e.currentTarget.style.background = "rgba(255,255,255,0.07)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            }}
          >
            {/* Logo dot */}
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "8px",
                background:
                  "linear-gradient(135deg, color-mix(in srgb, var(--brand-green) 20%, transparent), color-mix(in srgb, var(--brand-green) 8%, transparent))",
                border:
                  "1px solid color-mix(in srgb, var(--brand-green) 25%, transparent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.7rem",
                fontWeight: 900,
                color: "var(--brand-green)",
                flexShrink: 0,
              }}
            >
              {name.charAt(0)}
            </div>
            <span
              style={{
                fontSize: "0.82rem",
                fontWeight: 700,
                letterSpacing: "-0.01em",
                color: "var(--text-primary)",
                whiteSpace: "nowrap",
                opacity: 0.85,
              }}
            >
              {name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Section
───────────────────────────────────────────── */
export default function ClientsSection() {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      aria-label="Clients & Partners"
      className="relative w-full"
      style={{
        padding:
          "clamp(0.75rem, 1.5vw, 1.2rem) clamp(1.25rem, 5vw, 3.5rem) clamp(0.75rem, 1.5vw, 1.2rem)",
        fontFamily: "'DM Sans', sans-serif",
        overflow: "hidden",
      }}
    >
      <div className="mx-auto max-w-[1320px]">
        {/* ═══════════════════════════════════════════
            Part 1 — Trusted Clients Marquee
        ═══════════════════════════════════════════ */}
        <Reveal delay={0.06}>
          <div
            className="rounded-2xl p-8 md:p-12"
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid var(--glass-border)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Ambient glow */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: -100,
                left: "50%",
                transform: "translateX(-50%)",
                width: 500,
                height: 500,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--brand-green) 8%, transparent) 0%, transparent 65%)",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>

              {/* Heading */}
              <h2
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  color: "var(--text-primary)",
                  margin: "0 0 2rem 0",
                }}
              >
                Brands That{" "}
                <span
                  style={{
                    color: "var(--brand-green)",
                    fontStyle: "italic",
                  }}
                >
                  Trust Us.
                </span>
              </h2>

              {/* Marquee rows */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(0.5rem, 1vw, 0.75rem)",
                }}
              >
                <MarqueeRow items={clients} direction="left" speed={35} />
                <MarqueeRow
                  items={[...clients].reverse()}
                  direction="right"
                  speed={40}
                />
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
