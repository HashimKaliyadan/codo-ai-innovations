"use client";

import React, { useState, useCallback, useEffect } from "react";
import { TransitionLink as Link } from "@/components/transition/TransitionLink";
import { useTransitionParams } from "@/components/transition/TransitionProvider";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MEDIA_QUERIES } from "@/lib/constants";
import { getResponsiveFont, getResponsiveSpacing } from "@/lib/responsive";

const menuLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
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

// ─── Mobile bottom-sheet drawer menu ──────────────────────────────────────────
const NAV_ICONS: Record<string, React.JSX.Element> = {
  "/": (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M2 7L8 2L14 7V14H10V10H6V14H2V7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  "/about": (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 14C2 11.2 4.7 9 8 9C11.3 9 14 11.2 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  "/services": (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="2" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="9" y="2" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="2" y="9" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="9" y="9" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  "/portfolio": (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="4" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5 4V3C5 2.4 5.4 2 6 2H10C10.6 2 11 2.4 11 3V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  "/blog": (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M2 2H14V12H2V2Z" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M5 6H11M5 9H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  "/careers": (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M2 14L5.5 8L8 11L10.5 6.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "/contact": (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M2 3H14V11H2V3Z" rx="1" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M2 3L8 8.5L14 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

function MobileMenu({
  isOpen,
  onClose,
  pathname,
}: {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  isDark: boolean;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              background: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}
          />

          {/* Bottom sheet */}
          <motion.div
            key="mobile-sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 101,
              borderTopLeftRadius: "24px",
              borderTopRightRadius: "24px",
              background: "rgba(12, 12, 14, 0.96)",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderBottom: "none",
              paddingBottom: "env(safe-area-inset-bottom, 1.5rem)",
            }}
          >
            {/* Drag handle */}
            <div style={{ display: "flex", justifyContent: "center", padding: "1rem 0 0.5rem" }}>
              <div style={{ width: "32px", height: "4px", borderRadius: "99px", background: "rgba(255,255,255,0.12)" }} />
            </div>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1.5rem 1rem" }}>
              <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>
                Navigation
              </span>
              <button
                onClick={onClose}
                aria-label="Close menu"
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav style={{ padding: "0 1rem 1.25rem" }}>
              {menuLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25, ease: "easeOut" }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.8rem 1rem",
                        borderRadius: "12px",
                        marginBottom: "2px",
                        color: isActive ? "#fff" : "rgba(255,255,255,0.45)",
                        background: isActive ? "rgba(255,255,255,0.06)" : "transparent",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        letterSpacing: "-0.01em",
                        transition: "all 0.2s",
                        textDecoration: "none",
                      }}
                    >
                      <span style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: isActive ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.05)",
                        color: isActive ? "var(--brand-green)" : "rgba(255,255,255,0.35)",
                        flexShrink: 0,
                        transition: "all 0.2s",
                      }}>
                        {NAV_ICONS[link.href] ?? null}
                      </span>
                      <span style={{ flex: 1 }}>{link.label}</span>
                      {isActive && (
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--brand-green)", flexShrink: 0 }} />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom CTA */}
            <div style={{ padding: "0 1rem 1.25rem" }}>
              <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "1rem" }} />
              <Link
                href="/contact"
                onClick={onClose}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  height: "3rem",
                  borderRadius: "12px",
                  background: "var(--brand-green)",
                  color: "#000",
                  fontWeight: 800,
                  fontSize: "0.8rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                Book a Call
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 10L10 2M10 2H5M10 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </motion.div>
        </>
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
      style={{ background: "rgba(255, 255, 255, 0.1)" }}
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
                  background: isActive ? "rgba(255, 255, 255, 0.15)" : "transparent",
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
  const pathname = usePathname();
  const isDark = true; // Project is now dark mode only
  const isMobile = useMediaQuery(MEDIA_QUERIES.mobile);
  const { navigateTo } = useTransitionParams();

  const handleActionClick = useCallback(() => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    // Start the full page transition wipe
    navigateTo("/contact");

    setTimeout(() => {
      setIsSubmitting(false);
    }, 800);
  }, [isSubmitting, navigateTo]);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    // Only lock scroll on mobile/responsive views as requested. 
    // This prevents the "layout jump" on desktop where the scrollbar disappears.
    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, isMobile]);

  return (
    <>
      {/* Invisible overlay for desktop to close menu on outside click */}
      {isOpen && !isMobile && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={closeMenu} 
          aria-hidden="true"
        />
      )}

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
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <Image
                src="/logos/logo-white.svg"
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


              {/* Book a Call — hidden on mobile (in mobile menu instead) */}
              {!isMobile && (
                <button
                  onClick={handleActionClick}
                  disabled={isSubmitting}
                  className={`h-11 hidden xs:flex items-center justify-center text-[var(--text-primary)] rounded-2xl transition-all shadow-lg backdrop-blur-2xl min-w-[160px] sm:min-w-[180px] ${isSubmitting ? "opacity-70 cursor-not-allowed" : "cursor-pointer hover:opacity-90"
                    }`}
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
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
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
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
