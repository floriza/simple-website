import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/layout/GoogleAnalytics";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "[Candidate Name] for Student Council President",
    template: "%s | [Candidate Name] Campaign",
  },
  description:
    "Vote for [Candidate Name] for Student Council President. Leading with purpose, serving with integrity. Discover our platform for student welfare, academic excellence, and campus improvement.",
  keywords: [
    "student council",
    "student election",
    "student president",
    "campus leadership",
    "student government",
  ],
  authors: [{ name: "[Candidate Name]" }],
  creator: "[Candidate Name] Campaign",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "[Candidate Name] Campaign",
    title: "[Candidate Name] for Student Council President",
    description:
      "Leading with purpose, serving with integrity. Vote [Candidate Name] for Student Council President.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "[Candidate Name] Campaign",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "[Candidate Name] for Student Council President",
    description: "Leading with purpose, serving with integrity.",
    images: ["/og-image.jpg"],
    creator: "@candidatehandle",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large" },
  },
  verification: {
    google: "your-google-search-console-verification-code",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans bg-white text-gray-900 antialiased">
        <GoogleAnalytics />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-md z-50 focus:z-50"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
