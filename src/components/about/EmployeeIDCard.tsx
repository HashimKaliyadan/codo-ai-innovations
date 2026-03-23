"use client";

import QRCode from "react-qr-code";
import { Employee, DEPARTMENT_COLORS } from "@/data/employees";

/**
 * Back face of the employee flip card — styled as a genuine company ID.
 */
export default function EmployeeIDCard({
  employee,
}: {
  employee: Employee;
}) {
  const deptColor = DEPARTMENT_COLORS[employee.department];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
        borderRadius: "1.25rem",
        overflow: "hidden",
        background: "linear-gradient(145deg, #0f1218 0%, #141a24 50%, #0d1117 100%)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {/* Department color bar at top */}
      <div style={{ height: 4, background: deptColor }} />

      {/* Holographic stripe */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "60%",
          height: "100%",
          background:
            "linear-gradient(135deg, transparent 30%, rgba(34,197,94,0.04) 45%, rgba(59,130,246,0.04) 55%, rgba(168,85,247,0.03) 65%, transparent 80%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ padding: "1.25rem 1.5rem", height: "calc(100% - 4px)", display: "flex", flexDirection: "column" }}>
        {/* Header row: logo + REC indicator */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 900, letterSpacing: "-0.03em", color: "rgba(255,255,255,0.8)" }}>
            CODO<span style={{ color: "var(--brand-green)" }}> AI</span>
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: deptColor,
                boxShadow: `0 0 8px ${deptColor}`,
                animation: "pulse 2s infinite",
              }}
            />
            <span style={{ fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>
              Active
            </span>
          </div>
        </div>

        {/* Employee info row */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          {/* Mini photo */}
          <div
            style={{
              width: 56,
              height: 72,
              borderRadius: "0.5rem",
              overflow: "hidden",
              flexShrink: 0,
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <img
              src={employee.photo}
              alt={employee.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: "1rem", fontWeight: 800, color: "white", lineHeight: 1.2, marginBottom: "0.2rem" }}>
              {employee.name}
            </p>
            <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.3 }}>
              {employee.role}
            </p>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                marginTop: "0.4rem",
                padding: "2px 8px",
                borderRadius: "4px",
                background: `${deptColor}15`,
                border: `1px solid ${deptColor}30`,
              }}
            >
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: deptColor }} />
              <span style={{ fontSize: "0.6rem", fontWeight: 700, color: deptColor, letterSpacing: "0.08em" }}>
                {employee.department}
              </span>
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.3rem",
            paddingBottom: "0.75rem",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            marginBottom: "auto",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.3)", fontFamily: "monospace", letterSpacing: "0.05em" }}>
              ID
            </span>
            <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.6)", fontFamily: "monospace", fontWeight: 600 }}>
              {employee.id}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.3)", fontFamily: "monospace", letterSpacing: "0.05em" }}>
              EMAIL
            </span>
            <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.6)", fontFamily: "monospace" }}>
              {employee.email}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.3)", fontFamily: "monospace", letterSpacing: "0.05em" }}>
              JOINED
            </span>
            <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.6)", fontFamily: "monospace" }}>
              {employee.joinedYear}
            </span>
          </div>
        </div>

        {/* QR Section */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", marginTop: "0.75rem" }}>
          <div>
            <p style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.3rem" }}>
              Scan to view profile
            </p>
            <p style={{ fontSize: "0.5rem", color: "rgba(255,255,255,0.15)", fontFamily: "monospace" }}>
              CODO AI TECHNOLOGIES PVT LTD
            </p>
          </div>
          <div
            style={{
              padding: 8,
              borderRadius: "0.5rem",
              background: "white",
              flexShrink: 0,
            }}
          >
            <QRCode
              value={employee.qrUrl}
              size={72}
              fgColor="#111010"
              bgColor="white"
              level="M"
            />
          </div>
        </div>
      </div>

      {/* Pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
