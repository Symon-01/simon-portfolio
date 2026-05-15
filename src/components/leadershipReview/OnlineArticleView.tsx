'use client';
// FILE: src/components/leadershipReview/OnlineArticleView.tsx

import { useState, useRef } from 'react';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/lib/sanity.image';

// ── Brand colour maps ──────────────────────────────────────────────────────────
// introCardColor → controls the intro paragraph card + drop cap colour.
// quoteColor     → controls blockquote / pull-quote colour (set separately).
// Both are chosen independently per-issue in Sanity Studio.

const introColorMap = {
  blue: {
    accent:     '#283583',
    heroBg:     'rgba(40, 53, 131, 0.07)',
    heroBorder: '#283583',
    dropCap:    '#283583',
  },
  red: {
    accent:     '#BB0000',
    heroBg:     'rgba(187, 0, 0, 0.07)',
    heroBorder: '#BB0000',
    dropCap:    '#BB0000',
  },
  green: {
    accent:     '#2e7d32',
    heroBg:     'rgba(46, 125, 50, 0.07)',
    heroBorder: '#2e7d32',
    dropCap:    '#2e7d32',
  },
} as const;

const quoteColorMap = {
  blue: {
    quote:   '#283583',
    quoteBg: 'rgba(40, 53, 131, 0.05)',
  },
  red: {
    quote:   '#BB0000',
    quoteBg: 'rgba(187, 0, 0, 0.05)',
  },
  green: {
    quote:   '#2e7d32',
    quoteBg: 'rgba(46, 125, 50, 0.05)',
  },
} as const;

type AccentColor = keyof typeof introColorMap;

// ── Global styles ──────────────────────────────────────────────────────────────
const globalStyle = (dropCapColor: string) => `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap');

  /*
    Drop cap — newspaper style.

    IMPORTANT: font-size uses rem (not em) so it is always relative to the
    root font size (16px), not the paragraph. This keeps it consistent whether
    the paragraph has padding (intro card) or not.

    How the 3-line span works:
      Body text: font-size ~1rem, line-height 1.6 → each line ≈ 1.6rem tall.
      To span 3 lines: 3 × 1.6rem = 4.8rem → font-size: 4.8rem.
      line-height: 0.85 shrinks the letter's own box so text wraps tightly.
      margin-top: 0.08rem sits the top of the letter flush with line 1.

    To change how many lines it spans:
      2 lines → font-size: 3.2rem
      3 lines → font-size: 4.8rem  (current)
      4 lines → font-size: 6.4rem
  */
  .tlr-drop-cap::first-letter {
    float: left;
    font-size: 4.8rem;
    line-height: 0.85;
    margin-top: 0.08rem;
    margin-right: 6px;
    margin-bottom: 0;
    font-family: 'Playfair Display', serif;
    font-weight: 400;
    font-style: normal;
    color: ${dropCapColor};
  }

  .tlr-reader-pane::-webkit-scrollbar        { width: 5px; }
  .tlr-reader-pane::-webkit-scrollbar-track  { background: transparent; }
  .tlr-reader-pane::-webkit-scrollbar-thumb  { background: #283583; border-radius: 3px; }
  .tlr-reader-pane::-webkit-scrollbar-thumb:hover { background: #1e2a6a; }
`;

// ── Portable Text component factory ───────────────────────────────────────────
// sectionState.isIntro     → true for the very first normal paragraph
//                            (renders the coloured intro card + drop cap)
// sectionState.isFirstPara → true after every H2/H3
//                            (next normal paragraph gets a drop cap, no card)
function buildComponents(
  introColor: AccentColor,
  qColor: AccentColor,
  sectionState: { isIntro: boolean; isFirstPara: boolean }
) {
  const c  = introColorMap[introColor];
  const qc = quoteColorMap[qColor];

  return {
    block: {
      normal: ({ children }: any) => {
        // ── Very first paragraph: intro card + drop cap ──────────────────────
        if (sectionState.isIntro) {
          sectionState.isIntro     = false;
          sectionState.isFirstPara = false;
          return (
            <p
              className="tlr-drop-cap mb-5 text-gray-800 leading-relaxed text-base"
              style={{
                textAlign:    'justify',
                fontFamily:   "'Georgia', serif",
                background:   c.heroBg,
                borderLeft:   `4px solid ${c.heroBorder}`,
                borderRadius: '0 8px 8px 0',
                padding:      '14px 16px 14px 18px',
              }}
            >
              {children}
            </p>
          );
        }
        // ── First paragraph after H2/H3: drop cap only ───────────────────────
        if (sectionState.isFirstPara) {
          sectionState.isFirstPara = false;
          return (
            <p
              className="tlr-drop-cap mb-4 text-gray-700 leading-relaxed text-base"
              style={{ textAlign: 'justify', fontFamily: "'Georgia', serif" }}
            >
              {children}
            </p>
          );
        }
        // ── All other paragraphs ─────────────────────────────────────────────
        return (
          <p
            className="mb-4 text-gray-700 leading-relaxed text-base"
            style={{ textAlign: 'justify' }}
          >
            {children}
          </p>
        );
      },

      // H2 — major article title (e.g. "Double Graduation Makes History")
      // Sets isFirstPara so the paragraph immediately after gets a drop cap.
      h2: ({ children }: any) => {
        sectionState.isIntro     = false;
        sectionState.isFirstPara = true;
        return (
          <h2
            className="font-bold text-gray-900 mt-10 mb-1 pb-2 border-b-2"
            style={{
              fontFamily:  "'Playfair Display', serif",
              borderColor: c.accent,
              fontSize:    'clamp(1.25rem, 2.2vw, 1.7rem)',
            }}
          >
            {children}
          </h2>
        );
      },

      // H3 — sub-article title
      h3: ({ children }: any) => {
        sectionState.isIntro     = false;
        sectionState.isFirstPara = true;
        return (
          <h3
            className="font-bold text-gray-800 mt-7 mb-1"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize:   'clamp(1.1rem, 1.8vw, 1.35rem)',
            }}
          >
            {children}
          </h3>
        );
      },

      // H4 — red section label (e.g. "NATIONAL RECOGNITION: THE CBS AWARD.")
      h4: ({ children }: any) => {
        sectionState.isIntro = false;
        return (
          <h4
            className="text-sm font-black uppercase tracking-widest mt-5 mb-1"
            style={{ color: '#BB0000' }}
          >
            {children}
          </h4>
        );
      },

      // H5 — italic subtitle / deck line
      h5: ({ children }: any) => (
        <h5
          className="text-base italic text-gray-500 mb-3 font-normal leading-snug"
          style={{ textAlign: 'justify', fontFamily: "'Georgia', serif" }}
        >
          {children}
        </h5>
      ),

      // Blockquote / pull quote — uses the SEPARATE quoteColor, not introColor
      blockquote: ({ children }: any) => (
        <blockquote
          className="pl-4 my-6 italic text-base leading-relaxed rounded-r-lg py-3 pr-4"
          style={{
            borderLeft: `4px solid ${qc.quote}`,
            background: qc.quoteBg,
            color:      '#374151',
            fontFamily: "'Georgia', serif",
          }}
        >
          {children}
        </blockquote>
      ),
    },

    types: {
      image: ({ value }: any) => {
        if (!value?.asset) return null;
        const position = value.position || 'full';
        return (
          <figure
            className={`my-4 ${
              position === 'left'  ? 'float-left mr-4 mb-2 w-full sm:w-1/2'
              : position === 'right' ? 'float-right ml-4 mb-2 w-full sm:w-1/2'
              : 'w-full clear-both'
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={urlFor(value).width(900).url()}
              alt={value.caption || ''}
              className="w-full rounded-lg object-cover"
            />
            {value.caption && (
              <figcaption className="text-xs text-gray-400 mt-1 text-center italic">
                {value.caption}
              </figcaption>
            )}
          </figure>
        );
      },
    },

    marks: {
      strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
      em:     ({ children }: any) => <em className="italic">{children}</em>,
    },
  };
}

const PREVIEW_HEIGHT = 460;
const READER_HEIGHT  = 640;

// ── OnlineArticleView ─────────────────────────────────────────────────────────
export default function OnlineArticleView({
  articleContent,
  introCardColor,
  quoteColor,
}: {
  articleContent: any[];
  // Colour for the intro paragraph card border/background + all drop caps.
  introCardColor?: string;
  // NEW: Separate colour for blockquote / pull-quote cards.
  // Set independently per-issue in Sanity Studio.
  // Defaults to 'blue' if not provided.
  quoteColor?: string;
}) {
  const [mode, setMode] = useState<'collapsed' | 'open'>('collapsed');
  const topRef          = useRef<HTMLDivElement>(null);

  const introColor: AccentColor =
    introCardColor === 'red'   ? 'red'
    : introCardColor === 'green' ? 'green'
    : 'blue';

  const qColor: AccentColor =
    quoteColor === 'red'   ? 'red'
    : quoteColor === 'green' ? 'green'
    : 'blue';

  const c = introColorMap[introColor];

  const handleOpen = () => {
    setMode('open');
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  };

  const handleClose = () => {
    setMode('collapsed');
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  };

  const sectionState = { isIntro: true, isFirstPara: false };
  const components   = buildComponents(introColor, qColor, sectionState);

  // ── The article body ────────────────────────────────────────────────────────
  // We do NOT render issueTitle here.
  // Your Sanity article content already has the issue title as the first H2
  // block, so rendering it as a separate prop caused a duplicate heading.
  // The Portable Text renderer (h2 handler above) takes care of it.
  const articleBody = (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-6 overflow-hidden">
      <PortableText value={articleContent} components={components} />
      <div className="clear-both" />
    </div>
  );

  return (
    <>
      <style>{globalStyle(c.dropCap)}</style>
      <div
        ref={topRef}
        className="w-full border-x border-b border-gray-200 rounded-b-xl"
        aria-label="Online article view"
      >
        {/* ── COLLAPSED: preview with fade ─────────────────────────────────── */}
        {mode === 'collapsed' && (
          <>
            <div className="relative" style={{ height: `${PREVIEW_HEIGHT}px`, overflow: 'hidden' }}>
              {articleBody}
              <div
                className="absolute bottom-0 left-0 right-0 pointer-events-none"
                style={{ height: '160px', background: 'linear-gradient(to bottom, transparent, #f9fafb)' }}
              />
            </div>
            <div className="flex flex-col items-center py-3 gap-0.5 border-t border-gray-100">
              <button
                onClick={handleOpen}
                aria-label="Continue reading"
                className="flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all hover:shadow-md active:scale-95"
                style={{ borderColor: c.accent, background: 'transparent' }}
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M3 6l5 5 5-5" stroke={c.accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className="text-xs text-gray-400 tracking-wide">Scroll inside the reader</span>
            </div>
          </>
        )}

        {/* ── OPEN: scrollable full reader ─────────────────────────────────── */}
        {mode === 'open' && (
          <>
            <div
              className="tlr-reader-pane overflow-y-auto"
              style={{
                height:    `${READER_HEIGHT}px`,
                boxShadow: 'inset 0 8px 12px -8px rgba(40,53,131,0.07), inset 0 -8px 12px -8px rgba(40,53,131,0.07)',
              }}
            >
              {articleBody}
            </div>
            <div className="flex flex-col items-center py-3 gap-0.5 border-t border-gray-100">
              <button
                onClick={handleClose}
                aria-label="Close reader"
                className="flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all hover:shadow-md active:scale-95"
                style={{ borderColor: c.accent, background: 'transparent' }}
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M3 10l5-5 5 5" stroke={c.accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className="text-xs text-gray-400 tracking-wide">Close reader</span>
            </div>
          </>
        )}
      </div>
    </>
  );
}