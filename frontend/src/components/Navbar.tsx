

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

const menuLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  const handleTalkClick = () => {
    if (isTalking) return;
    setIsTalking(true);
    setTimeout(() => {
      
      setIsTalking(false);
    }, 1000);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-4 pointer-events-none" style={{ paddingLeft: 'clamp(1.5rem, 6vw, 6rem)', paddingRight: 'clamp(1.5rem, 6vw, 6rem)' }}>

      <div className="flex justify-between items-center w-full max-w-[1400px] mx-auto">

        <div className="pointer-events-auto shrink-0">
          <Link href="/" className="hover:opacity-80 transition-opacity block w-[100px] sm:w-[120px] md:w-[150px]">
            <Image
              src={isDark ? "/logo-white.png" : "/logo.png"}
              alt="CODO Academy"
              width={150}
              height={50}
              className="w-full h-auto object-contain"
              priority
            />
          </Link>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-4 pointer-events-auto">

          <button
            onClick={toggleTheme}
            className="w-11 h-11 flex items-center justify-center rounded-full transition-all shadow-lg shrink-0 cursor-pointer"
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
            }}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <div className={`transition-transform duration-500 ${isDark ? "rotate-0" : "rotate-180"}`}>
              {isDark ? (
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                   <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                 </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-primary)" }}>
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
            </div>
          </button>

          <button
            onClick={handleTalkClick}
            disabled={isTalking}
            className={`h-11 hidden xs:flex items-center gap-2 sm:gap-3 text-[var(--text-primary)] px-4 sm:px-6 rounded-2xl transition-all shadow-lg ${isTalking ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
            }}
          >
            {isTalking ? (
              <svg className="animate-spin h-4 w-4 text-[var(--brand-green)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-widest uppercase">
                  Let&apos;s Talk
                </span>
                <span className="w-1.5 h-1.5 bg-[var(--brand-green)] rounded-full"></span>
              </>
            )}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="h-11 min-w-[100px] sm:min-w-[130px] flex items-center justify-center gap-2 sm:gap-3 text-[var(--text-primary)] px-4 sm:px-6 rounded-2xl transition-all shadow-lg group cursor-pointer"
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
            }}
          >
            <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-widest uppercase">
              {isOpen ? "Close" : "Menu"}
            </span>
            <div className="flex gap-1">
              <span
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isOpen ? "rotate-45 translate-x-[3px]" : "group-hover:scale-125"
                }`}
                style={{ background: "var(--text-primary)" }}
              ></span>
              <span
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isOpen ? "-rotate-45 -translate-x-[3px]" : "group-hover:scale-125"
                }`}
                style={{ background: "var(--text-primary)" }}
              ></span>
            </div>
          </button>

        </div>
      </div>

      <div
        className={`
          pointer-events-auto mt-3 sm:mt-4 mx-auto max-w-[1400px]
          w-full sm:max-w-sm ml-auto
          backdrop-blur-2xl
          rounded-2xl shadow-2xl
          overflow-hidden
          transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          origin-top-right
          ${isOpen
            ? "opacity-100 scale-100 max-h-[500px] p-6 sm:p-8"
            : "opacity-0 scale-95 max-h-0 p-0 pointer-events-none"
          }
        `}
        style={{
          background: "var(--glass-bg)",
          border: isOpen ? "1px solid var(--glass-border)" : "none",
        }}
      >
        <ul className="flex flex-col gap-0.5 sm:gap-1">
          {menuLinks.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center justify-between
                    px-3 py-3 sm:px-4 sm:py-4 rounded-xl
                    text-base sm:text-lg font-bold uppercase tracking-wider
                    transition-all duration-300
                    cursor-pointer
                    ${isOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                    }
                  `}
                  style={{
                    transitionDelay: isOpen ? `${index * 60}ms` : "0ms",
                    color: isActive ? "var(--text-primary)" : "color-mix(in srgb, var(--text-primary) 60%, transparent)",
                    background: isActive ? "var(--glass-bg)" : "transparent",
                  }}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full" style={{ background: "var(--brand-green)" }}></span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

    </nav>
  );
}
