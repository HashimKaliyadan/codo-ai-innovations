"use client";

import { motion } from "framer-motion";
import { Quote, Sparkles } from "lucide-react";

export default function CareersHero() {
  return (
    <section
      style={{
        padding: "clamp(120px, 15vh, 160px) 0 clamp(80px, 10vw, 120px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="max-w-[1320px] mx-auto px-6 relative z-10">
        
        {/* Header Text */}
        <div style={{ textAlign: "center", marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.2)",
              padding: "0.5rem 1rem",
              borderRadius: "999px",
              marginBottom: "1.5rem",
            }}
          >
            <Sparkles size={14} style={{ color: "var(--brand-green)" }} />
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--brand-green)",
              }}
            >
              Careers at CODO
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "clamp(40px, 6vw, 76px)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              color: "var(--text-primary)",
              marginBottom: "1.25rem",
            }}
          >
            Build Your Future <br className="hidden sm:block" />
            with <span style={{ color: "var(--brand-green)" }}>Us</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "clamp(16px, 1.5vw, 18px)",
              color: "rgba(255,255,255,0.6)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Discover exciting opportunities and grow your career in a thriving environment
            where creativity meets strategy.
          </motion.p>
        </div>

        {/* Masonry / Floating Images Grid */}
        <div
          className="relative max-w-[1100px] mx-auto hidden md:block"
          style={{ height: "460px" }}
        >
          {/* Main central image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              width: "30%",
              height: "380px",
              borderRadius: "1.5rem",
              overflow: "hidden",
              zIndex: 3,
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
              alt="Team collaborating" 
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </motion.div>

          {/* Left image 1 */}
          <motion.div
            initial={{ opacity: 0, x: -30, rotate: -4 }}
            animate={{ opacity: 1, x: 0, rotate: -4 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              left: "14%",
              top: "20px",
              width: "22%",
              height: "260px",
              borderRadius: "1.25rem",
              overflow: "hidden",
              zIndex: 2,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop" 
              alt="Design team" 
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </motion.div>

          {/* Left image 2 (smaller, lower) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              left: "0%",
              bottom: "40px",
              width: "16%",
              height: "200px",
              borderRadius: "1rem",
              overflow: "hidden",
              zIndex: 1,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" 
              alt="Focused coding" 
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </motion.div>

          {/* Right image 1 */}
          <motion.div
            initial={{ opacity: 0, x: 30, rotate: 3 }}
            animate={{ opacity: 1, x: 0, rotate: 3 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              right: "14%",
              top: "40px",
              width: "24%",
              height: "240px",
              borderRadius: "1.25rem",
              overflow: "hidden",
              zIndex: 2,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
              alt="Strategy meeting" 
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </motion.div>

          {/* Right image 2 (smaller, lower) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              right: "0%",
              bottom: "80px",
              width: "18%",
              height: "160px",
              borderRadius: "1rem",
              overflow: "hidden",
              zIndex: 1,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=2070&auto=format&fit=crop" 
              alt="Casual coffee meeting" 
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </motion.div>

          {/* Floating Quote Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8, type: "spring", bounce: 0.4 }}
            style={{
              position: "absolute",
              left: "10%",
              top: "-15px",
              background: "var(--glass-bg)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(34,197,94,0.3)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              padding: "1rem 1.25rem",
              borderRadius: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              maxWidth: "280px",
              zIndex: 10,
            }}
          >
            <div style={{ background: "rgba(34,197,94,0.15)", padding: "0.5rem", borderRadius: "50%" }}>
              <Quote size={16} style={{ color: "var(--brand-green)" }} />
            </div>
            <p style={{ fontSize: "0.75rem", lineHeight: 1.5, color: "var(--text-primary)", fontWeight: 500 }}>
              At CODO, we merge creativity with strategy to build digital solutions that captivate and perform.
            </p>
          </motion.div>
        </div>

        {/* Mobile fallback images */}
        <div className="md:hidden flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ height: "300px", borderRadius: "1rem", overflow: "hidden" }}
          >
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
              alt="Team" 
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(34,197,94,0.3)",
              padding: "1.25rem",
              borderRadius: "1rem",
              display: "flex",
              alignItems: "flex-start",
              gap: "1rem",
            }}
          >
            <Quote size={20} style={{ color: "var(--brand-green)", flexShrink: 0 }} />
            <p style={{ fontSize: "0.85rem", lineHeight: 1.5, color: "var(--text-primary)" }}>
              At CODO, we merge creativity with strategy to build digital solutions that captivate and perform.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
