import { notFound } from "next/navigation";
import { employees, DEPARTMENT_COLORS } from "@/data/employees";
import { TransitionLink as Link } from "@/components/transition/TransitionLink";
import {
  ArrowLeft, Mail, Github, Linkedin, Twitter,
  Globe, Download, Briefcase, Calendar, MapPin, Layers,
} from "lucide-react";

export function generateStaticParams() {
  return employees.map((e) => ({ slug: e.slug }));
}

export default async function EmployeeProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const employee = employees.find((e) => e.slug === slug);
  if (!employee) notFound();

  const accent = DEPARTMENT_COLORS[employee.department];

  /* ---------- derived helpers ---------- */
  const emp = employee as unknown as Record<string, unknown>;

  const socials = [
    emp.website  && { icon: <Globe size={15} />,    href: emp.website as string,  label: "Website"  },
    emp.twitter  && { icon: <Twitter size={15} />,  href: emp.twitter as string,  label: "Twitter"  },
    emp.github   && { icon: <Github size={15} />,   href: emp.github as string,   label: "GitHub"   },
    emp.linkedin && { icon: <Linkedin size={15} />, href: emp.linkedin as string, label: "LinkedIn" },
  ].filter(Boolean) as { icon: React.ReactNode; href: string; label: string }[];

  const meta = [
    { icon: <Briefcase size={13} />, label: "Department", value: employee.department },
    { icon: <Calendar size={13} />,  label: "Joined",     value: String(employee.joinedYear) },
    { icon: <MapPin size={13} />,    label: "Location",   value: (emp.location as string) ?? "Remote" },
    { icon: <Layers size={13} />,    label: "Status",     value: (emp.status as string)  ?? "Full-time" },
  ];

  const services = (emp.services ?? []) as { icon: React.ReactNode; title: string; description?: string }[];

  return (
    <main
      style={{
        display: "flex",
        height: "100dvh",
        maxHeight: "100dvh",
        overflow: "hidden",
        background: "#000",
        fontFamily: "'DM Sans', sans-serif",
        position: "relative",
      }}
    >
      {/* ---- inline hover styles (Server Component safe) ---- */}
      <style>{`
        .emp-social { display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:9px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.5);transition:all .22s ease;text-decoration:none }
        .emp-social:hover { background:${accent}18;border-color:${accent}45;color:${accent};transform:translateY(-2px) }
        .emp-cta-primary { display:flex;align-items:center;justify-content:center;gap:7px;height:40px;border-radius:11px;font-size:0.62rem;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;background:${accent};color:#000;text-decoration:none;transition:opacity .2s,transform .2s }
        .emp-cta-primary:hover { opacity:0.84;transform:translateY(-1px) }
        .emp-cta-secondary { display:flex;align-items:center;justify-content:center;gap:7px;height:40px;border-radius:11px;font-size:0.62rem;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.65);text-decoration:none;transition:all .2s }
        .emp-cta-secondary:hover { border-color:${accent}40;color:${accent};transform:translateY(-1px) }
        .emp-skill { padding:6px 13px;border-radius:99px;font-size:0.7rem;font-weight:600;background:rgba(255,255,255,0.035);border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.62);transition:all .2s;cursor:default }
        .emp-skill:hover { background:${accent}14;border-color:${accent}35;color:${accent} }
        .emp-svc-card { padding:1.15rem;border-radius:13px;background:rgba(255,255,255,0.022);border:1px solid rgba(255,255,255,0.06);display:flex;flex-direction:column;gap:9px;transition:border-color .25s }
        .emp-svc-card:hover { border-color:${accent}32 }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* ═══════════════════════════════════════
          LEFT SIDEBAR (desktop only)
      ═══════════════════════════════════════ */}
      <aside
        className="hidden lg:flex"
        style={{
          width: "clamp(240px, 26vw, 300px)",
          flexShrink: 0,
          height: "100dvh",
          flexDirection: "column",
          alignItems: "center",
          background: "rgba(255,255,255,0.015)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          padding: "clamp(1.5rem, 3.5vh, 2.25rem) clamp(1rem, 2vw, 1.5rem)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Accent glow */}
        <div aria-hidden style={{ position: "absolute", top: "7rem", left: "50%", transform: "translateX(-50%)", width: "220px", height: "220px", borderRadius: "50%", background: `radial-gradient(circle, ${accent} 0%, transparent 65%)`, filter: "blur(50px)", opacity: 0.16, pointerEvents: "none" }} />

        {/* Grid texture */}
        <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.013) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.013) 1px, transparent 1px)", backgroundSize: "24px 24px", pointerEvents: "none" }} />

        {/* Vertical Centering Spacer */}
        <div style={{ marginTop: "auto" }} />

        {/* Photo */}
        <div style={{ position: "relative", zIndex: 1, width: "clamp(110px, 12vw, 148px)", height: "clamp(110px, 12vw, 148px)", borderRadius: "18px", overflow: "hidden", border: `2px solid ${accent}40`, boxShadow: `0 0 0 4px ${accent}10, 0 16px 48px rgba(0,0,0,0.65)`, marginBottom: "clamp(1rem, 2.2vh, 1.5rem)", flexShrink: 0 }}>
          <img src={employee.photo} alt={employee.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
        </div>

        {/* Name */}
        <h1 style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)", fontWeight: 900, letterSpacing: "-0.025em", color: "#fff", textAlign: "center", lineHeight: 1.15, marginBottom: "6px", position: "relative", zIndex: 1 }}>
          {employee.name}
        </h1>

        {/* Role */}
        <span style={{ fontSize: "0.68rem", fontWeight: 700, color: accent, letterSpacing: "0.05em", marginBottom: "clamp(0.8rem, 2vh, 1.3rem)", position: "relative", zIndex: 1, textAlign: "center" }}>
          {employee.role}
        </span>

        {/* Dept badge */}
        <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: "6px", fontSize: "0.56rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.14em", background: `${accent}14`, border: `1px solid ${accent}30`, color: accent, marginBottom: "clamp(1.1rem, 2.8vh, 1.8rem)", position: "relative", zIndex: 1 }}>
          {employee.department}
        </span>

        {/* Divider */}
        <div style={{ width: "100%", height: "1px", background: `linear-gradient(90deg, transparent, ${accent}28, transparent)`, marginBottom: "clamp(1rem, 2.2vh, 1.5rem)", position: "relative", zIndex: 1 }} />

        {/* Socials */}
        {socials.length > 0 && (
          <div style={{ display: "flex", gap: "8px", marginBottom: "3rem", position: "relative", zIndex: 1, flexWrap: "wrap", justifyContent: "center" }}>
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="emp-social">
                {s.icon}
              </a>
            ))}
          </div>
        )}

        {/* Bottom Spacer to push block up from buttons */}
        <div style={{ marginBottom: "auto" }} />

        {/* CTAs pinned to bottom */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "8px", position: "relative", zIndex: 1 }}>
          <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", marginBottom: "4px" }} />

          <Link href="/about" className="emp-cta-secondary">
            <ArrowLeft size={13} /> Back to Team
          </Link>

          <a href={`mailto:${employee.email}`} className="emp-cta-primary">
            <Mail size={13} /> Contact Me
          </a>

          {(emp.cvUrl as string) && (
            <a href={emp.cvUrl as string} download className="emp-cta-secondary">
              <Download size={13} /> Download CV
            </a>
          )}
        </div>
      </aside>

      {/* ═══════════════════════════════════════
          RIGHT PANEL — scrollable (desktop)
      ═══════════════════════════════════════ */}
      <div
        className="hidden lg:flex no-scrollbar"
        style={{ flex: 1, height: "100dvh", flexDirection: "column", overflowY: "auto", scrollbarWidth: "none", msOverflowStyle: "none", position: "relative" }}
      >
        {/* Vertical Centering Wrapper */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "100%", padding: "4rem 0" }}>
          <div style={{ width: "100%", maxWidth: "780px", margin: "0 auto", padding: "0 clamp(2rem, 5vw, 4rem)" }}>

            {/* About */}
            <section style={{ marginBottom: "clamp(2rem, 5vh, 3.5rem)" }}>
              <SectionHeading accent={accent} text="About Me" />
              <p style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "rgba(255,255,255,0.55)", maxWidth: "100%" }}>
                {employee.bio}
              </p>
            </section>

            <HR accent={accent} />

            {/* Personal Info */}
            <section style={{ marginBottom: "clamp(2rem, 5vh, 3.5rem)" }}>
              <SectionHeading accent={accent} text="Personal Info" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "12px" }}>
                {meta.map(({ icon, label, value }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "12px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.055)" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 10px", borderRadius: "6px", fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", background: `${accent}14`, color: accent, border: `1px solid ${accent}28`, flexShrink: 0, minWidth: "85px", justifyContent: "center" }}>
                      {icon}{label}
                    </span>
                    <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "rgba(255,255,255,0.75)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </section>

          <HR accent={accent} />

          {/* Skills */}
          <section style={{ marginBottom: services.length > 0 ? "clamp(1.75rem, 4vh, 2.75rem)" : 0 }}>
            <SectionHeading accent={accent} text="Core Expertise" />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
              {employee.skills.map((skill) => (
                <span key={skill} className="emp-skill">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Services (optional) */}
          {services.length > 0 && (
            <>
              <HR accent={accent} />
              <section>
                <SectionHeading accent={accent} text="My Services" />
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: "10px" }}>
                  {services.map((svc) => (
                    <div key={svc.title} className="emp-svc-card">
                      <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${accent}18`, border: `1px solid ${accent}30`, display: "flex", alignItems: "center", justifyContent: "center", color: accent }}>{svc.icon}</div>
                      <div>
                        <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#fff", marginBottom: "2px" }}>{svc.title}</p>
                        {svc.description && <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.6 }}>{svc.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

        </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          MOBILE — full page stacked layout
      ═══════════════════════════════════════ */}
      <div className="lg:hidden no-scrollbar" style={{ position: "fixed", inset: 0, zIndex: 50, overflowY: "auto", background: "#000", scrollbarWidth: "none", msOverflowStyle: "none" }}>

        {/* Empty space for top sticky nav - optional, removing for cleaner look */}

        {/* Hero photo */}
        <div style={{ position: "relative", height: "38dvh", overflow: "hidden" }}>
          <img src={employee.photo} alt={employee.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #000 0%, transparent 55%)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${accent}, transparent)` }} />
        </div>

        {/* Identity */}
        <div style={{ padding: "1.5rem 1.25rem 0", textAlign: "center" }}>
          <span style={{ display: "inline-block", padding: "3px 9px", borderRadius: "5px", fontSize: "0.54rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.14em", background: `${accent}14`, border: `1px solid ${accent}28`, color: accent, marginBottom: "10px" }}>{employee.department}</span>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.03em", color: "#fff", marginBottom: "4px" }}>{employee.name}</h1>
          <p style={{ fontSize: "0.78rem", fontWeight: 700, color: accent, marginBottom: "1rem" }}>{employee.role}</p>

          {/* Socials */}
          <div style={{ display: "flex", justifyContent: "center", gap: "7px", marginBottom: "1rem", flexWrap: "wrap" }}>
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="emp-social">
                {s.icon}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", justifyContent: "center", marginBottom: "2rem", maxWidth: "260px", margin: "0 auto 2rem" }}>
            <Link href="/about" style={{ display: "inline-flex", alignItems: "center", gap: "6px", height: "40px", padding: "0 18px", borderRadius: "10px", fontSize: "0.62rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", textDecoration: "none", justifyContent: "center" }}>
              <ArrowLeft size={13} /> Back to Team
            </Link>
            <a href={`mailto:${employee.email}`} style={{ display: "inline-flex", alignItems: "center", gap: "6px", height: "40px", padding: "0 18px", borderRadius: "10px", fontSize: "0.62rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", background: accent, color: "#000", textDecoration: "none", justifyContent: "center" }}>
              <Mail size={13} /> Contact
            </a>
            {(emp.cvUrl as string) && (
              <a href={emp.cvUrl as string} download style={{ display: "inline-flex", alignItems: "center", gap: "6px", height: "40px", padding: "0 18px", borderRadius: "10px", fontSize: "0.62rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", textDecoration: "none", justifyContent: "center" }}>
                <Download size={13} /> CV
              </a>
            )}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "0 1.25rem 4rem" }}>
          <section style={{ marginBottom: "1.75rem" }}>
            <SectionHeading accent={accent} text="About Me" />
            <p style={{ fontSize: "0.87rem", lineHeight: 1.8, color: "rgba(255,255,255,0.48)" }}>{employee.bio}</p>
          </section>
          <HR accent={accent} />
          <section style={{ marginBottom: "1.75rem" }}>
            <SectionHeading accent={accent} text="Personal Info" />
            <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
              {meta.map(({ icon, label, value }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 12px", borderRadius: "10px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.055)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.58rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: accent }}>{icon}{label}</span>
                  <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>{value}</span>
                </div>
              ))}
            </div>
          </section>
          <HR accent={accent} />
          <section>
            <SectionHeading accent={accent} text="Core Expertise" />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
              {employee.skills.map((skill) => (
                <span key={skill} className="emp-skill">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>

    </main>
  );
}

/* ── Shared helpers ── */

function SectionHeading({ accent, text }: { accent: string; text: string }) {
  const parts = text.split(" ");
  const first = parts[0];
  const rest = parts.slice(1).join(" ");
  return (
    <h2 style={{ fontSize: "clamp(1.05rem, 1.7vw, 1.25rem)", fontWeight: 900, letterSpacing: "-0.02em", color: "#fff", marginBottom: "clamp(0.9rem, 2vh, 1.3rem)" }}>
      <span style={{ color: accent }}>{first}</span>{rest ? ` ${rest}` : ""}
    </h2>
  );
}

function HR({ accent }: { accent: string }) {
  return (
    <div style={{ height: "1px", background: `linear-gradient(90deg, ${accent}22, rgba(255,255,255,0.04) 40%, transparent)`, margin: "clamp(1.5rem, 3.5vh, 2.5rem) 0" }} />
  );
}