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
        <FloatingLinesController>
          <FloatingLinesLayer />
          <Navbar />
          {children}
          <Footer />
        </FloatingLinesController>
      </body>
    </html>
  );
}
