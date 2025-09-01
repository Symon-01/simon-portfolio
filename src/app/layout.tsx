import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
        url: "/preview.png", // 👈 put your logo/banner in /public/preview.png
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
    images: ["/preview.png"], // 👈 same image
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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
