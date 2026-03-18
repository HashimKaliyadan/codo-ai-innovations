"use client";

import dynamic from "next/dynamic";

const FloatingLines = dynamic(() => import("./FloatingLines"), {
  ssr: false,
  loading: () => null,
});

export default FloatingLines;
