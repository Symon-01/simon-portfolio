// FILE: src/app/the-leadership-review/LeadershipReviewPageClient.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllLeadershipReviewIssues } from '@/lib/sanity.queries';
import type { LeadershipReviewIssueSummary } from '@/types/leadershipReview';
import AllIssuesGrid from '@/components/leadershipReview/AllIssuesGrid';
import SupportButton from '@/components/SupportButton';

// ── Masthead ────────────────────────────────────────────────────────────────

function Masthead() {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-3 sm:py-4">

        {/* Top bar */}
        <div className="flex items-center justify-between text-xs text-gray-400 pb-2 sm:pb-3 border-b border-gray-100 flex-wrap gap-1 sm:gap-2">
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-[10px] sm:text-xs">
              {new Date().toLocaleDateString('en-KE', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">Free Digital Edition</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-3">
            <span className="text-[10px] sm:text-xs">www.simondesigns.co.ke</span>
            <span className="text-[10px] sm:text-xs">|</span>
            <span className="text-[10px] sm:text-xs">@TheLeadershipReview</span>
          </div>
        </div>

        {/* Tagline */}
        <p
          className="text-center font-bold tracking-widest uppercase pt-2 sm:pt-3 pb-1.5 sm:pb-2"
          style={{
            color: '#283583',
            fontSize: 'clamp(7px, 1.8vw, 11px)',
            letterSpacing: '0.08em',
          }}
        >
          Your Number One Newspaper for Celebrating Exemplary Leadership
        </p>

        {/* ── DESKTOP title: flag stripes in flex row ── */}
        <div className="hidden sm:flex items-center justify-center pb-3">
          <div
            className="flex flex-col overflow-hidden mr-4 flex-shrink-0"
            style={{ height: '80px', width: '6px' }}
          >
            <div className="flex-1" style={{ background: '#006600' }} />
            <div className="flex-1" style={{ background: '#BB0000' }} />
            <div className="flex-1" style={{ background: '#000000' }} />
          </div>

          <h1
            className="font-black leading-none select-none text-center"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(48px, 7vw, 72px)',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ color: '#000000' }}>The</span>{' '}
            <span style={{ color: '#283583' }}>L</span>
            <span style={{ color: '#3fa535' }}>eadership</span>{' '}
            <span style={{ color: '#cd171a' }}>Review</span>
          </h1>

          <div
            className="flex flex-col overflow-hidden ml-4 flex-shrink-0"
            style={{ height: '80px', width: '6px' }}
          >
            <div className="flex-1" style={{ background: '#006600' }} />
            <div className="flex-1" style={{ background: '#BB0000' }} />
            <div className="flex-1" style={{ background: '#000000' }} />
          </div>
        </div>

        {/* ── MOBILE title: flag stripes absolutely positioned so h1 = full width ── */}
        <div className="sm:hidden relative flex items-center justify-center pb-2">
          {/* Flag stripe left — absolutely positioned, doesn't affect h1 width */}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col overflow-hidden flex-shrink-0"
            style={{ height: '38px', width: '4px' }}
          >
            <div className="flex-1" style={{ background: '#006600' }} />
            <div className="flex-1" style={{ background: '#BB0000' }} />
            <div className="flex-1" style={{ background: '#000000' }} />
          </div>

          {/* h1 spans full container width — matches rule lines below exactly */}
          <h1
            className="font-black leading-none select-none text-center w-full block"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '8vw',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ color: '#000000' }}>The</span>{' '}
            <span style={{ color: '#283583' }}>L</span>
            <span style={{ color: '#3fa535' }}>eadership</span>{' '}
            <span style={{ color: '#cd171a' }}>Review</span>
          </h1>

          {/* Flag stripe right — absolutely positioned */}
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col overflow-hidden flex-shrink-0"
            style={{ height: '38px', width: '4px' }}
          >
            <div className="flex-1" style={{ background: '#006600' }} />
            <div className="flex-1" style={{ background: '#BB0000' }} />
            <div className="flex-1" style={{ background: '#000000' }} />
          </div>
        </div>

        {/* Rule lines — full container width, matches h1 above on both desktop and mobile */}
        <div className="flex flex-col gap-0.5 pb-1.5 sm:pb-2">
          <div className="h-1" style={{ background: '#283583' }} />
          <div className="h-0.5" style={{ background: '#cd171a' }} />
        </div>

        {/* Sub-bar */}
        <div className="flex items-center justify-between pt-1.5 sm:pt-2 flex-wrap gap-1 sm:gap-2">
          <p className="text-[10px] sm:text-xs text-gray-400">
            Published by{' '}
            <Link
              href="/portfolio"
              className="font-semibold hover:underline"
              style={{ color: '#283583' }}
            >
              Simon Designs
            </Link>
            {' '}· Othaya, Nyeri County, Kenya
          </p>
          <Link
            href="/portfolio"
            className="text-[10px] sm:text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all"
            style={{ color: '#EF6203' }}
          >
            ← Back to Portfolio
          </Link>
        </div>

      </div>
    </div>
  );
}

// ── Mission strip ────────────────────────────────────────────────────────────

function MissionStrip() {
  const items = [
    {
      emoji: '🏆',
      label: 'Proven Impact',
      desc: 'Leaders with measurable, documented results on the ground',
    },
    {
      emoji: '🌍',
      label: 'Across Kenya',
      desc: 'Exemplary performers at every level of public service',
    },
    {
      emoji: '📰',
      label: 'Their Story, Told Right',
      desc: 'In-depth profiles that go beyond politics to celebrate real service',
    },
  ];

  return (
    <div className="py-3 sm:py-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">

        {/* Desktop: horizontal three-column grid */}
        <div
          className="hidden sm:grid sm:grid-cols-3 gap-0 text-center text-white overflow-hidden"
          style={{ background: '#283583', borderRadius: '12px' }}
        >
          {items.map(({ emoji, label, desc }, i, arr) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 py-5 px-4"
              style={{
                borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.15)' : 'none',
              }}
            >
              <span className="text-2xl">{emoji}</span>
              <p className="text-xs font-bold tracking-wide uppercase opacity-90">{label}</p>
              <p className="text-xs opacity-60 max-w-[180px]">{desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile: compact horizontal strip — emoji + short label only */}
        <div
          className="sm:hidden flex items-stretch overflow-hidden"
          style={{ background: '#283583', borderRadius: '10px' }}
        >
          {items.map(({ emoji, label }, i, arr) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center gap-1 py-3 flex-1 px-1"
              style={{
                borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.15)' : 'none',
              }}
            >
              <span style={{ fontSize: '16px' }}>{emoji}</span>
              <p
                className="font-bold text-white text-center leading-tight"
                style={{ fontSize: '8px', letterSpacing: '0.04em', opacity: 0.95 }}
              >
                {label.toUpperCase()}
              </p>
            </div>
          ))}
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
        <p
          className="text-base sm:text-lg font-bold mb-1"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
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

  useEffect(() => {
    getAllLeadershipReviewIssues()
      .then(setIssues)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap');
      `}</style>

      <main>
        <Masthead />
        <MissionStrip />

        <section className="py-10 bg-gray-50 min-h-screen">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">

            <div className="flex items-center gap-4 mb-8">
              <div
                className="h-px flex-1"
                style={{ background: 'linear-gradient(to right, #283583, transparent)' }}
              />
              <h2
                className="text-base sm:text-lg font-bold text-gray-800 px-2 whitespace-nowrap"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                All Published Issues
              </h2>
              <div
                className="h-px flex-1"
                style={{ background: 'linear-gradient(to left, #283583, transparent)' }}
              />
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div
                  className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
                  style={{ borderColor: '#283583', borderTopColor: 'transparent' }}
                />
                <p className="text-sm text-gray-400">Loading issues...</p>
              </div>
            ) : (
              <AllIssuesGrid issues={issues} />
            )}

            <CTAStrip />

            <div className="mt-12 flex justify-center">
              <SupportButton position="bottom" />
            </div>
            <div
              className="mt-8 h-0.5"
              style={{ background: 'linear-gradient(to right, transparent, #EF6203, transparent)' }}
            />

          </div>
        </section>
      </main>
    </>
  );
}