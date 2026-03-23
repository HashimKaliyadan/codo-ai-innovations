"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function JoinCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section ref={ref} style={{ padding: "clamp(40px, 6vw, 80px) 0" }}>
      <div className="max-w-[1320px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "1.5rem",
            padding: "clamp(3rem, 6vw, 5rem) clamp(2rem, 4vw, 4rem)",
            background: "linear-gradient(135deg, #0d1117 0%, #111827 50%, #0d1117 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
            textAlign: "center",
          }}
        >
          {/* Ambient gradient orbs */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "-80px",
              left: "-60px",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 60%)",
              filter: "blur(40px)",
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              bottom: "-80px",
              right: "-60px",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 60%)",
              filter: "blur(40px)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: "var(--brand-green)",
                marginBottom: "1.25rem",
              }}
            >
              Join the Team
            </p>

            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
                lineHeight: 1.1,
                marginBottom: "1rem",
              }}
            >
              Want to build the future
              <br />
              with us?
            </h2>

            <p
              style={{
                fontSize: "clamp(14px, 1.5vw, 17px)",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.45)",
                maxWidth: "480px",
                margin: "0 auto 2rem",
              }}
            >
              We&apos;re hiring across Engineering, Design, and Product. Come
              build AI-powered products that make a real difference.
            </p>

            <Link
              href="/careers"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.85rem 2rem",
                borderRadius: "999px",
                background: "var(--brand-green)",
                color: "#fff",
                fontWeight: 800,
                fontSize: "0.8rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                boxShadow: "0 8px 30px rgba(34,197,94,0.25)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 40px rgba(34,197,94,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 8px 30px rgba(34,197,94,0.25)";
              }}
            >
              View Open Positions
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
