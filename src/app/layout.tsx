import { ThemeProvider } from "@/components/ThemeProvider";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Script from "next/script";
import ChatWidget from "@/components/AI/ChatWidget";

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
  metadataBase: new URL("https://abdou-cyber.dev"),
  title: {
    default: "Abdoulaye Touré — Analyste Cybersécurité (Purple Team)",
    template: "%s — Abdoulaye Touré",
  },
  description:
    "Analyste en cybersécurité (Purple Team) : détection & réponse, SIEM/ELK, MITRE ATT&CK, automatisation. Basé en Île-de-France.",
  keywords: [
    "cybersécurité",
    "purple team",
    "détection et réponse",
    "cyberdéfense",
    "SIEM",
    "ELK",
    "gouvernance",
    "risque",
    "conformité",
    "MITRE ATT&CK",
    "EDR",
    "analyste cybersécurité",
    "gestion des incidents",
    "sécurité réseau",
    "vulnérabilités",
    "automatisation",
    "penteste",
    "alternance",
    "Île-de-France",
  ],
  authors: [{ name: "Abdoulaye Touré" }],
  creator: "Abdoulaye Touré",
  alternates: { canonical: "https://abdou-cyber.dev/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://abdou-cyber.dev/",
    title: "Abdoulaye Touré — Analyste Cybersécurité (Purple Team)",
    description:
      "Détection & réponse, SIEM/ELK, MITRE ATT&CK, automatisation et cyberdéfense. Portfolio professionnel d'Abdoulaye Touré.",
    siteName: "Portfolio Abdoulaye Touré",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Abdoulaye Touré — Analyste Cybersécurité (Purple Team)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdoulaye Touré — Analyste Cybersécurité (Purple Team)",
    description:
      "Purple Team • Detection & Response • SIEM/ELK • MITRE ATT&CK • Automatisation",
    images: ["/og.jpg"],
    creator: "@abdoulayetoure",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
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
        {/* ✅ Le provider englobe TOUT */}
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <ChatWidget />
        </ThemeProvider>

        {/* Données structurées JSON-LD */}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Abdoulaye Touré",
              jobTitle: "Analyste Cybersécurité (Purple Team)",
              url: "https://abdou-cyber.dev",
              sameAs: [
                "https://www.linkedin.com/in/abdoulaye-toure-b37b30100/",
                "https://github.com/ablayeT",
                "https://tryhackme.com/p/ablaye.toure0",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
