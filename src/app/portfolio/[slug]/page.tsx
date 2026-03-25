"use client";

import { useRef, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { TransitionLink as Link } from "@/components/transition/TransitionLink";
import { projects } from "@/data/projects";
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Building2, Clock, ExternalLink, X } from "lucide-react";
import { use } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── Reveal ─────────────────────────────────────────────────────── */
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
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Lightbox ───────────────────────────────────────────────────── */
function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-12 cursor-zoom-out"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(20px)" }}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
        style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}
      >
        <X size={20} />
      </button>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="relative w-full max-w-5xl rounded-2xl overflow-hidden"
        style={{ aspectRatio: "16/10" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={src} alt={alt} fill className="object-cover" sizes="90vw" />
      </motion.div>
    </motion.div>
  );
}

/* ─── Page ────────────────────────────────────────────────────────── */
export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const project = projects.find((p) => p.slug === slug);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: "#000", fontFamily: "'DM Sans', sans-serif", color: "#fff" }}
    >
      {/* Noise grain */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "256px",
        }}
      />

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <Lightbox
            src={lightboxImage}
            alt={project.name}
            onClose={() => setLightboxImage(null)}
          />
        )}
      </AnimatePresence>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative" style={{ height: "75vh", minHeight: "500px" }}>
        <Image src={project.image} alt={project.name} fill priority className="object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 50%, #000 100%)",
          }}
        />

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute top-0 left-0 z-10"
          style={{ paddingTop: "clamp(6rem, 10vh, 8rem)", paddingLeft: "clamp(1.5rem, 5vw, 4rem)" }}
        >
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full backdrop-blur-xl transition-all duration-300 hover:scale-105"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#fff",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
            Portfolio
          </Link>
        </motion.div>

        {/* Title overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10"
          style={{ padding: "0 clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vh, 5rem)" }}
        >
          <div className="mx-auto max-w-[1400px]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            >
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full"
                    style={{
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.6)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1
                style={{
                  fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                  fontWeight: 900,
                  lineHeight: 0.95,
                  letterSpacing: "-0.04em",
                  color: "#fff",
                  margin: 0,
                }}
              >
                {project.name}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Info Bar ──────────────────────────────────────────────────── */}
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-12 gap-y-6 py-8">
              {[
                { icon: <Building2 size={14} />, label: "Client", value: project.client },
                { icon: <Calendar size={14} />, label: "Year", value: project.year },
                { icon: <Clock size={14} />, label: "Duration", value: project.duration },
              ].map((meta, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="text-[var(--brand-green)] opacity-60">{meta.icon}</div>
                  <div>
                    <div className="text-[0.55rem] font-bold uppercase tracking-[0.15em] text-white/30 mb-0.5">{meta.label}</div>
                    <div className="text-[0.9rem] font-semibold text-white/80">{meta.value}</div>
                  </div>
                </div>
              ))}

              {/* Live URL */}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group ml-auto inline-flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
                  style={{
                    background: "var(--brand-green)",
                    color: "#000",
                    textDecoration: "none",
                    fontWeight: 800,
                    fontSize: "0.8rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  Visit Live Site
                  <ExternalLink size={14} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Description ──────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Lead */}
            <div className="lg:col-span-5">
              <Reveal>
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.3em] text-[var(--brand-green)] mb-6">
                  About This Project
                </p>
                <p
                  style={{
                    fontSize: "clamp(1.25rem, 2.2vw, 1.6rem)",
                    lineHeight: 1.5,
                    fontWeight: 600,
                    color: "#fff",
                  }}
                >
                  {project.description}
                </p>
              </Reveal>
            </div>

            {/* Body */}
            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <p
                  style={{
                    fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
                    lineHeight: 1.85,
                    color: "rgba(255,255,255,0.45)",
                  }}
                >
                  {project.longDescription}
                </p>

                {/* Divider */}
                <div
                  className="my-10"
                  style={{
                    height: "1px",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.08) 80%, transparent)",
                  }}
                />

                {/* Tech stack */}
                <div>
                  <h3 className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-white/35 mb-4">
                    Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-full text-[0.78rem] font-semibold transition-all duration-300 hover:bg-[var(--brand-green)]/10 hover:border-[var(--brand-green)]/25 hover:text-[var(--brand-green)]"
                        style={{
                          color: "rgba(255,255,255,0.55)",
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery ──────────────────────────────────────────────────── */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="pb-20 md:pb-28">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
            <Reveal>
              <div className="flex items-end justify-between mb-12">
                <div>
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.3em] text-[var(--brand-green)] mb-4">
                    Project Gallery
                  </p>
                  <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-black tracking-tight text-white leading-none">
                    Visual <span className="text-[var(--brand-green)]">Showcase</span>
                  </h2>
                </div>
                <span className="hidden md:block text-[0.62rem] font-bold uppercase tracking-[0.15em] text-white/20">
                  {project.gallery.length} {project.gallery.length === 1 ? "Image" : "Images"}
                </span>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {project.gallery.map((img, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <button
                    onClick={() => setLightboxImage(img)}
                    className="group relative w-full overflow-hidden rounded-2xl cursor-zoom-in border border-white/5 transition-all duration-500 hover:border-[var(--brand-green)]/20"
                    style={{ aspectRatio: "16/11" }}
                  >
                    <Image
                      src={img}
                      alt={`${project.name} screenshot ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: "linear-gradient(135deg, rgba(0,255,136,0.1), transparent 60%)" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center">
                        <ArrowUpRight size={18} className="text-white" />
                      </div>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Next Project ─────────────────────────────────────────────── */}
      {nextProject && (
        <section className="border-t border-white/5">
          <Link
            href={`/portfolio/${nextProject.slug}`}
            className="group block no-underline text-inherit"
          >
            <div className="mx-auto max-w-[1400px] px-6 lg:px-16 py-20 md:py-28">
              <Reveal>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-12">
                  <div>
                    <p className="text-[0.62rem] font-bold uppercase tracking-[0.3em] text-white/25 mb-4">
                      Next Project
                    </p>
                    <h2
                      className="transition-colors duration-300 group-hover:text-[var(--brand-green)]"
                      style={{
                        fontSize: "clamp(2rem, 5vw, 4rem)",
                        fontWeight: 900,
                        letterSpacing: "-0.04em",
                        lineHeight: 1,
                        color: "#fff",
                      }}
                    >
                      {nextProject.name}
                    </h2>
                    <div className="flex items-center gap-3 mt-6">
                      <span className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white/30 transition-colors duration-300 group-hover:text-white">
                        View Case Study
                      </span>
                      <div className="relative w-8 h-8 rounded-full flex items-center justify-center border border-white/10 text-white/40 transition-all duration-300 group-hover:bg-[var(--brand-green)] group-hover:text-black group-hover:border-[var(--brand-green)]">
                        <ArrowRight size={14} strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>

                  <div
                    className="relative w-full md:w-[320px] lg:w-[400px] flex-shrink-0 rounded-2xl overflow-hidden border border-white/5 transition-all duration-500 group-hover:border-[var(--brand-green)]/20"
                    style={{ aspectRatio: "16/10" }}
                  >
                    <Image
                      src={nextProject.image}
                      alt={nextProject.name}
                      fill
                      sizes="400px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  </div>
                </div>
              </Reveal>
            </div>
          </Link>
        </section>
      )}
    </main>
  );
}
