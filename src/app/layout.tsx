import "./globals.css";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import CursorGlow from "@/components/layout/CursorGlow";
import CommandPalette from "@/components/layout/CommandPalette";
import Preloader from "@/components/layout/Preloader";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { siteUrl, seo, personJsonLd } from "@/lib/site";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-jb" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: seo.title, template: `%s | ${seo.shortTitle}` },
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: "Ayesha Siddiqa", url: siteUrl }],
  creator: "Ayesha Siddiqa",
  applicationName: "Ayesha Siddiqa Portfolio",
  category: "technology",
  // One English site for every country; x-default tells search engines it serves all regions
  alternates: { canonical: "/", languages: { en: "/", "x-default": "/" } },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: "Ayesha Siddiqa · Portfolio",
    title: seo.title,
    description: seo.description,
    locale: "en_US",
    firstName: "Ayesha",
    lastName: "Siddiqa",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false },
  // Search Console / Bing Webmaster verification codes (set in .env.local or Vercel)
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#07060b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${mono.variable}`}>
      <body className="bg-background text-foreground antialiased min-h-screen flex flex-col selection:bg-primary selection:text-white relative">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()).replace(/</g, "\\u003c") }}
        />
        {/* Fixed Background Layer */}
        <div className="fixed inset-0 z-[-1] bg-background overflow-hidden">
          <div className="absolute -top-40 -left-20 w-[32rem] h-[32rem] bg-violet-600 rounded-full filter blur-[140px] opacity-25 animate-blob"></div>
          <div className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] bg-blue-600 rounded-full filter blur-[140px] opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-40 left-1/4 w-[30rem] h-[30rem] bg-pink-600 rounded-full filter blur-[150px] opacity-15 animate-blob animation-delay-4000"></div>
          <div className="absolute inset-0 noise opacity-[0.035] mix-blend-overlay"></div>
        </div>
        {/* Grid only behind the hero; it scrolls away so later sections stay clean */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-screen z-[-1] bg-grid"></div>
        <CursorGlow />
        <CommandPalette />
        <Preloader />

        <Navbar />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
