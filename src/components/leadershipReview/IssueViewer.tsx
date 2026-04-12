// FILE: src/components/leadershipReview/IssueViewer.tsx
'use client';

import { useState } from 'react';

interface IssueViewerProps {
  pdfUrl: string;
  title: string;
}

export default function IssueViewer({ pdfUrl, title }: IssueViewerProps) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-full">

      {/* Toolbar */}
      <div
        className="flex items-center justify-between px-5 py-3 rounded-t-xl"
        style={{ background: '#283583' }}
      >
        <div className="flex items-center gap-2">
          {/* Mini Kenyan flag stripes */}
          <div className="flex flex-col h-8 w-1 rounded-sm overflow-hidden flex-shrink-0">
            <div className="flex-1" style={{ background: '#006600' }} />
            <div className="flex-1" style={{ background: '#BB0000' }} />
            <div className="flex-1" style={{ background: '#000000' }} />
          </div>
          <span
            className="text-white font-bold text-sm"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {title}
          </span>
        </div>

        <a
          href={pdfUrl}
          download
          className="flex items-center gap-2 text-xs font-semibold text-white border border-white/30 rounded-lg px-3 py-1.5 hover:bg-white/10 transition-colors"
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

      {/* PDF embed */}
      <div
        className="relative w-full border border-gray-200 rounded-b-xl overflow-hidden"
        style={{ height: '780px' }}
      >
        {loading && (
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
          className="w-full h-full"
          title={title}
          onLoad={() => setLoading(false)}
        />
      </div>

      {/* Mobile fallback — iframes don't render well on small screens */}
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