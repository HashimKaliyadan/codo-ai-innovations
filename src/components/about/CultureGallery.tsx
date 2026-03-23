"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Horizontal auto-scrolling strip of team/office lifestyle photos.
 * Pauses on hover.
 */

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
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  // Double the array for seamless infinite scroll
  const images = [...GALLERY_IMAGES, ...GALLERY_IMAGES];

  return (
    <section ref={ref} style={{ padding: "clamp(40px, 6vw, 80px) 0", overflow: "hidden" }}>
      <div className="max-w-[1320px] mx-auto px-6 mb-8">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: "var(--brand-green)",
                marginBottom: "0.5rem",
              }}
            >
              Life at CODO
            </p>
            <h3
              style={{
                fontSize: "clamp(20px, 3vw, 28px)",
                fontWeight: 800,
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
              }}
            >
              Behind the screens
            </h3>
          </div>
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.05em",
            }}
          >
            {GALLERY_IMAGES.length} moments →
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="gallery-scroll-container"
        style={{
          display: "flex",
          gap: "1rem",
          width: "fit-content",
          animation: "galleryScroll 40s linear infinite",
          cursor: "grab",
        }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            style={{
              width: "clamp(240px, 22vw, 320px)",
              aspectRatio: "16 / 10",
              borderRadius: "1rem",
              overflow: "hidden",
              flexShrink: 0,
              border: "1px solid rgba(255,255,255,0.06)",
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
            />
          </div>
        ))}
      </motion.div>

      <style>{`
        @keyframes galleryScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .gallery-scroll-container:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
