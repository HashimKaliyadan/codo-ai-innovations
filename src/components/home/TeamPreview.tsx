"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────
   Types & Data
───────────────────────────────────────────── */
interface TeamMember {
  name: string;
  role: string;
  image: string;
  glow: string;   // radial glow colour behind the active card
}

const team: TeamMember[] = [
  {
    name: "Mohammed Ajmal NK",
    role: "Founder & CEO",
    image: "/team/mohammed-ajmal.jpg",
    glow: "rgba(0, 200, 120, 0.22)",
  },
  {
    name: "Aboobacker Fahise",
    role: "Application Developer",
    image: "/team/aboobacker-fahise.jpg",
    glow: "rgba(60, 160, 255, 0.18)",
  },
  {
    name: "Mohammed Ajmal P",
    role: "Project Coordinator & Tester",
    image: "/team/mohammed-ajmal-p.jpg",
    glow: "rgba(255, 160, 40, 0.15)",
  },
  {
    name: "Jubairiya",
    role: "Digital Marketing Executive",
    image: "/team/jubairiya.jpg",
    glow: "rgba(255, 100, 160, 0.18)",
  },
  {
    name: "Ayshath Lubaba K A",
    role: "Fullstack Developer",
    image: "/team/ayshath-lubaba.jpg",
    glow: "rgba(0, 200, 120, 0.15)",
  },
  {
    name: "Sinan Paravath",
    role: "Full-Stack Python Developer",
    image: "/team/sinan-paravath.jpg",
    glow: "rgba(0, 200, 120, 0.12)",
  },
  {
    name: "Muhammed Irshad K",
    role: "Full Stack Developer",
    image: "/team/muhammed-irshad.jpg",
    glow: "rgba(60, 160, 255, 0.12)",
  },
  {
    name: "Sareefa TP",
    role: "Full Stack Developer",
    image: "/team/sareefa-tp.jpg",
    glow: "rgba(0, 200, 120, 0.12)",
  },
  {
    name: "Jidhin T",
    role: "Full Stack Developer",
    image: "/team/jidhin-t.jpg",
    glow: "rgba(255, 160, 40, 0.10)",
  },
  {
    name: "Abdul Basith",
    role: "Frontend Developer",
    image: "/team/abdul-basith.jpg",
    glow: "rgba(60, 160, 255, 0.10)",
  },
  {
    name: "Mohammed Hashim",
    role: "Python Full-stack Developer",
    image: "/team/mohammed-hashim.jpg",
    glow: "rgba(255, 160, 40, 0.08)",
  },
].slice(0, 6);

/* ─────────────────────────────────────────────
   Spring presets
   — Using spring for flex/transform gives a
     physical, weighted feel vs cubic-bezier.
───────────────────────────────────────────── */
const SPRING_FLEX = {
  type: "spring" as const,
  stiffness: 340,
  damping: 34,
  mass: 0.9,
};

const SPRING_IMG = {
  type: "spring" as const,
  stiffness: 280,
  damping: 32,
  mass: 1,
};

const EASE_FAST = { duration: 0.32, ease: [0.22, 1, 0.36, 1] as any };

/* ─────────────────────────────────────────────
   Autoplay bar — linear fill per slide
───────────────────────────────────────────── */
const AUTOPLAY_MS = 4200;



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
   Main Section
───────────────────────────────────────────── */
export default function TeamSection() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  /* Autoplay */
  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setActive((p) => (p + 1) % team.length),
      AUTOPLAY_MS
    );
    return () => clearInterval(id);
  }, [paused]);

  const go = useCallback((dir: 1 | -1) => {
    setPaused(true);
    setActive((p) => (p + dir + team.length) % team.length);
  }, []);

  const goTo = useCallback((i: number) => {
    setPaused(true);
    setActive(i);
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="CODO Team"
      className="relative w-full"
      style={{
        padding:
          "clamp(0.75rem, 1.5vw, 1.2rem) clamp(1.25rem, 5vw, 3.5rem) clamp(0.75rem, 1.5vw, 1.2rem)",
        fontFamily: "'DM Sans', sans-serif",
        overflow: "hidden",
      }}
    >
      <div className="mx-auto max-w-[1320px]">

        {/* ── Header Block ── */}
        <Reveal delay={0.02}>
          <div
            className="rounded-2xl p-8 md:p-12 mb-12"
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
                The Minds{" "}
                <span style={{ color: "var(--brand-green)", fontStyle: "italic" }}>
                  Behind
                </span>
                <br />
                the{" "}
                <span style={{ color: "var(--brand-green)", fontStyle: "italic" }}>
                  Magic.
                </span>
              </h2>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div
            className="rounded-2xl p-8 md:p-12"
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid var(--glass-border)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* ── Per-member radial glow — cross-fades on change ── */}
            <AnimatePresence mode="sync">
              <motion.div
                key={`glow-${active}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `radial-gradient(ellipse at 65% 40%, ${team[active].glow} 0%, transparent 65%)`,
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />
            </AnimatePresence>

            <div style={{ position: "relative", zIndex: 1 }}>

              {/* ── Nav arrows ── */}
              <div
                className="flex justify-end"
                style={{ marginBottom: "clamp(1.5rem, 3vw, 2rem)", gap: "0.5rem" }}
              >
                  {([-1, 1] as const).map((dir) => (
                    <button
                      key={dir}
                      onClick={() => go(dir)}
                      aria-label={dir === -1 ? "Previous" : "Next"}
                      style={{
                        width: 42, height: 42,
                        borderRadius: "12px",
                        background:
                          dir === 1
                            ? "color-mix(in srgb, var(--brand-green) 12%, transparent)"
                            : "rgba(255,255,255,0.04)",
                        backdropFilter: "blur(12px)",
                        border:
                          dir === 1
                            ? "1px solid color-mix(in srgb, var(--brand-green) 35%, transparent)"
                            : "1px solid rgba(255,255,255,0.08)",
                        color: dir === 1 ? "var(--brand-green)" : "var(--text-primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "background 0.22s ease, border-color 0.22s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "color-mix(in srgb, var(--brand-green) 22%, transparent)";
                        e.currentTarget.style.borderColor = "var(--brand-green)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          dir === 1
                            ? "color-mix(in srgb, var(--brand-green) 12%, transparent)"
                            : "rgba(255,255,255,0.04)";
                        e.currentTarget.style.borderColor =
                          dir === 1
                            ? "color-mix(in srgb, var(--brand-green) 35%, transparent)"
                            : "rgba(255,255,255,0.08)";
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={dir === -1 ? "M10 12L6 8L10 4" : "M6 4L10 8L6 12"} />
                      </svg>
                    </button>
                  ))}
                </div>

              {/* ── Accordion strip ── */}
              <div
                onMouseLeave={() => setPaused(false)}
                className="flex w-full"
                style={{
                  height: "clamp(380px, 48vw, 550px)",
                  gap: "clamp(0.4rem, 0.7vw, 0.6rem)",
                  borderRadius: "22px",
                  overflow: "hidden",
                }}
              >
                {team.map((member, index) => {
                  const isActive = active === index;

                  return (
                    <motion.div
                      key={index}
                      onClick={() => goTo(index)}
                      onMouseEnter={() => {
                        goTo(index);
                        setPaused(true);
                      }}
                      animate={{ flex: isActive ? 5 : 1 }}
                      transition={SPRING_FLEX}
                      style={{
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: "16px",
                        cursor: "pointer",
                        minWidth: 0,
                        border: isActive
                          ? "1px solid rgba(255,255,255,0.14)"
                          : "1px solid rgba(255,255,255,0.05)",
                        // GPU layer hint — critical for jank-free flex animation
                        willChange: "flex",
                        transition: "border-color 0.3s ease",
                      }}
                    >
                      {/* ── Portrait image ── */}
                      <motion.div
                        animate={{
                          scale: isActive ? 1.04 : 1.14,
                        }}
                        transition={SPRING_IMG}
                        style={{
                          position: "absolute",
                          inset: 0,
                          willChange: "transform",
                        }}
                      >
                        {/*
                          Using <img> here (not next/image) to avoid
                          the remount cost during SSR hydration which
                          causes a flash on first render.
                          For production, swap to <Image> with priority.
                        */}
                        <img
                          src={member.image}
                          alt={`${member.name}, ${member.role}`}
                          loading={index === 0 ? "eager" : "lazy"}
                          decoding="async"
                          fetchPriority={index === 0 ? "high" : "low"}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center 20%",
                            display: "block",
                          }}
                        />
                      </motion.div>

                      {/* ── Grayscale / colour overlay ── */}
                      {/*
                        Using a backdrop-filter: grayscale approach avoids
                        re-painting the image itself — just a composited layer.
                        Falls back to filter on the wrapper.
                      */}
                      <motion.div
                        animate={{ opacity: isActive ? 0 : 1 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                          position: "absolute",
                          inset: 0,
                          backdropFilter: "grayscale(1)",
                          WebkitBackdropFilter: "grayscale(1)",
                          zIndex: 1,
                          pointerEvents: "none",
                        }}
                      />

                      {/* Dark overlay (inactive) */}
                      <motion.div
                        animate={{ opacity: isActive ? 0 : 0.4 }}
                        transition={EASE_FAST}
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "rgba(0,0,0,0.55)",
                          zIndex: 2,
                          pointerEvents: "none",
                        }}
                      />

                      {/* Bottom gradient vignette */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0, left: 0, right: 0,
                          height: "60%",
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)",
                          zIndex: 3,
                          pointerEvents: "none",
                        }}
                      />

                      {/* ── Active: role + name top-left ── */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            key={`top-${index}`}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ ...EASE_FAST, delay: 0.08 }}
                            style={{
                              position: "absolute",
                              top: "clamp(1.2rem, 3vw, 2rem)",
                              left: "clamp(1.2rem, 3vw, 2rem)",
                              zIndex: 5,
                            }}
                          >
                            <p
                              style={{
                                fontSize: "0.58rem",
                                fontWeight: 800,
                                letterSpacing: "0.22em",
                                textTransform: "uppercase",
                                color: "var(--brand-green)",
                                marginBottom: "0.4rem",
                                lineHeight: 1,
                              }}
                            >
                              {member.role}
                            </p>
                            <h3
                              style={{
                                fontSize: "clamp(1.2rem, 2.5vw, 2.2rem)",
                                fontWeight: 900,
                                color: "#fff",
                                lineHeight: 1.08,
                                letterSpacing: "-0.03em",
                                margin: 0,
                                whiteSpace: "nowrap",
                              }}
                            >
                              {member.name}
                            </h3>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* ── Inactive: vertical name ── */}
                      <AnimatePresence>
                        {!isActive && (
                          <motion.div
                            key={`vert-${index}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{
                              position: "absolute",
                              bottom: "clamp(1rem, 2vw, 1.5rem)",
                              left: 0, right: 0,
                              zIndex: 5,
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <span
                              style={{
                                writingMode: "vertical-lr",
                                transform: "rotate(180deg)",
                                fontSize: "0.56rem",
                                fontWeight: 700,
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                                color: "rgba(255,255,255,0.5)",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {member.name}
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>


                    </motion.div>
                  );
                })}
              </div>



            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}