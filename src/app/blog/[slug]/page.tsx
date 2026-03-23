"use client";

import { useRef, use } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { TransitionLink as Link } from "@/components/transition/TransitionLink";
import { blogPosts } from "@/data/blog";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

/* ─────────────────────────────────────────────
   Reveal wrapper
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
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
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

  if (!post) {
    notFound();
  }

  return (
    <main
      className="relative min-h-screen"
      style={{
        background: "var(--background)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* ── Hero Image ───────────────────────────────────────────────── */}
      <section className="relative" style={{ height: "65vh", minHeight: "450px" }}>
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority
          className="object-cover"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.7) 70%, #0a0a0a 100%)",
          }}
        />

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute top-0 left-0 z-10"
          style={{
            paddingTop: "clamp(6rem, 10vh, 8rem)",
            paddingLeft: "clamp(1.5rem, 5vw, 4rem)",
          }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full backdrop-blur-xl transition-all duration-300 hover:scale-105"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "var(--text-primary)",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={14} />
            Back to Journal
          </Link>
        </motion.div>

        {/* Title overlay at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10"
          style={{
            padding: "0 clamp(1.5rem, 5vw, 4rem) clamp(2rem, 4vh, 3rem)",
          }}
        >
          <div className="mx-auto max-w-4xl relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                style={{
                  display: "inline-flex",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "100px",
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--brand-green)",
                  background: "color-mix(in srgb, var(--brand-green) 12%, rgba(0,0,0,0.4))",
                  backdropFilter: "blur(10px)",
                  border: "1px solid color-mix(in srgb, var(--brand-green) 25%, transparent)",
                  marginBottom: "1.25rem",
                }}
              >
                {post.category}
              </div>

              {/* Title */}
              <h1
                style={{
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  color: "#fff",
                  margin: 0,
                  marginBottom: "2rem",
                }}
              >
                {post.title}
              </h1>

              {/* Meta information row */}
              <div
                className="flex flex-wrap items-center gap-6"
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                <div className="flex items-center gap-2">
                  <User size={16} className="text-brand-green" />
                  <span>
                    {post.author.name} <span className="opacity-50 ml-1 font-normal hidden sm:inline-block">({post.author.role})</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-brand-green" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-brand-green" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Article Content ──────────────────────────────────────────── */}
      <section
        style={{
          padding:
            "clamp(3rem, 6vh, 5rem) clamp(1.5rem, 5vw, 4rem) clamp(6rem, 12vh, 10rem)",
        }}
      >
        <div className="mx-auto max-w-3xl">
          <Reveal delay={0.1}>
            {/* Excerpt */}
            <p
              style={{
                fontSize: "clamp(1.15rem, 2vw, 1.4rem)",
                lineHeight: 1.6,
                color: "var(--text-primary)",
                fontWeight: 500,
                marginBottom: "3rem",
                paddingBottom: "3rem",
                borderBottom:
                  "1px solid linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
              }}
              className="border-b border-white/10"
            >
              {post.excerpt}
            </p>

            {/* Markdown Content */}
            <div
              className="prose prose-invert prose-lg max-w-none"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              <ReactMarkdown
                components={{
                  h2: ({ node, ...props }) => (
                    <h2
                      style={{
                        fontSize: "2rem",
                        fontWeight: 800,
                        color: "var(--text-primary)",
                        marginTop: "3rem",
                        marginBottom: "1rem",
                        letterSpacing: "-0.02em",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                      {...props}
                    />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        marginTop: "2rem",
                        marginBottom: "1rem",
                        letterSpacing: "-0.01em",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                      {...props}
                    />
                  ),
                  p: ({ node, ...props }) => (
                    <p
                      style={{
                        lineHeight: 1.8,
                        marginBottom: "1.5rem",
                      }}
                      {...props}
                    />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul
                      style={{
                        listStyleType: "disc",
                        paddingLeft: "1.5rem",
                        marginBottom: "1.5rem",
                      }}
                      {...props}
                    />
                  ),
                  li: ({ node, ...props }) => (
                    <li
                      style={{
                        marginBottom: "0.5rem",
                        lineHeight: 1.6,
                      }}
                      {...props}
                    />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong
                      style={{
                        color: "var(--text-primary)",
                        fontWeight: 700,
                      }}
                      {...props}
                    />
                  ),
                  code: ({ node, inline, ...props }: any) =>
                    inline ? (
                      <code
                        style={{
                          background: "var(--glass-bg)",
                          padding: "0.2rem 0.4rem",
                          borderRadius: "4px",
                          fontSize: "0.9em",
                          color: "var(--brand-green)",
                        }}
                        {...props}
                      />
                    ) : (
                      <code {...props} />
                    ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
