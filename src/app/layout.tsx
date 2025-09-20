// src/app/layout.tsx
import { ThemeProvider } from "@/components/ThemeProvider";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Abdoulaye Touré - Expert Cybersécurité & Développeur",
    template: "%s | Abdoulaye Touré",
  },
  description:
    "Expert en cybersécurité et développeur web fullstack. Spécialisé en audit, pentest et développement d'applications sécurisées.",
  keywords: [
    "cybersécurité",
    "développeur web",
    "pentest",
    "audit sécurité",
    "Next.js",
    "React",
  ],
  authors: [{ name: "Abdoulaye Touré" }],
  creator: "Abdoulaye Touré",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://abdoulaye-toure.dev", // Remplace par ton domaine
    title: "Abdoulaye Touré - Expert Cybersécurité & Développeur",
    description: "Expert en cybersécurité et développeur web fullstack",
    siteName: "Portfolio Abdoulaye Touré",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdoulaye Touré - Expert Cybersécurité & Développeur",
    description: "Expert en cybersécurité et développeur web fullstack",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1e3a5f" />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Header />
        <ThemeProvider>{children}</ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
