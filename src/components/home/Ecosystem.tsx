"use client";

import { useRef, useState, useEffect } from "react";
import { useInView, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { TransitionLink as Link } from "@/components/transition/TransitionLink";

/* ─────────────────────────────────────────────
   Animated Stat Counter Hook
───────────────────────────────────────────── */
function useAnimatedCounter(target: number, inView: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1600;
    let frameId: number;

    const animate = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (p < 1) frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [target, inView]);

  return count;
}

/* ─────────────────────────────────────────────
   Elevated Card Component with 3D Physics
───────────────────────────────────────────── */
type CardProps = {
  type: "academy" | "agency";
  label: string;
  nameMain: string;
  nameAccent: string;
  tagline: string;
  description: string;
  features: string[];
  statTarget: number;
  statLabel: string;
  ctaText: string;
  ctaLink: string;
  isExternal: boolean;
  delay: number;
};

function ElevatedCard(props: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-10%" });
  const count = useAnimatedCounter(props.statTarget, inView);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Framer Motion Springs for 3D Tilt
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [14, -14]), { stiffness: 400, damping: 30 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-14, 14]), { stiffness: 400, damping: 30 });
  const scale = useSpring(1, { stiffness: 400, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    x.set(currentX / rect.width);
    y.set(currentY / rect.height);
    setMousePos({ x: currentX, y: currentY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.018);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
    scale.set(1);
  };

  // Theming Variables
  const brandHex = "#00e87a"; // forced green for both
  const brandRgb = "0, 232, 122";

  const [ctaHover, setCtaHover] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0 }}
      className="flex-1 w-full min-w-0 relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1100px" }}
    >
      {/* ── 3D Card Shell ── */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full relative rounded-[28px]"
      >


        {/* Static Subtle Border */}
        <div
          className="absolute inset-0 rounded-[28px] border z-10 pointer-events-none transition-colors duration-400"
          style={{ borderColor: isHovered ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.08)" }}
        />

        {/* ── INNER CARD CONTAINER ── */}
        <div
          className="relative rounded-[27px] overflow-hidden flex flex-col w-full h-full"
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            minHeight: "clamp(400px, 50vw, 550px)",
          }}
        >
          {/* Top Line Glow */}
          <div
            className="absolute top-0 h-[1px] rounded-[100px] z-20 transition-all duration-400"
            style={{
              left: isHovered ? "6%" : "12%",
              right: isHovered ? "6%" : "12%",
              opacity: isHovered ? 1 : 0.55,
              background: `linear-gradient(90deg, transparent, ${brandHex}, transparent)`,
              boxShadow: `0 0 18px 3px rgba(${brandRgb}, 0.4)`,
            }}
          />

          {/* Mouse Spotlight */}
          <div
            className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(circle 280px at ${mousePos.x}px ${mousePos.y}px, rgba(${brandRgb}, 0.1), transparent 72%)`,
            }}
          />

          {/* Ambient Glow */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: props.type === "academy"
                ? `radial-gradient(circle at 20% 0%, rgba(${brandRgb}, 0.13) 0%, transparent 65%)`
                : `radial-gradient(circle at 80% 100%, rgba(${brandRgb}, 0.12) 0%, transparent 65%)`,
            }}
          />



          {/* SVG Geometric Pattern */}
          <svg className="absolute top-0 right-0 w-[65%] h-[65%] pointer-events-none z-0" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
            <circle cx="500" cy="0" r="70" fill="none" stroke="rgba(255,255,255,0.055)" strokeWidth="1" />
            <circle cx="500" cy="0" r="140" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            <circle cx="500" cy="0" r="210" fill="none" stroke="rgba(255,255,255,0.032)" strokeWidth="1" />
            <circle cx="500" cy="0" r="280" fill="none" stroke="rgba(255,255,255,0.024)" strokeWidth="1" />
            <circle cx="500" cy="0" r="350" fill="none" stroke="rgba(255,255,255,0.016)" strokeWidth="1" />
            <line x1="500" y1="0" x2="0" y2="500" stroke="rgba(255,255,255,0.045)" strokeWidth="0.8" />
            <line x1="500" y1="0" x2="100" y2="500" stroke="rgba(255,255,255,0.02)" strokeWidth="0.6" />
          </svg>

          {/* Bottom Fade Mask */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[55%] pointer-events-none z-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.52) 0%, transparent 100%)" }}
          />

          {/* ── CARD FOREGROUND CONTENT ── */}
          <div className="flex-1 flex flex-col justify-between relative z-20" style={{ padding: "clamp(1.8rem, 3.5vw, 2.5rem)" }}>
            
            {/* Top Row: Pill & Stat */}
            <div className="flex items-start justify-between gap-4">
              <div
                className="inline-flex items-center gap-[0.45rem] px-[0.85rem] py-[0.32rem] rounded-full border"
                style={{ background: "rgba(255,255,255,0.09)", borderColor: "rgba(255,255,255,0.13)" }}
              >
                <span className="w-[6px] h-[6px] rounded-full flex-shrink-0" style={{ background: brandHex, boxShadow: `0 0 8px ${brandHex}` }} />
                <span className="text-[0.6rem] font-bold tracking-[0.22em] uppercase text-white/80">CODO {props.label}</span>
              </div>

              <div className="text-right">
                <div className="text-[2.6rem] font-black leading-none tracking-[-0.04em] tabular-nums" style={{ color: brandHex }}>
                  {count}+
                </div>
                <div className="text-[0.62rem] font-semibold tracking-[0.16em] uppercase text-white/40 mt-[0.2rem]">
                  {props.statLabel}
                </div>
              </div>
            </div>

            {/* Bottom Row: Text & CTA */}
            <div>
              <p className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-white/30 mb-[0.55rem]">
                {props.tagline}
              </p>
              
              <h3 className="text-white font-black leading-[1.04] tracking-[-0.03em] mb-[0.85rem]" style={{ fontSize: "clamp(2.1rem, 4.8vw, 3.4rem)" }}>
                CODO <em className="not-italic" style={{ color: brandHex, fontStyle: "italic" }}>{props.nameAccent}</em>
              </h3>
              
              <p className="text-white/50 leading-[1.82] max-w-[42ch] mb-[1.4rem]" style={{ fontSize: "clamp(0.85rem, 1.35vw, 0.95rem)" }}>
                {props.description}
              </p>
              

              <div className="h-[1px] w-full mb-[1.4rem]" style={{ background: "rgba(255,255,255,0.08)" }} />

              {/* Dynamic CTA Button */}
              {props.isExternal ? (
                <a
                  href={props.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-[0.6rem] px-[1.75rem] py-[0.85rem] rounded-full text-[0.73rem] font-extrabold tracking-[0.12em] uppercase no-underline transition-all duration-300"
                  style={{
                    color: brandHex,
                    background: ctaHover ? `rgba(${brandRgb}, 0.15)` : `rgba(${brandRgb}, 0.07)`,
                    border: `1.5px solid rgba(${brandRgb}, 0.28)`,
                    boxShadow: ctaHover ? `0 0 24px rgba(${brandRgb}, 0.2)` : "none",
                    transform: ctaHover ? "translateX(5px)" : "translateX(0)",
                  }}
                  onMouseEnter={() => setCtaHover(true)}
                  onMouseLeave={() => setCtaHover(false)}
                >
                  {props.ctaText}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ) : (
                <Link
                  href={props.ctaLink}
                  className="inline-flex items-center gap-[0.6rem] px-[1.75rem] py-[0.85rem] rounded-full text-[0.73rem] font-extrabold tracking-[0.12em] uppercase no-underline transition-all duration-300"
                  style={{
                    color: brandHex,
                    background: ctaHover ? `rgba(${brandRgb}, 0.15)` : `rgba(${brandRgb}, 0.07)`,
                    border: `1.5px solid rgba(${brandRgb}, 0.28)`,
                    boxShadow: ctaHover ? `0 0 24px rgba(${brandRgb}, 0.2)` : "none",
                    transform: ctaHover ? "translateX(5px)" : "translateX(0)",
                  }}
                  onMouseEnter={() => setCtaHover(true)}
                  onMouseLeave={() => setCtaHover(false)}
                >
                  {props.ctaText}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              )}

            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main Section
───────────────────────────────────────────── */
export default function EcosystemSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={sectionRef}
      aria-label="CODO Ecosystem"
      className="relative w-full"
      style={{
        padding: "clamp(0.75rem, 1.5vw, 1.2rem) clamp(1.25rem, 5vw, 3.5rem) clamp(0.75rem, 1.5vw, 1.2rem)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div className="mx-auto max-w-[1240px] relative z-10 w-full">

        {/* ── Header Block ── */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0 }}
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
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.048) 0%, rgba(0,200,140,0.072) 45%, rgba(255,255,255,0.022) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                WebkitTextStroke: "1px rgba(255,255,255,0.06)",
                filter: "blur(0.3px)",
                transform: "translateY(4%)",
              }}
            >
              ECOSYSTEM
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
              One Company.<br />
              <span style={{ color: "#00e87a" }}>Two Powerful Arms.</span>
            </h2>
          </div>
        </motion.div>

        {/* ── Interactive Cards Grid ── */}
        <div className="flex flex-col md:flex-row" style={{ gap: "1.4rem" }}>
          <ElevatedCard
            type="academy"
            label="Academy"
            nameMain="CODO"
            nameAccent="Academy"
            tagline="We train those who build tomorrow."
            description="Training, internships, and skill development programs that bridge industry demand with human potential. Hands-on AI, web, and emerging tech education for the next generation of innovators."
            features={["AI & Emerging Tech", "Hands-on Projects", "Industry Mentors", "Placement Support"]}
            statTarget={500}
            statLabel="Innovators Trained"
            ctaText="Visit Academy"
            ctaLink="https://www.codoacademy.com"
            isExternal={true}
            delay={0.15}
          />

          <ElevatedCard
            type="agency"
            label="Agency"
            nameMain="CODO"
            nameAccent="Agency"
            tagline="We build what others imagine."
            description="Custom web applications, enterprise software, and mobile apps powered by cutting-edge AI. From concept to deployment — scalable digital solutions that drive real business impact."
            features={["Web & Mobile Apps", "AI Integration", "Enterprise Software", "End-to-end Delivery"]}
            statTarget={30}
            statLabel="Solutions Delivered"
            ctaText="View Portfolio"
            ctaLink="/portfolio"
            isExternal={false}
            delay={0.3}
          />
        </div>

      </div>
    </section>
  );
}