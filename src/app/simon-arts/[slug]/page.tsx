import type { Metadata } from "next";
import { client } from '@/lib/sanity';
import ArtworkDetailClient from './ArtworkDetailClient';
import { Artwork } from '@/types/simonArts';

export const revalidate = 3600;

const artworkQuery = `*[_type == "simonArts" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  description,
  subject,
  mainImage,
  detailImages,
  medium,
  paperType,
  dimensions,
  timeToComplete,
  year,
  story,
  category,
  tags,
  availableForSale,
  price,
  featured
}`;

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  try {
    const artwork = await client.fetch(
      `*[_type == "simonArts" && slug.current == $slug][0]{
        title, description
      }`,
      { slug },
      { next: { revalidate: 3600 } }
    );
    if (!artwork) return {};
    return {
      title: `${artwork.title} – Simon Arts | Simon Designs`,
      description: artwork.description?.slice(0, 160) || 'Unique pencil artwork by Simon Macharia.',
      openGraph: {
        title: `${artwork.title} – Simon Arts`,
        description: artwork.description?.slice(0, 160) || 'Unique pencil artwork by Simon Macharia.',
        url: `https://simondesigns.co.ke/simon-arts/${slug}`,
        siteName: 'Simon Designs',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${artwork.title} – Simon Arts`,
        description: artwork.description?.slice(0, 160),
      },
    };
  } catch (e) {
    console.error(`generateMetadata failed for artwork "${slug}":`, e);
    return { title: 'Simon Arts | Simon Designs' };
  }
}

export default async function ArtworkDetailPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  let artwork: Artwork | null = null;
  try {
    artwork = await client.fetch(artworkQuery, { slug }, { next: { revalidate: 3600 } });
  } catch (e) {
    console.error('Artwork detail server fetch failed:', e);
  }

  return <ArtworkDetailClient initialArtwork={artwork} />;
}