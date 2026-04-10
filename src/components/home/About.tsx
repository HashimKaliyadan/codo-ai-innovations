"use client";

import { useRef, useState } from "react";

import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
  LayoutGroup,
} from "framer-motion";
import type { Easing } from "framer-motion";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MEDIA_QUERIES } from "@/constants/breakpoints";

/* ─────────────────────────────────────────────
   Shared easing — typed, extracted once
───────────────────────────────────────────── */
const EASE: Easing = [0.22, 1, 0.36, 1];

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
type Division = "academy" | "agency";

interface DivisionData {
  id: Division;
  label: string;
  stat: string;
  sub: string;
  detail: string;
  description: string;
}

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const divisions: DivisionData[] = [
  {
    id: "agency",
    label: "CODO Agency",
    stat: "30+",
    sub: "Solutions Delivered",
    detail: "AI & Digital Products",
    description:
      "We design and deliver AI-powered digital products — from intelligent web platforms to custom mobile applications and automation systems.",
  },
  {
    id: "academy",
    label: "CODO Academy",
    stat: "500+",
    sub: "Innovators Trained",
    detail: "Education & Skill Development",
    description:
      "We train the next generation of engineers, designers, and AI practitioners — bridging the gap between industry demand and human potential.",
  },
];


/* ─────────────────────────────────────────────
   Shared spacing token — single source of truth
───────────────────────────────────────────── */
const GAP = "clamp(0.75rem, 1.5vw, 1.2rem)";
const CARD_PAD = "clamp(1.75rem, 3.5vw, 2.5rem)";

/* ─────────────────────────────────────────────
   Scroll-reveal wrapper with scale + y
───────────────────────────────────────────── */
import { Reveal } from "@/components/ui/Reveal";

/* ─────────────────────────────────────────────
   Shared card hover props
───────────────────────────────────────────── */
function cardHoverProps(isHovered: boolean) {
  return {
    animate: {
      y: isHovered ? -7 : 0,
      boxShadow: isHovered
        ? "0 28px 72px -12px rgba(0,0,0,0.42), 0 0 0 1px color-mix(in srgb, var(--brand-green) 22%, transparent)"
        : "0 6px 28px -8px rgba(0,0,0,0.22), 0 0 0 1px var(--glass-border)",
    },
    transition: { duration: 0.42, ease: EASE },
  };
}



/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export default function AboutSection() {
  const [active, setActive] = useState<Division>("agency");
  const [hovered, setHovered] = useState<"top" | "bottom" | "right" | null>(null);
  const isMobile = useMediaQuery(MEDIA_QUERIES.mobile);

  const current = divisions.find((d) => d.id === active) ?? divisions[0];

  /* ── Parallax refs ── */
  const sectionRef = useRef(null);
  const imageCardRef = useRef(null);

  /* Section-level scroll — drives the ABOUT watermark drift */
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* Image card scroll — drives the photo parallax */
  const { scrollYProgress: imageProgress } = useScroll({
    target: imageCardRef,
    offset: ["start end", "end start"],
  });


  const photoY = useTransform(imageProgress, [0, 1], [-48, 48]);

  return (
    <section
      ref={sectionRef}
      aria-label="About CODO AI Innovations"
      className="relative z-10 w-full"
      style={{
        padding: `clamp(0.75rem, 1.5vw, 1.2rem) clamp(1.25rem, 5vw, 3.5rem)`,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div className="mx-auto max-w-[1320px]">

        {/* ── Header Block ── */}
        <Reveal delay={0.05}>
          <div
            className="rounded-2xl"
              style={{
                background: "var(--glass-bg)",
                backdropFilter: isMobile ? "blur(8px)" : "blur(12px)",
                WebkitBackdropFilter: isMobile ? "blur(8px)" : "blur(12px)",
                border: "1px solid var(--glass-border)",
                padding: CARD_PAD,
                marginBottom: "1.5rem",
                position: "relative",
                overflow: "hidden",
                willChange: "transform, opacity",
                transform: "translateZ(0)",
              }}
          >


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
                Where AI Meets
                <br />
                <span style={{ color: "var(--brand-green)", fontStyle: "italic" }}>
                  Human Ambition.
                </span>
              </h2>
            </div>
          </div>
        </Reveal>

        {/*
          Desktop grid:
          ┌──────────────┬──────────────┐
          │  Card 1      │              │
          │ (Text)       │   Card 3     │  ← row 1
          ├──────────────┤  (Image)     │
          │  Card 2      │              │  ← row 2
          │ (Carousel)   │              │
          └──────────────┴──────────────┘

          Mobile: Text → Carousel → Image (image pushed last)
        */}
        <div
          className="flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-6"
        >

          {/* ════════════════════════════════
              CARD 1 — Text + Highlights
              top-left | mobile: order-1
          ════════════════════════════════ */}
          <Reveal
            delay={0.12}
            className="order-1 md:order-none md:col-span-6"
          >
            <motion.div
              onHoverStart={() => setHovered("top")}
              onHoverEnd={() => setHovered(null)}
              {...cardHoverProps(hovered === "top")}
              className="rounded-2xl flex flex-col h-full"
              style={{
                background: "var(--glass-bg)",
                backdropFilter: isMobile ? "blur(8px)" : "blur(12px)",
                WebkitBackdropFilter: isMobile ? "blur(8px)" : "blur(12px)",
                padding: CARD_PAD,
                border: "1px solid var(--glass-border)",
                overflow: "hidden",
                position: "relative",
                willChange: "transform, opacity",
                transform: "translateZ(0)",
              }}
            >
              {/* Corner glow */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: -50,
                  left: -50,
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, color-mix(in srgb, var(--brand-green) 10%, transparent) 0%, transparent 70%)",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />

              <div className="flex flex-col gap-6 h-full" style={{ zIndex: 1 }}>
                {/* Body */}
                <div className="flex flex-col gap-5">
                  <p
                    style={{
                      fontSize: "clamp(0.85rem, 1.4vw, 1rem)",
                      lineHeight: 1.85,
                      color: "var(--text-secondary)",
                      maxWidth: "56ch",
                    }}
                  >
                    <strong style={{ color: "var(--text-primary)", fontWeight: 700 }}>
                      CODO AI Innovations
                    </strong>{" "}
                    is a technology-first parent company engineering the future through AI,
                    software and human capital. We operate at the intersection of cutting-edge
                    artificial intelligence and real-world product delivery, building systems
                    that scale and teams that lead.
                  </p>

                  <p
                    style={{
                      fontSize: "clamp(0.85rem, 1.4vw, 1rem)",
                      lineHeight: 1.85,
                      color: "var(--text-secondary)",
                      maxWidth: "56ch",
                      borderLeft: "2px solid var(--brand-green)",
                      paddingLeft: "1.25rem",
                    }}
                  >
                    Through{" "}
                    <strong style={{ color: "var(--text-primary)", fontWeight: 700 }}>
                      CODO Agency
                    </strong>{" "}
                    we design and deliver AI-powered digital products from intelligent web
                    platforms to custom mobile applications and automation systems.
                    <br />
                    Through{" "}
                    <strong style={{ color: "var(--text-primary)", fontWeight: 700 }}>
                      CODO Academy
                    </strong>{" "}
                    we train the next generation of engineers, designers and AI practitioners
                    bridging the gap between industry demand and human potential.
                  </p>
                </div>

              </div>
            </motion.div>
          </Reveal>

          {/* ════════════════════════════════
              CARD 3 — Image
              right column, spans both rows
              ✅ mobile: order-3 (pushed last)
          ════════════════════════════════ */}
          <Reveal
            delay={0.16}
            className="order-3 md:order-none h-full md:col-span-6 md:row-span-2"
          >
            <motion.div
              ref={imageCardRef}
              onHoverStart={() => setHovered("right")}
              onHoverEnd={() => setHovered(null)}
              {...cardHoverProps(hovered === "right")}
              className="rounded-2xl h-full"
              style={{
                position: "relative",
                overflow: "hidden",
                border: "1px solid var(--glass-border)",
                minHeight: "clamp(480px, 65vw, 740px)",
                willChange: "transform",
              }}
            >
              {/* ✅ Photo with scroll-driven parallax */}
              <motion.div
                className="absolute inset-0"
                style={{
                  scale: hovered === "right" ? 1.045 : 1,
                  y: photoY,
                  /* extend height slightly so parallax doesn't reveal edges */
                  top: "-6%",
                  bottom: "-6%",
                  left: 0,
                  right: 0,
                }}
                animate={{ scale: hovered === "right" ? 1.045 : 1 }}
                transition={{ duration: 0.65, ease: EASE }}
              >
                <Image
                  src="/images/codo-mockup.png"
                  alt="CODO Academy app on iPhone showing AI-Integrated Digital Marketing course"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  priority
                />
              </motion.div>

              {/* Gradient overlay — bottom legibility */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
                  zIndex: 1,
                  pointerEvents: "none",
                  borderRadius: "inherit",
                }}
              />

              {/* Bottom overlay content */}
              <div
                style={{
                  position: "absolute",
                  bottom: "clamp(1.5rem, 3vw, 2rem)",
                  left: "clamp(1.25rem, 2.5vw, 1.75rem)",
                  right: "clamp(1.25rem, 2.5vw, 1.75rem)",
                  zIndex: 2,
                }}
              >
                <h3
                  style={{
                    fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
                    fontWeight: 900,
                    lineHeight: 1.1,
                    letterSpacing: "-0.025em",
                    color: "#fff",
                    marginBottom: "0.5rem",
                  }}
                >
                  Building the
                  <br />
                  <span style={{ color: "var(--brand-green)" }}>Intelligent Future.</span>
                </h3>
                <p
                  style={{
                    fontSize: "clamp(0.8rem, 1.3vw, 0.9rem)",
                    lineHeight: 1.7,
                    color: "rgba(255,255,255,0.6)",
                    maxWidth: "38ch",
                  }}
                >
                  Two divisions. One mission — engineering what's next through relentless
                  innovation and purposeful education.
                </p>

                <div
                  style={{
                    width: "100%",
                    height: "1px",
                    background: "rgba(255,255,255,0.1)",
                    margin: "1rem 0",
                  }}
                />

                <div className="flex items-center justify-between">
                  <span
                    style={{
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.32)",
                    }}
                  >
                    CODO AI Innovations
                  </span>
                  <span
                    style={{
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: "var(--brand-green)",
                      opacity: 0.75,
                    }}
                  >
                    Est. 2024
                  </span>
                </div>
              </div>
            </motion.div>
          </Reveal>

          {/* ════════════════════════════════
              CARD 2 — Division Carousel
              bottom-left | mobile: order-2
          ════════════════════════════════ */}
          <Reveal
            delay={0.24}
            className="order-2 md:order-none md:col-span-6 flex flex-col h-full"
          >
            <motion.div
              onHoverStart={() => setHovered("bottom")}
              onHoverEnd={() => setHovered(null)}
              {...cardHoverProps(hovered === "bottom")}
              className="rounded-2xl flex flex-col justify-center h-full flex-1"
              style={{
                background:
                  "color-mix(in srgb, var(--brand-green) 6%, var(--glass-bg))",
                backdropFilter: isMobile ? "blur(8px)" : "blur(12px)",
                WebkitBackdropFilter: isMobile ? "blur(8px)" : "blur(12px)",
                padding: CARD_PAD,
                border:
                  "1px solid color-mix(in srgb, var(--brand-green) 18%, var(--glass-border))",
                overflow: "hidden",
                position: "relative",
                willChange: "transform, opacity",
                transform: "translateZ(0)",
              }}
            >
              {/* Bottom-right glow */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  bottom: -60,
                  right: -60,
                  width: 220,
                  height: 220,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, color-mix(in srgb, var(--brand-green) 14%, transparent) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />

              <div style={{ zIndex: 1, position: "relative" }}>
                <LayoutGroup>
                  <div className="w-full">
                    {/* Tab pills */}
                    <div
                      role="tablist"
                      aria-label="CODO Divisions"
                      className="flex"
                      style={{
                        gap: "0.4rem",
                        marginBottom: "1.25rem",
                        background:
                          "color-mix(in srgb, var(--text-primary) 5%, transparent)",
                        borderRadius: "100px",
                        padding: "4px",
                        width: "fit-content",
                        border: "1px solid var(--glass-border)",
                      }}
                    >
                      {divisions.map((div) => (
                        <button
                          key={div.id}
                          role="tab"
                          aria-selected={active === div.id}
                          onClick={() => setActive(div.id)}
                          style={{
                            position: "relative",
                            padding: "0.4rem 1rem",
                            borderRadius: "100px",
                            fontSize: "0.68rem",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                            color:
                              active === div.id
                                ? "var(--brand-green)"
                                : "var(--text-secondary)",
                            transition: "color 0.2s ease",
                            zIndex: 1,
                          }}
                        >
                          {active === div.id && (
                            <motion.div
                              layoutId="pill"
                              style={{
                                position: "absolute",
                                inset: 0,
                                borderRadius: "100px",
                                background:
                                  "color-mix(in srgb, var(--brand-green) 12%, transparent)",
                                border:
                                  "1px solid color-mix(in srgb, var(--brand-green) 30%, transparent)",
                                zIndex: -1,
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 420,
                                damping: 34,
                              }}
                            />
                          )}
                          {div.label}
                        </button>
                      ))}
                    </div>

                    {/* Animated stat panel */}
                    {/* ✅ minHeight is now a floor only — height:auto lets content grow */}
                    <div
                      style={{
                        borderRadius: "18px",
                        border:
                          "1px solid color-mix(in srgb, var(--brand-green) 20%, transparent)",
                        background:
                          "color-mix(in srgb, var(--brand-green) 4%, transparent)",
                        padding: "1.25rem 1.5rem",
                        overflow: "hidden",
                        minHeight: "clamp(150px, 16vw, 175px)",
                        height: "auto",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={active}
                          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                          transition={{ duration: 0.32, ease: EASE }}
                          className="flex items-start justify-between gap-4 flex-wrap w-full"
                        >
                          <div>
                            <div
                              style={{
                                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                                fontWeight: 900,
                                lineHeight: 1,
                                color: "var(--brand-green)",
                                letterSpacing: "-0.03em",
                              }}
                            >
                              {current.stat}
                            </div>
                            <div
                              style={{
                                fontSize: "0.67rem",
                                fontWeight: 700,
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                color: "var(--text-primary)",
                                marginTop: "0.3rem",
                              }}
                            >
                              {current.sub}
                            </div>
                            <div
                              style={{
                                fontSize: "0.62rem",
                                color: "var(--text-secondary)",
                                marginTop: "0.12rem",
                                opacity: 0.65,
                              }}
                            >
                              {current.detail}
                            </div>
                          </div>

                          <p
                            style={{
                              fontSize: "0.82rem",
                              lineHeight: 1.75,
                              color: "var(--text-secondary)",
                              maxWidth: "26ch",
                              textAlign: "right",
                            }}
                          >
                            {current.description}
                          </p>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </LayoutGroup>
              </div>
            </motion.div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}