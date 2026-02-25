// FILE LOCATION: src/app/simon-arts/page.tsx
import type { Metadata } from "next";
import SimonArtsPageClient from './SimonArtsPageClient';

export const metadata: Metadata = {
  title: "Simon Arts – Unique Pencil Drawings & Artistic Creations",
  description: "Discover Simon Arts: unique pencil drawings blending traditional techniques with modern creativity. Commission custom artwork or explore our collection.",
  openGraph: {
    title: "Simon Arts – Pencil Drawings",
    description: "Unique pencil art and artistic creations by Simon Macharia.",
    url: "https://simondesigns.co.ke/simon-arts",
    images: [
      {
        url: "https://simondesigns.co.ke/pencil-1.jpg",
        width: 1200,
        height: 630,
        alt: "Simon Arts - Pencil Drawings",
      }
    ],
  },
};

export default function SimonArtsPage() {
  return <SimonArtsPageClient />;
}