// FILE LOCATION: src/app/portfolio/[slug]/page.tsx
// ✅ Server component — enables dynamic OG metadata per project
//
// ============================================================
// SIMON DESIGNS — src/app/portfolio/[slug]/page.tsx
//
// CHANGE FROM ORIGINAL:
// Fixed the GROQ query for coverImage. The original query used
// asset->url which returns null for projectImage type objects
// because those have a nested asset structure (asset.asset->url).
// This caused WhatsApp/social previews to always fall back to
// the logo. Now queries both structures with coalesce so it
// works regardless of how images were added in Sanity.
// Everything else is identical to your original.
// ============================================================

import type { Metadata } from "next";
import { client } from '@/lib/sanity';
import ProjectDetailClient from './ProjectDetailClient';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;

  // ── FIXED QUERY ───────────────────────────────────────────
  // Previously used images[isCover == true][0].asset->url
  // which returned null for projectImage types (they use
  // asset.asset->url). Now tries all 4 possible combinations
  // so whichever way the image was uploaded, it will be found.
  // ─────────────────────────────────────────────────────────
  const query = `*[_type == "portfolio" && slug.current == $slug][0]{
    title,
    description,
    "coverImage": coalesce(
      images[_type == "projectImage" && isCover == true][0].asset.asset->url,
      images[_type == "projectImage"][0].asset.asset->url,
      images[isCover == true][0].asset->url,
      images[0].asset->url
    )
  }`;

  const project = await client.fetch(query, { slug });

  if (!project) return {};

  // Handle both plain text and Portable Text array
  const description = Array.isArray(project.description)
    ? project.description
        .map((block: any) => block.children?.map((c: any) => c.text).join('') ?? '')
        .join(' ')
    : project.description;

  const ogImage = project.coverImage || 'https://simondesigns.co.ke/preview.png';

  return {
    title: `${project.title} | Simon Designs`,
    description: description?.slice(0, 160),
    openGraph: {
      title: `${project.title} | Simon Designs`,
      description: description?.slice(0, 160),
      url: `https://simondesigns.co.ke/portfolio/${slug}`,
      siteName: 'Simon Designs',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: project.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Simon Designs`,
      description: description?.slice(0, 160),
      images: [ogImage],
    },
  };
}

export default function ProjectPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  return <ProjectDetailClient params={params} />;
}