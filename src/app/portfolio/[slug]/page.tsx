"use client";

import { useRef, useState, useEffect, useCallback, use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  motion, AnimatePresence, useInView,
  useMotionValue, useSpring, useTransform,
} from "framer-motion";
import { TransitionLink as Link } from "@/components/transition/TransitionLink";
import { projects } from "@/data/projects";
import { employees } from "@/data/employees";
import { ArrowLeft, ArrowRight, ExternalLink, X, CheckCircle2, Quote } from "lucide-react";

/* ─── Constants (mirrors portfolio/page.tsx) ─────────────────────── */
const ACCENTS = ["#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e","#22c55e"];
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── Hooks ──────────────────────────────────────────────────────── */
function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(
      typeof window !== "undefined" &&
      (window.matchMedia("(hover: none)").matches || "ontouchstart" in window || navigator.maxTouchPoints > 0)
    );
  }, []);
  return isTouch;
}

/* ─── Custom Cursor (identical to listing page) ──────────────────── */
function CustomCursor({ accentColor, disabled }: { accentColor: string; disabled: boolean }) {
  const cx = useMotionValue(-120);
  const cy = useMotionValue(-120);
  const x = useSpring(cx, { stiffness: 280, damping: 28 });
  const y = useSpring(cy, { stiffness: 280, damping: 28 });
  const dotX = useSpring(cx, { stiffness: 600, damping: 30 });
  const dotY = useSpring(cy, { stiffness: 600, damping: 30 });

  useEffect(() => {
    if (disabled) return;
    const onMove = (e: MouseEvent) => { cx.set(e.clientX); cy.set(e.clientY); };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [cx, cy, disabled]);

  if (disabled) return null;
  return (
    <>
      <motion.div style={{ x, y, translateX: "-50%", translateY: "-50%", position: "fixed", top: 0, left: 0, zIndex: 9999, pointerEvents: "none", width: 34, height: 34, borderRadius: "999px", border: `1.5px solid ${accentColor}` }} animate={{ borderColor: accentColor }} transition={{ duration: 0.35 }} />
      <motion.div style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%", position: "fixed", top: 0, left: 0, zIndex: 9999, pointerEvents: "none", width: 5, height: 5, borderRadius: "999px", background: accentColor }} animate={{ background: accentColor }} transition={{ duration: 0.35 }} />
    </>
  );
}

/* ─── Clip-path Reveal (identical to listing page) ───────────────── */
function Reveal({ children, delay = 0, className, style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <motion.div ref={ref} className={className} style={{ overflow: "visible", ...style }}
      initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
      animate={inView ? { clipPath: "inset(0% 0 0 0)", opacity: 1 } : {}}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Ambient Orb (identical to listing page) ────────────────────── */
function AmbientOrb({ color }: { color: string }) {
  return (
    <motion.div aria-hidden
      style={{ position: "absolute", top: "-8%", left: "50%", transform: "translateX(-50%)", width: "min(80vw, 900px)", height: "min(80vw, 900px)", borderRadius: "50%", filter: "blur(130px)", pointerEvents: "none", background: `radial-gradient(circle, ${color}12 0%, transparent 68%)`, zIndex: 0 }}
      animate={{ x: [0, 60, -30, 0], y: [0, -40, 55, 0], scale: [1, 1.06, 0.97, 1] }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/* ─── Gallery Image — uses native <img> so any size renders naturally ─ */
function GalleryImage({ src, alt, accent, onClick, isHero }: { src: string; alt: string; accent: string; onClick?: () => void; isHero?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="cursor-zoom-in group"
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "clamp(16px, 2vw, 24px)",
        background: "rgba(255,255,255,0.03)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: hovered ? `${accent}40` : "rgba(255,255,255,0.06)",
        transition: "border-color 0.35s, box-shadow 0.35s",
        boxShadow: hovered ? `0 8px 40px ${accent}12` : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* The image — natural aspect ratio, constrained by max-height */}
      {!imgError ? (
        <motion.img
          src={src}
          alt={alt}
          onError={() => setImgError(true)}
          animate={{ scale: hovered ? 1.03 : 1 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            maxHeight: isHero ? "620px" : "480px",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      ) : (
        /* Fallback for broken images */
        <div style={{ width: "100%", height: isHero ? 320 : 220, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.15)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Image unavailable
        </div>
      )}

      {/* Color overlay on hover */}
      <motion.div
        style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${accent}18 0%, transparent 55%)`, mixBlendMode: "screen", pointerEvents: "none" }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Bottom gradient vignette */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 45%)", pointerEvents: "none" }} />

      {/* Bottom accent line */}
      <motion.div
        style={{ position: "absolute", bottom: 0, left: 0, height: 3, width: "100%", background: `linear-gradient(90deg, ${accent}, transparent)`, originX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.55, ease: EASE_OUT }}
      />

      {/* Zoom-in icon hint */}
      <motion.div
        style={{ position: "absolute", top: 16, right: 16, width: 36, height: 36, borderRadius: "10px", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", pointerEvents: "none" }}
        animate={{ opacity: hovered ? 0.9 : 0, scale: hovered ? 1 : 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="7" cy="7" r="5" /><path d="M11 11l3.5 3.5" /><path d="M7 5v4M5 7h4" />
        </svg>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════ */
export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = projects.find((p) => p.slug === slug);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [showBrandKit, setShowBrandKit] = useState(false);
  const isTouch = useIsTouchDevice();

  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const accent = "#22c55e";
  const nextAccent = "#22c55e";
  const pad = String(currentIndex + 1).padStart(2, "0");
  const totalPad = String(projects.length).padStart(2, "0");

  const teamMembers = employees.filter((e) => (project.developedBy ?? []).includes(e.slug));

  const outcomes = project.outcomes?.map(o => ({
    value: `${o.prefix}${o.value}${o.suffix}`,
    label: o.label,
  })) ?? [
    { value: "94%", label: "Performance Score" },
    { value: "3x", label: "Faster Load Time" },
    { value: "+40%", label: "Conversion Lift" },
  ];

  return (
    <>
      <CustomCursor accentColor={accent} disabled={isTouch} />

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightboxImg(null)} className="fixed inset-0 z-[9000] flex items-center justify-center bg-black/92 backdrop-blur-xl p-4 md:p-12 cursor-zoom-out">
            <button className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 transition text-white z-10"><X size={20} /></button>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <Image src={lightboxImg} alt="Gallery" fill className="object-cover" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main
        className="relative min-h-screen overflow-x-hidden"
        style={{ background: "#000", fontFamily: "'DM Sans', sans-serif", color: "#fff", cursor: isTouch ? "auto" : "none" }}
      >
        {/* Noise grain — identical to listing page */}
        <div aria-hidden className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.025, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat", backgroundSize: "256px" }} />

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden" style={{ paddingTop: "clamp(8rem, 18vh, 14rem)", paddingBottom: "clamp(4rem, 8vh, 8rem)", paddingLeft: "clamp(1.5rem, 5vw, 4rem)", paddingRight: "clamp(1.5rem, 5vw, 4rem)" }}>

          {/* Ambient glow */}
          <div aria-hidden className="absolute pointer-events-none" style={{ top: "-10%", left: "50%", transform: "translateX(-50%)", width: "100%", height: "70vh", background: `radial-gradient(ellipse 60% 60% at 50% 30%, ${accent}08, transparent)` }} />

          <div className="relative z-[1] mx-auto max-w-[1400px]">
            {/* Back + counter */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE_OUT }}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem" }}
            >
              <Link href="/portfolio" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", textDecoration: "none", cursor: isTouch ? "pointer" : "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = accent)}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
              >
                <ArrowLeft size={14} /> Back to Work
              </Link>
              <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.15)" }}>
                {pad} / {totalPad}
              </span>
            </motion.div>

            {/* Eyebrow */}
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.08 }}
              style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: accent, marginBottom: "1.5rem" }}
            >
              {project.category}
            </motion.p>

            {/* Title */}
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.1 }}
              style={{ marginBottom: "2rem" }}
            >
              <h1 style={{ fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 900, lineHeight: 0.87, letterSpacing: "-0.045em", color: "#fff", margin: 0 }}>
                {project.name}
              </h1>
            </motion.div>
          </div>
        </section>


        {/* ── Project Info Panel ──────────────────────────────────── */}
        <section className="relative px-5 sm:px-7 md:px-10 xl:px-16" style={{ marginBottom: "clamp(4rem, 8vh, 7rem)" }}>
          <div className="mx-auto max-w-[1440px] relative z-[1]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

              {/* Left — Description */}
              <Reveal>
                <div style={{ padding: "clamp(1.75rem, 3vw, 2.75rem)", borderRadius: "22px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", height: "100%" }}>
                  <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: accent, marginBottom: "1.25rem" }}>About</p>
                  <p style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)", color: "rgba(255,255,255,0.65)", lineHeight: 1.8, fontWeight: 400, margin: 0 }}>
                    {project.description}
                  </p>
                </div>
              </Reveal>

              {/* Right — Meta */}
              <Reveal delay={0.1}>
                <div style={{ padding: "clamp(1.75rem, 3vw, 2.75rem)", borderRadius: "22px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", height: "100%", display: "flex", flexDirection: "column", gap: "2rem" }}>

                  {/* Tech Stack */}
                  <div>
                    <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.875rem" }}>Stack</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {project.techStack.map((t, i) => (
                        <span key={i} style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: `1px solid ${accent}30`, color: "rgba(255,255,255,0.55)", padding: "5px 12px", borderRadius: "8px", background: `${accent}08` }}>{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Client + Duration */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                    <div>
                      <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.4rem" }}>Client</p>
                      <p style={{ fontWeight: 700, color: "rgba(255,255,255,0.8)", fontSize: "0.95rem", margin: 0 }}>{project.client}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.4rem" }}>Timeline</p>
                      <p style={{ fontWeight: 700, color: "rgba(255,255,255,0.8)", fontSize: "0.95rem", margin: 0 }}>{project.duration}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "auto" }}>
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                        style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: accent, color: "#000", padding: "9px 20px", borderRadius: "999px", fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", cursor: isTouch ? "pointer" : "none", transition: "opacity 0.2s" }}
                        onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                        onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                      >
                        Live Site <ExternalLink size={13} />
                      </a>
                    )}
                    {/* Brand Kit */}
                    {project.palette && project.palette.length > 0 && (
                      <button
                        onClick={() => setShowBrandKit(v => !v)}
                        style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "transparent", color: "rgba(255,255,255,0.45)", padding: "9px 20px", borderRadius: "999px", fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(255,255,255,0.1)", cursor: isTouch ? "pointer" : "none", transition: "all 0.2s" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = accent; (e.currentTarget as HTMLElement).style.color = accent; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"; }}
                      >
                        <span style={{ width: 10, height: 10, borderRadius: "50%", background: `conic-gradient(${project.palette.map((p, i) => `${p.hex} ${(i / project.palette!.length) * 100}% ${((i + 1) / project.palette!.length) * 100}%`).join(", ")})`, display: "inline-block" }} />
                        Brand Kit
                      </button>
                    )}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Brand Kit Drawer */}
            <AnimatePresence>
              {showBrandKit && project.palette && (
                <motion.div
                  initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
                  animate={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
                  exit={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  style={{ marginTop: "0.75rem", padding: "clamp(1.25rem, 2.5vw, 2rem)", borderRadius: "22px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}
                >
                  <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: accent, marginBottom: "1.25rem" }}>Brand Palette</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                    {project.palette.map((swatch, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div style={{ width: 48, height: 48, borderRadius: "10px", background: swatch.hex, border: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }} />
                        <div>
                          <p style={{ fontWeight: 700, color: "rgba(255,255,255,0.8)", fontSize: "0.82rem", margin: 0 }}>{swatch.name}</p>
                          <p style={{ fontSize: "0.65rem", letterSpacing: "0.1em", fontFamily: "monospace", color: "rgba(255,255,255,0.3)", margin: 0, marginTop: "2px" }}>{swatch.hex}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>


        {/* ── Overview + Challenge ─────────────────────────────────── */}
        <section className="relative px-5 sm:px-7 md:px-10 xl:px-16" style={{ marginBottom: "clamp(5rem, 10vh, 9rem)" }}>
          <div className="mx-auto max-w-[1440px] relative z-[1]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              <Reveal>
                <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: accent, marginBottom: "1.5rem" }}>Overview</p>
                <p style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, fontWeight: 400 }}>
                  {project.longDescription}
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <div style={{ padding: "clamp(1.5rem, 3vw, 2.5rem)", borderRadius: "22px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", height: "100%" }}>
                  <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: accent, marginBottom: "1.25rem" }}>The Challenge</p>
                  <p style={{ fontSize: "clamp(1rem, 1.2vw, 1.1rem)", color: "rgba(255,255,255,0.75)", lineHeight: 1.75 }}>
                    {project.challenges}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Gallery ──────────────────────────────────────────────── */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="relative px-5 sm:px-7 md:px-10 xl:px-16" style={{ marginBottom: "clamp(5rem, 10vh, 9rem)" }}>
            <AmbientOrb color={accent} />
            <div className="mx-auto max-w-[1440px] relative z-[1]">
              <Reveal style={{ marginBottom: "2rem" }}>
                <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: accent }}>Gallery</p>
              </Reveal>

              {/* Hero — first image full width */}
              <Reveal style={{ marginBottom: "clamp(0.75rem, 1.5vw, 1.25rem)" }}>
                <GalleryImage src={project.gallery[0]} alt={`${project.name} — Hero`} accent={accent} isHero onClick={() => setLightboxImg(project.gallery[0])} />
              </Reveal>

              {/* Remaining images in a responsive grid */}
              {project.gallery.length > 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {project.gallery.slice(1).map((img: string, i: number) => (
                    <Reveal key={i} delay={(i + 1) * 0.08}>
                      <GalleryImage src={img} alt={`${project.name} ${i + 2}`} accent={accent} onClick={() => setLightboxImg(img)} />
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── Results ──────────────────────────────────────────────── */}
        <section className="relative px-5 sm:px-7 md:px-10 xl:px-16" style={{ marginBottom: "clamp(5rem, 10vh, 9rem)" }}>
          <div className="mx-auto max-w-[1440px] relative z-[1]">
            <Reveal style={{ marginBottom: "2.5rem" }}>
              <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: accent, marginBottom: "0.75rem" }}>Results</p>
              <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.04em", color: "#fff" }}>
                Impact & <span style={{ color: accent }}>Outcomes</span>
              </h2>
            </Reveal>

            {/* KPI row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 mb-5">
              {outcomes.map((kpi, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div style={{ padding: "clamp(1.5rem, 3vw, 2.5rem)", borderRadius: "22px", background: i === 0 ? accent : "rgba(255,255,255,0.025)", border: i === 0 ? "none" : "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "180px" }}>
                    <div />
                    <div>
                      <p style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, letterSpacing: "-0.04em", color: i === 0 ? "#000" : "#fff", marginBottom: "0.25rem", lineHeight: 1 }}>{kpi.value}</p>
                      <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: i === 0 ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.35)" }}>{kpi.label}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Features */}
            {project.features?.length > 0 && (
              <Reveal delay={0.15}>
                <div style={{ padding: "clamp(1.5rem, 3vw, 2.5rem)", borderRadius: "22px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1.5rem" }}>Key Deliverables</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.features.map((f: string, i: number) => (
                      <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                        <CheckCircle2 size={16} style={{ color: accent, flexShrink: 0, marginTop: "2px" }} />
                        <span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </section>

        {/* ── Testimonial ──────────────────────────────────────────── */}
        {project.testimonial && (
          <section className="relative px-5 sm:px-7 md:px-10 xl:px-16" style={{ marginBottom: "clamp(5rem, 10vh, 9rem)" }}>
            <div className="mx-auto max-w-[1200px] relative z-[1]">
              <Reveal>
                <div style={{ padding: "clamp(2rem, 5vw, 4rem)", borderRadius: "28px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
                  <Quote size={28} style={{ color: accent, margin: "0 auto 2rem", opacity: 0.5 }} />
                  <blockquote style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)", fontStyle: "italic", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, maxWidth: "700px", margin: "0 auto 2rem" }}>
                    "{project.testimonial.quote}"
                  </blockquote>
                  <p style={{ fontWeight: 700, color: "#fff", fontSize: "0.9rem" }}>{project.testimonial.author}</p>
                  <p style={{ fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginTop: "0.3rem" }}>{project.testimonial.role}</p>
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* ── Team ─────────────────────────────────────────────────── */}
        {teamMembers.length > 0 && (
          <section className="relative px-5 sm:px-7 md:px-10 xl:px-16" style={{ marginBottom: "clamp(5rem, 10vh, 9rem)" }}>
            <div className="mx-auto max-w-[1440px] relative z-[1]">
              <Reveal style={{ marginBottom: "2rem" }}>
                <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: accent }}>Built By</p>
              </Reveal>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                {teamMembers.map((member, i) => (
                  <Reveal key={member.slug} delay={i * 0.07}>
                    <Link href={`/team/${member.slug}`} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.6rem 1.1rem 0.6rem 0.6rem", borderRadius: "999px", background: "rgba(255,255,255,0.03)", borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(255,255,255,0.07)", textDecoration: "none", cursor: isTouch ? "pointer" : "none", transition: "border-color 0.2s, background 0.2s" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${accent}60`; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; }}
                    >
                      <div style={{ position: "relative", width: 36, height: 36, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                        <Image src={member.photo} alt={member.name} fill style={{ objectFit: "cover" }} />
                      </div>
                      <div>
                        <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#fff", margin: 0 }}>{member.name}</p>
                        <p style={{ fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: 0 }}>{member.role}</p>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Next Project (mirrors Bottom CTA style) ───────────────── */}
        {nextProject && (
          <section style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "clamp(6rem, 12vh, 10rem) clamp(1.5rem, 5vw, 4rem)" }} className="relative overflow-hidden">
            <div className="mx-auto max-w-[1400px] text-center relative z-[1]">
              <motion.div initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8%" }} transition={{ duration: 0.85, ease: EASE_OUT }}>
                <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: nextAccent, marginBottom: "1.5rem" }}>Next Case Study</p>
                <Link href={`/portfolio/${nextProject.slug}`} style={{ textDecoration: "none", display: "block", cursor: isTouch ? "pointer" : "none" }} className="group">
                  <h2 style={{ fontSize: "clamp(3rem, 9vw, 9rem)", fontWeight: 900, letterSpacing: "-0.045em", lineHeight: 0.9, color: "#fff", marginBottom: "3rem", transition: "color 0.4s" }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = nextAccent)}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "#fff")}
                  >
                    {nextProject.name}
                  </h2>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "0.85rem 2rem", borderRadius: "999px", borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(255,255,255,0.12)", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", transition: "all 0.3s", cursor: isTouch ? "pointer" : "none" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = nextAccent; el.style.color = "#000"; el.style.borderColor = nextAccent; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "rgba(255,255,255,0.5)"; el.style.borderColor = "rgba(255,255,255,0.12)"; }}
                  >
                    View Case Study <ArrowRight size={14} />
                  </div>
                </Link>
              </motion.div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}