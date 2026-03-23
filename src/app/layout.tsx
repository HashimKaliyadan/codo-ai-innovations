import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Codo AI Innovations",
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
      <body
        className={`${dmSans.variable} font-sans antialiased`}
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
