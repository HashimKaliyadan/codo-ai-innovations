"use client";

import { motion } from "framer-motion";
import { Linkedin, Twitter, Github, Mail, MapPin, Phone, ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem) 2rem",
        background: "var(--bg-primary)",
        borderTop: "1px solid var(--glass-border)",
        fontFamily: "'DM Sans', sans-serif",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand */}
          <div>
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                color: "#ffffff",
                marginBottom: "1.5rem",
              }}
            >
              CODO <span style={{ color: "var(--brand-green)" }}>AI</span>
            </div>
            <p
              style={{
                color: "var(--text-secondary)",
                lineHeight: 1.8,
                fontSize: "0.9rem",
                marginBottom: "2rem",
              }}
            >
              Pioneering the intersection of elite software engineering and strategic AI integration.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Linkedin size={20} />, href: "#" },
                { icon: <Twitter size={20} />, href: "#" },
                { icon: <Github size={20} />, href: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:border-brand-green hover:text-brand-green transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 style={{ color: "#ffffff", fontWeight: 700, marginBottom: "1.75rem", fontSize: "1rem" }}>Agency</h4>
            <ul className="space-y-4">
              {["Expertise", "Ecosystem", "Services", "Portfolio", "Our Team"].map((link, i) => (
                <li key={i}>
                  <a href={`#${link.toLowerCase()}`} className="text-white/50 hover:text-brand-green transition-colors text-sm font-medium uppercase tracking-widest">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 style={{ color: "#ffffff", fontWeight: 700, marginBottom: "1.75rem", fontSize: "1rem" }}>Get in Touch</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-green mt-1 flex-shrink-0" />
                <span className="text-white/50 text-sm leading-relaxed">
                  Tech Park, Block B,<br />
                  Kerala, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-green flex-shrink-0" />
                <span className="text-white/50 text-sm font-medium tracking-widest">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-green flex-shrink-0" />
                <span className="text-white/50 text-sm font-medium tracking-widest">HELLO@CODO.AI</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter/Note */}
          <div>
            <h4 style={{ color: "#ffffff", fontWeight: 700, marginBottom: "1.75rem", fontSize: "1rem" }}>Innovation Weekly</h4>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              Join 500+ leaders receiving our curated insights on AI and high-end engineering.
            </p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-xs font-bold tracking-widest text-white focus:border-brand-green outline-none transition-all placeholder:text-white/20"
              />
              <button className="absolute right-2 top-1.5 bottom-1.5 px-4 bg-brand-green rounded-lg text-white hover:opacity-90 transition-opacity">
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="flex flex-col md:flex-row justify-between items-center gap-6"
          style={{
            paddingTop: "2.5rem",
            borderTop: "1px solid var(--glass-border)",
          }}
        >
          <div style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            © {currentYear} CODO AI INNOVATIONS. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-8">
            {["Privacy Policy", "Terms of Service"].map((link, i) => (
              <a key={i} href="#" style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }} className="hover:text-brand-green transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
