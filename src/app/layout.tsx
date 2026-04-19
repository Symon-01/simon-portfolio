// FILE LOCATION: src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TawkToWidget from "@/components/TawkToWidget";
import LoadingBar from "@/components/LoadingBar";
import IntaSendProvider from "@/components/IntaSendProvider";
import { QuoteModalProvider } from "@/contexts/QuoteModalContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // metadataBase is critical — it tells Next.js the root domain for all OG
  // image URLs. Without it, absolute Sanity CDN URLs can still get ignored
  // and Facebook follows og:url back to the homepage instead.
  metadataBase: new URL("https://simondesigns.co.ke"),

  title: "Simon Designs – Graphic Design & Pencil Art",
  description:
    "We bring ideas to life visually: branding, marketing materials, UI/UX, print & Simon Arts.",

  openGraph: {
    title: "Simon Designs – Graphic Design & Pencil Art",
    description:
      "We bring ideas to life visually: branding, marketing materials, UI/UX, print & Simon Arts.",
    url: "https://simondesigns.co.ke",
    siteName: "Simon Designs",
    locale: "en_US",
    type: "website",
    // No default image — each page sets its own via generateMetadata.
    // This prevents preview.png from overriding Leadership Review covers.
  },

  twitter: {
    card: "summary_large_image",
    title: "Simon Designs – Graphic Design & Pencil Art",
    description:
      "We bring ideas to life visually: branding, marketing materials, UI/UX, print & Simon Arts.",
    // No default image — per-page metadata takes over.
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Simon Designs",
    "url": "https://simondesigns.co.ke",
    "logo": "https://simondesigns.co.ke/logo.png",
    "description": "Professional graphic design and pencil art services in Kenya. We bring ideas to life visually.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "KE",
      "addressLocality": "Kenya"
    },
    "sameAs": [
      // "https://www.facebook.com/simondesigns",
      // "https://www.instagram.com/simondesigns",
      // "https://twitter.com/simondesigns"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaMarkup)
          }}
        />
      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
        <QuoteModalProvider>
          <IntaSendProvider />
          <LoadingBar />
          <Header />
          {children}
          <Footer />
          <TawkToWidget />
        </QuoteModalProvider>
      </body>
    </html>
  );
}