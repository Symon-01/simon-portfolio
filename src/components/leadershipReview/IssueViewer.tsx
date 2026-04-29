// FILE: src/components/leadershipReview/IssueViewer.tsx
'use client';

import { useState } from 'react';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/lib/sanity.image';

interface IssueViewerProps {
  pdfUrl: string;
  title: string;
  articleContent?: any[]; // Portable Text blocks from Sanity — optional, only present when you've added the web version
}

// ── Portable Text renderers ───────────────────────────────────────────────────
// Each block style maps to the correct HTML tag + styling.
// H4 is red to match the newspaper design.
const portableTextComponents = {
  block: {
    // Regular paragraph
    normal: ({ children }: any) => (
      <p className="mb-5 text-gray-700 leading-relaxed text-base">{children}</p>
    ),
    // H2 — Major standalone article title (e.g. "Built on Hard Work...")
    h2: ({ children }: any) => (
      <h2
        className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-3 pb-2 border-b-2"
        style={{ fontFamily: "'Playfair Display', serif", borderColor: '#283583' }}
      >
        {children}
      </h2>
    ),
    // H3 — Sub-article nested inside an H2 (e.g. "The Student Who Refused...")
    h3: ({ children }: any) => (
      <h3
        className="text-xl md:text-2xl font-bold text-gray-800 mt-10 mb-2"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {children}
      </h3>
    ),
    // H4 — Red section heading within an article (e.g. "The Lawyer: Standing with the Powerless")
    h4: ({ children }: any) => (
      <h4 className="text-base font-bold uppercase tracking-wide mt-7 mb-2" style={{ color: '#BB0000' }}>
        {children}
      </h4>
    ),
    // H5 — Italic subtitle / deck line under H2 or H3
    h5: ({ children }: any) => (
      <h5 className="text-base italic text-gray-500 mb-4 font-medium leading-snug">{children}</h5>
    ),
    // Pull quote — highlighted key quote
    blockquote: ({ children }: any) => (
      <blockquote
        className="border-l-4 pl-5 my-8 italic text-gray-600 text-lg leading-relaxed"
        style={{ borderColor: '#283583' }}
      >
        {children}
      </blockquote>
    ),
  },

  // Custom block types (images dropped inline in the article)
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null;
      const position = value.position || 'full';

      return (
        <figure
          className={`my-6 ${
            position === 'left'
              ? 'float-left mr-6 mb-2 w-full sm:w-1/2'
              : position === 'right'
              ? 'float-right ml-6 mb-2 w-full sm:w-1/2'
              : 'w-full clear-both'
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={urlFor(value).width(900).url()}
            alt={value.caption || ''}
            className="w-full rounded-lg object-cover"
          />
          {value.caption && (
            <figcaption className="text-xs text-gray-400 mt-2 text-center italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },

  marks: {
    strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
  },
};
// ─────────────────────────────────────────────────────────────────────────────

export default function IssueViewer({ pdfUrl, title, articleContent }: IssueViewerProps) {
  const [pdfLoading, setPdfLoading] = useState(true);
  // Default to 'pdf' view. If no articleContent exists yet, only PDF is shown.
  const [viewMode, setViewMode] = useState<'pdf' | 'online'>('pdf');

  // Only show the toggle buttons if an online version has been written in Sanity
  const hasOnlineVersion = Array.isArray(articleContent) && articleContent.length > 0;

  return (
    <div className="w-full">

      {/* ── Toolbar ─────────────────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-5 py-3 rounded-t-xl flex-wrap gap-2"
        style={{ background: '#283583' }}
      >
        {/* Left: flag + title */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex flex-col h-8 w-1 rounded-sm overflow-hidden flex-shrink-0">
            <div className="flex-1" style={{ background: '#006600' }} />
            <div className="flex-1" style={{ background: '#BB0000' }} />
            <div className="flex-1" style={{ background: '#000000' }} />
          </div>
          <span
            className="text-white font-bold text-sm truncate"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {title}
          </span>
        </div>

        {/* Right: Read Online / View PDF toggle + Download button */}
        <div className="flex items-center gap-2 flex-shrink-0">

          {/* Toggle — only visible when online version exists in Sanity */}
          {hasOnlineVersion && (
            <div className="flex items-center rounded-lg overflow-hidden border border-white/40">
              <button
                onClick={() => setViewMode('online')}
                className={`text-xs font-semibold px-3 py-1.5 transition-colors whitespace-nowrap ${
                  viewMode === 'online'
                    ? 'bg-white text-[#283583]'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Read Online
              </button>
              <div className="w-px h-5 bg-white/30" />
              <button
                onClick={() => setViewMode('pdf')}
                className={`text-xs font-semibold px-3 py-1.5 transition-colors whitespace-nowrap ${
                  viewMode === 'pdf'
                    ? 'bg-white text-[#283583]'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                View PDF
              </button>
            </div>
          )}

          {/* Download PDF — always visible */}
          <a
            href={pdfUrl}
            download
            className="flex items-center gap-1.5 text-xs font-semibold text-white border border-white/30 rounded-lg px-3 py-1.5 hover:bg-white/10 transition-colors whitespace-nowrap"
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 2v8M5 8l3 3 3-3M3 13h10"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Download PDF
          </a>
        </div>
      </div>
      {/* ── End Toolbar ─────────────────────────────────────────────────────── */}

      {/* ── Content Area ────────────────────────────────────────────────────── */}

      {/* PDF View — the existing scrolling iframe, unchanged */}
      {viewMode === 'pdf' && (
        <div
          className="relative w-full border border-gray-200 rounded-b-xl overflow-hidden"
          style={{ height: '780px' }}
        >
          {pdfLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-50 z-10 gap-3">
              <div
                className="w-8 h-8 rounded-full border-2 animate-spin"
                style={{ borderColor: '#283583', borderTopColor: 'transparent' }}
              />
              <p className="text-sm text-gray-400">Loading newspaper...</p>
            </div>
          )}
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
            className="w-full h-full"
            title={title}
            onLoad={() => setPdfLoading(false)}
          />
        </div>
      )}

      {/* Online / Text View — Portable Text rendered as HTML for Google + readers */}
      {viewMode === 'online' && hasOnlineVersion && (
        <div
          className="w-full border border-gray-200 rounded-b-xl overflow-y-auto bg-white"
          style={{ height: '780px' }}
        >
          {/* Scroll hint bar */}
          <div
            className="sticky top-0 z-10 flex items-center justify-between px-4 py-2 text-xs text-white/80 border-b border-white/10"
            style={{ background: '#283583' }}
          >
            <span>Scroll to read the full issue</span>
            <span className="opacity-60">↕</span>
          </div>

          {/* Article body */}
          <div className="max-w-2xl mx-auto px-5 sm:px-8 py-8 overflow-hidden">
            <PortableText value={articleContent} components={portableTextComponents} />
            {/* Clear floats after all content */}
            <div className="clear-both" />
          </div>
        </div>
      )}
      {/* ── End Content Area ─────────────────────────────────────────────────── */}

      {/* ── Mobile fallback — iframes don't render on small screens ────────── */}
      <div className="mt-4 sm:hidden">
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white font-semibold text-sm"
          style={{ background: '#283583' }}
        >
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 2v8M5 8l3 3 3-3M3 13h10"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Open Full Issue on Mobile
        </a>
      </div>

    </div>
  );
}