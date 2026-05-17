'use client';
// FILE: src/components/SubscribeForm.tsx

import { useState } from 'react';

// ── Brand colours ─────────────────────────────────────────────────────────────
const BLUE  = '#273583';  // navy
const GREEN = '#40a535';  // forest green
const RED   = '#cd1719';  // deep red

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
  if (variant === 'inline') {
    return (
      <div
        className="rounded-2xl overflow-hidden px-6 sm:px-10 py-8 sm:py-10"
        style={{ background: BLUE }}
      >
        {/* Top rule — newspaper-style double line */}
        <div className="mb-5">
          <div style={{ height: '3px', background: 'rgba(255,255,255,0.5)', marginBottom: '2px' }} />
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.2)' }} />
        </div>

        {/* Label row */}
        <div className="flex items-center gap-3 mb-3">
          <p className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.75)' }}>
            ✉ Stay Informed
          </p>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.2)' }} />
          {/* Kenya flag stripe */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5px', flexShrink: 0 }}>
            <div style={{ width: '18px', height: '3px', background: '#006600', borderRadius: '1px' }} />
            <div style={{ width: '18px', height: '3px', background: '#BB0000', borderRadius: '1px' }} />
            <div style={{ width: '18px', height: '3px', background: '#000000', borderRadius: '1px' }} />
          </div>
        </div>

        {/* Heading */}
        <h3
          className="text-white mb-2 leading-tight"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            fontSize: 'clamp(1.3rem, 3vw, 1.85rem)',
          }}
        >
          Get New Issues Delivered to Your Inbox
        </h3>

        <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.65)' }}>
          Be the first to read every new edition of The Leadership Review — free, straight to your inbox, no spam.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={e => setName(e.target.value)}
              className="flex-1 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
              style={{ background: 'white', border: '1.5px solid transparent' }}
            />
            <input
              type="email"
              required
              placeholder="Your email address *"
              value={email}
              onChange={e => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
              className="flex-1 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
              style={{ background: 'white', border: `1.5px solid ${status === 'error' ? RED : 'transparent'}` }}
            />
          </div>

          {status === 'error' && (
            <p className="text-xs mb-3" style={{ color: '#fca5a5' }}>{message}</p>
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
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Confirmation email sent. Unsubscribe anytime.
            </p>
          </div>
        </form>

        {/* Bottom rule */}
        <div className="mt-6" style={{ height: '1px', background: 'rgba(255,255,255,0.15)' }} />
      </div>
    );
  }

  // ── COMPACT variant ────────────────────────────────────────────────────────
  // Sidebar card on the Issue Detail page, rendered inside IssueDetailClient.
  // Matches IssueInfoPanel's header style: solid navy header, white body.
  // Red subscribe button to create a strong visual hierarchy.
  // Unique identity: envelope icon in a red badge, bold serif headline.
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        border: `1.5px solid ${BLUE}`,
        boxShadow: '0 6px 24px rgba(40,53,131,0.15)',
      }}
    >
      {/* Solid navy header — matches IssueInfoPanel */}
      <div
        className="px-4 py-4 flex items-start gap-3"
        style={{ background: BLUE }}
      >
        {/* Envelope badge */}
        <div
          className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5"
          style={{ background: RED }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M1 4l7 5 7-5M1 4v9a1 1 0 001 1h12a1 1 0 001-1V4M1 4a1 1 0 011-1h12a1 1 0 011 1"
              stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p
            className="font-black text-white leading-snug"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.95rem' }}
          >
            Get New Issues in Your Inbox
          </p>
          <p className="text-white/60 text-xs mt-1">No spam · Unsubscribe anytime</p>
        </div>
      </div>

      {/* Thin tricolour rule */}
      <div style={{ display: 'flex', height: '3px' }}>
        <div style={{ flex: 1, background: '#006600' }} />
        <div style={{ flex: 1, background: RED }} />
        <div style={{ flex: 1, background: '#000' }} />
      </div>

      {/* Form body */}
      <div className="px-4 py-4 flex flex-col gap-2.5 bg-white">
        <input
          type="email"
          required
          placeholder="Your email address *"
          value={email}
          onChange={e => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
          className="w-full rounded-lg bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all"
          style={{ border: `1.5px solid ${status === 'error' ? RED : '#e5e7eb'}` }}
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
              Subscribe — It&apos;s Free
            </>
          )}
        </button>

        {/* Trust signals */}
        <div className="flex items-center justify-center gap-2 pt-0.5">
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
            <path d="M8 1l1.5 4.5H14l-3.5 2.5 1.5 4.5L8 10l-4 2.5 1.5-4.5L2 5.5h4.5z" stroke={BLUE} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-xs text-gray-400 italic">Digital edition · Published by Simon Designs</span>
        </div>
      </div>
    </div>
  );
}