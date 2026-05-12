'use client';

import { useEffect, useRef, useState } from 'react';
import ViewerToolbar from './ViewerToolbar';
import OnlineArticleView from './OnlineArticleView';

export default function DesktopPdfViewer({
  pdfUrl,
  title,
  onDownload,
  downloading,
  articleContent,
  introCardColor,
  externalViewMode,
}: {
  pdfUrl: string;
  title: string;
  onDownload: () => void;
  downloading: boolean;
  articleContent?: any[];
  introCardColor?: string;
  externalViewMode?: 'pdf' | 'online';
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const renderedRef = useRef(false);

  const [internalViewMode, setInternalViewMode] = useState<'pdf' | 'online'>('pdf');
  const isControlled = externalViewMode !== undefined;
  const viewMode = isControlled ? externalViewMode : internalViewMode;
  const hasOnlineVersion = Array.isArray(articleContent) && articleContent.length > 0;

  useEffect(() => {
    if (viewMode !== 'pdf') return;
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

        // Render all pages into a off-screen fragment first,
        // then append all at once — no top-gap / jump effect.
        const fragment = document.createDocumentFragment();

        for (let i = 1; i <= total; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.8 });

          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.width = '100%';
          canvas.style.display = 'block';
          canvas.style.borderBottom = i < total ? '1px solid #e5e7eb' : 'none';

          const ctx = canvas.getContext('2d')!;
          await page.render({ canvasContext: ctx, viewport }).promise;
          fragment.appendChild(canvas);
        }

        // All pages painted — append and reveal in one frame
        container.appendChild(fragment);
        setLoaded(true);
      } catch (err) {
        console.error('Desktop PDF render error:', err);
        setError(true);
      }
    };

    script.onerror = () => setError(true);
    document.head.appendChild(script);
  }, [pdfUrl, viewMode]);

  return (
    <div className="w-full">

      {!isControlled && (
        <ViewerToolbar
          title={title}
          viewMode={internalViewMode}
          setViewMode={setInternalViewMode}
          hasOnlineVersion={hasOnlineVersion}
          onDownload={onDownload}
          downloading={downloading}
        />
      )}

      {!isControlled && viewMode === 'online' && hasOnlineVersion && (
        <OnlineArticleView articleContent={articleContent!} introCardColor={introCardColor} />
      )}

      {viewMode === 'pdf' && (
        <>
          {error && (
            <div className="w-full border border-gray-200 rounded-b-xl bg-white flex flex-col items-center justify-center gap-4 py-20 px-6 text-center">
              <p className="text-sm text-gray-500">Could not render the PDF. Please open it directly.</p>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-2.5 px-6 rounded-xl text-white text-sm font-bold"
                style={{ background: '#283583' }}
              >
                Open PDF in new tab
              </a>
            </div>
          )}

          {!error && (
            /*
              Single container holds BOTH the spinner and the canvas pages.
              - The spinner is absolutely positioned over the container centre.
              - The canvas container starts empty (height 0) and has no min-height —
                so there's no blank space above the pages while they render.
              - Once loaded=true, the spinner fades out and the scrollable pane appears.
              - We set a fixed height only after loading so the scroll area locks in cleanly.
            */
            <div
              className="w-full border border-gray-200 rounded-b-xl overflow-hidden relative"
              style={{
                background: '#f3f4f6',
                // Before loaded: shrink-wrap to just the spinner height.
                // After loaded: become the reading pane.
                minHeight: loaded ? undefined : '320px',
              }}
            >
              {/* Spinner — centred, fades away once pages are ready */}
              {!loaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-stone-50 z-10">
                  <div
                    className="w-8 h-8 rounded-full border-2 animate-spin"
                    style={{ borderColor: '#283583', borderTopColor: 'transparent' }}
                  />
                  <p className="text-sm text-gray-400">Loading newspaper...</p>
                </div>
              )}

              {/*
                Canvas scroll pane.
                Hidden (opacity-0, pointer-events-none) while rendering so the
                empty container doesn't show. Revealed instantly when loaded.
                No layout shift — the pane snaps from 0-opacity to visible in one frame.
              */}
              <div
                ref={containerRef}
                className="overflow-y-auto bg-white transition-opacity duration-300"
                style={{
                  maxHeight: '85vh',
                  opacity: loaded ? 1 : 0,
                  pointerEvents: loaded ? 'auto' : 'none',
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}