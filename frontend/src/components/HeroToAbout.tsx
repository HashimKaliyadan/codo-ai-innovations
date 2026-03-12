"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, useInView } from "framer-motion";
import { useFloatingLines } from "@/components/FloatingLinesController";

export default function HeroToAbout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const inView = useInView(containerRef, { margin: "-40% 0px -40% 0px" });
  const { setOpacity } = useFloatingLines();

  useEffect(() => {
    setOpacity(inView ? 1 : 0);
  }, [inView, setOpacity]);

  const heroOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 1, 0]);
  const heroScale  = useTransform(scrollYProgress, [0, 0.8], [1, 2.2]);

  const scrollIndOp = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div ref={containerRef} style={{ height: "120vh", background: "transparent", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>

        <motion.div style={{
          position: "absolute", textAlign: "center",
          opacity: heroOpacity, scale: heroScale,
        }}>
          <div style={{ fontSize: "clamp(3.5rem, 16vw, 13rem)", fontWeight: 900, letterSpacing: "-0.02em", color: "white", lineHeight: 0.85 }}>
            COD<span style={{ color: "#01b667" }}>O</span>
          </div>
          <div style={{ fontSize: "clamp(0.9rem, 4vw, 4rem)", fontWeight: 800, color: "rgba(255,255,255,0.9)", letterSpacing: "0.1em", marginTop: "0.2em" }}>
            AI INNOVATIONS
          </div>
        </motion.div>

        <motion.div style={{
          position: "absolute", bottom: "2rem", left: "50%", translateX: "-50%",
          opacity: scrollIndOp, display: "flex", flexDirection: "column",
          alignItems: "center", gap: "0.4rem", pointerEvents: "none",
        }}>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            style={{ width: "1px", height: "30px", background: "linear-gradient(to bottom, rgba(1,182,103,0.8), transparent)" }}
          />
        </motion.div>

      </div>
    </div>
  );
}

