'use client';

import Link from 'next/link';
import type { LRRelatedIssue } from '@/types/leadershipReview';

// ── Also Read Card ────────────────────────────────────────────────────────────
// Shown in the sidebar below ShareAndSupportCard when a relatedIssue is set
// in Sanity Studio on the current issue.

export default function AlsoReadCard({ issue }: { issue: LRRelatedIssue }) {
  const href = `/the-leadership-review/${issue.slug.current}`;

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: '1.5px solid #283583' }}
    >
      {/* Header bar — matches the style of all sidebar cards */}
      <div className="px-4 py-2.5 flex items-center gap-2" style={{ background: '#283583' }}>
        <div className="flex flex-col h-5 w-1 rounded-sm overflow-hidden flex-shrink-0">
          <div className="flex-1" style={{ background: '#006600' }} />
          <div className="flex-1" style={{ background: '#BB0000' }} />
          <div className="flex-1" style={{ background: '#000000' }} />
        </div>
        <p className="text-white text-xs font-black tracking-widest uppercase">Also Read</p>
      </div>

      {/* Cover image */}
      {issue.coverImage?.asset?.url && (
        <Link href={href} className="block relative overflow-hidden" style={{ height: '180px' }}>
          <img
            src={issue.coverImage.asset.url}
            alt={`Cover — ${issue.title}`}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {/* Edition badge */}
          {issue.edition && (
            <span
              className="absolute bottom-3 left-3 text-white text-xs font-black px-2.5 py-1 rounded"
              style={{ background: '#EF6203' }}
            >
              {issue.edition}
            </span>
          )}
          {/* Gradient overlay for readability */}
          <div
            className="absolute bottom-0 left-0 right-0 h-16"
            style={{ background: 'linear-gradient(to top, rgba(40,53,131,0.7), transparent)' }}
          />
        </Link>
      )}

      {/* Content */}
      <div className="bg-white p-4 flex flex-col gap-2">
        <Link href={href} className="group">
          <h3
            className="text-sm font-black leading-snug group-hover:opacity-75 transition-opacity"
            style={{ fontFamily: "'Playfair Display', serif", color: '#cd171a' }}
          >
            {issue.title}
          </h3>
        </Link>

        {issue.featuredLeader && (
          <p className="text-xs font-semibold" style={{ color: '#283583' }}>
            Featuring{' '}
            <span className="font-black">{issue.featuredLeader}</span>
          </p>
        )}

        {issue.summary && (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
            {issue.summary}
          </p>
        )}

        <Link
          href={href}
          className="mt-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-white text-xs font-black hover:opacity-90 transition-opacity"
          style={{ background: '#283583' }}
        >
          Read This Issue
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  );
}