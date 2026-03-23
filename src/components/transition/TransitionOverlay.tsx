"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTransitionParams } from "./TransitionProvider";

export function TransitionOverlay() {
  const { phase } = useTransitionParams();

  // Only render the overlay when we are NOT idle
  const isVisible = phase !== "idle";

  // The overlay slides UP into view ("covering"), stays put while "waiting",
  // then slides UP and out of view ("revealing").
  const yValue =
    phase === "covering"
      ? "0%"      // fully covering the viewport
      : phase === "waiting"
        ? "0%"    // stay in place while new page loads
        : phase === "revealing"
          ? "-100%" // slide away upward
          : "100%"; // idle / initial = below viewport

  return (
    <>
      {isVisible && (
        <motion.div
          key="transition-overlay"
          initial={{ y: "100%" }}
          animate={{ y: yValue }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0a0a0a",
            pointerEvents: "auto",
            borderTop: "1px solid rgba(34, 197, 94, 0.3)",
            borderBottom: "1px solid rgba(34, 197, 94, 0.3)",
          }}
        >
          {/* Logo that pulses gently while loading */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.35 }}
            className="logo-pulse"
          >
            <Image
              src="/logos/logo-white.svg"
              alt="CODO"
              width={140}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
