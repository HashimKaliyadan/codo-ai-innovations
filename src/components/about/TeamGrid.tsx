"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { employees, DEPARTMENTS, type Employee } from "@/data/employees";
import EmployeeCard from "./EmployeeCard";

export default function TeamGrid() {
  const [search, setSearch] = useState("");
  const [activeDept, setActiveDept] = useState<string>("All");

  const filtered = useMemo(() => {
    return employees.filter((e: Employee) => {
      const matchesDept =
        activeDept === "All" || e.department === activeDept;
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

  return (
    <section style={{ padding: "clamp(60px, 8vw, 100px) 0" }}>
      <div className="max-w-[1320px] mx-auto px-6">
        {/* Header row */}
        <div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
        >
          {/* Left: Title */}
          <div>
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: "var(--brand-green)",
                marginBottom: "0.75rem",
              }}
            >
              Our Team
            </p>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
                lineHeight: 1.1,
              }}
            >
              Meet the people
            </h2>
          </div>

          {/* Right: Search + Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Search */}
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Search
                size={14}
                style={{
                  position: "absolute",
                  left: 12,
                  color: "rgba(255,255,255,0.3)",
                  pointerEvents: "none",
                }}
              />
              <input
                type="text"
                placeholder="Search team..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: 200,
                  height: 38,
                  paddingLeft: 34,
                  paddingRight: 12,
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "var(--text-primary)",
                  fontSize: "0.8rem",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(34,197,94,0.4)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(255,255,255,0.08)")
                }
              />
            </div>

            {/* Department tabs */}
            <div
              style={{
                display: "flex",
                gap: 4,
                padding: 4,
                borderRadius: "12px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                flexWrap: "wrap",
              }}
            >
              {DEPARTMENTS.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setActiveDept(dept)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "8px",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    cursor: "pointer",
                    border: "none",
                    transition: "all 0.25s ease",
                    background:
                      activeDept === dept
                        ? "rgba(34,197,94,0.12)"
                        : "transparent",
                    color:
                      activeDept === dept
                        ? "var(--brand-green)"
                        : "rgba(255,255,255,0.4)",
                  }}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cards grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          style={{ gap: "1.5rem" }}
        >
          {filtered.map((emp, i) => (
            <EmployeeCard key={emp.id} employee={emp} index={i} />
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: "center",
              padding: "4rem 1rem",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
              No team members found.
            </p>
            <p style={{ fontSize: "0.85rem" }}>
              Maybe they&apos;re building something amazing 🚀
            </p>
          </motion.div>
        )}
      </div>

      {/* No QR Spotlight CSS here anymore */}
    </section>
  );
}
