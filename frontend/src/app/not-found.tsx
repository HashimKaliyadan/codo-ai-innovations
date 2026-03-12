

"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useTheme } from "@/components/ThemeProvider";

const FloatingLines = dynamic(() => import("@/components/FloatingLines"), {
  ssr: false,
});

export default function NotFound() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <main className="relative min-h-[100dvh] flex flex-col items-center justify-center w-full overflow-hidden">

      <div className="absolute inset-0 z-0">
        <FloatingLines
          backgroundColor={isDark ? "#0A0A0B" : "#F0F3FF"}
          bendStrength={-0.2}
          interactive={false}
        />
      </div>

      <div className="relative z-10 text-center px-6">
        <div 
          className="backdrop-blur-2xl p-12 rounded-2xl shadow-2xl border border-[var(--glass-border)]"
          style={{ background: "var(--glass-bg)" }}
        >
          <h1 
            className="text-8xl sm:text-9xl font-black mb-4 tracking-tighter"
            style={{ color: "var(--text-primary)" }}
          >
            40<span style={{ color: "var(--brand-green)" }}>4</span>
          </h1>
          <h2 
            className="text-2xl sm:text-3xl font-bold mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Lost in the Code?
          </h2>
          <p 
            className="text-lg max-w-md mx-auto mb-10"
            style={{ color: "var(--text-secondary)" }}
          >
            The page you are looking for has been moved, deleted, or never existed in our academy.
          </p>
          
          <Link
            href="/"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center px-10 py-4 rounded-2xl font-bold uppercase tracking-wider text-sm hover:scale-105 transition-all duration-300 cursor-pointer backdrop-blur-xl"
            style={{
              background: "var(--cta-bg)",
              border: "1px solid var(--cta-border)",
              color: isDark ? "white" : "var(--text-primary)",
            }}
          >
            Back to Reality
          </Link>
        </div>
      </div>

    </main>
  );
}
