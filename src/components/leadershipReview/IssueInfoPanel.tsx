'use client';

import Link from 'next/link';
import type { LeadershipReviewIssue } from '@/types/leadershipReview';

// ── Info panel sidebar ────────────────────────────────────────────────────────

export default function IssueInfoPanel({
  issue,
  showDownload,
  onDownload,
  downloading,
  hideCover = false,
}: {
  issue: LeadershipReviewIssue;
  showDownload: boolean;
  onDownload: () => void;
  downloading: boolean;
  hideCover?: boolean;
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
        <div className="relative overflow-hidden" style={{ height: '320px' }}>
          <img src={issue.coverImage.asset.url} alt={`Cover — ${issue.title}`} className="w-full h-full object-cover object-top" />
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