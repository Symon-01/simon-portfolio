'use client';

import { PortableText } from '@portabletext/react';
import { urlFor } from '@/lib/sanity.image';

// ── Portable Text renderers ───────────────────────────────────────────────────
// Maps each Sanity block style to the correct HTML tag + styling.
// H4 is red to match the newspaper design.
const portableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="mb-5 text-gray-700 leading-relaxed text-base">{children}</p>
    ),
    h2: ({ children }: any) => (
      <h2
        className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-3 pb-2 border-b-2"
        style={{ fontFamily: "'Playfair Display', serif", borderColor: '#283583' }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3
        className="text-xl md:text-2xl font-bold text-gray-800 mt-10 mb-2"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {children}
      </h3>
    ),
    // Red section headings — matching the newspaper style
    h4: ({ children }: any) => (
      <h4
        className="text-base font-bold uppercase tracking-wide mt-7 mb-2"
        style={{ color: '#BB0000' }}
      >
        {children}
      </h4>
    ),
    // Italic subtitle / deck line under H2 or H3
    h5: ({ children }: any) => (
      <h5 className="text-base italic text-gray-500 mb-4 font-medium leading-snug">{children}</h5>
    ),
    blockquote: ({ children }: any) => (
      <blockquote
        className="border-l-4 pl-5 my-8 italic text-gray-600 text-lg leading-relaxed"
        style={{ borderColor: '#283583' }}
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
    em: ({ children }: any) => <em className="italic">{children}</em>,
  },
};

// ── Shared Online Article View ────────────────────────────────────────────────
// Used by both Desktop and Mobile viewers when "Read Online" is active.

export default function OnlineArticleView({ articleContent }: { articleContent: any[] }) {
  return (
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
        <PortableText value={articleContent} components={portableTextComponents} />
        <div className="clear-both" />
      </div>
    </div>
  );
}