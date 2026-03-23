"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { TransitionLink as Link } from "@/components/transition/TransitionLink";
import { blogPosts } from "@/data/blog";
import { ArrowDown, Calendar, Clock } from "lucide-react";

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
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Blog Card component
───────────────────────────────────────────── */
function BlogCard({
  post,
  index,
  featured = false,
}: {
  post: (typeof blogPosts)[0];
  index: number;
  featured?: boolean;
}) {
  // If featured, we make it larger and horizontal on desktop
  if (featured) {
    return (
      <Reveal delay={0.1}>
        <Link
          href={`/blog/${post.slug}`}
          className="group block"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image */}
            <div
              className="overflow-hidden relative w-full"
              style={{
                borderRadius: "2rem",
                aspectRatio: "16 / 10",
                background: "var(--glass-border)",
              }}
            >
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)",
                }}
              />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-4">
              <div
                style={{
                  display: "inline-flex",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "100px",
                  fontSize: "0.65rem",
                  fontWeight: 800,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--brand-green)",
                  background: "color-mix(in srgb, var(--brand-green) 10%, transparent)",
                  border: "1px solid color-mix(in srgb, var(--brand-green) 20%, transparent)",
                  width: "fit-content",
                  marginBottom: "0.5rem",
                }}
              >
                {post.category}
              </div>

              <h2
                className="relative inline-block w-fit"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                  color: "var(--text-primary)",
                  margin: 0,
                }}
              >
                {post.title}
                <span
                  className="absolute bottom-1 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out"
                  style={{ background: "var(--brand-green)" }}
                />
              </h2>

              <p
                style={{
                  fontSize: "clamp(1rem, 1.2vw, 1.15rem)",
                  lineHeight: 1.6,
                  color: "var(--text-secondary)",
                  marginTop: "0.5rem",
                  marginBottom: "1rem",
                }}
              >
                {post.excerpt}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-widest text-[#a0a0a0]">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-brand-green opacity-70" />
                  {post.date}
                </span>
                <span className="text-[#444]">•</span>
                <span className="flex items-center gap-1.5">
                  <Clock size={13} className="text-brand-green opacity-70" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </Reveal>
    );
  }

  // Standard vertical card
  return (
    <Reveal delay={index % 3 === 0 ? 0 : index % 3 === 1 ? 0.15 : 0.3}>
      <Link
        href={`/blog/${post.slug}`}
        className="group flex flex-col h-full"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {/* Image */}
        <div
          className="overflow-hidden relative w-full mb-6"
          style={{
            borderRadius: "1.5rem",
            aspectRatio: "16 / 10",
            background: "var(--glass-border)",
          }}
        >
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow">
          <div
            style={{
              fontSize: "0.6rem",
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--brand-green)",
              marginBottom: "0.75rem",
            }}
          >
            {post.category}
          </div>

          <h3
            className="relative inline-block w-fit"
            style={{
              fontSize: "clamp(1.4rem, 2vw, 1.8rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            {post.title}
            <span
              className="absolute bottom-1 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out"
              style={{ background: "var(--brand-green)" }}
            />
          </h3>

          <p
            className="flex-grow"
            style={{
              fontSize: "clamp(0.9rem, 1vw, 1rem)",
              lineHeight: 1.6,
              color: "var(--text-secondary)",
              marginBottom: "1.5rem",
            }}
          >
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-widest text-[#a0a0a0] mt-auto">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} className="text-brand-green opacity-70" />
              {post.date}
            </span>
            <span className="text-[#444]">•</span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} className="text-brand-green opacity-70" />
              {post.readTime}
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

/* ─────────────────────────────────────────────
   Main Blog Page
───────────────────────────────────────────── */
export default function BlogIndexPage() {
  // First post is featured, the rest are in a grid
  const featuredPost = blogPosts[0];
  const remainingPosts = blogPosts.slice(1);

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
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "500px",
            background:
              "radial-gradient(ellipse, color-mix(in srgb, var(--brand-green) 6%, transparent) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="mx-auto max-w-[1400px] relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-end justify-between"
          >
            <h1
              style={{
                fontSize: "clamp(4.5rem, 15vw, 13rem)",
                fontWeight: 900,
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              JOUR
              <span style={{ color: "var(--brand-green)" }}>NAL</span>
            </h1>

            {/* Subtitle / Arrow */}
            <div
              className="hidden md:flex flex-col items-end gap-3 max-w-xs"
              style={{ paddingBottom: "1rem" }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  color: "var(--text-secondary)",
                  textAlign: "right",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                Insights, engineering deep-dives, and thoughts on the future of software.
              </p>
              <ArrowDown
                size={24}
                strokeWidth={1.5}
                style={{ color: "var(--brand-green)" }}
                className="mt-2"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Posts Content ────────────────────────────────────────────── */}
      <section
        style={{
          paddingLeft: "clamp(1.5rem, 5vw, 4rem)",
          paddingRight: "clamp(1.5rem, 5vw, 4rem)",
          paddingBottom: "clamp(6rem, 12vh, 10rem)",
        }}
      >
        <div className="mx-auto max-w-[1400px]">
          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-16 md:mb-24">
              <BlogCard post={featuredPost} index={0} featured={true} />
            </div>
          )}

          {/* Divider */}
          {featuredPost && remainingPosts.length > 0 && (
            <div
              className="w-full h-px mb-16 md:mb-24"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.1) 80%, transparent)",
              }}
            />
          )}

          {/* Grid of remaining posts */}
          {remainingPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 xl:gap-x-12">
              {remainingPosts.map((post, i) => (
                <BlogCard key={post.slug} post={post} index={i} featured={false} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
