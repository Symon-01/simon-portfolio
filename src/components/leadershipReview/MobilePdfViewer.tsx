'use client';

import { useEffect, useRef, useState } from 'react';
import ViewerToolbar from './ViewerToolbar';
import OnlineArticleView from './OnlineArticleView';

// ── Mobile PDF Canvas Renderer ────────────────────────────────────────────────

export default function MobilePdfViewer({
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  const renderedRef = useRef(false);
  const [viewMode, setViewMode] = useState<'pdf' | 'online'>('pdf');
  const hasOnlineVersion = Array.isArray(articleContent) && articleContent.length > 0;

  useEffect(() => {
    if (renderedRef.current) return;
    renderedRef.current = true;

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.onload = async () => {
      try {
        const pdfjsLib = (window as any).pdfjsLib;
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        const total = pdf.numPages;
        const container = containerRef.current;
        if (!container) return;

        for (let i = 1; i <= total; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: window.innerWidth < 400 ? 1.2 : 1.5 });
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.width = '100%';
          canvas.style.display = 'block';
          canvas.style.borderBottom = '1px solid #e5e7eb';
          const ctx = canvas.getContext('2d')!;
          await page.render({ canvasContext: ctx, viewport }).promise;
          container.appendChild(canvas);
        }
      } catch (err) {
        console.error('PDF render error:', err);
        setError(true);
      }
    };
    script.onerror = () => setError(true);
    document.head.appendChild(script);
  }, [pdfUrl]);

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

      {/* PDF canvas view */}
      {viewMode === 'pdf' && (
        <>
          {error && (
            <div className="w-full border border-gray-200 rounded-b-xl bg-white flex flex-col items-center justify-center gap-4 py-12 px-6 text-center">
              <p className="text-sm text-gray-500">Could not render the PDF. Please open it directly.</p>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-2.5 px-6 rounded-xl text-white text-sm font-black"
                style={{ background: '#283583' }}
              >
                Open PDF
              </a>
            </div>
          )}
          {!error && (
            <div
              ref={containerRef}
              className="w-full border border-gray-200 rounded-b-xl overflow-y-auto bg-white"
              style={{ maxHeight: '85vh' }}
            />
          )}
        </>
      )}
    </div>
  );
}