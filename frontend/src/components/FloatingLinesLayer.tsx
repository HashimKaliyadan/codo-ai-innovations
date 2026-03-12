"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import { useFloatingLines } from "./FloatingLinesController";

const FloatingLines = dynamic(() => import("@/components/FloatingLines"), {
  ssr: false,
  loading: () => null,
});

export default function FloatingLinesLayer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
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
        transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
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
          opacity={isRenderEnabled ? 1 : 0}
        />
      </motion.div>
    </div>
  );
}
