"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTransitionParams } from "@/components/transition/TransitionProvider";

export default function Template({ children }: { children: React.ReactNode }) {
  const { onPageReady } = useTransitionParams();

  // Signal the TransitionProvider that the new page is mounted and ready
  useEffect(() => {
    onPageReady();
  }, [onPageReady]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
