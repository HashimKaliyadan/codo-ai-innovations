"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { TransitionLink as Link } from "@/components/transition/TransitionLink";
import { projects } from "@/data/projects";
import { ArrowDown } from "lucide-react";

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
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Project card
───────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  return (
    <Reveal delay={index % 2 === 1 ? 0.15 : 0}>
      <Link
        href={`/portfolio/${project.slug}`}
        className="group block"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {/* Image container */}
        <div
          className="overflow-hidden relative"
          style={{
            borderRadius: "2rem",
            aspectRatio: "4 / 3",
            background: project.gradient,
          }}
        >
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Hover overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)",
            }}
          />
        </div>

        {/* Category tags */}
        <div
          style={{
            marginTop: "1.25rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.35rem",
            alignItems: "center",
          }}
        >
          {project.tags.map((tag, i) => (
            <span key={i}>
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                {tag}
              </span>
              {i < project.tags.length - 1 && (
                <span
                  style={{
                    margin: "0 0.4rem",
                    fontSize: "0.5rem",
                    color: "rgba(255,255,255,0.2)",
                  }}
                >
                  •
                </span>
              )}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3
          className="relative inline-block"
          style={{
            marginTop: "0.5rem",
            fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
          }}
        >
          {project.name}
          {/* Underline reveal on hover */}
          <span
            className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out"
            style={{ background: "var(--brand-green)" }}
          />
        </h3>
      </Link>
    </Reveal>
  );
}

/* ─────────────────────────────────────────────
   Main portfolio page
───────────────────────────────────────────── */
export default function PortfolioPage() {
  const total = projects.length;

  // Split projects into left and right columns for the stagger
  const leftProjects = projects.filter((_, i) => i % 2 === 0);
  const rightProjects = projects.filter((_, i) => i % 2 === 1);

  return (
    <main
      className="relative min-h-screen"
      style={{
        background: "var(--background)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* ── Hero Section ─────────────────────────────────────────────── */}
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
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "500px",
            background:
              "radial-gradient(ellipse, color-mix(in srgb, var(--brand-green) 6%, transparent) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="mx-auto max-w-[1400px] relative">
          {/* Massive PORTFOLIO text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-end justify-between"
          >
            <h1
              style={{
                fontSize: "clamp(4rem, 14vw, 12rem)",
                fontWeight: 900,
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              PORT
              <span style={{ color: "var(--brand-green)" }}>FOLIO</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── Projects Grid ────────────────────────────────────────────── */}
      <section
        style={{
          paddingLeft: "clamp(1.5rem, 5vw, 4rem)",
          paddingRight: "clamp(1.5rem, 5vw, 4rem)",
          paddingBottom: "clamp(6rem, 12vh, 10rem)",
        }}
      >
        <div className="mx-auto max-w-[1400px]">
          {/* Mobile: single column */}
          <div className="block md:hidden">
            <div className="flex flex-col gap-16">
              {projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </div>

          {/* Desktop: staggered 2-column grid */}
          <div className="hidden md:grid grid-cols-2 gap-x-8 lg:gap-x-12">
            {/* Left column */}
            <div className="flex flex-col gap-16 lg:gap-20">
              {leftProjects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i * 2}
                />
              ))}
            </div>

            {/* Right column — offset downward for stagger effect */}
            <div
              className="flex flex-col gap-16 lg:gap-20"
              style={{ marginTop: "clamp(6rem, 12vw, 10rem)" }}
            >
              {rightProjects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i * 2 + 1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
