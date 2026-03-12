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

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <motion.div
        animate={{ opacity }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
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
        />
      </motion.div>
    </div>
  );
}
