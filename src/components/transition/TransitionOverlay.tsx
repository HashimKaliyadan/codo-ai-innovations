"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  AnimationPlaybackControls,
} from "framer-motion";
import { useTransitionParams } from "./TransitionProvider";

/* ─────────────────────────────────────────────────────────────────────────────
   TransitionOverlay
   
   Architecture notes (senior):
   
   1. NEVER conditionally mount this component with {isVisible && ...}.
      Doing so re-mounts on every phase change, causing `initial` to re-fire
      and producing a flash/jump. Instead, keep it ALWAYS in the DOM and drive
      everything through `animate` alone.
   
   2. Counter is driven by framer-motion's imperative `animate()` function
      applied to a MotionValue — zero React re-renders, buttery smooth.
   
   3. The exit is a dual-panel "curtain split": top half slides up, bottom half
      slides down simultaneously. The panels are always rendered but clipped
      via `clipPath`, avoiding any layout recalculation on phase change.
   
   4. `pointerEvents` is handled per-phase to never block clicks when idle.
─────────────────────────────────────────────────────────────────────────────── */

/* ── Easing curves ── */
const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_IN_OUT: [number, number, number, number] = [0.87, 0, 0.13, 1];

/* ── Status copy per phase ── */
const STATUS_COPY: Record<string, string> = {
  idle: "Standby",
  covering: "Initializing",
  waiting: "Loading assets",
  revealing: "Ready",
};

export function TransitionOverlay() {
  const { phase } = useTransitionParams();

  /* ── Counter MotionValue (0 → 100) ── */
  const count = useMotionValue(0);
  const displayCount = useTransform(count, (v) =>
    String(Math.round(v)).padStart(2, "0")
  );
  const progressWidth = useTransform(count, [0, 100], ["0%", "100%"]);

  /* ── Track running animation so we can cancel on phase change ── */
  const animRef = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    // Cancel any in-progress counter animation before starting a new one
    animRef.current?.stop();

    if (phase === "covering") {
      // Reset counter to 0, then count to 75 over ~0.7s
      count.set(0);
      animRef.current = animate(count, 75, {
        duration: 0.7,
        ease: "easeOut",
      });
    }

    if (phase === "waiting") {
      // Slowly creep toward 92 — simulates real asset loading
      animRef.current = animate(count, 92, {
        duration: 1.8,
        ease: "easeOut",
      });
    }

    if (phase === "revealing") {
      // Snap to 100 instantly, then the panel exit takes over
      animRef.current = animate(count, 100, {
        duration: 0.25,
        ease: "easeOut",
      });
    }

    if (phase === "idle") {
      // Reset silently for next transition cycle
      count.set(0);
    }
  }, [phase, count]);

  /* ── Panel Y positions ── */
  // Top panel: enters from top (-100%), covers (0%), exits to top (-100%)
  // Bottom panel: enters from bottom (100%), covers (0%), exits to bottom (100%)
  const isActive = phase !== "idle";
  const isRevealing = phase === "revealing";

  const topPanelY = isActive ? (isRevealing ? "-100%" : "0%") : "-100%";
  const bottomPanelY = isActive ? (isRevealing ? "100%" : "0%") : "100%";

  // Covering animation: panels slide in from above/below simultaneously
  // For covering phase (entering), top comes from -100% → 0 and bottom from 100% → 0
  // We handle this by tracking previous phase to know the entry direction
  const coveringEntry = phase === "covering";

  return (
    /* Wrapper — always in DOM, never mounted/unmounted */
    <div
      aria-hidden={!isActive}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: isActive ? "auto" : "none",
      }}
    >
      {/* ── TOP PANEL ─────────────────────────────────────────────────────── */}
      <motion.div
        initial={false}
        animate={{ y: topPanelY }}
        transition={{
          duration: isRevealing ? 0.75 : 0.65,
          ease: isRevealing ? EASE_IN_OUT : EASE_OUT_EXPO,
          // Stagger: top panel exits 40ms before bottom
          delay: isRevealing ? 0 : 0,
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "50%",
          background: "#000",
          overflow: "hidden",
          transform: "translateZ(0)",
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      >
        {/* Logo — top-left of the top panel */}
        <motion.div
          initial={false}
          animate={{
            opacity: isActive && !isRevealing ? 1 : 0,
            y: isActive && !isRevealing ? 0 : -12,
          }}
          transition={{ duration: 0.4, ease: EASE_OUT_EXPO, delay: 0.3 }}
          style={{
            position: "absolute",
            top: "clamp(1.5rem, 4vh, 2.5rem)",
            left: "clamp(1.5rem, 5vw, 3.5rem)",
          }}
        >
          <Image
            src="/logos/logo-white.webp"
            alt="CODO AI"
            width={110}
            height={32}
            className="h-8 w-auto object-contain"
            priority
          />
        </motion.div>

        {/* Large counter — spans across the center seam */}
        <motion.div
          initial={false}
          animate={{
            opacity: isActive ? 1 : 0,
          }}
          transition={{ duration: 0.3, delay: isActive ? 0.2 : 0 }}
          style={{
            position: "absolute",
            bottom: "-0.12em", // slightly bleeds into bottom panel (seam effect)
            left: "clamp(1.5rem, 5vw, 3.5rem)",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          <motion.span
            style={{
              fontSize: "clamp(7rem, 18vw, 16rem)",
              fontWeight: 900,
              letterSpacing: "-0.055em",
              color: "#fff",
              fontFamily: "'DM Sans', sans-serif",
              display: "block",
            }}
          >
            {displayCount}
          </motion.span>
        </motion.div>

        {/* Divider line at the seam */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: "rgba(255,255,255,0.06)",
          }}
        />
      </motion.div>

      {/* ── BOTTOM PANEL ──────────────────────────────────────────────────── */}
      <motion.div
        initial={false}
        animate={{ y: bottomPanelY }}
        transition={{
          duration: isRevealing ? 0.75 : 0.65,
          ease: isRevealing ? EASE_IN_OUT : EASE_OUT_EXPO,
          delay: isRevealing ? 0.04 : 0, // 40ms stagger on exit
        }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50%",
          background: "#000",
          overflow: "hidden",
          transform: "translateZ(0)",
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: "clamp(1.5rem, 4vh, 2.5rem)",
            left: "clamp(1.5rem, 5vw, 3.5rem)",
            right: "clamp(1.5rem, 5vw, 3.5rem)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Status label */}
          <motion.span
            initial={false}
            animate={{
              opacity: isActive && !isRevealing ? 1 : 0,
              y: isActive && !isRevealing ? 0 : 8,
            }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO, delay: 0.35 }}
            style={{
              fontSize: "0.62rem",
              fontWeight: 700,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {STATUS_COPY[phase] ?? "Loading"}
          </motion.span>

          {/* Percentage label — right side */}
          <motion.div
            initial={false}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "0.15rem",
            }}
          >
            <motion.span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--brand-green, #00ff88)",
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              {displayCount}
            </motion.span>
            <span
              style={{
                fontSize: "0.6rem",
                fontWeight: 600,
                color: "rgba(0,255,136,0.5)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              %
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={false}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          style={{
            position: "absolute",
            bottom: "calc(clamp(1.5rem, 4vh, 2.5rem) - 1.25rem)", // Pinned below the metadata
            left: "clamp(1.5rem, 5vw, 3.5rem)",
            right: "clamp(1.5rem, 5vw, 3.5rem)",
            height: "1px",
            background: "rgba(255,255,255,0.08)",
            overflow: "hidden",
            borderRadius: "1px",
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: progressWidth,
              background: "var(--brand-green, #00ff88)",
              borderRadius: "1px",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}