"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        paddingTop: "clamp(120px, 16vw, 180px)",
        paddingBottom: "clamp(60px, 8vw, 100px)",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-200px",
          right: "-100px",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 65%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-[1320px] mx-auto px-6">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            fontSize: "0.7rem",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            color: "var(--brand-green)",
            marginBottom: "1.5rem",
          }}
        >
          About Us
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          style={{
            fontSize: "clamp(36px, 6.5vw, 76px)",
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
            maxWidth: "900px",
          }}
        >
          The team behind
          <br />
          <span style={{ color: "var(--brand-green)" }}>the innovation.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          style={{
            fontSize: "clamp(15px, 1.8vw, 19px)",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.5)",
            maxWidth: "620px",
            marginTop: "1.5rem",
          }}
        >
          We&apos;re a collective of engineers, designers, and strategists
          building AI-powered digital products that scale. Based in Kerala,
          shipping globally.
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.4 }}
          style={{
            marginTop: "3rem",
            height: "1px",
            background:
              "linear-gradient(90deg, var(--brand-green), transparent)",
            transformOrigin: "left",
            maxWidth: "300px",
          }}
        />
      </div>
    </section>
  );
}
