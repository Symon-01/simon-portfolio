// FILE LOCATION: src/app/portfolio/[slug]/page.tsx
//
// CHANGES FROM PREVIOUS VERSION:
// Wrapped the Sanity fetch in generateMetadata with a try/catch
// so that if the server-side fetch fails (network timeout, Sanity
// temporarily unreachable), the page still loads normally instead
// of crashing with "fetch failed". Returns empty metadata on failure
// so the page renders via the client-side fetch in ProjectDetailClient.

import type { Metadata } from "next";
import { client } from '@/lib/sanity';
import ProjectDetailClient from './ProjectDetailClient';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;

  try {
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

    const project = await client.fetch(
      query,
      { slug },
      {
        // ── KEY FIX ───────────────────────────────────────────────
        // next.revalidate: 60 means Next.js caches this server fetch
        // for 60 seconds. Without this, every page load hits Sanity's
        // API fresh from the server — if Sanity is slow or briefly
        // unreachable, it throws "fetch failed" and crashes the page.
        // With caching, after the first successful fetch the result
        // is reused, preventing crashes on subsequent loads.
        // ─────────────────────────────────────────────────────────
        next: { revalidate: 60 }
      }
    );

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

  } catch (error) {
    // ── GRACEFUL FALLBACK ─────────────────────────────────────────
    // If the server-side Sanity fetch fails for any reason
    // (network timeout, DNS failure, Sanity outage), return
    // minimal metadata instead of crashing the entire page.
    // The page will still load — ProjectDetailClient.tsx does its
    // own client-side fetch which is independent and more resilient.
    // ─────────────────────────────────────────────────────────────
    console.error(`⚠️ generateMetadata fetch failed for slug "${slug}":`, error);
    return {
      title: 'Simon Designs | Portfolio',
      description: 'Professional graphic design and pencil art services in Kenya.',
    };
  }
}

export default function ProjectPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  return <ProjectDetailClient params={params} />;
}