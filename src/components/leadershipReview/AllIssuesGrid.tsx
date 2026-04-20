// FILE: src/components/leadershipReview/AllIssuesGrid.tsx

import Link from 'next/link';
import type { LeadershipReviewIssueSummary } from '@/types/leadershipReview';

interface AllIssuesGridProps {
  issues: LeadershipReviewIssueSummary[];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-KE', {
    month: 'long',
    year: 'numeric',
  });
}

export default function AllIssuesGrid({ issues }: AllIssuesGridProps) {
  if (!issues || issues.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-2xl">
        <p className="text-gray-500 text-sm italic">
          No issues published yet. Check back soon.
        </p>
      </div>
    );
  }

  // Three brand colours cycling per card
  const accents = ['#283583', '#3fa535', '#cd171a'];

  // Second colour for tags — complements the accent
  const secondaries: Record<string, string> = {
    '#283583': '#3fa535',
    '#3fa535': '#cd171a',
    '#cd171a': '#283583',
  };

  // Third colour for the title
  const titleColors: Record<string, string> = {
    '#283583': '#cd171a',
    '#3fa535': '#283583',
    '#cd171a': '#3fa535',
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');

        .lr-card {
          transition: all 0.3s ease;
        }
        .lr-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.16), 0 4px 12px rgba(0,0,0,0.08) !important;
        }

        .cover-image-box {
          position: relative;
          width: 100%;
          padding-bottom: 120%; /* Slightly reduced portrait — crops evenly from bottom */
          overflow: hidden;
          border-bottom: 1px solid #e5e7eb;
        }
        .cover-image-box > * {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .cover-image-box .latest-badge {
          width: fit-content;
          height: fit-content;
          inset: unset;
          top: 10px;
          right: 10px;
        }
        .cover-image-box img {
          object-position: top; /* Anchor to top — crops from the bottom consistently */
        }
      `}</style>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
        {issues.map((issue, index) => {
          const accent = accents[index % accents.length];
          const secondary = secondaries[accent];
          const titleColor = titleColors[accent];

          return (
            <Link
              key={issue._id}
              href={`/the-leadership-review/${issue.slug.current}`}
              className="group block h-full"
            >
              <div
                className="lr-card bg-white rounded-xl md:rounded-2xl overflow-hidden h-full flex flex-col"
                style={{
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.07)',
                }}
              >

                {/* Cover image — uniform portrait, anchored top, crops from bottom */}
                <div className="cover-image-box">

                  {issue.isFeatured && (
                    <span
                      className="latest-badge z-10 text-white text-[8px] md:text-[10px] font-black px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-full shadow-md tracking-wide uppercase"
                      style={{ background: '#EF6203', position: 'absolute', display: 'inline-block' }}
                    >
                      ★ Latest
                    </span>
                  )}

                  {issue.coverImage?.asset?.url ? (
                    <img
                      src={issue.coverImage.asset.url}
                      alt={`Cover of ${issue.title}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-white text-xs md:text-sm font-bold"
                      style={{
                        background: 'linear-gradient(135deg, #283583, #3fa535 60%, #cd171a)',
                      }}
                    >
                      Vol. {issue.volume} · Issue {issue.issueNumber}
                    </div>
                  )}
                </div>

                {/* Card content */}
                <div className="p-3 md:p-5 flex flex-col flex-1">

                  {/* Vol / date line — accent colour */}
                  <div
                    className="text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-1 md:mb-2"
                    style={{ color: accent }}
                  >
                    Vol. {issue.volume} · No. {issue.issueNumber} · {formatDate(issue.publishedDate)}
                  </div>

                  {/* Title — third brand colour, Playfair */}
                  <h3
                    className="text-sm md:text-lg font-black leading-tight mb-1 md:mb-2 line-clamp-2"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: titleColor,
                    }}
                  >
                    {issue.title}
                  </h3>

                  {/* Featured leader */}
                  {issue.featuredLeader && (
                    <p className="text-[10px] md:text-sm text-gray-600 mb-1 leading-relaxed">
                      Featuring{' '}
                      <span className="font-bold" style={{ color: accent }}>
                        {issue.featuredLeader}
                      </span>
                      {issue.leaderTitle && (
                        <span className="text-gray-400 text-[9px] md:text-xs">
                          {' '}· {issue.leaderTitle}
                        </span>
                      )}
                    </p>
                  )}

                  {/* Summary */}
                  {issue.summary && (
                    <p className="text-[10px] md:text-sm text-gray-500 line-clamp-2 mb-2 md:mb-3 flex-1 leading-relaxed">
                      {issue.summary}
                    </p>
                  )}

                  {/* Tags — secondary brand colour */}
                  {issue.tags && issue.tags.length > 0 && (
                    <div className="hidden md:flex flex-wrap gap-1.5 mb-3">
                      {issue.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2.5 py-0.5 font-bold rounded-full"
                          style={{
                            background: `${secondary}18`,
                            color: secondary,
                            border: `1.5px solid ${secondary}50`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Read this issue — full bleed footer bar */}
                  <div
                    className="mt-auto -mx-3 md:-mx-5 -mb-3 md:-mb-5 px-4 py-2.5 flex items-center justify-between font-black text-[10px] md:text-xs tracking-widest uppercase text-white transition-opacity group-hover:opacity-90"
                    style={{ background: accent }}
                  >
                    <span>Read this issue</span>
                    <svg
                      className="w-3 h-3 md:w-4 md:h-4 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="white"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>

                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}