"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, MapPin, Briefcase } from "lucide-react";
import { OPEN_POSITIONS, JobDepartment } from "@/data/jobs";

const EASE = [0.22, 1, 0.36, 1] as const;

const DEPARTMENTS: ("All" | JobDepartment)[] = [
  "All",
  "Engineering",
  "Design",
  "Product",
  "Operations",
];

export default function OpenPositions() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-6% 0px" });

  const [search, setSearch] = useState("");
  const [activeDept, setActiveDept] = useState<string>("All");
  const [searchFocused, setSearchFocused] = useState(false);

  const filtered = useMemo(() => {
    return OPEN_POSITIONS.filter((job) => {
      const matchesDept = activeDept === "All" || job.department === activeDept;
      if (!matchesDept) return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        job.title.toLowerCase().includes(q) ||
        job.department.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q)
      );
    });
  }, [search, activeDept]);

  return (
    <section
      ref={ref}
      style={{
        background: "#000",
        padding: "clamp(5rem, 10vh, 8rem) 0",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Hairline top border */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "rgba(255,255,255,0.05)",
        }}
      />

      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-10%",
          left: "-5%",
          width: "60vw",
          height: "80vh",
          background:
            "radial-gradient(ellipse 60% 60% at 20% 30%, color-mix(in srgb, var(--brand-green) 4%, transparent), transparent)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 4vw, 4rem)",
        }}
      >
        {/* ── Header: two-column layout matching TeamGrid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2.5rem",
            marginBottom: "clamp(3rem, 6vh, 5rem)",
          }}
          className="lg:grid-cols-12"
        >
          {/* Left: label + headline */}
          <div className="lg:col-span-5">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              style={{
                fontSize: "0.62rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                color: "var(--brand-green)",
                marginBottom: "1.25rem",
              }}
            >
              Now Hiring
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
              style={{
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 900,
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
                color: "#fff",
                margin: 0,
              }}
            >
              Find your role
              <br />
              <span style={{ color: "var(--brand-green)" }}>at CODO.</span>
            </motion.h2>
          </div>

          {/* Right: description + controls */}
          <div
            className="lg:col-span-7"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              gap: "1.5rem",
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.35)",
                maxWidth: "52ch",
              }}
            >
              We're looking for exceptional people who want to do the best work of their
              careers. Explore current openings across Engineering, Design, Product, and Operations.
            </motion.p>

            {/* ── Controls row ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.22 }}
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {/* Search input */}
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <Search
                  size={13}
                  style={{
                    position: "absolute",
                    left: 12,
                    color: searchFocused ? "var(--brand-green)" : "rgba(255,255,255,0.22)",
                    transition: "color 0.25s ease",
                    pointerEvents: "none",
                  }}
                />
                <input
                  type="text"
                  placeholder="Search roles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  style={{
                    width: 188,
                    height: 36,
                    paddingLeft: 34,
                    paddingRight: 14,
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${searchFocused ? "rgba(0,255,136,0.28)" : "rgba(255,255,255,0.07)"}`,
                    color: "#fff",
                    fontSize: "0.78rem",
                    outline: "none",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "border-color 0.25s ease",
                  }}
                />
              </div>

              {/* Department pills */}
              <div
                style={{
                  display: "flex",
                  gap: 3,
                  padding: "4px",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  flexWrap: "wrap",
                }}
              >
                {DEPARTMENTS.map((dept) => {
                  const active = activeDept === dept;
                  return (
                    <button
                      key={dept}
                      onClick={() => setActiveDept(dept)}
                      style={{
                        padding: "5px 13px",
                        borderRadius: "7px",
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        border: "none",
                        fontFamily: "'DM Sans', sans-serif",
                        transition: "all 0.25s ease",
                        background: active ? "rgba(0,255,136,0.08)" : "transparent",
                        color: active ? "var(--brand-green)" : "rgba(255,255,255,0.3)",
                        boxShadow: active ? "0 0 0 1px rgba(0,255,136,0.2)" : "none",
                      }}
                    >
                      {dept}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Hairline divider before list */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.05)",
            transformOrigin: "left",
            marginBottom: "clamp(2rem, 4vh, 3rem)",
          }}
        />

        {/* ── Job rows ── */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="group"
                style={{
                  position: "relative",
                  padding: "1.75rem 0",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  cursor: "pointer",
                  transition: "background 0.3s",
                }}
              >
                {/* Left hover bar */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: "2px",
                    borderRadius: "1px",
                    transition: "background 0.35s ease",
                  }}
                  className="bg-transparent group-hover:bg-[var(--brand-green)]"
                />

                {/* Hover tint */}
                <div
                  className="opacity-0 group-hover:opacity-100"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(90deg, rgba(0,255,136,0.03) 0%, transparent 60%)",
                    transition: "opacity 0.35s ease",
                    pointerEvents: "none",
                  }}
                />

                <div
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 pl-6"
                  style={{ position: "relative", zIndex: 1 }}
                >
                  {/* Left: Title + meta */}
                  <div>
                    <h3
                      className="group-hover:!text-white"
                      style={{
                        fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
                        fontWeight: 700,
                        letterSpacing: "-0.015em",
                        color: "rgba(255,255,255,0.6)",
                        transition: "color 0.35s ease",
                        lineHeight: 1.3,
                        marginBottom: "0.5rem",
                      }}
                    >
                      {job.title}
                    </h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                      <span
                        style={{
                          padding: "3px 10px",
                          borderRadius: "5px",
                          fontSize: "0.58rem",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          background: "rgba(0,255,136,0.06)",
                          color: "var(--brand-green)",
                          border: "1px solid rgba(0,255,136,0.15)",
                        }}
                      >
                        {job.department}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.78rem", color: "rgba(255,255,255,0.3)" }}>
                        <Briefcase size={12} />
                        {job.experience}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.78rem", color: "rgba(255,255,255,0.3)" }}>
                        <MapPin size={12} />
                        {job.location}
                      </span>
                      <span
                        style={{
                          fontSize: "0.65rem",
                          fontWeight: 600,
                          color: "rgba(255,255,255,0.2)",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {job.type}
                      </span>
                    </div>
                  </div>

                  {/* Right: Apply link */}
                  <div
                    className="group-hover:!text-white"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.25)",
                      transition: "color 0.35s ease",
                      flexShrink: 0,
                    }}
                  >
                    Apply
                    <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty state */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                textAlign: "center",
                padding: "5rem 1rem",
              }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: "0.5rem",
                  fontWeight: 600,
                }}
              >
                No openings found.
              </p>
            </motion.div>
          )}
        </div>

        {/* Result count */}
        {filtered.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            style={{
              marginTop: "clamp(2rem, 4vh, 3rem)",
              fontSize: "0.62rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.15)",
              textAlign: "right",
            }}
          >
            {filtered.length} {filtered.length === 1 ? "position" : "positions"}
            {activeDept !== "All" ? ` · ${activeDept}` : ""}
          </motion.p>
        )}
      </div>
    </section>
  );
}
