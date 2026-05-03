'use client';

// ── Shared Viewer Toolbar ─────────────────────────────────────────────────────
// The blue top bar used in both desktop and mobile viewers.
// Shows the toggle only when an online version exists.

export default function ViewerToolbar({
  title,
  viewMode,
  setViewMode,
  hasOnlineVersion,
  onDownload,
  downloading,
}: {
  title: string;
  viewMode: 'pdf' | 'online';
  setViewMode: (mode: 'pdf' | 'online') => void;
  hasOnlineVersion: boolean;
  onDownload: () => void;
  downloading: boolean;
}) {
  return (
    <div
      className="flex items-center justify-between px-4 py-3 rounded-t-xl flex-wrap gap-2"
      style={{ background: '#283583' }}
    >
      {/* Left: Kenyan flag stripe + title */}
      <div className="flex items-center gap-2 min-w-0 flex-1 mr-2">
        <div className="flex flex-col h-7 w-1 rounded-sm overflow-hidden flex-shrink-0">
          <div className="flex-1" style={{ background: '#006600' }} />
          <div className="flex-1" style={{ background: '#BB0000' }} />
          <div className="flex-1" style={{ background: '#000000' }} />
        </div>
        <span
          className="text-white font-bold text-sm truncate"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {title}
        </span>
      </div>

      {/* Right: toggle + download */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Read Online / View PDF toggle — only shown when online version exists */}
        {hasOnlineVersion && (
          <div className="flex items-center rounded-lg overflow-hidden border border-white/40">
            <button
              onClick={() => setViewMode('online')}
              className={`text-xs font-semibold px-3 py-1.5 transition-colors whitespace-nowrap ${
                viewMode === 'online'
                  ? 'bg-white text-[#283583]'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Read Online
            </button>
            <div className="w-px h-5 bg-white/30" />
            <button
              onClick={() => setViewMode('pdf')}
              className={`text-xs font-semibold px-3 py-1.5 transition-colors whitespace-nowrap ${
                viewMode === 'pdf'
                  ? 'bg-white text-[#283583]'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              View PDF
            </button>
          </div>
        )}

        {/* Download button — always visible */}
        <button
          onClick={onDownload}
          disabled={downloading}
          className="flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold text-white border border-white/30 rounded-lg px-3 py-1.5 hover:bg-white/10 transition-colors disabled:opacity-60 whitespace-nowrap"
        >
          {downloading ? (
            <div
              className="w-3 h-3 rounded-full border border-t-transparent animate-spin"
              style={{ borderColor: '#fff', borderTopColor: 'transparent' }}
            />
          ) : (
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v8M5 8l3 3 3-3M3 13h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {downloading ? 'Saving...' : 'Download PDF'}
        </button>
      </div>
    </div>
  );
}