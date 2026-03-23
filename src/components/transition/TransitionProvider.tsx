"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

type TransitionPhase = "idle" | "covering" | "waiting" | "revealing";

type TransitionContextType = {
  phase: TransitionPhase;
  navigateTo: (href: string) => void;
  onPageReady: () => void;           // called by template.tsx when the new page mounts
};

const TransitionContext = createContext<TransitionContextType | undefined>(
  undefined
);

export function useTransitionParams() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error(
      "useTransitionParams must be used within a TransitionProvider"
    );
  }
  return context;
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const router = useRouter();

  /* ── Step 1: user clicks a link ── */
  const navigateTo = useCallback(
    (href: string) => {
      if (phase !== "idle") return;

      // overlay slides in (covers the screen)
      setPhase("covering");

      // after the overlay fully covers the viewport, push the route
      setTimeout(() => {
        router.push(href);
        setPhase("waiting"); // now we wait for the new page to mount
      }, 600);
    },
    [phase, router]
  );

  /* ── Step 2: new page has mounted (called from template.tsx) ── */
  const onPageReady = useCallback(() => {
    if (phase !== "waiting") return;

    // small extra delay so the page can paint its first frame
    setTimeout(() => {
      setPhase("revealing"); // overlay slides away

      // after the reveal animation is done, go back to idle
      setTimeout(() => {
        setPhase("idle");
      }, 600);
    }, 100);
  }, [phase]);

  return (
    <TransitionContext.Provider value={{ phase, navigateTo, onPageReady }}>
      {children}
    </TransitionContext.Provider>
  );
}
