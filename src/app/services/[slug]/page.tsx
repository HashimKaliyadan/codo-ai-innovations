"use client";

import { use, useRef } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { TransitionLink as Link } from "@/components/transition/TransitionLink";
import { servicesDetailData } from "@/data/services-detail";
import { ArrowLeft, ArrowRight, Zap, CheckCircle2, Target, MoveRight } from "lucide-react";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

function Reveal({ children, delay = 0, className, style }: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const service = servicesDetailData[slug];

  if (!service) {
    notFound();
  }

  return (
    <main className="relative min-h-screen bg-[#000] text-[#fff] overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Noise grain */}
      <div aria-hidden className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`, backgroundSize: "256px" }} />

      {/* ── Hero Section ────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32">
        <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[70vh] pointer-events-none z-0" style={{ background: "radial-gradient(circle at 50% 20%, rgba(0, 255, 136, 0.08) 0%, transparent 70%)" }} />
        
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16 relative z-10">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
              <div className="max-w-[800px]">
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.4em] text-[var(--brand-green)] mb-6">
                  Service Detail • {service.category}
                </p>
                <h1 className="text-[clamp(3rem,8vw,6.5rem)] font-black leading-[0.95] tracking-tighter text-white mb-10">
                  {service.title.split(' ').map((word, i) => (
                    <span key={i} className={i === service.title.split(' ').length - 1 ? "text-[var(--brand-green)]" : ""}>
                      {word}{' '}
                    </span>
                  ))}
                </h1>
              </div>
              
              <div className="lg:pb-4">
                <div className="px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md max-w-[320px]">
                  <p className="text-[0.7rem] font-bold text-white/40 uppercase tracking-widest mb-1">Status</p>
                  <p className="text-[0.9rem] font-bold text-[var(--brand-green)] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--brand-green)] animate-pulse" />
                    Accepting Projects
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Definition & Image ───────────────────────────────────────── */}
      <section className="pb-24 border-b border-white/5">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16 container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6">
              <Reveal>
                <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-extrabold leading-tight mb-8">
                  Defining <span className="text-[var(--brand-green)]">{service.title}</span>
                </h2>
                <p className="text-[1.15rem] leading-relaxed text-white/60 mb-10 font-medium">
                  {service.definition}
                </p>
                
                <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm">
                  <h3 className="text-[0.65rem] font-black uppercase tracking-[0.25em] text-[var(--brand-green)] mb-4">Our Core Approach</h3>
                  <p className="text-[1rem] leading-relaxed text-white/40">
                    {service.approach}
                  </p>
                </div>
              </Reveal>
            </div>
            
            <div className="lg:col-span-6">
              <Reveal delay={0.2}>
                <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 group h-[500px]">
                  <Image src={service.image} alt={service.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" sizes="50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process: How We Provide It ────────────────────────────────── */}
      <section className="py-32 bg-white/[0.01]">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <Reveal>
            <div className="mb-20 text-center max-w-[800px] mx-auto">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.4em] text-[var(--brand-green)] mb-4">The Methodology</p>
              <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-black text-white leading-none tracking-tighter">
                How CODO <span className="text-[var(--brand-green)]">Provides It.</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.process.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group relative p-8 rounded-[2rem] bg-black border border-white/5 hover:border-[var(--brand-green)]/30 transition-all duration-500 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[1.5rem] font-black tracking-tighter text-[var(--brand-green)]/20 group-hover:text-[var(--brand-green)] transition-colors duration-500">
                      {p.step}
                    </span>
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:text-[var(--brand-green)] group-hover:border-[var(--brand-green)]/30 transition-all duration-500">
                      <Zap size={16} fill="currentColor" className="opacity-0 group-hover:opacity-20 transition-opacity" />
                    </div>
                  </div>
                  <h3 className="text-[1.25rem] font-bold text-white mb-4 group-hover:text-[var(--brand-green)] transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="text-[0.95rem] leading-relaxed text-white/30 group-hover:text-white/50 transition-colors duration-300">
                    {p.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Key Features Grid ────────────────────────────────────────── */}
      <section className="py-32 border-t border-white/5">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <div className="sticky top-32">
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.4em] text-[var(--brand-green)] mb-4">Capabilities</p>
                  <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black text-white leading-[1.1] mb-8">
                    What we bring to the <span className="text-[var(--brand-green)]">table.</span>
                  </h2>
                  <p className="text-[1rem] leading-relaxed text-white/40 mb-10 max-w-[30ch]">
                    Elite-level solutions crafted for companies that refuse to compromise on quality and user experience.
                  </p>
                  
                  <div className="flex flex-col gap-4">
                    {['Zero-bug policy', 'High-performance focus', 'Brand-first engineering'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-white/60">
                         <div className="w-5 h-5 rounded-full bg-[var(--brand-green)]/10 flex items-center justify-center">
                            <CheckCircle2 size={12} className="text-[var(--brand-green)]" />
                         </div>
                         <span className="text-[0.8rem] font-bold uppercase tracking-wider">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
            
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.features.map((f, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="group p-8 rounded-[1.5rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-300">
                       <div className="w-12 h-12 rounded-xl bg-[var(--brand-green)]/10 flex items-center justify-center text-[var(--brand-green)] mb-6">
                           <Target size={22} strokeWidth={2.5} />
                       </div>
                       <h4 className="text-[1.35rem] font-bold text-white mb-3 group-hover:text-[var(--brand-green)] transition-colors">{f.title}</h4>
                       <p className="text-[0.95rem] leading-relaxed text-white/30 group-hover:text-white/50 transition-colors">{f.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <section className="py-48 relative overflow-hidden text-center">
         <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, rgba(0, 255, 136, 0.05) 0%, transparent 70%)" }} />
         
         <div className="mx-auto max-w-[1400px] px-6 lg:px-16 relative">
            <Reveal>
               <h2 className="text-[clamp(2.5rem,8vw,7rem)] font-black text-white leading-none tracking-tighter mb-12">
                  Ready to <span className="text-[var(--brand-green)]">elevate?</span>
               </h2>
               <p className="text-[clamp(1rem,1.5vw,1.3rem)] text-white/40 leading-relaxed max-w-[42ch] mx-auto mb-16 font-medium">
                  Experience digital excellence. Let's discuss how we can build your next high-impact project.
               </p>
               
               <Link href="/contact" className="group relative inline-flex items-center gap-4 bg-[var(--brand-green)] text-black px-12 py-6 rounded-full font-black uppercase tracking-widest text-[0.9rem] transition-all duration-500 hover:scale-105 hover:bg-white">
                  Start Your Project
                  <MoveRight size={20} strokeWidth={3} className="transition-transform duration-300 group-hover:translate-x-1" />
               </Link>
            </Reveal>
         </div>
      </section>
    </main>
  );
}
