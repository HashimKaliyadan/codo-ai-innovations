"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

const stats = [
  { value: 12, suffix: "+", label: "Years", sub: "Building" },
  { value: 80, suffix: "K+", label: "Users", sub: "Served" },
  { value: 98, suffix: "%", label: "Satisfaction", sub: "Rate" },
  { value: 4, suffix: "", label: "Industry", sub: "Awards" },
];

function StatItem({
  value,
  suffix,
  label,
  sub,
  trigger,
}: {
  value: number;
  suffix: string;
  label: string;
  sub: string;
  trigger: boolean;
}) {
  const animated = useCountUp(value, 2200, trigger);

  return (
    <div style={{ textAlign: "center", flex: 1, padding: "0 1rem" }}>
      <p
        style={{
          fontSize: "clamp(32px, 5vw, 56px)",
          fontWeight: 900,
          letterSpacing: "-0.03em",
          color: "var(--text-primary)",
          lineHeight: 1,
        }}
      >
        {animated}
        <span style={{ color: "var(--brand-green)" }}>{suffix}</span>
      </p>
      <p
        style={{
          fontSize: "0.8rem",
          fontWeight: 700,
          color: "rgba(255,255,255,0.45)",
          marginTop: "0.5rem",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: "0.75rem",
          color: "rgba(255,255,255,0.3)",
          marginTop: "0.15rem",
        }}
      >
        {sub}
      </p>
    </div>
  );
}

export default function StatsCounter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section ref={ref} style={{ padding: "clamp(40px, 6vw, 80px) 0" }}>
      <div className="max-w-[1320px] mx-auto px-6">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0,
            padding: "clamp(2rem, 4vw, 3.5rem) 0",
            borderRadius: "16px",
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
            backdropFilter: "blur(16px)",
            flexWrap: "wrap",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              style={{
                display: "flex",
                alignItems: "center",
                flex: "1 1 0",
                minWidth: "140px",
              }}
            >
              <StatItem {...s} trigger={inView} />
              {i < stats.length - 1 && (
                <div
                  className="hidden md:block"
                  style={{
                    width: "1px",
                    height: "48px",
                    background: "rgba(255,255,255,0.08)",
                    flexShrink: 0,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
