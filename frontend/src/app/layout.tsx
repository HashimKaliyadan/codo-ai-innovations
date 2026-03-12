

import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ReactLenis } from "lenis/react";
import { FloatingLinesController } from "@/components/FloatingLinesController";
import FloatingLinesLayer from "@/components/FloatingLinesLayer";
import OfflineBanner from "@/components/OfflineBanner";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CODO AI Innovations | Premium AI Academy & Agency",
  description: "CODO AI Innovations is a leading AI Academy and Agency focused on empowering future innovators and building cutting-edge technical solutions.",
  keywords: ["AI", "Academy", "Agency", "Innovations", "Tech Education", "Software Development"],
  openGraph: {
    title: "CODO AI Innovations",
    description: "Premium Digital Academy & Agency building the future of AI.",
    url: "https://codoacademy.com",
    siteName: "CODO AI Innovations",
    type: "website",
  },
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#008764" />
        {/* Law 1: Zero flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('codo-theme');
                  var preferred = window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? 'dark' : 'light';
                  var theme = (saved === 'dark' || saved === 'light') ? saved : preferred;
                  document.documentElement.classList.add(theme);
                } catch(e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${dmSans.className} antialiased no-js-transition`}>
        <ReactLenis root>
          <ThemeProvider>
            <FloatingLinesController>
              <FloatingLinesLayer />
              <div style={{ position: "relative", zIndex: 1 }}>
                <Navbar />
                <OfflineBanner />
                {children}
              </div>
            </FloatingLinesController>
          </ThemeProvider>
        </ReactLenis>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(err => {
                    console.error('Service worker registration failed', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
