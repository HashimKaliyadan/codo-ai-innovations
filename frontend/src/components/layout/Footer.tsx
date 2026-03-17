"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Linkedin, Twitter, Mail, ArrowUp } from "lucide-react";
import { getResponsiveFont, getResponsiveSpacing } from "@/lib/responsive";

export default function Footer() {
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
        borderTop: "1px solid var(--glass-border)",
        overflow: "hidden",
      }}
    >
      {/* ── Background Detail ─────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          height: "400px",
          background: "radial-gradient(ellipse at bottom, rgba(0, 135, 100, 0.05) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ── Top Half: Grid ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 md:pb-24 border-b border-[rgba(255,255,255,0.05)]">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="inline-block" aria-label="CODO Home">
              <span style={{ fontSize: "2rem", fontWeight: 900, letterSpacing: "-0.05em", color: "var(--text-primary)" }}>
                CODO
              </span>
            </Link>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.6, fontSize: "0.95rem", maxWidth: "300px" }}>
              A collective of elite engineers, designers, and strategists building AI-powered digital products that scale.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-white transition-colors p-2 rounded-full border border-[rgba(255,255,255,0.1)] hover:border-[var(--brand-green)] hover:bg-[rgba(0,135,100,0.1)]">
                <Linkedin size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-white transition-colors p-2 rounded-full border border-[rgba(255,255,255,0.1)] hover:border-[var(--brand-green)] hover:bg-[rgba(0,135,100,0.1)]">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Links: Agency Services */}
          <div className="lg:col-span-2">
            <h4 style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--text-primary)", fontWeight: 700, marginBottom: "1.5rem" }}>
              Agency
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Web Development", path: "/#services" },
                { label: "Software Eng", path: "/#services" },
                { label: "Mobile Apps", path: "/#services" },
                { label: "AI Solutions", path: "/#services" },
                { label: "Our Portfolio", path: "/#portfolio" },
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.path} className="group inline-flex items-center gap-1 text-[0.95rem] text-[var(--text-secondary)] hover:text-white hover:translate-x-1 transition-all">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links: Ecosystem */}
          <div className="lg:col-span-2">
            <h4 style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--text-primary)", fontWeight: 700, marginBottom: "1.5rem" }}>
              Ecosystem
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "CODO Academy", path: "https://www.codoacademy.com/", external: true },
                { label: "Career & Internships", path: "https://www.codoacademy.com/" },
                { label: "Mentorship", path: "https://www.codoacademy.com/" },
              ].map((link, i) => (
                <li key={i}>
                  {link.external ? (
                    <a href={link.path} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 text-[0.95rem] text-[var(--text-secondary)] hover:text-white hover:translate-x-1 transition-all">
                      {link.label}
                      <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-green" />
                    </a>
                  ) : (
                    <Link href={link.path} className="group inline-flex items-center gap-1 text-[0.95rem] text-[var(--text-secondary)] hover:text-white hover:translate-x-1 transition-all">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Col */}
          <div className="lg:col-span-4">
            <h4 style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--text-primary)", fontWeight: 700, marginBottom: "1.5rem" }}>
              Get in Touch
            </h4>
            <div className="flex flex-col gap-4">
              <a href="mailto:hello@codo.ai" className="group flex items-center gap-3 text-[1.1rem] md:text-[1.2rem] font-medium text-white hover:text-[var(--brand-green)] transition-colors">
                <Mail size={20} className="text-[var(--text-secondary)] group-hover:text-[var(--brand-green)] transition-colors" />
                hello@codo.ai
              </a>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6, marginTop: "0.5rem" }}>
                Kozhikode, Kerala
                <br />India
              </p>
              
              <Link href="/contact" className="mt-4">
                <button
                  className="bg-white/5 hover:bg-[var(--brand-green)] text-white font-semibold py-3 px-6 rounded-full border border-white/10 hover:border-[var(--brand-green)] transition-all duration-300 w-fit text-sm tracking-wide"
                >
                  Start a Conversation
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ────────────────────────────────────────────────── */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
            © {currentYear} CODO AI Innovations. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link href="/" className="text-[0.85rem] text-[var(--text-secondary)] hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="text-[0.85rem] text-[var(--text-secondary)] hover:text-white transition-colors">
              Terms of Service
            </Link>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="ml-4 p-2 md:p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-[var(--brand-green)] hover:border-[var(--brand-green)] transition-all duration-300 group"
            >
              <ArrowUp size={18} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* ── Gigantic Background Text (Optional style choice) ──────────── */}
        <div className="text-center w-full overflow-hidden flex justify-center pb-8 pt-4">
            <span style={{
                fontSize: "clamp(4rem, 15vw, 18rem)",
                fontWeight: 900,
                color: "rgba(255,255,255,0.02)",
                lineHeight: 0.8,
                letterSpacing: "-0.05em",
                pointerEvents: "none",
                userSelect: "none"
            }}>
                CODO
            </span>
        </div>
      </div>
    </footer>
  );
}
