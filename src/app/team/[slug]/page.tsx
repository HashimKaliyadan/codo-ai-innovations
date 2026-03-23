import { notFound } from "next/navigation";
import { employees, DEPARTMENT_COLORS } from "@/data/employees";
import Link from "next/link";
import { ArrowLeft, Mail, Github, Linkedin, Briefcase, Calendar } from "lucide-react";

export function generateStaticParams() {
  return employees.map((employee) => ({
    slug: employee.slug,
  }));
}

export default async function EmployeeProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const employee = employees.find((e) => e.slug === slug);

  if (!employee) {
    notFound();
  }

  const deptColor = DEPARTMENT_COLORS[employee.department];

  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(80px, 10vw, 120px) 1.5rem 4rem",
        position: "relative",
      }}
    >
      {/* Background ambient glow matching department */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60vw",
          height: "60vw",
          maxWidth: "800px",
          maxHeight: "800px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${deptColor}15 0%, transparent 70%)`,
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "1100px",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        {/* Back link */}
        <Link
          href="/about"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "rgba(255,255,255,0.5)",
            fontSize: "0.85rem",
            fontWeight: 600,
            transition: "color 0.2s",
            alignSelf: "flex-start",
          }}
          className="hover:text-white"
        >
          <ArrowLeft size={16} /> Back to Team
        </Link>

        {/* Profile Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
            backdropFilter: "blur(24px)",
            borderRadius: "1.5rem",
            overflow: "hidden",
          }}
          className="md:flex-row"
        >
          {/* Left: Photo */}
          <div
            style={{
              width: "100%",
              flexShrink: 0,
              aspectRatio: "3 / 4",
              borderRight: "1px solid rgba(255,255,255,0.06)",
              position: "relative",
            }}
            className="md:w-5/12 lg:w-4/12 md:aspect-auto"
          >
            <img
              src={employee.photo}
              alt={employee.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            {/* Dept Color Bar */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: deptColor,
              }}
            />
          </div>

          {/* Right: Info */}
          <div
            style={{
              padding: "clamp(2rem, 4vw, 3.5rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <div style={{ marginBottom: "2rem" }}>
              <span
                style={{
                  display: "inline-block",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  background: `${deptColor}15`,
                  border: `1px solid ${deptColor}30`,
                  color: deptColor,
                  marginBottom: "1rem",
                }}
              >
                {employee.department}
              </span>
              <h1
                style={{
                  fontSize: "clamp(32px, 4vw, 48px)",
                  fontWeight: 900,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  marginBottom: "0.5rem",
                }}
              >
                {employee.name}
              </h1>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "rgba(255,255,255,0.6)",
                  fontWeight: 500,
                }}
              >
                {employee.role}
              </p>
            </div>

            <div style={{ marginBottom: "2.5rem" }}>
              <h2
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.3)",
                  marginBottom: "0.75rem",
                }}
              >
                About
              </h2>
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.8)",
                  maxWidth: "600px",
                }}
              >
                {employee.bio}
              </p>
            </div>

            {/* Meta tags */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1.5rem",
                marginBottom: "2.5rem",
                padding: "1.5rem 0",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ color: "rgba(255,255,255,0.3)" }}>
                  <Briefcase size={18} />
                </div>
                <div>
                  <p style={{ fontSize: "0.65rem", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em", marginBottom: 2 }}>ID</p>
                  <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", fontFamily: "monospace" }}>{employee.id}</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ color: "rgba(255,255,255,0.3)" }}>
                  <Calendar size={18} />
                </div>
                <div>
                  <p style={{ fontSize: "0.65rem", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em", marginBottom: 2 }}>Joined</p>
                  <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>{employee.joinedYear}</p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div style={{ marginBottom: "2.5rem" }}>
              <h2
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.3)",
                  marginBottom: "1rem",
                }}
              >
                Core Expertise
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {employee.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      padding: "8px 16px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "99px",
                      fontSize: "0.8rem",
                      color: "rgba(255,255,255,0.7)",
                      fontWeight: 500,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact / Links */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <a
                href={`mailto:${employee.email}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  height: "44px",
                  padding: "0 1.5rem",
                  background: "var(--text-primary)",
                  color: "var(--background)",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                className="hover:opacity-90"
              >
                <Mail size={16} /> Contact
              </a>
              
              {employee.linkedin && (
                <a
                  href={employee.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "44px",
                    height: "44px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "rgba(255,255,255,0.7)",
                    transition: "all 0.2s",
                  }}
                  className="hover:bg-white/10 hover:text-white"
                  title="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              )}
              
              {employee.github && (
                <a
                  href={employee.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "44px",
                    height: "44px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "rgba(255,255,255,0.7)",
                    transition: "all 0.2s",
                  }}
                  className="hover:bg-white/10 hover:text-white"
                  title="GitHub"
                >
                  <Github size={18} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
