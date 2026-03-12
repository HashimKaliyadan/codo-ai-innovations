"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ── Dummy Client Data ─────────────────────────────────────────────────────────
const clients = [
  { name: "GlobalTech", industry: "Enterprise" },
  { name: "NovaStream", industry: "Media" },
  { name: "EcoNexus", industry: "Sustainability" },
  { name: "AlphaLogic", industry: "FinTech" },
  { name: "SkyLink", industry: "Telecom" },
  { name: "VertexAI", industry: "AI Research" },
  { name: "Vanguard", industry: "Security" },
  { name: "AeroDynamics", industry: "Aviation" },
];

export default function ClientsSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={sectionRef}
      aria-label="Our Clients and Partners"
      style={{
        padding: "clamp(4rem, 8vw, 6rem) clamp(1.5rem, 6vw, 6rem)",
        background: "var(--bg-primary)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div className="max-w-[1400px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "clamp(3rem, 5vw, 4rem)" }}
        >
          <span
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.3em",
              color: "var(--brand-green)",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "1rem",
            }}
          >
            06 — Trust & Experience
          </span>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              fontWeight: 900,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            Trusted by Forward-Thinking <span style={{ color: "var(--brand-green)" }}>Companies</span>.
          </h2>
        </motion.div>

        <div 
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5"
          style={{
            border: "1px solid var(--glass-border)",
            borderRadius: "24px",
            overflow: "hidden",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          {clients.map((client, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              style={{
                height: "clamp(100px, 15vw, 160px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--bg-primary)",
                border: "1px solid var(--glass-border)",
                cursor: "pointer",
                position: "relative",
              }}
              className="group"
            >
              {/* Logo Placeholder - Grayscale to Color */}
              <div 
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 900,
                  letterSpacing: "0.1em",
                  color: "var(--text-secondary)",
                  opacity: 0.4,
                  transition: "all 0.4s ease",
                  filter: "grayscale(100%)",
                }}
                className="group-hover:grayscale-0 group-hover:opacity-100 group-hover:text-[#01b667] group-hover:scale-105"
              >
                {client.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
