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
    url: "https://simon-portfolio-cetr.vercel.app/",
    siteName: "Simon Designs",
    images: [
      {
        url: "/preview.png",
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
    images: ["/preview.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
