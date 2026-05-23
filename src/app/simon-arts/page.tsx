import type { Metadata } from "next";
import { client, urlFor } from '@/lib/sanity';
import SimonArtsPageClient from './SimonArtsPageClient';
import { Artwork } from '@/types/simonArts';

export const revalidate = 3600;

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

export default async function SimonArtsPage() {
  let artworks: Artwork[] = [];
  try {
    const query = `*[_type == "simonArts"] | order(year desc) {
      _id,
      title,
      slug,
      description,
      mainImage,
      category,
      year,
      medium,
      featured,
      availableForSale
    }`;
    artworks = await client.fetch(query, {}, { next: { revalidate: 3600 } });
  } catch (e) {
    console.error('Simon Arts page server fetch failed:', e);
  }

  return <SimonArtsPageClient initialArtworks={artworks} />;
}