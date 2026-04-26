'use client';

import React, { useState } from 'react';
import {
  Palette,
  Megaphone,
  Layout,
  BookOpen,
  Package,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';

interface PricingService {
  _id: string;
  name: string;
  description?: string;
  price: number;
  priceLabel: string;
  originalPriceLabel?: string;
  discountLabel?: string;
  order: number;
}

interface PricingCategory {
  _id: string;
  name: string;
  icon: string;
  description: string;
  order: number;
  categoryImage?: {
    asset: { _ref?: string; url?: string };
    alt?: string;
  };
  services: PricingService[];
}

interface PricingSettings {
  pageTitle: string;
  pageSubtitle: string;
  noteTitle: string;
  noteContent: string;
  requestQuoteButtonText: string;
  currencySymbol: string;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  palette: Palette,
  megaphone: Megaphone,
  layout: Layout,
  bookopen: BookOpen,
  package: Package,
};

// Each card gets a unique accent so they feel distinct, not cookie-cutter
const cardAccents = [
  { from: '#048F02', to: '#06b800', light: '#e8f5e9' },
  { from: '#EF6203', to: '#f7931e', light: '#fff3e0' },
  { from: '#0066cc', to: '#0099ff', light: '#e3f2fd' },
  { from: '#7b2d8b', to: '#b44fc4', light: '#f3e5f5' },
  { from: '#c62828', to: '#ef5350', light: '#ffebee' },
];

interface PricingGuideProps {
  categories: PricingCategory[];
  settings: PricingSettings | null;
}

function sanityImageUrl(asset: { _ref?: string; url?: string }): string | null {
  if (asset.url) return asset.url;
  if (!asset._ref) return null;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  const withoutPrefix = asset._ref.replace(/^image-/, '');
  const withDot = withoutPrefix.replace(/-([a-z]+)$/, '.$1');
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${withDot}`;
}

function formatDiscountLabel(raw: string): string {
  const trimmed = raw.trim();
  if (trimmed.startsWith('-')) return trimmed;
  if (/^\d+$/.test(trimmed)) return `-${trimmed}%`;
  if (/^\d+%$/.test(trimmed)) return `-${trimmed}`;
  return trimmed;
}

export default function PricingGuide({ categories, settings }: PricingGuideProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (id: string) => {
    const next = new Set(expandedCategories);
    if (next.has(id)) { next.delete(id); } else { next.add(id); }
    setExpandedCategories(next);
  };

  const getIcon = (iconName: string) => iconMap[iconName?.toLowerCase()] || Palette;

  return (
    <>
      <style jsx>{`
        /* ── Section wrapper ─────────────────────────────────────── */
        .pricing-section {
          padding: 4.5rem 0 5rem;
          background: #f7f8fa;
          position: relative;
          overflow: hidden;
        }
        /* Dot-grid atmosphere */
        .pricing-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, #d1d5db 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.4;
          pointer-events: none;
        }
        /* Soft green glow top-left */
        .pricing-section::after {
          content: '';
          position: absolute;
          top: -120px;
          left: -120px;
          width: 480px;
          height: 480px;
          background: radial-gradient(circle, rgba(4,143,2,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .pricing-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1.5rem;
          position: relative;
          z-index: 1;
        }

        /* ── Heading block ───────────────────────────────────────── */
        .heading-block {
          text-align: center;
          margin-bottom: 3rem;
        }
        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #e8f5e9;
          color: #048F02;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 5px 16px;
          border-radius: 999px;
          margin-bottom: 1rem;
          border: 1px solid #c8e6c9;
        }
        .section-title {
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 900;
          color: #048F02;
          letter-spacing: -0.035em;
          line-height: 1.1;
          margin-bottom: 0.65rem;
        }
        .section-sub {
          font-size: 0.92rem;
          color: #6b7280;
          max-width: 460px;
          margin: 0 auto;
          line-height: 1.65;
        }

        /* ── Cards grid ──────────────────────────────────────────── */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 900px) {
          .cards-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .cards-grid { grid-template-columns: 1fr; }
        }

        /* ── Card shell ──────────────────────────────────────────── */
        .pricing-card {
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          border: 1.5px solid #e5e7eb;
          transition: transform 0.3s cubic-bezier(.22,.68,0,1.2),
                      box-shadow 0.3s ease,
                      border-color 0.2s ease;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        }
        .pricing-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 24px 56px rgba(0,0,0,0.12);
          border-color: var(--accent);
        }

        /* Coloured top stripe */
        .card-stripe {
          height: 4px;
          background: linear-gradient(90deg, var(--accent), var(--accent-to));
          flex-shrink: 0;
        }

        /* ── Card image ──────────────────────────────────────────── */
        .card-image {
          width: 100%;
          height: 165px;
          overflow: hidden;
          flex-shrink: 0;
          position: relative;
        }
        /* Gradient overlay makes the image feel part of the card */
        .card-image::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 40%,
            rgba(0,0,0,0.22) 100%
          );
        }
        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }
        .pricing-card:hover .card-image img {
          transform: scale(1.07);
        }

        /* ── Card body ───────────────────────────────────────────── */
        .card-body {
          padding: 1.35rem 1.4rem 1.3rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        /* Icon badge */
        .icon-badge {
          width: 42px;
          height: 42px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: var(--accent-light);
          border: 1.5px solid var(--accent);
          transition: background 0.22s ease, border-color 0.22s ease;
        }
        .pricing-card:hover .icon-badge {
          background: var(--accent);
        }
        .icon-badge svg {
          transition: color 0.22s ease;
        }
        .pricing-card:hover .icon-badge svg {
          color: #fff !important;
        }

        /* Title */
        .card-title {
          font-size: 0.98rem;
          font-weight: 800;
          color: #111827;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }

        /* Description */
        .card-desc {
          font-size: 0.81rem;
          color: #6b7280;
          line-height: 1.6;
          margin: 0.7rem 0 1rem;
          flex: 1;
        }

        /* Toggle button — pill style */
        .toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.76rem;
          font-weight: 700;
          color: var(--accent);
          background: var(--accent-light);
          border: 1.5px solid var(--accent);
          border-radius: 999px;
          padding: 5px 13px;
          cursor: pointer;
          width: fit-content;
          transition: background 0.18s, color 0.18s;
          letter-spacing: 0.01em;
        }
        .toggle-btn:hover {
          background: var(--accent);
          color: #fff;
        }

        /* ── Services panel ──────────────────────────────────────── */
        .services-panel {
          margin-top: 1rem;
          padding-top: 0.85rem;
          border-top: 1.5px solid #f3f4f6;
        }

        .service-row {
          padding: 0.6rem 0;
          border-bottom: 1px dashed #ececec;
        }
        .service-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .service-top {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 0.5rem;
        }

        .service-name {
          font-size: 0.82rem;
          font-weight: 600;
          color: #374151;
        }

        .price-col {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          flex-shrink: 0;
        }

        .price-now {
          font-size: 0.86rem;
          font-weight: 800;
          color: var(--accent);
          letter-spacing: -0.01em;
        }

        .price-was {
          font-size: 0.67rem;
          color: #d1d5db;
          text-decoration: line-through;
          margin-top: 1px;
        }

        /* Discount pill — always orange so it pops */
        .discount-pill {
          display: inline-flex;
          align-items: center;
          margin-top: 4px;
          padding: 2px 8px;
          border-radius: 999px;
          font-size: 0.66rem;
          font-weight: 900;
          letter-spacing: 0.07em;
          background: linear-gradient(135deg, #EF6203, #f7931e);
          color: #fff;
          box-shadow: 0 2px 5px rgba(239,98,3,0.28);
        }

        /* ── Divider ─────────────────────────────────────────────── */
        .section-rule {
          height: 2px;
          margin-top: 4rem;
          background: linear-gradient(
            to right,
            transparent,
            #EF6203 30%,
            #048F02 70%,
            transparent
          );
          opacity: 0.3;
        }
      `}</style>

      <section className="pricing-section">
        <div className="pricing-inner">

          {/* Heading */}
          <div className="heading-block">
            <div className="eyebrow">
              <Sparkles size={11} />
              Transparent &amp; Flexible
            </div>
            <h2 className="section-title">
              {settings?.pageTitle || 'Our Pricing Guide'}
            </h2>
            <p className="section-sub">
              {settings?.pageSubtitle ||
                'Custom packages available for larger projects. All prices in KES.'}
            </p>
          </div>

          {/* Grid */}
          <div className="cards-grid">
            {categories.map((category, idx) => {
              const accent = cardAccents[idx % cardAccents.length];
              const Icon = getIcon(category.icon);
              const isExpanded = expandedCategories.has(category._id);
              const imgUrl = category.categoryImage?.asset
                ? sanityImageUrl(category.categoryImage.asset)
                : null;

              return (
                <div
                  key={category._id}
                  className="pricing-card"
                  style={{
                    '--accent': accent.from,
                    '--accent-to': accent.to,
                    '--accent-light': accent.light,
                  } as React.CSSProperties}
                >
                  {/* Coloured top stripe */}
                  <div className="card-stripe" />

                  {/* Image */}
                  {imgUrl && (
                    <div className="card-image">
                      <img
                        src={imgUrl}
                        alt={category.categoryImage?.alt || `${category.name} sample work`}
                      />
                    </div>
                  )}

                  {/* Body */}
                  <div className="card-body">

                    {/* Icon + title */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0' }}>
                      <div className="icon-badge">
                        <Icon
                          size={19}
                          style={{ color: accent.from, transition: 'color 0.22s' }}
                        />
                      </div>
                      <h3 className="card-title">{category.name}</h3>
                    </div>

                    <p className="card-desc">{category.description}</p>

                    {/* Toggle */}
                    <button
                      className="toggle-btn"
                      onClick={() => toggleCategory(category._id)}
                    >
                      {isExpanded
                        ? <><ChevronUp size={12} /> Hide Services</>
                        : <><ChevronDown size={12} /> Show Services</>
                      }
                    </button>

                    {/* Services */}
                    {isExpanded && category.services?.length > 0 && (
                      <div className="services-panel">
                        {category.services.map((service) => (
                          <div key={service._id} className="service-row">

                            <div className="service-top">
                              <span className="service-name">{service.name}</span>
                              <div className="price-col">
                                <span className="price-now">{service.priceLabel}</span>
                                {service.originalPriceLabel && (
                                  <span className="price-was">{service.originalPriceLabel}</span>
                                )}
                              </div>
                            </div>

                            {(service.discountLabel ||
                              (service.description &&
                                service.description.trim().toLowerCase() !==
                                  service.name.trim().toLowerCase())) && (
                              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
                                {service.discountLabel && (
                                  <span className="discount-pill">
                                    {formatDiscountLabel(service.discountLabel)}
                                  </span>
                                )}
                                {service.description &&
                                  service.description.trim().toLowerCase() !==
                                    service.name.trim().toLowerCase() && (
                                  <span style={{ fontSize: '0.71rem', color: '#9ca3af', lineHeight: 1.4 }}>
                                    {service.description}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {categories.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <p style={{ color: '#6b7280', fontSize: '1rem' }}>
                No pricing categories found. Please create them in Sanity.
              </p>
            </div>
          )}

          <div className="section-rule" />
        </div>
      </section>
    </>
  );
}