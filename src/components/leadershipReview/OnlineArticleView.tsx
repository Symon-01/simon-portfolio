'use client';

import { PortableText } from '@portabletext/react';
import { urlFor } from '@/lib/sanity.image';

// ── Colour map — driven by introCardColor from Sanity ─────────────────────────
// 'blue' | 'red' | 'green' — controls both the intro paragraph card
// background AND all blockquote accents in the same article.

const colorMap = {
  blue:  { bg: '#28358308', border: '#28358330', accent: '#283583', quote: '#283583' },
  red:   { bg: '#cd171a08', border: '#cd171a30', accent: '#cd171a', quote: '#cd171a' },
  green: { bg: '#3fa53508', border: '#3fa53530', accent: '#3fa535', quote: '#3fa535' },
} as const;

type AccentColor = keyof typeof colorMap;

// ── Drop cap style ─────────────────────────────────────────────────────────────
// Applied to the first <p> inside each H2 section (newspaper style).
// The ::first-letter pseudo-class floats the first letter 3 lines tall.
const dropCapStyle = `
  .drop-cap::first-letter {
    float: left;
    font-size: 3.6em;
    line-height: 0.82;
    padding-right: 6px;
    padding-top: 4px;
    font-family: 'Playfair Display', serif;
    font-weight: 900;
    color: #283583;
  }
`;

// ── Component factory — rebuilds renderers whenever color changes ──────────────

function buildComponents(color: AccentColor, introCardShown: { done: boolean }) {
  const c = colorMap[color];

  return {
    block: {
      // Normal paragraph — justified, drop cap on first paragraph after H2
      normal: ({ children }: any) => {
        // We track whether the intro card has been rendered yet.
        // The very first normal block gets the coloured card behind it.
        if (!introCardShown.done) {
          introCardShown.done = true;
          return (
            <div
              className="rounded-xl px-5 py-4 mb-5"
              style={{
                background: c.bg,
                border: `1.5px solid ${c.border}`,
                borderLeft: `4px solid ${c.accent}`,
              }}
            >
              <p
                className="drop-cap text-gray-800 leading-relaxed text-base"
                style={{ textAlign: 'justify', fontFamily: "'Georgia', serif" }}
              >
                {children}
              </p>
            </div>
          );
        }
        return (
          <p
            className="mb-5 text-gray-700 leading-relaxed text-base"
            style={{ textAlign: 'justify' }}
          >
            {children}
          </p>
        );
      },

      // H2 — larger, bolder, Playfair — triggers drop cap on NEXT paragraph
      h2: ({ children }: any) => {
        // Reset so next normal paragraph after this H2 gets a drop cap
        introCardShown.done = true; // intro already shown, but we want drop cap after H2
        return (
          <h2
            className="text-3xl md:text-4xl font-black text-gray-900 mt-14 mb-3 pb-2 border-b-2 drop-cap-next"
            style={{ fontFamily: "'Playfair Display', serif", borderColor: c.accent }}
          >
            {children}
          </h2>
        );
      },

      // H3 — larger, bolder
      h3: ({ children }: any) => (
        <h3
          className="text-xl md:text-2xl font-bold text-gray-800 mt-10 mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {children}
        </h3>
      ),

      // H4 — red uppercase section heading
      h4: ({ children }: any) => (
        <h4
          className="text-sm font-black uppercase tracking-widest mt-7 mb-2"
          style={{ color: '#BB0000' }}
        >
          {children}
        </h4>
      ),

      // H5 — italic subtitle/deck
      h5: ({ children }: any) => (
        <h5
          className="text-base italic text-gray-500 mb-4 font-medium leading-snug"
          style={{ textAlign: 'justify' }}
        >
          {children}
        </h5>
      ),

      // Blockquote — accent colour from Sanity introCardColor
      blockquote: ({ children }: any) => (
        <blockquote
          className="pl-5 my-8 italic text-lg leading-relaxed rounded-r-lg py-4 pr-4"
          style={{
            borderLeft: `4px solid ${c.quote}`,
            background: c.bg,
            color: '#374151',
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
            className={`my-6 ${
              position === 'left'
                ? 'float-left mr-6 mb-2 w-full sm:w-1/2'
                : position === 'right'
                ? 'float-right ml-6 mb-2 w-full sm:w-1/2'
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
              <figcaption className="text-xs text-gray-400 mt-2 text-center italic">
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

// ── Shared Online Article View ────────────────────────────────────────────────
// Props:
//   articleContent  — Portable Text blocks from Sanity
//   introCardColor  — 'blue' | 'red' | 'green' (set per issue in Sanity Studio)
//                     Defaults to 'blue' if not set.

export default function OnlineArticleView({
  articleContent,
  introCardColor,
}: {
  articleContent: any[];
  introCardColor?: string;
}) {
  const color: AccentColor =
    introCardColor === 'red' ? 'red'
    : introCardColor === 'green' ? 'green'
    : 'blue';

  // Mutable ref-like object — resets per render so first paragraph is always the intro card
  const introCardShown = { done: false };
  const components = buildComponents(color, introCardShown);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap');
        ${dropCapStyle}
      `}</style>

      <div
        className="w-full border border-gray-200 rounded-b-xl overflow-y-auto bg-white"
        style={{ height: '780px' }}
      >
        {/* Scroll hint bar */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-4 py-2 text-xs text-white/80 border-b border-white/10"
          style={{ background: '#283583' }}
        >
          <span>Scroll to read the full issue</span>
          <span className="opacity-60">↕</span>
        </div>

        {/* Article body */}
        <div className="max-w-2xl mx-auto px-5 sm:px-8 py-8 overflow-hidden">
          <PortableText value={articleContent} components={components} />
          <div className="clear-both" />
        </div>
      </div>
    </>
  );
}