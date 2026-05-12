'use client';

// FILE LOCATION: src/components/PricingEstimator.tsx

import React, { useState, useEffect } from 'react';
import { X, Calculator, ArrowRight, Info } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface VariableFactor {
  key: string;
  label: string;
  type: 'slider' | 'select' | 'toggle';
  // slider
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  pricePerUnit?: number;  // KES per unit (e.g. KES 120 per page)
  // select
  options?: { label: string; value: string; priceAdd: number }[];
  // toggle
  toggleLabel?: string;
  togglePriceAdd?: number;
}

export interface EstimatorConfig {
  serviceId: string;
  serviceName: string;
  basePrice: number;
  currency: string;
  accentColor: string;
  factors: VariableFactor[];
  note?: string;
}

interface Props {
  config: EstimatorConfig;
  onClose: () => void;
  onGetQuote: (serviceName: string, estimate: number, details: string) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PricingEstimator({ config, onClose, onGetQuote }: Props) {
  const [values, setValues] = useState<Record<string, number | string | boolean>>(() => {
    const init: Record<string, number | string | boolean> = {};
    config.factors.forEach((f) => {
      if (f.type === 'slider') init[f.key] = f.min ?? 1;
      else if (f.type === 'select') init[f.key] = f.options?.[0]?.value ?? '';
      else if (f.type === 'toggle') init[f.key] = false;
    });
    return init;
  });

  const [total, setTotal] = useState(config.basePrice);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    let calc = config.basePrice;
    config.factors.forEach((f) => {
      if (f.type === 'slider' && f.pricePerUnit) {
        calc += (values[f.key] as number) * f.pricePerUnit;
      } else if (f.type === 'select' && f.options) {
        const opt = f.options.find((o) => o.value === values[f.key]);
        if (opt) calc += opt.priceAdd;
      } else if (f.type === 'toggle' && values[f.key] === true) {
        calc += f.togglePriceAdd ?? 0;
      }
    });
    setAnimating(true);
    setTotal(calc);
    const t = setTimeout(() => setAnimating(false), 300);
    return () => clearTimeout(t);
  }, [values, config]);

  const buildSummary = () => {
    const lines: string[] = [`Service: ${config.serviceName}`];
    config.factors.forEach((f) => {
      if (f.type === 'slider') {
        lines.push(`${f.label}: ${values[f.key]} ${f.unit ?? ''}`);
      } else if (f.type === 'select' && f.options) {
        const opt = f.options.find((o) => o.value === values[f.key]);
        lines.push(`${f.label}: ${opt?.label ?? values[f.key]}`);
      } else if (f.type === 'toggle') {
        lines.push(`${f.label}: ${values[f.key] ? 'Yes' : 'No'}`);
      }
    });
    lines.push(`Estimated Total: ${config.currency} ${total.toLocaleString()}`);
    return lines.join('\n');
  };

  return (
    <>
      <style jsx>{`
        /* ── Overlay ───────────────────────────────────────────────── */
        .est-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(4px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: fadeIn 0.22s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ── Panel ─────────────────────────────────────────────────── */
        .est-panel {
          background: #fff;
          border-radius: 24px;
          width: 100%;
          max-width: 520px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 40px 100px rgba(0,0,0,0.28);
          animation: slideUp 0.3s cubic-bezier(.22,.68,0,1.2);
          position: relative;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .est-panel::-webkit-scrollbar { width: 4px; }
        .est-panel::-webkit-scrollbar-thumb {
          background: var(--est-accent);
          border-radius: 99px;
        }

        /* ── Header ────────────────────────────────────────────────── */
        .est-header {
          padding: 1.5rem 1.6rem 1.2rem;
          border-bottom: 1.5px solid #f3f4f6;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          position: sticky;
          top: 0;
          background: #fff;
          z-index: 2;
          border-radius: 24px 24px 0 0;
        }
        .est-header-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .est-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: var(--est-accent-light);
          border: 1.5px solid var(--est-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .est-title {
          font-size: 1rem;
          font-weight: 800;
          color: #111827;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }
        .est-subtitle {
          font-size: 0.74rem;
          color: #9ca3af;
          margin-top: 2px;
        }
        .est-close {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1.5px solid #e5e7eb;
          background: #f9fafb;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: background 0.15s, border-color 0.15s;
          color: #6b7280;
        }
        .est-close:hover {
          background: #fee2e2;
          border-color: #fca5a5;
          color: #dc2626;
        }

        /* ── Live total ────────────────────────────────────────────── */
        .est-total-bar {
          margin: 0 1.6rem;
          padding: 1rem 1.2rem;
          background: var(--est-accent-light);
          border-radius: 14px;
          border: 1.5px solid var(--est-accent);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 1.25rem;
        }
        .est-total-label {
          font-size: 0.76rem;
          font-weight: 700;
          color: var(--est-accent);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .est-total-amount {
          font-size: 1.6rem;
          font-weight: 900;
          color: var(--est-accent);
          letter-spacing: -0.04em;
          transition: transform 0.2s cubic-bezier(.22,.68,0,1.4), color 0.2s;
        }
        .est-total-amount.pop {
          transform: scale(1.12);
          color: var(--est-accent);
        }
        .est-base-note {
          font-size: 0.68rem;
          color: #9ca3af;
          margin-top: 2px;
        }

        /* ── Factors ───────────────────────────────────────────────── */
        .est-factors {
          padding: 1.25rem 1.6rem;
          display: flex;
          flex-direction: column;
          gap: 1.35rem;
        }

        .factor-block {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .factor-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .factor-label {
          font-size: 0.82rem;
          font-weight: 700;
          color: #374151;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .factor-value-badge {
          font-size: 0.76rem;
          font-weight: 800;
          color: var(--est-accent);
          background: var(--est-accent-light);
          border: 1px solid var(--est-accent);
          border-radius: 999px;
          padding: 2px 10px;
        }

        /* Slider */
        .factor-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 5px;
          border-radius: 99px;
          background: #e5e7eb;
          outline: none;
          cursor: pointer;
        }
        .factor-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--est-accent);
          cursor: pointer;
          box-shadow: 0 0 0 3px var(--est-accent-light), 0 2px 6px rgba(0,0,0,0.15);
          transition: transform 0.15s;
        }
        .factor-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
        .slider-minmax {
          display: flex;
          justify-content: space-between;
          font-size: 0.66rem;
          color: #9ca3af;
          margin-top: 2px;
        }

        /* Select */
        .factor-select {
          width: 100%;
          padding: 0.55rem 0.9rem;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          font-size: 0.82rem;
          color: #374151;
          background: #fafafa;
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.9rem center;
          transition: border-color 0.15s;
          font-family: inherit;
        }
        .factor-select:focus {
          outline: none;
          border-color: var(--est-accent);
          box-shadow: 0 0 0 3px var(--est-accent-light);
        }

        /* Toggle */
        .factor-toggle-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem 0.9rem;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          background: #fafafa;
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s;
        }
        .factor-toggle-row:hover {
          border-color: var(--est-accent);
          background: var(--est-accent-light);
        }
        .factor-toggle-row.active {
          border-color: var(--est-accent);
          background: var(--est-accent-light);
        }
        .toggle-switch {
          width: 38px;
          height: 22px;
          border-radius: 999px;
          background: #e5e7eb;
          position: relative;
          flex-shrink: 0;
          transition: background 0.2s;
        }
        .toggle-switch.on {
          background: var(--est-accent);
        }
        .toggle-knob {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
          transition: left 0.2s cubic-bezier(.22,.68,0,1.4);
        }
        .toggle-switch.on .toggle-knob { left: 19px; }
        .toggle-text {
          font-size: 0.81rem;
          font-weight: 600;
          color: #374151;
        }
        .toggle-add {
          font-size: 0.7rem;
          color: #9ca3af;
          margin-top: 1px;
        }

        /* ── Note ──────────────────────────────────────────────────── */
        .est-note {
          margin: 0 1.6rem;
          padding: 0.7rem 0.9rem;
          border-radius: 10px;
          background: #fffbeb;
          border: 1px solid #fde68a;
          display: flex;
          gap: 0.5rem;
          align-items: flex-start;
        }
        .est-note p {
          font-size: 0.72rem;
          color: #92400e;
          line-height: 1.55;
        }

        /* ── Footer ────────────────────────────────────────────────── */
        .est-footer {
          padding: 1.25rem 1.6rem 1.6rem;
          border-top: 1.5px solid #f3f4f6;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .est-cta-btn {
          width: 100%;
          padding: 0.85rem;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, var(--est-accent), var(--est-accent-to));
          color: #fff;
          font-size: 0.88rem;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: opacity 0.15s, transform 0.15s;
          letter-spacing: 0.01em;
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
          font-family: inherit;
        }
        .est-cta-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 10px 28px rgba(0,0,0,0.2);
        }
        .est-cta-btn:active { transform: translateY(0); }

        .est-dismiss {
          width: 100%;
          padding: 0.65rem;
          border-radius: 10px;
          border: 1.5px solid #e5e7eb;
          background: transparent;
          color: #6b7280;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
          font-family: inherit;
        }
        .est-dismiss:hover {
          background: #f3f4f6;
          color: #374151;
        }
      `}</style>

      <div
        className="est-overlay"
        style={{ '--est-accent': config.accentColor, '--est-accent-to': config.accentColor + 'cc', '--est-accent-light': config.accentColor + '18' } as React.CSSProperties}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div className="est-panel">

          {/* Header */}
          <div className="est-header">
            <div className="est-header-left">
              <div className="est-icon">
                <Calculator size={20} style={{ color: config.accentColor }} />
              </div>
              <div>
                <div className="est-title">{config.serviceName}</div>
                <div className="est-subtitle">Adjust the options to estimate your cost</div>
              </div>
            </div>
            <button className="est-close" onClick={onClose}>
              <X size={15} />
            </button>
          </div>

          {/* Live Total */}
          <div className="est-total-bar">
            <div>
              <div className="est-total-label">Estimated Cost</div>
              <div className="est-base-note">Base: {config.currency} {config.basePrice.toLocaleString()}</div>
            </div>
            <div className={`est-total-amount${animating ? ' pop' : ''}`}>
              {config.currency} {total.toLocaleString()}
            </div>
          </div>

          {/* Factors */}
          <div className="est-factors">
            {config.factors.map((factor) => (
              <div key={factor.key} className="factor-block">

                {/* ── Slider ── */}
                {factor.type === 'slider' && (
                  <>
                    <div className="factor-label-row">
                      <span className="factor-label">{factor.label}</span>
                      <span className="factor-value-badge">
                        {values[factor.key] as number} {factor.unit ?? ''}
                      </span>
                    </div>
                    <input
                      type="range"
                      className="factor-slider"
                      min={factor.min ?? 1}
                      max={factor.max ?? 100}
                      step={factor.step ?? 1}
                      value={values[factor.key] as number}
                      onChange={(e) =>
                        setValues((v) => ({ ...v, [factor.key]: Number(e.target.value) }))
                      }
                    />
                    <div className="slider-minmax">
                      <span>{factor.min ?? 1} {factor.unit ?? ''}</span>
                      <span>{factor.pricePerUnit ? `+${config.currency} ${factor.pricePerUnit.toLocaleString()} per ${factor.unit ?? 'unit'}` : ''}</span>
                      <span>{factor.max ?? 100} {factor.unit ?? ''}</span>
                    </div>
                  </>
                )}

                {/* ── Select ── */}
                {factor.type === 'select' && factor.options && (
                  <>
                    <div className="factor-label-row">
                      <span className="factor-label">{factor.label}</span>
                    </div>
                    <select
                      className="factor-select"
                      value={values[factor.key] as string}
                      onChange={(e) => setValues((v) => ({ ...v, [factor.key]: e.target.value }))}
                    >
                      {factor.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}{opt.priceAdd > 0 ? ` (+${config.currency} ${opt.priceAdd.toLocaleString()})` : opt.priceAdd < 0 ? ` (${config.currency} ${opt.priceAdd.toLocaleString()})` : ''}
                        </option>
                      ))}
                    </select>
                  </>
                )}

                {/* ── Toggle ── */}
                {factor.type === 'toggle' && (
                  <div
                    className={`factor-toggle-row${values[factor.key] ? ' active' : ''}`}
                    onClick={() => setValues((v) => ({ ...v, [factor.key]: !v[factor.key] }))}
                  >
                    <div>
                      <div className="toggle-text">{factor.toggleLabel ?? factor.label}</div>
                      {factor.togglePriceAdd != null && factor.togglePriceAdd > 0 && (
                        <div className="toggle-add">+{config.currency} {factor.togglePriceAdd.toLocaleString()}</div>
                      )}
                    </div>
                    <div className={`toggle-switch${values[factor.key] ? ' on' : ''}`}>
                      <div className="toggle-knob" />
                    </div>
                  </div>
                )}

              </div>
            ))}
          </div>

          {/* Optional note */}
          {config.note && (
            <div className="est-note">
              <Info size={13} style={{ color: '#d97706', flexShrink: 0, marginTop: 1 }} />
              <p>{config.note}</p>
            </div>
          )}

          {/* Footer CTAs */}
          <div className="est-footer">
            <button
              className="est-cta-btn"
              onClick={() => onGetQuote(config.serviceName, total, buildSummary())}
            >
              Get a Formal Quote <ArrowRight size={15} />
            </button>
            <button className="est-dismiss" onClick={onClose}>
              Keep browsing
            </button>
          </div>

        </div>
      </div>
    </>
  );
}