"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Linkedin, Twitter, Mail } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: {
    linkedin: string;
    twitter: string;
    mail: string;
  };
}

// ── Team data ─────────────────────────────────────────────────────────────────
const team: TeamMember[] = [
  {
    name: "Mohammed Rashid",
    role: "Founder & CEO",
    bio: "Visionary behind CODO AI Innovations. Leads strategy, product direction, and the mission to make technology accessible and impactful for businesses worldwide.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
    socials: { linkedin: "https://linkedin.com", twitter: "https://twitter.com", mail: "mailto:hello@codo.ai" },
  },
  {
    name: "Arjun Menon",
    role: "Lead Engineer",
    bio: "Full-stack architect with deep expertise in Next.js, cloud infrastructure, and AI integration. Leads technical delivery across all agency projects.",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop",
    socials: { linkedin: "#", twitter: "#", mail: "#" },
  },
  {
    name: "Sneha Pillai",
    role: "UI/UX Design Director",
    bio: "Award-winning designer focused on creating intuitive, premium digital experiences that bridge engineering precision with human-centered design.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
    socials: { linkedin: "#", twitter: "#", mail: "#" },
  },
  {
    name: "Faisal Rahman",
    role: "AI Engineer",
    bio: "Specializes in LLM integration, workflow automation, and building intelligent systems that turn AI from a buzzword into a real business advantage.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    socials: { linkedin: "#", twitter: "#", mail: "#" },
  },
];

// ── Social icon link ──────────────────────────────────────────────────────────
function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-colors duration-200"
      style={{
        color: "color-mix(in srgb, var(--text-primary) 70%, transparent)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "44px",
        minHeight: "44px",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "color-mix(in srgb, var(--text-primary) 70%, transparent)")}
    >
      {children}
    </a>
  );
}

// ── Desktop card ──────────────────────────────────────────────────────────────
function DesktopCard({
  member,
  index,
  inView,
}: {
  member: TeamMember;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      className="group no-transition"
      transition={{
        duration: 0.65,
        ease: [0.25, 0.1, 0.25, 1],
        delay: index * 0.1,
      }}
    >
      {/* ── Photo card ── */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "24px",
          marginBottom: "1.5rem",
          aspectRatio: "4 / 5",
          background: "var(--glass-bg)",
          border: "1px solid var(--glass-border)",
        }}
      >
        {/* Photo — grayscale by default, full color on hover */}
        <img
          src={member.image}
          alt={`${member.name}, ${member.role} at CODO Agency`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.5s ease, filter 0.5s ease",
          }}
          className="filter grayscale group-hover:grayscale-0 group-hover:scale-105"
        />

        {/* Social links overlay — slides up from bottom on hover */}
        <div
          style={{
            position: "absolute",
            inset: "0 0 0 0",
            bottom: 0,
            left: 0,
            right: 0,
            background: "linear-gradient(to top, var(--bg-secondary) 0%, color-mix(in srgb, var(--bg-secondary) 50%, transparent) 50%, transparent 100%)",
            padding: "1.5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            gap: "0.25rem",
            transition: "transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
          className="translate-y-full group-hover:translate-y-0"
        >
          <SocialLink href={member.socials.linkedin} label={`${member.name} on LinkedIn`}>
            <Linkedin size={20} />
          </SocialLink>
          <SocialLink href={member.socials.twitter} label={`${member.name} on Twitter`}>
            <Twitter size={20} />
          </SocialLink>
          <SocialLink href={member.socials.mail} label={`Email ${member.name}`}>
            <Mail size={20} />
          </SocialLink>
        </div>
      </div>

      {/* ── Info below card ── */}
      <div style={{ textAlign: "center", padding: "0 0.25rem" }}>
        <h4
          style={{
            fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
            fontWeight: 900,
            color: "var(--text-primary)",
            letterSpacing: "-0.01em",
            marginBottom: "0.3rem",
            lineHeight: 1.2,
          }}
        >
          {member.name}
        </h4>
        <p
          style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            color: "var(--brand-green)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "0.85rem",
          }}
        >
          {member.role}
        </p>
        <p
          style={{
            fontSize: "0.875rem",
            lineHeight: 1.72,
            color: "var(--text-secondary)",
            fontWeight: 400,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {member.bio}
        </p>
      </div>
    </motion.div>
  );
}

// ── Mobile card (carousel item) ───────────────────────────────────────────────
function MobileCard({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="no-transition"
      transition={{
        duration: 0.55,
        ease: [0.25, 0.1, 0.25, 1],
        delay: index * 0.08,
      }}
      style={{
        flexShrink: 0,
        width: "72vw",
        scrollSnapAlign: "center",
      }}
    >
      {/* Square photo */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "16px",
          aspectRatio: "1 / 1",
          background: "var(--glass-bg)",
          border: "1px solid var(--glass-border)",
          marginBottom: "0.75rem",
        }}
      >
        <img
          src={member.image}
          alt={`${member.name}, ${member.role}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            filter: "grayscale(30%)",
          }}
        />

        {/* Socials always visible on mobile */}
        <div
          style={{
            position: "absolute",
            inset: "0 0 0 0",
            bottom: 0,
            left: 0,
            right: 0,
            background: "linear-gradient(to top, var(--bg-secondary) 0%, transparent 60%)",
            padding: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            gap: "0.25rem",
          }}
        >
          <SocialLink href={member.socials.linkedin} label={`${member.name} on LinkedIn`}>
            <Linkedin size={18} />
          </SocialLink>
          <SocialLink href={member.socials.twitter} label={`${member.name} on Twitter`}>
            <Twitter size={18} />
          </SocialLink>
          <SocialLink href={member.socials.mail} label={`Email ${member.name}`}>
            <Mail size={18} />
          </SocialLink>
        </div>
      </div>

      {/* Name + role */}
      <div style={{ textAlign: "center" }}>
        <h4
          style={{
            fontSize: "1rem",
            fontWeight: 900,
            color: "var(--text-primary)",
            letterSpacing: "-0.01em",
            marginBottom: "0.2rem",
          }}
        >
          {member.name}
        </h4>
        <p
          style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            color: "var(--brand-green)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {member.role}
        </p>
      </div>
    </motion.div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function TeamSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-8% 0px" });

  return (
    <>
      {/* Scrollbar hide utility for mobile carousel */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <section
        ref={sectionRef}
        aria-label="CODO Agency Team"
        style={{
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
          padding: "clamp(5rem, 10vw, 9rem) 0",
          fontFamily: "'DM Sans', sans-serif",
          background:
            "linear-gradient(to bottom, transparent 0%, var(--bg-primary) 6%, var(--bg-primary) 94%, transparent 100%)",
        }}
      >

        {/* ── Subtle bg glows ─────────────────────────────────────────────── */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0,
          zIndex: 0, pointerEvents: "none", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: "0%", left: "50%",
            transform: "translateX(-50%)",
            width: "700px", height: "400px",
            background: "radial-gradient(ellipse, rgba(0,135,100,0.06) 0%, transparent 70%)",
            filter: "blur(60px)",
          }} />
        </div>

        {/* ── Inner container ─────────────────────────────────────────────── */}
        <div
          className="max-w-7xl mx-auto relative z-10"
          style={{ padding: "0 clamp(1.5rem, 6vw, 6rem)" }}
        >

          {/* ── SECTION HEADER ───────────────────────────────────────────── */}
          <div
            style={{
              textAlign: "center",
              maxWidth: "680px",
              margin: "0 auto clamp(3rem, 6vw, 5rem)",
            }}
          >
            {/* Eyebrow */}
            <motion.p
              className="no-transition"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--brand-green)",
                marginBottom: "1rem",
              }}
            >
              05 — Our Agency Team
            </motion.p>

            {/* Headline */}
            <motion.h2
              className="no-transition"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
              style={{
                fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
                fontWeight: 900,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                color: "var(--text-primary)",
                marginBottom: "1.25rem",
              }}
            >
              The Minds Behind
              <br />
              <span style={{ color: "var(--brand-green)" }}>the Magic.</span>
            </motion.h2>

            {/* Subtext */}
            <motion.p
              className="no-transition"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
              style={{
                fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)",
                lineHeight: 1.8,
                color: "var(--text-secondary)",
                fontWeight: 400,
              }}
            >
              A collective of elite engineers, designers, and strategists
              dedicated to delivering AI-powered digital excellence.
            </motion.p>
          </div>

          {/* ── MOBILE: Horizontal Swipe Carousel ───────────────────────── */}
          <div
            className="md:hidden"
            style={{ margin: "0 -1.5rem", padding: "0 1.5rem" }}
          >
            <div
              className="scrollbar-hide"
              style={{
                display: "flex",
                gap: "1rem",
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                paddingBottom: "1rem",
                WebkitOverflowScrolling: "touch",
              } as React.CSSProperties}
            >
              {team.map((member, i) => (
                <MobileCard key={i} member={member} index={i} />
              ))}
            </div>
          </div>

          {/* ── DESKTOP: 4-Column Grid ───────────────────────────────────── */}
          <div
            className="hidden md:grid md:grid-cols-2 lg:grid-cols-4"
            style={{ gap: "clamp(1.5rem, 2.5vw, 2.5rem)" }}
          >
            {team.map((member, i) => (
              <DesktopCard
                key={i}
                member={member}
                index={i}
                inView={inView}
              />
            ))}
          </div>

          {/* ── BOTTOM DIVIDER ────────────────────────────────────────────── */}
          <motion.div
            className="no-transition"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={inView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.6 }}
            style={{
              height: "1px",
              background:
                "linear-gradient(to right, transparent, var(--glass-border), transparent)",
              transformOrigin: "center",
              marginTop: "clamp(3rem, 6vw, 5rem)",
            }}
            aria-hidden="true"
          />

          {/* ── BOTTOM TAGLINE ────────────────────────────────────────────── */}
          <motion.p
            className="no-transition"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.8 }}
            style={{
              textAlign: "center",
              marginTop: "2rem",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--text-secondary)",
              opacity: 0.35,
            }}
          >
            Built in India · Delivering Globally
          </motion.p>

        </div>
      </section>
    </>
  );
}
