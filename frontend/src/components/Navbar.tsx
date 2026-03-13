"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MEDIA_QUERIES } from "@/constants/breakpoints";
import { getResponsiveFont, getResponsiveSpacing } from "@/utils/responsive";

const menuLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

// Animated dots loader for the CTA button
const WaveLoader = () => (
  <div className="flex gap-1 justify-center items-center h-full">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="w-1.5 h-1.5 bg-[var(--brand-green)] rounded-full"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
      />
    ))}
  </div>
);

// ─── Mobile full-screen overlay menu ──────────────────────────────────────────
function MobileMenu({
  isOpen,
  onClose,
  pathname,
  isDark,
}: {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  isDark: boolean;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            padding: "1.5rem",
            background: "var(--glass-bg)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          {/* Top bar: logo + close */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem" }}>
            <Image
              src={isDark ? "/logo-white.png" : "/logo.png"}
              alt="CODO"
              width={100}
              height={28}
              className="h-8 w-auto object-contain"
            />
            <button
              onClick={onClose}
              className="w-11 h-11 flex items-center justify-center rounded-2xl"
              style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)" }}
              aria-label="Close menu"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <nav style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "0.25rem" }}>
            {menuLinks.map((link, i) => {
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3, ease: "easeOut" }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1rem 1.25rem",
                      borderRadius: "1rem",
                      fontSize: "1.5rem",
                      fontWeight: 800,
                      letterSpacing: "-0.01em",
                      textTransform: "uppercase",
                      color: isActive ? "var(--text-primary)" : "color-mix(in srgb, var(--text-primary) 45%, transparent)",
                      background: isActive ? "color-mix(in srgb, var(--glass-bg) 60%, transparent)" : "transparent",
                      transition: "color 0.2s",
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--brand-green)", flexShrink: 0 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Bottom CTA */}
          <Link
            href="/contact"
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "3.25rem",
              borderRadius: "1rem",
              background: "var(--brand-green)",
              color: "#fff",
              fontWeight: 800,
              fontSize: "0.875rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Book a Call
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Desktop dropdown menu ─────────────────────────────────────────────────────
function DesktopMenu({
  isOpen,
  pathname,
  onClose,
}: {
  isOpen: boolean;
  pathname: string;
  onClose: () => void;
}) {
  return (
    <div
      className={`
        w-full sm:max-w-sm ml-auto backdrop-blur-2xl rounded-2xl shadow-2xl overflow-hidden origin-top-right
        transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]
        ${isOpen
          ? "opacity-100 scale-100 max-h-[500px] p-6 sm:p-8 border border-[var(--glass-border)] pointer-events-auto"
          : "opacity-0 scale-95 max-h-0 p-0 border-none pointer-events-none"
        }
      `}
      style={{ background: "var(--glass-bg)" }}
    >
      <ul className="flex flex-col gap-0.5 sm:gap-1">
        {menuLinks.map((link, index) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className="flex items-center justify-between px-4 py-4 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 hover:opacity-80"
                style={{
                  fontSize: getResponsiveFont(16, 18),
                  transitionDelay: isOpen ? `${index * 60}ms` : "0ms",
                  color: isActive ? "var(--text-primary)" : "color-mix(in srgb, var(--text-primary) 60%, transparent)",
                  background: isActive ? "var(--glass-bg)" : "transparent",
                }}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full" style={{ background: "var(--brand-green)" }} />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ─── Main Navbar ───────────────────────────────────────────────────────────────
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ripple, setRipple] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const isMobile = useMediaQuery(MEDIA_QUERIES.mobile);

  // FIX: wrapped in useCallback to avoid re-creation every render
  const handleActionClick = useCallback(() => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    // TODO: replace with real async booking call
    setTimeout(() => setIsSubmitting(false), 2000);
  }, [isSubmitting]);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  return (
    <>
      {/* Mobile full-screen overlay */}
      {isMobile && (
        <MobileMenu isOpen={isOpen} onClose={closeMenu} pathname={pathname} isDark={isDark} />
      )}

      <nav
        className="fixed top-0 left-0 w-full z-50 pointer-events-none"
        style={{
          padding: `${getResponsiveSpacing(12, 16, 20)} ${getResponsiveSpacing(24, 40, 60)}`,
        }}
      >
        <div className="flex justify-between items-start w-full max-w-[1400px] mx-auto">

          {/* Logo pill */}
          <div className="shrink-0 pointer-events-auto flex items-center">
            <Link
              href="/"
              className="flex items-center justify-center h-11 px-4 sm:px-6 rounded-2xl backdrop-blur-2xl shadow-lg hover:opacity-80 transition-opacity"
              style={{
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
              }}
            >
              <Image
                src={isDark ? "/logo-white.png" : "/logo.png"}
                alt="CODO Academy"
                width={120}
                height={32}
                className="h-8 sm:h-10 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Right side controls */}
          <div className="flex flex-col items-end pointer-events-auto gap-3 sm:gap-4">
            <div className="flex items-center gap-1.5 sm:gap-4">

              {/* Theme toggle */}
              <button
                onClick={() => {
                  toggleTheme();
                  setRipple(true);
                  setTimeout(() => setRipple(false), 440);
                }}
                className="w-11 h-11 flex items-center justify-center rounded-2xl transition-all shadow-lg shrink-0 cursor-pointer relative overflow-hidden hover:opacity-90 backdrop-blur-2xl"
                style={{
                  background: "var(--glass-bg)",
                  border: "1px solid var(--glass-border)",
                }}
                aria-label="Toggle theme"
              >
                {ripple && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute w-full h-full rounded-full z-0"
                    style={{ background: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)" }}
                  />
                )}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.35 }}
                  >
                    {isDark ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--text-primary)" }}>
                        <circle cx="12" cy="12" r="5" />
                        <line x1="12" y1="1" x2="12" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="23" />
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                        <line x1="1" y1="12" x2="3" y2="12" />
                        <line x1="21" y1="12" x2="23" y2="12" />
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                      </svg>
                    )}
                  </motion.div>
                </AnimatePresence>
              </button>

              {/* Book a Call — hidden on mobile (in mobile menu instead) */}
              {!isMobile && (
                <button
                  onClick={handleActionClick}
                  disabled={isSubmitting}
                  className={`h-11 hidden xs:flex items-center justify-center text-[var(--text-primary)] rounded-2xl transition-all shadow-lg backdrop-blur-2xl min-w-[160px] sm:min-w-[180px] ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : "cursor-pointer hover:opacity-90"
                  }`}
                  style={{
                    background: "var(--glass-bg)",
                    border: "1px solid var(--glass-border)",
                  }}
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <WaveLoader />
                      </motion.div>
                    ) : (
                      <motion.div key="text" className="flex items-center gap-2 sm:gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-widest uppercase whitespace-nowrap">
                          Book a Call
                        </span>
                        <span className="w-1.5 h-1.5 bg-[var(--brand-green)] rounded-full shrink-0" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              )}

              {/* Menu toggle button */}
              <button
                onClick={() => setIsOpen((o) => !o)}
                className="h-11 min-w-[110px] sm:min-w-[140px] flex items-center justify-center gap-2 sm:gap-3 text-[var(--text-primary)] rounded-2xl transition-all shadow-lg group cursor-pointer hover:opacity-90 backdrop-blur-2xl"
                style={{
                  background: "var(--glass-bg)",
                  border: "1px solid var(--glass-border)",
                }}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-widest uppercase w-10 sm:w-12 text-center">
                  {isOpen ? "Close" : "Menu"}
                </span>
                <div className="relative w-5 h-1.5 flex items-center justify-center">
                  <motion.span
                    animate={{
                      x: isOpen ? 0 : -4,
                      backgroundColor: isOpen ? "var(--brand-green)" : "var(--text-primary)",
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-1.5 h-1.5 rounded-full absolute"
                  />
                  <motion.span
                    animate={{
                      x: isOpen ? 0 : 4,
                      backgroundColor: isOpen ? "var(--brand-green)" : "var(--text-primary)",
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-1.5 h-1.5 rounded-full absolute"
                  />
                </div>
              </button>
            </div>

            {/* Desktop dropdown (only shown outside mobile) */}
            {!isMobile && (
              <DesktopMenu isOpen={isOpen} pathname={pathname} onClose={closeMenu} />
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
