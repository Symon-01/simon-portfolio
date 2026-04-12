// FILE: src/components/LeadershipReviewWindow.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getFeaturedLeadershipReview } from '@/lib/sanity.queries';
import type { LeadershipReviewIssueSummary } from '@/types/leadershipReview';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-KE', {
    month: 'long',
    year: 'numeric',
  });
}

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

export default function LeadershipReviewWindow() {
  const [issue, setIssue] = useState<LeadershipReviewIssueSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    getFeaturedLeadershipReview()
      .then(setIssue)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleDownload() {
    if (!issue?.pdfFile?.asset?.url) return;
    setDownloading(true);
    const filename = `The-Leadership-Review-Vol${issue.volume}-Issue${issue.issueNumber}.pdf`;
    await triggerDownload(issue.pdfFile.asset.url, filename);
    setDownloading(false);
  }

  const badgeText = '★ LATEST ISSUE OUT NOW ★ READ THE LEADERSHIP REVIEW ★ ';
  const badgeRepeated = badgeText.repeat(6);

  const footerChunk = '📰 Published by Simon Designs  ★  Celebrating Exemplary Kenyan Leadership  ★  Ward · Constituency · County · National  ★  Your Number One Leadership Newspaper  ★  ';
  const footerRepeated = footerChunk.repeat(4);

  return (
    <section className="bg-white py-5">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap');

        @keyframes badge-ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .badge-ticker-track {
          display: inline-flex;
          white-space: nowrap;
          animation: badge-ticker 32s linear infinite;
          will-change: transform;
        }
        .badge-ticker-track:hover {
          animation-play-state: paused;
        }

        @keyframes footer-ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .footer-ticker-track {
          display: inline-flex;
          white-space: nowrap;
          animation: footer-ticker 58s linear infinite;
          will-change: transform;
        }
        .footer-ticker-track:hover {
          animation-play-state: paused;
        }

        @keyframes badge-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(205,23,26,0.7); }
          50%       { box-shadow: 0 0 0 7px rgba(205,23,26,0); }
        }
        .badge-glow {
          animation: badge-glow 1.8s ease-in-out infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.15; }
        }
        .live-dot {
          animation: blink 1s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 sm:px-4 lg:px-12">

        {/* ── Section intro ─────────────────────────────────── */}
        <div className="text-center mb-8">
          <p className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: '#3fa535' }}>
            Simon Designs Editorial Publications
          </p>
          <h2
            className="text-4xl sm:text-5xl font-black leading-none mb-3 select-none"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span style={{ color: '#000000' }}>The</span>{' '}
            <span style={{ color: '#283583' }}>L</span>
            <span style={{ color: '#3fa535' }}>eadership</span>{' '}
            <span style={{ color: '#cd171a' }}>Review</span>
          </h2>
          <p className="text-base text-gray-500 mt-1">
            Our self-published newspaper celebrating exemplary Kenyan leadership
          </p>
          <div className="flex flex-col items-center gap-0.5 mt-5">
            <div className="w-24 h-1 rounded" style={{ background: '#283583' }} />
            <div className="w-16 h-0.5 rounded" style={{ background: '#cd171a' }} />
            <div className="w-8 h-0.5 rounded" style={{ background: '#3fa535' }} />
          </div>
        </div>

        {/* ── Main card ─────────────────────────────────────── */}
        <div
          style={{
            border: '1.5px solid #283583',
            borderRadius: '0',
            overflow: 'hidden',
          }}
        >

          {/* ── Header bar ── */}
          <div
            className="flex items-center justify-between gap-4 px-5 sm:px-7 py-4"
            style={{ background: '#283583' }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex flex-col h-10 w-1.5 overflow-hidden flex-shrink-0">
                <div className="flex-1" style={{ background: '#006600' }} />
                <div className="flex-1" style={{ background: '#BB0000' }} />
                <div className="flex-1" style={{ background: '#000000' }} />
              </div>
              <div className="min-w-0">
                <p
                  className="text-white font-black text-base sm:text-lg leading-none"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  The Leadership Review
                </p>
                <p className="text-white text-xs tracking-widest uppercase mt-1 hidden sm:block font-semibold opacity-90">
                  Your Number One Newspaper for Celebrating Exemplary Leadership
                </p>
              </div>
            </div>

            {/* Breaking news ticker badge */}
            <div
              className="badge-glow flex-shrink-0 flex items-center overflow-hidden"
              style={{
                background: '#cd171a',
                border: '2px solid #ffffff',
                borderRadius: '999px',
                height: '36px',
                minWidth: '200px',
                maxWidth: '240px',
              }}
            >
              <div
                className="flex items-center gap-1.5 px-3 h-full flex-shrink-0"
                style={{
                  background: '#ffffff',
                  borderRadius: '999px 0 0 999px',
                }}
              >
                <span className="live-dot w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#cd171a' }} />
                <span className="text-xs font-black tracking-widest uppercase" style={{ color: '#cd171a' }}>
                  NEW
                </span>
              </div>
              <div className="overflow-hidden flex-1">
                <div className="badge-ticker-track">
                  <span className="text-white text-xs font-bold tracking-wide px-2">{badgeRepeated}</span>
                  <span className="text-white text-xs font-bold tracking-wide px-2">{badgeRepeated}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Issue body ── */}
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 bg-white">
              <div
                className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin"
                style={{ borderColor: '#283583', borderTopColor: 'transparent' }}
              />
              <p className="text-sm text-gray-400">Loading latest issue...</p>
            </div>
          ) : issue ? (
            <div className="grid md:grid-cols-[220px_1fr] bg-white">

              {/* Cover — smaller column + image to reduce overall card height */}
              <div
                className="border-b md:border-b-0 md:border-r flex items-center justify-center relative"
                style={{
                  background: '#f7f8ff',
                  borderColor: '#e0e4f0',
                  padding: '10px',
                  minHeight: '160px',
                }}
              >
                <span
                  className="absolute top-3 left-3 text-white text-xs font-bold px-2.5 py-1 z-10"
                  style={{ background: '#EF6203', borderRadius: '6px' }}
                >
                  {formatDate(issue.publishedDate)}
                </span>

                {issue.coverImage?.asset?.url ? (
                  <img
                    src={issue.coverImage.asset.url}
                    alt={`Cover — ${issue.title}`}
                    style={{
                      width: '100%',
                      maxWidth: '170px',
                      height: 'auto',
                      display: 'block',
                      margin: '0 auto',
                      borderRadius: '4px',
                      boxShadow: '4px 4px 0 #b0b8d8, 8px 8px 0 #d0d5ea',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '170px',
                      aspectRatio: '3/4',
                      background: 'linear-gradient(145deg, #283583, #3fa535 60%, #cd171a)',
                      boxShadow: '4px 4px 0 #ccc, 8px 8px 0 #ddd',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: '600',
                      textAlign: 'center',
                      padding: '12px',
                    }}
                  >
                    Vol. {issue.volume} · Issue {issue.issueNumber}
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="p-5 sm:p-6 flex flex-col justify-between gap-3">
                <div>
                  <p
                    className="text-xs font-bold tracking-widest uppercase mb-2"
                    style={{ color: '#283583', opacity: 0.6 }}
                  >
                    Vol. {issue.volume} · Issue {issue.issueNumber} · {formatDate(issue.publishedDate)}
                  </p>

                  <h3
                    className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {issue.title}
                  </h3>

                  {issue.featuredLeader && (
                    <p className="text-sm text-gray-500 mb-3">
                      Featuring{' '}
                      <span className="font-bold" style={{ color: '#283583' }}>
                        {issue.featuredLeader}
                      </span>
                      {issue.leaderTitle && (
                        <span className="text-gray-400"> · {issue.leaderTitle}</span>
                      )}
                    </p>
                  )}

                  {issue.summary && (
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-3">
                      {issue.summary}
                    </p>
                  )}

                  {issue.tags && issue.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {issue.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-0.5 font-medium"
                          style={{
                            border: '1px solid #283583',
                            color: '#283583',
                            background: 'rgba(40,53,131,0.06)',
                            borderRadius: '999px',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3 flex-wrap">
                  <Link
                    href={`/the-leadership-review/${issue.slug.current}`}
                    className="text-sm font-bold text-white px-6 py-2.5 transition-opacity hover:opacity-90"
                    style={{ background: '#283583', borderRadius: '10px' }}
                  >
                    Read Full Issue
                  </Link>

                  {issue.pdfFile?.asset?.url && (
                    <button
                      onClick={handleDownload}
                      disabled={downloading}
                      className="text-sm font-semibold border px-5 py-2.5 flex items-center gap-2 transition-colors disabled:opacity-60"
                      style={{
                        color: '#cd171a',
                        borderColor: '#cd171a',
                        background: 'rgba(205,23,26,0.05)',
                        borderRadius: '10px',
                      }}
                    >
                      {downloading ? (
                        <>
                          <div
                            className="w-3.5 h-3.5 rounded-full border border-t-transparent animate-spin"
                            style={{ borderColor: '#cd171a', borderTopColor: 'transparent' }}
                          />
                          Downloading...
                        </>
                      ) : (
                        <>
                          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                            <path
                              d="M8 2v8M5 8l3 3 3-3M3 13h10"
                              stroke="#cd171a"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Download PDF
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 gap-3 bg-white">
              <p className="text-sm font-semibold text-gray-700">First issue coming soon</p>
              <p className="text-xs text-gray-400">The Leadership Review is being prepared.</p>
            </div>
          )}

          {/* ── Footer ticker bar ── */}
          <div
            className="flex items-stretch overflow-hidden"
            style={{ background: '#3fa535', minHeight: '42px' }}
          >
            <div
              className="flex items-center gap-2 px-4 flex-shrink-0"
              style={{
                background: '#2d8a25',
                borderRight: '1.5px solid rgba(255,255,255,0.3)',
              }}
            >
              <span className="live-dot w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#ffffff' }} />
              <span className="text-white text-xs font-black tracking-widest uppercase whitespace-nowrap">
                Simon Designs
              </span>
            </div>

            <div className="overflow-hidden flex-1 flex items-center">
              <div className="footer-ticker-track">
                <span className="text-white text-xs font-semibold tracking-wide">{footerRepeated}</span>
                <span className="text-white text-xs font-semibold tracking-wide">{footerRepeated}</span>
              </div>
            </div>

            <Link
              href="/the-leadership-review"
              className="flex items-center gap-2 px-5 flex-shrink-0 font-black text-xs tracking-wide uppercase whitespace-nowrap transition-opacity hover:opacity-80"
              style={{
                background: '#cd171a',
                color: '#ffffff',
                borderLeft: '1.5px solid rgba(255,255,255,0.3)',
              }}
            >
              View All Issues →
            </Link>
          </div>

        </div>
        {/* end card */}

      </div>
    </section>
  );
}