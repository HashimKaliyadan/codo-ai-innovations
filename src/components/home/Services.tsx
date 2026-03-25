"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

/* ─────────────────────────────────────────────
   Types & Data
───────────────────────────────────────────── */
interface Service {
  id: number;
  index: string;
  name: string;
  description: string;
  accentFrom: string;
  accentTo: string;
  stat: string;
  statLabel: string;
  highlights: string[];
  image: string;
}

const services: Service[] = [
  {
    id: 1,
    index: "01",
    name: "Custom Website Development",
    description:
      "We craft high-performance websites that go beyond aesthetics — built on modern frameworks, optimized for speed, and engineered to convert.",
    accentFrom: "#005a42",
    accentTo: "#003366",
    stat: "98%",
    statLabel: "Lighthouse Score",
    highlights: ["Next.js & React", "SEO-optimised", "Sub-2s Load"],
    image: "/images/services/web_dev_preview.png",
  },
  {
    id: 2,
    index: "02",
    name: "Software Development",
    description:
      "End-to-end software engineering for businesses that need scalable, maintainable, and secure systems. We design, write clean code, and deliver.",
    accentFrom: "#001f3f",
    accentTo: "#1a3c5e",
    stat: "40+",
    statLabel: "Systems Shipped",
    highlights: ["System Architecture", "API Design", "Cloud-native"],
    image: "/images/services/software_dev_preview.png",
  },
  {
    id: 3,
    index: "03",
    name: "Mobile App Development",
    description:
      "Native-quality mobile experiences built for iOS and Android. We use React Native to ship apps that feel fast, look premium, and work offline-first.",
    accentFrom: "#1a3c5e",
    accentTo: "#005a42",
    stat: "15+",
    statLabel: "Apps Launched",
    highlights: ["iOS & Android", "React Native", "Offline-first"],
    image: "/images/services/mobile_app_preview.png",
  },
  {
    id: 4,
    index: "04",
    name: "AI-Based Solutions",
    description:
      "We integrate AI into your workflows, products, and customer experiences. From LLM interfaces to predictive analytics.",
    accentFrom: "#005a42",
    accentTo: "#008040",
    stat: "60%",
    statLabel: "Less Manual Work",
    highlights: ["LLM Integration", "AI Automation", "Predictive Analytics"],
    image: "/images/services/ai_solutions_preview.png",
  },
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
   3D Flip Card
───────────────────────────────────────────── */
function FlipCard({ service, delay }: { service: Service; delay: number }) {
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (flipped) return;
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const px = (e.clientX - left) / width - 0.5;
    const py = (e.clientY - top) / height - 0.5;
    setTilt({ x: -py * 14, y: px * 14 });
  };

  const handleMouseEnter = () => {
    setFlipped(true);
    setTilt({ x: 0, y: 0 });
  };

  const handleMouseLeave = () => {
    setFlipped(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <Reveal delay={delay} style={{ height: "100%" }}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: "1100px", height: "100%", cursor: "pointer" }}
      >
        <motion.div
          animate={{
            rotateY: flipped ? 180 : tilt.y,
            rotateX: flipped ? 0 : tilt.x,
          }}
          transition={{
            rotateY: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
            rotateX: {
              duration: flipped ? 0.7 : 0.12,
              ease: flipped ? [0.4, 0, 0.2, 1] : "linear",
            },
          }}
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
          }}
        >
          {/* FRONT */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "24px",
              overflow: "hidden",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              background: "#0d0d12",
              border: "1px solid var(--glass-border, rgba(255,255,255,0.08))",
            }}
          >
            <Image
              src={service.image}
              alt={service.name}
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(4,4,8,0.92) 0%, rgba(4,4,8,0.3) 50%, transparent 100%)",
                zIndex: 1,
              }}
            />
            <div style={{ position: "absolute", bottom: "1.4rem", left: "1.4rem", zIndex: 3 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(1.1rem, 2vw, 1.55rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.15,
                  color: "#f5f5f7",
                  fontFamily: "'DM Sans', sans-serif",
                  maxWidth: "14ch",
                }}
              >
                {service.name}
              </p>
            </div>
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse at 70% 20%, rgba(255,255,255,0.04), transparent 65%)",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
          </div>

          {/* BACK */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "24px",
              overflow: "hidden",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              border: "1px solid var(--glass-border, rgba(255,255,255,0.1))",
              background: "var(--glass-bg, rgba(15,15,20,0.95))",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              display: "flex",
              flexDirection: "column",
              padding: "clamp(1.4rem, 3vw, 2rem)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "1.4rem",
              }}
            >
              <div style={{ textAlign: "right", marginLeft: "auto" }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: "2rem",
                    fontWeight: 900,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    color: "var(--brand-green, #00c88c)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {service.stat}
                </p>
                <p
                  style={{
                    margin: "0.15rem 0 0",
                    fontSize: "0.55rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--text-secondary, rgba(255,255,255,0.45))",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {service.statLabel}
                </p>
              </div>
            </div>

            <h3
              style={{
                margin: "0 0 0.75rem",
                fontSize: "clamp(1.2rem, 2.2vw, 1.65rem)",
                fontWeight: 900,
                letterSpacing: "-0.025em",
                lineHeight: 1.12,
                color: "var(--text-primary, #f5f5f7)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {service.name}
            </h3>

            <p
              style={{
                margin: "0 0 auto",
                fontSize: "0.82rem",
                lineHeight: 1.72,
                color: "var(--text-secondary, rgba(255,255,255,0.55))",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {service.description}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.4rem",
                marginTop: "1.4rem",
              }}
            >
              {service.highlights.map((h, i) => (
                <span
                  key={i}
                  style={{
                    padding: "0.2rem 0.6rem",
                    borderRadius: "6px",
                    fontSize: "0.52rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    border: "1px solid var(--glass-border, rgba(255,255,255,0.1))",
                    color: "rgba(255,255,255,0.65)",
                    background: "rgba(255,255,255,0.04)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Reveal>
  );
}

/* ─────────────────────────────────────────────
   Main Section
───────────────────────────────────────────── */
export default function ServicesSection() {
  return (
    <section
      aria-label="CODO Agency Services"
      className="relative z-10 w-full"
      style={{
        padding:
          "clamp(0.75rem, 1.5vw, 1.2rem) clamp(1.25rem, 5vw, 3.5rem) clamp(0.75rem, 1.5vw, 1.2rem)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div className="mx-auto max-w-[1320px]">

        {/* ── Header Block ── */}
        <Reveal delay={0}>
          <div
            className="rounded-[2rem] p-8 md:p-12 mb-12"
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid var(--glass-border)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Ambient glow — top right */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: -80,
                right: -40,
                width: 320,
                height: 320,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--brand-green) 12%, transparent) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            {/* ── ECOSYSTEM watermark ── */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                pointerEvents: "none",
                zIndex: 1,
              }}
            >
              <span
                style={{
                  fontSize: "clamp(4.5rem, 13vw, 10.5rem)",
                  fontWeight: 900,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  fontFamily: "'DM Sans', sans-serif",
                  whiteSpace: "nowrap",
                  userSelect: "none",
                  /*
                   * Ghost effect: the text is transparent, filled only with
                   * a very faint gradient that mixes the brand-green tint and
                   * white so it reads on dark glass without demanding attention.
                   */
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.048) 0%, rgba(0,200,140,0.072) 45%, rgba(255,255,255,0.022) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  /* Hairline stroke adds just enough presence */
                  WebkitTextStroke: "1px rgba(255,255,255,0.06)",
                  filter: "blur(0.3px)",
                  transform: "translateY(4%)",   /* optically centred behind heading */
                }}
              >
                SERVICES
              </span>
            </div>

            {/* ── Heading ── */}
            <div className="relative z-10">
              <h2
                style={{
                  fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  color: "var(--text-primary)",
                  margin: 0,
                }}
              >
                Capabilities That <br />
                <span style={{ color: "var(--brand-green)", fontStyle: "italic" }}>
                  Drive Impact.
                </span>
              </h2>
            </div>
          </div>
        </Reveal>

        {/* ── Cards grid ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          style={{
            gap: "clamp(0.75rem, 1.5vw, 1.2rem)",
            gridAutoRows: "420px",
          }}
        >
          {services.map((service, i) => (
            <FlipCard
              key={service.id}
              service={service}
              delay={0.15 + i * 0.1}
            />
          ))}
        </div>

      </div>
    </section>
  );
}