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
  title: "Simon Designs – Graphic Design & Pencil Art",
  description:
    "We bring ideas to life visually: branding, marketing materials, UI/UX, print & Simon Arts.",

  openGraph: {
    title: "Simon Designs – Graphic Design & Pencil Art",
    description:
      "We bring ideas to life visually: branding, marketing materials, UI/UX, print & Simon Arts.",
    url: "https://simondesigns.co.ke",
    siteName: "Simon Designs",
    images: [
      {
        url: "https://simondesigns.co.ke/preview.png",
        width: 1200,
        height: 630,
        alt: "Simon Designs Preview Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Simon Designs – Graphic Design & Pencil Art",
    description:
      "We bring ideas to life visually: branding, marketing materials, UI/UX, print & Simon Arts.",
    images: ["https://simondesigns.co.ke/preview.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schema markup for Google - helps show your logo in search results
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
      // Add your social media links here when you have them
      // "https://www.facebook.com/simondesigns",
      // "https://www.instagram.com/simondesigns",
      // "https://twitter.com/simondesigns"
    ]
  };

  return (
    <html lang="en">
      <head>
        {/* Schema.org markup for Google logo */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaMarkup)
          }}
        />
      </head>
      <body className={inter.className}>
        {/* Quote Modal Provider - Makes quote modal available globally */}
        <QuoteModalProvider>
          {/* IntaSend Global Provider - Loads payment system once for entire site */}
          <IntaSendProvider />
          
          {/* Progress Bar - Shows at top during page navigation */}
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