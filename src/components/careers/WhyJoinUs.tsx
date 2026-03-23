"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Zap, Home, ShieldCheck } from "lucide-react";

export default function WhyJoinUs() {
  return (
    <section style={{ padding: "clamp(60px, 10vw, 120px) 0" }}>
      <div className="max-w-[1320px] mx-auto px-6">
        
        {/* Header */}
        <div style={{ marginBottom: "clamp(3rem, 5vw, 4rem)", maxWidth: "600px" }}>
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              color: "var(--brand-green)",
              marginBottom: "1rem",
            }}
          >
            Why Join Us
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              lineHeight: 1.15,
            }}
          >
            Experience a workplace that values your{" "}
            <span style={{ color: "var(--brand-green)" }}>growth, creativity, and well-being.</span>
          </h2>
          <p
            style={{
              fontSize: "clamp(15px, 1.5vw, 17px)",
              color: "rgba(255,255,255,0.5)",
              marginTop: "1.25rem",
              lineHeight: 1.6,
            }}
          >
            Experience a fulfilling career with growth, flexibility, and a supportive team culture.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="why-join-bento-grid">
          
          {/* Card 1: Advance Details (Span 2 cols on Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6 }}
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              backdropFilter: "blur(16px)",
              borderRadius: "1.5rem",
              padding: "clamp(1.5rem, 3vw, 2.5rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "2rem",
              gridColumn: "span 2",
              position: "relative",
              overflow: "hidden",
            }}
            className="md:col-span-2 md:flex-row md:items-center"
          >
            <div style={{ flex: 1, position: "relative", zIndex: 2 }}>
              <div style={{ background: "rgba(34,197,94,0.1)", padding: "10px", borderRadius: "12px", width: "fit-content", marginBottom: "1.25rem" }}>
                <TrendingUp size={20} style={{ color: "var(--brand-green)" }} />
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.75rem", lineHeight: 1.3 }}>
                Advance quickly with clear growth opportunities.
              </h3>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                Accelerate your career growth with well-defined paths for leadership and abundant opportunities for advancement within the company.
              </p>
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <img 
                src="https://images.unsplash.com/photo-1542744094-24638ea0b3b5?q=80&w=2070&auto=format&fit=crop" 
                alt="Growth" 
                style={{ width: "100%", maxWidth: "300px", borderRadius: "1rem", border: "1px solid rgba(255,255,255,0.1)" }}
              />
            </div>
          </motion.div>

          {/* Card 2: Flexible Work (Span 1 col) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              backdropFilter: "blur(16px)",
              borderRadius: "1.5rem",
              padding: "clamp(1.5rem, 3vw, 2.5rem)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ background: "rgba(59,130,246,0.1)", padding: "10px", borderRadius: "12px", width: "fit-content", marginBottom: "1.25rem" }}>
              <Home size={20} style={{ color: "#3b82f6" }} />
            </div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.75rem", lineHeight: 1.3 }}>
              Flexible Work Environment
            </h3>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
              Enjoy a healthy work-life balance with options for remote work and flexible hours designed around your life.
            </p>
          </motion.div>

          {/* Card 3: Supportive Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              backdropFilter: "blur(16px)",
              borderRadius: "1.5rem",
              padding: "clamp(1.5rem, 3vw, 2.5rem)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ background: "rgba(249,115,22,0.1)", padding: "10px", borderRadius: "12px", width: "fit-content", marginBottom: "1.25rem" }}>
              <Users size={20} style={{ color: "#f97316" }} />
            </div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.75rem", lineHeight: 1.3 }}>
              Supportive Team Culture
            </h3>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
              Collaborate with a talented, diverse team in a supportive environment that fosters creativity and well-being.
            </p>
          </motion.div>

          {/* Card 4: Exciting Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              backdropFilter: "blur(16px)",
              borderRadius: "1.5rem",
              padding: "clamp(1.5rem, 3vw, 2.5rem)",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Ambient Background Glow */}
            <div style={{
              position: "absolute",
              bottom: "-40px",
              right: "-40px",
              width: "140px",
              height: "140px",
              background: "radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)",
              filter: "blur(20px)",
              pointerEvents: "none",
            }} />
            <div style={{ background: "rgba(168,85,247,0.1)", padding: "10px", borderRadius: "12px", width: "fit-content", marginBottom: "1.25rem", position: "relative", zIndex: 2 }}>
              <Zap size={20} style={{ color: "#a855f7" }} />
            </div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.75rem", lineHeight: 1.3, position: "relative", zIndex: 2 }}>
              Exciting Projects
            </h3>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6, position: "relative", zIndex: 2 }}>
              Engage with cutting-edge tech and shape the future of artificial intelligence in enterprise environments.
            </p>
          </motion.div>

          {/* Card 5: Benefits Package */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              backdropFilter: "blur(16px)",
              borderRadius: "1.5rem",
              padding: "clamp(1.5rem, 3vw, 2.5rem)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ background: "rgba(236,72,153,0.1)", padding: "10px", borderRadius: "12px", width: "fit-content", marginBottom: "1.25rem" }}>
              <ShieldCheck size={20} style={{ color: "#ec4899" }} />
            </div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.75rem", lineHeight: 1.3 }}>
              Comprehensive Benefits
            </h3>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
              Receive competitive compensation, comprehensive health coverage, and a range of valuable perks.
            </p>
          </motion.div>

        </div>

      </div>

      <style>{`
        .why-join-bento-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 768px) {
          .why-join-bento-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .why-join-bento-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
