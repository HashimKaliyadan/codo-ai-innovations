"use client";

import { useRef, useState, useMemo } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { TransitionLink as Link } from "@/components/transition/TransitionLink";
import { blogPosts } from "@/data/blog";
import { Calendar, Clock, ArrowRight, ArrowUpRight, Zap } from "lucide-react";

/* ─── Constants ────────────────────────────────────────────────────── */
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const CATEGORIES = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

/* ─── Components ───────────────────────────────────────────────────── */

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

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay: 1 }}
      className="flex items-center gap-3"
    >
      <div style={{ width: "2px", height: "48px", background: "linear-gradient(to bottom, var(--brand-green), transparent)", borderRadius: "1px" }} />
      <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", fontFamily: "'DM Sans', sans-serif" }}>
        Explore Journal
      </span>
    </motion.div>
  );
}

function FeaturedPost({ post }: { post: (typeof blogPosts)[0] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [-24, 24]);

  return (
    <section ref={ref} className="relative py-12 md:py-16">
      <Link href={`/blog/${post.slug}`} className="group block text-inherit no-underline">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <Reveal delay={0} direction="left" className="w-full md:w-[55%]">
            <div className="relative overflow-hidden" style={{ borderRadius: "1.75rem", aspectRatio: "16/11" }}>
              <div
                className="absolute -inset-px rounded-[1.75rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10"
                style={{ background: `linear-gradient(135deg, color-mix(in srgb, var(--brand-green) 30%, transparent), transparent 60%)` }}
              />
              <motion.div style={{ y: imageY, width: "100%", height: "100%", position: "relative" }}>
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                />
              </motion.div>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%), linear-gradient(135deg, rgba(0,0,0,0.3) 0%, transparent 60%)" }}
              />
              <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-green)]" />
                <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.9)" }}>
                  Featured • {post.category}
                </span>
              </div>
            </div>
          </Reveal>

          {/* Content Side */}
          <Reveal delay={0.15} direction="right" className="w-full md:w-[45%] flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6 text-[10px] font-bold uppercase tracking-widest text-white/40">
              <span className="flex items-center gap-1.5"><Calendar size={14} className="text-[var(--brand-green)]" />{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="flex items-center gap-1.5"><Clock size={14} className="text-[var(--brand-green)]" />{post.readTime}</span>
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 3.2vw, 3rem)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.025em", color: "#fff", marginBottom: "1.5rem" }} className="transition-colors duration-300 group-hover:text-[var(--brand-green)]">
              {post.title}
            </h2>
            <p style={{ fontSize: "clamp(1rem, 1.1vw, 1.1rem)", lineHeight: 1.75, color: "rgba(255,255,255,0.45)", marginBottom: "2.5rem", maxWidth: "42ch" }}>
              {post.excerpt}
            </p>
            <div className="inline-flex items-center gap-4 w-fit">
              <span style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", transition: "color 0.3s" }} className="group-hover:!text-white">
                Read Article
              </span>
              <div className="relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-110" style={{ background: "var(--brand-green)", color: "#000" }}>
                <ArrowRight size={16} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-5" style={{ position: "absolute" }} />
                <ArrowRight size={16} strokeWidth={2.5} className="transition-transform duration-300 -translate-x-5 group-hover:translate-x-0" style={{ position: "absolute" }} />
              </div>
            </div>
          </Reveal>
        </div>
      </Link>
    </section>
  );
}

function StandardPost({ post, index }: { post: (typeof blogPosts)[0]; index: number }) {
  return (
    <Reveal delay={(index % 3) * 0.1}>
      <Link href={`/blog/${post.slug}`} className="group block relative no-underline text-inherit h-full flex flex-col">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent mb-8" />
        <div className="relative overflow-hidden mb-6" style={{ borderRadius: "1.25rem", aspectRatio: "16/11", background: "rgba(255,255,255,0.02)" }}>
          <div className="absolute -inset-px rounded-[1.25rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" style={{ border: "1px solid rgba(0,255,136,0.2)" }} />
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
          <div className="absolute top-4 left-4 z-10">
            <span style={{ padding: "0.35rem 0.85rem", borderRadius: "6px", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.06em", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--brand-green)", textTransform: "uppercase" }}>
              {post.category}
            </span>
          </div>
        </div>
        <div className="flex flex-col flex-1 pl-1">
          <div className="flex items-center gap-3 mb-4 text-[9px] font-bold uppercase tracking-widest text-white/30">
            <span className="flex items-center gap-1.5"><Calendar size={12} className="text-[var(--brand-green)]" />{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-white/10" />
            <span className="flex items-center gap-1.5"><Clock size={12} className="text-[var(--brand-green)]" />{post.readTime}</span>
          </div>
          <h3 style={{ fontSize: "clamp(1.25rem, 1.8vw, 1.5rem)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em", color: "#fff", marginBottom: "1rem", transition: "color 0.3s" }} className="group-hover:text-[var(--brand-green)]">
            {post.title}
          </h3>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "rgba(255,255,255,0.4)", marginBottom: "2rem", flex: 1 }} className="line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-2 mt-auto pt-4 border-t border-white/5 w-fit">
            <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", transition: "color 0.3s" }} className="group-hover:text-white">
              Read Article
            </span>
            <div className="relative w-8 h-8 rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:bg-[var(--brand-green)] text-[var(--brand-green)] group-hover:text-[#000]" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
               <ArrowUpRight size={14} strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

function FooterNavCards() {
  const cards = [
    {
      title: "Engineering Excellence",
      desc: "Custom web, mobile, and AI solutions built for scale.",
      link: "/services",
      label: "View Services",
      icon: <Zap size={24} />,
    },
    {
      title: "Success Stories",
      desc: "Explore our recent work across brand and product.",
      link: "/portfolio",
      label: "See Portfolio",
      icon: <ArrowUpRight size={24} />,
    },
    {
      title: "Start a Project",
      desc: "Tell us what you're building — we'll help you ship it.",
      link: "/contact",
      label: "Get in Touch",
      icon: <ArrowRight size={24} />,
    },
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 100%, color-mix(in srgb, var(--brand-green) 8%, transparent), transparent)" }}
      />
      <div className="mx-auto max-w-[1400px] px-6 lg:px-16 relative">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {cards.map((card, i) => (
              <Link
                key={i}
                href={card.link}
                className="group block relative p-10 rounded-[32px] overflow-hidden no-underline transition-all duration-500"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(circle at 50% 0%, rgba(0,255,136,0.06), transparent 70%)" }}
                />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-8 w-12 h-12 rounded-2xl flex items-center justify-center text-[var(--brand-green)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" style={{ background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.1)" }}>
                    {card.icon}
                  </div>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.02em", color: "#fff", marginBottom: "1rem" }}>
                    {card.title}
                  </h3>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "rgba(255,255,255,0.4)", marginBottom: "2.5rem", flex: 1 }}>
                    {card.desc}
                  </p>
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-green)]">
                    {card.label} <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
                <div className="absolute inset-0 border border-[var(--brand-green)]/0 group-hover:border-[var(--brand-green)]/20 rounded-[32px] transition-colors duration-500 pointer-events-none" />
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Main Page ────────────────────────────────────────────────────── */

export default function BlogIndexPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return blogPosts;
    return blogPosts.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const featuredPost = activeCategory === "All" ? blogPosts[0] : null;
  const listPosts = activeCategory === "All" ? blogPosts.slice(1) : filteredPosts;

  return (
    <main className="relative min-h-screen" style={{ background: "#000", fontFamily: "'DM Sans', sans-serif", color: "#fff" }}>
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

      <section className="relative overflow-hidden" style={{ paddingTop: "clamp(8rem, 18vh, 14rem)", paddingBottom: "clamp(3rem, 6vh, 6rem)" }}>
        <div aria-hidden className="absolute pointer-events-none" style={{ top: "-10%", left: "50%", transform: "translateX(-50%)", width: "100vw", height: "70vh", background: "radial-gradient(ellipse 60% 60% at 50% 30%, color-mix(in srgb, var(--brand-green) 7%, transparent), transparent)" }} />
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16 relative">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE_OUT }} style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--brand-green)", marginBottom: "1.5rem" }}>CODO Agency — Journal</motion.p>
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.1 }} className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <h1 style={{ fontSize: "clamp(4.5rem, 14vw, 12rem)", fontWeight: 900, lineHeight: 0.87, letterSpacing: "-0.045em", color: "#fff", margin: 0 }}>IN<br /><span style={{ color: "var(--brand-green)" }}>SIGHTS.</span></h1>
            <div className="flex flex-col justify-end gap-8" style={{ paddingBottom: "0.5rem", maxWidth: "320px" }}>
              <p style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)", color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>Engineering insights, design philosophy, and thought leadership from the frontlines of AI transformation and software architecture.</p>
              <ScrollIndicator />
            </div>
          </motion.div>
        </div>
      </section>

      <section style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "0 clamp(1.5rem, 5vw, 4rem)" }}>
        <div className="mx-auto max-w-[1400px]">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 }} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", padding: "clamp(1.5rem, 3vh, 2.5rem) 0" }}>
            <div style={{ display: "flex", gap: "4px", padding: "4px", borderRadius: "10px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", flexWrap: "wrap" }}>
              {CATEGORIES.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: "6px 14px", borderRadius: "7px", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", border: "none", fontFamily: "'DM Sans', sans-serif", transition: "all 0.25s ease", background: active ? "rgba(0,255,136,0.08)" : "transparent", color: active ? "var(--brand-green)" : "rgba(255,255,255,0.3)", boxShadow: active ? "0 0 0 1px rgba(0,255,136,0.2)" : "none" }}>{cat}</button>
                );
              })}
            </div>
            <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.15)" }}>{filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}</span>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-6 lg:px-16 pt-12 pb-20">
        <div className="flex flex-col gap-24 md:gap-32">
          {featuredPost && <FeaturedPost post={featuredPost} />}
          {listPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-x-10 md:gap-y-20">
              {listPosts.map((post, i) => (
                <StandardPost key={post.slug} post={post} index={i} />
              ))}
            </div>
          ) : !featuredPost && (
            <div className="py-32 text-center">
              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>No articles found in this category.</p>
            </div>
          )}
        </div>
      </div>

      <FooterNavCards />
    </main>
  );
}
