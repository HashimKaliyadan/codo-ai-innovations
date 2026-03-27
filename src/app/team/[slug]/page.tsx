import { notFound } from "next/navigation";
import { employees, DEPARTMENT_COLORS } from "@/data/employees";
import { TransitionLink as Link } from "@/components/transition/TransitionLink";
import {
  ArrowLeft, Mail, Github, Linkedin, Twitter,
  Globe, Download, Briefcase, Calendar, MapPin, Layers, BookOpen, Award
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
  const emp = employee as unknown as Record<string, unknown>;

  const socials = [
    emp.website && { icon: <Globe size={13} />, href: emp.website as string, label: "Website" },
    emp.twitter && { icon: <Twitter size={13} />, href: emp.twitter as string, label: "Twitter" },
    emp.github && { icon: <Github size={13} />, href: emp.github as string, label: "GitHub" },
    emp.linkedin && { icon: <Linkedin size={13} />, href: emp.linkedin as string, label: "LinkedIn" },
  ].filter(Boolean) as { icon: React.ReactNode; href: string; label: string }[];

  const meta = [
    { icon: <Briefcase size={10} />, label: "Dept", value: employee.department },
    { icon: <Calendar size={10} />, label: "Since", value: String(employee.joinedYear) },
    { icon: <MapPin size={10} />, label: "Location", value: (emp.location as string) ?? "Remote" },
    { icon: <Layers size={10} />, label: "Status", value: (emp.status as string) ?? "Full-time" },
  ];

  const services = (emp.services ?? []) as { icon: React.ReactNode; title: string; description?: string }[];
  
  // Dummy data for new sections to make the profile look fuller
  // In a real app, this would come from the employee data object
  const experience = [
    { role: "Current Position", company: "CODO AI Innovations", period: `${employee.joinedYear} - Present` },
    { role: "Previous Role", company: "Tech Solutions Inc.", period: "2019 - 2022" },
  ];
  
  const education = [
    { degree: "Bachelor of Technology", institution: "University of Engineering", year: "2019" },
    { degree: "Advanced Certification", institution: "Tech Institute", year: "2021" },
  ];

  const employeeIndex = employees.findIndex((e) => e.slug === slug) + 1;

  return (
    <main
      style={{
        height: "100dvh",
        maxHeight: "100dvh",
        overflow: "hidden",
        background: "#060606",
        fontFamily: "'DM Sans', sans-serif",
        position: "relative",
      }}
    >
      {/* ────────────────────────────────────────
          GLOBAL KEYFRAMES & UTILITY CLASSES
      ──────────────────────────────────────── */}
      <style>{`
        @keyframes grain {
          0%,100%{transform:translate(0,0)}
          10%{transform:translate(-2%,-3%)}20%{transform:translate(3%,1%)}
          30%{transform:translate(-1%,4%)}40%{transform:translate(4%,-2%)}
          50%{transform:translate(-3%,3%)}60%{transform:translate(2%,-4%)}
          70%{transform:translate(-4%,1%)}80%{transform:translate(3%,2%)}
          90%{transform:translate(-2%,-1%)}
        }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes riseUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes marquee{ from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes pulse  { 0%,100%{opacity:.4} 50%{opacity:.7} }

        .grain-tex {
          position:absolute;inset:-50%;width:200%;height:200%;pointer-events:none;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity:.032;animation:grain 3s steps(1) infinite;
        }
        .panel-l { animation: fadeIn  .5s ease forwards; }
        .panel-r { animation: riseUp  .55s .07s ease both; }

        .social-btn {
          display:flex;align-items:center;justify-content:center;
          width:30px;height:30px;border-radius:7px;
          background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);
          color:rgba(255,255,255,.4);text-decoration:none;transition:all .2s;
        }
        .social-btn:hover{background:${accent}1a;border-color:${accent}50;color:${accent};transform:translateY(-2px)}

        .chip {
          display:inline-flex;align-items:center;white-space:nowrap;
          padding:4px 13px;border-radius:99px;font-size:.63rem;font-weight:600;
          background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);
          color:rgba(255,255,255,.44);transition:all .18s;cursor:default;
        }
        .chip:hover{background:${accent}14;border-color:${accent}38;color:${accent}}

        .meta-card{
          display:flex;flex-direction:column;gap:4px;
          padding:10px 13px;border-radius:10px;
          background:rgba(255,255,255,.024);border:1px solid rgba(255,255,255,.055);
          transition:border-color .2s;overflow:hidden;
        }
        .meta-card:hover{border-color:${accent}30}

        .btn-primary{
          display:inline-flex;align-items:center;gap:6px;
          height:37px;padding:0 18px;border-radius:9px;
          font-size:.58rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;
          background:${accent};color:#000;text-decoration:none;transition:all .2s;
        }
        .btn-primary:hover{opacity:.82;transform:translateY(-1px)}

        .btn-ghost{
          display:inline-flex;align-items:center;gap:6px;
          height:37px;padding:0 15px;border-radius:9px;
          font-size:.58rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;
          background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.09);
          color:rgba(255,255,255,.5);text-decoration:none;transition:all .2s;
        }
        .btn-ghost:hover{border-color:${accent}40;color:${accent};transform:translateY(-1px)}

        .svc-card{
          padding:12px 14px;border-radius:11px;
          background:rgba(255,255,255,.022);border:1px solid rgba(255,255,255,.055);
          display:flex;flex-direction:column;gap:7px;transition:border-color .22s;
        }
        .svc-card:hover{border-color:${accent}30}

        .mq-wrap{overflow:hidden;position:relative}
        .mq-wrap::before,.mq-wrap::after{
          content:'';position:absolute;top:0;bottom:0;width:44px;z-index:2;pointer-events:none;
        }
        .mq-wrap::before{left:0;background:linear-gradient(90deg,#060606,transparent)}
        .mq-wrap::after {right:0;background:linear-gradient(-90deg,#060606,transparent)}
        .mq-track{display:flex;gap:8px;animation:marquee 22s linear infinite}

        .no-scrollbar{scrollbar-width:none}
        .no-scrollbar::-webkit-scrollbar{display:none}

        :root {
          --panel-px: clamp(1.5rem, 4vw, 3rem);
          --section-gap: clamp(1rem, 2.5vh, 1.6rem);
          --card-bg: rgba(255, 255, 255, 0.024);
          --card-border: rgba(255, 255, 255, 0.055);
        }
      `}</style>

      {/* ══════════════════════════════════════════
          DESKTOP  — 100dvh two-panel grid
      ══════════════════════════════════════════ */}
      <div
        className="hidden lg:grid"
        style={{ height: "100dvh", gridTemplateColumns: "37% 63%", position: "relative" }}
      >
        {/* Vertical rule between panels */}
        <div aria-hidden style={{
          position: "absolute", left: "37%", top: "12%", bottom: "12%",
          width: "1px", zIndex: 10, pointerEvents: "none",
          background: `linear-gradient(to bottom, transparent, ${accent}32 28%, ${accent}32 72%, transparent)`,
        }} />

        {/* ════ LEFT  ─ Photo panel ════ */}
        <div className="panel-l" style={{ position: "relative", overflow: "hidden" }}>
          <div className="grain-tex" aria-hidden />

          {/* Photo */}
          <img
            src={employee.photo} alt={employee.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
          />

          {/* Gradient overlays */}
          <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #060606 0%, rgba(6,6,6,.7) 32%, rgba(6,6,6,.18) 58%, transparent 78%)" }} />

          {/* Top accent line */}



          {/* ── Bottom identity ── */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.75rem 1.75rem 1.6rem" }}>
            <div aria-hidden style={{
              position: "absolute", right: "1.25rem", bottom: "1.1rem",
              fontSize: "7rem", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.06em",
              color: "rgba(255,255,255,.015)", userSelect: "none", fontVariantNumeric: "tabular-nums",
            }}>
              {String(employeeIndex).padStart(2, "0")}
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
              <h1 style={{ fontSize: "clamp(1.25rem, 2vw, 1.6rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1, color: "#fff", marginBottom: "3px" }}>
                {employee.name}
              </h1>
              <p style={{ fontSize: ".68rem", fontWeight: 700, color: accent, letterSpacing: ".025em", marginBottom: "1rem" }}>
                {employee.role}
              </p>
              <div style={{ height: "1px", background: `linear-gradient(90deg, ${accent}38, transparent)`, marginBottom: ".85rem" }} />
            </div>
          </div>
        </div>

        {/* ════ RIGHT  ─ Content panel ════ */}
        <div
          className="panel-r"
          style={{
            display: "flex", flexDirection: "column", height: "100dvh",
            position: "relative", overflow: "hidden",
            padding: "0", // Padding moved to internal containers
          }}
        >
          {/* Dot-grid background */}
          <div aria-hidden style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: `radial-gradient(rgba(255,255,255,.07) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
            maskImage: "radial-gradient(ellipse 90% 85% at 50% 50%, black, transparent)",
          }} />

          {/* ── Fixed Top Nav ── */}
          <div style={{ 
            padding: "2.5rem var(--panel-px) 1rem", 
            flexShrink: 0, position: "relative", zIndex: 10,
            background: "linear-gradient(to bottom, #060606 70%, transparent)"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: ".48rem", fontWeight: 700, color: "rgba(255,255,255,.25)", letterSpacing: ".13em", textTransform: "uppercase" }}>Active Status</span>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: accent, boxShadow: `0 0 8px ${accent}90` }} />
              </div>
            </div>
          </div>

          {/* ── Scrollable Content ── */}
          <div className="flex-1 overflow-y-auto no-scrollbar" style={{ position: "relative", zIndex: 1, padding: "0 var(--panel-px) 2rem" }}>
            
            {/* ── About ── */}
            <div style={{ marginBottom: "var(--section-gap)" }}>
              <RowLabel accent={accent} text="About" />
              <p style={{ fontSize: "clamp(.82rem, 1.05vw, .92rem)", lineHeight: 1.8, color: "rgba(255,255,255,.48)", maxWidth: "540px" }}>
                {employee.bio}
              </p>
            </div>

            <Stripe accent={accent} />

            {/* ── Info grid ── */}
            <div style={{ marginBottom: "var(--section-gap)" }}>
              <RowLabel accent={accent} text="Personal Details" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
                {meta.map(({ icon, label, value }) => (
                  <div key={label} className="meta-card" style={{ padding: "12px 14px" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: ".5rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".12em", color: accent, marginBottom: "4px" }}>
                      {icon}{label}
                    </span>
                    <span style={{ fontSize: ".82rem", fontWeight: 700, color: "rgba(255,255,255,.85)", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Stripe accent={accent} />

            {/* ── Skills ── */}
            <div style={{ marginBottom: "var(--section-gap)" }}>
              <RowLabel accent={accent} text="Technical Skills" />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {employee.skills.map((skill) => (
                  <div key={skill} className="chip" style={{ padding: "6px 14px", fontSize: ".68rem", background: "rgba(255,255,255,.025)" }}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Projects Done ── */}
            {employee.projects && employee.projects.length > 0 && (
              <>
                <Stripe accent={accent} />
                <div style={{ marginBottom: "var(--section-gap)" }}>
                  <RowLabel accent={accent} text="Projects Done" />
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {employee.projects.map((proj, idx) => (
                      <div key={idx} style={{ 
                        padding: "16px", borderRadius: "14px", 
                        background: "var(--card-bg)", border: "1px solid var(--card-border)",
                        display: "flex", gap: "16px", alignItems: "flex-start"
                      }}>
                        <div style={{ width: 36, height: 36, borderRadius: "10px", background: `${accent}12`, display: "flex", alignItems: "center", justifyContent: "center", color: accent, flexShrink: 0, border: `1px solid ${accent}20` }}>
                          <Layers size={16} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: ".82rem", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>{proj.title}</h4>
                          <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.4)", lineHeight: 1.5 }}>{proj.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <Stripe accent={accent} />

            {/* ── Experience ── */}
            <div style={{ marginBottom: "var(--section-gap)" }}>
              <RowLabel accent={accent} text="Professional Path" />
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {experience.map((exp, idx) => (
                  <div key={idx} style={{ 
                    padding: "14px 18px", borderRadius: "14px", 
                    background: "var(--card-bg)", border: "1px solid var(--card-border)",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    transition: "border-color 0.2s"
                  }} className="hover:border-[rgba(255,255,255,0.1)]">
                    <div>
                      <h4 style={{ fontSize: ".78rem", fontWeight: 700, color: "#fff", marginBottom: "3px" }}>{exp.role}</h4>
                      <p style={{ fontSize: ".68rem", color: "rgba(255,255,255,.45)" }}>{exp.company}</p>
                    </div>
                    <span style={{ fontSize: ".62rem", fontWeight: 700, color: accent, background: `${accent}12`, padding: "5px 12px", borderRadius: "20px", border: `1px solid ${accent}25` }}>
                      {exp.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Stripe accent={accent} />

            {/* ── Education & Certifications ── */}
            <div style={{ marginBottom: "var(--section-gap)" }}>
              <RowLabel accent={accent} text="Education" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {education.map((edu, idx) => (
                  <div key={idx} style={{ 
                    padding: "14px", borderRadius: "14px", 
                    background: "var(--card-bg)", border: "1px solid var(--card-border)",
                    display: "flex", gap: "14px", alignItems: "center"
                  }}>
                    <div style={{ width: 36, height: 36, borderRadius: "10px", background: `${accent}12`, display: "flex", alignItems: "center", justifyContent: "center", color: accent, flexShrink: 0, border: `1px solid ${accent}20` }}>
                      {idx === 0 ? <BookOpen size={16} /> : <Award size={16} />}
                    </div>
                    <div>
                      <h4 style={{ fontSize: ".75rem", fontWeight: 700, color: "#fff", marginBottom: "3px", lineHeight: 1.2 }}>{edu.degree}</h4>
                      <p style={{ fontSize: ".65rem", color: "rgba(255,255,255,.4)" }}>{edu.institution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Services (optional) ── */}
            {services.length > 0 && (
              <>
                <Stripe accent={accent} />
                <div style={{ marginBottom: "var(--section-gap)" }}>
                  <RowLabel accent={accent} text="Expertise" />
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "10px" }}>
                    {services.map((svc) => (
                      <div key={svc.title} className="svc-card" style={{ padding: "14px" }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${accent}15`, border: `1px solid ${accent}25`, display: "flex", alignItems: "center", justifyContent: "center", color: accent, marginBottom: "4px" }}>
                          {svc.icon}
                        </div>
                        <div>
                          <p style={{ fontSize: ".75rem", fontWeight: 700, color: "#fff", marginBottom: "2px" }}>{svc.title}</p>
                          {svc.description && <p style={{ fontSize: ".65rem", color: "rgba(255,255,255,.35)", lineHeight: 1.5 }}>{svc.description}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* ── Fixed Bottom Bar ── */}
          <div style={{ 
            padding: "1.2rem var(--panel-px) 2.2rem",
            background: "linear-gradient(to top, #060606 80%, transparent)",
            position: "relative", zIndex: 10, flexShrink: 0
          }}>
            <div style={{ height: "1px", background: `linear-gradient(90deg, ${accent}30, rgba(255,255,255,.05) 60%, transparent)`, marginBottom: "1.5rem" }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: "10px" }}>
                <a href={`mailto:${employee.email}`} className="btn-primary" style={{ padding: "0 22px" }}>
                  <Mail size={12} /> Get in Touch
                </a>
                <Link href="/about" className="btn-ghost" style={{ padding: "0 14px" }}>
                  <ArrowLeft size={12} /> Team
                </Link>
                {(emp.cvUrl as string) && (
                  <a href={emp.cvUrl as string} download className="btn-ghost" style={{ padding: "0 14px" }}>
                    <Download size={12} />
                  </a>
                )}
              </div>

              {socials.length > 0 && (
                <div style={{ display: "flex", gap: "8px" }}>
                  {socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="social-btn" style={{ width: "34px", height: "34px" }}>
                      {s.icon}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


      {/* ══════════════════════════════════════════
          MOBILE  — stacked scrollable
      ══════════════════════════════════════════ */}
      <div
        className="lg:hidden no-scrollbar"
        style={{ position: "fixed", inset: 0, zIndex: 50, overflowY: "auto", background: "#060606" }}
      >
        <div className="grain-tex" aria-hidden />

        {/* Hero */}
        <div style={{ position: "relative", height: "44dvh", overflow: "hidden" }}>
          <img src={employee.photo} alt={employee.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
          <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #060606 0%, rgba(6,6,6,.45) 50%, transparent 82%)" }} />

            <div style={{ position: "absolute", top: "1.25rem", left: "1.25rem", right: "1.25rem", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
              <Link href="/about" className="btn-ghost" style={{ height: "28px", padding: "0 11px", fontSize: ".52rem" }}>
                <ArrowLeft size={10} /> Back
              </Link>
            </div>
        </div>

        {/* Identity */}
        <div style={{ padding: "1.25rem 1.25rem 0", textAlign: "center", position: "relative" }}>
          <h1 style={{ fontSize: "1.65rem", fontWeight: 900, letterSpacing: "-0.03em", color: "#fff", marginBottom: "3px" }}>{employee.name}</h1>
          <p style={{ fontSize: ".72rem", fontWeight: 700, color: accent, marginBottom: ".9rem" }}>{employee.role}</p>
          <div style={{ height: "1px", background: `linear-gradient(90deg, transparent, ${accent}35, transparent)`, marginBottom: ".9rem" }} />
          {socials.length > 0 && (
            <div style={{ display: "flex", justifyContent: "center", gap: "7px", marginBottom: "1rem", flexWrap: "wrap" }}>
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="social-btn">
                  {s.icon}
                </a>
              ))}
            </div>
          )}
          <div style={{ display: "flex", gap: "7px", justifyContent: "center", marginBottom: "1.75rem" }}>
            <a href={`mailto:${employee.email}`} className="btn-primary" style={{ height: "36px" }}>
              <Mail size={11} /> Contact
            </a>
            {(emp.cvUrl as string) && (
              <a href={emp.cvUrl as string} download className="btn-ghost" style={{ height: "36px" }}>
                <Download size={11} /> CV
              </a>
            )}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "0 1.25rem 4rem" }}>
          <section style={{ marginBottom: "1.5rem" }}>
            <RowLabel accent={accent} text="About" />
            <p style={{ fontSize: ".85rem", lineHeight: 1.82, color: "rgba(255,255,255,.46)" }}>{employee.bio}</p>
          </section>
          <Stripe accent={accent} />
          <section style={{ marginBottom: "1.5rem" }}>
            <RowLabel accent={accent} text="Info" />
            <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
              {meta.map(({ icon, label, value }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 12px", borderRadius: "9px", background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.055)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: ".52rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".1em", color: accent }}>{icon}{label}</span>
                  <span style={{ fontSize: ".78rem", fontWeight: 600, color: "rgba(255,255,255,.72)" }}>{value}</span>
                </div>
              ))}
            </div>
          </section>
          <Stripe accent={accent} />
          <section style={{ marginBottom: "1.5rem" }}>
            <RowLabel accent={accent} text="Technical Skills" />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
              {employee.skills.map((skill) => (
                <div key={skill} className="chip" style={{ background: "rgba(255,255,255,.025)" }}>{skill}</div>
              ))}
            </div>
          </section>
          {employee.projects && employee.projects.length > 0 && (
            <>
              <Stripe accent={accent} />
              <section style={{ marginBottom: "1.5rem" }}>
                <RowLabel accent={accent} text="Projects Done" />
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {employee.projects.map((proj, idx) => (
                    <div key={idx} style={{ padding: "14px", borderRadius: "12px", background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.05)", display: "flex", gap: "12px" }}>
                      <div style={{ width: 32, height: 32, borderRadius: "8px", background: `${accent}15`, display: "flex", alignItems: "center", justifyContent: "center", color: accent, flexShrink: 0 }}>
                        <Layers size={14} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: ".78rem", fontWeight: 700, color: "#fff", marginBottom: "2px" }}>{proj.title}</h4>
                        <p style={{ fontSize: ".68rem", color: "rgba(255,255,255,.4)", lineHeight: 1.5 }}>{proj.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

/* ── Shared sub-components ── */

function RowLabel({ accent, text }: { accent: string; text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
      <div style={{ width: "3px", height: "13px", borderRadius: "2px", background: accent, flexShrink: 0 }} />
      <span style={{ fontSize: ".49rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".17em", color: "rgba(255,255,255,.3)" }}>
        {text}
      </span>
    </div>
  );
}

function Stripe({ accent }: { accent: string }) {
  return (
    <div style={{
      height: "1px",
      background: `linear-gradient(90deg, ${accent}15, rgba(255,255,255,.02) 50%, transparent)`,
      margin: "0 0 var(--section-gap)",
    }} />
  );
}