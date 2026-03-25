"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const HERO_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    alt: "Team collaborating",
  },
  {
    src: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop",
    alt: "Design workshop",
  },
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    alt: "Strategy session",
  },
];

export default function CareersHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "#000",
        paddingTop: "clamp(8rem, 18vh, 14rem)",
        paddingBottom: "clamp(4rem, 8vh, 8rem)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100vw",
          height: "70vh",
          background:
            "radial-gradient(ellipse 60% 60% at 50% 30%, color-mix(in srgb, var(--brand-green) 6%, transparent), transparent)",
        }}
      />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-16 relative">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            fontSize: "0.62rem",
            fontWeight: 700,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "var(--brand-green)",
            marginBottom: "1.75rem",
          }}
        >
          CODO AI Innovations — Careers
        </motion.p>

        {/* ── Two-column: Headline left, Images right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-end">
          {/* Left: Headline + description */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
          >
            <h1
              style={{
                fontSize: "clamp(3.5rem, 10vw, 9rem)",
                fontWeight: 900,
                lineHeight: 0.9,
                letterSpacing: "-0.045em",
                margin: 0,
                color: "#fff",
              }}
            >
              BUILD
              <br />
              WITH
              <br />
              <span style={{ color: "var(--brand-green)" }}>US.</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}
              style={{
                fontSize: "clamp(1rem, 1.15vw, 1.1rem)",
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1.75,
                margin: 0,
                marginTop: "2.5rem",
                maxWidth: "38ch",
              }}
            >
              Join a team of engineers, designers, and strategists building 
              AI-powered products that scale — in a culture built on{" "}
              <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>
                learning, innovation, and real impact
              </span>.
            </motion.p>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 1.1 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginTop: "3rem",
              }}
            >
              <div style={{ position: "relative", width: "1px", height: "52px", overflow: "hidden" }}>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(255,255,255,0.08)",
                  }}
                />
                <motion.div
                  animate={{ y: ["-100%", "200%"] }}
                  transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.4 }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "50%",
                    background: "linear-gradient(to bottom, transparent, var(--brand-green))",
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.2)",
                }}
              >
                Scroll to explore
              </span>
            </motion.div>
          </motion.div>

          {/* Right: Image collage */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.3 }}
            className="relative hidden md:block"
            style={{ height: "clamp(400px, 50vh, 520px)" }}
          >
            {/* Main large image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                width: "65%",
                height: "100%",
                borderRadius: "1.5rem",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <img
                src={HERO_IMAGES[0].src}
                alt={HERO_IMAGES[0].alt}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              {/* Vignette */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%)",
                  pointerEvents: "none",
                }}
              />
              {/* Badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: "1.25rem",
                  left: "1.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "999px",
                  background: "rgba(0,0,0,0.7)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--brand-green)",
                    display: "inline-block",
                  }}
                />
                <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)" }}>
                  We're Hiring
                </span>
              </div>
            </motion.div>

            {/* Stacked vertical images on the left */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: "5%",
                width: "32%",
                height: "90%",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
                style={{
                  flex: 1,
                  borderRadius: "1.25rem",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <img
                  src={HERO_IMAGES[1].src}
                  alt={HERO_IMAGES[1].alt}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.65 }}
                style={{
                  flex: 1,
                  borderRadius: "1.25rem",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <img
                  src={HERO_IMAGES[2].src}
                  alt={HERO_IMAGES[2].alt}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </motion.div>
            </div>

            {/* Floating stat badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.9, type: "spring", bounce: 0.35 }}
              style={{
                position: "absolute",
                left: "25%",
                bottom: "-1rem",
                background: "rgba(0,0,0,0.85)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(0,255,136,0.2)",
                padding: "1rem 1.5rem",
                borderRadius: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                zIndex: 10,
              }}
            >
              <span style={{ fontSize: "clamp(1.8rem, 3vw, 2.2rem)", fontWeight: 900, color: "var(--brand-green)", lineHeight: 1 }}>
                6+
              </span>
              <div>
                <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>Open Roles</p>
                <p style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.3 }}>Across 4 teams</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Mobile image fallback */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="md:hidden"
            style={{
              height: "280px",
              borderRadius: "1.25rem",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
              position: "relative",
            }}
          >
            <img
              src={HERO_IMAGES[0].src}
              alt={HERO_IMAGES[0].alt}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "1rem",
                left: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                borderRadius: "999px",
                background: "rgba(0,0,0,0.7)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--brand-green)", display: "inline-block" }} />
              <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)" }}>
                We're Hiring
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
