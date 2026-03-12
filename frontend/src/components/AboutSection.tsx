

"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";

function AnimatedBlock({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <motion.div
      ref={ref}
      className="no-transition"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
        delay: index * 0.15,
      }}
      style={{ marginBottom: "2.5rem" }}
    >
      {children}
    </motion.div>
  );
}

const stats = [
  {
    title: "CODO Academy",
    stat: "500+",
    sub: "Innovators Trained",
    detail: "Education & Skill Development",
  },
  {
    title: "CODO Agency",
    stat: "30+",
    sub: "Solutions Delivered",
    detail: "AI & Digital Products",
  },
];

export default function AboutSection() {
  return (
    <section
      aria-label="About CODO AI Innovations"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "clamp(6rem, 12vw, 8rem) clamp(1.5rem, 6vw, 6rem) clamp(3rem, 6vw, 4rem)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      


      <div
        className="max-w-[1400px] mx-auto flex flex-col md:flex-row relative z-10"
        style={{ gap: "4rem" }}
      >

        <div className="hidden md:block w-[45%] relative">
          <div style={{ position: "sticky", top: "30vh" }}>

            <div
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.35em",
                color: "var(--brand-green)",
                textTransform: "uppercase",
                marginBottom: "2rem",
              }}
            >
              About us
            </div>

            <motion.div
              className="no-transition"
              initial={{ height: 0 }}
              whileInView={{ height: 80 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                width: "2px",
                background: "var(--brand-green)",
                marginBottom: "1.5rem",
              }}
            />

            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-1rem",
                top: "50%",
                transform: "translateY(-50%) rotate(-90deg)",
                fontSize: "clamp(4rem, 8vw, 7rem)",
                fontWeight: 900,
                color: "transparent",
                WebkitTextStroke: "1px var(--glass-border)",
                pointerEvents: "none",
                transformOrigin: "center",
                whiteSpace: "nowrap",
                userSelect: "none",
              }}
            >
              CODO
            </div>

            <motion.svg
              className="no-transition"
              animate={{ rotate: 360 }}
              transition={{ duration: 18, ease: "linear", repeat: Infinity }}
              width="100"
              height="100"
              viewBox="0 0 100 100"
              aria-hidden="true"
              style={{ overflow: "visible", willChange: "transform" }}
            >
              <path
                id="textPath"
                d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                fill="none"
              />
              <text
                style={{
                  fontSize: "0.5rem",
                  letterSpacing: "0.15em",
                  fill: "color-mix(in srgb, var(--text-primary) 25%, transparent)",
                }}
              >
                <textPath href="#textPath" startOffset="0%">
                  CODO AI INNOVATIONS • EST. 2024 •{" "}
                </textPath>
              </text>
            </motion.svg>

          </div>
        </div>

        <div className="w-full md:w-[55%]">

          <AnimatedBlock index={0}>
            <div
              className="flex md:hidden items-center gap-3"
              style={{ marginBottom: "1.5rem" }}
            >
              <motion.div
                className="no-transition"
                initial={{ width: 0 }}
                whileInView={{ width: 40 }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{
                  height: "2px",
                  background: "var(--brand-green)",
                }}
              />
              <span
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.3em",
                  color: "var(--brand-green)",
                  textTransform: "uppercase",
                }}
              >
                About us
              </span>
            </div>
          </AnimatedBlock>

          <AnimatedBlock index={1}>
            <h2
              className="text-[clamp(2rem,8vw,2.8rem)] md:text-[clamp(2.2rem,4.5vw,3.8rem)]"
              style={{
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
                marginBottom: "0",
              }}
            >
              Where{" "}
              <span style={{ color: "var(--brand-green)" }}>
                Artificial Intelligence
              </span>
              <br />
              Meets{" "}
              <span style={{ color: "var(--brand-green)" }}>Human Ambition.</span>
            </h2>
          </AnimatedBlock>

          <AnimatedBlock index={2}>
            <p
              style={{
                fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
                lineHeight: 1.9,
                color: "var(--text-secondary)",
                fontWeight: 400,
                marginBottom: "0",
                maxWidth: "72ch",
              }}
            >
              <strong style={{ color: "var(--text-primary)", fontWeight: 700 }}>
                CODO AI Innovations
              </strong>{" "}
              is a technology-first parent company engineering the future
              through AI, software and human capital. We operate at the
              intersection of cutting-edge artificial intelligence and
              real-world product delivery, building systems that scale
              and teams that lead.
            </p>
          </AnimatedBlock>

          <AnimatedBlock index={3}>
            <p
              style={{
                fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)",
                lineHeight: 1.85,
                color: "var(--text-secondary)",
                fontWeight: 400,
                marginBottom: "0",
                maxWidth: "72ch",
                borderLeft: "2px solid var(--brand-green)",
                paddingLeft: "1.25rem",
              }}
            >
              Through{" "}
              <strong style={{ color: "var(--text-primary)", fontWeight: 700 }}>
                CODO Agency
              </strong>
              we design and deliver AI-powered digital products from
              intelligent web platforms to custom mobile applications and
              automation systems. Through{" "}
              <strong style={{ color: "var(--text-primary)", fontWeight: 700 }}>
                CODO Academy
              </strong>
              we train the next generation of engineers, designers and
              AI practitioners bridging the gap between industry demand
              and human potential.
            </p>
          </AnimatedBlock>

          <AnimatedBlock index={4}>
            <div
              className="flex flex-col sm:flex-row"
              style={{ gap: "1.5rem", marginBottom: "0" }}
            >
              {stats.map((card, i) => (
                <div
                  key={i}
                  className="flex-1 transition-all duration-300 hover:bg-[color-mix(in_srgb,var(--brand-green)_5%,transparent)] hover:border-[color-mix(in_srgb,var(--brand-green)_25%,transparent)]"
                  style={{
                    padding: "1.5rem 2rem",
                    border: "1px solid var(--glass-border)",
                    borderRadius: "16px",
                    background: "var(--glass-bg)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    backfaceVisibility: "hidden",
                    transform: "translateZ(0)",
                  }}
                >
                  <div
                    style={{
                      color: "var(--text-secondary)",
                      fontWeight: 700,
                      fontSize: "0.72rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {card.title}
                  </div>
                  <div
                    style={{
                      fontSize: "2.2rem",
                      fontWeight: 900,
                      color: "var(--brand-green)",
                      lineHeight: 1,
                    }}
                  >
                    {card.stat}
                  </div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--text-primary)",
                      opacity: 0.9,
                      marginTop: "0.3rem",
                    }}
                  >
                    {card.sub}
                  </div>
                  <div
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 400,
                      color: "var(--text-secondary)",
                      marginTop: "0.2rem",
                      opacity: 0.7,
                    }}
                  >
                    {card.detail}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedBlock>

        </div>
      </div>
    </section>
  );
}