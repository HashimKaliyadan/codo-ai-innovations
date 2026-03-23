"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { TransitionLink as Link } from "@/components/transition/TransitionLink";
import { ArrowRight } from "lucide-react";

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
}

const servicesList: ServiceData[] = [
  {
    id: "web",
    number: "01",
    category: "Architecture & Engineering",
    title: "Custom Website Development",
    description:
      "We design and build high-performance web applications that merge stunning visual aesthetics with scalable, rock-solid engineering. Instead of relying on cookie-cutter templates, we engineer bespoke digital environments using modern frameworks optimized for maximum performance, accessibility, and conversion.",
    highlights: ["Next.js & React Core", "Server-Side Rendering", "Headless CMS integration", "Zero-layout-shift UI", "Global CDN Edge routing"],
    image: "/images/services/service_web_dev.png",
  },
  {
    id: "mobile",
    number: "02",
    category: "Mobile Platforms",
    title: "Native-quality Mobile Applications",
    description:
      "Your users expect apps that feel instantaneous, look beautiful on any screen size, and work flawlessly even when offline. We build cross-platform mobile experiences that don't compromise on native capabilities or frame rates, ensuring a premium feel from the first launch.",
    highlights: ["React Native & Expo", "Offline-first architecture", "60fps micro-animations", "Native hardware APIs", "App Store deployment"],
    image: "/images/services/service_mobile_apps.png",
  },
  {
    id: "ai",
    number: "03",
    category: "AI & Machine Learning",
    title: "Intelligent Automation & AI Integration",
    description:
      "Move beyond standard programmatic logic. We embed autonomous AI agents and Large Language Models directly into your business workflows, turning complex manual processes into streamlined, intelligent operations that learn and adapt.",
    highlights: ["LLM Fine-tuning", "Autonomous Agent orchestration", "RAG Systems", "Predictive user modeling", "Automated data workflows"],
    image: "/images/services/service_ai_solutions.png",
  },
];

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
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Individual Service Block (Alternating rows)
───────────────────────────────────────────── */
function ServiceRow({
  service,
  index,
}: {
  service: ServiceData;
  index: number;
}) {
  const isEven = index % 2 === 0; // True = Image on Left, False = Image on Right

  return (
    <section className="py-16 md:py-24 relative">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
        <div
          className={`flex flex-col gap-12 lg:gap-24 items-center ${
            isEven ? "md:flex-row" : "md:flex-row-reverse"
          }`}
        >
          {/* Image Side */}
          <div className="w-full md:w-[50%] lg:w-[55%]">
            <Reveal delay={0}>
              <div
                className="relative overflow-hidden group"
                style={{
                  borderRadius: "2rem",
                  aspectRatio: "16 / 11",
                  background: "var(--glass-border)",
                }}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                {/* Subtle dark gradient inset */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "inset 0 0 100px rgba(0,0,0,0.4)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "2rem",
                  }}
                />
              </div>
            </Reveal>
          </div>

          {/* Content Side */}
          <div className="w-full md:w-[50%] lg:w-[45%] flex flex-col justify-center">
            <Reveal delay={0.2}>
              {/* Meta: Number & Category */}
              <div className="flex items-center gap-4 mb-6">
                <span
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                    fontWeight: 300,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    color: "rgba(255,255,255,0.15)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {service.number}
                </span>
                <span
                  style={{
                    display: "inline-block",
                    padding: "0.4rem 0.8rem",
                    borderRadius: "100px",
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--brand-green)",
                    border: "1px solid color-mix(in srgb, var(--brand-green) 25%, transparent)",
                  }}
                >
                  {service.category}
                </span>
              </div>

              {/* Title */}
              <h2
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: "var(--text-primary)",
                  marginBottom: "1.5rem",
                }}
              >
                {service.title}
              </h2>

              {/* Description */}
              <p
                style={{
                  fontSize: "clamp(1.05rem, 1.2vw, 1.15rem)",
                  lineHeight: 1.7,
                  color: "var(--text-secondary)",
                  marginBottom: "2.5rem",
                }}
              >
                {service.description}
              </p>

              {/* Highlights Pills */}
              <div className="flex flex-wrap gap-2 mb-10">
                {service.highlights.map((highlight, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: "0.4rem 0.8rem",
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      backgroundColor: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    {highlight}
                  </span>
                ))}
              </div>

              {/* CTA Link */}
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 w-fit"
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "white",
                  textDecoration: "none",
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: "var(--brand-green)",
                    color: "#000",
                  }}
                >
                  <ArrowRight size={20} strokeWidth={2.5} />
                </div>
                <span className="relative">
                  Discuss this service
                  <span
                    className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full"
                    style={{ background: "white" }}
                  />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
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
        {/* Ambient glow centered */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "900px",
            height: "600px",
            background:
              "radial-gradient(ellipse, color-mix(in srgb, var(--brand-green) 8%, transparent) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />

        <div className="mx-auto max-w-[1400px] relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <h1
              style={{
                fontSize: "clamp(4rem, 13vw, 11rem)",
                fontWeight: 900,
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              EXPER<span style={{ color: "var(--brand-green)" }}>TISE</span>
            </h1>

            {/* Subtitle */}
            <div className="max-w-sm" style={{ paddingBottom: "1rem" }}>
              <p
                style={{
                  fontSize: "clamp(1rem, 1.2vw, 1.15rem)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                We blend bleeding-edge technology with premium design to build digital products that feel inevitable. Here is what we do best.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Services List ────────────────────────────────────────────── */}
      <div className="pb-24">
        {servicesList.map((service, index) => (
          <ServiceRow key={service.id} service={service} index={index} />
        ))}
      </div>

      {/* ── Process/Methodology Section ──────────────────────────────── */}
      <section className="py-24 relative border-t border-white/5 bg-white/[0.02]">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <Reveal>
            <div className="text-center mb-16">
              <h2
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: "var(--text-primary)",
                }}
              >
                How We Work
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Discovery & Arch",
                desc: "We don't just take orders. We dive deep into your business logic to design an architecture that solves the root problem.",
              },
              {
                step: "02",
                title: "Precision Engineering",
                desc: "Our codebases are pristine. We build in fast iterational cycles using strict CI/CD pipelines and rigorous automated testing.",
              },
              {
                step: "03",
                title: "Scale & Optimize",
                desc: "Launch is day zero. We monitor edge analytics, identify performance bottlenecks, and scale the infrastructure up dynamically.",
              },
            ].map((item, i) => (
              <Reveal key={item.step} delay={0.1 * i}>
                <div
                  className="h-full flex flex-col p-8 rounded-[2rem] transition-colors duration-500 hover:bg-white/[0.03]"
                  style={{
                    border: "1px solid var(--glass-border)",
                    background: "rgba(10,10,10,0.4)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 900,
                      color: "var(--brand-green)",
                      marginBottom: "1rem",
                    }}
                  >
                    {item.step}
                  </span>
                  <h3
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: 700,
                      color: "white",
                      marginBottom: "1rem",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
