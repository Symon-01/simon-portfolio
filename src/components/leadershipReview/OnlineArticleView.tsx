'use client';

import { useState, useRef } from 'react';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/lib/sanity.image';

const colorMap = {
  blue:  { accent: '#283583', quote: '#283583', quoteBg: '#28358308' },
  red:   { accent: '#cd171a', quote: '#cd171a', quoteBg: '#cd171a08' },
  green: { accent: '#3fa535', quote: '#3fa535', quoteBg: '#3fa53508' },
} as const;

type AccentColor = keyof typeof colorMap;

const dropCapStyle = `
  .tlr-drop-cap::first-letter {
    float: left;
    font-size: 3.6em;
    line-height: 0.82;
    padding-right: 6px;
    padding-top: 4px;
    font-family: 'Playfair Display', serif;
    font-weight: 900;
    color: #283583;
  }
  .tlr-reader-pane::-webkit-scrollbar { width: 5px; }
  .tlr-reader-pane::-webkit-scrollbar-track { background: transparent; }
  .tlr-reader-pane::-webkit-scrollbar-thumb { background: #283583; border-radius: 3px; }
  .tlr-reader-pane::-webkit-scrollbar-thumb:hover { background: #1e2a6a; }
`;

function buildComponents(color: AccentColor, introShown: { done: boolean }) {
  const c = colorMap[color];
  return {
    block: {
      normal: ({ children }: any) => {
        if (!introShown.done) {
          introShown.done = true;
          return (
            <p className="tlr-drop-cap mb-4 text-gray-800 leading-relaxed text-base"
              style={{ textAlign: 'justify', fontFamily: "'Georgia', serif" }}>
              {children}
            </p>
          );
        }
        return (
          <p className="mb-4 text-gray-700 leading-relaxed text-base" style={{ textAlign: 'justify' }}>
            {children}
          </p>
        );
      },
      h2: ({ children }: any) => {
        introShown.done = true;
        return (
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-10 mb-2 pb-2 border-b-2"
            style={{ fontFamily: "'Playfair Display', serif", borderColor: c.accent }}>
            {children}
          </h2>
        );
      },
      h3: ({ children }: any) => (
        <h3 className="text-xl font-bold text-gray-800 mt-7 mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}>
          {children}
        </h3>
      ),
      h4: ({ children }: any) => (
        <h4 className="text-sm font-black uppercase tracking-widest mt-5 mb-1" style={{ color: '#BB0000' }}>
          {children}
        </h4>
      ),
      h5: ({ children }: any) => (
        <h5 className="text-base italic text-gray-500 mb-3 font-medium leading-snug" style={{ textAlign: 'justify' }}>
          {children}
        </h5>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="pl-4 my-6 italic text-base leading-relaxed rounded-r-lg py-3 pr-4"
          style={{ borderLeft: `4px solid ${c.quote}`, background: c.quoteBg, color: '#374151', fontFamily: "'Georgia', serif" }}>
          {children}
        </blockquote>
      ),
    },
    types: {
      image: ({ value }: any) => {
        if (!value?.asset) return null;
        const position = value.position || 'full';
        return (
          <figure className={`my-4 ${
            position === 'left' ? 'float-left mr-4 mb-2 w-full sm:w-1/2'
            : position === 'right' ? 'float-right ml-4 mb-2 w-full sm:w-1/2'
            : 'w-full clear-both'}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={urlFor(value).width(900).url()} alt={value.caption || ''} className="w-full rounded-lg object-cover" />
            {value.caption && (
              <figcaption className="text-xs text-gray-400 mt-1 text-center italic">{value.caption}</figcaption>
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

export default function OnlineArticleView({
  articleContent,
  introCardColor,
}: {
  articleContent: any[];
  introCardColor?: string;
}) {
  const [mode, setMode] = useState<'collapsed' | 'open'>('collapsed');
  const topRef = useRef<HTMLDivElement>(null);

  const color: AccentColor =
    introCardColor === 'red' ? 'red' : introCardColor === 'green' ? 'green' : 'blue';

  const handleOpen = () => {
    setMode('open');
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  };
  const handleClose = () => {
    setMode('collapsed');
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  };

  const introShown = { done: false };
  const components = buildComponents(color, introShown);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap');
        ${dropCapStyle}
      `}</style>

      <div
        ref={topRef}
        className="w-full border-x border-b border-gray-200 rounded-b-xl"
        aria-label="Online article view"
      >
        {/* ── COLLAPSED ────────────────────────────────────────────────────── */}
        {mode === 'collapsed' && (
          <>
            <div className="relative" style={{ height: `${PREVIEW_HEIGHT}px`, overflow: 'hidden' }}>
              {/* Tight padding: px-4 sm:px-6, pt-4 — no wasted space */}
              <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-2 overflow-hidden">
                <PortableText value={articleContent} components={components} />
                <div className="clear-both" />
              </div>
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
                style={{ borderColor: '#283583', background: 'transparent' }}
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M3 6l5 5 5-5" stroke="#283583" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className="text-xs text-gray-400 tracking-wide">Scroll inside the reader</span>
            </div>
          </>
        )}

        {/* ── OPEN: fixed reading pane ─────────────────────────────────────── */}
        {mode === 'open' && (
          <>
            <div
              className="tlr-reader-pane overflow-y-auto"
              style={{
                height: `${READER_HEIGHT}px`,
                boxShadow: 'inset 0 8px 12px -8px rgba(40,53,131,0.07), inset 0 -8px 12px -8px rgba(40,53,131,0.07)',
              }}
            >
              {/* Same tight padding as collapsed — px-4 sm:px-6, pt-4 */}
              <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-6 overflow-hidden">
                <PortableText value={articleContent} components={components} />
                <div className="clear-both" />
              </div>
            </div>

            <div className="flex flex-col items-center py-3 gap-0.5 border-t border-gray-100">
              <button
                onClick={handleClose}
                aria-label="Close reader"
                className="flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all hover:shadow-md active:scale-95"
                style={{ borderColor: '#283583', background: 'transparent' }}
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M3 10l5-5 5 5" stroke="#283583" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
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