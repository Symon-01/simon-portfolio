'use client';

import { useState } from 'react';
import ViewerToolbar from './ViewerToolbar';
import OnlineArticleView from './OnlineArticleView';

// ── Desktop PDF Viewer ────────────────────────────────────────────────────────

export default function DesktopPdfViewer({
  pdfUrl,
  title,
  onDownload,
  downloading,
  articleContent,
  introCardColor,
}: {
  pdfUrl: string;
  title: string;
  onDownload: () => void;
  downloading: boolean;
  articleContent?: any[];
  introCardColor?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [viewMode, setViewMode] = useState<'pdf' | 'online'>('pdf');
  const hasOnlineVersion = Array.isArray(articleContent) && articleContent.length > 0;

  return (
    <div className="w-full">
      <ViewerToolbar
        title={title}
        viewMode={viewMode}
        setViewMode={setViewMode}
        hasOnlineVersion={hasOnlineVersion}
        onDownload={onDownload}
        downloading={downloading}
      />

      {/* Online view */}
      {viewMode === 'online' && hasOnlineVersion && (
        <OnlineArticleView articleContent={articleContent!} introCardColor={introCardColor} />
      )}

      {/* PDF iframe view */}
      {viewMode === 'pdf' && (
        <div
          className="w-full border border-gray-200 rounded-b-xl relative"
          style={{ height: '780px', background: '#ffffff' }}
        >
          {!loaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-50 z-10 gap-3">
              <div
                className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
                style={{ borderColor: '#283583', borderTopColor: 'transparent' }}
              />
              <p className="text-sm text-gray-400">Loading newspaper...</p>
            </div>
          )}
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
            title={title}
            onLoad={() => setLoaded(true)}
            style={{ display: 'block', width: '100%', height: '100%', border: 'none', background: '#ffffff' }}
          />
        </div>
      )}
    </div>
  );
}