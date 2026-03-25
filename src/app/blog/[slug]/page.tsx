"use client";

import { useRef, use, useEffect, useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { TransitionLink as Link } from "@/components/transition/TransitionLink";
import { blogPosts } from "@/data/blog";
import { ArrowLeft, Calendar, Clock, User, ArrowUpRight } from "lucide-react";
import ReactMarkdown from "react-markdown";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────────
   Reading progress bar — top of viewport
───────────────────────────────────────────── */
function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        background: "var(--brand-green)",
        scaleX,
        transformOrigin: "0%",
        zIndex: 10000,
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   Reveal wrapper
───────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  style,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  return (
    <motion.div
      ref={ref}
      style={style}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Related post mini card
───────────────────────────────────────────── */
function RelatedCard({ post }: { post: (typeof blogPosts)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/blog/${post.slug}`}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          borderRadius: "1rem",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(255,255,255,0.02)",
          transition: "border-color 0.3s",
          borderColor: hovered ? "rgba(0,255,136,0.12)" : "rgba(255,255,255,0.05)",
        }}
      >
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="33vw"
            className="object-cover"
            style={{
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        </div>
        <div style={{ padding: "1.25rem" }}>
          <span
            style={{
              fontSize: "0.58rem",
              fontWeight: 800,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--brand-green)",
              fontFamily: "'DM Sans', sans-serif",
              display: "block",
              marginBottom: "0.5rem",
            }}
          >
            {post.category}
          </span>
          <h4
            style={{
              fontSize: "0.95rem",
              fontWeight: 700,
              lineHeight: 1.3,
              letterSpacing: "-0.015em",
              color: hovered ? "#fff" : "rgba(255,255,255,0.7)",
              fontFamily: "'DM Sans', sans-serif",
              transition: "color 0.3s",
              marginBottom: "0.75rem",
            }}
          >
            {post.title}
          </h4>
          <div
            className="flex items-center justify-between"
            style={{
              fontSize: "0.6rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.2)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <span>{post.readTime}</span>
            <ArrowUpRight
              size={13}
              style={{
                color: hovered ? "var(--brand-green)" : "rgba(255,255,255,0.2)",
                transition: "color 0.3s",
              }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────
   Blog Post Detail Page
───────────────────────────────────────────── */
export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  // Related posts: same category, excluding current
  const related = blogPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  // Fallback: any 3 other posts
  const relatedFallback =
    related.length > 0
      ? related
      : blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <main
      style={{
        background: "#000",
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif",
        color: "#fff",
        position: "relative",
      }}
    >
      <ReadingProgress />

      {/* Noise grain */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px",
          zIndex: 0,
        }}
      />

      {/* ── Cover Image Hero ─────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          height: "70vh",
          minHeight: 480,
          overflow: "hidden",
        }}
      >
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority
          className="object-cover"
        />

        {/* Multi-layer gradient for max legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.85) 80%, #000 100%)",
          }}
        />
        {/* Side vignettes */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        {/* Back nav */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
          style={{
            position: "absolute",
            top: "clamp(6rem, 10vh, 8rem)",
            left: "clamp(1.5rem, 5vw, 4rem)",
            zIndex: 10,
          }}
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2.5"
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s",
              }}
              className="group-hover:border-brand-green"
            >
              <ArrowLeft size={14} style={{ color: "#fff" }} />
            </div>
            <span
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                transition: "color 0.3s",
              }}
              className="group-hover:text-white"
            >
              Journal
            </span>
          </Link>
        </motion.div>

        {/* Title block at bottom of hero */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: EASE, delay: 0.2 }}
          style={{
            position: "absolute",
            bottom: "clamp(2.5rem, 5vh, 4rem)",
            left: "clamp(1.5rem, 5vw, 4rem)",
            right: "clamp(1.5rem, 5vw, 4rem)",
            zIndex: 10,
          }}
        >
          <div style={{ maxWidth: 820 }}>
            {/* Category */}
            <span
              style={{
                display: "inline-block",
                padding: "0.35rem 0.8rem",
                borderRadius: "6px",
                fontSize: "0.6rem",
                fontWeight: 800,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--brand-green)",
                background: "rgba(0,0,0,0.65)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(0,255,136,0.2)",
                marginBottom: "1.25rem",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {post.category}
            </span>

            <h1
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "#fff",
                margin: "0 0 1.75rem",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {post.title}
            </h1>

            {/* Meta row */}
            <div
              className="flex flex-wrap items-center gap-x-6 gap-y-2"
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <span className="flex items-center gap-2">
                <User size={12} style={{ color: "var(--brand-green)" }} />
                {post.author.name}
                <span style={{ color: "rgba(255,255,255,0.2)", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>
                  · {post.author.role}
                </span>
              </span>
              <span style={{ color: "rgba(255,255,255,0.12)" }}>|</span>
              <span className="flex items-center gap-2">
                <Calendar size={12} style={{ color: "var(--brand-green)" }} />
                {post.date}
              </span>
              <span style={{ color: "rgba(255,255,255,0.12)" }}>|</span>
              <span className="flex items-center gap-2">
                <Clock size={12} style={{ color: "var(--brand-green)" }} />
                {post.readTime}
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Article Body ─────────────────────────────────────────────── */}
      <section
        style={{
          padding: "clamp(3rem, 6vh, 5rem) clamp(1.5rem, 5vw, 4rem) clamp(4rem, 8vh, 7rem)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="mx-auto"
          style={{ maxWidth: 760 }}
        >
          <Reveal delay={0.1}>
            {/* Lead excerpt */}
            <p
              style={{
                fontSize: "clamp(1.15rem, 1.8vw, 1.35rem)",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.65)",
                fontWeight: 500,
                marginBottom: "3rem",
                paddingBottom: "3rem",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {post.excerpt}
            </p>
          </Reveal>

          {/* Article content */}
          <Reveal delay={0.2}>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              <ReactMarkdown
                components={{
                  h2: ({ ...props }) => (
                    <h2
                      style={{
                        fontSize: "clamp(1.5rem, 2.2vw, 2rem)",
                        fontWeight: 800,
                        color: "#fff",
                        marginTop: "3.5rem",
                        marginBottom: "1.25rem",
                        letterSpacing: "-0.025em",
                        lineHeight: 1.15,
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                      {...props}
                    />
                  ),
                  h3: ({ ...props }) => (
                    <h3
                      style={{
                        fontSize: "clamp(1.2rem, 1.6vw, 1.5rem)",
                        fontWeight: 700,
                        color: "rgba(255,255,255,0.85)",
                        marginTop: "2.5rem",
                        marginBottom: "1rem",
                        letterSpacing: "-0.015em",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                      {...props}
                    />
                  ),
                  p: ({ ...props }) => (
                    <p
                      style={{
                        fontSize: "1.05rem",
                        lineHeight: 1.85,
                        marginBottom: "1.75rem",
                        color: "rgba(255,255,255,0.5)",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                      {...props}
                    />
                  ),
                  ul: ({ ...props }) => (
                    <ul
                      style={{
                        paddingLeft: "1.5rem",
                        marginBottom: "1.75rem",
                        listStyleType: "none",
                      }}
                      {...props}
                    />
                  ),
                  li: ({ ...props }) => (
                    <li
                      style={{
                        marginBottom: "0.6rem",
                        lineHeight: 1.7,
                        fontSize: "1.05rem",
                        color: "rgba(255,255,255,0.5)",
                        paddingLeft: "1rem",
                        position: "relative",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          top: "0.55em",
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: "var(--brand-green)",
                          display: "inline-block",
                          opacity: 0.7,
                        }}
                      />
                      {(props as any).children}
                    </li>
                  ),
                  strong: ({ ...props }) => (
                    <strong
                      style={{
                        color: "rgba(255,255,255,0.85)",
                        fontWeight: 700,
                      }}
                      {...props}
                    />
                  ),
                  blockquote: ({ ...props }) => (
                    <blockquote
                      style={{
                        margin: "2.5rem 0",
                        paddingLeft: "1.5rem",
                        borderLeft: "2px solid var(--brand-green)",
                        color: "rgba(255,255,255,0.4)",
                        fontStyle: "italic",
                        fontSize: "1.1rem",
                        lineHeight: 1.7,
                      }}
                      {...props}
                    />
                  ),
                  code: ({ inline, ...props }: { inline?: boolean } & React.HTMLAttributes<HTMLElement>) =>
                    inline ? (
                      <code
                        style={{
                          background: "rgba(0,255,136,0.07)",
                          border: "1px solid rgba(0,255,136,0.15)",
                          padding: "0.15rem 0.45rem",
                          borderRadius: "5px",
                          fontSize: "0.88em",
                          color: "var(--brand-green)",
                          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                        }}
                        {...props}
                      />
                    ) : (
                      <code
                        style={{
                          display: "block",
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          borderRadius: "10px",
                          padding: "1.5rem",
                          fontSize: "0.85rem",
                          lineHeight: 1.7,
                          overflowX: "auto",
                          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                          color: "rgba(255,255,255,0.65)",
                          margin: "2rem 0",
                        }}
                        {...props}
                      />
                    ),
                  hr: () => (
                    <hr
                      style={{
                        border: "none",
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                        margin: "3rem 0",
                      }}
                    />
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </Reveal>

          {/* Author block */}
          <Reveal delay={0.1}>
            <div
              style={{
                marginTop: "4rem",
                paddingTop: "2.5rem",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                gap: "1.25rem",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: "rgba(0,255,136,0.08)",
                  border: "1px solid rgba(0,255,136,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: "1.1rem",
                  fontWeight: 800,
                  color: "var(--brand-green)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {post.author.name.charAt(0)}
              </div>
              <div>
                <p
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    color: "#fff",
                    fontFamily: "'DM Sans', sans-serif",
                    marginBottom: "0.2rem",
                  }}
                >
                  {post.author.name}
                </p>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.3)",
                    fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: "0.04em",
                  }}
                >
                  {post.author.role} · CODO AI Innovations
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Related Posts ─────────────────────────────────────────────── */}
      {relatedFallback.length > 0 && (
        <section
          style={{
            padding: "clamp(4rem, 8vh, 6rem) clamp(1.5rem, 5vw, 4rem)",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div className="mx-auto max-w-[1400px]">
            <Reveal>
              <div
                className="flex items-end justify-between"
                style={{ marginBottom: "2.5rem" }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "var(--brand-green)",
                      marginBottom: "0.75rem",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    Continue Reading
                  </p>
                  <h3
                    style={{
                      fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
                      fontWeight: 800,
                      letterSpacing: "-0.025em",
                      color: "#fff",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    More from the Journal
                  </h3>
                </div>
                <Link
                  href="/blog"
                  className="hidden md:flex items-center gap-2 group"
                  style={{ textDecoration: "none" }}
                >
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.3)",
                      transition: "color 0.3s",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                    className="group-hover:text-white"
                  >
                    All Articles
                  </span>
                  <ArrowUpRight size={14} style={{ color: "rgba(255,255,255,0.3)" }} />
                </Link>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "1.25rem" }}>
              {relatedFallback.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.08}>
                  <RelatedCard post={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}