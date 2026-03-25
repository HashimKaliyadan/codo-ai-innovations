"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { TransitionLink as Link } from "@/components/transition/TransitionLink";
import { ArrowRight, ArrowUpRight, Zap, Globe, Brain, Code2 } from "lucide-react";

/* ─── Types & Data ────────────────────────────────────────────────── */
interface ServiceData {
  id: string;
  number: string;
  title: string;
  description: string;
  category: string;
  highlights: string[];
  image: string;
  icon: React.ReactNode;
}

const servicesList: ServiceData[] = [
  {
    id: "web",
    number: "01",
    category: "Web & Digital Presence",
    title: "Custom Website Development",
    description: "Your website is your brand's most powerful asset. CODO Agency designs and engineers high-performance web experiences built on modern frameworks, optimized for speed, accessibility, and highest conversion.",
    highlights: ["Next.js & React", "Server-Side Rendering", "Headless CMS", "SEO-Optimized"],
    image: "/images/services/service_web_dev.png",
    icon: <Globe size={18} />,
  },
  {
    id: "software",
    number: "02",
    category: "Software Engineering",
    title: "Custom Software Development",
    description: "Off-the-shelf tools cap your growth. We build purpose-built software solutions tailored to your exact workflows — scalable, maintainable, and engineered to solve root problems over patches.",
    highlights: ["Full-stack Architecture", "SaaS & B2B Platforms", "REST & GraphQL APIs", "CI/CD Pipelines"],
    image: "/images/services/service_software_dev.png",
    icon: <Code2 size={18} />,
  },
  {
    id: "mobile",
    number: "03",
    category: "Mobile Platforms",
    title: "Mobile Application Development",
    description: "Users expect apps that feel instant and look flawless. CODO Agency delivers cross-platform mobile experiences that don't compromise on native performance or hardware integrations.",
    highlights: ["React Native & Expo", "iOS & Android", "Offline-first Architecture", "App Store Deployment"],
    image: "/images/services/service_mobile_apps.png",
    icon: <Zap size={18} />,
  },
  {
    id: "ai",
    number: "04",
    category: "AI & Intelligent Systems",
    title: "AI-Based Solutions & Automation",
    description: "CODO AI Innovations is built on a foundation of artificial intelligence. We integrate LLMs, autonomous agents, and intelligent data pipelines directly into your business workflows.",
    highlights: ["LLM Integration", "Autonomous Agents", "RAG Systems", "Predictive Modeling"],
    image: "/images/services/service_ai_solutions.png",
    icon: <Brain size={18} />,
  },
];

const stats = [
  { value: "50+", label: "Products Shipped" },
  { value: "3×", label: "Avg. Perf. Gain" },
  { value: "100%", label: "Client Retention" },
  { value: "<48h", label: "Sprint Turnaround" },
];

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── Helper Components ───────────────────────────────────────────── */
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
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const offsets = { up: { y: 40, x: 0 }, left: { y: 0, x: -40 }, right: { y: 0, x: 40 } };
  const { y, x } = offsets[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

function ScrollIndicator({ delay = 1 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay }}
      className="flex items-center gap-3 mt-12"
    >
      <div style={{ position: "relative", width: "1px", height: "52px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.08)" }} />
        <motion.div
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.4 }}
          style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(to bottom, transparent, var(--brand-green))" }}
        />
      </div>
      <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
        Scroll to explore
      </span>
    </motion.div>
  );
}

/* ─── Section Components ──────────────────────────────────────────── */

function ServicesHero() {
  return (
    <section className="relative overflow-hidden" style={{ paddingTop: "clamp(8rem, 18vh, 14rem)", paddingBottom: "clamp(4rem, 8vh, 8rem)" }}>
      <div aria-hidden className="absolute pointer-events-none" style={{ top: "-10%", left: "50%", transform: "translateX(-50%)", width: "100vw", height: "70vh", background: "radial-gradient(ellipse 60% 60% at 50% 30%, color-mix(in srgb, var(--brand-green) 6%, transparent), transparent)" }} />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-16 relative">
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE_OUT }} className="text-[0.62rem] font-bold uppercase tracking-[0.32em] text-[var(--brand-green)] mb-6">
          CODO Agency — Services
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-end">
          {/* Left: Headline */}
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.1 }}>
            <h1 style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.045em", margin: 0, color: "#fff" }}>
              DIGITAL<br />EXCEL<br /><span className="text-[var(--brand-green)]">LENCE.</span>
            </h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.45 }} className="text-[clamp(1rem,1.15vw,1.1rem)] text-white/40 leading-relaxed mt-10 max-w-[38ch]">
              We design, engineer, and scale <span className="text-white/75 font-semibold">custom digital platforms</span> that transform businesses. From intuitive web applications to autonomous AI workflows.
            </motion.p>

            <ScrollIndicator delay={1.1} />
          </motion.div>

          {/* Right: Collage */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE_OUT, delay: 0.3 }} className="relative hidden md:block" style={{ height: "clamp(400px, 50vh, 520px)" }}>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.4 }} className="absolute right-0 top-0 w-[65%] h-full rounded-[1.5rem] overflow-hidden border border-white/5">
              <Image src={servicesList[0].image} alt="Web" fill className="object-cover" sizes="50vw" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 flex items-center gap-2 px-4 py-2 rounded-full bg-black/70 backdrop-blur-md border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[var(--brand-green)]" />
                <span className="text-[0.62rem] font-bold uppercase tracking-widest text-white/80">Engineering</span>
              </div>
            </motion.div>

            <div className="absolute left-0 top-[5%] w-[32%] h-[90%] flex flex-col gap-4">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.55 }} className="flex-1 rounded-[1.25rem] overflow-hidden border border-white/5 relative">
                <Image src={servicesList[1].image} alt="Software" fill className="object-cover" sizes="25vw" priority />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.65 }} className="flex-1 rounded-[1.25rem] overflow-hidden border border-white/5 relative">
                <Image src={servicesList[3].image} alt="AI" fill className="object-cover" sizes="25vw" priority />
              </motion.div>
            </div>
            
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.9, type: "spring", bounce: 0.35 }} className="absolute left-[25%] bottom-[-1rem] bg-black/85 backdrop-blur-xl border border-[var(--brand-green)]/20 py-4 px-6 rounded-2xl flex items-center gap-4 z-10 shadow-2xl">
              <span className="text-[clamp(1.8rem,3vw,2.2rem)] font-black text-[var(--brand-green)] leading-none">4+</span>
              <div>
                <p className="text-[0.72rem] font-bold text-white leading-tight">Core Disciplines</p>
                <p className="text-[0.6rem] text-white/40 leading-tight">End-to-end delivery</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <section className="py-12 border-b border-white/5">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <div className="group relative flex flex-col items-center justify-center p-8 lg:p-10 rounded-[2rem] transition-all duration-500 hover:scale-[1.02] bg-white/[0.02] border border-white/5">
                <div className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-r from-transparent via-[var(--brand-green)] to-transparent" />
                <span className="text-[clamp(2rem,4vw,3rem)] font-black tracking-tighter leading-none text-[var(--brand-green)] mb-3">
                  {stat.value}
                </span>
                <span className="text-[0.6rem] font-bold tracking-[0.15em] uppercase text-white/30 text-center">
                  {stat.label}
                </span>
                <div className="absolute inset-0 border border-[var(--brand-green)]/0 group-hover:border-[var(--brand-green)]/15 rounded-[2rem] transition-colors duration-500 pointer-events-none" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceBentoCard({ service, index }: { service: ServiceData; index: number }) {
  return (
    <Reveal delay={(index % 2) * 0.15}>
      <Link href="/contact" className="group block relative no-underline text-inherit h-full flex flex-col">
        {/* Hairline top divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />
        
        {/* Image Header */}
        <div className="relative overflow-hidden mb-6 rounded-[1.5rem] bg-white/[0.02]" style={{ aspectRatio: "16/10" }}>
          <div className="absolute -inset-px rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 border border-[var(--brand-green)]/30" />
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" />
          
          <div className="absolute bottom-6 left-6 z-10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-[var(--brand-green)] transition-transform duration-500 group-hover:scale-110">
              {service.icon}
            </div>
            <span className="text-[2rem] font-black tracking-tighter text-white/10 select-none pointer-events-none">
              {service.number}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex flex-col flex-1 pl-2 pr-4">
          <div className="flex items-center gap-3 mb-4 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--brand-green)]">
            {service.category}
          </div>
          <h3 className="text-[clamp(1.5rem,2vw,1.8rem)] font-extrabold leading-[1.15] tracking-tight text-white mb-4 transition-colors duration-300 group-hover:text-[var(--brand-green)]">
            {service.title}
          </h3>
          <p className="text-[1rem] leading-relaxed text-white/40 mb-8 flex-1">
            {service.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {service.highlights.map((h, i) => (
              <span key={i} className="px-3 py-1.5 rounded-md border border-white/5 bg-white/[0.03] text-[0.65rem] font-bold tracking-widest uppercase text-white/40 transition-all duration-300 group-hover:bg-[var(--brand-green)]/10 group-hover:border-[var(--brand-green)]/20 group-hover:text-[var(--brand-green)]">
                {h}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-auto">
            <span className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-white/30 transition-colors duration-300 group-hover:text-white">
              Start Project
            </span>
            <div className="relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:bg-[var(--brand-green)] text-[var(--brand-green)] group-hover:text-black border border-white/5">
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

function ServicesGrid() {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
        <Reveal>
           <div className="mb-20">
             <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] font-black tracking-tight text-white leading-none">
               Our <span className="text-[var(--brand-green)]">Capabilities</span>
             </h2>
           </div>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-24 md:gap-x-12 lg:gap-x-16">
          {servicesList.map((service, i) => (
            <ServiceBentoCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

const processes = [
  { step: "01", title: "Discovery", desc: "We map your goals, audience, and competitive landscape to define an architecture that solves the real problem.", detail: "Sprint 1" },
  { step: "02", title: "Architecture", desc: "Our engineers design scalable, modern systems using best-in-class frameworks like Next.js, React Native, and LLM orchestration.", detail: "Sprint 2" },
  { step: "03", title: "Execution", desc: "We build in fast, testable increments. Every sprint delivers visible progress, keeping you in full control.", detail: "Agile Delivery" },
  { step: "04", title: "Launch & Scale", desc: "We monitor performance, gather data, and continuously optimize — scaling your product's infrastructure to match your growth.", detail: "Ongoing" },
];

function ProcessListSection() {
  return (
    <section className="py-24 md:py-32 relative border-t border-white/5 bg-white/[0.01]">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-5">
               <p className="text-[0.62rem] font-bold uppercase tracking-[0.3em] text-[var(--brand-green)] mb-5">
                 How We Work
               </p>
               <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-black tracking-tight text-white leading-[1.1]">
                 A process built on<br /><span className="text-[var(--brand-green)]">transparency.</span>
               </h2>
            </div>
            <div className="lg:col-span-7 flex flex-col justify-end">
              <p className="text-[0.95rem] text-white/40 leading-relaxed max-w-[50ch]">
                We don't do black-box development. Our process is client-centric, built on rapid iteration, and heavily relies on continuous delivery.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
           <div className="h-px w-full bg-white/5 mb-8 origin-left" />
        </Reveal>

        <div className="flex flex-col">
          {processes.map((proc, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="group relative py-8 border-b border-white/5 transition-colors duration-300">
                {/* Left hover bar */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full transition-colors duration-300 bg-transparent group-hover:bg-[var(--brand-green)]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-green)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pl-8 relative z-10">
                  <div className="flex items-center gap-8 md:w-[40%]">
                     <span className="text-[1.2rem] font-black tracking-tighter text-white/20 transition-colors duration-300 group-hover:text-[var(--brand-green)]">
                       {proc.step}
                     </span>
                     <h3 className="text-[clamp(1.2rem,1.8vw,1.5rem)] font-bold tracking-tight text-white/60 transition-colors duration-300 group-hover:text-white">
                       {proc.title}
                     </h3>
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-[0.95rem] text-white/30 leading-relaxed max-w-[45ch] transition-colors duration-300 group-hover:text-white/50">
                      {proc.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-[0.7rem] font-bold uppercase tracking-widest text-white/20 transition-colors duration-300 group-hover:text-white/60 flex-shrink-0">
                    {proc.detail}
                    <ArrowRight size={14} className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-[var(--brand-green)]" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="py-32 md:py-48 relative overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-16 relative text-center">
        <Reveal>
          <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.3em] text-[var(--brand-green)] mb-8">Ready to Build?</p>
          <h2 style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 0.9, color: "#fff", marginBottom: "2.5rem" }}>
            Let's ship your<br /><span className="text-[var(--brand-green)]">next big idea.</span>
          </h2>
          <p className="text-[clamp(1rem, 1.25vw, 1.25rem)] text-white/40 leading-relaxed max-w-[48ch] mx-auto mb-16">
            From a single MVP sprint to a full AI-powered enterprise platform — CODO Agency delivers.
          </p>
          <Link href="/contact" className="group inline-flex items-center gap-4 px-10 py-5 rounded-full transition-all duration-500 hover:scale-105" style={{ background: "var(--brand-green)", color: "#000" }}>
            <span className="text-[0.95rem] font-black uppercase tracking-wider">Start a Conversation</span>
            <ArrowRight size={22} strokeWidth={3} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen bg-[#000] text-[#fff]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div aria-hidden className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`, backgroundSize: "256px" }} />
      
      <ServicesHero />
      <StatsBar />
      <ServicesGrid />
      <ProcessListSection />
      <CtaSection />
    </main>
  );
}