"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Briefcase } from "lucide-react";
import { OPEN_POSITIONS, Job, JobDepartment } from "@/data/jobs";

const CATEGORIES: ("All" | JobDepartment)[] = [
  "All",
  "Engineering",
  "Design",
  "Product",
  "Operations",
  "Management",
];

export default function OpenPositions() {
  const [activeTab, setActiveTab] = useState<"All" | JobDepartment>("All");

  const filteredJobs = useMemo(() => {
    if (activeTab === "All") return OPEN_POSITIONS;
    return OPEN_POSITIONS.filter((job) => job.department === activeTab);
  }, [activeTab]);

  return (
    <section style={{ padding: "clamp(60px, 10vw, 120px) 0", position: "relative" }}>
      <div className="max-w-[1000px] mx-auto px-6">
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(3rem, 5vw, 4rem)" }}>
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              color: "var(--brand-green)",
              marginBottom: "1rem",
            }}
          >
            Now Hiring
          </p>
          <h2
            style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              lineHeight: 1.15,
            }}
          >
            Open Positions Available
          </h2>
          <p
            style={{
              fontSize: "clamp(15px, 1.5vw, 17px)",
              color: "rgba(255,255,255,0.5)",
              marginTop: "1.25rem",
              lineHeight: 1.6,
            }}
          >
            Join us for exciting opportunities in a team that values growth and innovation.
          </p>
        </div>

        {/* Filter Tabs */}
        <div 
          style={{ 
            display: "flex", 
            justifyContent: "center", 
            gap: "0.5rem", 
            flexWrap: "wrap", 
            marginBottom: "3rem" 
          }}
        >
          {CATEGORIES.map((category) => {
            const isActive = activeTab === category;
            return (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                style={{
                  padding: "0.6rem 1.25rem",
                  borderRadius: "999px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                  border: isActive ? "1px solid var(--brand-green)" : "1px solid rgba(255,255,255,0.08)",
                  background: isActive ? "var(--brand-green)" : "transparent",
                  color: isActive ? "#000" : "rgba(255,255,255,0.6)",
                  cursor: "pointer",
                }}
                className={isActive ? "" : "hover:text-white hover:border-white/20"}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Jobs List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <AnimatePresence mode="popLayout">
            {filteredJobs.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                style={{
                  background: "var(--glass-bg)",
                  border: "1px solid var(--glass-border)",
                  backdropFilter: "blur(16px)",
                  borderRadius: "1rem",
                  padding: "1.5rem 2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
                className="md:flex-row md:items-center md:justify-between hover-card"
              >
                <div>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                    {job.title}
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>
                      <Briefcase size={14} />
                      {job.experience}
                    </div>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
                    <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>{job.type}</span>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
                    <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>{job.location}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "999px",
                    border: "1px solid var(--brand-green)",
                    color: "var(--brand-green)",
                    background: "transparent",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    alignSelf: "flex-start",
                  }}
                  className="apply-btn md:self-center hover:bg-green-500 hover:text-black"
                >
                  Apply Now <ArrowRight size={16} />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredJobs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                textAlign: "center",
                padding: "4rem 0",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              <p style={{ fontSize: "1.1rem" }}>No open positions found in this category.</p>
              <p style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>Check back later or try another filter!</p>
            </motion.div>
          )}
        </div>
      </div>

      <style>{`
        .hover-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .hover-card:hover {
          transform: translateY(-2px);
          border-color: rgba(255,255,255,0.15);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
      `}</style>
    </section>
  );
}
