'use client';
// FILE: src/components/leadershipReview/OnlineArticleView.tsx

import { useState, useRef } from 'react';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/lib/sanity.image';

// ── Brand colour maps ──────────────────────────────────────────────────────────
// introCardColor → controls intro paragraph card border/background + all drop caps.
// quoteColor     → controls blockquote / pull-quote card colour independently.
// You set these TWO fields separately per-issue in Sanity Studio.
// Example: introCardColor = "blue", quoteColor = "green" → blue intro, green quotes.

const introColorMap = {
  blue: {
    accent:     '#283583',
    heroBg:     'rgba(40, 53, 131, 0.10)',
    heroBorder: '#283583',
    dropCap:    '#283583',
  },
  red: {
    accent:     '#BB0000',
    heroBg:     'rgba(187, 0, 0, 0.10)',
    heroBorder: '#BB0000',
    dropCap:    '#BB0000',
  },
  green: {
    accent:     '#2e7d32',
    heroBg:     'rgba(46, 125, 50, 0.10)',
    heroBorder: '#2e7d32',
    dropCap:    '#2e7d32',
  },
} as const;

const quoteColorMap = {
  blue: {
    quote:   '#283583',
    quoteBg: 'rgba(40, 53, 131, 0.06)',
  },
  red: {
    quote:   '#BB0000',
    quoteBg: 'rgba(187, 0, 0, 0.06)',
  },
  green: {
    quote:   '#2e7d32',
    quoteBg: 'rgba(46, 125, 50, 0.06)',
  },
} as const;

type AccentColor = keyof typeof introColorMap;

// ── Global styles ──────────────────────────────────────────────────────────────
const globalStyle = (dropCapColor: string) => `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap');

  /*
    UNIFORM FONT: All body text in the reader uses Georgia serif, matching the
    PDF layout. Previously only drop-cap paragraphs had Georgia; all others were
    in the browser default sans-serif, creating an inconsistent look.
  */
  .tlr-article-body {
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 1rem;
    line-height: 1.75;
    color: #374151;
  }

  /*
    DROP CAP — newspaper style, matching the PDF exactly.

    HOW THE 3-LINE SPAN WORKS:
    Body line-height: 1.75rem (1rem font × 1.75).
    To span exactly 3 lines: 3 × 1.75rem = 5.25rem → font-size: 5.25rem.

    line-height: 0.82 collapses the letter's invisible bounding box so that
    the second and third lines of body text wrap up tightly next to it,
    instead of leaving a gap below the letter.

    margin-top: 0.05rem nudges the top of the letter to sit on the same
    cap-line as the first line of body text.

    margin-right: 8px gives a comfortable gap between the large letter and
    the body text beside it.

    NOTE: When the drop cap paragraph is inside the intro card (which has
    14px padding), the letter visually appears to start 14px below the card's
    top edge — this is correct newspaper behaviour (the card is the paragraph
    box, the drop cap floats inside it).
  */
  .tlr-drop-cap::first-letter {
    float: left;
    font-size: 5.25rem;
    line-height: 0.82;
    margin-top: 0.05rem;
    margin-right: 8px;
    margin-bottom: 0;
    font-family: 'Playfair Display', serif;
    font-weight: 400;
    font-style: normal;
    color: ${dropCapColor};
  }

  /* Scrollbar styling for the open reading pane */
  .tlr-reader-pane::-webkit-scrollbar        { width: 5px; }
  .tlr-reader-pane::-webkit-scrollbar-track  { background: transparent; }
  .tlr-reader-pane::-webkit-scrollbar-thumb  { background: #283583; border-radius: 3px; }
  .tlr-reader-pane::-webkit-scrollbar-thumb:hover { background: #1e2a6a; }
`;

// ── Section state ──────────────────────────────────────────────────────────────
// isIntro:     true until the FIRST normal paragraph is rendered.
//              The first normal paragraph gets the coloured card + drop cap.
//              IMPORTANT: H2/H3 headings do NOT turn off isIntro anymore.
//              This fixes the bug where your article starts with an H2 title
//              (the issue name), which was consuming isIntro and leaving the
//              first real paragraph with no card.
//
// isFirstPara: true immediately after an H2 or H3 is rendered.
//              The next normal paragraph after a heading gets a drop cap only
//              (no card). After that paragraph renders, isFirstPara = false.

function buildComponents(
  introColor: AccentColor,
  qColor: AccentColor,
  sectionState: { isIntro: boolean; isFirstPara: boolean }
) {
  const c  = introColorMap[introColor];
  const qc = quoteColorMap[qColor];

  return {
    block: {

      // ── Normal paragraph ───────────────────────────────────────────────────
      normal: ({ children }: any) => {

        // First normal paragraph anywhere in the article → intro card + drop cap
        if (sectionState.isIntro) {
          sectionState.isIntro     = false;
          sectionState.isFirstPara = false;
          return (
            <p
              className="tlr-drop-cap mb-5 leading-relaxed"
              style={{
                textAlign:    'justify',
                background:   c.heroBg,
                borderLeft:   `4px solid ${c.heroBorder}`,
                borderRadius: '0 8px 8px 0',
                padding:      '14px 18px 14px 18px',
                // No fontFamily here — inherited from .tlr-article-body (Georgia)
              }}
            >
              {children}
            </p>
          );
        }

        // First paragraph after an H2 or H3 → drop cap, no card
        if (sectionState.isFirstPara) {
          sectionState.isFirstPara = false;
          return (
            <p
              className="tlr-drop-cap mb-4 leading-relaxed"
              style={{ textAlign: 'justify' }}
            >
              {children}
            </p>
          );
        }

        // All other paragraphs — Georgia font from .tlr-article-body
        return (
          <p className="mb-4 leading-relaxed" style={{ textAlign: 'justify' }}>
            {children}
          </p>
        );
      },

      // ── H2 — major section title ───────────────────────────────────────────
      // Sets isFirstPara so the next paragraph gets a drop cap.
      // Does NOT touch isIntro — if the article opens with an H2 title, the
      // first normal paragraph that follows still gets the intro card.
      h2: ({ children }: any) => {
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

      // ── H3 — sub-section title ─────────────────────────────────────────────
      h3: ({ children }: any) => {
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

      // ── H4 — red all-caps label (e.g. "NATIONAL RECOGNITION: THE CBS AWARD.")
      h4: ({ children }: any) => (
        <h4
          className="text-sm font-black uppercase tracking-widest mt-5 mb-1"
          style={{ color: '#BB0000', fontFamily: "'Playfair Display', serif" }}
        >
          {children}
        </h4>
      ),

      // ── H5 — italic subtitle / caption line below a heading
      h5: ({ children }: any) => (
        <h5
          className="text-base italic text-gray-500 mb-3 font-normal leading-snug"
          style={{ textAlign: 'justify' }}
        >
          {children}
        </h5>
      ),

      // ── Blockquote / pull quote ────────────────────────────────────────────
      // Uses quoteColor (set separately from introCardColor in Sanity Studio).
      // You can have a blue intro card but green pull quotes in the same issue.
      blockquote: ({ children }: any) => (
        <blockquote
          className="pl-4 my-6 italic leading-relaxed rounded-r-lg py-3 pr-4"
          style={{
            borderLeft: `4px solid ${qc.quote}`,
            background: qc.quoteBg,
            color:      '#374151',
            fontSize:   '1rem',
          }}
        >
          {children}
        </blockquote>
      ),
    },

    // ── Block-level image ──────────────────────────────────────────────────────
    types: {
      image: ({ value }: any) => {
        if (!value?.asset) return null;
        const position = value.position || 'full';
        return (
          <figure
            className={`my-4 ${
              position === 'left'   ? 'float-left mr-4 mb-2 w-full sm:w-1/2'
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
  introCardColor?: string;
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

  // sectionState is created fresh every render (this component only re-renders
  // when mode changes, so this is safe — the article content doesn't change).
  const sectionState = { isIntro: true, isFirstPara: false };
  const components   = buildComponents(introColor, qColor, sectionState);

  // ── Article body ────────────────────────────────────────────────────────────
  // tlr-article-body sets Georgia as the font for ALL text inside — headings
  // override this with Playfair Display inline, but body paragraphs inherit
  // Georgia, giving a uniform serif look throughout (matching the PDF).
  const articleBody = (
    <div className="tlr-article-body max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-6 overflow-hidden">
      <PortableText value={articleContent} components={components} />
      <div className="clear-both" />
    </div>
  );

  return (
    <>
      <style>{globalStyle(c.dropCap)}</style>
      <div
        ref={topRef}
        className="w-full border-x border-b border-gray-200 rounded-b-xl bg-white"
        aria-label="Online article view"
      >

        {/* ── COLLAPSED: preview with bottom fade ──────────────────────────── */}
        {mode === 'collapsed' && (
          <>
            <div className="relative" style={{ height: `${PREVIEW_HEIGHT}px`, overflow: 'hidden' }}>
              {articleBody}
              {/* Gradient fade so the cutoff looks intentional, not abrupt */}
              <div
                className="absolute bottom-0 left-0 right-0 pointer-events-none"
                style={{ height: '160px', background: 'linear-gradient(to bottom, transparent, white)' }}
              />
            </div>
            <div className="flex flex-col items-center py-3 gap-0.5 border-t border-gray-100">
              <button
                onClick={handleOpen}
                aria-label="Continue reading"
                className="flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all hover:shadow-md active:scale-95"
                style={{ borderColor: c.accent }}
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M3 6l5 5 5-5" stroke={c.accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className="text-xs text-gray-400 tracking-wide">Continue reading</span>
            </div>
          </>
        )}

        {/* ── OPEN: full scrollable reading pane ───────────────────────────── */}
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
                style={{ borderColor: c.accent }}
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