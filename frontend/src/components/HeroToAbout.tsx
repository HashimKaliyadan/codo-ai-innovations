"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, useInView, useSpring } from "framer-motion";
import { useFloatingLines } from "@/components/FloatingLinesController";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MEDIA_QUERIES } from "@/constants/breakpoints";
import { getResponsiveFont } from "@/utils/responsive";

export default function HeroToAbout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery(MEDIA_QUERIES.mobile);
  const isTablet = useMediaQuery(MEDIA_QUERIES.tablet);
  
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start start", "end end"] 
  });
  const inView = useInView(containerRef, { margin: "-40% 0px -25% 0px" });
  const { setOpacity } = useFloatingLines();

  useEffect(() => {
    setOpacity(inView ? 1 : 0);
  }, [inView, setOpacity]);

  const heroOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 1, 0]);
  const rawBlur = useTransform(scrollYProgress, [0.4, 0.8], [0, 25]);
  const heroBlur = useSpring(rawBlur, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const filter = useMotionTemplate`blur(${heroBlur}px)`;

  const scrollIndOp = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const heroHeight = isMobile ? "80vh" : isTablet ? "100vh" : "115vh";
  const finalScale = isMobile ? 1.8 : 2.2;
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, finalScale]);

  return (
    <div ref={containerRef} style={{ height: heroHeight, background: "transparent", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>

        <motion.div style={{
          position: "absolute", textAlign: "center",
          opacity: heroOpacity, scale: heroScale,
          filter,
          padding: isMobile ? "0 1.5rem" : "0"
        }}>
          <div style={{ 
            fontSize: getResponsiveFont(56, 208), 
            fontWeight: 900, 
            letterSpacing: "-0.02em", 
            color: "white", 
            lineHeight: 0.85 
          }}>
            COD<span style={{ color: "#008764" }}>O</span>
          </div>
          <div style={{ 
            fontSize: getResponsiveFont(14, 64), 
            fontWeight: 800, 
            color: "rgba(255,255,255,0.9)", 
            letterSpacing: "0.1em", 
            marginTop: "0.2em" 
          }}>
            AI INNOVATIONS
          </div>
        </motion.div>

        {!isMobile && (
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
        )}
      </div>
    </div>
  );
}
