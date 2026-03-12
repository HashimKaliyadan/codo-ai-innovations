"use client";

import { useState, useEffect } from "react";

export default function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    function handleOnline() { setIsOffline(false); }
    function handleOffline() { setIsOffline(true); }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    if (!navigator.onLine) {
      setIsOffline(true);
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[200] p-4 flex justify-center pointer-events-none">
      <div className="bg-[var(--bg-secondary)] border border-[var(--glass-border)] px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-xl pointer-events-auto">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-sm font-bold text-[var(--text-primary)]">You are offline. Please check your connection.</span>
      </div>
    </div>
  );
}
