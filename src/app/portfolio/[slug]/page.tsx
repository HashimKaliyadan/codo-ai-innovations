"use client";

import { useRef, useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  motion, useInView, AnimatePresence,
  useScroll, useTransform, useSpring, animate as motionAnimate,
} from "framer-motion";
import { TransitionLink as Link } from "@/components/transition/TransitionLink";
import { projects } from "@/data/projects";
import { employees } from "@/data/employees";
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Building2,
  Clock, ExternalLink, X, Quote, Lightbulb, FlaskConical,
  Layers, Rocket, CheckCircle, Target,
} from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ═══════════════════════════════════════════════════════════════════
   SECTION NAV IDS
═══════════════════════════════════════════════════════════════════ */
const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "process", label: "Process" },
  { id: "solution", label: "Solution" },
  { id: "outcomes", label: "Outcomes" },
  { id: "design", label: "Design" },
  { id: "gallery", label: "Gallery" },
  { id: "team", label: "Team" },
];

/* ═══════════════════════════════════════════════════════════════════
   READING PROGRESS
═══════════════════════════════════════════════════════════════════ */
function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  return (
    <motion.div style={{
      scaleX, position: "fixed", top: 0, left: 0, right: 0,
      height: "2px", background: "var(--brand-green)",
      transformOrigin: "left", zIndex: 10000,
    }} />
  );
}

/* ═══════════════════════════════════════════════════════════════════
   STICKY SECTION NAV — right rail
═══════════════════════════════════════════════════════════════════ */
function SectionNav({ active }: { active: string }) {
  return (
    <motion.nav initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: 1.1 }}
      className="hidden xl:flex"
      style={{
        position: "fixed", right: "clamp(1rem, 2vw, 1.75rem)", top: "50%",
        transform: "translateY(-50%)", zIndex: 100,
        flexDirection: "column", gap: "0.55rem", alignItems: "flex-end",
      }}>
      {NAV_ITEMS.map((s) => {
        const isActive = active === s.id;
        return (
          <button key={s.id}
            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <motion.span
              animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 8 }}
              transition={{ duration: 0.3 }}
              style={{ fontSize: "0.5rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--brand-green)", fontFamily: "'DM Sans', sans-serif" }}>
              {s.label}
            </motion.span>
            <motion.div
              animate={{ width: isActive ? 24 : 6, background: isActive ? "var(--brand-green)" : "rgba(255,255,255,0.18)" }}
              transition={{ duration: 0.35, ease: EASE }}
              style={{ height: 2, borderRadius: 1 }} />
          </button>
        );
      })}
    </motion.nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ANIMATED COUNTER
═══════════════════════════════════════════════════════════════════ */
function AnimCounter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const ctrl = motionAnimate(0, to, {
      duration: 1.8, ease: "easeOut",
      onUpdate: (v) => { if (ref.current) ref.current.textContent = prefix + Math.round(v) + suffix; },
    });
    return ctrl.stop;
  }, [inView, to, suffix, prefix]);
  return <span ref={ref}>{prefix}0{suffix}</span>;
}

/* ═══════════════════════════════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════════════════════════════ */
function Reveal({ children, delay = 0, direction = "up", className, style }: {
  children: React.ReactNode; delay?: number;
  direction?: "up" | "left" | "right";
  className?: string; style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-6% 0px" });
  const map = { up: { y: 44, x: 0 }, left: { y: 0, x: -32 }, right: { y: 0, x: 32 } };
  const { x, y } = map[direction];
  return (
    <motion.div ref={ref} className={className} style={style}
      initial={{ opacity: 0, x, y }} animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.85, ease: EASE, delay }}>
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION WRAPPER — active tracking for nav
═══════════════════════════════════════════════════════════════════ */
function Section({ id, onActive, children, style, className }: {
  id: string; onActive: (id: string) => void;
  children: React.ReactNode; style?: React.CSSProperties; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-40% 0px -40% 0px" });
  useEffect(() => { if (inView) onActive(id); }, [inView, id, onActive]);
  return <section id={id} ref={ref} style={style} className={className}>{children}</section>;
}

/* ═══════════════════════════════════════════════════════════════════
   LIGHTBOX
═══════════════════════════════════════════════════════════════════ */
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }} onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(1rem, 4vw, 3rem)", background: "rgba(0,0,0,0.96)", backdropFilter: "blur(24px)", cursor: "zoom-out" }}>
      <button onClick={onClose} style={{ position: "absolute", top: "1.5rem", right: "1.5rem", width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", zIndex: 1 }}>
        <X size={18} />
      </button>
      <motion.div initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        style={{ position: "relative", width: "100%", maxWidth: "1100px", borderRadius: "1.25rem", overflow: "hidden", aspectRatio: "16/10", cursor: "default", boxShadow: "0 40px 120px rgba(0,0,0,0.8)" }}>
        <Image src={src} alt={alt} fill sizes="90vw" style={{ objectFit: "cover" }} />
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HAIRLINE DIVIDER
═══════════════════════════════════════════════════════════════════ */
const Divider = () => (
  <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: 0 }} />
);

/* ═══════════════════════════════════════════════════════════════════
   SECTION HEADER
═══════════════════════════════════════════════════════════════════ */
function SectionHeader({ eyebrow, title, accent, ghost }: { eyebrow: string; title: string; accent?: string; ghost?: string }) {
  return (
    <Reveal style={{ marginBottom: "clamp(3rem, 6vh, 5rem)" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
        <div>
          <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--brand-green)", marginBottom: "0.9rem", fontFamily: "'DM Sans', sans-serif" }}>{eyebrow}</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 900, letterSpacing: "-0.035em", lineHeight: 1.0, color: "#fff", fontFamily: "'DM Sans', sans-serif", margin: 0 }}>
            {title}{accent && <> <span style={{ color: "var(--brand-green)" }}>{accent}</span></>}
          </h2>
        </div>
        {ghost && (
          <span style={{ fontSize: "clamp(5rem, 10vw, 9rem)", fontWeight: 900, letterSpacing: "-0.06em", lineHeight: 1, color: "rgba(255,255,255,0.04)", fontFamily: "'DM Sans', sans-serif", userSelect: "none" }}>{ghost}</span>
        )}
      </div>
    </Reveal>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════════ */
export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = projects.find((p) => p.slug === slug);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("overview");
  const [nextHovered, setNextHovered] = useState(false);

  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const devSlugs: string[] = project.developedBy ?? [];
  const teamMembers = employees.filter((e) => devSlugs.includes(e.slug));
  const relatedProjects = projects.filter((p) => p.slug !== slug).slice(0, 3);

  /* Hero parallax */
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroContentO = useTransform(heroScroll, [0, 0.65], [1, 0]);

  /* Process phases — derived or fallback */
  const phases = [
    { icon: <Target size={16} />, label: "Discovery", duration: "Week 1–2", desc: "Stakeholder interviews, competitive audit, technical scoping, and success metric definition." },
    { icon: <FlaskConical size={16} />, label: "Strategy", duration: "Week 2–3", desc: "Information architecture, user flow mapping, and technical architecture blueprint." },
    { icon: <Layers size={16} />, label: "Design", duration: "Week 3–5", desc: "Design system creation, high-fidelity prototyping, and client review cycles." },
    { icon: <Lightbulb size={16} />, label: "Build", duration: "Week 5–10", desc: "Sprint-based engineering, continuous integration, and weekly demos." },
    { icon: <Rocket size={16} />, label: "Launch", duration: "Week 11", desc: "Zero-downtime deployment, performance audit, and post-launch monitoring." },
  ];

  /* Outcome KPIs — will be populated from project data if available, else use illustrative */
  const outcomes = project.outcomes ?? [
    { value: 94, suffix: "", prefix: "", label: "Lighthouse Score", sublabel: "Performance" },
    { value: 3, suffix: "×", prefix: "", label: "Faster Load Time", sublabel: "vs. Previous" },
    { value: 40, suffix: "%", prefix: "+", label: "Conversion Rate Lift", sublabel: "First 30 Days" },
    { value: 99, suffix: "%", prefix: "", label: "Uptime SLA", sublabel: "Post-Launch" },
  ];

  /* Design palette — fallback if not in data */
  const palette = project.palette ?? [
    { hex: "#000000", name: "Void Black" },
    { hex: "#00FF88", name: "Brand Green" },
    { hex: "#FFFFFF", name: "Pure White" },
    { hex: "#111111", name: "Deep Surface" },
    { hex: "#222222", name: "Elevated" },
  ];

  return (
    <main style={{ background: "#000", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", color: "#fff", overflowX: "hidden" }}>

      {/* Noise */}
      <div aria-hidden className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.022, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "256px" }} />

      <ReadingProgress />
      <SectionNav active={activeSection} />

      <AnimatePresence>
        {lightboxImg && <Lightbox src={lightboxImg} alt={project.name} onClose={() => setLightboxImg(null)} />}
      </AnimatePresence>

      {/* ╔══════════════════════════════════════
          ║  HERO — 100vh cinematic
          ╚══════════════════════════════════════ */}
      <section ref={heroRef} style={{ position: "relative", height: "100svh", minHeight: "600px", overflow: "hidden" }}>

        <motion.div style={{ position: "absolute", inset: "-15%", y: heroImgY }}>
          <Image src={project.image} alt={project.name} fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        </motion.div>

        {/* Gradient layers */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.0) 25%, rgba(0,0,0,0.65) 65%, #000 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 55%)" }} />

        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          style={{ position: "absolute", top: "clamp(5.5rem, 10vh, 7.5rem)", left: "clamp(1.5rem, 5vw, 4rem)", zIndex: 20 }}>
          <Link href="/portfolio" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.45rem 1rem", borderRadius: "100px", backdropFilter: "blur(20px)", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.75)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'DM Sans', sans-serif" }}>
            <ArrowLeft size={12} /> Portfolio
          </Link>
        </motion.div>

        {/* Tags top-right */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          style={{ position: "absolute", top: "clamp(5.5rem, 10vh, 7.5rem)", right: "clamp(1.5rem, 5vw, 4rem)", zIndex: 20, display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
          {project.tags.slice(0, 3).map((tag: string, i: number) => (
            <span key={i} style={{ padding: "0.28rem 0.72rem", borderRadius: "100px", fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", background: "rgba(0,0,0,0.55)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}>{tag}</span>
          ))}
        </motion.div>

        {/* Bottom content */}
        <motion.div style={{ opacity: heroContentO, position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 20, padding: "0 clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vh, 5rem)" }}>

          {/* Project counter */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
            style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "1.25rem" }}>
            <span style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--brand-green)", fontFamily: "'DM Sans', sans-serif" }}>
              Case Study {String(currentIndex + 1).padStart(2, "0")} of {String(projects.length).padStart(2, "0")}
            </span>
            <div style={{ width: "2rem", height: "1px", background: "rgba(255,255,255,0.2)" }} />
            <span style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif" }}>{project.client}</span>
          </motion.div>

          {/* Title */}
          <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
            style={{ fontSize: "clamp(3.5rem, 11vw, 10rem)", fontWeight: 900, lineHeight: 0.88, letterSpacing: "-0.045em", color: "#fff", margin: "0 0 2.5rem", fontFamily: "'DM Sans', sans-serif" }}>
            {project.name}
          </motion.h1>

          {/* Meta pills */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8, ease: EASE }}
            style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem" }}>
            {[
              { icon: <Building2 size={11} />, text: project.client },
              { icon: <Calendar size={11} />, text: project.year },
              { icon: <Clock size={11} />, text: project.duration },
            ].map((m, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.38rem 0.85rem", borderRadius: "100px", background: "rgba(0,0,0,0.55)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.1)", fontSize: "0.68rem", fontWeight: 600, color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans', sans-serif" }}>
                <span style={{ color: "var(--brand-green)", display: "flex" }}>{m.icon}</span>
                {m.text}
              </div>
            ))}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", padding: "0.38rem 1.1rem", borderRadius: "100px", background: "var(--brand-green)", color: "#000", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'DM Sans', sans-serif" }}>
                Live Site <ExternalLink size={11} strokeWidth={2.5} />
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.8 }}
          style={{ position: "absolute", bottom: "2rem", right: "clamp(1.5rem, 5vw, 4rem)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", zIndex: 20 }}>
          <div style={{ width: 1, height: "2.5rem", overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.1)" }} />
            <motion.div animate={{ y: ["-100%", "200%"] }} transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.4 }}
              style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(to bottom, transparent, var(--brand-green))" }} />
          </div>
          <span style={{ fontSize: "0.46rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)", writingMode: "vertical-rl", fontFamily: "'DM Sans', sans-serif" }}>Scroll</span>
        </motion.div>
      </section>

      <Divider />

      {/* ╔══════════════════════════════════════
          ║  OVERVIEW — Sticky split layout
          ╚══════════════════════════════════════ */}
      <Section id="overview" onActive={setActiveSection}
        style={{ padding: "clamp(5rem, 10vh, 8rem) 0", position: "relative" }}>
        <div aria-hidden style={{ position: "absolute", top: 0, left: "-10%", width: "55vw", height: "100%", pointerEvents: "none", background: "radial-gradient(ellipse 50% 50% at 20% 40%, color-mix(in srgb, var(--brand-green) 5%, transparent), transparent)" }} />
        <div className="mx-auto max-w-[1400px]" style={{ padding: "0 clamp(1.5rem, 5vw, 4rem)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: "clamp(3rem, 5vw, 5rem)" }}>
            <div className="lg:col-span-4 lg:sticky lg:top-32" style={{ alignSelf: "start" }}>
              <Reveal>
                <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--brand-green)", marginBottom: "1.25rem", fontFamily: "'DM Sans', sans-serif" }}>Project Overview</p>
                <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", color: "#fff", marginBottom: "2rem", fontFamily: "'DM Sans', sans-serif" }}>{project.description}</h2>
                <span style={{ fontSize: "clamp(5rem, 10vw, 8rem)", fontWeight: 900, letterSpacing: "-0.06em", lineHeight: 1, color: "rgba(255,255,255,0.04)", fontFamily: "'DM Sans', sans-serif", display: "block", userSelect: "none" }}>
                  {String(currentIndex + 1).padStart(2, "0")}
                </span>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <Reveal delay={0.12}>
                <p style={{ fontSize: "clamp(1rem, 1.2vw, 1.1rem)", lineHeight: 1.9, color: "rgba(255,255,255,0.42)", marginBottom: "3.5rem", fontFamily: "'DM Sans', sans-serif" }}>
                  {project.longDescription}
                </p>
                {/* Tech stack */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
                    <span style={{ fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>Technology Stack</span>
                    <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {project.techStack.map((tech: string, i: number) => (
                      <motion.span key={i}
                        initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.04 }}
                        whileHover={{ background: "rgba(0,255,136,0.07)", borderColor: "rgba(0,255,136,0.22)", color: "rgba(0,255,136,0.9)" }}
                        style={{ padding: "0.4rem 1rem", borderRadius: "8px", fontSize: "0.72rem", fontWeight: 600, color: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", cursor: "default", transition: "all 0.25s", fontFamily: "'DM Sans', sans-serif" }}>
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      <Divider />

      {/* ╔══════════════════════════════════════
          ║  PROBLEM STATEMENT
          ╚══════════════════════════════════════ */}
      <Section id="problem" onActive={setActiveSection}
        style={{ padding: "clamp(5rem, 10vh, 8rem) 0", background: "rgba(255,255,255,0.01)" }}>
        <div className="mx-auto max-w-[1400px]" style={{ padding: "0 clamp(1.5rem, 5vw, 4rem)" }}>
          <SectionHeader eyebrow="The Challenge" title="What we were" accent="hired to solve." ghost="!" />

          {/* Big framed problem quote */}
          <Reveal>
            <div style={{ position: "relative", padding: "clamp(2.5rem, 5vw, 4rem)", borderRadius: "1.5rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", marginBottom: "clamp(3rem, 6vh, 5rem)", overflow: "hidden" }}>
              {/* Large quote mark */}
              <span aria-hidden style={{ position: "absolute", top: "-1rem", left: "2rem", fontSize: "12rem", fontWeight: 900, lineHeight: 1, color: "rgba(0,255,136,0.05)", fontFamily: "'DM Sans', sans-serif", userSelect: "none", pointerEvents: "none" }}>"</span>
              <p style={{ fontSize: "clamp(1.3rem, 2.5vw, 2rem)", lineHeight: 1.5, fontWeight: 600, color: "rgba(255,255,255,0.75)", position: "relative", zIndex: 1, fontFamily: "'DM Sans', sans-serif", maxWidth: "70ch" }}>
                {project.challenges}
              </p>
            </div>
          </Reveal>

          {/* Features list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: "1px", background: "rgba(255,255,255,0.05)", borderRadius: "1.25rem", overflow: "hidden" }}>
            {(Array.isArray(project.features) ? project.features : []).map((feature: string, i: number) => (
              <Reveal key={i} delay={i * 0.07}>
                <div style={{ background: "#000", padding: "2rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "8px", background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "0.1rem" }}>
                    <CheckCircle size={14} style={{ color: "var(--brand-green)" }} />
                  </div>
                  <p style={{ fontSize: "0.9rem", lineHeight: 1.65, color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans', sans-serif", margin: 0 }}>{feature}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Divider />

      {/* ╔══════════════════════════════════════
          ║  PROCESS TIMELINE
          ╚══════════════════════════════════════ */}
      <Section id="process" onActive={setActiveSection}
        style={{ padding: "clamp(5rem, 10vh, 8rem) 0", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", top: "10%", right: "-10%", width: "50vw", height: "80%", pointerEvents: "none", background: "radial-gradient(ellipse 50% 50% at 80% 50%, color-mix(in srgb, var(--brand-green) 4%, transparent), transparent)" }} />
        <div className="mx-auto max-w-[1400px]" style={{ padding: "0 clamp(1.5rem, 5vw, 4rem)" }}>
          <SectionHeader eyebrow="Our Approach" title="How the project" accent="came to life." ghost="05" />

          {/* Timeline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {phases.map((phase, i) => (
              <PhaseRow key={phase.label} phase={phase} index={i} total={phases.length} />
            ))}
          </div>
        </div>
      </Section>

      <Divider />

      {/* ╔══════════════════════════════════════
          ║  SOLUTION — features deep dive
          ╚══════════════════════════════════════ */}
      <Section id="solution" onActive={setActiveSection}
        style={{ padding: "clamp(5rem, 10vh, 8rem) 0", background: "rgba(255,255,255,0.01)" }}>
        <div className="mx-auto max-w-[1400px]" style={{ padding: "0 clamp(1.5rem, 5vw, 4rem)" }}>
          <SectionHeader eyebrow="The Solution" title="What we built &" accent="how it works." />

          {/* Alternating feature rows */}
          {(Array.isArray(project.features) ? project.features : []).map((feature: string, i: number) => (
            <FeatureRow key={i} text={feature} index={i} />
          ))}
        </div>
      </Section>

      <Divider />

      {/* ╔══════════════════════════════════════
          ║  OUTCOMES — animated KPIs
          ╚══════════════════════════════════════ */}
      <Section id="outcomes" onActive={setActiveSection}
        style={{ padding: "clamp(5rem, 10vh, 8rem) 0", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 70% 60% at 50% 100%, color-mix(in srgb, var(--brand-green) 7%, transparent), transparent)" }} />
        <div className="mx-auto max-w-[1400px]" style={{ padding: "0 clamp(1.5rem, 5vw, 4rem)" }}>
          <SectionHeader eyebrow="Impact & Results" title="Outcomes that" accent="speak for themselves." />

          {/* KPI grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: "1px", background: "rgba(255,255,255,0.06)", borderRadius: "1.5rem", overflow: "hidden", marginBottom: "clamp(4rem, 8vh, 6rem)" }}>
            {outcomes.map((kpi: { value: number; suffix: string; prefix: string; label: string; sublabel: string }, i: number) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{ background: "#000", padding: "clamp(2rem, 4vw, 3rem) clamp(1.5rem, 3vw, 2.5rem)", textAlign: "center", position: "relative" }}
                  className="group">
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,255,136,0.03)", opacity: 0, transition: "opacity 0.4s" }} className="group-hover:!opacity-100" />
                  <div style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1, color: "var(--brand-green)", fontFamily: "'DM Sans', sans-serif", marginBottom: "0.6rem" }}>
                    <AnimCounter to={kpi.value} suffix={kpi.suffix} prefix={kpi.prefix} />
                  </div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#fff", marginBottom: "0.25rem", fontFamily: "'DM Sans', sans-serif" }}>{kpi.label}</div>
                  <div style={{ fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", fontFamily: "'DM Sans', sans-serif" }}>{kpi.sublabel}</div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Client testimonial */}
          {project.testimonial && (
            <Reveal>
              <div style={{ position: "relative", padding: "clamp(2.5rem, 5vw, 4.5rem)", borderRadius: "1.5rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
                <Quote size={64} style={{ position: "absolute", top: "1.5rem", right: "2rem", color: "rgba(0,255,136,0.07)" }} />
                <p style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.7rem)", lineHeight: 1.55, fontWeight: 500, color: "rgba(255,255,255,0.78)", marginBottom: "2rem", maxWidth: "68ch", fontFamily: "'DM Sans', sans-serif", fontStyle: "italic", position: "relative", zIndex: 1 }}>
                  "{project.testimonial.quote}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "1rem", color: "var(--brand-green)", fontWeight: 800, fontFamily: "'DM Sans', sans-serif" }}>
                      {project.testimonial.author?.[0] ?? "C"}
                    </span>
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "#fff", marginBottom: "0.15rem", fontFamily: "'DM Sans', sans-serif" }}>{project.testimonial.author}</p>
                    <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.32)", fontFamily: "'DM Sans', sans-serif" }}>{project.testimonial.role} — {project.client}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </Section>

      <Divider />

      {/* ╔══════════════════════════════════════
          ║  DESIGN DECISIONS
          ╚══════════════════════════════════════ */}
      <Section id="design" onActive={setActiveSection}
        style={{ padding: "clamp(5rem, 10vh, 8rem) 0" }}>
        <div className="mx-auto max-w-[1400px]" style={{ padding: "0 clamp(1.5rem, 5vw, 4rem)" }}>
          <SectionHeader eyebrow="Design Language" title="Visual system &" accent="decisions made." />

          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "clamp(2rem, 4vw, 4rem)" }}>
            {/* Color palette */}
            <Reveal direction="left">
              <div style={{ padding: "2.5rem", borderRadius: "1.25rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginBottom: "1.5rem", fontFamily: "'DM Sans', sans-serif" }}>Color Palette</p>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  {palette.map((c: { hex: string; name: string }, i: number) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "center" }}>
                      <div style={{ width: 52, height: 52, borderRadius: "12px", background: c.hex, border: "1px solid rgba(255,255,255,0.1)", boxShadow: c.hex !== "#000000" ? `0 8px 24px ${c.hex}33` : "none" }} />
                      <span style={{ fontSize: "0.52rem", fontWeight: 600, color: "rgba(255,255,255,0.3)", fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.1em" }}>{c.name}</span>
                      <span style={{ fontSize: "0.5rem", fontWeight: 600, color: "rgba(255,255,255,0.18)", fontFamily: "monospace" }}>{c.hex}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Typography specimen */}
            <Reveal direction="right">
              <div style={{ padding: "2.5rem", borderRadius: "1.25rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginBottom: "1.5rem", fontFamily: "'DM Sans', sans-serif" }}>Typography</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div>
                    <span style={{ fontSize: "0.52rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(0,255,136,0.6)", display: "block", marginBottom: "0.3rem", fontFamily: "'DM Sans', sans-serif" }}>Display / Hero</span>
                    <p style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1, color: "#fff", fontFamily: "'DM Sans', sans-serif", margin: 0 }}>Aa Bb Cc</p>
                  </div>
                  <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />
                  <div>
                    <span style={{ fontSize: "0.52rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(0,255,136,0.6)", display: "block", marginBottom: "0.3rem", fontFamily: "'DM Sans', sans-serif" }}>Body / UI</span>
                    <p style={{ fontSize: "1rem", fontWeight: 500, lineHeight: 1.7, color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans', sans-serif", margin: 0 }}>The quick brown fox jumps over the lazy dog. Clean, legible, optimized for screen reading at any scale.</p>
                  </div>
                  <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />
                  <div>
                    <span style={{ fontSize: "0.52rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(0,255,136,0.6)", display: "block", marginBottom: "0.3rem", fontFamily: "'DM Sans', sans-serif" }}>Labels / Eyebrows</span>
                    <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--brand-green)", fontFamily: "'DM Sans', sans-serif", margin: 0 }}>SECTION LABEL — CODO AI</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Key learnings */}
            <Reveal direction="left" style={{ gridColumn: "1 / -1" }}>
              <div style={{ padding: "2.5rem", borderRadius: "1.25rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginBottom: "1.75rem", fontFamily: "'DM Sans', sans-serif" }}>Key Learnings</p>
                <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "2rem" }}>
                  {[
                    { num: "01", title: "Scope clarity is speed", body: "The most impactful thing we did early was define what the product would *not* do. Clear scope eliminated entire categories of re-work." },
                    { num: "02", title: "Design in the real medium", body: "Prototypes that ran in the browser surfaced interaction edge cases weeks earlier than static mockups ever would have." },
                    { num: "03", title: "Ship, measure, iterate", body: "The first production deployment revealed real usage patterns that redirected our Q2 roadmap. The data was right; our assumptions were wrong." },
                  ].map((item) => (
                    <div key={item.num}>
                      <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.15em", color: "var(--brand-green)", display: "block", marginBottom: "0.6rem", fontFamily: "'DM Sans', sans-serif" }}>{item.num}</span>
                      <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: "0.6rem", fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.01em" }}>{item.title}</h4>
                      <p style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "rgba(255,255,255,0.38)", fontFamily: "'DM Sans', sans-serif", margin: 0 }}>{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Divider />

      {/* ╔══════════════════════════════════════
          ║  GALLERY
          ╚══════════════════════════════════════ */}
      {project.gallery?.length > 0 && (
        <Section id="gallery" onActive={setActiveSection}
          style={{ padding: "clamp(5rem, 10vh, 8rem) 0" }}>
          <div className="mx-auto max-w-[1400px]" style={{ padding: "0 clamp(1.5rem, 5vw, 4rem)" }}>
            <SectionHeader eyebrow="Project Gallery" title="Visual" accent="showcase." ghost={String(project.gallery.length).padStart(2, "0")} />

            <div style={{ display: "grid", gap: "1px", background: "rgba(255,255,255,0.05)", borderRadius: "1.5rem", overflow: "hidden" }}>
              {project.gallery[0] && (
                <GalleryItem src={project.gallery[0]} alt={`${project.name} 1`} aspect="21/9" onClick={() => setLightboxImg(project.gallery[0])} />
              )}
              {project.gallery.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "1px" }}>
                  {project.gallery.slice(1).map((img: string, i: number) => (
                    <Reveal key={i} delay={i * 0.06}>
                      <GalleryItem src={img} alt={`${project.name} ${i + 2}`} aspect="16/10" onClick={() => setLightboxImg(img)} />
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Section>
      )}

      <Divider />

      {/* ╔══════════════════════════════════════
          ║  TEAM
          ╚══════════════════════════════════════ */}
      <Section id="team" onActive={setActiveSection}
        style={{ padding: "clamp(5rem, 10vh, 8rem) 0", background: "rgba(255,255,255,0.01)" }}>
        <div className="mx-auto max-w-[1400px]" style={{ padding: "0 clamp(1.5rem, 5vw, 4rem)" }}>
          <SectionHeader eyebrow="Project Credits" title="The people who" accent="made it real." />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "1px", background: "rgba(255,255,255,0.05)", borderRadius: "1.5rem", overflow: "hidden" }}>
            {teamMembers.map((member, i) => (
              <Reveal key={member.slug} delay={i * 0.07}>
                <Link href={`/team/${member.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                  <TeamCard member={member} />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Divider />

      {/* ╔══════════════════════════════════════
          ║  RELATED PROJECTS
          ╚══════════════════════════════════════ */}
      <section style={{ padding: "clamp(5rem, 10vh, 8rem) 0" }}>
        <div className="mx-auto max-w-[1400px]" style={{ padding: "0 clamp(1.5rem, 5vw, 4rem)" }}>
          <SectionHeader eyebrow="More Work" title="You might also" accent="like these." />

          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "1px", background: "rgba(255,255,255,0.05)", borderRadius: "1.5rem", overflow: "hidden" }}>
            {relatedProjects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link href={`/portfolio/${p.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                  <RelatedCard project={p} />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ╔══════════════════════════════════════
          ║  NEXT PROJECT — full bleed hover
          ╚══════════════════════════════════════ */}
      {nextProject && (
        <Link href={`/portfolio/${nextProject.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
          <section
            onMouseEnter={() => setNextHovered(true)}
            onMouseLeave={() => setNextHovered(false)}
            style={{ position: "relative", overflow: "hidden", minHeight: "55vh", display: "flex", alignItems: "center", cursor: "pointer" }}>
            <motion.div animate={{ scale: nextHovered ? 1.06 : 1, opacity: nextHovered ? 0.35 : 0.1 }}
              transition={{ duration: 0.9, ease: EASE }}
              style={{ position: "absolute", inset: 0 }}>
              <Image src={nextProject.image} alt={nextProject.name} fill sizes="100vw" style={{ objectFit: "cover" }} />
            </motion.div>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #000 40%, transparent 100%)" }} />
            <motion.div animate={{ opacity: nextHovered ? 1 : 0 }} transition={{ duration: 0.6 }}
              style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 60% 80% at 70% 50%, color-mix(in srgb, var(--brand-green) 8%, transparent), transparent)" }} />

            <div className="mx-auto max-w-[1400px] w-full relative z-10"
              style={{ padding: "clamp(5rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem)" }}>
              <Reveal>
                <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: nextHovered ? "var(--brand-green)" : "rgba(255,255,255,0.22)", marginBottom: "1.5rem", fontFamily: "'DM Sans', sans-serif", transition: "color 0.4s" }}>Next Case Study</p>
                <motion.h2
                  animate={{ x: nextHovered ? 14 : 0, color: nextHovered ? "var(--brand-green)" : "#fff" }}
                  transition={{ duration: 0.5, ease: EASE }}
                  style={{ fontSize: "clamp(3rem, 10vw, 9rem)", fontWeight: 900, letterSpacing: "-0.045em", lineHeight: 0.9, margin: "0 0 2.5rem", fontFamily: "'DM Sans', sans-serif" }}>
                  {nextProject.name}
                </motion.h2>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: nextHovered ? "#fff" : "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif", transition: "color 0.4s" }}>View Case Study</span>
                  <motion.div animate={{ background: nextHovered ? "var(--brand-green)" : "transparent", borderColor: nextHovered ? "var(--brand-green)" : "rgba(255,255,255,0.15)" }}
                    transition={{ duration: 0.35 }}
                    style={{ width: 42, height: 42, borderRadius: "50%", border: "1px solid", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <motion.div animate={{ color: nextHovered ? "#000" : "rgba(255,255,255,0.4)" }} transition={{ duration: 0.3 }}>
                      <ArrowRight size={16} strokeWidth={2.5} />
                    </motion.div>
                  </motion.div>
                </div>
              </Reveal>
            </div>
          </section>
        </Link>
      )}
    </main>
  );
}

/* ════════════════════════════════════════════════
   PHASE ROW — process timeline
════════════════════════════════════════════════ */
function PhaseRow({ phase, index, total }: { phase: { icon: React.ReactNode; label: string; duration: string; desc: string }; index: number; total: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const isLast = index === total - 1;

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.09 }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: "grid", alignItems: "start", gap: "1.5rem", padding: "2rem 0", borderBottom: isLast ? "none" : "1px solid rgba(255,255,255,0.05)", position: "relative", cursor: "default" }}
      className="grid-cols-[2.5rem_1fr] md:grid-cols-[2.5rem_10rem_1fr_8rem]">

      {/* Left accent */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: hovered ? "var(--brand-green)" : "transparent", transition: "background 0.35s", borderRadius: 1 }} />

      {/* Icon */}
      <div style={{ width: 36, height: 36, borderRadius: "10px", background: hovered ? "var(--brand-green)" : "rgba(255,255,255,0.04)", border: "1px solid", borderColor: hovered ? "var(--brand-green)" : "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.35s", color: hovered ? "#000" : "rgba(255,255,255,0.3)", flexShrink: 0 }}>
        {phase.icon}
      </div>

      {/* Phase label */}
      <div>
        <span style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.12em", color: hovered ? "var(--brand-green)" : "rgba(255,255,255,0.22)", display: "block", marginBottom: "0.2rem", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", transition: "color 0.3s" }}>Phase {String(index + 1).padStart(2, "0")}</span>
        <h4 style={{ fontSize: "1rem", fontWeight: 700, color: hovered ? "#fff" : "rgba(255,255,255,0.65)", fontFamily: "'DM Sans', sans-serif", margin: 0, transition: "color 0.3s", letterSpacing: "-0.01em" }}>{phase.label}</h4>
      </div>

      {/* Description */}
      <p style={{ fontSize: "0.88rem", lineHeight: 1.72, color: hovered ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.28)", fontFamily: "'DM Sans', sans-serif", margin: 0, transition: "color 0.35s" }} className="col-span-2 md:col-span-1">
        {phase.desc}
      </p>

      {/* Duration */}
      <div style={{ textAlign: "right" }} className="hidden md:block">
        <span style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.1em", color: hovered ? "var(--brand-green)" : "rgba(255,255,255,0.2)", fontFamily: "'DM Sans', sans-serif", transition: "color 0.3s" }}>{phase.duration}</span>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════
   FEATURE ROW — alternating layout
════════════════════════════════════════════════ */
function FeatureRow({ text, index }: { text: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-6% 0px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
      style={{ display: "flex", flexDirection: "column", gap: "1.5rem", padding: "2rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)", alignItems: "flex-start" }}
      className={`md:flex-row md:items-center ${isEven ? "" : "md:flex-row-reverse"}`}>
      {/* Number bubble */}
      <div style={{ width: 56, height: 56, borderRadius: "14px", background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span style={{ fontSize: "1.1rem", fontWeight: 900, color: "var(--brand-green)", fontFamily: "'DM Sans', sans-serif" }}>{String(index + 1).padStart(2, "0")}</span>
      </div>
      {/* Bar */}
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.05)" }} className="hidden md:block" />
      {/* Text */}
      <p style={{ fontSize: "clamp(1rem, 1.3vw, 1.15rem)", lineHeight: 1.72, color: "rgba(255,255,255,0.55)", maxWidth: "55ch", fontFamily: "'DM Sans', sans-serif", margin: 0 }}>
        {text}
      </p>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════
   GALLERY ITEM
════════════════════════════════════════════════ */
function GalleryItem({ src, alt, aspect, onClick }: { src: string; alt: string; aspect: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ position: "relative", aspectRatio: aspect, overflow: "hidden", cursor: "zoom-in", background: "#0a0a0a" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={onClick}>
      <Image src={src} alt={alt} fill sizes="100vw" style={{ objectFit: "cover", transform: hovered ? "scale(1.04)" : "scale(1)", transition: "transform 1s cubic-bezier(0.22,1,0.36,1)" }} />
      <div style={{ position: "absolute", inset: 0, background: hovered ? "rgba(0,0,0,0.2)" : "transparent", transition: "background 0.4s" }} />
      <motion.div animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3 }}
        style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
          <ArrowUpRight size={20} />
        </div>
      </motion.div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   TEAM CARD
════════════════════════════════════════════════ */
function TeamCard({ member }: { member: any }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: "#000", padding: "2rem", display: "flex", alignItems: "center", gap: "1.25rem", position: "relative", overflow: "hidden", transition: "all 0.3s" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,255,136,0.02)", opacity: hovered ? 1 : 0, transition: "opacity 0.35s", pointerEvents: "none" }} />
      <div style={{ position: "relative", width: 50, height: 50, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "2px solid", borderColor: hovered ? "var(--brand-green)" : "rgba(255,255,255,0.1)", transition: "border-color 0.35s" }}>
        <Image src={member.photo} alt={member.name} fill style={{ objectFit: "cover", filter: hovered ? "none" : "grayscale(40%)", transition: "filter 0.5s" }} />
      </div>
      <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
        <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: hovered ? "var(--brand-green)" : "#fff", transition: "color 0.3s", marginBottom: "0.2rem", fontFamily: "'DM Sans', sans-serif" }}>{member.name}</h4>
        <p style={{ fontSize: "0.66rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", fontFamily: "'DM Sans', sans-serif", margin: 0 }}>{member.role}</p>
      </div>
      <div style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid", borderColor: hovered ? "var(--brand-green)" : "rgba(255,255,255,0.08)", background: hovered ? "var(--brand-green)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s", flexShrink: 0, position: "relative", zIndex: 1 }}>
        <ArrowUpRight size={13} style={{ color: hovered ? "#000" : "rgba(255,255,255,0.25)", transition: "color 0.3s" }} />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   RELATED CARD
════════════════════════════════════════════════ */
function RelatedCard({ project }: { project: any }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: "#000", padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ position: "relative", aspectRatio: "16/10", borderRadius: "0.85rem", overflow: "hidden" }}>
        <Image src={project.image} alt={project.name} fill sizes="33vw" style={{ objectFit: "cover", transform: hovered ? "scale(1.05)" : "scale(1)", transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1)" }} />
      </div>
      <div>
        <span style={{ fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--brand-green)", display: "block", marginBottom: "0.45rem", fontFamily: "'DM Sans', sans-serif" }}>{project.category}</span>
        <h3 style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2, color: hovered ? "#fff" : "rgba(255,255,255,0.65)", transition: "color 0.3s", fontFamily: "'DM Sans', sans-serif", margin: 0 }}>{project.name}</h3>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", fontFamily: "'DM Sans', sans-serif", transition: "color 0.3s" }}
          className={hovered ? "!text-white" : ""}>View Case Study</span>
        <ArrowUpRight size={13} style={{ color: hovered ? "var(--brand-green)" : "rgba(255,255,255,0.2)", transition: "color 0.3s" }} />
      </div>
    </div>
  );
}