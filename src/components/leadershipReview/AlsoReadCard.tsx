'use client';

import Link from 'next/link';
import type { LRRelatedIssue } from '@/types/leadershipReview';

// ── Also Read Card ────────────────────────────────────────────────────────────
// Matches the AllIssuesGrid card design exactly.
// Shown in the sidebar below ShareAndSupportCard when relatedIssue is set
// in Sanity Studio on the current issue.

export default function AlsoReadCard({ issue }: { issue: LRRelatedIssue }) {
  const href = `/the-leadership-review/${issue.slug.current}`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');
        .also-read-card { transition: all 0.3s ease; }
        .also-read-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.16), 0 4px 12px rgba(0,0,0,0.08) !important;
        }
        .also-read-cover {
          position: relative;
          width: 100%;
          padding-bottom: 120%;
          overflow: hidden;
          border-bottom: 1px solid #e5e7eb;
        }
        .also-read-cover > * {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>

      {/* Header bar — same style as all other sidebar cards */}
      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #e5e7eb', boxShadow: '0 10px 40px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.07)' }}>
        <div className="px-4 py-2.5 flex items-center gap-2" style={{ background: '#283583' }}>
          <div className="flex flex-col h-5 w-1 rounded-sm overflow-hidden flex-shrink-0">
            <div className="flex-1" style={{ background: '#006600' }} />
            <div className="flex-1" style={{ background: '#BB0000' }} />
            <div className="flex-1" style={{ background: '#000000' }} />
          </div>
          <p className="text-white text-xs font-black tracking-widest uppercase">Also Read</p>
        </div>

        <Link href={href} className="group block">
          <div
            className="also-read-card bg-white flex flex-col"
            style={{ boxShadow: 'none' }}
          >
            {/* Cover image — identical to AllIssuesGrid */}
            <div className="also-read-cover">
              {issue.coverImage?.asset?.url ? (
                <img
                  src={issue.coverImage.asset.url}
                  alt={`Cover of ${issue.title}`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: 'linear-gradient(135deg, #283583, #3fa535 60%, #cd171a)' }}
                >
                  {issue.title}
                </div>
              )}

              {/* Edition badge — same as grid card */}
              {issue.edition && (
                <span
                  className="text-white text-[10px] font-black px-2.5 py-1 rounded shadow-md tracking-wide"
                  style={{
                    background: '#EF6203',
                    position: 'absolute',
                    bottom: 10,
                    left: 10,
                    display: 'inline-block',
                    width: 'fit-content',
                    height: 'fit-content',
                    inset: 'unset',
                  }}
                >
                  {issue.edition}
                </span>
              )}
            </div>

            {/* Card content — matches AllIssuesGrid p-5 */}
            <div className="p-4 flex flex-col">

              {/* Title — red, Playfair, same as grid */}
              <h3
                className="text-sm font-black leading-tight mb-2 line-clamp-2"
                style={{ fontFamily: "'Playfair Display', serif", color: '#cd171a' }}
              >
                {issue.title}
              </h3>

              {/* Featured leader — same as grid */}
              {issue.featuredLeader && (
                <p className="text-xs text-gray-600 mb-1 leading-relaxed">
                  Featuring{' '}
                  <span className="font-bold" style={{ color: '#283583' }}>
                    {issue.featuredLeader}
                  </span>
                </p>
              )}

              {/* Summary — same as grid */}
              {issue.summary && (
                <p className="text-xs text-gray-500 line-clamp-3 mb-3 leading-relaxed">
                  {issue.summary}
                </p>
              )}

              {/* Full-bleed footer button — identical to AllIssuesGrid */}
              <div
                className="mt-auto -mx-4 -mb-4 px-4 py-2.5 flex items-center justify-between font-black text-xs tracking-widest uppercase text-white transition-opacity group-hover:opacity-90"
                style={{ background: '#283583' }}
              >
                <span>Read This Issue</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="white"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>

            </div>
          </div>
        </Link>
      </div>
    </>
  );
}