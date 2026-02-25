// src/app/about/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us – Simon Designs",
  description: "Learn about Simon Designs: our mission, values, design philosophy, and the creative tools we use to bring your vision to life.",
  openGraph: {
    title: "About Us – Simon Designs",
    description: "Learn about our mission, values, and design philosophy.",
    url: "https://simondesigns.co.ke/about",
    images: [
      {
        url: "https://simondesigns.co.ke/hero.jpg",
        width: 1200,
        height: 630,
        alt: "About Simon Designs",
      }
    ],
  },
};

// ⚠️ IMPORTANT: Remove 'use client' when adding metadata
// Metadata only works in Server Components
// But your hooks need Client Component...

// Solution: Keep the page as Server Component and move client logic to a separate component
import AboutPageClient from './AboutPageClient';

export default function AboutPage() {
  return <AboutPageClient />;
}