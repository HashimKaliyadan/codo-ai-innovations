"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTransitionParams } from "@/components/transition/TransitionProvider";

export default function Template({ children }: { children: React.ReactNode }) {
  const { onPageReady } = useTransitionParams();

  // Signal the TransitionProvider that the new page is mounted and ready
  useEffect(() => {
    // Wait for the next tick to ensure the DOM is updated
    const timer = setTimeout(() => {
      // Find all images in the document
      const images = Array.from(document.images);
      
      // Filter out images that are already complete, or lazy-loaded (which might never load if off-screen)
      const incompleteImages = images.filter(
        (img) => !img.complete && img.loading !== "lazy"
      );

      if (incompleteImages.length === 0) {
        onPageReady();
        return;
      }

      let loadedCount = 0;
      const incrementLoad = () => {
        loadedCount++;
        if (loadedCount === incompleteImages.length) {
          onPageReady();
        }
      };

      // Attach event listeners to wait for pending images
      incompleteImages.forEach((img) => {
        img.addEventListener("load", incrementLoad, { once: true });
        img.addEventListener("error", incrementLoad, { once: true });
      });

      // Fallback timeout: if some images fail to load or take too long,
      // we don't want to trap the user. Force ready state after ~2.5 seconds.
      const fallback = setTimeout(() => {
        onPageReady();
      }, 2500);

      return () => clearTimeout(fallback);
    }, 50);

    return () => clearTimeout(timer);
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
