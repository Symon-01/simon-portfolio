'use client';
// FILE: src/app/the-leadership-review/[slug]/IssueDetailClient.tsx

import { useState } from 'react';
import Link from 'next/link';
import type { LeadershipReviewIssue } from '@/types/leadershipReview';
import IssueMasthead from '@/components/leadershipReview/IssueMasthead';
import IssueInfoPanel from '@/components/leadershipReview/IssueInfoPanel';
import ShareAndSupportCard from '@/components/leadershipReview/ShareAndSupportCard';
import AlsoReadCard from '@/components/leadershipReview/AlsoReadCard';
import ReaderReviews from '@/components/leadershipReview/ReaderReviews';
import ViewerToolbar from '@/components/leadershipReview/ViewerToolbar';
import OnlineArticleView from '@/components/leadershipReview/OnlineArticleView';
import DesktopPdfViewer from '@/components/leadershipReview/DesktopPdfViewer';
import MobilePdfViewer from '@/components/leadershipReview/MobilePdfViewer';
import SubscribeForm from '@/components/SubscribeForm';

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

interface Props {
  issue: LeadershipReviewIssue | null;
}

export default function IssueDetailClient({ issue }: Props) {
  const [downloading, setDownloading] = useState(false);
  const [viewMode, setViewMode] = useState<'pdf' | 'online'>('pdf');

  const handleDownload = async () => {
    if (!issue?.pdfFile?.asset?.url) return;
    setDownloading(true);
    await triggerDownload(
      issue.pdfFile.asset.url,
      `The-Leadership-Review-Vol${issue.volume}-Issue${issue.issueNumber}.pdf`
    );
    setDownloading(false);
  };

  // ── Not found ──────────────────────────────────────────────────────────────
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
        <Link href="/the-leadership-review" className="inline-flex items-center text-sm font-bold gap-2" style={{ color: '#283583' }}>
          ← Back to All Issues
        </Link>
      </div>
    </div>
  );

  const hasOnlineVersion =
    Array.isArray(issue.articleContent) && issue.articleContent.length > 0;
  const pdfUrl = issue.pdfFile?.asset?.url;

  const reviewsSection = (
    <ReaderReviews
      reviews={issue.reviews || []}
      issueTitle={issue.title}
      issueId={issue._id}
      responsePrompt={issue.responsePrompt}
    />
  );

  const toolbar = pdfUrl ? (
    <ViewerToolbar
      title={issue.title}
      viewMode={viewMode}
      setViewMode={setViewMode}
      hasOnlineVersion={hasOnlineVersion}
      onDownload={handleDownload}
      downloading={downloading}
    />
  ) : null;

  const onlineArticle =
    viewMode === 'online' && hasOnlineVersion ? (
      <OnlineArticleView
        articleContent={issue.articleContent!}
        introCardColor={issue.introCardColor}
        quoteColor={issue.quoteColor}
      />
    ) : null;

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap');`}</style>
      <main className="min-h-screen bg-gray-50">
        <IssueMasthead issue={issue} />
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 pb-16 pt-6">

          {/* ── Desktop layout ─────────────────────────────────────────────── */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_300px] gap-8 items-start">

            {/* Main content column */}
            <div>
              {pdfUrl ? (
                <>
                  {toolbar}
                  {onlineArticle}
                  {viewMode === 'pdf' && (
                    <DesktopPdfViewer
                      pdfUrl={pdfUrl}
                      title={issue.title}
                      onDownload={handleDownload}
                      downloading={downloading}
                      articleContent={issue.articleContent}
                      introCardColor={issue.introCardColor}
                      externalViewMode="pdf"
                    />
                  )}
                </>
              ) : (
                <div className="bg-white border border-gray-200 rounded-2xl flex items-center justify-center py-24">
                  <p className="text-sm text-gray-400 italic">PDF not yet available for this issue.</p>
                </div>
              )}
              {reviewsSection}
            </div>

            {/* ── Desktop sidebar ───────────────────────────────────────────
                Order: Issue Info → Share & Support → Subscribe → Also Read
                Subscribe sits directly below Share so the flow reads naturally:
                "you just shared this — want to be notified of the next one?"
            */}
            <div className="flex flex-col gap-4 sticky top-6">
              <IssueInfoPanel
                issue={issue}
                showDownload={true}
                onDownload={handleDownload}
                downloading={downloading}
                hideCover={false}
              />
              <ShareAndSupportCard title={issue.title} />
              <SubscribeForm variant="compact" />
              {issue.relatedIssue && <AlsoReadCard issue={issue.relatedIssue} />}
            </div>
          </div>

          {/* ── Mobile layout ──────────────────────────────────────────────── */}
          <div className="lg:hidden flex flex-col gap-4">
            <IssueInfoPanel
              issue={issue}
              showDownload={false}
              onDownload={handleDownload}
              downloading={downloading}
              hideCover={false}
            />
            {pdfUrl ? (
              <>
                {toolbar}
                {onlineArticle}
                {viewMode === 'pdf' && (
                  <MobilePdfViewer
                    pdfUrl={pdfUrl}
                    title={issue.title}
                    onDownload={handleDownload}
                    downloading={downloading}
                    articleContent={issue.articleContent}
                    introCardColor={issue.introCardColor}
                    externalViewMode="pdf"
                  />
                )}
              </>
            ) : (
              <div className="bg-white border border-gray-200 rounded-2xl flex items-center justify-center py-16">
                <p className="text-sm text-gray-400 italic">PDF not yet available.</p>
              </div>
            )}
            {/* Mobile order: Share → Subscribe → Reviews → Also Read */}
            <ShareAndSupportCard title={issue.title} />
            <SubscribeForm variant="compact" />
            {reviewsSection}
            {issue.relatedIssue && <AlsoReadCard issue={issue.relatedIssue} />}
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