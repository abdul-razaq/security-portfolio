import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StructuredData } from "@/components/StructuredData";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Great_Vibes } from "next/font/google";
import "./globals.css";

// Handwritten signature font for logo
const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-signature",
  display: "swap",
});

const satoshi = localFont({
  variable: "--font-satoshi",
  display: "swap",
  src: [
    { path: "../public/fonts/Satoshi-Light.otf", weight: "300", style: "normal" },
    { path: "../public/fonts/Satoshi-LightItalic.otf", weight: "300", style: "italic" },
    { path: "../public/fonts/Satoshi-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/Satoshi-Italic.otf", weight: "400", style: "italic" },
    { path: "../public/fonts/Satoshi-Medium.otf", weight: "500", style: "normal" },
    { path: "../public/fonts/Satoshi-MediumItalic.otf", weight: "500", style: "italic" },
    { path: "../public/fonts/Satoshi-Bold.otf", weight: "700", style: "normal" },
    { path: "../public/fonts/Satoshi-BoldItalic.otf", weight: "700", style: "italic" },
    { path: "../public/fonts/Satoshi-Black.otf", weight: "900", style: "normal" },
    { path: "../public/fonts/Satoshi-BlackItalic.otf", weight: "900", style: "italic" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "AbdulRazaq Suleiman | Security Professional",
    template: "%s | AbdulRazaq Suleiman",
  },
  description:
    "Expert offensive security professional specializing in penetration testing, offensive security, and application security engineering.",
  keywords: [
    "penetration testing",
    "offensive security",
    "web application security",
    "application security",
    "cybersecurity",
  ],
  authors: [{ name: "AbdulRazaq Suleiman" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "AbdulRazaq Suleiman | Security Professional",
    description: "Expert offensive security professional specializing in penetration testing and offensive security.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "AbdulRazaq Suleiman Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AbdulRazaq Suleiman | Security Professional",
    description: "Expert offensive security professional specializing in penetration testing and offensive security.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${satoshi.variable} ${greatVibes.variable}`}>
      <head>
        <StructuredData />
      </head>
      <body className={satoshi.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
