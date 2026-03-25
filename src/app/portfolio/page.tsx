"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { TransitionLink as Link } from "@/components/transition/TransitionLink";
import { projects } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";

/* ─── Shared constants ─────────────────────────────────────────────── */
const ACCENTS = [
  "#a8ff78",
  "#4facfe",
  "#f7971e",
  "#f093fb",
  "#43e97b",
  "#ff6b6b",
  "#78ffd6",
  "#c471ed",
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const CATEGORIES = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

/* ─── Hooks ────────────────────────────────────────────────────────── */
function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const hasTouch =
      typeof window !== "undefined" &&
      (window.matchMedia("(hover: none)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0);
    setIsTouch(hasTouch);
  }, []);

  return isTouch;
}

/* ─── Custom Cursor ────────────────────────────────────────────────── */
function CustomCursor({
  accentColor,
  disabled,
}: {
  accentColor: string;
  disabled: boolean;
}) {
  const cx = useMotionValue(-120);
  const cy = useMotionValue(-120);
  const x = useSpring(cx, { stiffness: 280, damping: 28 });
  const y = useSpring(cy, { stiffness: 280, damping: 28 });
  const dotX = useSpring(cx, { stiffness: 600, damping: 30 });
  const dotY = useSpring(cy, { stiffness: 600, damping: 30 });

  useEffect(() => {
    if (disabled) return;

    const onMove = (e: MouseEvent) => {
      cx.set(e.clientX);
      cy.set(e.clientY);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [cx, cy, disabled]);

  if (disabled) return null;

  return (
    <>
      <motion.div
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
          pointerEvents: "none",
          width: 34,
          height: 34,
          borderRadius: "999px",
          border: `1.5px solid ${accentColor}`,
        }}
        animate={{ borderColor: accentColor }}
        transition={{ duration: 0.35 }}
      />
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
          pointerEvents: "none",
          width: 5,
          height: 5,
          borderRadius: "999px",
          background: accentColor,
        }}
        animate={{ background: accentColor }}
        transition={{ duration: 0.35 }}
      />
    </>
  );
}

/* ─── Reveal ───────────────────────────────────────────────────────── */
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
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ overflow: "visible", ...style }}
      initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
      animate={inView ? { clipPath: "inset(0% 0 0 0)", opacity: 1 } : {}}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── TiltCard ─────────────────────────────────────────────────────── */
function TiltCard({
  children,
  style,
  onEnter,
  onLeave,
  disabled,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onEnter?: () => void;
  onLeave?: () => void;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rX = useMotionValue(0);
  const rY = useMotionValue(0);
  const srX = useSpring(rX, { stiffness: 180, damping: 22 });
  const srY = useSpring(rY, { stiffness: 180, damping: 22 });

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      const el = ref.current;
      if (!el) return;

      const r = el.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;

      rX.set(-ny * 5.5);
      rY.set(nx * 5.5);
    },
    [rX, rY, disabled]
  );

  const onLeaveHandler = useCallback(() => {
    rX.set(0);
    rY.set(0);
    onLeave?.();
  }, [rX, rY, onLeave]);

  return (
    <motion.div
      ref={ref}
      style={{
        ...style,
        rotateX: disabled ? 0 : srX,
        rotateY: disabled ? 0 : srY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeaveHandler}
    >
      {children}
    </motion.div>
  );
}

/* ─── AmbientOrb (reactive to hovered card accent) ─────────────────── */
function AmbientOrb({ color }: { color: string }) {
  return (
    <motion.div
      aria-hidden
      style={{
        position: "absolute",
        top: "-8%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(72vw, 780px)",
        height: "min(72vw, 780px)",
        borderRadius: "50%",
        filter: "blur(120px)",
        pointerEvents: "none",
        background: `radial-gradient(circle, ${color}14 0%, transparent 68%)`,
        zIndex: 0,
      }}
      animate={{
        x: [0, 60, -30, 0],
        y: [0, -40, 55, 0],
        scale: [1, 1.06, 0.97, 1],
      }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/* ─── ProjectCard (preserved from original) ────────────────────────── */
function ProjectCard({
  project,
  index,
  onHoverColor,
  interactive = true,
}: {
  project: (typeof projects)[0];
  index: number;
  onHoverColor: (c: string | null) => void;
  interactive?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const accent = ACCENTS[index % ACCENTS.length];
  const pad = String(index + 1).padStart(2, "0");

  const mX = useMotionValue(0);
  const mY = useMotionValue(0);
  const imgX = useSpring(useTransform(mX, [-1, 1], [-12, 12]), {
    stiffness: 130,
    damping: 22,
  });
  const imgY = useSpring(useTransform(mY, [-1, 1], [-8, 8]), {
    stiffness: 130,
    damping: 22,
  });

  const onImgMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const r = e.currentTarget.getBoundingClientRect();
    mX.set(((e.clientX - r.left) / r.width) * 2 - 1);
    mY.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  const aspectRatio = index % 3 === 0 ? "4 / 5" : "16 / 11";

  return (
    <Reveal delay={index % 2 === 1 ? 0.1 : 0}>
      <TiltCard
        disabled={!interactive}
        onEnter={() => {
          setHovered(true);
          onHoverColor(accent);
        }}
        onLeave={() => {
          setHovered(false);
          onHoverColor(null);
        }}
      >
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none select-none absolute -right-1 top-0 z-0 leading-none tracking-[-0.06em]"
            style={{
              fontSize: "clamp(4.25rem, 10vw, 8.5rem)",
              fontWeight: 900,
              fontFamily: "var(--font-syne, 'Syne', sans-serif)",
              color: "rgba(255,255,255,0.035)",
            }}
          >
            {pad}
          </div>

          <Link
            href={`/portfolio/${project.slug}`}
            style={{ textDecoration: "none", color: "inherit", display: "block" }}
          >
            <div
              className="relative z-[1] overflow-hidden rounded-[22px] sm:rounded-[26px] md:rounded-[28px]"
              style={{
                aspectRatio,
                background: project.gradient ?? "rgba(255,255,255,0.05)",
              }}
              onMouseMove={onImgMove}
            >
              <motion.div
                style={{
                  x: interactive ? imgX : 0,
                  y: interactive ? imgY : 0,
                  position: "absolute",
                  width: "calc(100% + 24px)",
                  height: "calc(100% + 16px)",
                  top: "-8px",
                  left: "-12px",
                }}
              >
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 42vw"
                  priority={index < 4}
                  style={{ objectFit: "cover" }}
                />
              </motion.div>

              <motion.div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(135deg, ${accent}24 0%, transparent 58%)`,
                  mixBlendMode: "screen",
                }}
                animate={{ opacity: hovered && interactive ? 1 : 0 }}
                transition={{ duration: 0.4 }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.12) 42%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />

              <motion.div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  height: 3,
                  width: "100%",
                  background: `linear-gradient(90deg, ${accent}, transparent)`,
                  originX: 0,
                }}
                animate={{
                  scaleX: hovered && interactive ? 1 : 0,
                  opacity: hovered && interactive ? 1 : 0,
                }}
                initial={{ scaleX: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              />

              <motion.span
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  left: "1rem",
                  fontSize: "0.66rem",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.58)",
                  fontFamily: "var(--font-syne, 'Syne', sans-serif)",
                }}
                animate={{
                  opacity: hovered && interactive ? 1 : 0.82,
                  y: hovered && interactive ? 0 : 4,
                }}
                transition={{ duration: 0.28 }}
              >
                {project.year ?? "2024"}
              </motion.span>
            </div>

            <div className="relative z-[1] mt-4 sm:mt-5">
              <div className="flex items-start justify-between gap-4 sm:gap-5">
                <div className="min-w-0 flex-1">
                  <div className="mb-2.5 flex flex-wrap gap-2">
                    {project.tags.slice(0, 2).map((tag, i) => (
                      <span
                        key={i}
                        className="whitespace-nowrap rounded-full border px-2.5 py-1"
                        style={{
                          fontSize: "0.62rem",
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          borderColor: "rgba(255,255,255,0.1)",
                          color: "rgba(255,255,255,0.42)",
                          fontFamily: "var(--font-syne, 'Syne', sans-serif)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3
                    style={{
                      fontSize: "clamp(1.18rem, 2vw, 1.8rem)",
                      fontWeight: 800,
                      lineHeight: 1.08,
                      letterSpacing: "-0.03em",
                      color: "var(--text-primary)",
                      fontFamily: "var(--font-syne, 'Syne', sans-serif)",
                      margin: 0,
                    }}
                    className="truncate"
                  >
                    {project.name}
                  </h3>
                </div>

                <motion.div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border sm:h-11 sm:w-11"
                  style={{
                    borderColor: "rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.4)",
                    marginTop: "auto",
                  }}
                  animate={{
                    borderColor:
                      hovered && interactive ? accent : "rgba(255,255,255,0.12)",
                    color: hovered && interactive ? accent : "rgba(255,255,255,0.4)",
                    scale: hovered && interactive ? 1.08 : 1,
                    rotate: hovered && interactive ? 0 : -45,
                  }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 13L13 3M13 3H6M13 3V10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </div>
            </div>
          </Link>
        </div>
      </TiltCard>
    </Reveal>
  );
}

/* ─── Scroll Indicator ─────────────────────────────────────────────── */
function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay: 1.1 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
      }}
    >
      <div style={{ position: "relative", width: "1px", height: "52px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.08)" }} />
        <motion.div
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.4 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "50%",
            background: "linear-gradient(to bottom, transparent, var(--brand-green))",
          }}
        />
      </div>
      <span
        style={{
          fontSize: "0.6rem",
          fontWeight: 700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.2)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        Scroll to explore
      </span>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════════ */
export default function PortfolioPage() {
  const [accent, setAccent] = useState(ACCENTS[0]);
  const [activeCategory, setActiveCategory] = useState("All");
  const isTouch = useIsTouchDevice();

  const handleHoverColor = (color: string | null) => {
    if (color) setAccent(color);
  };

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const leftProjects = filteredProjects.filter((_, i) => i % 2 === 0);
  const rightProjects = filteredProjects.filter((_, i) => i % 2 === 1);

  const filterRef = useRef(null);
  const filterInView = useInView(filterRef, { once: true, margin: "-5% 0px" });

  return (
    <>
      <CustomCursor accentColor={accent} disabled={isTouch} />

      <main
        className="relative min-h-screen"
        style={{
          background: "#000",
          fontFamily: "'DM Sans', sans-serif",
          color: "#fff",
          cursor: isTouch ? "auto" : "none",
        }}
      >
        {/* Noise grain */}
        <div
          aria-hidden
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            opacity: 0.025,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "256px",
          }}
        />

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden"
          style={{
            paddingTop: "clamp(8rem, 18vh, 14rem)",
            paddingBottom: "clamp(4rem, 8vh, 8rem)",
            paddingLeft: "clamp(1.5rem, 5vw, 4rem)",
            paddingRight: "clamp(1.5rem, 5vw, 4rem)",
          }}
        >
          {/* Ambient glow */}
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              top: "-10%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "100vw",
              height: "70vh",
              background:
                "radial-gradient(ellipse 60% 60% at 50% 30%, color-mix(in srgb, var(--brand-green) 6%, transparent), transparent)",
            }}
          />

          <div className="relative z-[1] mx-auto max-w-[1400px]">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
              style={{
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "var(--brand-green)",
                marginBottom: "1.75rem",
              }}
            >
              CODO AI Innovations — Portfolio
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.1 }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-12"
            >
              <h1
                style={{
                  fontSize: "clamp(4.5rem, 14vw, 12rem)",
                  fontWeight: 900,
                  lineHeight: 0.87,
                  letterSpacing: "-0.045em",
                  color: "#fff",
                  margin: 0,
                }}
              >
                PORT
                <br />
                <span style={{ color: "var(--brand-green)" }}>FOLIO.</span>
              </h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.45 }}
                style={{
                  maxWidth: "340px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  gap: "2.5rem",
                  paddingBottom: "1rem",
                }}
              >
                <p
                  style={{
                    fontSize: "clamp(1rem, 1.15vw, 1.1rem)",
                    color: "rgba(255,255,255,0.4)",
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  Design and development across brand, product, and digital
                  experience — from{" "}
                  <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>
                    AI platforms to enterprise systems
                  </span>
                  .
                </p>

                <ScrollIndicator />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── Category Filters ─────────────────────────────────────────── */}
        <section
          ref={filterRef}
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            padding: "0 clamp(1.5rem, 5vw, 4rem)",
          }}
        >
          <div className="mx-auto max-w-[1400px]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={filterInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
                padding: "clamp(1.5rem, 3vh, 2.5rem) 0",
              }}
            >
              {/* Filter pills */}
              <div
                style={{
                  display: "flex",
                  gap: 3,
                  padding: "4px",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  flexWrap: "wrap",
                }}
              >
                {CATEGORIES.map((cat) => {
                  const active = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      style={{
                        padding: "6px 14px",
                        borderRadius: "7px",
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        cursor: isTouch ? "pointer" : "none",
                        border: "none",
                        fontFamily: "'DM Sans', sans-serif",
                        transition: "all 0.25s ease",
                        background: active ? "rgba(0,255,136,0.08)" : "transparent",
                        color: active ? "var(--brand-green)" : "rgba(255,255,255,0.3)",
                        boxShadow: active ? "0 0 0 1px rgba(0,255,136,0.2)" : "none",
                      }}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Count */}
              <span
                style={{
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.15)",
                }}
              >
                {filteredProjects.length}{" "}
                {filteredProjects.length === 1 ? "project" : "projects"}
              </span>
            </motion.div>
          </div>
        </section>

        {/* ── Project Grid ─────────────────────────────────────────────── */}
        <section className="relative px-5 pb-20 sm:px-7 sm:pb-24 md:px-10 md:pb-28 xl:px-16 xl:pb-36">
          <AmbientOrb color={accent} />

          <div className="mx-auto max-w-[1440px] relative z-[1]">
            {/* Mobile: single column */}
            <div className="block md:hidden">
              <div className="flex flex-col gap-14 sm:gap-16">
                {filteredProjects.map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={i}
                    onHoverColor={handleHoverColor}
                    interactive={!isTouch}
                  />
                ))}
              </div>
            </div>

            {/* Desktop: masonry two-column */}
            <div className="hidden md:grid md:grid-cols-2 md:gap-x-8 lg:gap-x-10 xl:gap-x-14">
              <div className="flex flex-col gap-16 lg:gap-20 xl:gap-24">
                {leftProjects.map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={i * 2}
                    onHoverColor={handleHoverColor}
                    interactive={!isTouch}
                  />
                ))}
              </div>

              <div className="mt-20 flex flex-col gap-16 lg:mt-24 lg:gap-20 xl:mt-28 xl:gap-24">
                {rightProjects.map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={i * 2 + 1}
                    onHoverColor={handleHoverColor}
                    interactive={!isTouch}
                  />
                ))}
              </div>
            </div>

            {/* Empty state */}
            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ textAlign: "center", padding: "6rem 1rem" }}
              >
                <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>
                  No projects in this category yet.
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* ── Bottom CTA ────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            padding: "clamp(6rem, 12vh, 10rem) clamp(1.5rem, 5vw, 4rem)",
          }}
        >
          <div className="mx-auto max-w-[1400px] text-center">
            <motion.div
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.85, ease: EASE_OUT }}
            >
              <p
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--brand-green)",
                  marginBottom: "1.5rem",
                }}
              >
                CODO Agency — Let's Talk
              </p>
              <h2
                style={{
                  fontSize: "clamp(3rem, 8vw, 7rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.95,
                  color: "#fff",
                  marginBottom: "2rem",
                }}
              >
                Have a project
                <br />
                <span style={{ color: "var(--brand-green)" }}>in mind?</span>
              </h2>
              <p
                style={{
                  fontSize: "clamp(1rem, 1.2vw, 1.1rem)",
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.7,
                  maxWidth: "48ch",
                  margin: "0 auto 3rem",
                }}
              >
                From a single landing page to a full AI-powered platform — CODO Agency delivers custom digital solutions that drive real business growth.
              </p>

              <Link
                href="/contact"
                className="group inline-flex items-center gap-3"
                style={{ textDecoration: "none", cursor: isTouch ? "pointer" : "none" }}
              >
                <span
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-300"
                  style={{
                    background: "var(--brand-green)",
                    color: "#000",
                    fontSize: "0.9rem",
                    fontWeight: 800,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  Work With Us
                  <ArrowUpRight
                    size={18}
                    strokeWidth={2.5}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}