"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";

function AnimatedBlock({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
        delay: index * 0.15,
      }}
      style={{ marginBottom: "2.5rem" }}
    >
      {children}
    </motion.div>
  );
}

const ecosystem = [
  {
    title: "CODO Academy",
    desc: "Training, internships, and skill development programs that bridge industry demand with human potential. Hands-on AI, web, and emerging tech education for the next generation of innovators.",
    cta: "Visit Academy Website",
    link: "#academy",
    accent: "var(--brand-green)",
  },
  {
    title: "CODO Agency",
    desc: "Custom web applications, enterprise software, and mobile apps powered by cutting-edge AI. From concept to deployment — we deliver scalable digital solutions that drive real business impact.",
    cta: "View Portfolio",
    link: "#portfolio",
    accent: "var(--brand-green)",
  },
];

export default function EcosystemSection() {
  return (
    <section
      aria-label="CODO Ecosystem"
      style={{
        position: "relative",
        zIndex: 1,
        // ── Small continuity tweak: matching top padding from AboutSection
        padding: "clamp(6rem, 12vw, 10rem) clamp(1.5rem, 6vw, 6rem) clamp(6rem, 12vw, 8rem)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* ── Re-added subtle ambient glows (same as AboutSection) for visual continuity */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-10%",
          right: "-15%",
          width: "420px",
          height: "420px",
          background: "var(--shadow-glow)",
          filter: "blur(90px)",
          borderRadius: "50%",
          zIndex: 0,
          pointerEvents: "none",
          willChange: "transform, filter",
          opacity: 0.6,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "15%",
          left: "-12%",
          width: "360px",
          height: "360px",
          background: "rgba(0,32,63,0.15)",
          filter: "blur(80px)",
          borderRadius: "50%",
          zIndex: 0,
          pointerEvents: "none",
          willChange: "transform, filter",
        }}
      />

      <div className="max-w-[1400px] mx-auto flex flex-col relative z-10">
        {/* Huge ambient text - slightly refined for better mobile scaling */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-120px",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "clamp(4.5rem, 14vw, 11rem)",
            fontWeight: 900,
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.08)",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            userSelect: "none",
            zIndex: 0,
            willChange: "transform",
          }}
        >
          ECOSYSTEM
        </div>

        <div className="flex flex-col items-center text-center mt-12 w-full z-10">
          <AnimatedBlock index={0}>
            <div
              className="flex flex-col items-center"
              style={{ marginBottom: "2rem" }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 40 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{
                    height: "2px",
                    background: "var(--brand-green)",
                  }}
                />
                <span
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.3em",
                    color: "var(--brand-green)",
                    textTransform: "uppercase",
                  }}
                >
                  Ecosystem
                </span>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 40 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{
                    height: "2px",
                    background: "var(--brand-green)",
                  }}
                />
              </div>
            </div>
          </AnimatedBlock>

          {/* Heading & content */}
          <AnimatedBlock index={1}>
            <h2
              className="text-[clamp(2.2rem,6vw,3.5rem)]"
              style={{
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
                marginBottom: "1.25rem",
                maxWidth: "20ch"
              }}
            >
              One Company. <br />
              <span style={{ color: "var(--brand-green)" }}>Two Powerful Arms.</span>
            </h2>
          </AnimatedBlock>

          <AnimatedBlock index={2}>
            <p
              style={{
                fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
                lineHeight: 1.8,
                color: "var(--text-secondary)",
                fontWeight: 400,
                maxWidth: "65ch",
                margin: "0 auto",
              }}
            >
              CODO AI Innovations operates through two specialized verticals — each with a distinct mission, united by the same commitment to innovation, quality, and impact.
            </p>
          </AnimatedBlock>

          {/* Split Cards - tiny polish: slightly wider container + more breathing room */}
          <AnimatedBlock index={3}>
            <div
              className="grid md:grid-cols-2 gap-10 w-full max-w-[1080px] mx-auto text-left"
              style={{ marginTop: "3.5rem" }}
            >
              {ecosystem.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group"
                  style={{
                    padding: "2.75rem 2.25rem",
                    border: "1px solid var(--glass-border)",
                    borderRadius: "20px",
                    background: "var(--glass-bg)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backfaceVisibility: "hidden",
                    transform: "translateZ(0)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: item.accent,
                      marginBottom: "0.75rem",
                    }}
                  >
                    CODO
                  </div>

                  <div
                    style={{
                      fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                      fontWeight: 900,
                      lineHeight: 1.05,
                      color: "var(--text-primary)",
                      marginBottom: "1.25rem",
                    }}
                  >
                    {item.title.replace("CODO ", "")}
                  </div>

                  <p
                    style={{
                      fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)",
                      lineHeight: 1.85,
                      color: "var(--text-secondary)",
                      flex: 1,
                      marginBottom: "2rem",
                    }}
                  >
                    {item.desc}
                  </p>

                  <a
                    href={item.link}
                    className="group-hover:bg-[var(--brand-green)] group-hover:text-black transition-all duration-300 inline-flex items-center gap-3 px-8 py-4 border border-[var(--brand-green)] rounded-full text-[var(--brand-green)] font-medium text-sm tracking-wider uppercase self-start"
                    style={{ textDecoration: "none" }}
                  >
                    {item.cta}
                    <span
                      className="transition-transform group-hover:translate-x-1"
                      style={{ fontSize: "1.1rem" }}
                    >
                      →
                    </span>
                  </a>
                </motion.div>
              ))}
            </div>
          </AnimatedBlock>
        </div>
      </div>
    </section>
  );
}