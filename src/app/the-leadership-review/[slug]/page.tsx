// FILE: src/app/the-leadership-review/[slug]/page.tsx

import { Metadata } from 'next';
import IssueDetailClient from './IssueDetailClient';
import { getLeadershipReviewBySlug } from '@/lib/sanity.queries';

// ── Server-side metadata for OG image (WhatsApp, Facebook, etc.) ─────────────
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const issue = await getLeadershipReviewBySlug(slug);

  if (!issue) {
    return {
      title: 'Issue Not Found | The Leadership Review',
    };
  }

  // ogImage = dedicated sharing image (1200x628px landscape)
  // Falls back to coverImage if no separate OG image has been uploaded yet
  const ogImage = issue.ogImage?.asset?.url || issue.coverImage?.asset?.url;

  const pageUrl = `https://simondesigns.co.ke/the-leadership-review/${slug}`;

  return {
    title: `${issue.title} | The Leadership Review`,
    description: issue.summary || `Vol. ${issue.volume} · Issue ${issue.issueNumber} of The Leadership Review by Simon Designs.`,
    openGraph: {
      title: issue.title,
      description: issue.summary || `Vol. ${issue.volume} · Issue ${issue.issueNumber} of The Leadership Review.`,
      url: pageUrl,
      siteName: 'Simon Designs',
      type: 'article',
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 628,
            alt: `Cover of ${issue.title}`,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: issue.title,
      description: issue.summary || '',
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

// ── Server component shell — renders the client page ─────────────────────────
export default function IssueDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  return <IssueDetailClient params={params} />;
}