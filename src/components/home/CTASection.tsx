"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getResponsiveFont } from "@/lib/responsive";
import { TransitionLink as Link } from "@/components/transition/TransitionLink";

/* ─────────────────────────────────────────────
   Trust stats
───────────────────────────────────────────── */
const trustStats = [
  { value: "40+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "24h", label: "Response Time" },
];

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
   Floating Orb
───────────────────────────────────────────── */
function FloatingOrb({
  size,
  color,
  top,
  left,
  delay,
}: {
  size: number;
  color: string;
  top: string;
  left: string;
  delay: number;
}) {
  return (
    <motion.div
      aria-hidden="true"
      animate={{
        y: [0, -20, 0, 15, 0],
        x: [0, 10, -8, 5, 0],
        scale: [1, 1.05, 0.97, 1.03, 1],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      style={{
        position: "absolute",
        top,
        left,
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        filter: "blur(80px)",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   Main Section
───────────────────────────────────────────── */
export default function CTASection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10% 0px" });
  const [primaryHovered, setPrimaryHovered] = useState(false);
  const [secondaryHovered, setSecondaryHovered] = useState(false);

  return (
    <section
      ref={sectionRef}
      aria-label="Contact CODO Agency"
      className="relative w-full"
      style={{
        padding:
          "clamp(0.75rem, 1.5vw, 1.2rem) clamp(1.25rem, 5vw, 3.5rem) clamp(0.75rem, 1.5vw, 1.2rem)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div className="mx-auto max-w-[1320px]">
        <Reveal delay={0.06}>
          <div
            className="rounded-[2rem] p-8 md:p-12 mb-12"
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid var(--glass-border)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* ── Floating background orbs ── */}
            <FloatingOrb
              size={400}
              color="radial-gradient(circle, color-mix(in srgb, var(--brand-green) 12%, transparent) 0%, transparent 70%)"
              top="-15%"
              left="60%"
              delay={0}
            />
            <FloatingOrb
              size={300}
              color="radial-gradient(circle, rgba(60, 160, 255, 0.08) 0%, transparent 70%)"
              top="50%"
              left="-5%"
              delay={3}
            />
            <FloatingOrb
              size={250}
              color="radial-gradient(circle, color-mix(in srgb, var(--brand-green) 8%, transparent) 0%, transparent 70%)"
              top="70%"
              left="75%"
              delay={6}
            />

            {/* ── Grid / geometric pattern ── */}
            <svg
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              style={{ zIndex: 0, opacity: 0.35 }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="cta-grid"
                  width="60"
                  height="60"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 60 0 L 0 0 0 60"
                    fill="none"
                    stroke="rgba(255,255,255,0.03)"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-grid)" />
            </svg>

            {/* ── Content ── */}
            <div
              style={{ position: "relative", zIndex: 1, textAlign: "center" }}
            >

              {/* Headline */}
              <motion.h2
                className="no-transition"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0 }}
                style={{
                  fontSize: getResponsiveFont(36, 72),
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  color: "var(--text-primary)",
                  marginBottom: "1.25rem",
                  maxWidth: "800px",
                  margin: "0 auto 1.25rem auto",
                }}
              >
                Ready to Scale Your{" "}
                <br className="hidden md:block" />
                <span
                  style={{
                    color: "var(--brand-green)",
                    fontStyle: "italic",
                  }}
                >
                  Digital Presence?
                </span>
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                className="no-transition"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0 }}
                style={{
                  fontSize: getResponsiveFont(15, 19),
                  lineHeight: 1.7,
                  color: "var(--text-secondary)",
                  fontWeight: 400,
                  maxWidth: "580px",
                  margin: "0 auto 2.5rem auto",
                  opacity: 0.85,
                }}
              >
                Partner with CODO Agency to transform your operations with
                intelligent software, world-class mobile apps, and
                high-performance web platforms.
              </motion.p>

              {/* ── Dual CTA Buttons ── */}
              <motion.div
                className="no-transition"
                initial={{ opacity: 1, y: 0, scale: 1 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                  flexWrap: "wrap",
                  marginBottom: "3rem",
                }}
              >
                {/* Primary — Start a Project */}
                <Link href="/contact" passHref>
                  <div
                    onMouseEnter={() => setPrimaryHovered(true)}
                    onMouseLeave={() => setPrimaryHovered(false)}
                    className="cursor-pointer inline-flex items-center justify-center"
                    style={{
                      background: primaryHovered
                        ? "var(--text-primary)"
                        : "var(--brand-green)",
                      color: primaryHovered ? "var(--background)" : "white",
                      padding: "1.1rem 2.75rem",
                      borderRadius: "999px",
                      fontWeight: 800,
                      fontSize: "0.88rem",
                      letterSpacing: "0.05em",
                      gap: "0.75rem",
                      boxShadow: primaryHovered
                        ? "0 20px 50px rgba(255,255,255,0.12)"
                        : "0 12px 36px rgba(0, 135, 100, 0.25)",
                      transform: primaryHovered
                        ? "translateY(-3px)"
                        : "translateY(0)",
                      transition:
                        "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    Start a Project
                    <motion.div
                      animate={{ x: primaryHovered ? 6 : 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <ArrowRight size={18} strokeWidth={2.5} />
                    </motion.div>
                  </div>
                </Link>

                {/* Secondary — View Portfolio */}
                <Link href="/portfolio" passHref>
                  <div
                    onMouseEnter={() => setSecondaryHovered(true)}
                    onMouseLeave={() => setSecondaryHovered(false)}
                    className="cursor-pointer inline-flex items-center justify-center"
                    style={{
                      background: secondaryHovered
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(255,255,255,0.04)",
                      color: secondaryHovered
                        ? "var(--text-primary)"
                        : "var(--text-secondary)",
                      padding: "1.1rem 2.75rem",
                      borderRadius: "999px",
                      fontWeight: 800,
                      fontSize: "0.88rem",
                      letterSpacing: "0.05em",
                      gap: "0.75rem",
                      border: secondaryHovered
                        ? "1px solid rgba(255,255,255,0.2)"
                        : "1px solid rgba(255,255,255,0.1)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      transform: secondaryHovered
                        ? "translateY(-3px)"
                        : "translateY(0)",
                      transition:
                        "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    View Portfolio
                    <motion.div
                      animate={{ x: secondaryHovered ? 4 : 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <ArrowUpRight size={18} strokeWidth={2.5} />
                    </motion.div>
                  </div>
                </Link>
              </motion.div>

              {/* ── Trust Indicators ── */}
              <motion.div
                className="no-transition"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "clamp(1.5rem, 4vw, 3rem)",
                  flexWrap: "wrap",
                  marginBottom: "2rem",
                }}
              >
                {trustStats.map((stat, i) => (
                  <div
                    key={stat.label}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                        fontWeight: 900,
                        letterSpacing: "-0.03em",
                        color: "var(--brand-green)",
                        lineHeight: 1,
                      }}
                    >
                      {stat.value}
                    </span>
                    <span
                      style={{
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--text-secondary)",
                        opacity: 0.6,
                      }}
                    >
                      {stat.label}
                    </span>
                    {/* Separator dot — skip for last */}
                    {i < trustStats.length - 1 && (
                      <div
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          display: "none",
                        }}
                      />
                    )}
                  </div>
                ))}
              </motion.div>

              {/* ── Availability Badge ── */}
              <motion.div
                className="no-transition"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.5rem 1.25rem",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontSize: "0.78rem",
                  color: "var(--text-secondary)",
                  opacity: 0.8,
                }}
              >
                {/* Pulsing green dot */}
                <div style={{ position: "relative", width: 8, height: 8 }}>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "50%",
                      background: "var(--brand-green)",
                      boxShadow: "0 0 10px var(--brand-green)",
                    }}
                  />
                  <motion.div
                    animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "50%",
                      background: "var(--brand-green)",
                    }}
                  />
                </div>
                Currently accepting new clients for Q3 2026.
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
