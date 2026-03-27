"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Search } from "lucide-react";
import { employees, DEPARTMENTS, type Employee } from "@/data/employees";
import EmployeeCard from "./EmployeeCard";
import { AnimatePresence } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function TeamGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-6% 0px" });

  const [search, setSearch] = useState("");
  const [activeDept, setActiveDept] = useState<string>("All");
  const [searchFocused, setSearchFocused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  const filtered = useMemo(() => {
    return employees.filter((e: Employee) => {
      const matchesDept = activeDept === "All" || e.department === activeDept;
      if (!matchesDept) return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        e.name.toLowerCase().includes(q) ||
        e.role.toLowerCase().includes(q) ||
        e.department.toLowerCase().includes(q) ||
        e.skills.some((s) => s.toLowerCase().includes(q))
      );
    });
  }, [search, activeDept]);

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(8);
  }, [search, activeDept]);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#000",
        padding: "clamp(5rem, 10vh, 8rem) 0",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Hairline top border — same as ValuesSection */}
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

      {/* Section-level ambient glow — mirrors ValuesSection top-left quadrant */}
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
        {/* ── Header: two-column layout matching ValuesSection ── */}
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
              Our Team
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
              Meet the people
              <br />
              <span style={{ color: "var(--brand-green)" }}>behind the work.</span>
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
              A collective of engineers, designers, and strategists — each bringing
              their craft to the products we ship together under CODO AI Innovations.
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
                  placeholder="Search team..."
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

              {/* Department tabs — same pill-strip pattern as HeroSection nav */}
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

        {/* Hairline divider before grid — like the top rule above ValueRow list */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.05)",
            transformOrigin: "left",
            marginBottom: "clamp(2.5rem, 5vh, 4rem)",
          }}
        />

        {/* ── Cards grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
            gap: "clamp(1.5rem, 2.5vw, 2rem)",
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.slice(0, visibleCount).map((emp, i) => (
              <EmployeeCard key={emp.id} employee={emp} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {/* ── Show More/Less Buttons ── */}
        {(filtered.length > visibleCount || visibleCount > 8) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1.5rem",
              marginTop: "3rem",
            }}
          >
            {filtered.length > visibleCount && (
              <button
                onClick={() => setVisibleCount((prev) => prev + 8)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(0, 255, 136, 0.05)";
                  e.currentTarget.style.borderColor = "rgba(0, 255, 136, 0.4)";
                  e.currentTarget.style.color = "var(--brand-green)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
                  e.currentTarget.style.color = "#fff";
                }}
                style={{
                  padding: "12px 28px",
                  borderRadius: "100px",
                  background: "transparent",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#fff",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                Show More Team
              </button>
            )}

            {visibleCount > 8 && (
              <button
                onClick={() => {
                  setVisibleCount(8);
                  sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 100, 100, 0.05)";
                  e.currentTarget.style.borderColor = "rgba(255, 100, 100, 0.4)";
                  e.currentTarget.style.color = "#ff6464";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
                  e.currentTarget.style.color = "#fff";
                }}
                style={{
                  padding: "12px 28px",
                  borderRadius: "100px",
                  background: "transparent",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#fff",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                Show Less
              </button>
            )}
          </motion.div>
        )}

        {/* ── Empty state ── */}
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
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
              }}
            >
              No team members found.
            </p>
            <p
              style={{
                fontSize: "0.82rem",
                color: "rgba(255,255,255,0.2)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Maybe they&apos;re building something amazing 🚀
            </p>
          </motion.div>
        )}

        {/* Result count — editorial detail at bottom */}
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
              fontFamily: "'DM Sans', sans-serif",
              textAlign: "right",
            }}
          >
            {filtered.length} {filtered.length === 1 ? "member" : "members"}
            {activeDept !== "All" ? ` · ${activeDept}` : ""}
          </motion.p>
        )}
      </div>
    </section>
  );
}