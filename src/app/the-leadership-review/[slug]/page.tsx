// FILE: src/app/the-leadership-review/[slug]/page.tsx
//
// This is a SERVER component. It does two things:
//
//  1. Fetches the issue once on the server (shared between metadata + page render).
//  2. Renders the full article content as real server-side HTML that is present
//     in the initial HTTP response — so Google indexes every paragraph immediately,
//     without waiting for JavaScript or a user click.
//
//     The server-rendered article is visually hidden from users (sr-only) so it
//     doesn't clash with the interactive reader in IssueDetailClient. Both exist
//     in the DOM simultaneously; users see the reader, Googlebot sees the HTML.

import { Metadata } from 'next';
import { PortableText } from '@portabletext/react';
import IssueDetailClient from './IssueDetailClient';
import { getLeadershipReviewBySlug } from '@/lib/sanity.queries';

// ── Minimal Portable Text components for the hidden server-rendered article ───
// Plain semantic HTML — no special styling needed; this is purely for crawlers.
const seoComponents = {
  block: {
    normal:     ({ children }: any) => <p>{children}</p>,
    h2:         ({ children }: any) => <h2>{children}</h2>,
    h3:         ({ children }: any) => <h3>{children}</h3>,
    h4:         ({ children }: any) => <h4>{children}</h4>,
    h5:         ({ children }: any) => <h5>{children}</h5>,
    blockquote: ({ children }: any) => <blockquote>{children}</blockquote>,
  },
  types: {
    // Images: render alt text only — no <img> needed for SEO text content
    image: ({ value }: any) => value?.caption ? <p>{value.caption}</p> : null,
  },
  marks: {
    strong: ({ children }: any) => <strong>{children}</strong>,
    em:     ({ children }: any) => <em>{children}</em>,
  },
};

// ── Server-side metadata ───────────────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const issue = await getLeadershipReviewBySlug(slug);

  if (!issue) {
    return { title: 'Issue Not Found | The Leadership Review' };
  }

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
        images: [{ url: ogImage, width: 1200, height: 628, alt: `Cover of ${issue.title}` }],
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

// ── Page component (server) ───────────────────────────────────────────────────
export default async function IssueDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Fetch once on the server — result is passed to the client component so it
  // does NOT need to fetch again in useEffect. Zero duplicate network calls.
  const issue = await getLeadershipReviewBySlug(slug);

  const hasArticle =
    issue && Array.isArray(issue.articleContent) && issue.articleContent.length > 0;

  return (
    <>
      {/*
        ── SEO: hidden server-rendered article ──────────────────────────────────
        This <article> is rendered as real HTML in the server response.
        Google indexes it on the first crawl — no JavaScript required.

        'sr-only' is Tailwind's screen-reader utility:
          position: absolute; width: 1px; height: 1px; overflow: hidden; clip: ...
        It is visually invisible to users but fully present in the DOM and
        readable by search engine crawlers.

        We deliberately do NOT use display:none or visibility:hidden — those
        would cause Google to ignore the content as "hidden text", which is a
        spam signal. sr-only is the correct, Google-approved pattern.
      */}
      {hasArticle && (
        <article className="sr-only" aria-hidden="true">
          <h1>{issue.title}</h1>
          {issue.summary && <p>{issue.summary}</p>}
          <PortableText
            value={issue.articleContent}
            components={seoComponents}
          />
        </article>
      )}

      {/*
        ── Interactive UI: client component ────────────────────────────────────
        Receives the already-fetched `issue` as a prop — no second fetch.
        Handles the PDF viewer, reader pane, sidebar, reviews, etc.
      */}
      <IssueDetailClient issue={issue} />
    </>
  );
}