"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

// ─── Data ──────────────────────────────────────────────────────────────────────

const CONTACT_DETAILS = [
  {
    icon: Mail,
    label: "Email us at",
    value: "info@codoai.in",
    href: "mailto:info@codoai.in",
  },
  {
    icon: Phone,
    label: "Call our office",
    value: "+91 8848676627",
    href: "tel:+918848676627",
  },
  {
    icon: MapPin,
    label: "Visit us",
    value: "2nd Floor, Paravath Arcade, Varangode, Malappuram, Kerala 676519",
  },
];

// ─── ContactMethod ────────────────────────────────────────────────────────────

function ContactMethod({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-start gap-4 group">
      <div
        className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-105"
        style={{
          background: "rgba(0,182,99,0.08)",
          border: "1px solid rgba(0,182,99,0.14)",
        }}
      >
        <Icon size={15} style={{ color: "#00B663" }} />
      </div>
      <div className="min-w-0">
        <p
          className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          {label}
        </p>
        <p
          className="text-sm font-medium leading-snug transition-colors duration-200 group-hover:text-white"
          style={{ color: "rgba(255,255,255,0.72)", wordBreak: "break-word" }}
        >
          {value}
        </p>
      </div>
    </div>
  );
  return href ? <a href={href} className="block no-underline">{inner}</a> : <div>{inner}</div>;
}

// ─── LazyMap ──────────────────────────────────────────────────────────────────

function LazyMap() {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setLoaded(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full h-full relative">
      {!loaded && (
        <div
          className="absolute inset-0"
          style={{
            background: "rgba(255,255,255,0.03)",
            backgroundImage:
              "linear-gradient(90deg, transparent 0%, rgba(0,182,99,0.06) 50%, transparent 100%)",
            backgroundSize: "200% 100%",
            animation: "codo-shimmer 1.5s linear infinite",
          }}
        />
      )}

      {loaded && (
        <>
          <iframe
            title="Codo Academy Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5!2d76.0745!3d11.0610!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAzJzM5LjYiTiA3NsKwMDQnMjguMiJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin&q=Paravath+Arcade,+Varangode,+Malappuram,+Kerala+676519"
            width="100%"
            height="100%"
            style={{
              border: 0,
              filter: "invert(90%) hue-rotate(180deg) saturate(0.45)",
              display: "block",
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: "inset 0 0 40px rgba(0,0,0,0.5)" }}
          />
          <a
            href="https://maps.google.com/?q=Paravath+Arcade,Varangode,Malappuram,Kerala+676519"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "rgba(8,10,14,0.88)",
              border: "1px solid rgba(0,182,99,0.35)",
              color: "#00B663",
              backdropFilter: "blur(12px)",
            }}
          >
            <MapPin size={10} /> Open in Maps
          </a>
        </>
      )}
    </div>
  );
}

// ─── Contact Page ─────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <>
      {/* Global CSS for animations */}
      <style>{`
        @keyframes codo-shimmer { to { background-position: 200% center; } }
        @keyframes codo-wave {
          0%, 100% { height: 4px; }
          50%       { height: 14px; }
        }
      `}</style>


      <main
        className="min-h-[100dvh] pt-28 pb-24 relative font-sans overflow-hidden"
        style={{ background: "transparent", color: "var(--text-primary)" }}
      >
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute -top-48 -right-24 w-[700px] h-[700px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,182,99,0.09) 0%, transparent 65%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="absolute -bottom-24 -left-48 w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,32,63,0.45) 0%, transparent 65%)",
              filter: "blur(60px)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,182,99,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,182,99,0.035) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          
          {/* Header Section */}
          <section className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <motion.h1
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0 }}
              className="font-bold leading-[0.93] tracking-tight text-[clamp(36px,7vw,80px)]"
            >
              Let&apos;s build something
            </motion.h1>

            {/* Box 3: Availability Badge moved to Header */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0 }}
              className="rounded-[22px] border px-5 py-4 flex items-center gap-4 w-fit"
              style={{
                background: "rgba(0,182,99,0.045)",
                borderColor: "rgba(0,182,99,0.18)",
              }}
            >
              <div className="relative flex-shrink-0">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#00B663" }} />
                <div
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{ background: "rgba(0,182,99,0.45)" }}
                />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: "#00B663" }}>
                  Available for Projects
                </p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                  Replies within 24 h · IST timezone
                </p>
              </div>
            </motion.div>
          </section>

          {/* Core Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Sidebar */}
            <aside className="lg:col-span-4 flex flex-col gap-5">
              
              {/* Box 1: Contact Details */}
              <motion.div
                initial={{ opacity: 1, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0 }}
                className="rounded-[22px] border p-7"
                style={{
                  background: "var(--glass-bg)",
                  borderColor: "var(--glass-border)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
              >
                <h3
                  className="text-[10px] font-bold uppercase tracking-[0.25em] mb-7"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  Contact Details
                </h3>
                <div className="space-y-6">
                  {CONTACT_DETAILS.map((item, i) => (
                    <ContactMethod key={i} {...item} />
                  ))}
                </div>

                <div className="mt-7 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <h4
                    className="text-[10px] font-bold uppercase tracking-[0.25em] mb-4"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    Business Hours
                  </h4>
                  {[
                    { day: "Mon – Sat", hours: "9:00 AM – 6:00 PM" },
                  ].map(({ day, hours }) => (
                    <div key={day} className="flex justify-between items-center py-1.5">
                      <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{day}</span>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: "rgba(255,255,255,0.8)" }}
                      >
                        {hours}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Box 2: Lazy Map */}
              <motion.div
                initial={{ opacity: 1, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0 }}
                className="rounded-[22px] border overflow-hidden relative"
                style={{
                  height: 200,
                  borderColor: "var(--glass-border)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
                }}
              >
                <LazyMap />
              </motion.div>


            </aside>

            {/* Right Side: The Contact Form Component */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0 }}
              className="lg:col-span-8"
            >
              <ContactForm />
            </motion.div>

          </div>
        </div>
      </main>
    </>
  );
}