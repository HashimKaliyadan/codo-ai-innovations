"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Eye, Lightbulb, Globe } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const values = [
  {
    icon: Eye,
    title: "VISION",
    description:
      "We see beyond the screen — designing experiences that anticipate needs and spark delight.",
  },
  {
    icon: Lightbulb,
    title: "INNOVATION",
    description:
      "We push boundaries daily, combining cutting-edge AI with human-centered design.",
  },
  {
    icon: Globe,
    title: "CONNECTION",
    description:
      "We build bridges between technology and people, making AI accessible to everyone.",
  },
];

export default function ValuesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={ref}
      style={{
        padding: "clamp(60px, 8vw, 100px) 0",
        position: "relative",
      }}
    >
      <div className="max-w-[1320px] mx-auto px-6">
        <div
          className="grid gap-12 lg:gap-16"
          style={{ gridTemplateColumns: "1fr", ...(typeof window !== "undefined" && window.innerWidth >= 1024 ? {} : {}) }}
        >
          {/* Desktop: side by side. Mobile: stacked */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left: Headline */}
            <div className="lg:col-span-5">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: EASE }}
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.25em",
                  color: "var(--brand-green)",
                  marginBottom: "1.5rem",
                }}
              >
                Our Values
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
                style={{
                  fontSize: "clamp(28px, 4vw, 48px)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: "var(--text-primary)",
                }}
              >
                We believe AI should amplify human potential, not replace it.
              </motion.h2>
            </div>

            {/* Right: Value cards */}
            <div className="lg:col-span-7 flex flex-col gap-0">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, x: 24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.65,
                    ease: EASE,
                    delay: 0.15 + i * 0.1,
                  }}
                  style={{
                    padding: "2rem 0",
                    borderBottom:
                      i < values.length - 1
                        ? "1px solid rgba(255,255,255,0.06)"
                        : "none",
                  }}
                >
                  <div className="flex items-start gap-5">
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "12px",
                        background: "rgba(34,197,94,0.08)",
                        border: "1px solid rgba(34,197,94,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <v.icon size={18} style={{ color: "var(--brand-green)" }} />
                    </div>
                    <div>
                      <h3
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 800,
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "var(--text-primary)",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {v.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "0.95rem",
                          lineHeight: 1.65,
                          color: "rgba(255,255,255,0.5)",
                          maxWidth: "440px",
                        }}
                      >
                        {v.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
