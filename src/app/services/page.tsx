"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { TransitionLink as Link } from "@/components/transition/TransitionLink";
import { ArrowRight, ArrowUpRight, Zap, Globe, Brain, Code2 } from "lucide-react";

/* ─────────────────────────────────────────────
   Types & Local Data
───────────────────────────────────────────── */
interface ServiceData {
  id: string;
  number: string;
  title: string;
  description: string;
  category: string;
  highlights: string[];
  image: string;
  icon: React.ReactNode;
  accent: string;
}

const servicesList: ServiceData[] = [
  {
    id: "web",
    number: "01",
    category: "Web & Digital Presence",
    title: "Custom Website Development",
    description:
      "Your website is your brand's most powerful asset — and it should perform like one. CODO Agency designs and engineers high-performance web experiences built on modern frameworks, optimized for speed, accessibility, and conversion. Every pixel is intentional; every interaction earns its place.",
    highlights: ["Next.js & React", "Server-Side Rendering", "Headless CMS", "SEO-Optimized Architecture", "Global CDN Delivery"],
    image: "/images/services/service_web_dev.png",
    icon: <Globe size={18} />,
    accent: "#00ff88",
  },
  {
    id: "software",
    number: "02",
    category: "Software Engineering",
    title: "Custom Software Development",
    description:
      "Off-the-shelf tools cap your growth. We build purpose-built software solutions tailored to your exact business workflows — scalable, maintainable, and engineered to solve the root problem rather than patch the surface. From SaaS platforms to internal tools, we deliver software that compounds in value.",
    highlights: ["Full-stack Architecture", "SaaS & B2B Platforms", "REST & GraphQL APIs", "CI/CD Pipelines", "Cloud-native Deployment"],
    image: "/images/services/service_software_dev.png",
    icon: <Code2 size={18} />,
    accent: "#00ff88",
  },
  {
    id: "mobile",
    number: "03",
    category: "Mobile Platforms",
    title: "Mobile Application Development",
    description:
      "Users expect apps that feel instant, look flawless on every screen, and work even when offline. CODO Agency delivers cross-platform mobile experiences that don't compromise on native performance or frame rates — ensuring a premium, branded feel from the very first launch.",
    highlights: ["React Native & Expo", "iOS & Android", "Offline-first Architecture", "Native Hardware APIs", "App Store Deployment"],
    image: "/images/services/service_mobile_apps.png",
    icon: <Zap size={18} />,
    accent: "#00ff88",
  },
  {
    id: "ai",
    number: "04",
    category: "AI & Intelligent Systems",
    title: "AI-Based Solutions & Automation",
    description:
      "CODO AI Innovations is built on a foundation of artificial intelligence — and we bring that DNA into every product we ship. We integrate Large Language Models, autonomous agents, and intelligent automation directly into your business workflows, turning manual bottlenecks into adaptive, self-improving systems.",
    highlights: ["LLM Integration", "Autonomous Agent Workflows", "RAG Systems", "Predictive Modeling", "AI-Powered Data Pipelines"],
    image: "/images/services/service_ai_solutions.png",
    icon: <Brain size={18} />,
    accent: "#00ff88",
  },
];

const stats = [
  { value: "50+", label: "Products Shipped" },
  { value: "3×", label: "Avg. Perf. Gain" },
  { value: "100%", label: "Client Retention" },
  { value: "<48h", label: "Sprint Turnaround" },
];

const marqueeItems = [
  "Custom Web Development", "React Native", "AI Integration", "SaaS Platforms",
  "Next.js", "Mobile Apps", "LLM Workflows", "Headless CMS",
  "Autonomous Agents", "Cloud Deployment", "Software Engineering", "REST & GraphQL APIs",
];

/* ─────────────────────────────────────────────
   Scroll-reveal wrapper
───────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className,
  style,
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  direction?: "up" | "left" | "right";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const offsets = { up: { y: 48, x: 0 }, left: { y: 0, x: -40 }, right: { y: 0, x: 40 } };
  const { y, x } = offsets[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Marquee Strip
───────────────────────────────────────────── */
function MarqueeStrip() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div
      className="relative overflow-hidden py-5"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.015)",
      }}
    >
      {/* Fade edges */}
      <div
        className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #000, transparent)" }}
      />
      <div
        className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #000, transparent)" }}
      />
      <motion.div
        className="flex gap-10 whitespace-nowrap w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 24, ease: "linear", repeat: Infinity }}
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              {item}
            </span>
            <span style={{ color: "var(--brand-green)", fontSize: "0.5rem" }}>◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Stats Bar
───────────────────────────────────────────── */
function StatsBar() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px"
          style={{ background: "rgba(255,255,255,0.06)", borderRadius: "1.5rem", overflow: "hidden" }}
        >
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div
                className="flex flex-col items-center justify-center py-10 px-6 text-center relative group transition-colors duration-500"
                style={{ background: "#000" }}
              >
                {/* hover tint */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "rgba(0,255,136,0.03)" }}
                />
                <span
                  style={{
                    fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                    fontWeight: 900,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    color: "var(--brand-green)",
                    fontFamily: "'DM Sans', sans-serif",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.35)",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Individual Service Block
───────────────────────────────────────────── */
function ServiceRow({ service, index }: { service: ServiceData; index: number }) {
  const isEven = index % 2 === 0;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [-24, 24]);

  return (
    <section ref={ref} className="relative" style={{ padding: "clamp(5rem, 10vh, 8rem) 0" }}>
      {/* Section divider */}
      <div
        className="absolute top-0 left-0 right-0 mx-auto max-w-[1400px] px-6 lg:px-16"
        style={{ height: "1px" }}
      >
        <div style={{ height: "1px", background: "rgba(255,255,255,0.05)" }} />
      </div>

      <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
        <div
          className={`flex flex-col gap-16 lg:gap-28 items-center ${isEven ? "md:flex-row" : "md:flex-row-reverse"
            }`}
        >
          {/* ── Image Side ── */}
          <Reveal delay={0} direction={isEven ? "left" : "right"} className="w-full md:w-[55%]">
            <div className="relative group" style={{ borderRadius: "1.75rem", overflow: "hidden" }}>
              {/* Glowing border */}
              <div
                className="absolute -inset-px rounded-[1.75rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10"
                style={{
                  background: `linear-gradient(135deg, color-mix(in srgb, var(--brand-green) 40%, transparent), transparent 60%)`,
                }}
              />

              {/* Number watermark */}
              <div
                className="absolute top-6 right-6 z-20 pointer-events-none select-none"
                style={{
                  fontSize: "clamp(5rem, 10vw, 9rem)",
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: "-0.05em",
                  color: "rgba(255,255,255,0.04)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {service.number}
              </div>

              <motion.div
                style={{ y: imageY, aspectRatio: "16/11", position: "relative" }}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                />
              </motion.div>

              {/* Dark vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%), linear-gradient(135deg, rgba(0,0,0,0.3) 0%, transparent 60%)",
                }}
              />

              {/* Category badge over image */}
              <div
                className="absolute bottom-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full"
                style={{
                  background: "rgba(0,0,0,0.7)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <span style={{ color: "var(--brand-green)" }}>{service.icon}</span>
                <span
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  {service.category}
                </span>
              </div>
            </div>
          </Reveal>

          {/* ── Content Side ── */}
          <div className="w-full md:w-[45%] flex flex-col justify-center">
            <Reveal delay={0.15} direction={isEven ? "right" : "left"}>
              {/* Step indicator line */}
              <div className="flex items-center gap-4 mb-8">
                <span
                  style={{
                    fontSize: "clamp(5rem, 9vw, 8rem)",
                    fontWeight: 900,
                    letterSpacing: "-0.06em",
                    lineHeight: 1,
                    color: "rgba(255,255,255,0.04)",
                    fontFamily: "'DM Sans', sans-serif",
                    userSelect: "none",
                  }}
                >
                  {service.number}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background: "linear-gradient(to right, rgba(0,255,136,0.4), transparent)",
                  }}
                />
              </div>

              {/* Title */}
              <h2
                style={{
                  fontSize: "clamp(2rem, 3.2vw, 2.8rem)",
                  fontWeight: 800,
                  lineHeight: 1.08,
                  letterSpacing: "-0.025em",
                  color: "#fff",
                  marginBottom: "1.5rem",
                }}
              >
                {service.title}
              </h2>

              {/* Description */}
              <p
                style={{
                  fontSize: "clamp(1rem, 1.1vw, 1.1rem)",
                  lineHeight: 1.75,
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: "2.5rem",
                  maxWidth: "42ch",
                }}
              >
                {service.description}
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2 mb-10">
                {service.highlights.map((h, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: "0.35rem 0.85rem",
                      borderRadius: "6px",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.55)",
                      transition: "all 0.25s",
                      cursor: "default",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(0,255,136,0.06)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,136,0.25)";
                      (e.currentTarget as HTMLElement).style.color = "rgba(0,255,136,0.9)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)";
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <Link
                href="/contact"
                className="group inline-flex items-center gap-4 w-fit"
                style={{ textDecoration: "none" }}
              >
                <span
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.5)",
                    transition: "color 0.3s",
                  }}
                  className="group-hover:!text-white"
                >
                  Discuss this service
                </span>
                <div
                  className="relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-110"
                  style={{ background: "var(--brand-green)", color: "#000" }}
                >
                  <ArrowRight
                    size={16}
                    strokeWidth={2.5}
                    className="transition-transform duration-300 group-hover:translate-x-5"
                    style={{ position: "absolute" }}
                  />
                  <ArrowRight
                    size={16}
                    strokeWidth={2.5}
                    className="transition-transform duration-300 -translate-x-5 group-hover:translate-x-0"
                    style={{ position: "absolute" }}
                  />
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Process Section
───────────────────────────────────────────── */
const processSteps = [
  {
    step: "01",
    title: "Discovery & Strategy",
    desc: "We start by understanding your business — not just your brief. Through structured discovery sessions, we map your goals, audience, and competitive landscape to define an architecture and strategy that solves the real problem.",
    detail: "2–3 Day Sprint",
  },
  {
    step: "02",
    title: "Design, Build & Iterate",
    desc: "Our team of designers and engineers work in close, fast cycles — shipping real, testable increments. Every sprint delivers visible progress, keeping you in full control from concept to launch.",
    detail: "Agile Delivery",
  },
  {
    step: "03",
    title: "Launch, Scale & Support",
    desc: "Shipping is just the beginning. We monitor performance, gather data, and continuously optimize — scaling your product's infrastructure to match your growth. We're a long-term partner, not a vendor.",
    detail: "Ongoing Partnership",
  },
];

function ProcessSection() {
  const [active, setActive] = useState(0);

  return (
    <section
      className="py-24 relative"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
            <h2
              style={{
                fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#fff",
                lineHeight: 1.1,
              }}
            >
              How We <span style={{ color: "var(--brand-green)" }}>Work</span>
            </h2>
            <p
              style={{
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.35)",
                maxWidth: "30ch",
                lineHeight: 1.6,
                textAlign: "right",
              }}
            >
              A client-centric process built on innovation, transparency, and continuous delivery.
            </p>
          </div>
        </Reveal>

        {/* Interactive accordion-style steps */}
        <div className="flex flex-col gap-0">
          {processSteps.map((item, i) => (
            <Reveal key={item.step} delay={i * 0.1}>
              <button
                className="w-full text-left group"
                onClick={() => setActive(active === i ? -1 : i)}
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
              >
                <div
                  className="relative py-8 transition-all duration-500"
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {/* Active green line */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-500"
                    style={{
                      background: active === i ? "var(--brand-green)" : "transparent",
                    }}
                  />

                  <div className="flex items-start gap-8 pl-8">
                    {/* Step number */}
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        color: active === i ? "var(--brand-green)" : "rgba(255,255,255,0.2)",
                        minWidth: "2rem",
                        paddingTop: "0.25rem",
                        transition: "color 0.3s",
                      }}
                    >
                      {item.step}
                    </span>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3
                          style={{
                            fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
                            fontWeight: 700,
                            letterSpacing: "-0.02em",
                            color: active === i ? "#fff" : "rgba(255,255,255,0.5)",
                            transition: "color 0.3s",
                          }}
                        >
                          {item.title}
                        </h3>
                        <span
                          style={{
                            fontSize: "0.65rem",
                            fontWeight: 600,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: active === i ? "var(--brand-green)" : "rgba(255,255,255,0.2)",
                            transition: "color 0.3s",
                          }}
                        >
                          {item.detail}
                        </span>
                      </div>

                      {/* Expandable desc */}
                      <motion.div
                        initial={false}
                        animate={{ height: active === i ? "auto" : 0, opacity: active === i ? 1 : 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <p
                          style={{
                            fontSize: "1rem",
                            color: "rgba(255,255,255,0.45)",
                            lineHeight: 1.7,
                            marginTop: "1rem",
                            maxWidth: "60ch",
                          }}
                        >
                          {item.desc}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Bottom CTA Section
───────────────────────────────────────────── */
function CtaSection() {
  return (
    <section className="py-32 relative overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      {/* Radial glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 100%, color-mix(in srgb, var(--brand-green) 10%, transparent), transparent)",
        }}
      />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-16 relative text-center">
        <Reveal>
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
            CODO Agency — Work With Us
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
            Let's build your
            <br />
            <span style={{ color: "var(--brand-green)" }}>next big idea.</span>
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
            From a single landing page to a full AI-powered platform — CODO Agency delivers custom digital solutions that drive real business growth. Tell us what you're building.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3"
            style={{ textDecoration: "none" }}
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
              <ArrowUpRight size={18} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Main Page Entry
───────────────────────────────────────────── */
export default function ServicesPage() {
  return (
    <main
      className="relative min-h-screen"
      style={{
        background: "#000",
        fontFamily: "'DM Sans', sans-serif",
        color: "#fff",
      }}
    >
      {/* Subtle noise grain overlay */}
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
          paddingBottom: "clamp(3rem, 6vh, 6rem)",
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
              "radial-gradient(ellipse 60% 60% at 50% 30%, color-mix(in srgb, var(--brand-green) 7%, transparent), transparent)",
          }}
        />

        <div className="mx-auto max-w-[1400px] px-6 lg:px-16 relative">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--brand-green)",
              marginBottom: "1.5rem",
            }}
          >
            CODO Agency — Digital Solutions
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
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
              EXPER
              <br />
              <span style={{ color: "var(--brand-green)", WebkitTextStroke: "0px" }}>TISE.</span>
            </h1>

            {/* Right side: description + scroll indicator */}
            <div
              className="flex flex-col justify-end gap-8"
              style={{ paddingBottom: "0.5rem", maxWidth: "320px" }}
            >
              <p
                style={{
                  fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)",
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.7,
                }}
              >
                CODO Agency is the service arm of CODO AI Innovations — delivering custom web, software, mobile, and AI-powered solutions to businesses and startups worldwide.
              </p>
              <div className="flex items-center gap-3">
                <div
                  style={{
                    width: "2px",
                    height: "48px",
                    background: "linear-gradient(to bottom, var(--brand-green), transparent)",
                    borderRadius: "1px",
                  }}
                />
                <span
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.2)",
                  }}
                >
                  Scroll to explore
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Marquee ───────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <MarqueeStrip />
      </motion.div>

      {/* ── Stats Bar ─────────────────────────────────────────────────── */}
      <StatsBar />

      {/* ── Services List ─────────────────────────────────────────────── */}
      <div>
        {servicesList.map((service, index) => (
          <ServiceRow key={service.id} service={service} index={index} />
        ))}
      </div>

      {/* ── Process ───────────────────────────────────────────────────── */}
      <ProcessSection />

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <CtaSection />
    </main>
  );
}