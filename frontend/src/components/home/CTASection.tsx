"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { getResponsiveFont, getResponsiveSpacing } from "@/lib/responsive";
import Link from "next/link";

export default function CTASection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10% 0px" });
  const [hovered, setHovered] = useState(false);

  return (
    <section
      ref={sectionRef}
      aria-label="Contact CODO Agency"
      style={{
        position: "relative",
        zIndex: 1,
        padding: `${getResponsiveSpacing(80, 120, 160)} 0`,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* ── Background Glow ────────────────────────────────────────────── */}
      <div 
        aria-hidden="true" 
        style={{
          position: "absolute", 
          inset: 0,
          zIndex: 0, 
          pointerEvents: "none", 
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div style={{
          position: "absolute",
          width: "800px", 
          height: "800px",
          background: "radial-gradient(circle, rgba(0, 135, 100, 0.08) 0%, transparent 60%)",
          filter: "blur(80px)",
        }} />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        
        {/* ── Badge ──────────────────────────────────────────────────────── */}
        <motion.div
          className="no-transition"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 1rem",
            borderRadius: "999px",
            background: "color-mix(in srgb, var(--brand-green) 10%, transparent)",
            border: "1px solid color-mix(in srgb, var(--brand-green) 20%, transparent)",
            color: "var(--brand-green)",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "2rem",
          }}
        >
          <Sparkles size={14} />
          Let's Build Together
        </motion.div>

        {/* ── Headline ───────────────────────────────────────────────────── */}
        <motion.h2
          className="no-transition"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
          style={{
            fontSize: getResponsiveFont(40, 80),
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
            marginBottom: "1.5rem",
          }}
        >
          Ready to scale your <br className="hidden md:block" />
          <span style={{ color: "var(--brand-green)", fontStyle: "italic" }}>digital presence?</span>
        </motion.h2>

        {/* ── Subtitle ───────────────────────────────────────────────────── */}
        <motion.p
          className="no-transition"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          style={{
            fontSize: getResponsiveFont(16, 20),
            lineHeight: 1.6,
            color: "var(--text-secondary)",
            fontWeight: 400,
            maxWidth: "600px",
            margin: "0 auto 3rem auto",
          }}
        >
          Partner with CODO Agency to transform your operations with intelligent software, world-class mobile apps, and high-performance web platforms.
        </motion.p>

        {/* ── CTA Button ─────────────────────────────────────────────────── */}
        <motion.div
          className="no-transition"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
        >
          <Link href="/contact" passHref>
            <div
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="group cursor-pointer inline-flex items-center justify-center gap-4 transition-all duration-500"
              style={{
                background: hovered ? "var(--text-primary)" : "var(--brand-green)",
                color: hovered ? "var(--background)" : "white",
                padding: "1.25rem 3.5rem",
                borderRadius: "999px",
                fontWeight: 800,
                fontSize: "1rem",
                letterSpacing: "0.05em",
                boxShadow: hovered 
                  ? "0 20px 40px rgba(255,255,255,0.15)" 
                  : "0 10px 30px rgba(0, 135, 100, 0.3)",
                transform: hovered ? "translateY(-4px)" : "translateY(0)"
              }}
            >
              Start a Project
              <motion.div
                animate={{ x: hovered ? 8 : 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <ArrowRight size={20} strokeWidth={2.5} />
              </motion.div>
            </div>
          </Link>
        </motion.div>

        {/* ── Bottom Text ────────────────────────────────────────────────── */}
        <motion.div
          className="no-transition"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          style={{
            marginTop: "2.5rem",
            fontSize: "0.85rem",
            color: "var(--text-secondary)",
            opacity: 0.7,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem"
          }}
        >
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--brand-green)", boxShadow: "0 0 10px var(--brand-green)" }}></div>
          Currently accepting new clients for Q3 2026.
        </motion.div>

      </div>
    </section>
  );
}
