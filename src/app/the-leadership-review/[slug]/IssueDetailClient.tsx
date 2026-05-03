'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { getLeadershipReviewBySlug } from '@/lib/sanity.queries';
import type { LeadershipReviewIssue } from '@/types/leadershipReview';
import IssueMasthead from '@/components/leadershipReview/IssueMasthead';
import DesktopPdfViewer from '@/components/leadershipReview/DesktopPdfViewer';
import MobilePdfViewer from '@/components/leadershipReview/MobilePdfViewer';
import IssueInfoPanel from '@/components/leadershipReview/IssueInfoPanel';
import ShareAndSupportCard from '@/components/leadershipReview/ShareAndSupportCard';
import AlsoReadCard from '@/components/leadershipReview/AlsoReadCard';
import ReaderReviews from '@/components/leadershipReview/ReaderReviews';

// ── Download helper ───────────────────────────────────────────────────────────

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

// ── Main client component ─────────────────────────────────────────────────────

export default function IssueDetailClient({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [issue, setIssue] = useState<LeadershipReviewIssue | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    getLeadershipReviewBySlug(slug)
      .then((data) => {
        // ── Debug: remove these two lines once AlsoReadCard is confirmed working ──
        console.log('DEBUG relatedIssue:', JSON.stringify(data?.relatedIssue, null, 2));
        console.log('DEBUG issue keys:', data ? Object.keys(data) : 'null');
        // ─────────────────────────────────────────────────────────────────────────
        setIssue(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  const handleDownload = async () => {
    if (!issue?.pdfFile?.asset?.url) return;
    setDownloading(true);
    await triggerDownload(
      issue.pdfFile.asset.url,
      `The-Leadership-Review-Vol${issue.volume}-Issue${issue.issueNumber}.pdf`
    );
    setDownloading(false);
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
      <div
        className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: '#283583', borderTopColor: 'transparent' }}
      />
      <p className="text-sm text-gray-400">Loading issue...</p>
    </div>
  );

  if (!issue) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-6">
        <h1
          className="text-2xl font-black text-gray-900 mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Issue Not Found
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          We couldn&apos;t find the issue you&apos;re looking for.
        </p>
        <Link
          href="/the-leadership-review"
          className="inline-flex items-center text-sm font-bold gap-2"
          style={{ color: '#283583' }}
        >
          ← Back to All Issues
        </Link>
      </div>
    </div>
  );

  const reviewsSection = (
    <ReaderReviews
      reviews={issue.reviews || []}
      issueTitle={issue.title}
      issueId={issue._id}
      responsePrompt={issue.responsePrompt}
    />
  );

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap');`}</style>
      <main className="min-h-screen bg-gray-50">
        <IssueMasthead issue={issue} />
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 pb-16 pt-6">

          {/* ── Desktop layout ── */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_300px] gap-8 items-start">
            <div>
              {issue.pdfFile?.asset?.url ? (
                <DesktopPdfViewer
                  pdfUrl={issue.pdfFile.asset.url}
                  title={issue.title}
                  onDownload={handleDownload}
                  downloading={downloading}
                  articleContent={issue.articleContent}
                />
              ) : (
                <div className="bg-white border border-gray-200 rounded-2xl flex items-center justify-center py-24">
                  <p className="text-sm text-gray-400 italic">
                    PDF not yet available for this issue.
                  </p>
                </div>
              )}
              {reviewsSection}
            </div>

            {/* ── Desktop sidebar ── */}
            <div className="flex flex-col gap-4 sticky top-6">
              <IssueInfoPanel
                issue={issue}
                showDownload={true}
                onDownload={handleDownload}
                downloading={downloading}
                hideCover={false}
              />
              <ShareAndSupportCard title={issue.title} />
              {issue.relatedIssue && (
                <AlsoReadCard issue={issue.relatedIssue} />
              )}
            </div>
          </div>

          {/* ── Mobile layout ── */}
          <div className="lg:hidden flex flex-col gap-4">
            <IssueInfoPanel
              issue={issue}
              showDownload={false}
              onDownload={handleDownload}
              downloading={downloading}
              hideCover={true}
            />
            {issue.pdfFile?.asset?.url ? (
              <MobilePdfViewer
                pdfUrl={issue.pdfFile.asset.url}
                title={issue.title}
                onDownload={handleDownload}
                downloading={downloading}
                articleContent={issue.articleContent}
              />
            ) : (
              <div className="bg-white border border-gray-200 rounded-2xl flex items-center justify-center py-16">
                <p className="text-sm text-gray-400 italic">PDF not yet available.</p>
              </div>
            )}
            <ShareAndSupportCard title={issue.title} />
            {issue.relatedIssue && (
              <AlsoReadCard issue={issue.relatedIssue} />
            )}
            {reviewsSection}
          </div>

          <div
            className="mt-10 h-0.5"
            style={{ background: 'linear-gradient(to right, transparent, #EF6203, transparent)' }}
          />
          <div className="mt-6 text-center">
            <Link
              href="/the-leadership-review"
              className="inline-flex items-center text-sm font-bold gap-2 hover:opacity-70 transition-opacity"
              style={{ color: '#283583' }}
            >
              ← View All Issues
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}