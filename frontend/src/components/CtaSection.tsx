"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Mail, Send } from "lucide-react";

export default function CtaSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true });
  const [hovered, setHovered] = useState(false);

  return (
    <section
      ref={sectionRef}
      aria-label="Contact Us Call to Action"
      style={{
        padding: "clamp(6rem, 12vw, 10rem) clamp(1.5rem, 6vw, 6rem)",
        background: "var(--bg-primary)",
        position: "relative",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      {/* Background Glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at center, rgba(0,135,100,0.08) 0%, transparent 70%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div 
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid var(--glass-border)",
            borderRadius: "48px",
            padding: "clamp(3rem, 8vw, 6rem) clamp(1.5rem, 4vw, 4rem)",
            textAlign: "center",
            backdropFilter: "blur(20px)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: "var(--text-primary)",
                marginBottom: "2rem",
              }}
            >
              Ready to <span style={{ color: "var(--brand-green)" }}>Innovate</span>?
              <br />
              Let's Build It.
            </h2>
            
            <p
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                color: "var(--text-secondary)",
                maxWidth: "60ch",
                margin: "0 auto 3rem",
                lineHeight: 1.6,
              }}
            >
              Whether you have a specific project in mind or just want to explore what's possible with AI, we're here to help you lead the way.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.button
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                  padding: "1.25rem 3.5rem",
                  borderRadius: "999px",
                  background: "#008764",
                  color: "#ffffff",
                  fontWeight: 900,
                  fontSize: "1rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
                  boxShadow: hovered ? "0 20px 40px rgba(0,135,100,0.3)" : "none",
                  transform: hovered ? "scale(1.05) translateY(-4px)" : "scale(1)",
                }}
              >
                Start a Conversation
                <ArrowRight size={20} />
              </motion.button>

              <a
                href="mailto:hello@codo.ai"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "var(--brand-green)",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  transition: "opacity 0.3s ease",
                }}
                className="hover:opacity-80"
              >
                <Mail size={18} />
                hello@codo.ai
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
