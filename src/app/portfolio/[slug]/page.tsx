// FILE LOCATION: src/app/portfolio/[slug]/page.tsx
// ✅ This is now a SERVER component — enables dynamic OG metadata per project

import type { Metadata } from "next";
import { client } from '@/lib/sanity';
import ProjectDetailClient from './ProjectDetailClient';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;

  const query = `*[_type == "portfolio" && slug.current == $slug][0]{
    title,
    description,
    "coverImage": coalesce(
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