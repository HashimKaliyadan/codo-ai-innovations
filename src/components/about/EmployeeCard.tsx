"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Mail, Check } from "lucide-react";
import { Employee, DEPARTMENT_COLORS } from "@/data/employees";
import { TransitionLink as Link } from "@/components/transition/TransitionLink";

/**
 * Employee card — links directly to their detailed profile page.
 */
export default function EmployeeCard({
  employee,
  index = 0,
}: {
  employee: Employee;
  index?: number;
}) {
  const [copied, setCopied] = useState(false);
  const deptColor = DEPARTMENT_COLORS[employee.department];

  const copyEmail = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      navigator.clipboard.writeText(employee.email).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    },
    [employee.email]
  );

  return (
    <motion.div
      id={`employee-${employee.slug}`}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.08,
      }}
      className="employee-card-wrapper"
    >
      <Link href={`/team/${employee.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "3 / 4.3",
            borderRadius: "1.25rem",
            overflow: "hidden",
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
            backdropFilter: "blur(16px)",
            display: "flex",
            flexDirection: "column",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          className="card-front-face"
        >
          {/* Department color accent */}
          <div style={{ height: 3, background: deptColor, flexShrink: 0 }} />

          {/* Photo */}
          <div
            style={{
              flex: "1 1 0",
              minHeight: 0,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <img
              src={employee.photo}
              alt={employee.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.5s ease",
              }}
              loading="lazy"
            />
            {/* Gradient overlay */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "70%",
                background:
                  "linear-gradient(transparent, rgba(10,10,10,0.95))",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Info */}
          <div style={{ padding: "1rem 1.25rem 1.25rem" }}>
            <h3
              style={{
                fontSize: "1.05rem",
                fontWeight: 800,
                color: "var(--text-primary)",
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
              }}
            >
              {employee.name}
            </h3>
            <p
              style={{
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.5)",
                marginTop: "0.25rem",
                lineHeight: 1.3,
              }}
            >
              {employee.role}
            </p>

            {/* Department pill + action buttons */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "0.75rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  background: `${deptColor}15`,
                  border: `1px solid ${deptColor}30`,
                  color: deptColor,
                }}
              >
                {employee.department}
              </span>

              <div style={{ display: "flex", gap: 6 }}>
                {/* Copy email */}
                <button
                  onClick={copyEmail}
                  title="Copy email"
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: copied ? "var(--brand-green)" : "rgba(255,255,255,0.4)",
                    transition: "all 0.2s",
                  }}
                >
                  {copied ? <Check size={13} /> : <Mail size={13} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Hover styles */}
      <style>{`
        .card-front-face:hover img {
          transform: scale(1.05);
        }
        .employee-card-wrapper:hover .card-front-face {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08); /* Glow matched to existing card styling if needed */
        }
      `}</style>
    </motion.div>
  );
}
