"use client";

import React, { createContext, useContext, useState } from "react";

interface FloatingLinesContextType {
  opacity: number;
  setOpacity: (value: number) => void;
}

const FloatingLinesContext = createContext<FloatingLinesContextType>({
  opacity: 1,
  setOpacity: () => {},
});

export function useFloatingLines() {
  return useContext(FloatingLinesContext);
}

export function FloatingLinesController({ children }: { children: React.ReactNode }) {
  const [opacity, setOpacity] = useState(1);

  return (
    <FloatingLinesContext.Provider value={{ opacity, setOpacity }}>
      {children}
    </FloatingLinesContext.Provider>
  );
}
