"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { type Employee } from "@/data/employees";

const EASE = [0.22, 1, 0.36, 1] as const;

interface Props {
  employee: Employee;
  index: number;
}

export default function EmployeeCard({ employee, index }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        borderRadius: "16px",
        background: "rgba(10, 10, 10, 0.8)",
        border: `1px solid ${hovered ? "rgba(0, 255, 136, 0.4)" : "rgba(255, 255, 255, 0.08)"}`,
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        transform: hovered ? "translateY(-6px)" : "none",
        boxShadow: hovered 
          ? "0 20px 40px rgba(0, 0, 0, 0.6), 0 0 40px rgba(0, 255, 136, 0.08)" 
          : "0 10px 30px rgba(0, 0, 0, 0.3)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* ── Image Section ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1 / 1.15",
          overflow: "hidden",
          background: "#050505",
        }}
      >
        <motion.img
          src={employee.photo}
          alt={employee.name}
          animate={{
            scale: hovered ? 1.05 : 1,
            filter: hovered ? "grayscale(0%) contrast(1.05) brightness(1)" : "grayscale(100%) contrast(1.15) brightness(0.65)",
          }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 15%",
          }}
        />
        
        {/* Department Badge overlays the image */}
        <div
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            padding: "5px 12px",
            borderRadius: "6px",
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            fontSize: "0.6rem",
            fontWeight: 800,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#fff",
            zIndex: 2,
          }}
        >
          {employee.department}
        </div>

        {/* Gradient Overlay for seamless blend to the text area */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "60%",
            background: "linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.8) 30%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      </div>

      {/* ── Text Section ── */}
      <div
        style={{
          padding: "0 24px 24px 24px",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          background: "rgba(10,10,10,1)",
          position: "relative",
          zIndex: 2,
          marginTop: "-20px", // pulls the text up into the gradient
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
          <div>
            <motion.h3
              animate={{ color: hovered ? "#fff" : "rgba(255, 255, 255, 0.9)" }}
              transition={{ duration: 0.3 }}
              style={{
                fontSize: "1.3rem",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {employee.name}
            </motion.h3>
            <p
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "var(--brand-green)",
                margin: "4px 0 0 0",
                letterSpacing: "0.02em",
              }}
            >
              {employee.role}
            </p>
          </div>
          
          <motion.div
            animate={{ 
              opacity: hovered ? 1 : 0.4,
              x: hovered ? 0 : -4,
              y: hovered ? 0 : 4,
            }}
            transition={{ duration: 0.4, ease: EASE }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: hovered ? "rgba(0, 255, 136, 0.1)" : "rgba(255, 255, 255, 0.03)",
              border: `1px solid ${hovered ? "rgba(0, 255, 136, 0.3)" : "rgba(255, 255, 255, 0.1)"}`,
              color: hovered ? "var(--brand-green)" : "rgba(255, 255, 255, 0.5)",
              flexShrink: 0,
            }}
          >
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </motion.div>
        </div>

        <p
          style={{
            fontSize: "0.85rem",
            lineHeight: 1.6,
            color: "rgba(255, 255, 255, 0.45)",
            margin: "12px 0 24px 0",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {employee.bio}
        </p>

        {/* Technical crosshair accents (AI/Tech vibe) */}
        <div style={{ position: "absolute", bottom: "24px", right: "24px", display: "flex", gap: "3px", opacity: 0.3 }}>
          <div style={{ width: "2px", height: "2px", background: "#fff" }} />
          <div style={{ width: "2px", height: "2px", background: "#fff" }} />
          <div style={{ width: "2px", height: "2px", background: "#fff" }} />
        </div>

        <div style={{ marginTop: "auto", display: "flex", flexWrap: "wrap", gap: "6px", width: "calc(100% - 20px)" }}>
          {employee.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              style={{
                padding: "4px 10px",
                borderRadius: "100px",
                fontSize: "0.65rem",
                fontWeight: 600,
                background: "rgba(255, 255, 255, 0.04)",
                color: "rgba(255, 255, 255, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                transition: "all 0.3s ease",
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}