

"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface ArmData {
  id: "academy" | "agency";
  eyebrow: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  cta: string;
  ctaSecondary?: string;
  icon: React.ReactNode;
  accentBg: string;
  accentBorder: string;
  slideFrom: "left" | "right";
}

function AcademyIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 4L2 11l14 7 14-7-14-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M6 14v7c0 3.314 4.477 6 10 6s10-2.686 10-6v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M28 11v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function AgencyIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="26" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 11h26" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="7.5" cy="8.5" r="1" fill="currentColor" />
      <circle cx="11.5" cy="8.5" r="1" fill="currentColor" />
      <circle cx="15.5" cy="8.5" r="1" fill="currentColor" />
      <path d="M9 17l3 3 7-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const arms: ArmData[] = [
  {
    id: "academy",
    eyebrow: "Arm 01",
    name: "CODO Academy",
    tagline: "Train the Future.",
    description:
      "CODO Academy is our education and skill-development arm, built for the next generation of technology professionals. We deliver hands-on training programs, industry-led internships, and placement support — bridging the gap between campus learning and real-world engineering.",
    tags: ["Full-Stack Dev", "AI & ML", "UI/UX Design", "Internships", "Placement Support"],
    cta: "Visit Academy Website",
    icon: <AcademyIcon />,
    accentBg: "rgba(0, 32, 63, 0.35)",
    accentBorder: "rgba(0, 32, 63, 0.6)",
    slideFrom: "left",
  },
  {
    id: "agency",
    eyebrow: "Arm 02",
    name: "CODO Agency",
    tagline: "Build the Future.",
    description:
      "CODO Agency is our product and service delivery arm, focused on building custom digital solutions for businesses worldwide. From intelligent web platforms and mobile applications to enterprise software and AI-powered automation — we ship products that perform.",
    tags: ["Web Development", "Mobile Apps", "Custom Software", "AI Solutions", "UI/UX"],
    cta: "View Portfolio",
    icon: <AgencyIcon />,
    accentBg: "rgba(0, 135, 100, 0.12)",
    accentBorder: "rgba(0, 135, 100, 0.35)",
    slideFrom: "right",
  },
];

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}

function ArmCard({ arm, inView }: { arm: ArmData; inView: boolean }) {
  const [loading, setLoading] = useState(false);
  const isAcademy = arm.id === "academy";

  const handleCta = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: arm.slideFrom === "left" ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: isAcademy ? 0 : 0.15 }}
      className="group relative flex flex-col h-full"
      style={{
        padding: "clamp(2.5rem, 5vw, 4rem)",
        background: arm.accentBg,
        borderRadius: "24px",
        border: `1px solid ${arm.accentBorder}`,
        backdropFilter: "blur(16px)",
        overflow: "hidden",
        transition: "border-color 0.3s ease, background 0.3s ease",
        minHeight: "540px",
      }}
    >

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: isAcademy ? "-80px" : "auto",
          bottom: isAcademy ? "auto" : "-80px",
          right: "-80px",
          left: isAcademy ? "auto" : "-80px",
          width: "260px",
          height: "260px",
          borderRadius: "50%",
          background: isAcademy
            ? "radial-gradient(circle, rgba(0,32,63,0.4) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(0,135,100,0.2) 0%, transparent 70%)",
          pointerEvents: "none",
          transition: "opacity 0.3s ease",
        }}
      />

      <div
        style={{
          fontSize: "0.6rem",
          fontWeight: 700,
          letterSpacing: "0.35em",
          color: "var(--brand-green)",
          textTransform: "uppercase",
          marginBottom: "1.5rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {arm.eyebrow}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "14px",
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--brand-green)",
            flexShrink: 0,
            transition: "background 0.3s ease, border-color 0.3s ease",
          }}
        >
          {arm.icon}
        </div>

        <div>
          <div
            style={{
              fontSize: "clamp(1.4rem, 2.5vw, 1.75rem)",
              fontWeight: 900,
              color: "var(--text-primary)",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          >
            {arm.name}
          </div>
          <div
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "var(--brand-green)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginTop: "0.2rem",
            }}
          >
            {arm.tagline}
          </div>
        </div>
      </div>

      <p
        style={{
          fontSize: "clamp(0.9rem, 1.3vw, 1rem)",
          lineHeight: 1.85,
          color: "var(--text-secondary)",
          fontWeight: 400,
          marginBottom: "2rem",
          maxWidth: "60ch",
          position: "relative",
          zIndex: 1,
          flex: 1,
        }}
      >
        {arm.description}
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          marginBottom: "2.5rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {arm.tags.map((tag, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              delay: (isAcademy ? 0.4 : 0.55) + i * 0.07,
              duration: 0.35,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{
              display: "inline-flex",
              padding: "0.35rem 0.9rem",
              borderRadius: "8px",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              border: "1px solid var(--glass-border)",
              color: "var(--text-secondary)",
              background: "var(--glass-bg)",
            }}
          >
            {tag}
          </motion.span>
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <button
          onClick={handleCta}
          disabled={loading}
          aria-label={arm.cta}
          className={`
            transition-all duration-300
            min-h-[44px] min-w-[44px]
            flex items-center justify-center gap-2
            focus-visible:outline focus-visible:outline-2
            focus-visible:outline-offset-3
            focus-visible:outline-[#01b667]
            ${loading ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.03]"}
          `}
          style={{
            width: "100%",
            padding: "0.95rem 2rem",
            borderRadius: "14px",
            background: isAcademy ? "var(--glass-bg)" : "var(--cta-bg)",
            border: `1px solid ${isAcademy ? "var(--glass-border)" : "var(--cta-border)"}`,
            color: isAcademy ? "var(--text-primary)" : "var(--text-primary)",
            fontWeight: 700,
            fontSize: "0.8rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? <Spinner /> : (
            <>
              {arm.cta}
              <span style={{ opacity: 0.6 }}>{isAcademy ? "↗" : "→"}</span>
            </>
          )}
        </button>
      </div>

    </motion.div>
  );
}

export default function EcosystemSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={sectionRef}
      aria-label="CODO AI Innovations Ecosystem"
      style={{
        minHeight: "100vh",
        position: "relative",
        zIndex: 1,
        overflow: "hidden",
        padding: "clamp(5rem, 10vw, 9rem) clamp(1.5rem, 6vw, 6rem)",
        fontFamily: "'DM Sans', sans-serif",

        background: `
          linear-gradient(to bottom, transparent 0%, var(--bg-primary) 6%, var(--bg-primary) 94%, transparent 100%)
        `,
      }}
    >

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(0,135,100,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10">

        <div style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}>

          <motion.div
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
            <div style={{ height: "1px", width: "40px", background: "rgba(1,182,103,0.5)" }} />
            <span
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.3em",
                color: "var(--brand-green)",
                textTransform: "uppercase",
              }}
            >
              02 — Our Ecosystem
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            style={{
              fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
              maxWidth: "20ch",
            }}
          >
            One Company.{" "}
            <span style={{ color: "var(--brand-green)" }}>Two Powerful Arms.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            style={{
              fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)",
              lineHeight: 1.8,
              color: "var(--text-secondary)",
              fontWeight: 400,
              maxWidth: "64ch",
              marginTop: "1.25rem",
            }}
          >
            CODO AI Innovations operates through two specialized verticals —
            each with a distinct mission, united by the same commitment
            to innovation, quality, and impact.
          </motion.p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            gap: "0",
            alignItems: "stretch",
          }}
          className="flex flex-col md:grid"
        >

          <ArmCard arm={arms[0]} inView={inView} />

          <div
            aria-hidden="true"
            className="hidden md:flex"
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 clamp(1rem, 2.5vw, 2rem)",
              gap: "0.75rem",
              position: "relative",
            }}
          >
            
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
              style={{
                width: "2px",
                height: "100%",
                minHeight: "300px",
                background: "linear-gradient(to bottom, transparent, var(--brand-green), transparent)",
                transformOrigin: "top",
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.7 }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "var(--bg-primary)",
                border: "2px solid var(--brand-green)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "var(--brand-green)",
                }}
              />
            </motion.div>
          </div>

          <ArmCard arm={arms[1]} inView={inView} />

        </div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.9 }}
          style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, var(--brand-green), transparent)",
            marginTop: "3rem",
            transformOrigin: "center",
          }}
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 1.1 }}
          style={{
            textAlign: "center",
            marginTop: "2rem",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.3em",
            color: "var(--text-secondary)",
            textTransform: "uppercase",
            opacity: 0.5,
          }}
        >
          Education × Innovation × Technology
        </motion.div>

      </div>
    </section>
  );
}
