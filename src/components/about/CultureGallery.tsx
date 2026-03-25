"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Horizontal auto-scrolling strip of team/office lifestyle photos.
 * Pauses on hover.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop",
];

export default function CultureGallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-6% 0px" });

  // Double the array for seamless infinite scroll
  const images = [...GALLERY_IMAGES, ...GALLERY_IMAGES];

  return (
    <section
      ref={ref}
      style={{
        background: "#000",
        padding: "clamp(5rem, 10vh, 8rem) 0",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Hairline top border */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "rgba(255,255,255,0.05)",
        }}
      />

      {/* Section-level ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-10%",
          left: "-5%",
          width: "60vw",
          height: "80vh",
          background:
            "radial-gradient(ellipse 60% 60% at 20% 30%, color-mix(in srgb, var(--brand-green) 4%, transparent), transparent)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 4vw, 4rem)",
          marginBottom: "clamp(3rem, 6vh, 5rem)",
        }}
      >
        {/* Header: two-column layout matching TeamGrid / ValuesSection */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2.5rem",
          }}
          className="lg:grid-cols-12"
        >
          {/* Left: label + headline */}
          <div className="lg:col-span-5">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              style={{
                fontSize: "0.62rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                color: "var(--brand-green)",
                marginBottom: "1.25rem",
              }}
            >
              Life at CODO
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
              style={{
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 900,
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
                color: "#fff",
                margin: 0,
              }}
            >
              Behind the
              <br />
              <span style={{ color: "var(--brand-green)" }}>screens.</span>
            </motion.h2>
          </div>

          {/* Right: description + meta */}
          <div
            className="lg:col-span-7"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              gap: "1.5rem",
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.35)",
                maxWidth: "52ch",
              }}
            >
              A glimpse into our daily life and culture. From jam sessions and architectural 
              deep dives to casual stand-ups — this is how we build the future together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.22 }}
            >
              <span
                style={{
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.15)",
                }}
              >
                {GALLERY_IMAGES.length} moments captured
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="gallery-scroll-container"
        style={{
          display: "flex",
          gap: "1.5rem",
          width: "fit-content",
          animation: "galleryScroll 40s linear infinite",
          cursor: "grab",
        }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            style={{
              width: "clamp(260px, 24vw, 360px)",
              aspectRatio: "16 / 10",
              borderRadius: "1rem",
              overflow: "hidden",
              flexShrink: 0,
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <img
              src={src}
              alt={`Team moment ${(i % GALLERY_IMAGES.length) + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.4s ease",
              }}
              loading="lazy"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          </div>
        ))}
      </motion.div>

      <style>{`
        @keyframes galleryScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 0.75rem)); }
        }
        .gallery-scroll-container:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
