'use client';

// FILE LOCATION: src/components/PricingServiceRow.tsx

import React, { useState } from 'react';
import { Calculator, ChevronRight, Tag } from 'lucide-react';
import PricingEstimator, { EstimatorConfig } from './PricingEstimator';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PricingServiceRowProps {
  service: {
    _id: string;
    name: string;
    description?: string;
    price: number;
    priceLabel: string;
    originalPriceLabel?: string;
    discountLabel?: string;
  };
  accentColor: string;
  accentColorTo: string;
  currency: string;
  estimatorConfig?: EstimatorConfig | null;
  onGetQuote?: (serviceName: string, estimate: number, details: string) => void;
}

function formatDiscountLabel(raw: string): string {
  const trimmed = raw.trim();
  if (trimmed.startsWith('-')) return trimmed;
  if (/^\d+$/.test(trimmed)) return `-${trimmed}%`;
  if (/^\d+%$/.test(trimmed)) return `-${trimmed}`;
  return trimmed;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PricingServiceRow({
  service,
  accentColor,
  accentColorTo,
  currency,
  estimatorConfig,
  onGetQuote,
}: PricingServiceRowProps) {
  const [showEstimator, setShowEstimator] = useState(false);
  const isVariable = Boolean(estimatorConfig);

  const handleGetQuote = (serviceName: string, estimate: number, details: string) => {
    setShowEstimator(false);
    onGetQuote?.(serviceName, estimate, details);
  };

  return (
    <>
      <style jsx>{`
        .srow {
          padding: 0.62rem 0;
          border-bottom: 1px dashed #ececec;
          transition: background 0.15s;
        }
        .srow:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        /* ── Fixed price layout ── */
        .srow-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 0.5rem;
        }
        .srow-name {
          font-size: 0.82rem;
          font-weight: 600;
          color: #374151;
          line-height: 1.35;
          flex: 1;
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
          letter-spacing: -0.01em;
          color: var(--accent);
        }
        .price-was {
          font-size: 0.67rem;
          color: #d1d5db;
          text-decoration: line-through;
          margin-top: 1px;
        }

        /* Discount pill */
        .discount-pill {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          margin-top: 4px;
          padding: 2px 8px;
          border-radius: 999px;
          font-size: 0.65rem;
          font-weight: 900;
          letter-spacing: 0.06em;
          background: linear-gradient(135deg, #EF6203, #f7931e);
          color: #fff;
          box-shadow: 0 2px 5px rgba(239,98,3,0.28);
        }

        .srow-desc {
          font-size: 0.71rem;
          color: #9ca3af;
          line-height: 1.45;
          margin-top: 3px;
        }

        /* ── Variable estimate button ── */
        .est-trigger {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 0.45rem;
          padding: 5px 12px;
          border-radius: 999px;
          border: 1.5px solid var(--accent);
          background: var(--accent-light);
          color: var(--accent);
          font-size: 0.72rem;
          font-weight: 800;
          cursor: pointer;
          width: fit-content;
          letter-spacing: 0.02em;
          transition: background 0.15s, color 0.15s, transform 0.15s;
          font-family: inherit;
        }
        .est-trigger:hover {
          background: var(--accent);
          color: #fff;
          transform: translateY(-1px);
        }
        .est-trigger:active { transform: translateY(0); }

        /* Starting-from badge for variable services */
        .from-badge {
          font-size: 0.72rem;
          color: #6b7280;
          font-style: italic;
        }
      `}</style>

      <div
        className="srow"
        style={{
          '--accent': accentColor,
          '--accent-to': accentColorTo,
          '--accent-light': accentColor + '18',
        } as React.CSSProperties}
      >
        <div className="srow-top">
          <span className="srow-name">{service.name}</span>

          {isVariable ? (
            <span className="from-badge">From {currency} {service.price.toLocaleString()}</span>
          ) : (
            <div className="price-col">
              <span className="price-now">{service.priceLabel}</span>
              {service.originalPriceLabel && (
                <span className="price-was">{service.originalPriceLabel}</span>
              )}
            </div>
          )}
        </div>

        {/* Description */}
        {service.description &&
          service.description.trim().toLowerCase() !== service.name.trim().toLowerCase() && (
          <div className="srow-desc">{service.description}</div>
        )}

        {/* Bottom row: discount pill + estimate button */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
          {service.discountLabel && (
            <span className="discount-pill">
              <Tag size={8} />
              {formatDiscountLabel(service.discountLabel)}
            </span>
          )}
          {isVariable && estimatorConfig && (
            <button className="est-trigger" onClick={() => setShowEstimator(true)}>
              <Calculator size={11} />
              Estimate Price
              <ChevronRight size={10} />
            </button>
          )}
        </div>
      </div>

      {/* Estimator modal */}
      {showEstimator && estimatorConfig && (
        <PricingEstimator
          config={{ ...estimatorConfig, accentColor, currency }}
          onClose={() => setShowEstimator(false)}
          onGetQuote={handleGetQuote}
        />
      )}
    </>
  );
}