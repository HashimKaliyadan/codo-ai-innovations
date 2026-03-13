"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { getResponsiveFont, getResponsiveSpacing } from "@/utils/responsive";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MEDIA_QUERIES } from "@/constants/breakpoints";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Service {
  index: string;
  name: string;
  shortName: string;
  description: string;
  capabilities: string[];
  badge?: string;
}

// ── Services data ─────────────────────────────────────────────────────────────
const services: Service[] = [
  {
    index: "01",
    name: "Custom Website Development",
    shortName: "Web Development",
    description:
      "We craft high-performance websites that go beyond aesthetics — built on modern frameworks, optimized for speed, and engineered to convert. From marketing sites to complex web applications, every pixel is intentional.",
    capabilities: [],
    badge: "Most Requested",
  },
  {
    index: "02",
    name: "Software Development",
    shortName: "Software",
    description:
      "End-to-end software engineering for businesses that need scalable, maintainable, and secure systems. We design architecture, write clean code, and deliver production-ready products that grow with your business.",
    capabilities: [],
  },
  {
    index: "03",
    name: "Mobile Application Development",
    shortName: "Mobile Apps",
    description:
      "Native-quality mobile experiences built for iOS and Android. We use React Native and modern cross-platform tooling to ship apps that feel fast, look premium, and work offline-first.",
    capabilities: [],
  },
  {
    index: "04",
    name: "AI-Based Solutions",
    shortName: "AI Solutions",
    description:
      "We integrate AI into your workflows, products, and customer experiences. From LLM-powered interfaces and intelligent automation to predictive analytics — we turn AI from a buzzword into a business advantage.",
    capabilities: [],
    badge: "New",
  },
];

// ── Arrow icon ────────────────────────────────────────────────────────────────
function ArrowIcon({ rotated }: { rotated: boolean }) {
  return (
    <motion.svg
      animate={{ rotate: rotated ? 45 : 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="no-transition"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M4 10h12M10 4l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

// ── Service Row ───────────────────────────────────────────────────────────────
function ServiceRow({
  service,
  rowIndex,
  inView,
}: {
  service: Service;
  rowIndex: number;
  inView: boolean;
}) {
  const isMobile = useMediaQuery(MEDIA_QUERIES.mobile);
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const isOpen = hovered || expanded;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        ease: [0.25, 0.1, 0.25, 1],
        delay: rowIndex * 0.12,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="no-transition"
      style={{ position: "relative" }}
    >
      {/* ── Top divider line ── */}
      <div
        style={{
          height: "1px",
          background: isOpen ? "var(--brand-green)" : "var(--glass-border)",
          transition: "background 0.4s ease",
        }}
      />

      {/* ── Row trigger ── */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        aria-label={`${service.name} — click to expand details`}
        onClick={() => setExpanded(!expanded)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setExpanded(!expanded);
          }
        }}
        className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008764]"
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "2rem 1fr auto" : "4rem 1fr auto",
          alignItems: "center",
          gap: getResponsiveSpacing(16, 24, 40),
          padding: `${getResponsiveSpacing(20, 24, 28)} 0`,
          cursor: "pointer",
          userSelect: "none",
          transition: "gap 0.3s ease",
        }}
      >
        {/* Index number */}
        <span
          style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            color: isOpen ? "var(--brand-green)" : "var(--text-secondary)",
            transition: "color 0.3s ease",
            fontVariantNumeric: "tabular-nums",
            opacity: isOpen ? 1 : 0.5,
          }}
        >
          {service.index}
        </span>

        {/* Service name */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", minWidth: 0 }}>
          <span
            style={{
              fontSize: getResponsiveFont(17.5, 32),
              fontWeight: 900,
              letterSpacing: "-0.01em",
              color: isOpen ? "var(--text-primary)" : "var(--text-secondary)",
              transition: "color 0.3s ease, transform 0.3s ease",
              transform: isOpen ? (isMobile ? "translateX(4px)" : "translateX(8px)") : "translateX(0)",
              display: "block",
              lineHeight: 1.1,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {isMobile ? service.shortName : service.name}
          </span>

          {/* Badge */}
          {service.badge && (
            <span
              style={{
                display: "inline-flex",
                padding: "0.2rem 0.6rem",
                borderRadius: "6px",
                fontSize: "0.55rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                background: "color-mix(in srgb, var(--brand-green) 15%, transparent)",
                border: "1px solid color-mix(in srgb, var(--brand-green) 30%, transparent)",
                color: "var(--brand-green)",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {service.badge}
            </span>
          )}
        </div>

        {/* Arrow icon */}
        <div
          style={{
            color: isOpen ? "var(--brand-green)" : "var(--text-secondary)",
            transition: "color 0.3s ease",
            opacity: isOpen ? 1 : 0.4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "44px",
            minHeight: "44px",
          }}
        >
          <ArrowIcon rotated={isOpen} />
        </div>
      </div>

      {/* ── Expanded detail panel ── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="no-transition"
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "2rem 1fr" : "4rem 1fr",
                gap: getResponsiveSpacing(16, 24, 40),
                paddingBottom: getResponsiveSpacing(24, 32, 40),
              }}
            >
              {/* Empty first column — aligns with index */}
              <div />

              {/* Content */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "clamp(1.5rem, 4vw, 4rem)",
                  alignItems: "start",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: getResponsiveFont(14.5, 16.5),
                      lineHeight: 1.85,
                      color: "var(--text-secondary)",
                      fontWeight: 400,
                      maxWidth: "80ch",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function ServicesSection() {
  const isMobile = useMediaQuery(MEDIA_QUERIES.mobile);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-8% 0px" });

  return (
    <section
      ref={sectionRef}
      aria-label="CODO Agency Services"
      style={{
        position: "relative",
        zIndex: 1,
        overflow: "hidden",
        padding: `${getResponsiveSpacing(80, 100, 144)} ${getResponsiveSpacing(24, 40, 60)}`,
        fontFamily: "'DM Sans', sans-serif",
        background:
          "linear-gradient(to bottom, transparent 0%, var(--bg-primary) 6%, var(--bg-primary) 94%, transparent 100%)",
      }}
    >
      {/* ── LARGE BACKGROUND NUMBER ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          right: "-1rem",
          transform: "translateY(-50%)",
          fontSize: getResponsiveFont(192, 416),
          fontWeight: 900,
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "1px var(--glass-border)",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
          letterSpacing: "-0.05em",
        }}
      >
        03
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
          <motion.div
            className="no-transition"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.3em",
                color: "var(--brand-green)",
                textTransform: "uppercase",
              }}
            >
              Services
            </span>
          </motion.div>

          <motion.h2
            className="no-transition"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            style={{
              fontSize: getResponsiveFont(35, 60),
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
            }}
          >
            What We <span style={{ color: "var(--brand-green)" }}>Build</span> for You.
          </motion.h2>
        </div>

        <div>
          {services.map((service, i) => (
            <ServiceRow
              key={service.index}
              service={service}
              rowIndex={i}
              inView={inView}
            />
          ))}
          <div style={{ height: "1px", background: "var(--glass-border)" }} />
        </div>
      </div>
    </section>
  );
}
