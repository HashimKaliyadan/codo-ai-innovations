"use client";

import { useRef, useState } from "react";
import { TransitionLink as Link } from "@/components/transition/TransitionLink";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Mail, ArrowUp, Youtube, Instagram, Facebook, Linkedin, Github } from "lucide-react";
import { getResponsiveSpacing } from "@/lib/responsive";

/* ─────────────────────────────────────────────
   Custom SVGs for remaining icons
───────────────────────────────────────────── */
const XIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const PinterestIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 20l4-9" />
    <path d="M10.7 14c.4.9 2 2.6 3.6 1.5 1.5-1 2.2-4.5-1-6-3.8-1.8-8.8.7-6.8 5.4" />
  </svg>
);

const BehanceIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 7h6a4 4 0 0 1 0 8H4M4 11h6M14 11h6a4 4 0 0 1 0 8h-6M14 7h6" />
  </svg>
);

const WhatsAppIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

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

  const socialLinks = [
    { name: "YouTube", icon: <Youtube size={18} />, href: "https://youtube.com" },
    { name: "Instagram", icon: <Instagram size={18} />, href: "https://instagram.com" },
    { name: "Facebook", icon: <Facebook size={18} />, href: "https://facebook.com" },
    { name: "LinkedIn", icon: <Linkedin size={18} />, href: "https://linkedin.com" },
    { name: "X", icon: <XIcon />, href: "https://x.com" },
    { name: "Pinterest", icon: <PinterestIcon />, href: "https://pinterest.com" },
    { name: "Behance", icon: <BehanceIcon />, href: "https://behance.net" },
    { name: "GitHub", icon: <Github size={18} />, href: "https://github.com" },
    { name: "WhatsApp", icon: <WhatsAppIcon />, href: "https://whatsapp.com" },
  ];

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

      <div className="mx-auto max-w-[1400px] px-6 relative z-10 w-full">

        {/* ── Top Half: Grid ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 md:pb-24 border-b border-[rgba(255,255,255,0.05)]">

          {/* Brand Col */}
          <Reveal delay={0.05} className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="inline-block w-fit" aria-label="CODO Home">
              <span style={{ fontSize: "2.2rem", fontWeight: 900, letterSpacing: "-0.05em", color: "var(--text-primary)" }}>
                CODO
              </span>
            </Link>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.6, fontSize: "0.95rem", maxWidth: "340px" }}>
              A collective of elite engineers, designers, and strategists building AI-powered digital products that scale.
            </p>

            {/* Social Icons Wrapped */}
            <div className="flex flex-wrap items-center gap-2.5 mt-2 max-w-[340px]">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-[var(--text-secondary)] hover:text-white transition-colors p-2.5 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] hover:border-[var(--brand-green)] hover:bg-[rgba(0,135,100,0.1)] hover:-translate-y-1 transform duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </Reveal>

          {/* Links: Agency Services */}
          <Reveal delay={0.15} className="lg:col-span-2 lg:col-start-6">
            <h4 style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--text-primary)", fontWeight: 800, marginBottom: "1.75rem" }}>
              Agency
            </h4>
            <ul className="flex flex-col gap-3.5">
              {[
                { label: "Software Development", path: "/services/software-development" },
                { label: "Website Development", path: "/services/website-development" },
                { label: "IOS & Android Development", path: "/services/ios-android-development" },
                { label: "Logo Branding", path: "/services/logo-branding" },
                { label: "Performance Marketing", path: "/services/performance-marketing" },
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
                { label: "CODO Agency", path: "https://codoai.cloud/", external: true },
                { label: "BugRicer", path: "https://bugricer.com/", external: true },
                { label: "Notify", path: "https://notify.bugricer.com/", external: true },
                { label: "PageNow", path: "https://pagenow.in/", external: true },
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
          <Reveal delay={0.35} className="lg:col-span-2">
            <h4 style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--text-primary)", fontWeight: 800, marginBottom: "1.75rem" }}>
              Get in Touch
            </h4>
            <div className="flex flex-col gap-5">
              <a href="mailto:info@codoai.in" className="group flex items-center gap-3 text-[1.05rem] font-medium text-white hover:text-[var(--brand-green)] transition-colors w-fit">
                <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] group-hover:border-[var(--brand-green)] group-hover:bg-[rgba(0,135,100,0.1)] transition-colors flex shrink-0">
                  <Mail size={16} className="text-[var(--text-secondary)] group-hover:text-[var(--brand-green)] transition-colors" />
                </div>
                info@codoai.in
              </a>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                +91 8848676627<br /><br />
                2nd Floor, Paravath Arcade,<br />
                Varangode, Malappuram,<br />
                Kerala 676519
              </p>
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


      </div>
    </footer>
  );
}
