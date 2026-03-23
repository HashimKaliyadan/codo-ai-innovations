"use client";

import { useRef } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { TransitionLink as Link } from "@/components/transition/TransitionLink";
import { projects } from "@/data/projects";
import { ArrowLeft, Calendar, Building2, Clock } from "lucide-react";
import { use } from "react";

/* ─────────────────────────────────────────────
   Reveal wrapper
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
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Project detail page
───────────────────────────────────────────── */
export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main
      className="relative min-h-screen"
      style={{
        background: "var(--background)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* ── Hero Image ───────────────────────────────────────────────── */}
      <section className="relative" style={{ height: "70vh", minHeight: "450px" }}>
        <Image
          src={project.image}
          alt={project.name}
          fill
          priority
          className="object-cover"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.6) 60%, #0a0a0a 100%)",
          }}
        />

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute top-0 left-0 z-10"
          style={{
            paddingTop: "clamp(6rem, 10vh, 8rem)",
            paddingLeft: "clamp(1.5rem, 5vw, 4rem)",
          }}
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full backdrop-blur-xl transition-all duration-300 hover:scale-105"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "var(--text-primary)",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={14} />
            Back
          </Link>
        </motion.div>

        {/* Title overlay at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10"
          style={{
            padding: "0 clamp(1.5rem, 5vw, 4rem) clamp(2rem, 4vh, 3rem)",
          }}
        >
          <div className="mx-auto max-w-[1400px]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Category */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.35rem",
                  marginBottom: "0.75rem",
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
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      {tag}
                    </span>
                    {i < project.tags.length - 1 && (
                      <span
                        style={{
                          margin: "0 0.4rem",
                          fontSize: "0.5rem",
                          color: "rgba(255,255,255,0.25)",
                        }}
                      >
                        •
                      </span>
                    )}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1
                style={{
                  fontSize: "clamp(2.5rem, 7vw, 5rem)",
                  fontWeight: 900,
                  lineHeight: 1,
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

      {/* ── Content ──────────────────────────────────────────────────── */}
      <section
        style={{
          padding:
            "clamp(3rem, 6vh, 5rem) clamp(1.5rem, 5vw, 4rem) clamp(6rem, 12vh, 10rem)",
        }}
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left column: meta info */}
            <div className="lg:col-span-4">
              <Reveal delay={0.1}>
                <div className="flex flex-col gap-6">
                  {/* Meta cards */}
                  {[
                    { icon: <Building2 size={16} />, label: "Client", value: project.client },
                    { icon: <Calendar size={16} />, label: "Year", value: project.year },
                    { icon: <Clock size={16} />, label: "Duration", value: project.duration },
                  ].map((meta, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4"
                      style={{
                        padding: "1rem 1.25rem",
                        borderRadius: "1rem",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <div
                        style={{
                          color: "var(--brand-green)",
                          opacity: 0.7,
                        }}
                      >
                        {meta.icon}
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "0.65rem",
                            fontWeight: 700,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.4)",
                            marginBottom: "0.15rem",
                          }}
                        >
                          {meta.label}
                        </div>
                        <div
                          style={{
                            fontSize: "0.95rem",
                            fontWeight: 600,
                            color: "var(--text-primary)",
                          }}
                        >
                          {meta.value}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Stat highlight */}
                  <div
                    style={{
                      padding: "1.5rem",
                      borderRadius: "1rem",
                      background:
                        "color-mix(in srgb, var(--brand-green) 8%, rgba(255,255,255,0.04))",
                      border:
                        "1px solid color-mix(in srgb, var(--brand-green) 20%, rgba(255,255,255,0.08))",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                        fontWeight: 900,
                        color: "var(--brand-green)",
                        lineHeight: 1,
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {project.stat}
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.5)",
                        marginTop: "0.3rem",
                      }}
                    >
                      {project.statLabel}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right column: description + tech */}
            <div className="lg:col-span-8">
              <Reveal delay={0.2}>
                <div className="flex flex-col gap-8">
                  {/* Short description */}
                  <p
                    style={{
                      fontSize: "clamp(1.15rem, 2vw, 1.4rem)",
                      lineHeight: 1.6,
                      color: "var(--text-primary)",
                      fontWeight: 500,
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Long description */}
                  <p
                    style={{
                      fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                      lineHeight: 1.85,
                      color: "rgba(255,255,255,0.55)",
                    }}
                  >
                    {project.longDescription}
                  </p>

                  {/* Divider */}
                  <div
                    style={{
                      height: "1px",
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.1) 80%, transparent)",
                    }}
                  />

                  {/* Tech stack */}
                  <div>
                    <h3
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 800,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.4)",
                        marginBottom: "1rem",
                      }}
                    >
                      Technology Stack
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                      }}
                    >
                      {project.techStack.map((tech, i) => (
                        <span
                          key={i}
                          style={{
                            padding: "0.5rem 1rem",
                            borderRadius: "100px",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            color: "rgba(255,255,255,0.6)",
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
