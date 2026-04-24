// FILE: src/components/leadershipReview/IssueMasthead.tsx
'use client';

import Link from 'next/link';
import type { LeadershipReviewIssue } from '@/types/leadershipReview';

export default function IssueMasthead({ issue }: { issue: LeadershipReviewIssue }) {
  const bgImageUrl = issue.mastheadBackground?.asset?.url;

  return (
    <div className="relative border-b border-gray-100 overflow-hidden">

      {/* ── Background image layer (only renders when image is set in Sanity) ── */}
      {bgImageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${bgImageUrl}')` }}
        >
          {/* White overlay — keeps all existing newspaper text fully readable.
              Adjust opacity (bg-white/70, bg-white/85, etc.) to taste. */}
          <div className="absolute inset-0 bg-white/90" />
        </div>
      )}

      {/* ── Existing masthead content — untouched, just lifted above the bg ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-3 sm:py-4 relative z-10">
        <div
          className="flex items-center justify-between pb-2 sm:pb-3"
          style={{ borderBottom: '3px solid #111', fontSize: 'clamp(7px, 2.8vw, 13px)', color: '#444' }}
        >
          <div className="flex items-center gap-1.5 sm:gap-4 flex-nowrap min-w-0">
            <span style={{ whiteSpace: 'nowrap' }}>{issue.edition || 'Special Edition'}</span>
            <span>|</span>
            <span style={{ whiteSpace: 'nowrap' }}>Free Digital Edition</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0 ml-2">
            <span className="hidden sm:inline">www.simondesigns.co.ke</span>
            <span className="hidden sm:inline">|</span>
            <span style={{ whiteSpace: 'nowrap' }}>Vol. {issue.volume} · No. {issue.issueNumber}</span>
          </div>
        </div>

        <p
          className="text-center font-bold tracking-widest uppercase pt-2 sm:pt-3 pb-1"
          style={{ color: '#283583', fontSize: 'clamp(9px, 1.5vw, 13px)' }}
        >
          Your Number One Newspaper for Celebrating Exemplary Leadership
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '-2px' }}>
          <span style={{ fontFamily: "'Playfair Display', serif", color: '#000', fontWeight: 900, fontSize: 'clamp(14px, 2.6vw, 30px)', lineHeight: 1, display: 'block', paddingLeft: '0.08em' }}>The</span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, lineHeight: 0.88, whiteSpace: 'nowrap', fontSize: 'clamp(32px, 10.5vw, 120px)', display: 'block', marginBottom: '4px', letterSpacing: '-0.01em' }}>
            <span style={{ color: '#283583' }}>L</span><span style={{ color: '#3fa535' }}>eadership</span>{' '}
            <span style={{ color: '#cd171a' }}>Review</span>
          </span>
        </div>

        <div style={{ height: '4px', background: '#283583', marginTop: 'clamp(4px, 2vw, 18px)' }} />
        <div style={{ margin: '2px 0', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div style={{ height: '3px', background: '#283583' }} />
          <div style={{ height: '1px', background: '#283583', opacity: 0.45 }} />
        </div>
        <div style={{ height: '6px' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: 'clamp(6px,1vw,10px) clamp(8px,1.2vw,14px)', background: 'linear-gradient(135deg,#283583,#1a2460)' }}>
          <span style={{ background: '#EF6203', color: '#fff', fontWeight: 900, fontSize: 'clamp(8px,1vw,12px)', padding: '2px 8px', borderRadius: '3px', whiteSpace: 'nowrap', flexShrink: 0 }}>
            {issue.edition || 'Special Edition'}
          </span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#fff', fontSize: 'clamp(11px,1.8vw,20px)', lineHeight: 1.2 }}>{issue.title}</span>
        </div>

        <div style={{ height: '4px' }} />
        <div style={{ height: '6px', background: '#cd171a', marginBottom: '10px' }} />

        <div className="flex items-start justify-between flex-wrap gap-1 sm:gap-2" style={{ fontSize: 'clamp(12px,1.5vw,15px)' }}>
          <div className="flex flex-col gap-1">
            <p style={{ color: '#666', margin: 0, fontStyle: 'italic' }}>
              Published by{' '}
              <Link href="/portfolio" className="font-semibold hover:underline" style={{ color: '#283583' }}>Simon Designs</Link>
            </p>
            <Link href="/the-leadership-review" className="font-semibold flex items-center gap-1 hover:gap-2 transition-all" style={{ color: '#EF6203', fontSize: 'clamp(13px,1.6vw,16px)' }}>
              ← Back to All Issues
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}