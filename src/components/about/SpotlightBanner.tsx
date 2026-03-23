"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone } from "lucide-react";

/**
 * Toast banner when `?employee=` param is in the URL.
 * Shows "📱 You scanned {Name}'s ID card", auto-dismisses after 4s.
 */
export default function SpotlightBanner({
  name,
  visible,
}: {
  name: string | null;
  visible: boolean;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible && name) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [visible, name]);

  return (
    <AnimatePresence>
      {show && name && (
        <motion.div
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          style={{
            position: "fixed",
            top: 80,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.75rem 1.25rem",
            borderRadius: "1rem",
            background: "rgba(10,10,11,0.95)",
            border: "1px solid rgba(34,197,94,0.3)",
            backdropFilter: "blur(20px)",
            boxShadow:
              "0 16px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(34,197,94,0.08)",
            maxWidth: "90vw",
          }}
        >
          <Smartphone
            size={16}
            style={{ color: "var(--brand-green)", flexShrink: 0 }}
          />
          <div style={{ minWidth: 0 }}>
            <p
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                lineHeight: 1.3,
              }}
            >
              You scanned{" "}
              <span style={{ color: "var(--brand-green)" }}>{name}&apos;s</span>{" "}
              ID card
            </p>
            <p
              style={{
                fontSize: "0.65rem",
                color: "rgba(255,255,255,0.4)",
                marginTop: 2,
              }}
            >
              Welcome to their CODO AI profile
            </p>
          </div>
          <button
            onClick={() => setShow(false)}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "none",
              borderRadius: "6px",
              width: 24,
              height: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "rgba(255,255,255,0.4)",
              flexShrink: 0,
            }}
          >
            <X size={12} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
