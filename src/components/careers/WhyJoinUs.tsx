"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Rocket, GitBranch } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const reasons = [
  {
    icon: GraduationCap,
    number: "01",
    title: "Learning-Focused Culture",
    description:
      "CODO Academy is at the heart of everything we do. Every team member has access to structured learning paths, mentorship from senior engineers, and dedicated time for exploration.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
    accent: "var(--brand-green)",
  },
  {
    icon: Rocket,
    number: "02",
    title: "Real-World AI Projects",
    description:
      "From day one, you'll work on production AI systems, scalable SaaS platforms, and cross-platform mobile apps shipped to real users — with real stakes and real impact.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
    accent: "var(--brand-green)",
  },
  {
    icon: GitBranch,
    number: "03",
    title: "Growth Within the Ecosystem",
    description:
      "Move between Academy, Agency, and Innovation projects. Take ownership of features, lead sprints, and shape the roadmap. Your trajectory is limited only by your ambition.",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
    accent: "var(--brand-green)",
  },
];

function ReasonCard({
  reason,
  index,
  inView,
  isWide,
}: {
  reason: (typeof reasons)[0];
  index: number;
  inView: boolean;
  isWide: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE, delay: 0.15 + index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "1.5rem",
        overflow: "hidden",
        border: `1px solid ${hovered ? "rgba(0,255,136,0.15)" : "rgba(255,255,255,0.06)"}`,
        background: "rgba(255,255,255,0.02)",
        transition: "border-color 0.4s ease, transform 0.4s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        cursor: "default",
        gridColumn: isWide ? "span 2" : "span 1",
      }}
      className={isWide ? "md:col-span-2" : ""}
    >
      {/* Image section */}
      <div
        style={{
          position: "relative",
          height: isWide ? "220px" : "180px",
          overflow: "hidden",
        }}
      >
        <img
          src={reason.image}
          alt={reason.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.6s ease",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
        {/* Number watermark */}
        <span
          style={{
            position: "absolute",
            top: "1rem",
            right: "1.25rem",
            fontSize: "clamp(3rem, 5vw, 4.5rem)",
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-0.05em",
            color: "rgba(255,255,255,0.06)",
            userSelect: "none",
          }}
        >
          {reason.number}
        </span>
      </div>

      {/* Content section */}
      <div style={{ padding: "1.75rem 2rem 2rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "10px",
              background: hovered ? "rgba(0,255,136,0.08)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${hovered ? "rgba(0,255,136,0.2)" : "rgba(255,255,255,0.08)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.35s ease",
              flexShrink: 0,
            }}
          >
            <reason.icon
              size={16}
              style={{
                color: hovered ? "var(--brand-green)" : "rgba(255,255,255,0.35)",
                transition: "color 0.35s ease",
              }}
            />
          </div>
          <h3
            style={{
              fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)",
              fontWeight: 700,
              letterSpacing: "-0.015em",
              color: hovered ? "#fff" : "rgba(255,255,255,0.7)",
              transition: "color 0.35s ease",
              lineHeight: 1.25,
            }}
          >
            {reason.title}
          </h3>
        </div>
        <p
          style={{
            fontSize: "0.88rem",
            lineHeight: 1.7,
            color: hovered ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.3)",
            transition: "color 0.35s ease",
            maxWidth: isWide ? "60ch" : "40ch",
          }}
        >
          {reason.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function WhyJoinUs() {
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
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Hairline top border */}
      <div
        aria-hidden
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
        {/* ── Section Header ── */}
        <div style={{ textAlign: "center", marginBottom: "clamp(3.5rem, 7vh, 5.5rem)" }}>
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
              marginBottom: "1.25rem",
            }}
          >
            Why Join CODO
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: "-0.035em",
              color: "#fff",
              margin: "0 auto",
              maxWidth: "22ch",
            }}
          >
            A career built on{" "}
            <span style={{ color: "var(--brand-green)" }}>real growth,</span>{" "}
            not promises.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.16 }}
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.35)",
              maxWidth: "52ch",
              margin: "1.5rem auto 0",
            }}
          >
            We don't just offer jobs — we offer a platform to become the best version of yourself as an engineer, designer, or strategist.
          </motion.p>
        </div>

        {/* ── Bento Grid: 1 wide + 2 narrow ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1.5rem",
          }}
          className="md:grid-cols-2"
        >
          {reasons.map((reason, i) => (
            <ReasonCard
              key={reason.number}
              reason={reason}
              index={i}
              inView={inView}
              isWide={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
