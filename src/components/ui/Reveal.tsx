"use client";

import { motion } from "framer-motion";
import React from "react";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  width?: "fit-content" | "100%";
}

export function Reveal({
  children,
  delay = 0,
  className,
  style,
  width = "100%",
}: RevealProps) {
  return (
    <motion.div
      className={className}
      style={{
        ...style,
        position: "relative",
        width,
      }}
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
