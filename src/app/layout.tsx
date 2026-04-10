import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CODO AI Innovations",
  description: "Transforming businesses through innovative AI solutions.",
};

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FloatingLinesController } from "@/components/FloatingLinesController";
import FloatingLinesLayer from "@/components/FloatingLinesLayer";
import { TransitionProvider } from "@/components/transition/TransitionProvider";
import { TransitionOverlay } from "@/components/transition/TransitionOverlay";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${dmSans.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <TransitionProvider>
          <TransitionOverlay />
          <FloatingLinesController>
            <FloatingLinesLayer />
            <Navbar />
            {children}
            <Footer />
          </FloatingLinesController>
        </TransitionProvider>
      </body>
    </html>
  );
}
