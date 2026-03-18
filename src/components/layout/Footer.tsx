"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Linkedin, Twitter, Mail, ArrowUp } from "lucide-react";
import { getResponsiveSpacing } from "@/lib/responsive";

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
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main Footer Component
───────────────────────────────────────────── */
export default function Footer() {
  const [buttonHovered, setButtonHovered] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        position: "relative",
        background: "var(--background)",
        color: "var(--text-primary)",
        paddingTop: getResponsiveSpacing(64, 96, 120),
        fontFamily: "'DM Sans', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* ── Top Border Glow ────────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, var(--glass-border) 20%, color-mix(in srgb, var(--brand-green) 40%, transparent) 50%, var(--glass-border) 80%, transparent)",
        }}
      />

      {/* ── Background Depth Orb ───────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "500px",
          background: "radial-gradient(ellipse at bottom, color-mix(in srgb, var(--brand-green) 8%, transparent) 0%, transparent 60%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="mx-auto max-w-[1320px] px-6 relative z-10 w-full">
        
        {/* ── Top Half: Grid ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 md:pb-24 border-b border-[rgba(255,255,255,0.05)]">
          
          {/* Brand Col */}
          <Reveal delay={0.05} className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="inline-block w-fit" aria-label="CODO Home">
              <span style={{ fontSize: "2.2rem", fontWeight: 900, letterSpacing: "-0.05em", color: "var(--text-primary)" }}>
                CODO
              </span>
            </Link>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.6, fontSize: "0.95rem", maxWidth: "300px" }}>
              A collective of elite engineers, designers, and strategists building AI-powered digital products that scale.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                 className="text-[var(--text-secondary)] hover:text-white transition-colors p-2.5 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] hover:border-[var(--brand-green)] hover:bg-[rgba(0,135,100,0.1)] hover:-translate-y-1 transform duration-300">
                <Linkedin size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                 className="text-[var(--text-secondary)] hover:text-white transition-colors p-2.5 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] hover:border-[var(--brand-green)] hover:bg-[rgba(0,135,100,0.1)] hover:-translate-y-1 transform duration-300">
                <Twitter size={18} />
              </a>
            </div>
          </Reveal>

          {/* Links: Agency Services */}
          <Reveal delay={0.15} className="lg:col-span-2">
            <h4 style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--text-primary)", fontWeight: 800, marginBottom: "1.75rem" }}>
              Agency
            </h4>
            <ul className="flex flex-col gap-3.5">
              {[
                { label: "Web Development", path: "/#services" },
                { label: "Software Eng", path: "/#services" },
                { label: "Mobile Apps", path: "/#services" },
                { label: "AI Solutions", path: "/#services" },
                { label: "Our Portfolio", path: "/#portfolio" },
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.path} className="group inline-flex items-center gap-1.5 text-[0.95rem] text-[var(--text-secondary)] hover:text-white hover:translate-x-1 transition-all duration-300">
                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 inline-block text-[var(--brand-green)]">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Links: Ecosystem */}
          <Reveal delay={0.25} className="lg:col-span-2">
            <h4 style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--text-primary)", fontWeight: 800, marginBottom: "1.75rem" }}>
              Ecosystem
            </h4>
            <ul className="flex flex-col gap-3.5">
              {[
                { label: "CODO Academy", path: "https://www.codoacademy.com/", external: true },
                { label: "Career Info", path: "https://www.codoacademy.com/" },
                { label: "Mentorship", path: "https://www.codoacademy.com/" },
              ].map((link, i) => (
                <li key={i}>
                  {link.external ? (
                    <a href={link.path} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-[0.95rem] text-[var(--text-secondary)] hover:text-white hover:translate-x-1 transition-all duration-300">
                      {link.label}
                      <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[var(--brand-green)]" />
                    </a>
                  ) : (
                    <Link href={link.path} className="group inline-flex items-center gap-1.5 text-[0.95rem] text-[var(--text-secondary)] hover:text-white hover:translate-x-1 transition-all duration-300">
                      <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 inline-block text-[var(--brand-green)]">→</span>
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Contact Col */}
          <Reveal delay={0.35} className="lg:col-span-4">
            <h4 style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--text-primary)", fontWeight: 800, marginBottom: "1.75rem" }}>
              Get in Touch
            </h4>
            <div className="flex flex-col gap-5">
              <a href="mailto:hello@codo.ai" className="group flex items-center gap-3 text-[1.15rem] font-medium text-white hover:text-[var(--brand-green)] transition-colors w-fit">
                <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] group-hover:border-[var(--brand-green)] group-hover:bg-[rgba(0,135,100,0.1)] transition-colors">
                  <Mail size={18} className="text-[var(--text-secondary)] group-hover:text-[var(--brand-green)] transition-colors" />
                </div>
                hello@codo.ai
              </a>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                Kozhikode, Kerala
                <br />India
              </p>
              
              {/* Start a Conversation Button */}
              <Link href="/contact" className="mt-2 inline-block w-fit">
                <div
                  onMouseEnter={() => setButtonHovered(true)}
                  onMouseLeave={() => setButtonHovered(false)}
                  className="cursor-pointer inline-flex items-center justify-center"
                  style={{
                    background: buttonHovered ? "var(--text-primary)" : "var(--brand-green)",
                    color: buttonHovered ? "var(--background)" : "white",
                    padding: "0.9rem 2rem",
                    borderRadius: "999px",
                    fontWeight: 800,
                    fontSize: "0.85rem",
                    letterSpacing: "0.05em",
                    boxShadow: buttonHovered 
                      ? "0 10px 30px rgba(255,255,255,0.1)" 
                      : "0 8px 25px rgba(0, 135, 100, 0.25)",
                    transform: buttonHovered ? "translateY(-2px)" : "translateY(0)",
                    transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  Start a Conversation
                </div>
              </Link>
            </div>
          </Reveal>
        </div>

        {/* ── Bottom Bar ────────────────────────────────────────────────── */}
        <Reveal delay={0.45}>
          <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", fontWeight: 500 }}>
              © {currentYear} CODO AI Innovations. All rights reserved.
            </p>

            <div className="flex items-center gap-8">
              <Link href="/" className="text-[0.85rem] font-medium text-[var(--text-secondary)] hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/" className="text-[0.85rem] font-medium text-[var(--text-secondary)] hover:text-white transition-colors">
                Terms of Service
              </Link>

              {/* Back to top button */}
              <button
                onClick={scrollToTop}
                aria-label="Scroll back to top"
                className="ml-2 p-3 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white hover:bg-[rgba(0,135,100,0.1)] hover:border-[var(--brand-green)] hover:text-[var(--brand-green)] hover:-translate-y-1 transition-all duration-300"
              >
                <ArrowUp size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </Reveal>

        {/* ── Gigantic Background Text (Optional style choice) ──────────── */}
        <Reveal delay={0.55}>
          <div className="text-center w-full overflow-hidden flex justify-center pb-8 pt-4">
              <span style={{
                  fontSize: "clamp(4rem, 16vw, 20rem)",
                  fontWeight: 900,
                  color: "rgba(255,255,255,0.015)",
                  lineHeight: 0.8,
                  letterSpacing: "-0.05em",
                  pointerEvents: "none",
                  userSelect: "none"
              }}>
                  CODO
              </span>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
