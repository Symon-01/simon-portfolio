'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Pillar {
  _key: string;
  title: string;
  description: string;
  emoji: string;
}

interface CreativePhilosophyProps {
  mainQuote?: string;
  pillars?: Pillar[];
}

export default function CreativePhilosophy({
  mainQuote = "Design is not just about making things look beautiful—it's about solving problems and telling stories that resonate. I believe every brand has a unique story to tell, and my job is to translate that story into powerful visuals that connect, inspire, and drive action.",
  pillars = [
    {
      _key: '1',
      emoji: '🎨',
      title: "Creativity Meets Strategy",
      description: "Every design decision is backed by strategic thinking and client objectives"
    },
    {
      _key: '2',
      emoji: '💡',
      title: "Innovation First",
      description: "I constantly explore new techniques and trends to deliver fresh perspectives"
    },
    {
      _key: '3',
      emoji: '🤝',
      title: "Client Partnership",
      description: "Collaboration and communication ensure designs exceed expectations"
    }
  ]
}: CreativePhilosophyProps) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Two-tone config per card
  const cardThemes = [
    {
      // Card 1: Green header / white body
      headerBg: 'linear-gradient(135deg, #048F02 0%, #037a01 100%)',
      bodyBg: '#ffffff',
      bodyBorder: 'rgba(4,143,2,0.18)',
      emojiBg: 'rgba(255,255,255,0.2)',
      emojiBorder: 'rgba(255,255,255,0.35)',
      numberColor: 'rgba(255,255,255,0.15)',
      titleColor: '#ffffff',
      descColor: '#4B5563',
      dividerColor: 'rgba(4,143,2,0.12)',
      shadow: '0 8px 32px rgba(4,143,2,0.18), 0 2px 8px rgba(0,0,0,0.06)',
      hoverShadow: '0 20px 48px rgba(4,143,2,0.28), 0 4px 12px rgba(0,0,0,0.08)',
      sweepBg: 'linear-gradient(to right, #048F02, #EF6203)',
    },
    {
      // Card 2: Orange header / light orange tint body
      headerBg: 'linear-gradient(135deg, #EF6203 0%, #d45500 100%)',
      bodyBg: '#fff9f5',
      bodyBorder: 'rgba(239,98,3,0.18)',
      emojiBg: 'rgba(255,255,255,0.2)',
      emojiBorder: 'rgba(255,255,255,0.35)',
      numberColor: 'rgba(255,255,255,0.15)',
      titleColor: '#ffffff',
      descColor: '#4B5563',
      dividerColor: 'rgba(239,98,3,0.15)',
      shadow: '0 8px 32px rgba(239,98,3,0.18), 0 2px 8px rgba(0,0,0,0.06)',
      hoverShadow: '0 20px 48px rgba(239,98,3,0.28), 0 4px 12px rgba(0,0,0,0.08)',
      sweepBg: 'linear-gradient(to right, #EF6203, #048F02)',
    },
    {
      // Card 3: Gradient header (green→orange) / light green tint body
      headerBg: 'linear-gradient(135deg, #048F02 0%, #EF6203 100%)',
      bodyBg: '#f5fff5',
      bodyBorder: 'rgba(4,143,2,0.15)',
      emojiBg: 'rgba(255,255,255,0.2)',
      emojiBorder: 'rgba(255,255,255,0.35)',
      numberColor: 'rgba(255,255,255,0.15)',
      titleColor: '#ffffff',
      descColor: '#4B5563',
      dividerColor: 'rgba(4,143,2,0.1)',
      shadow: '0 8px 32px rgba(4,143,2,0.15), 0 2px 8px rgba(0,0,0,0.06)',
      hoverShadow: '0 20px 48px rgba(239,98,3,0.22), 0 4px 12px rgba(0,0,0,0.08)',
      sweepBg: 'linear-gradient(to right, #048F02, #EF6203)',
    },
  ];

  return (
    <>
      <style jsx>{`
        /* ========== SIMON DESIGNS - TYPOGRAPHY SYSTEM ========== */
        .section-title {
          font-size: 2rem !important;
          line-height: 1.3 !important;
          margin-bottom: 0.375rem !important;
        }
        .section-desc {
          font-size: 1rem !important;
          line-height: 1.6 !important;
        }
        .quote-text {
          font-size: 1rem !important;
          line-height: 1.7 !important;
        }
        .card-title {
          font-size: 0.95rem !important;
          font-weight: 700 !important;
        }
        .card-desc {
          font-size: 0.875rem !important;
          line-height: 1.5 !important;
        }
        @media (max-width: 1023px) {
          .section-title { font-size: 1.5rem !important; margin-bottom: 0.25rem !important; }
          .section-desc { font-size: 0.9rem !important; padding: 0 8px; }
          .quote-text { font-size: 0.9rem !important; }
          .card-title { font-size: 0.85rem !important; }
          .card-desc { font-size: 0.8rem !important; line-height: 1.4 !important; }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .card-title { font-size: 0.9rem !important; }
        }

        /* ========== ANIMATIONS ========== */
        .fade-up {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.2s; }
        .delay-3 { transition-delay: 0.3s; }
        .delay-4 { transition-delay: 0.4s; }

        /* ========== LABEL PILL ========== */
        .label-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 14px;
          border-radius: 999px;
          border: 1px solid rgba(4,143,2,0.4);
          background: rgba(4,143,2,0.08);
        }
        .label-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #048F02;
          animation: blink 2s ease-in-out infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* ========== QUOTE CARD ========== */
        .quote-card {
          position: relative;
          background: #ffffff;
          border: 1px solid rgba(4,143,2,0.15);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(4,143,2,0.08), 0 1px 4px rgba(0,0,0,0.04);
        }
        .quote-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(to right, #048F02, #EF6203);
        }
        .big-quote {
          font-size: 8rem;
          line-height: 0.75;
          font-family: Georgia, 'Times New Roman', serif;
          background: linear-gradient(135deg, #048F02, #EF6203);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          opacity: 0.3;
          user-select: none;
          flex-shrink: 0;
        }


        /* ========== PILLAR CARDS ========== */
        .pillar-card {
          border-radius: 20px;
          overflow: hidden;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          cursor: default;
          position: relative;
        }
        .pillar-card:hover { transform: translateY(-8px); }

        /* Sweep line at bottom */
        .card-sweep {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .pillar-card:hover .card-sweep { transform: scaleX(1); }

        /* Header zone */
        .card-header {
          position: relative;
          padding: 1.5rem 1.5rem 1.25rem 1.5rem;
          overflow: hidden;
        }
        /* Decorative circle in header bg */
        .card-header::after {
          content: '';
          position: absolute;
          top: -30px; right: -30px;
          width: 100px; height: 100px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          pointer-events: none;
        }

        /* Ghost number in header */
        .card-ghost-number {
          position: absolute;
          top: 6px; right: 14px;
          font-size: 4.5rem;
          font-weight: 900;
          line-height: 1;
          font-family: Georgia, serif;
          user-select: none;
          pointer-events: none;
        }

        /* Emoji box */
        .emoji-box {
          width: 48px; height: 48px;
          border-radius: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin-bottom: 0.875rem;
          transition: transform 0.3s ease;
        }
        .pillar-card:hover .emoji-box {
          transform: scale(1.12) rotate(-5deg);
        }

        /* Body zone */
        .card-body {
          padding: 1.25rem 1.5rem 1.5rem 1.5rem;
          border-top: none;
        }

        /* Jagged wave divider between header and body */
        .card-wave {
          display: block;
          width: 100%;
          overflow: hidden;
          line-height: 0;
          margin-bottom: -1px;
        }

        /* Bottom divider */
        .bottom-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, #EF6203, transparent);
        }
      `}</style>

      <section
        ref={sectionRef}
        className="py-6 lg:py-8 bg-gradient-to-br from-gray-50 to-gray-100"
      >
        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">

          {/* Section Header */}
          <div className={`text-center mb-8 fade-up ${visible ? 'visible' : ''}`}>
            <div className="label-pill mb-5 mx-auto w-fit">
              <span className="label-dot"></span>
              <span style={{ color: '#048F02', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                My Approach
              </span>
            </div>
            <h2 className="section-title font-bold" style={{ color: '#1a1a1a' }}>
              Creative{' '}
              <span style={{
                background: 'linear-gradient(135deg, #048F02 0%, #EF6203 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Philosophy
              </span>
            </h2>
            <p className="section-desc max-w-2xl mx-auto leading-relaxed font-medium" style={{ color: '#4B5563' }}>
              The principles that guide every design decision I make.
            </p>
          </div>

          {/* Quote Block */}
          <div className={`quote-card p-8 mb-8 fade-up delay-1 ${visible ? 'visible' : ''}`}>
            <div className="flex gap-2 items-start">
              <span className="big-quote">&ldquo;</span>
              <p className="quote-text leading-relaxed italic font-medium" style={{ color: '#4B5563', paddingTop: '1rem' }}>
                {mainQuote}
              </p>
            </div>

          </div>

          {/* Philosophy Pillars — two-tone split cards */}
          <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
            {pillars?.map((pillar, index) => {
              const t = cardThemes[index] ?? cardThemes[0];

              return (
                <div
                  key={pillar._key}
                  className={`pillar-card fade-up delay-${index + 2} ${visible ? 'visible' : ''}`}
                  style={{
                    border: `1px solid ${t.bodyBorder}`,
                    boxShadow: t.shadow,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = t.hoverShadow)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = t.shadow)}
                >
                  {/* ── HEADER ZONE ── */}
                  <div className="card-header" style={{ background: t.headerBg }}>
                    {/* Ghost number */}
                    <span className="card-ghost-number" style={{ color: t.numberColor }}>
                      {index + 1}
                    </span>

                    {/* Emoji */}
                    <div
                      className="emoji-box"
                      style={{ background: t.emojiBg, border: `1px solid ${t.emojiBorder}` }}
                    >
                      {pillar.emoji}
                    </div>

                    {/* Title */}
                    <h3 className="card-title" style={{ color: t.titleColor }}>
                      {pillar.title}
                    </h3>
                  </div>

                  {/* ── WAVE DIVIDER ── */}
                  <svg
                    className="card-wave"
                    viewBox="0 0 400 24"
                    preserveAspectRatio="none"
                    style={{ display: 'block', height: '24px' }}
                  >
                    <path
                      d="M0,0 C100,24 300,0 400,20 L400,0 Z"
                      style={{ fill: t.bodyBg }}
                    />
                    <rect x="0" y="0" width="400" height="1" style={{ fill: t.headerBg.includes('gradient') ? 'none' : t.headerBg }} />
                  </svg>

                  {/* ── BODY ZONE ── */}
                  <div className="card-body" style={{ background: t.bodyBg }}>
                    {/* Thin accent line */}
                    <div style={{ width: '32px', height: '2px', background: t.headerBg, borderRadius: '2px', marginBottom: '0.75rem' }}></div>
                    <p className="card-desc" style={{ color: t.descColor }}>
                      {pillar.description}
                    </p>
                  </div>

                  {/* Hover sweep */}
                  <div className="card-sweep" style={{ background: t.sweepBg }}></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Section Divider */}
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 mt-8">
          <div className="bottom-divider"></div>
        </div>
      </section>
    </>
  );
}