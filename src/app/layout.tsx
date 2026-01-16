import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Drift | Flux Nine Labs",
  description: "Monitor week-over-week changes in PSI, CrUX, on-page SEO, and CTAs. Real-data drift tracking with actionable deltas.",
  metadataBase: new URL("https://drift.fluxninelabs.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/brand/logo.jpg",
  },
  openGraph: {
    title: "Project Drift | Flux Nine Labs",
    description: "Real-data drift tracking for performance, SEO, and CTA changes.",
    url: "https://drift.fluxninelabs.com",
    siteName: "Flux Nine Labs",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Drift | Flux Nine Labs",
    description: "Real-data drift tracking for PSI, CrUX, and on-page changes.",
  },
};

export default function DriftLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body className="antialiased font-sans bg-[#02040a] min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
