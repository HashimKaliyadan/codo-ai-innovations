"use client";

import { useRef, useState, useMemo } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { TransitionLink as Link } from "@/components/transition/TransitionLink";
import { blogPosts } from "@/data/blog";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";

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

function BlogCard({ post, index }: { post: (typeof blogPosts)[0]; index: number }) {
  return (
    <Reveal delay={(index % 3) * 0.1}>
      <Link href={`/blog/${post.slug}`} className="group block relative no-underline text-inherit h-full flex flex-col">
        {/* Hairline top border for cards */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent mb-8" />
        
        <div className="relative overflow-hidden mb-6" style={{ borderRadius: "1.25rem", aspectRatio: "16/11", background: "rgba(255,255,255,0.02)" }}>
          {/* Glowing border hover */}
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

/* ─── Main Page ────────────────────────────────────────────────────── */

export default function BlogIndexPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return blogPosts;
    return blogPosts.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <main className="relative min-h-screen" style={{ background: "#000", fontFamily: "'DM Sans', sans-serif", color: "#fff" }}>
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

      {/* Hero Section */}
      <section
        className="relative overflow-hidden"
        style={{ paddingTop: "clamp(8rem, 18vh, 14rem)", paddingBottom: "clamp(3rem, 6vh, 6rem)" }}
      >
        {/* Ambient glow */}
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{ top: "-10%", left: "50%", transform: "translateX(-50%)", width: "100vw", height: "70vh", background: "radial-gradient(ellipse 60% 60% at 50% 30%, color-mix(in srgb, var(--brand-green) 7%, transparent), transparent)" }}
        />

        <div className="mx-auto max-w-[1400px] px-6 lg:px-16 relative">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--brand-green)", marginBottom: "1.5rem" }}
          >
            CODO Agency — Journal
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.1 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-12"
          >
            <h1 style={{ fontSize: "clamp(4.5rem, 14vw, 12rem)", fontWeight: 900, lineHeight: 0.87, letterSpacing: "-0.045em", color: "#fff", margin: 0 }}>
              IN
              <br />
              <span style={{ color: "var(--brand-green)", WebkitTextStroke: "0px" }}>SIGHTS.</span>
            </h1>

            <div className="flex flex-col justify-end gap-8" style={{ paddingBottom: "0.5rem", maxWidth: "320px" }}>
              <p style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)", color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>
                Engineering insights, design philosophy, and thought leadership from the frontlines of AI transformation and software architecture.
              </p>
              <ScrollIndicator />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filters */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "0 clamp(1.5rem, 5vw, 4rem)" }}>
        <div className="mx-auto max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", padding: "clamp(1.5rem, 3vh, 2.5rem) 0" }}
          >
            <div style={{ display: "flex", gap: "4px", padding: "4px", borderRadius: "10px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", flexWrap: "wrap" }}>
              {CATEGORIES.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      padding: "6px 14px", borderRadius: "7px", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", border: "none", fontFamily: "'DM Sans', sans-serif", transition: "all 0.25s ease",
                      background: active ? "rgba(0,255,136,0.08)" : "transparent",
                      color: active ? "var(--brand-green)" : "rgba(255,255,255,0.3)",
                      boxShadow: active ? "0 0 0 1px rgba(0,255,136,0.2)" : "none",
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
            <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.15)" }}>
              {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
            </span>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-16 pt-12 pb-32">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-x-10 md:gap-y-20">
            {filteredPosts.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center">
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>No articles found in this category.</p>
          </div>
        )}
      </div>
    </main>
  );
}
