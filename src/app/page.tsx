// src/app/page.tsx
import type { Metadata } from "next";
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: "Simon Designs – Graphic Design & Pencil Art in Kenya",
  description: "Professional graphic design services: logos, branding, websites, print design, and unique pencil art. Transform your vision into powerful visuals.",
  openGraph: {
    title: "Simon Designs – Graphic Design & Pencil Art",
    description: "Professional graphic design services: logos, branding, websites, print design, and unique pencil art.",
    url: "https://simondesigns.co.ke",
    images: [
      {
        url: "https://simondesigns.co.ke/preview.png",
        width: 1200,
        height: 630,
        alt: "Simon Designs - Professional Graphic Design",
      }
    ],
  },
};

export default function Home() {
  return <HomePageClient />;
}