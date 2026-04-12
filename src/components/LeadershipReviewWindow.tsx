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

  const DownloadButton = ({ size }: { size: 'sm' | 'md' }) => (
    <button
      onClick={handleDownload}
      disabled={downloading}
      className={size === 'sm' ? 'lr-btn-secondary' : 'lr-btn-secondary-md'}
    >
      {downloading ? (
        <>
          <div
            className="w-3 h-3 rounded-full border border-t-transparent animate-spin"
            style={{ borderColor: '#cd171a', borderTopColor: 'transparent' }}
          />
          Downloading...
        </>
      ) : (
        <>
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v8M5 8l3 3 3-3M3 13h10" stroke="#cd171a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Download PDF
        </>
      )}
    </button>
  );

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
        .badge-ticker-track:hover { animation-play-state: paused; }

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
        .footer-ticker-track:hover { animation-play-state: paused; }

        @keyframes badge-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(205,23,26,0.7); }
          50%       { box-shadow: 0 0 0 7px rgba(205,23,26,0); }
        }
        .badge-glow { animation: badge-glow 1.8s ease-in-out infinite; }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.15; }
        }
        .live-dot { animation: blink 1s ease-in-out infinite; }

        /* ─── Header bar ─── */
        .lr-header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 11px 14px;
        }
        @media (min-width: 640px) {
          .lr-header-inner { padding: 16px 28px; gap: 16px; }
        }

        .lr-badge {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: #cd171a;
          border: 2px solid #ffffff;
          border-radius: 999px;
          height: 28px;
          width: 120px;
        }
        @media (min-width: 400px) { .lr-badge { width: 150px; height: 30px; } }
        @media (min-width: 640px) { .lr-badge { width: 240px; height: 36px; } }

        .lr-header-subtitle { display: none; }
        @media (min-width: 640px) { .lr-header-subtitle { display: block; } }

        /* ─── Issue body wrapper ───
           Mobile: flex column (top-row + bottom-row stacked)
           Desktop: CSS grid with cover | details side by side
        ─── */
        .lr-issue-body {
          display: flex;
          flex-direction: column;
          background: white;
        }
        @media (min-width: 768px) {
          .lr-issue-body {
            display: grid;
            grid-template-columns: 220px minmax(0, 1fr);
            grid-template-rows: auto;
          }
        }

        /* ─── Top row: cover + meta, side by side on mobile ─── */
        .lr-top-row {
          display: flex;
          flex-direction: row;
          align-items: stretch;
        }
        @media (min-width: 768px) {
          /* Dissolve into grid — cover and details each become their own grid cell */
          .lr-top-row { display: contents; }
        }

        /* ─── Cover panel ─── */
        .lr-cover-panel {
          position: relative;
          background: #f7f8ff;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          /* Mobile: narrow fixed-width left column */
          width: 108px;
          padding: 26px 8px 10px 10px;
          border-right: 1px solid #e0e4f0;
        }
        @media (min-width: 400px) { .lr-cover-panel { width: 124px; } }
        @media (min-width: 640px) { .lr-cover-panel { width: 148px; padding: 30px 10px 12px 12px; } }
        @media (min-width: 768px) {
          /* Desktop: auto-sized grid column */
          .lr-cover-panel {
            width: auto;
            padding: 14px 10px;
            min-height: 160px;
            border-right: 1px solid #e0e4f0;
          }
        }

        /* ─── Date badge ─── */
        .lr-date-badge {
          position: absolute;
          top: 7px;
          left: 8px;
          color: white;
          font-size: 8px;
          font-weight: 700;
          padding: 2px 5px;
          background: #EF6203;
          border-radius: 3px;
          z-index: 10;
          white-space: nowrap;
        }
        @media (min-width: 640px) { .lr-date-badge { font-size: 10px; padding: 3px 8px; top: 9px; left: 10px; } }
        @media (min-width: 768px) { .lr-date-badge { font-size: 11px; padding: 4px 10px; border-radius: 6px; top: 10px; left: 12px; } }

        /* ─── Cover image ─── */
        .lr-cover-image {
          width: 100%;
          max-width: 88px;
          height: auto;
          display: block;
          margin: 0 auto;
          border-radius: 3px;
          box-shadow: 3px 3px 0 #b0b8d8, 5px 5px 0 #d0d5ea;
        }
        @media (min-width: 400px) { .lr-cover-image { max-width: 104px; } }
        @media (min-width: 640px) { .lr-cover-image { max-width: 126px; } }
        @media (min-width: 768px) {
          .lr-cover-image { max-width: 170px; border-radius: 4px; box-shadow: 4px 4px 0 #b0b8d8, 8px 8px 0 #d0d5ea; }
        }

        /* ─── Mobile meta pane (right of image) ─── */
        .lr-meta-pane {
          flex: 1;
          min-width: 0;
          padding: 9px 10px 9px 10px;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        @media (min-width: 640px) { .lr-meta-pane { padding: 12px 14px; gap: 5px; } }
        /* Hide on desktop — desktop uses lr-details-pane */
        @media (min-width: 768px) { .lr-meta-pane { display: none; } }

        /* ─── Desktop details pane ─── */
        .lr-details-pane {
          /* Hidden on mobile — desktop only */
          display: none;
        }
        @media (min-width: 768px) {
          .lr-details-pane {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 16px;
            padding: 20px 24px;
          }
        }

        /* ─── Mobile bottom row: tags + buttons, full width ─── */
        .lr-bottom-row {
          display: flex;
          flex-direction: column;
          gap: 7px;
          padding: 8px 12px 11px;
          border-top: 1px solid #eaecf5;
          background: white;
        }
        /* Hidden on desktop — desktop details pane has tags+buttons */
        @media (min-width: 768px) { .lr-bottom-row { display: none; } }

        /* ─── Shared text styles ─── */
        .lr-vol-meta {
          font-size: 8px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.09em;
          color: #283583;
          opacity: 0.6;
          line-height: 1.2;
        }
        @media (min-width: 640px) { .lr-vol-meta { font-size: 9px; } }
        @media (min-width: 768px) { .lr-vol-meta { font-size: 11px; margin-bottom: 8px; } }

        .lr-issue-title {
          font-family: 'Playfair Display', serif;
          font-size: 13px;
          font-weight: 700;
          color: #111;
          line-height: 1.25;
          margin: 0;
        }
        @media (min-width: 400px) { .lr-issue-title { font-size: 14px; } }
        @media (min-width: 640px) { .lr-issue-title { font-size: 16px; } }
        @media (min-width: 768px) { .lr-issue-title { font-size: 22px; line-height: 1.3; margin-bottom: 6px; } }

        .lr-leader-line {
          font-size: 10px;
          color: #6b7280;
          line-height: 1.35;
        }
        @media (min-width: 640px) { .lr-leader-line { font-size: 11px; } }
        @media (min-width: 768px) { .lr-leader-line { font-size: 14px; margin-bottom: 12px; } }

        .lr-summary {
          font-size: 10px;
          color: #6b7280;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @media (min-width: 768px) { .lr-summary { font-size: 14px; -webkit-line-clamp: 2; margin-bottom: 12px; } }

        /* ─── Tags ─── */
        .lr-tags { display: flex; flex-wrap: wrap; gap: 4px; }
        .lr-tag {
          font-size: 9px;
          padding: 1px 7px;
          border: 1px solid #283583;
          color: #283583;
          background: rgba(40,53,131,0.06);
          border-radius: 999px;
          font-weight: 500;
        }
        @media (min-width: 768px) { .lr-tag { font-size: 11px; padding: 2px 10px; } }

        /* ─── Buttons ─── */
        .lr-buttons {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 6px;
          align-items: center;
        }

        /* Small variant — mobile bottom row */
        .lr-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 700;
          color: white;
          padding: 6px 14px;
          background: #283583;
          border-radius: 6px;
          text-decoration: none;
          transition: opacity 0.15s;
          border: none;
          cursor: pointer;
        }
        .lr-btn-primary:hover { opacity: 0.9; }
        @media (min-width: 768px) { .lr-btn-primary { font-size: 14px; padding: 10px 20px; border-radius: 10px; } }

        .lr-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          font-size: 10px;
          font-weight: 600;
          color: #cd171a;
          padding: 5px 12px;
          border: 1px solid #cd171a;
          background: rgba(205,23,26,0.05);
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.15s;
        }
        .lr-btn-secondary:hover { background: rgba(205,23,26,0.1); }
        .lr-btn-secondary:disabled { opacity: 0.6; cursor: not-allowed; }
        @media (min-width: 768px) { .lr-btn-secondary { font-size: 14px; padding: 10px 20px; border-radius: 10px; gap: 8px; } }

        /* ─── Footer bar ─── */
        .lr-footer-bar {
          display: flex;
          align-items: stretch;
          overflow: hidden;
          background: #3fa535;
          min-height: 36px;
        }

        /* "Simon Designs" green label — hidden on mobile, shown on sm+ */
        .lr-footer-label { display: none; }
        @media (min-width: 640px) {
          .lr-footer-label {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 0 12px;
            flex-shrink: 0;
            background: #2d8a25;
            border-right: 1.5px solid rgba(255,255,255,0.3);
          }
        }

        .lr-footer-label-text {
          color: white;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .lr-footer-ticker-wrap {
          overflow: hidden;
          flex: 1;
          display: flex;
          align-items: center;
        }

        .lr-footer-cta {
          display: flex;
          align-items: center;
          padding: 0 12px;
          flex-shrink: 0;
          background: #cd171a;
          color: white;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          white-space: nowrap;
          border-left: 1.5px solid rgba(255,255,255,0.3);
          text-decoration: none;
          transition: opacity 0.15s;
        }
        .lr-footer-cta:hover { opacity: 0.85; }
        @media (min-width: 640px) { .lr-footer-cta { font-size: 11px; padding: 0 16px; } }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 sm:px-4 lg:px-12">

        {/* ── Section intro ── */}
        <div className="text-center mb-5 sm:mb-8">
          <p
            className="text-[10px] sm:text-sm font-bold tracking-widest uppercase mb-2 sm:mb-3"
            style={{ color: '#3fa535' }}
          >
            Simon Designs Editorial Publications
          </p>
          <h2
            className="text-2xl sm:text-5xl font-black leading-none mb-2 sm:mb-3 select-none"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span style={{ color: '#000000' }}>The</span>{' '}
            <span style={{ color: '#283583' }}>L</span>
            <span style={{ color: '#3fa535' }}>eadership</span>{' '}
            <span style={{ color: '#cd171a' }}>Review</span>
          </h2>
          <p className="text-[11px] sm:text-base text-gray-500 mt-1">
            Our self-published newspaper celebrating exemplary Kenyan leadership
          </p>
          <div className="flex flex-col items-center gap-0.5 mt-3 sm:mt-5">
            <div className="w-16 sm:w-24 h-0.5 sm:h-1 rounded" style={{ background: '#283583' }} />
            <div className="w-10 sm:w-16 h-0.5 rounded" style={{ background: '#cd171a' }} />
            <div className="w-6 sm:w-8 h-0.5 rounded" style={{ background: '#3fa535' }} />
          </div>
        </div>

        {/* ── Main card ── */}
        <div style={{ border: '1.5px solid #283583', borderRadius: '0', overflow: 'hidden' }}>

          {/* ── Header bar ── */}
          <div className="lr-header-inner" style={{ background: '#283583' }}>
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <div className="flex flex-col h-8 sm:h-10 w-1.5 overflow-hidden flex-shrink-0">
                <div className="flex-1" style={{ background: '#006600' }} />
                <div className="flex-1" style={{ background: '#BB0000' }} />
                <div className="flex-1" style={{ background: '#000000' }} />
              </div>
              <div className="min-w-0">
                <p
                  className="text-white font-black text-[13px] sm:text-lg leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  The Leadership Review
                </p>
                <p className="lr-header-subtitle text-white text-xs tracking-widest uppercase mt-0.5 font-semibold opacity-90">
                  Your Number One Newspaper for Celebrating Exemplary Leadership
                </p>
              </div>
            </div>

            <div className="lr-badge badge-glow">
              <div
                className="flex items-center gap-1 px-2 sm:px-3 h-full flex-shrink-0"
                style={{ background: '#ffffff', borderRadius: '999px 0 0 999px' }}
              >
                <span className="live-dot w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#cd171a' }} />
                <span className="text-[9px] sm:text-xs font-black tracking-widest uppercase" style={{ color: '#cd171a' }}>
                  NEW
                </span>
              </div>
              <div className="overflow-hidden flex-1">
                <div className="badge-ticker-track">
                  <span className="text-white text-[9px] sm:text-xs font-bold tracking-wide px-1 sm:px-2">{badgeRepeated}</span>
                  <span className="text-white text-[9px] sm:text-xs font-bold tracking-wide px-1 sm:px-2">{badgeRepeated}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Issue body ── */}
          {loading ? (
            <div className="flex items-center justify-center py-14 gap-3 bg-white">
              <div
                className="w-5 h-5 rounded-full border-2 animate-spin"
                style={{ borderColor: '#283583', borderTopColor: 'transparent' }}
              />
              <p className="text-xs text-gray-400">Loading latest issue...</p>
            </div>
          ) : issue ? (
            <div className="lr-issue-body">

              {/*
                lr-top-row:
                  • Mobile  → flex row: [cover-panel | meta-pane]
                  • Desktop → display:contents, so cover-panel and lr-details-pane
                              each become independent grid cells
              */}
              <div className="lr-top-row">

                {/* Cover panel */}
                <div className="lr-cover-panel">
                  <span className="lr-date-badge">{formatDate(issue.publishedDate)}</span>
                  {issue.coverImage?.asset?.url ? (
                    <img
                      src={issue.coverImage.asset.url}
                      alt={`Cover — ${issue.title}`}
                      className="lr-cover-image"
                    />
                  ) : (
                    <div
                      className="lr-cover-image"
                      style={{
                        aspectRatio: '3/4',
                        background: 'linear-gradient(145deg, #283583, #3fa535 60%, #cd171a)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '10px',
                        fontWeight: '600',
                        textAlign: 'center',
                        padding: '8px',
                      }}
                    >
                      Vol. {issue.volume} · Issue {issue.issueNumber}
                    </div>
                  )}
                </div>

                {/* Mobile meta pane — right of image, hidden on desktop */}
                <div className="lr-meta-pane">
                  <p className="lr-vol-meta">
                    Vol. {issue.volume} · Issue {issue.issueNumber} · {formatDate(issue.publishedDate)}
                  </p>
                  <h3 className="lr-issue-title">{issue.title}</h3>
                  {issue.featuredLeader && (
                    <p className="lr-leader-line">
                      Featuring{' '}
                      <span className="font-bold" style={{ color: '#283583' }}>
                        {issue.featuredLeader}
                      </span>
                      {issue.leaderTitle && (
                        <span style={{ color: '#9ca3af' }}> · {issue.leaderTitle}</span>
                      )}
                    </p>
                  )}
                  {issue.summary && (
                    <p className="lr-summary">{issue.summary}</p>
                  )}
                </div>

                {/* Desktop details pane — full right column, hidden on mobile */}
                <div className="lr-details-pane">
                  <div>
                    <p className="lr-vol-meta">
                      Vol. {issue.volume} · Issue {issue.issueNumber} · {formatDate(issue.publishedDate)}
                    </p>
                    <h3 className="lr-issue-title">{issue.title}</h3>
                    {issue.featuredLeader && (
                      <p className="lr-leader-line">
                        Featuring{' '}
                        <span className="font-bold" style={{ color: '#283583' }}>
                          {issue.featuredLeader}
                        </span>
                        {issue.leaderTitle && (
                          <span style={{ color: '#9ca3af' }}> · {issue.leaderTitle}</span>
                        )}
                      </p>
                    )}
                    {issue.summary && (
                      <p className="lr-summary">{issue.summary}</p>
                    )}
                    {issue.tags && issue.tags.length > 0 && (
                      <div className="lr-tags">
                        {issue.tags.slice(0, 4).map((tag) => (
                          <span key={tag} className="lr-tag">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="lr-buttons">
                    <Link
                      href={`/the-leadership-review/${issue.slug.current}`}
                      className="lr-btn-primary"
                    >
                      Read Full Issue
                    </Link>
                    {issue.pdfFile?.asset?.url && (
                      <DownloadButton size="md" />
                    )}
                  </div>
                </div>

              </div>{/* end lr-top-row */}

              {/* Mobile bottom row: tags + buttons (hidden on desktop) */}
              <div className="lr-bottom-row">
                {issue.tags && issue.tags.length > 0 && (
                  <div className="lr-tags">
                    {issue.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="lr-tag">{tag}</span>
                    ))}
                  </div>
                )}
                <div className="lr-buttons">
                  <Link
                    href={`/the-leadership-review/${issue.slug.current}`}
                    className="lr-btn-primary"
                  >
                    Read Full Issue
                  </Link>
                  {issue.pdfFile?.asset?.url && (
                    <DownloadButton size="sm" />
                  )}
                </div>
              </div>

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 gap-2 bg-white">
              <p className="text-sm font-semibold text-gray-700">First issue coming soon</p>
              <p className="text-xs text-gray-400">The Leadership Review is being prepared.</p>
            </div>
          )}

          {/* ── Footer ticker bar ── */}
          <div className="lr-footer-bar">

            {/* "Simon Designs" label — sm+ only, hidden on mobile */}
            <div className="lr-footer-label">
              <span className="live-dot w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#ffffff' }} />
              <span className="lr-footer-label-text">Simon Designs</span>
            </div>

            <div className="lr-footer-ticker-wrap">
              <div className="footer-ticker-track">
                <span className="text-white text-xs font-semibold tracking-wide">{footerRepeated}</span>
                <span className="text-white text-xs font-semibold tracking-wide">{footerRepeated}</span>
              </div>
            </div>

            <Link href="/the-leadership-review" className="lr-footer-cta">
              View All Issues →
            </Link>

          </div>

        </div>
        {/* end card */}

      </div>
    </section>
  );
}