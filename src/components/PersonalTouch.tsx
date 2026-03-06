'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Paragraph {
  _key: string;
  text: string;
}

interface PersonalTouchProps {
  paragraphs?: Paragraph[];
}

export default function PersonalTouch({
  paragraphs = [
    {
      _key: '1',
      text: "When I'm not designing, you'll find me with a pencil in hand, sketching portraits and exploring the depths of realistic drawing. There's something magical about capturing a person's essence on paper—the way light plays across features, the subtle emotions in their eyes, the story their face tells."
    },
    {
      _key: '2',
      text: "My journey from Kigumo Primary School to Mukurwe-ini Boys High School, and then to Embu University, has been filled with incredible learning experiences. Each step taught me resilience, creativity, and the power of hard work."
    },
    {
      _key: '3',
      text: "Based in Othaya, Nyeri, Kenya, I'm proud to serve clients across the country, helping them elevate their brands and tell their stories through powerful design. Whether it's a startup looking for its first logo or an established business refreshing its visual identity, I'm here to bring your vision to life."
    }
  ]
}: PersonalTouchProps) {
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

  // Icons for each paragraph — pencil/art, journey, location
  const paragraphIcons = ['✏️', '🎓', '📍'];

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
        .prose-text {
          font-size: 1rem !important;
          line-height: 1.75 !important;
        }
        .card-desc {
          font-size: 0.875rem !important;
          line-height: 1.5 !important;
        }
        @media (max-width: 1023px) {
          .section-title { font-size: 1.5rem !important; margin-bottom: 0.25rem !important; }
          .section-desc { font-size: 0.9rem !important; padding: 0 8px; }
          .prose-text { font-size: 0.9rem !important; line-height: 1.65 !important; }
          .card-desc { font-size: 0.8rem !important; }
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
          border: 1px solid rgba(239,98,3,0.4);
          background: rgba(239,98,3,0.07);
        }
        .label-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #EF6203;
          animation: blink 2s ease-in-out infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* ========== OUTER CARD ========== */
        .note-card {
          position: relative;
          background: #ffffff;
          border-radius: 28px;
          overflow: hidden;
          border: 1px solid rgba(239,98,3,0.12);
          box-shadow:
            0 4px 24px rgba(239,98,3,0.08),
            0 1px 4px rgba(0,0,0,0.04);
        }
        /* Top gradient bar */
        .note-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(to right, #EF6203, #048F02);
        }
        /* Decorative background circle */
        .note-card::after {
          content: '';
          position: absolute;
          bottom: -60px; right: -60px;
          width: 220px; height: 220px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(239,98,3,0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ========== PARAGRAPH ROWS ========== */
        .para-row {
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
          padding: 1.25rem 0;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          transition: background 0.2s ease;
        }
        .para-row:last-child { border-bottom: none; padding-bottom: 0; }
        .para-row:first-child { padding-top: 0; }

        /* Icon badge */
        .para-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          flex-shrink: 0;
          margin-top: 2px;
          transition: transform 0.3s ease;
        }
        .para-icon-green {
          background: rgba(4,143,2,0.09);
          border: 1px solid rgba(4,143,2,0.2);
        }
        .para-icon-orange {
          background: rgba(239,98,3,0.09);
          border: 1px solid rgba(239,98,3,0.2);
        }
        .para-row:hover .para-icon {
          transform: scale(1.1) rotate(-4deg);
        }

        /* Vertical connector line between rows */
        .connector {
          position: absolute;
          left: 21px;
          top: 44px;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, rgba(4,143,2,0.15), rgba(239,98,3,0.15), transparent);
        }

        /* ========== BOTTOM DIVIDER ========== */
        .bottom-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, #EF6203, transparent);
        }
      `}</style>

      <section ref={sectionRef} className="py-6 lg:py-8 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">

          {/* Section Header */}
          <div className={`text-center mb-8 fade-up ${visible ? 'visible' : ''}`}>
            <div className="label-pill mb-5 mx-auto w-fit">
              <span className="label-dot"></span>
              <span style={{ color: '#EF6203', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Beyond The Work
              </span>
            </div>
            <h2 className="section-title font-bold" style={{ color: '#1a1a1a' }}>
              A{' '}
              <span style={{
                background: 'linear-gradient(135deg, #EF6203 0%, #048F02 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Personal Note
              </span>
            </h2>
            <p className="section-desc max-w-2xl mx-auto leading-relaxed font-medium" style={{ color: '#4B5563' }}>
              The person behind the designs — my story, my roots, my passion.
            </p>
          </div>

          {/* Note Card */}
          <div className={`note-card p-8 fade-up delay-1 ${visible ? 'visible' : ''}`}>

            {/* Paragraph rows with icon timeline */}
            <div className="relative">
              {/* Vertical connector line */}
              {paragraphs && paragraphs.length > 1 && (
                <div className="connector"></div>
              )}

              {paragraphs?.map((paragraph, index) => {
                const icon = paragraphIcons[index] ?? '💬';
                const iconClass = index % 2 === 0 ? 'para-icon-green' : 'para-icon-orange';

                return (
                  <div key={paragraph._key} className="para-row">
                    {/* Icon badge */}
                    <div className={`para-icon ${iconClass}`}>
                      {icon}
                    </div>
                    {/* Text */}
                    <p className="prose-text text-gray-600 leading-relaxed">
                      {paragraph.text}
                    </p>
                  </div>
                );
              })}
            </div>


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