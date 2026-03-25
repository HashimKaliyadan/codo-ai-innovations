"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────────
   Scroll indicator
───────────────────────────────────────────── */
function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE, delay: 1.1 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        paddingBottom: "1rem",
      }}
    >
      {/* Animated line */}
      <div style={{ position: "relative", width: "1px", height: "52px", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
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
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        Scroll to explore
      </span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main
───────────────────────────────────────────── */
export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "#000",
        paddingTop: "clamp(8rem, 18vh, 14rem)",
        paddingBottom: "clamp(4rem, 8vh, 8rem)",
        paddingLeft: "clamp(1.5rem, 5vw, 4rem)",
        paddingRight: "clamp(1.5rem, 5vw, 4rem)",
      }}
    >
      <div className="mx-auto max-w-[1400px] relative">

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
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          CODO AI Innovations — Who We Are
        </motion.p>

        {/* Headline row */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-12"
        >
          {/* Big headline */}
          <h1
            style={{
              fontSize: "clamp(4.5rem, 14vw, 12rem)",
              fontWeight: 900,
              lineHeight: 0.87,
              letterSpacing: "-0.045em",
              margin: 0,
              color: "#fff",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            ABOUT
            <br />
            <span style={{ color: "var(--brand-green)" }}>US.</span>
          </h1>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}
            style={{
              maxWidth: "340px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              gap: "2.5rem",
              paddingBottom: "1rem",
            }}
          >
            <p
              style={{
                fontSize: "clamp(1rem, 1.15vw, 1.1rem)",
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1.75,
                margin: 0,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              We are a collective of engineers, designers, and strategists building AI-powered digital products that scale — under the banner of{" "}
              <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>
                CODO AI Innovations
              </span>
              .
            </p>

            <ScrollIndicator />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}