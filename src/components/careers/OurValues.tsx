"use client";

import { motion } from "framer-motion";
import { Heart, Lightbulb, Shield, Users } from "lucide-react";

export default function OurValues() {
  return (
    <section style={{ padding: "clamp(60px, 10vw, 120px) 0" }}>
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 items-center">
          
          {/* Left: Image with floating badge */}
          <div className="relative w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7 }}
              style={{
                borderRadius: "2rem",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
                aspectRatio: "4/5",
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                alt="Expert team members" 
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </motion.div>

            {/* Floating Badge equivalent to "Expert Team Members: 24+" */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                position: "absolute",
                bottom: "10%",
                right: "-5%",
                background: "var(--glass-bg)",
                backdropFilter: "blur(24px)",
                border: "1px solid var(--glass-border)",
                padding: "1.25rem 1.5rem",
                borderRadius: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                zIndex: 10,
              }}
              className="hidden sm:flex"
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop" alt="avatar" style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid #22c55e", marginLeft: 0 }} />
                <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=150&auto=format&fit=crop" alt="avatar" style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid #22c55e", marginLeft: "-12px" }} />
                <div style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid #22c55e", marginLeft: "-12px", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, color: "var(--text-primary)" }}>+24</div>
              </div>
              <div>
                <p style={{ fontSize: "0.9rem", fontWeight: 800, color: "var(--text-primary)" }}>Expert Team</p>
                <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)" }}>Members Worldwide</p>
              </div>
            </motion.div>
          </div>

          {/* Right: Values text & grid */}
          <div className="w-full lg:w-1/2">
            <div style={{ marginBottom: "3rem" }}>
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
                Our Values
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
                How We&apos;re Guided
              </h2>
              <p
                style={{
                  fontSize: "clamp(15px, 1.5vw, 17px)",
                  color: "rgba(255,255,255,0.5)",
                  marginTop: "1.25rem",
                  lineHeight: 1.6,
                }}
              >
                Dedicated to honesty, new ideas, and teamwork.
              </p>
            </div>

            {/* 2x2 Grid for Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              
              {/* Value 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}
              >
                <div style={{ background: "rgba(249,115,22,0.1)", padding: "12px", borderRadius: "12px", flexShrink: 0 }}>
                  <Heart size={20} style={{ color: "#f97316" }} />
                </div>
                <div>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                    Honesty
                  </h4>
                  <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                    Creating intuitive, engaging, and effective user experiences.
                  </p>
                </div>
              </motion.div>

              {/* Value 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}
              >
                <div style={{ background: "rgba(34,197,94,0.1)", padding: "12px", borderRadius: "12px", flexShrink: 0 }}>
                  <Lightbulb size={20} style={{ color: "var(--brand-green)" }} />
                </div>
                <div>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                    Creativity
                  </h4>
                  <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                    Building robust, scalable, and tailored web solutions.
                  </p>
                </div>
              </motion.div>

              {/* Value 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}
              >
                <div style={{ background: "rgba(59,130,246,0.1)", padding: "12px", borderRadius: "12px", flexShrink: 0 }}>
                  <Shield size={20} style={{ color: "#3b82f6" }} />
                </div>
                <div>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                    Quality
                  </h4>
                  <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                    We strive to deliver excellence in everything we do.
                  </p>
                </div>
              </motion.div>

              {/* Value 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}
              >
                <div style={{ background: "rgba(168,85,247,0.1)", padding: "12px", borderRadius: "12px", flexShrink: 0 }}>
                  <Users size={20} style={{ color: "#a855f7" }} />
                </div>
                <div>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                    Teamwork
                  </h4>
                  <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                    We collaborate closely & deliver outstanding results together.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
