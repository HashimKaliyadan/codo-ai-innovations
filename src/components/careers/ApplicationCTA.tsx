"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ApplicationCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <section
      ref={ref}
      className="py-32 relative overflow-hidden"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-16 relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--brand-green)",
              marginBottom: "1.5rem",
            }}
          >
            Application Process
          </p>
          <h2
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              color: "#fff",
              marginBottom: "2rem",
            }}
          >
            Your next chapter
            <br />
            <span style={{ color: "var(--brand-green)" }}>starts here.</span>
          </h2>
          <p
            style={{
              fontSize: "clamp(1rem, 1.2vw, 1.1rem)",
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.7,
              maxWidth: "48ch",
              margin: "0 auto 3rem",
            }}
          >
            No lengthy forms. No multi-round gauntlets. Send us your resume and a brief note about what excites you — we'll take it from there.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <a
              href="mailto:info@codoai.in?subject=Career Application"
              className="group inline-flex items-center gap-3"
              style={{ textDecoration: "none" }}
            >
              <span
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-300"
                style={{
                  background: "var(--brand-green)",
                  color: "#000",
                  fontSize: "0.9rem",
                  fontWeight: 800,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                <Mail size={16} strokeWidth={2.5} />
                Apply via Email
                <ArrowUpRight size={18} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
