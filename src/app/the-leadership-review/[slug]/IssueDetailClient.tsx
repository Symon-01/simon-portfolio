// FILE: src/app/the-leadership-review/[slug]/IssueDetailClient.tsx
'use client';

import { use, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { getLeadershipReviewBySlug } from '@/lib/sanity.queries';
import type { LeadershipReviewIssue } from '@/types/leadershipReview';
import SupportButton from '@/components/SupportButton';
import IssueMasthead from '@/components/leadershipReview/IssueMasthead';
import { urlFor } from '@/lib/sanity.image';

async function triggerDownload(url: string, filename: string) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  } catch {
    window.open(url, '_blank');
  }
}

// ── Portable Text renderers ───────────────────────────────────────────────────
// Maps each Sanity block style to the correct HTML tag + styling.
// H4 is red to match the newspaper design.
const portableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="mb-5 text-gray-700 leading-relaxed text-base">{children}</p>
    ),
    h2: ({ children }: any) => (
      <h2
        className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-3 pb-2 border-b-2"
        style={{ fontFamily: "'Playfair Display', serif", borderColor: '#283583' }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3
        className="text-xl md:text-2xl font-bold text-gray-800 mt-10 mb-2"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {children}
      </h3>
    ),
    // Red section headings — matching the newspaper style
    h4: ({ children }: any) => (
      <h4
        className="text-base font-bold uppercase tracking-wide mt-7 mb-2"
        style={{ color: '#BB0000' }}
      >
        {children}
      </h4>
    ),
    // Italic subtitle / deck line under H2 or H3
    h5: ({ children }: any) => (
      <h5 className="text-base italic text-gray-500 mb-4 font-medium leading-snug">{children}</h5>
    ),
    blockquote: ({ children }: any) => (
      <blockquote
        className="border-l-4 pl-5 my-8 italic text-gray-600 text-lg leading-relaxed"
        style={{ borderColor: '#283583' }}
      >
        {children}
      </blockquote>
    ),
  },
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

// ── Shared Online Article View ────────────────────────────────────────────────
// Used by both Desktop and Mobile viewers when "Read Online" is active.

function OnlineArticleView({ articleContent }: { articleContent: any[] }) {
  return (
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
        <div className="clear-both" />
      </div>
    </div>
  );
}

// ── Shared Viewer Toolbar ─────────────────────────────────────────────────────
// The blue top bar used in both desktop and mobile viewers.
// Shows the toggle only when an online version exists.

function ViewerToolbar({
  title,
  viewMode,
  setViewMode,
  hasOnlineVersion,
  onDownload,
  downloading,
}: {
  title: string;
  viewMode: 'pdf' | 'online';
  setViewMode: (mode: 'pdf' | 'online') => void;
  hasOnlineVersion: boolean;
  onDownload: () => void;
  downloading: boolean;
}) {
  return (
    <div
      className="flex items-center justify-between px-4 py-3 rounded-t-xl flex-wrap gap-2"
      style={{ background: '#283583' }}
    >
      {/* Left: Kenyan flag stripe + title */}
      <div className="flex items-center gap-2 min-w-0 flex-1 mr-2">
        <div className="flex flex-col h-7 w-1 rounded-sm overflow-hidden flex-shrink-0">
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

      {/* Right: toggle + download */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Read Online / View PDF toggle — only shown when online version exists */}
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

        {/* Download button — always visible */}
        <button
          onClick={onDownload}
          disabled={downloading}
          className="flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold text-white border border-white/30 rounded-lg px-3 py-1.5 hover:bg-white/10 transition-colors disabled:opacity-60 whitespace-nowrap"
        >
          {downloading ? (
            <div
              className="w-3 h-3 rounded-full border border-t-transparent animate-spin"
              style={{ borderColor: '#fff', borderTopColor: 'transparent' }}
            />
          ) : (
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v8M5 8l3 3 3-3M3 13h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {downloading ? 'Saving...' : 'Download PDF'}
        </button>
      </div>
    </div>
  );
}

// ── Mobile PDF Canvas Renderer ────────────────────────────────────────────────

function MobilePdfViewer({
  pdfUrl,
  title,
  onDownload,
  downloading,
  articleContent,
}: {
  pdfUrl: string;
  title: string;
  onDownload: () => void;
  downloading: boolean;
  articleContent?: any[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  const renderedRef = useRef(false);
  const [viewMode, setViewMode] = useState<'pdf' | 'online'>('pdf');
  const hasOnlineVersion = Array.isArray(articleContent) && articleContent.length > 0;

  useEffect(() => {
    if (renderedRef.current) return;
    renderedRef.current = true;

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.onload = async () => {
      try {
        const pdfjsLib = (window as any).pdfjsLib;
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        const total = pdf.numPages;
        const container = containerRef.current;
        if (!container) return;

        for (let i = 1; i <= total; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: window.innerWidth < 400 ? 1.2 : 1.5 });
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.width = '100%';
          canvas.style.display = 'block';
          canvas.style.borderBottom = '1px solid #e5e7eb';
          const ctx = canvas.getContext('2d')!;
          await page.render({ canvasContext: ctx, viewport }).promise;
          container.appendChild(canvas);
        }
      } catch (err) {
        console.error('PDF render error:', err);
        setError(true);
      }
    };
    script.onerror = () => setError(true);
    document.head.appendChild(script);
  }, [pdfUrl]);

  return (
    <div className="w-full">
      <ViewerToolbar
        title={title}
        viewMode={viewMode}
        setViewMode={setViewMode}
        hasOnlineVersion={hasOnlineVersion}
        onDownload={onDownload}
        downloading={downloading}
      />

      {/* Online view */}
      {viewMode === 'online' && hasOnlineVersion && (
        <OnlineArticleView articleContent={articleContent!} />
      )}

      {/* PDF canvas view */}
      {viewMode === 'pdf' && (
        <>
          {error && (
            <div className="w-full border border-gray-200 rounded-b-xl bg-white flex flex-col items-center justify-center gap-4 py-12 px-6 text-center">
              <p className="text-sm text-gray-500">Could not render the PDF. Please open it directly.</p>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-2.5 px-6 rounded-xl text-white text-sm font-black"
                style={{ background: '#283583' }}
              >
                Open PDF
              </a>
            </div>
          )}
          {!error && (
            <div
              ref={containerRef}
              className="w-full border border-gray-200 rounded-b-xl overflow-y-auto bg-white"
              style={{ maxHeight: '85vh' }}
            />
          )}
        </>
      )}
    </div>
  );
}

// ── Desktop PDF Viewer ────────────────────────────────────────────────────────

function DesktopPdfViewer({
  pdfUrl,
  title,
  onDownload,
  downloading,
  articleContent,
}: {
  pdfUrl: string;
  title: string;
  onDownload: () => void;
  downloading: boolean;
  articleContent?: any[];
}) {
  const [loaded, setLoaded] = useState(false);
  const [viewMode, setViewMode] = useState<'pdf' | 'online'>('pdf');
  const hasOnlineVersion = Array.isArray(articleContent) && articleContent.length > 0;

  return (
    <div className="w-full">
      <ViewerToolbar
        title={title}
        viewMode={viewMode}
        setViewMode={setViewMode}
        hasOnlineVersion={hasOnlineVersion}
        onDownload={onDownload}
        downloading={downloading}
      />

      {/* Online view */}
      {viewMode === 'online' && hasOnlineVersion && (
        <OnlineArticleView articleContent={articleContent!} />
      )}

      {/* PDF iframe view */}
      {viewMode === 'pdf' && (
        <div
          className="w-full border border-gray-200 rounded-b-xl relative"
          style={{ height: '780px', background: '#ffffff' }}
        >
          {!loaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-50 z-10 gap-3">
              <div
                className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
                style={{ borderColor: '#283583', borderTopColor: 'transparent' }}
              />
              <p className="text-sm text-gray-400">Loading newspaper...</p>
            </div>
          )}
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
            title={title}
            onLoad={() => setLoaded(true)}
            style={{ display: 'block', width: '100%', height: '100%', border: 'none', background: '#ffffff' }}
          />
        </div>
      )}
    </div>
  );
}

// ── Share + Support card ──────────────────────────────────────────────────────

function ShareAndSupportCard({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Read this issue of The Leadership Review: ${title}`);
    const shareUrls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };
    if (shareUrls[platform]) window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1.5px solid #283583' }}>
      <div className="px-4 py-2.5 flex items-center gap-2" style={{ background: '#283583' }}>
        <div className="flex flex-col h-5 w-1 rounded-sm overflow-hidden flex-shrink-0">
          <div className="flex-1" style={{ background: '#006600' }} />
          <div className="flex-1" style={{ background: '#BB0000' }} />
          <div className="flex-1" style={{ background: '#000000' }} />
        </div>
        <p className="text-white text-xs font-black tracking-widest uppercase">Share this issue</p>
      </div>
      <div className="bg-white p-4">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => handleShare('whatsapp')}
            className="bg-[#25D366] hover:bg-[#20BD5A] text-white p-2 rounded-lg transition-colors" title="Share on WhatsApp">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </button>
          <button onClick={() => handleShare('facebook')}
            className="bg-[#1877F2] hover:bg-[#0C63D4] text-white p-2 rounded-lg transition-colors" title="Share on Facebook">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </button>
          <button onClick={() => handleShare('twitter')}
            className="bg-black hover:bg-gray-800 text-white p-2 rounded-lg transition-colors" title="Share on X (Twitter)">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </button>
          <button onClick={() => handleShare('linkedin')}
            className="bg-[#0A66C2] hover:bg-[#004182] text-white p-2 rounded-lg transition-colors" title="Share on LinkedIn">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </button>
          <button onClick={handleCopyLink}
            className="bg-gradient-to-tr from-[#FEDA75] via-[#FA7E1E] to-[#D62976] hover:opacity-90 text-white p-2 rounded-lg transition-opacity" title="Copy link for Instagram">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </button>
          <button onClick={handleCopyLink}
            className="bg-black hover:bg-gray-800 text-white p-2 rounded-lg transition-colors" title="Copy link for TikTok">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
            </svg>
          </button>
          <button onClick={handleCopyLink}
            className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors relative" title="Copy Link">
            {copied
              ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>}
          </button>
        </div>

        {copied && <p className="text-xs font-semibold mt-2" style={{ color: '#048F02' }}>Link copied!</p>}

        <div className="mt-4 pt-4 border-t border-gray-100">
          <SupportButton position="top" />
        </div>
      </div>
    </div>
  );
}

// ── Reader Reviews ─────────────────────────────────────────────────────────────

type Review = { reviewerName: string; location?: string; rating: number; comment: string };

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="13" height="13" viewBox="0 0 16 16"
          fill={s <= rating ? '#EF6203' : 'none'}
          stroke={s <= rating ? '#EF6203' : '#d1d5db'} strokeWidth="1.2">
          <path d="M8 1l1.9 4 4.4.6-3.2 3.1.8 4.4L8 11l-3.9 2.1.8-4.4L1.7 5.6l4.4-.6z" />
        </svg>
      ))}
    </div>
  );
}

function ReaderReviews({ reviews: initialReviews, issueTitle, issueId }: {
  reviews: Review[]; issueTitle: string; issueId: string;
}) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newestIndex, setNewestIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({ reviewerName: '', location: '', rating: 5, comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = async () => {
    if (!formData.reviewerName.trim() || !formData.comment.trim()) return;
    setSubmitting(true);
    setError('');
    const newReview: Review = {
      reviewerName: formData.reviewerName.trim(),
      location: formData.location.trim(),
      rating: formData.rating,
      comment: formData.comment.trim(),
    };
    setReviews((prev) => {
      const updated = [...prev, newReview];
      setNewestIndex(updated.length - 1);
      return updated;
    });
    setSubmitted(true);
    setTimeout(() => setNewestIndex(null), 4000);
    try {
      const res = await fetch('/api/leadership-review/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ issueId, issueTitle, ...newReview }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
    } catch (err: any) {
      setReviews((prev) => prev.slice(0, -1));
      setNewestIndex(null);
      setSubmitted(false);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = { borderColor: '#28358330', background: '#f7f8ff', color: '#111827' };
  const inputClass = 'w-full text-sm px-3 py-2.5 rounded-lg border outline-none transition-colors';

  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, #283583, transparent)' }} />
        <h2 className="text-lg font-black px-2" style={{ fontFamily: "'Playfair Display', serif", color: '#283583' }}>Reader Responses</h2>
        <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, #283583, transparent)' }} />
      </div>

      {!submitted ? (
        <div className="rounded-xl overflow-hidden mb-6" style={{ border: '1.5px solid #283583' }}>
          <div className="px-5 py-3 flex items-center gap-3" style={{ background: '#283583' }}>
            <div className="flex flex-col h-6 w-1 rounded-sm overflow-hidden flex-shrink-0">
              <div className="flex-1" style={{ background: '#006600' }} />
              <div className="flex-1" style={{ background: '#BB0000' }} />
              <div className="flex-1" style={{ background: '#000000' }} />
            </div>
            <div>
              <p className="text-white font-black text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>Share Your Response</p>
              <p className="text-white/60 text-xs">What did you think of &ldquo;{issueTitle}&rdquo;?</p>
            </div>
          </div>
          <div className="bg-white p-5">
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">Your Rating</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button key={s} type="button"
                    onMouseEnter={() => setHoveredStar(s)} onMouseLeave={() => setHoveredStar(0)}
                    onClick={() => setFormData({ ...formData, rating: s })}
                    className="transition-transform hover:scale-110 active:scale-95">
                    <svg width="28" height="28" viewBox="0 0 16 16"
                      fill={s <= (hoveredStar || formData.rating) ? '#EF6203' : 'none'}
                      stroke={s <= (hoveredStar || formData.rating) ? '#EF6203' : '#d1d5db'} strokeWidth="1.2">
                      <path d="M8 1l1.9 4 4.4.6-3.2 3.1.8 4.4L8 11l-3.9 2.1.8-4.4L1.7 5.6l4.4-.6z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Your Name <span style={{ color: '#cd171a' }}>*</span></label>
                <input type="text" placeholder="e.g. James Mwangi" value={formData.reviewerName}
                  onChange={(e) => setFormData({ ...formData, reviewerName: e.target.value })}
                  className={inputClass} style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = '#283583'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#28358330'; }} />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Location</label>
                <input type="text" placeholder="e.g. Nairobi, Nyeri..." value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className={inputClass} style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = '#283583'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#28358330'; }} />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-sm font-semibold text-gray-700 mb-1 block">Your Response <span style={{ color: '#cd171a' }}>*</span></label>
              <textarea rows={4} placeholder="What did you think of this issue? Which story resonated most with you?"
                value={formData.comment} onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                className={`${inputClass} resize-none`} style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = '#283583'; }}
                onBlur={(e) => { e.target.style.borderColor = '#28358330'; }} />
            </div>
            {error && <p className="text-sm font-semibold mb-3" style={{ color: '#cd171a' }}>{error}</p>}
            <button type="button" onClick={handleSubmit}
              disabled={submitting || !formData.reviewerName.trim() || !formData.comment.trim()}
              className="px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: submitting ? '#9ca3af' : '#283583' }}>
              {submitting ? 'Posting…' : 'Submit Response'}
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-xl px-5 py-4 mb-6 flex items-center gap-3"
          style={{ background: 'rgba(63,165,53,0.08)', border: '1.5px solid #3fa53540' }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#3fa535' }}>
            <svg width="16" height="16" fill="none" stroke="white" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="font-black text-sm" style={{ color: '#3fa535', fontFamily: "'Playfair Display', serif" }}>Thank you for your response!</p>
            <p className="text-xs text-gray-500">Your review has been posted below.</p>
          </div>
        </div>
      )}

      {reviews.length === 0 ? (
        <p className="text-sm text-gray-400 italic text-center py-4">No reviews yet. Be the first to share your thoughts.</p>
      ) : (
        <div className="space-y-3">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white rounded-xl p-4 transition-all duration-700"
              style={{
                border: i === newestIndex ? '1.5px solid #3fa535' : '1.5px solid #28358318',
                boxShadow: i === newestIndex ? '0 0 0 3px rgba(63,165,53,0.12)' : 'none',
              }}>
              <StarDisplay rating={r.rating} />
              <p className="text-sm text-gray-700 italic leading-relaxed my-2" style={{ fontFamily: "'Georgia', serif" }}>&ldquo;{r.comment}&rdquo;</p>
              <p className="text-xs font-bold" style={{ color: '#283583' }}>— {r.reviewerName}{r.location ? `, ${r.location}` : ''}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Info panel sidebar ─────────────────────────────────────────────────────────

function IssueInfoPanel({ issue, showDownload, onDownload, downloading, hideCover = false }: {
  issue: LeadershipReviewIssue; showDownload: boolean; onDownload: () => void; downloading: boolean; hideCover?: boolean;
}) {
  return (
    <div className="overflow-hidden" style={{ border: '1.5px solid #283583', borderRadius: '16px', boxShadow: '0 8px 32px rgba(40,53,131,0.13)' }}>
      <div className="px-4 py-3 flex items-center gap-2" style={{ background: '#283583' }}>
        <div className="flex flex-col h-6 w-1 rounded-sm overflow-hidden flex-shrink-0">
          <div className="flex-1" style={{ background: '#006600' }} />
          <div className="flex-1" style={{ background: '#BB0000' }} />
          <div className="flex-1" style={{ background: '#000000' }} />
        </div>
        <p className="text-white font-black text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>The Leadership Review</p>
      </div>
      {!hideCover && issue.coverImage?.asset?.url && (
        <div className="relative overflow-hidden" style={{ height: '220px' }}>
          <img src={issue.coverImage.asset.url} alt={`Cover — ${issue.title}`} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: 'linear-gradient(to top, rgba(40,53,131,0.85), transparent)' }} />
          <span className="absolute bottom-3 left-3 text-white text-xs font-black px-2.5 py-1 rounded" style={{ background: '#EF6203' }}>
            {issue.edition || 'Special Edition'}
          </span>
        </div>
      )}
      <div className="bg-white p-4 sm:p-5 flex flex-col gap-3 sm:gap-4">
        <div>
          <p className="text-xs font-black tracking-widest uppercase mb-1" style={{ color: '#283583', opacity: 0.6 }}>Vol. {issue.volume} · Issue {issue.issueNumber}</p>
          <h2 className="text-sm sm:text-base font-black leading-snug" style={{ fontFamily: "'Playfair Display', serif", color: '#cd171a' }}>{issue.title}</h2>
        </div>
        {issue.featuredLeader && (
          <div className="pt-3" style={{ borderTop: '1.5px solid #3fa53530' }}>
            <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: '#3fa535' }}>Featured Leader</p>
            <p className="text-sm font-black" style={{ color: '#283583' }}>{issue.featuredLeader}</p>
            {issue.leaderTitle && <p className="text-xs text-gray-500 mt-0.5">{issue.leaderTitle}</p>}
            {issue.county && <p className="text-xs text-gray-400 mt-0.5">{issue.constituency ? `${issue.constituency}, ` : ''}{issue.county}</p>}
          </div>
        )}
        {issue.summary && (
          <div className="pt-3" style={{ borderTop: '1.5px solid #cd171a20' }}>
            <p className="text-xs leading-relaxed text-gray-500">{issue.summary}</p>
          </div>
        )}
        {issue.tags && issue.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-3" style={{ borderTop: '1.5px solid #28358320' }}>
            {issue.tags.map((tag, i) => {
              const c = ['#283583', '#3fa535', '#cd171a'][i % 3];
              return (
                <span key={tag} className="text-xs px-2.5 py-0.5 font-bold rounded-full"
                  style={{ background: `${c}12`, color: c, border: `1.5px solid ${c}40` }}>
                  {tag}
                </span>
              );
            })}
          </div>
        )}
        {showDownload && issue.pdfFile?.asset?.url && (
          <div className="pt-3" style={{ borderTop: '1.5px solid #28358320' }}>
            <button onClick={onDownload} disabled={downloading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-black hover:opacity-90 disabled:opacity-60"
              style={{ background: '#283583' }}>
              {downloading
                ? <><div className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: '#fff', borderTopColor: 'transparent' }} />Downloading...</>
                : <><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 2v8M5 8l3 3 3-3M3 13h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>Download PDF</>}
            </button>
          </div>
        )}
        <p className="text-xs text-center font-medium text-gray-500">
          Published by{' '}
          <Link href="/portfolio" className="font-black hover:underline" style={{ color: '#EF6203' }}>
            Simon Designs
          </Link>
        </p>
      </div>
    </div>
  );
}

// ── Main client component ─────────────────────────────────────────────────────

export default function IssueDetailClient({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [issue, setIssue] = useState<LeadershipReviewIssue | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    getLeadershipReviewBySlug(slug).then(setIssue).catch(console.error).finally(() => setLoading(false));
  }, [slug]);

  const handleDownload = async () => {
    if (!issue?.pdfFile?.asset?.url) return;
    setDownloading(true);
    await triggerDownload(
      issue.pdfFile.asset.url,
      `The-Leadership-Review-Vol${issue.volume}-Issue${issue.issueNumber}.pdf`
    );
    setDownloading(false);
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
      <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: '#283583', borderTopColor: 'transparent' }} />
      <p className="text-sm text-gray-400">Loading issue...</p>
    </div>
  );

  if (!issue) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-6">
        <h1 className="text-2xl font-black text-gray-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Issue Not Found</h1>
        <p className="text-sm text-gray-500 mb-6">We couldn&apos;t find the issue you&apos;re looking for.</p>
        <Link href="/the-leadership-review" className="inline-flex items-center text-sm font-bold gap-2" style={{ color: '#283583' }}>
          ← Back to All Issues
        </Link>
      </div>
    </div>
  );

  const reviewsSection = (
    <ReaderReviews
      reviews={issue.reviews || []}
      issueTitle={issue.title}
      issueId={issue._id}
    />
  );

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap');`}</style>
      <main className="min-h-screen bg-gray-50">
        <IssueMasthead issue={issue} />
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 pb-16 pt-6">

          {/* ── Desktop layout ── */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_300px] gap-8 items-start">
            <div>
              {issue.pdfFile?.asset?.url ? (
                <DesktopPdfViewer
                  pdfUrl={issue.pdfFile.asset.url}
                  title={issue.title}
                  onDownload={handleDownload}
                  downloading={downloading}
                  articleContent={issue.articleContent}
                />
              ) : (
                <div className="bg-white border border-gray-200 rounded-2xl flex items-center justify-center py-24">
                  <p className="text-sm text-gray-400 italic">PDF not yet available for this issue.</p>
                </div>
              )}
              {reviewsSection}
            </div>
            <div className="flex flex-col gap-4 sticky top-6">
              <IssueInfoPanel issue={issue} showDownload={true} onDownload={handleDownload} downloading={downloading} hideCover={false} />
              <ShareAndSupportCard title={issue.title} />
            </div>
          </div>

          {/* ── Mobile layout ── */}
          <div className="lg:hidden flex flex-col gap-4">
            <IssueInfoPanel issue={issue} showDownload={false} onDownload={handleDownload} downloading={downloading} hideCover={true} />
            {issue.pdfFile?.asset?.url ? (
              <MobilePdfViewer
                pdfUrl={issue.pdfFile.asset.url}
                title={issue.title}
                onDownload={handleDownload}
                downloading={downloading}
                articleContent={issue.articleContent}
              />
            ) : (
              <div className="bg-white border border-gray-200 rounded-2xl flex items-center justify-center py-16">
                <p className="text-sm text-gray-400 italic">PDF not yet available.</p>
              </div>
            )}
            <ShareAndSupportCard title={issue.title} />
            {reviewsSection}
          </div>

          <div className="mt-10 h-0.5" style={{ background: 'linear-gradient(to right, transparent, #EF6203, transparent)' }} />
          <div className="mt-6 text-center">
            <Link href="/the-leadership-review"
              className="inline-flex items-center text-sm font-bold gap-2 hover:opacity-70 transition-opacity"
              style={{ color: '#283583' }}>
              ← View All Issues
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}