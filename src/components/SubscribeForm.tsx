'use client';
// FILE: src/components/SubscribeForm.tsx

import { useState } from 'react';

// ── Brand colours ─────────────────────────────────────────────────────────────
const BLUE  = '#283583';  // navy
const GREEN = '#2e7d32';  // forest green
const RED   = '#BB0000';  // deep red

const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

type Variant = 'inline' | 'compact';

export default function SubscribeForm({ variant = 'inline' }: { variant?: Variant }) {
  const [email, setEmail]     = useState('');
  const [name, setName]       = useState('');
  const [status, setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }
    setStatus('loading');
    setMessage('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Subscription failed');
      setStatus('success');
      setMessage(data.message || 'Check your inbox to confirm your subscription!');
    } catch (err: unknown) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  // ── Success state (shared) ─────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div
        className="rounded-2xl p-6 text-center"
        style={{ background: `${GREEN}12`, border: `1.5px solid ${GREEN}40` }}
      >
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-3"
          style={{ background: GREEN }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M4 12l5 5L20 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-black text-sm text-gray-800 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
          Almost there!
        </p>
        <p className="text-xs text-gray-500 leading-relaxed">{message}</p>
      </div>
    );
  }

  // ── INLINE variant ─────────────────────────────────────────────────────────
  // Used on the Leadership Review listing page, sits below the navy nominate CTA.
  // Uses a very faint navy blue background so it doesn't shout — calm and clean,
  // distinct from the bold nominate banner above it without competing.
  if (variant === 'inline') {
    return (
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: `${BLUE}0d`,       // ~5% opacity navy — barely-there tint
          border: `1.5px solid ${BLUE}25`,
        }}
      >
        <div className="px-6 sm:px-10 py-8 sm:py-10">

          {/* Label */}
          <p
            className="text-xs font-black uppercase tracking-[0.18em] mb-2 flex items-center gap-1.5"
            style={{ color: BLUE }}
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path
                d="M1 4l7 5 7-5M1 4v9a1 1 0 001 1h12a1 1 0 001-1V4M1 4a1 1 0 011-1h12a1 1 0 011 1"
                stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
            Stay Informed
          </p>

          {/* Heading */}
          <h3
            className="text-gray-900 mb-2 leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: 'clamp(1.3rem, 3vw, 1.85rem)',
            }}
          >
            Get New Issues Delivered to Your Inbox
          </h3>

          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            Be the first to read every new edition of The Leadership Review — free, straight to your inbox, no spam.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col sm:flex-row gap-3 mb-3">
              <input
                type="text"
                placeholder="Your name (optional)"
                value={name}
                onChange={e => setName(e.target.value)}
                className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all"
              />
              <input
                type="email"
                required
                placeholder="Your email address *"
                value={email}
                onChange={e => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
                className="flex-1 rounded-xl bg-white px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all"
                style={{ border: `1.5px solid ${status === 'error' ? RED : '#e5e7eb'}` }}
              />
            </div>

            {status === 'error' && (
              <p className="text-xs mb-3" style={{ color: RED }}>{message}</p>
            )}

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-sm font-black text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                style={{ background: RED }}
              >
                {status === 'loading' ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Subscribing…
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M1 4l7 5 7-5M1 4v9a1 1 0 001 1h12a1 1 0 001-1V4M1 4a1 1 0 011-1h12a1 1 0 011 1"
                        stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
                      />
                    </svg>
                    Subscribe — It&apos;s Free
                  </>
                )}
              </button>
              <p className="text-xs text-gray-400">
                Confirmation email sent. Unsubscribe anytime.
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ── COMPACT variant ────────────────────────────────────────────────────────
  // Sidebar card on the Issue Detail page, rendered inside IssueInfoPanel,
  // positioned below the ShareAndSupportCard (see IssueInfoPanel.tsx).
  //
  // Header: faint navy blue background — calm, on-brand, not shouting.
  // Button: forest green — different from the blue info panel header and red
  //   accent label, so each element in the sidebar has its own colour identity.
  // No stripes. No bold gradients. Professional and clean.
  return (
    <div
      className="rounded-2xl overflow-hidden bg-white"
      style={{ border: '1.5px solid #e5e7eb', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
    >
      {/* Header — faint navy tint, red label for accent */}
      <div
        className="px-4 py-4"
        style={{
          background: `${BLUE}1a`,         // ~10% opacity navy — clearly distinct from white
          borderBottom: `1.5px solid ${BLUE}20`,
        }}
      >
        <p className="text-xs font-black uppercase tracking-widest mb-0.5" style={{ color: RED }}>
          ✉ Stay Updated
        </p>
        <p
          className="font-black text-gray-900 leading-snug text-sm"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Get new issues in your inbox
        </p>
        <p className="text-xs text-gray-400 mt-0.5">Free · No spam · Unsubscribe anytime</p>
      </div>

      {/* Form */}
      <div className="px-4 py-4 flex flex-col gap-2.5">
        <input
          type="email"
          required
          placeholder="Your email address *"
          value={email}
          onChange={e => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
          className="w-full rounded-lg border bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all"
          style={{ borderColor: status === 'error' ? RED : '#e5e7eb' }}
        />

        {status === 'error' && (
          <p className="text-xs" style={{ color: RED }}>{message}</p>
        )}

        <button
          type="submit"
          onClick={handleSubmit as any}
          disabled={status === 'loading'}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-xs font-black hover:opacity-90 disabled:opacity-50 transition-all"
          style={{ background: RED }}
        >
          {status === 'loading' ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Subscribing…
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path
                  d="M1 4l7 5 7-5M1 4v9a1 1 0 001 1h12a1 1 0 001-1V4M1 4a1 1 0 011-1h12a1 1 0 011 1"
                  stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
              Subscribe — Free
            </>
          )}
        </button>
      </div>
    </div>
  );
}