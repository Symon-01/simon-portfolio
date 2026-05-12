'use client';

// FILE LOCATION: src/components/PricingGuide.tsx
// Self-contained — estimator modal, service rows, and all variable configs live here.
// No sub-component imports needed beyond lucide-react and next/navigation.

import React, { useState, useCallback, useEffect } from 'react';
import {
  Palette, Megaphone, Layout, BookOpen, Package,
  ChevronDown, ChevronUp, Sparkles, X, Calculator,
  ArrowRight, Info, Tag, ChevronRight,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// ─── External types (passed in from PricingPageClient) ────────────────────────

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
  categoryImage?: { asset: { _ref?: string; url?: string }; alt?: string };
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

interface PricingGuideProps {
  categories: PricingCategory[];
  settings: PricingSettings | null;
}

// ─── Estimator types (internal) ───────────────────────────────────────────────

interface SliderFactor {
  key: string; label: string; type: 'slider';
  min: number; max: number; step: number; unit: string; pricePerUnit: number;
}
interface SelectFactor {
  key: string; label: string; type: 'select';
  options: { label: string; value: string; priceAdd: number }[];
}
interface ToggleFactor {
  key: string; label: string; type: 'toggle';
  toggleLabel: string; togglePriceAdd: number;
}
type Factor = SliderFactor | SelectFactor | ToggleFactor;

interface EstConfig {
  serviceName: string;
  basePrice: number;
  factors: Factor[];
  note?: string;
}

// ─── Card accent colours ──────────────────────────────────────────────────────

const ACCENTS = [
  { from: '#048F02', to: '#06b800', light: '#e8f5e9' },
  { from: '#EF6203', to: '#f7931e', light: '#fff3e0' },
  { from: '#0066cc', to: '#0099ff', light: '#e3f2fd' },
  { from: '#7b2d8b', to: '#b44fc4', light: '#f3e5f5' },
  { from: '#c62828', to: '#ef5350', light: '#ffebee' },
];

// ─── Icon map ─────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ElementType> = {
  palette: Palette, megaphone: Megaphone,
  layout: Layout, bookopen: BookOpen, package: Package,
};

// ─── Variable pricing configs ─────────────────────────────────────────────────
// Each entry: [keyword(s) to match in service name (lowercase), config builder]
// A service name only needs to INCLUDE one of these keywords to trigger the estimator.
// Add more entries here as you expand your service list.

const VAR_CONFIGS: [string[], (base: number, name: string) => EstConfig][] = [

  // ── Print & Publishing ────────────────────────────────────────────────────
  [['magazine'], (base, name) => ({
    serviceName: name, basePrice: base,
    factors: [
      { key: 'pages', label: 'Number of Pages', type: 'slider', min: 8, max: 200, step: 4, unit: 'pages', pricePerUnit: 120 },
      { key: 'images', label: 'Image Sourcing', type: 'select', options: [
        { label: 'Client supplies all images', value: 'client', priceAdd: 0 },
        { label: 'Some stock images (~10)', value: 'some', priceAdd: 2500 },
        { label: 'Full stock library (20+)', value: 'full', priceAdd: 6000 },
      ]},
      { key: 'rush', label: 'Rush Delivery', type: 'toggle', toggleLabel: 'Rush delivery (within 5 days)', togglePriceAdd: 3500 },
    ],
    note: 'Final quote may vary based on content complexity and revision rounds.',
  })],

  [['catalog', 'booklet', 'catalogue'], (base, name) => ({
    serviceName: name, basePrice: base,
    factors: [
      { key: 'pages', label: 'Number of Pages', type: 'slider', min: 8, max: 120, step: 4, unit: 'pages', pricePerUnit: 100 },
      { key: 'products', label: 'Product Count', type: 'select', options: [
        { label: 'Up to 20 products', value: 'small', priceAdd: 0 },
        { label: '21–60 products', value: 'medium', priceAdd: 3000 },
        { label: '60+ products', value: 'large', priceAdd: 7000 },
      ]},
      { key: 'retouch', label: 'Photo Retouching', type: 'toggle', toggleLabel: 'Include photo retouching', togglePriceAdd: 4000 },
    ],
    note: 'Per-page rate applies to layouts with pre-supplied, print-ready copy.',
  })],

  [['annual report'], (base, name) => ({
    serviceName: name, basePrice: base,
    factors: [
      { key: 'pages', label: 'Number of Pages', type: 'slider', min: 12, max: 100, step: 4, unit: 'pages', pricePerUnit: 150 },
      { key: 'charts', label: 'Charts & Infographics', type: 'select', options: [
        { label: 'None (text only)', value: 'none', priceAdd: 0 },
        { label: '1–5 infographics', value: 'few', priceAdd: 4000 },
        { label: '6–15 infographics', value: 'many', priceAdd: 9000 },
        { label: '15+ infographics', value: 'full', priceAdd: 16000 },
      ]},
      { key: 'rush', label: 'Priority Turnaround', type: 'toggle', toggleLabel: 'Priority turnaround', togglePriceAdd: 5000 },
    ],
    note: 'Financial data tables are included in the base per-page rate.',
  })],

  [['restaurant menu', 'menu'], (base, name) => ({
    serviceName: name, basePrice: base,
    factors: [
      { key: 'pages', label: 'Menu Pages', type: 'slider', min: 1, max: 24, step: 1, unit: 'pages', pricePerUnit: 400 },
      { key: 'size', label: 'Menu Size', type: 'select', options: [
        { label: 'A5 (half-page)', value: 'a5', priceAdd: 0 },
        { label: 'A4 (standard)', value: 'a4', priceAdd: 1000 },
        { label: 'A3 (large / wall)', value: 'a3', priceAdd: 2500 },
        { label: 'Custom / die-cut', value: 'custom', priceAdd: 5000 },
      ]},
      { key: 'photos', label: 'Food Photography', type: 'toggle', toggleLabel: 'Include food photography', togglePriceAdd: 8000 },
    ],
    note: 'Includes 2 revision rounds. Print-ready PDF supplied for all formats.',
  })],

  // ── Marketing Materials ───────────────────────────────────────────────────
  [['flyer', 'brochure'], (base, name) => ({
    serviceName: name, basePrice: base,
    factors: [
      { key: 'size', label: 'Size', type: 'select', options: [
        { label: 'A6 / DL (small flyer)', value: 'a6', priceAdd: 0 },
        { label: 'A5 (half A4)', value: 'a5', priceAdd: 500 },
        { label: 'A4 (standard)', value: 'a4', priceAdd: 1000 },
        { label: 'A3 (large)', value: 'a3', priceAdd: 2000 },
      ]},
      { key: 'sides', label: 'Sides', type: 'select', options: [
        { label: 'Single side', value: 'single', priceAdd: 0 },
        { label: 'Double side / tri-fold', value: 'double', priceAdd: 1500 },
      ]},
      { key: 'print', label: 'Print-Ready Files', type: 'toggle', toggleLabel: 'Print-ready files (CMYK + bleed)', togglePriceAdd: 800 },
    ],
    note: 'Social media (RGB) versions included at no extra charge.',
  })],

  [['billboard', 'banner'], (base, name) => ({
    serviceName: name, basePrice: base,
    factors: [
      { key: 'size', label: 'Billboard Size', type: 'select', options: [
        { label: 'Pull-up / Roll-up (0.85×2m)', value: 'pullup', priceAdd: 0 },
        { label: 'Street banner (3×1m)', value: 'street', priceAdd: 2000 },
        { label: 'Large billboard (8×3m)', value: 'large', priceAdd: 6000 },
        { label: 'Mega billboard (12m+)', value: 'mega', priceAdd: 12000 },
      ]},
      { key: 'complexity', label: 'Design Complexity', type: 'select', options: [
        { label: 'Simple (text + logo)', value: 'simple', priceAdd: 0 },
        { label: 'Standard (photos + graphics)', value: 'standard', priceAdd: 2000 },
        { label: 'Complex (custom illustration)', value: 'complex', priceAdd: 5000 },
      ]},
    ],
    note: 'Supplied as high-res PDF / TIFF at the required DPI for printing.',
  })],

  // ── UI/UX Design ──────────────────────────────────────────────────────────
  [['website ui', 'web ui', 'website design', 'web design'], (base, name) => ({
    serviceName: name, basePrice: base,
    factors: [
      { key: 'screens', label: 'Number of Screens / Pages', type: 'slider', min: 1, max: 30, step: 1, unit: 'screens', pricePerUnit: 2500 },
      { key: 'responsive', label: 'Mobile-Responsive Variants', type: 'toggle', toggleLabel: 'Mobile-responsive variants', togglePriceAdd: 8000 },
      { key: 'handoff', label: 'Developer Handoff', type: 'toggle', toggleLabel: 'Developer handoff (Figma annotations)', togglePriceAdd: 5000 },
    ],
    note: 'Designs delivered as Figma file with organised components and style guide.',
  })],

  [['mobile app', 'app ui', 'app design'], (base, name) => ({
    serviceName: name, basePrice: base,
    factors: [
      { key: 'screens', label: 'Number of Screens', type: 'slider', min: 5, max: 60, step: 5, unit: 'screens', pricePerUnit: 3000 },
      { key: 'platform', label: 'Platform', type: 'select', options: [
        { label: 'iOS only', value: 'ios', priceAdd: 0 },
        { label: 'Android only', value: 'android', priceAdd: 0 },
        { label: 'Both (iOS + Android)', value: 'both', priceAdd: 10000 },
      ]},
      { key: 'prototype', label: 'Interactive Prototype', type: 'toggle', toggleLabel: 'Interactive prototype (Figma)', togglePriceAdd: 7000 },
    ],
    note: 'Includes onboarding flow, core navigation, and up to 2 user flows.',
  })],

  [['wireframe', 'wireframing', 'prototype', 'prototyping'], (base, name) => ({
    serviceName: name, basePrice: base,
    factors: [
      { key: 'screens', label: 'Number of Screens', type: 'slider', min: 3, max: 40, step: 1, unit: 'screens', pricePerUnit: 1500 },
      { key: 'fidelity', label: 'Fidelity Level', type: 'select', options: [
        { label: 'Low-fi (grayscale blocks)', value: 'lofi', priceAdd: 0 },
        { label: 'Mid-fi (structure + labels)', value: 'midfi', priceAdd: 3000 },
        { label: 'Hi-fi (near-final visual)', value: 'hifi', priceAdd: 8000 },
      ]},
    ],
    note: 'All wireframes delivered in Figma with a clickable flow.',
  })],

  // ── Packaging Design ──────────────────────────────────────────────────────
  [['product packaging', 'packaging'], (base, name) => ({
    serviceName: name, basePrice: base,
    factors: [
      { key: 'complexity', label: 'Complexity Tier', type: 'select', options: [
        { label: 'Simple (flat label / sleeve)', value: 'simple', priceAdd: 0 },
        { label: 'Standard (shaped box + graphics)', value: 'standard', priceAdd: 4000 },
        { label: 'Premium (dieline + 3D mock)', value: 'premium', priceAdd: 9000 },
      ]},
      { key: 'variants', label: 'Number of Variants', type: 'slider', min: 1, max: 10, step: 1, unit: 'variants', pricePerUnit: 2500 },
      { key: 'mockup', label: '3D Mockup', type: 'toggle', toggleLabel: 'Photo-realistic 3D mockup', togglePriceAdd: 4500 },
    ],
    note: 'Includes print-ready dieline files and one structural revision.',
  })],

  [['label design', 'label'], (base, name) => ({
    serviceName: name, basePrice: base,
    factors: [
      { key: 'shape', label: 'Label Shape', type: 'select', options: [
        { label: 'Rectangle / Square', value: 'rect', priceAdd: 0 },
        { label: 'Circle / Oval', value: 'circle', priceAdd: 500 },
        { label: 'Custom die-cut', value: 'custom', priceAdd: 2500 },
      ]},
      { key: 'variants', label: 'Number of Variants', type: 'slider', min: 1, max: 8, step: 1, unit: 'variants', pricePerUnit: 1500 },
    ],
    note: 'Supplied as print-ready PDF + editable source file.',
  })],

  // ── Brand Identity ────────────────────────────────────────────────────────
  [['brand guideline', 'brand guide', 'brand manual'], (base, name) => ({
    serviceName: name, basePrice: base,
    factors: [
      { key: 'elements', label: 'Number of Brand Elements', type: 'select', options: [
        { label: 'Core (logo, colours, fonts)', value: 'core', priceAdd: 0 },
        { label: 'Extended (+ patterns, icons)', value: 'extended', priceAdd: 4000 },
        { label: 'Full (+ templates, imagery style)', value: 'full', priceAdd: 9000 },
      ]},
      { key: 'pages', label: 'Guideline Document Pages', type: 'slider', min: 10, max: 60, step: 5, unit: 'pages', pricePerUnit: 200 },
    ],
    note: 'Delivered as interactive PDF and editable source file.',
  })],

];

// ─── Helper: resolve variable config for a service ────────────────────────────
// Checks if ANY keyword in a keyword group is included in the service name.

function resolveConfig(service: PricingService): EstConfig | null {
  const lower = service.name.toLowerCase();
  for (const [keywords, builder] of VAR_CONFIGS) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return builder(service.price, service.name);
    }
  }
  return null;
}

// ─── Helper: sanity image URL ─────────────────────────────────────────────────

function sanityUrl(asset: { _ref?: string; url?: string }): string | null {
  if (asset.url) return asset.url;
  if (!asset._ref) return null;
  const pid = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
  const ds  = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  const id  = asset._ref.replace(/^image-/, '').replace(/-([a-z]+)$/, '.$1');
  return `https://cdn.sanity.io/images/${pid}/${ds}/${id}`;
}

// ─── Helper: format discount label ───────────────────────────────────────────

function fmtDiscount(raw: string): string {
  const t = raw.trim();
  if (t.startsWith('-')) return t;
  if (/^\d+$/.test(t)) return `-${t}%`;
  if (/^\d+%$/.test(t)) return `-${t}`;
  return t;
}

// ═══════════════════════════════════════════════════════════════════════════════
// ESTIMATOR MODAL (inline — no external import needed)
// ═══════════════════════════════════════════════════════════════════════════════

interface EstimatorProps {
  config: EstConfig;
  accentColor: string;
  currency: string;
  onClose: () => void;
  onGetQuote: (name: string, total: number, summary: string) => void;
}

function EstimatorModal({ config, accentColor, currency, onClose, onGetQuote }: EstimatorProps) {
  const al = accentColor + '22';

  const [vals, setVals] = useState<Record<string, number | string | boolean>>(() => {
    const init: Record<string, number | string | boolean> = {};
    config.factors.forEach((f) => {
      if (f.type === 'slider')       init[f.key] = f.min;
      else if (f.type === 'select')  init[f.key] = f.options[0]?.value ?? '';
      else if (f.type === 'toggle')  init[f.key] = false;
    });
    return init;
  });

  const [total, setTotal]   = useState(config.basePrice);
  const [popped, setPopped] = useState(false);

  useEffect(() => {
    let t = config.basePrice;
    config.factors.forEach((f) => {
      if (f.type === 'slider') {
        t += (vals[f.key] as number) * f.pricePerUnit;
      } else if (f.type === 'select') {
        const opt = f.options.find((o) => o.value === vals[f.key]);
        if (opt) t += opt.priceAdd;
      } else if (f.type === 'toggle' && vals[f.key] === true) {
        t += f.togglePriceAdd;
      }
    });
    setPopped(true);
    setTotal(t);
    const id = setTimeout(() => setPopped(false), 320);
    return () => clearTimeout(id);
  }, [vals, config]);

  const buildSummary = () => {
    const lines = [`Service: ${config.serviceName}`];
    config.factors.forEach((f) => {
      if (f.type === 'slider') {
        lines.push(`${f.label}: ${vals[f.key]} ${f.unit}`);
      } else if (f.type === 'select') {
        const opt = f.options.find((o) => o.value === vals[f.key]);
        lines.push(`${f.label}: ${opt?.label ?? vals[f.key]}`);
      } else if (f.type === 'toggle') {
        lines.push(`${f.label}: ${vals[f.key] ? 'Yes' : 'No'}`);
      }
    });
    lines.push(`Estimated Total: ${currency} ${total.toLocaleString()}`);
    return lines.join('\n');
  };

  return (
    <>
      <style>{`
        @keyframes _est_fi { from{opacity:0} to{opacity:1} }
        @keyframes _est_su {
          from{opacity:0;transform:translateY(28px) scale(.97)}
          to{opacity:1;transform:translateY(0) scale(1)}
        }
        @keyframes _est_pop {
          0%{transform:scale(1)} 45%{transform:scale(1.16)} 100%{transform:scale(1)}
        }
        ._est_panel::-webkit-scrollbar{width:4px}
        ._est_panel::-webkit-scrollbar-thumb{border-radius:99px;background:#ccc}
        ._est_range{
          -webkit-appearance:none;appearance:none;width:100%;height:5px;
          border-radius:99px;background:#e5e7eb;outline:none;cursor:pointer;
        }
        ._est_range::-webkit-slider-thumb{
          -webkit-appearance:none;appearance:none;
          width:20px;height:20px;border-radius:50%;cursor:pointer;
          transition:transform .15s;box-shadow:0 2px 6px rgba(0,0,0,.18);
        }
        ._est_range::-webkit-slider-thumb:hover{transform:scale(1.2)}
        ._est_sel{
          width:100%;padding:.55rem 2rem .55rem .9rem;border-radius:10px;
          font-size:.82rem;color:#374151;background:#fafafa;cursor:pointer;
          appearance:none;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
          background-repeat:no-repeat;background-position:right .9rem center;
          font-family:inherit;
        }
        ._est_sel:focus{outline:none}
        ._est_popped{animation:_est_pop .32s ease}
        ._est_cta{transition:opacity .15s, transform .15s}
        ._est_cta:hover{opacity:.88;transform:translateY(-1px)}
        ._est_cta:active{transform:translateY(0)}
        ._est_dim:hover{background:#f3f4f6;color:#374151}
      `}</style>

      {/* Backdrop */}
      <div
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,.55)',
          backdropFilter: 'blur(4px)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1rem', animation: '_est_fi .22s ease',
        }}
      >
        {/* Panel */}
        <div
          className="_est_panel"
          style={{
            background: '#fff', borderRadius: 24, width: '100%', maxWidth: 520,
            maxHeight: '90vh', overflowY: 'auto',
            boxShadow: '0 40px 100px rgba(0,0,0,.28)',
            animation: '_est_su .3s cubic-bezier(.22,.68,0,1.2)',
          }}
        >
          {/* Header */}
          <div style={{
            padding: '1.5rem 1.6rem 1.2rem', borderBottom: '1.5px solid #f3f4f6',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
            gap: '1rem', position: 'sticky', top: 0, background: '#fff', zIndex: 2,
            borderRadius: '24px 24px 0 0',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, background: al,
                border: `1.5px solid ${accentColor}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Calculator size={20} color={accentColor} />
              </div>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', letterSpacing: '-.02em', lineHeight: 1.2 }}>
                  {config.serviceName}
                </div>
                <div style={{ fontSize: '.74rem', color: '#9ca3af', marginTop: 2 }}>
                  Adjust the options to estimate your cost
                </div>
              </div>
            </div>
            <button onClick={onClose} style={{
              width: 34, height: 34, borderRadius: '50%',
              border: '1.5px solid #e5e7eb', background: '#f9fafb',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', flexShrink: 0, color: '#6b7280',
            }}>
              <X size={15} />
            </button>
          </div>

          {/* Live total */}
          <div style={{
            margin: '1.25rem 1.6rem 0', padding: '1rem 1.2rem', background: al,
            borderRadius: 14, border: `1.5px solid ${accentColor}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
          }}>
            <div>
              <div style={{ fontSize: '.72rem', fontWeight: 700, color: accentColor, textTransform: 'uppercase', letterSpacing: '.1em' }}>
                Estimated Cost
              </div>
              <div style={{ fontSize: '.68rem', color: '#9ca3af', marginTop: 2 }}>
                Base: {currency} {config.basePrice.toLocaleString()}
              </div>
            </div>
            <div className={popped ? '_est_popped' : ''} style={{
              fontSize: '1.6rem', fontWeight: 900, color: accentColor, letterSpacing: '-.04em',
            }}>
              {currency} {total.toLocaleString()}
            </div>
          </div>

          {/* Factors */}
          <div style={{ padding: '1.25rem 1.6rem', display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
            {config.factors.map((factor) => (
              <div key={factor.key} style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>

                {/* Slider */}
                {factor.type === 'slider' && (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '.82rem', fontWeight: 700, color: '#374151' }}>{factor.label}</span>
                      <span style={{
                        fontSize: '.76rem', fontWeight: 800, color: accentColor,
                        background: al, border: `1px solid ${accentColor}`, borderRadius: 999, padding: '2px 10px',
                      }}>
                        {vals[factor.key] as number} {factor.unit}
                      </span>
                    </div>
                    <input
                      type="range"
                      className="_est_range"
                      min={factor.min} max={factor.max} step={factor.step}
                      value={vals[factor.key] as number}
                      style={{ accentColor } as React.CSSProperties}
                      onChange={(e) => setVals((v) => ({ ...v, [factor.key]: Number(e.target.value) }))}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.66rem', color: '#9ca3af' }}>
                      <span>{factor.min} {factor.unit}</span>
                      <span>+{currency} {factor.pricePerUnit.toLocaleString()} / {factor.unit}</span>
                      <span>{factor.max} {factor.unit}</span>
                    </div>
                  </>
                )}

                {/* Select */}
                {factor.type === 'select' && (
                  <>
                    <span style={{ fontSize: '.82rem', fontWeight: 700, color: '#374151' }}>{factor.label}</span>
                    <select
                      className="_est_sel"
                      value={vals[factor.key] as string}
                      style={{ border: '1.5px solid #e5e7eb' }}
                      onChange={(e) => setVals((v) => ({ ...v, [factor.key]: e.target.value }))}
                    >
                      {factor.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                          {opt.priceAdd > 0 ? ` (+${currency} ${opt.priceAdd.toLocaleString()})` : ''}
                          {opt.priceAdd < 0 ? ` (−${currency} ${Math.abs(opt.priceAdd).toLocaleString()})` : ''}
                        </option>
                      ))}
                    </select>
                  </>
                )}

                {/* Toggle */}
                {factor.type === 'toggle' && (
                  <div
                    onClick={() => setVals((v) => ({ ...v, [factor.key]: !v[factor.key] }))}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '.6rem .9rem',
                      border: `1.5px solid ${vals[factor.key] ? accentColor : '#e5e7eb'}`,
                      borderRadius: 10,
                      background: vals[factor.key] ? al : '#fafafa',
                      cursor: 'pointer', transition: 'border-color .15s, background .15s',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '.81rem', fontWeight: 600, color: '#374151' }}>
                        {factor.toggleLabel}
                      </div>
                      {factor.togglePriceAdd > 0 && (
                        <div style={{ fontSize: '.7rem', color: '#9ca3af', marginTop: 1 }}>
                          +{currency} {factor.togglePriceAdd.toLocaleString()}
                        </div>
                      )}
                    </div>
                    {/* Switch */}
                    <div style={{
                      width: 38, height: 22, borderRadius: 999, flexShrink: 0,
                      background: vals[factor.key] ? accentColor : '#e5e7eb',
                      position: 'relative', transition: 'background .2s',
                    }}>
                      <div style={{
                        position: 'absolute', top: 3,
                        left: vals[factor.key] ? 19 : 3,
                        width: 16, height: 16, borderRadius: '50%',
                        background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,.2)',
                        transition: 'left .2s cubic-bezier(.22,.68,0,1.4)',
                      }} />
                    </div>
                  </div>
                )}

              </div>
            ))}
          </div>

          {/* Note */}
          {config.note && (
            <div style={{
              margin: '0 1.6rem', padding: '.7rem .9rem', borderRadius: 10,
              background: '#fffbeb', border: '1px solid #fde68a',
              display: 'flex', gap: '.5rem', alignItems: 'flex-start',
            }}>
              <Info size={13} color="#d97706" style={{ flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: '.72rem', color: '#92400e', lineHeight: 1.55, margin: 0 }}>
                {config.note}
              </p>
            </div>
          )}

          {/* Footer */}
          <div style={{
            padding: '1.25rem 1.6rem 1.6rem', borderTop: '1.5px solid #f3f4f6',
            marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '.65rem',
          }}>
            <button
              className="_est_cta"
              onClick={() => onGetQuote(config.serviceName, total, buildSummary())}
              style={{
                width: '100%', padding: '.85rem', borderRadius: 12, border: 'none',
                background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
                color: '#fff', fontSize: '.88rem', fontWeight: 800, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem',
                boxShadow: '0 6px 20px rgba(0,0,0,.15)', fontFamily: 'inherit',
                letterSpacing: '.01em',
              }}
            >
              Get a Formal Quote <ArrowRight size={15} />
            </button>
            <button
              className="_est_dim"
              onClick={onClose}
              style={{
                width: '100%', padding: '.65rem', borderRadius: 10,
                border: '1.5px solid #e5e7eb', background: 'transparent',
                color: '#6b7280', fontSize: '.8rem', fontWeight: 600,
                cursor: 'pointer', fontFamily: 'inherit',
                transition: 'background .15s, color .15s',
              }}
            >
              Keep browsing
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICE ROW (inline)
// ═══════════════════════════════════════════════════════════════════════════════

interface ServiceRowProps {
  service: PricingService;
  accentColor: string;
  currency: string;
  estConfig: EstConfig | null;
  onGetQuote: (name: string, total: number, summary: string) => void;
}

function ServiceRow({ service, accentColor, currency, estConfig, onGetQuote }: ServiceRowProps) {
  const [open, setOpen] = useState(false);
  const isVar = estConfig !== null;
  const al    = accentColor + '18';

  return (
    <>
      <style>{`
        ._sr { padding:.62rem 0; border-bottom:1px dashed #ececec }
        ._sr:last-child { border-bottom:none; padding-bottom:0 }
        ._est_btn {
          display:inline-flex; align-items:center; gap:5px; margin-top:.45rem;
          padding:5px 12px; border-radius:999px; font-size:.72rem; font-weight:800;
          cursor:pointer; font-family:inherit; letter-spacing:.02em;
          transition:background .15s, color .15s, transform .15s;
        }
        ._est_btn:hover { transform:translateY(-1px) }
        ._est_btn:active { transform:translateY(0) }
      `}</style>

      <div className="_sr">
        {/* Name + price */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '.5rem' }}>
          <span style={{ fontSize: '.82rem', fontWeight: 600, color: '#374151', lineHeight: 1.35, flex: 1 }}>
            {service.name}
          </span>
          {isVar ? (
            <span style={{ fontSize: '.72rem', color: '#6b7280', fontStyle: 'italic', flexShrink: 0 }}>
              From {currency} {service.price.toLocaleString()}
            </span>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexShrink: 0 }}>
              <span style={{ fontSize: '.86rem', fontWeight: 800, color: accentColor, letterSpacing: '-.01em' }}>
                {service.priceLabel}
              </span>
              {service.originalPriceLabel && (
                <span style={{ fontSize: '.67rem', color: '#d1d5db', textDecoration: 'line-through', marginTop: 1 }}>
                  {service.originalPriceLabel}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Description */}
        {service.description &&
          service.description.trim().toLowerCase() !== service.name.trim().toLowerCase() && (
          <div style={{ fontSize: '.71rem', color: '#9ca3af', lineHeight: 1.45, marginTop: 3 }}>
            {service.description}
          </div>
        )}

        {/* Discount pill + estimate button */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6, marginTop: 4 }}>
          {service.discountLabel && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 3,
              padding: '2px 8px', borderRadius: 999, fontSize: '.65rem', fontWeight: 900,
              letterSpacing: '.06em', background: 'linear-gradient(135deg,#EF6203,#f7931e)',
              color: '#fff', boxShadow: '0 2px 5px rgba(239,98,3,.28)',
            }}>
              <Tag size={8} />
              {fmtDiscount(service.discountLabel)}
            </span>
          )}
          {isVar && (
            <button
              className="_est_btn"
              onClick={() => setOpen(true)}
              style={{
                border: `1.5px solid ${accentColor}`,
                background: al,
                color: accentColor,
              }}
            >
              <Calculator size={11} />
              Estimate Price
              <ChevronRight size={10} />
            </button>
          )}
        </div>
      </div>

      {open && estConfig && (
        <EstimatorModal
          config={estConfig}
          accentColor={accentColor}
          currency={currency}
          onClose={() => setOpen(false)}
          onGetQuote={(name, total, summary) => { setOpen(false); onGetQuote(name, total, summary); }}
        />
      )}
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PRICING GUIDE — main export
// ═══════════════════════════════════════════════════════════════════════════════

export default function PricingGuide({ categories, settings }: PricingGuideProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const router = useRouter();

  const toggle = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });

  const handleGetQuote = useCallback(
    (serviceName: string, estimate: number, details: string) => {
      const p = new URLSearchParams({ service: serviceName, estimate: String(estimate), details });
      router.push(`/contact?${p.toString()}`);
    },
    [router]
  );

  const currency = settings?.currencySymbol || 'KES';

  return (
    <>
      <style>{`
        .pg-section{padding:4.5rem 0 5rem;background:#f7f8fa;position:relative;overflow:hidden}
        .pg-section::before{content:'';position:absolute;inset:0;
          background-image:radial-gradient(circle,#d1d5db 1px,transparent 1px);
          background-size:28px 28px;opacity:.4;pointer-events:none}
        .pg-section::after{content:'';position:absolute;top:-120px;left:-120px;
          width:480px;height:480px;
          background:radial-gradient(circle,rgba(4,143,2,.08) 0%,transparent 70%);pointer-events:none}
        .pg-inner{max-width:1100px;margin:0 auto;padding:0 1.5rem;position:relative;z-index:1}
        .pg-eyebrow{display:inline-flex;align-items:center;gap:6px;background:#e8f5e9;color:#048F02;
          font-size:.7rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;
          padding:5px 16px;border-radius:999px;margin-bottom:1rem;border:1px solid #c8e6c9}
        .pg-title{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:900;color:#048F02;
          letter-spacing:-.035em;line-height:1.1;margin-bottom:.65rem}
        .pg-sub{font-size:.92rem;color:#6b7280;max-width:520px;margin:0 auto;line-height:1.65}
        .pg-legend{display:flex;align-items:center;justify-content:center;gap:1.25rem;
          margin-bottom:2.25rem;flex-wrap:wrap}
        .pg-legend-item{display:flex;align-items:center;gap:5px;font-size:.72rem;color:#6b7280;font-weight:600}
        .pg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
        @media(max-width:900px){.pg-grid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:560px){.pg-grid{grid-template-columns:1fr}}
        .pg-card{background:#fff;border-radius:20px;overflow:hidden;display:flex;
          flex-direction:column;border:1.5px solid #e5e7eb;
          transition:transform .3s cubic-bezier(.22,.68,0,1.2),box-shadow .3s ease,border-color .2s ease;
          box-shadow:0 2px 12px rgba(0,0,0,.06)}
        .pg-card:hover{transform:translateY(-6px);box-shadow:0 24px 56px rgba(0,0,0,.12)}
        .pg-stripe{height:4px;flex-shrink:0}
        .pg-img{width:100%;height:165px;overflow:hidden;flex-shrink:0;position:relative}
        .pg-img::after{content:'';position:absolute;inset:0;
          background:linear-gradient(to bottom,transparent 40%,rgba(0,0,0,.22) 100%)}
        .pg-img img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s ease}
        .pg-card:hover .pg-img img{transform:scale(1.07)}
        .pg-body{padding:1.35rem 1.4rem 1.3rem;flex:1;display:flex;flex-direction:column}
        .pg-ibadge{width:42px;height:42px;border-radius:11px;display:flex;align-items:center;
          justify-content:center;flex-shrink:0}
        .pg-card-title{font-size:.98rem;font-weight:800;color:#111827;letter-spacing:-.02em;line-height:1.2}
        .pg-card-desc{font-size:.81rem;color:#6b7280;line-height:1.6;margin:.7rem 0 .5rem;flex:1}
        .pg-count{display:inline-flex;align-items:center;gap:4px;font-size:.68rem;font-weight:700;
          color:#9ca3af;margin-bottom:.65rem}
        .pg-toggle{display:inline-flex;align-items:center;gap:5px;font-size:.76rem;font-weight:700;
          border-radius:999px;padding:5px 13px;cursor:pointer;width:fit-content;
          transition:background .18s,color .18s;letter-spacing:.01em;font-family:inherit;border:none}
        .pg-services-panel{margin-top:1rem;padding-top:.85rem;border-top:1.5px solid #f3f4f6}
        .pg-hint{display:flex;align-items:center;gap:6px;padding:7px 11px;background:#fff8f0;
          border:1px solid #fed7aa;border-radius:8px;margin-bottom:.75rem;
          font-size:.69rem;color:#92400e;font-weight:600}
        .pg-rule{height:2px;margin-top:4rem;
          background:linear-gradient(to right,transparent,#EF6203 30%,#048F02 70%,transparent);opacity:.3}
      `}</style>

      <section className="pg-section">
        <div className="pg-inner">

          {/* Heading */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="pg-eyebrow"><Sparkles size={11} /> Transparent &amp; Flexible</div>
            <h2 className="pg-title">{settings?.pageTitle || 'Our Pricing Guide'}</h2>
            <p className="pg-sub">
              {settings?.pageSubtitle || 'Custom packages available for larger projects. All prices in KES.'}
            </p>
          </div>

          {/* Legend */}
          <div className="pg-legend">
            <div className="pg-legend-item">
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#048F02', flexShrink: 0 }} />
              Fixed price — shown directly
            </div>
            <div className="pg-legend-item">
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF6203', flexShrink: 0 }} />
              Variable price — use the estimator to calculate your cost
            </div>
          </div>

          {/* Cards */}
          <div className="pg-grid">
            {categories.map((cat, idx) => {
              const accent   = ACCENTS[idx % ACCENTS.length];
              const IconComp = ICON_MAP[cat.icon?.toLowerCase()] || Palette;
              const isOpen   = expanded.has(cat._id);
              const imgUrl   = cat.categoryImage?.asset ? sanityUrl(cat.categoryImage.asset) : null;
              const hasVar   = cat.services?.some((s) => resolveConfig(s) !== null);

              return (
                <div key={cat._id} className="pg-card">
                  {/* Top stripe */}
                  <div className="pg-stripe"
                    style={{ background: `linear-gradient(90deg,${accent.from},${accent.to})` }} />

                  {/* Image */}
                  {imgUrl && (
                    <div className="pg-img">
                      <img src={imgUrl} alt={cat.categoryImage?.alt || cat.name} />
                    </div>
                  )}

                  {/* Body */}
                  <div className="pg-body">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.7rem', marginBottom: 0 }}>
                      <div className="pg-ibadge"
                        style={{ background: accent.light, border: `1.5px solid ${accent.from}` }}>
                        <IconComp size={19} style={{ color: accent.from }} />
                      </div>
                      <h3 className="pg-card-title">{cat.name}</h3>
                    </div>

                    <p className="pg-card-desc">{cat.description}</p>

                    {cat.services?.length > 0 && (
                      <div className="pg-count">
                        {cat.services.length} service{cat.services.length !== 1 ? 's' : ''}
                        {hasVar && <> · includes price estimator</>}
                      </div>
                    )}

                    <button
                      className="pg-toggle"
                      onClick={() => toggle(cat._id)}
                      style={{
                        color: accent.from,
                        background: accent.light,
                        border: `1.5px solid ${accent.from}`,
                      }}
                    >
                      {isOpen
                        ? <><ChevronUp size={12} /> Hide Services</>
                        : <><ChevronDown size={12} /> Show Services</>}
                    </button>

                    {isOpen && cat.services?.length > 0 && (
                      <div className="pg-services-panel">
                        {hasVar && (
                          <div className="pg-hint">
                            🧮 Some services include a price estimator — tap &quot;Estimate Price&quot; to get a cost breakdown before requesting a quote.
                          </div>
                        )}
                        {cat.services.map((service) => (
                          <ServiceRow
                            key={service._id}
                            service={service}
                            accentColor={accent.from}
                            currency={currency}
                            estConfig={resolveConfig(service)}
                            onGetQuote={handleGetQuote}
                          />
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

          <div className="pg-rule" />
        </div>
      </section>
    </>
  );
}