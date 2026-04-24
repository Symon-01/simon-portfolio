'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllLeadershipReviewIssues, getBannerByLocation } from '@/lib/sanity.queries';
import type { LeadershipReviewIssueSummary } from '@/types/leadershipReview';
import AllIssuesGrid from '@/components/leadershipReview/AllIssuesGrid';
import SupportButton from '@/components/SupportButton';

// ── Masthead ────────────────────────────────────────────────────────────────

function Masthead({ bgImageUrl }: { bgImageUrl?: string }) {
  return (
    <div className="relative border-b border-gray-100 overflow-hidden">

      {/* ── Background image layer (only renders when image is set in Sanity) ── */}
      {bgImageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${bgImageUrl}')` }}
        >
          {/* White overlay — keeps all existing newspaper text fully readable.
              Adjust the opacity class (bg-white/70, bg-white/85, etc.) to taste. */}
          <div className="absolute inset-0 bg-white/82" />
        </div>
      )}

      {/* ── All existing masthead content — untouched, lifted above the bg ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-3 sm:py-4 relative z-10">

        {/* ── Top bar ── */}
        <div
          className="flex items-center justify-between pb-2 sm:pb-3"
          style={{ borderBottom: '3px solid #111', fontSize: 'clamp(7px, 2.8vw, 13px)', color: '#444' }}
        >
          <div className="flex items-center gap-1.5 sm:gap-4 flex-nowrap min-w-0">
            <span style={{ color: '#283583', fontWeight: 700, whiteSpace: 'nowrap' }}>
              {new Date().toLocaleDateString('en-KE', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span style={{ flexShrink: 0 }}>|</span>
            <span style={{ whiteSpace: 'nowrap' }}>Free Digital Edition</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0 ml-2">
            <span className="hidden sm:inline" style={{ whiteSpace: 'nowrap' }}>www.simondesigns.co.ke</span>
            <span className="hidden sm:inline">|</span>
            <span style={{ whiteSpace: 'nowrap' }}>@TheLeadershipReview</span>
          </div>
        </div>

        {/* ── Tagline ── */}
        <p
          className="text-center font-bold tracking-widest uppercase pt-2 sm:pt-3 pb-1"
          style={{ color: '#283583', fontSize: 'clamp(9px, 1.5vw, 13px)', letterSpacing: '0.08em' }}
        >
          Your Number One Newspaper for Celebrating Exemplary Leadership
        </p>

        {/* ── Title block ── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingBottom: '0px', marginTop: '-2px' }}>
          <span style={{ fontFamily: "'Playfair Display', serif", color: '#000000', fontWeight: 900, fontSize: 'clamp(14px, 2.6vw, 30px)', lineHeight: 1, display: 'block', marginBottom: '-0.02em', paddingLeft: '0.08em' }}>
            The
          </span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontStyle: 'normal', lineHeight: 0.88, whiteSpace: 'nowrap', fontSize: 'clamp(32px, 10.5vw, 120px)', display: 'block', marginTop: '-0.02em', marginBottom: '4px', letterSpacing: '-0.01em' }}>
            <span style={{ color: '#283583' }}>L</span>
            <span style={{ color: '#3fa535' }}>eadership</span>
            {' '}
            <span style={{ color: '#cd171a' }}>Review</span>
          </span>
        </div>

        {/* ── Stroke rules ── */}
        <div style={{ height: '4px', background: '#283583', marginTop: 'clamp(4px, 2vw, 18px)' }} />
        <div style={{ marginTop: '2px', marginBottom: '2px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div style={{ height: '3px', background: '#283583' }} />
          <div style={{ height: '1px', background: '#283583', opacity: 0.45 }} />
        </div>
        <div style={{ height: '6px' }} />

        {/* ── Three independent cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>

          {/* Card 1 — Red */}
          <div style={{ display: 'flex', overflow: 'hidden', border: '1px solid #ddd' }}>
            <div style={{ background: '#cd171a', padding: 'clamp(5px, 0.8vw, 10px) clamp(6px, 0.9vw, 10px)', width: '50%', flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#fff', fontSize: 'clamp(8px, 1.1vw, 14px)', lineHeight: 1.25, margin: '0 0 4px 0' }}>Proven Impact</p>
              <p style={{ color: '#fff', fontSize: 'clamp(7px, 0.85vw, 11px)', lineHeight: 1.4, opacity: 0.9, margin: 0 }}>Leaders with measurable, documented results on the ground</p>
            </div>
            <div style={{ flex: 1, overflow: 'hidden', minHeight: 'clamp(60px, 7.5vw, 90px)' }}>
              <img src="Image 1.jpeg" alt="Proven Impact" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>

          {/* Card 2 — Green */}
          <div style={{ display: 'flex', overflow: 'hidden', border: '1px solid #ddd' }}>
            <div style={{ background: '#3a7d3a', padding: 'clamp(5px, 0.8vw, 10px) clamp(6px, 0.9vw, 10px)', width: '50%', flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#fff', fontSize: 'clamp(8px, 1.1vw, 14px)', lineHeight: 1.25, margin: '0 0 4px 0' }}>Across Kenya</p>
              <p style={{ color: '#fff', fontSize: 'clamp(7px, 0.85vw, 11px)', lineHeight: 1.4, opacity: 0.9, margin: 0 }}>Exemplary performers at every level of public service</p>
            </div>
            <div style={{ flex: 1, overflow: 'hidden', minHeight: 'clamp(60px, 7.5vw, 90px)' }}>
              <img src="Image 2.jpg" alt="Across Kenya" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>

          {/* Card 3 — Blue */}
          <div style={{ display: 'flex', overflow: 'hidden', border: '1px solid #ddd' }}>
            <div style={{ background: '#283583', padding: 'clamp(5px, 0.8vw, 10px) clamp(6px, 0.9vw, 10px)', width: '50%', flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#fff', fontSize: 'clamp(8px, 1.1vw, 14px)', lineHeight: 1.25, margin: '0 0 4px 0' }}>Their Story, Told Right</p>
              <p style={{ color: '#fff', fontSize: 'clamp(7px, 0.85vw, 11px)', lineHeight: 1.4, opacity: 0.9, margin: 0 }}>In-depth profiles that go beyond politics to celebrate real service</p>
            </div>
            <div style={{ flex: 1, overflow: 'hidden', minHeight: 'clamp(60px, 7.5vw, 90px)' }}>
              <img src="Image 3.jpeg" alt="Their Story, Told Right" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>

        </div>

        <div style={{ height: '6px' }} />
        <div style={{ height: '6px', background: '#cd171a', marginBottom: '10px' }} />

        {/* ── Sub-bar ── */}
        <div className="flex items-start justify-between flex-wrap gap-1 sm:gap-2" style={{ fontSize: 'clamp(12px, 1.5vw, 15px)' }}>
          <div className="flex flex-col gap-1">
            <p style={{ color: '#666', margin: 0, fontStyle: 'italic' }}>
              Published by{' '}
              <Link href="/portfolio" className="font-semibold hover:underline" style={{ color: '#283583' }}>Simon Designs</Link>
            </p>
            <Link href="/portfolio" className="font-semibold flex items-center gap-1 hover:gap-2 transition-all" style={{ color: '#EF6203', fontSize: 'clamp(13px, 1.6vw, 16px)' }}>
              ← Back to Portfolio
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

// ── CTA strip ───────────────────────────────────────────────────────────────

function CTAStrip() {
  return (
    <div
      className="rounded-2xl p-5 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 mt-12"
      style={{ background: 'linear-gradient(135deg, #283583 0%, #1a2460 100%)' }}
    >
      <div className="text-white text-center sm:text-left">
        <p className="text-base sm:text-lg font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
          Know a leader worth celebrating?
        </p>
        <p className="text-xs opacity-70">
          Nominate a ward, constituency, county or national leader for a future edition.
        </p>
      </div>
      <Link
        href="/contact"
        className="flex-shrink-0 text-sm font-bold px-6 py-3 rounded-xl transition-opacity hover:opacity-90 whitespace-nowrap"
        style={{ background: '#EF6203', color: 'white' }}
      >
        Nominate a Leader →
      </Link>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function LeadershipReviewPageClient() {
  const [issues, setIssues] = useState<LeadershipReviewIssueSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [mastheadBgUrl, setMastheadBgUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Fetch issues and masthead background in parallel
    Promise.all([
      getAllLeadershipReviewIssues(),
      getBannerByLocation('leadership-review'),
    ]).then(([issuesData, banner]) => {
      setIssues(issuesData);
      const url = banner?.images?.[0]?.image?.asset?.url;
      if (url) setMastheadBgUrl(url);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap');
      `}</style>

      <main>
        <Masthead bgImageUrl={mastheadBgUrl} />

        <section className="py-10 bg-gray-50 min-h-screen">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">

            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, #283583, transparent)' }} />
              <h2 className="text-base sm:text-lg font-bold text-gray-800 px-2 whitespace-nowrap" style={{ fontFamily: "'Playfair Display', serif" }}>
                All Published Issues
              </h2>
              <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, #283583, transparent)' }} />
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: '#283583', borderTopColor: 'transparent' }} />
                <p className="text-sm text-gray-400">Loading issues...</p>
              </div>
            ) : (
              <AllIssuesGrid issues={issues} />
            )}

            <CTAStrip />

            <div className="mt-12 flex justify-center">
              <SupportButton position="bottom" />
            </div>
            <div className="mt-8 h-0.5" style={{ background: 'linear-gradient(to right, transparent, #EF6203, transparent)' }} />

          </div>
        </section>
      </main>
    </>
  );
}