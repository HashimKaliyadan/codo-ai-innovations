"use client";

import React from "react";
import { motion } from "framer-motion";
import FloatingLines from "@/components/FloatingLines";
import { useFloatingLines } from "./FloatingLinesController";

export default function FloatingLinesLayer() {
  // Since we removed ThemeProvider, we'll use dark mode colors as default
  // or detect the 'dark' class on the html element if needed.
  // For now, let's stick to the brand colors.
  const isDark = true; // Assume dark mode based on layout.tsx
  const { opacity } = useFloatingLines();
  const [isRenderEnabled, setIsRenderEnabled] = React.useState(opacity > 0);

  return (
    <div 
      style={{ 
        position: "fixed", 
        inset: 0, 
        zIndex: 0, 
        pointerEvents: "none",
        display: isRenderEnabled || opacity > 0 ? "block" : "none" 
      }}
    >
      <motion.div
        initial={false}
        animate={{ opacity }}
        transition={{ duration: 0.1, ease: "linear" }}
        onAnimationStart={() => {
          if (opacity > 0) setIsRenderEnabled(true);
        }}
        onAnimationComplete={() => {
          if (opacity === 0) setIsRenderEnabled(false);
        }}
        style={{ width: "100%", height: "100%", willChange: "opacity" }}
      >
        <FloatingLines
          enabledWaves={["bottom", "middle", "top"]}
          lineCount={5}
          lineDistance={5}
          bendRadius={5}
          bendStrength={-0.5}
          interactive={false}
          parallax={true}
          backgroundColor={isDark ? "#0A0A0B" : "#F0F3FF"}
          linesGradient={["#00203F", "#00B663"]} // Brand Blue to Green
          opacity={isRenderEnabled ? 1 : 0}
        />
      </motion.div>
    </div>
  );
}
