'use client';

import { useState } from 'react';

// ── Brand colours ─────────────────────────────────────────────────────────────
const BLUE  = '#273583';
const GREEN = '#40a535';
const RED   = '#cd1719';

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

  // ── Success state ─────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div
        className="rounded-2xl p-5 sm:p-6 text-center"
        style={{ background: `linear-gradient(135deg, ${GREEN}15 0%, ${BLUE}10 100%)`, border: `1.5px solid ${GREEN}40` }}
      >
        {/* Three-colour bar */}
        <div className="flex h-1 rounded-full overflow-hidden mb-4 mx-auto" style={{ maxWidth: '120px' }}>
          <div className="flex-1" style={{ background: BLUE }} />
          <div className="flex-1" style={{ background: GREEN }} />
          <div className="flex-1" style={{ background: RED }} />
        </div>
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
          style={{ background: GREEN }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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

  // ── Inline variant (used on the Leadership Review index page) ─────
  if (variant === 'inline') {
    return (
      <div
        className="rounded-2xl p-5 sm:p-7"
        style={{
          background: `linear-gradient(135deg, ${BLUE}08 0%, ${GREEN}08 100%)`,
          border: `1.5px solid ${BLUE}20`,
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: BLUE }} />
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: GREEN }} />
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: RED }} />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest" style={{ color: BLUE }}>
              Stay Informed
            </p>
            <p className="font-black text-gray-800 leading-tight text-sm sm:text-base" style={{ fontFamily: "'Playfair Display', serif" }}>
              Get New Issues Delivered to Your Inbox
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed mb-4">
          Be the first to read every new edition of The Leadership Review — free, straight to your inbox, no spam.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col sm:flex-row gap-2 mb-2">
            <input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={e => setName(e.target.value)}
              className="flex-1 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
              style={{ focusRingColor: BLUE } as React.CSSProperties}
            />
            <input
              type="email"
              required
              placeholder="Your email address *"
              value={email}
              onChange={e => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
              className="flex-1 rounded-xl border bg-white px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
              style={{ borderColor: status === 'error' ? RED : '#e5e7eb' }}
            />
          </div>

          {status === 'error' && (
            <p className="text-xs mb-2" style={{ color: RED }}>{message}</p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: `linear-gradient(135deg, ${BLUE} 0%, #1a2460 100%)` }}
          >
            {status === 'loading' ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Subscribing…
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M1 4l7 5 7-5M1 4v9a1 1 0 001 1h12a1 1 0 001-1V4M1 4a1 1 0 011-1h12a1 1 0 011 1" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Subscribe — It&apos;s Free
              </>
            )}
          </button>

          <p className="text-xs text-gray-400 mt-2 leading-relaxed">
            We&apos;ll send a confirmation email. You can unsubscribe at any time.
          </p>
        </form>
      </div>
    );
  }

  // ── Compact variant (used in sidebar / issue detail page) ─────────
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: `1.5px solid ${BLUE}20` }}
    >
      {/* Header bar */}
      <div className="px-4 py-3" style={{ background: BLUE }}>
        <div className="flex items-center gap-2 mb-0.5">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M1 4l7 5 7-5M1 4v9a1 1 0 001 1h12a1 1 0 001-1V4M1 4a1 1 0 011-1h12a1 1 0 011 1" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-white font-black text-xs uppercase tracking-widest">Stay Updated</p>
        </div>
        <p className="text-white/80 text-xs leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
          Get new issues in your inbox
        </p>
      </div>

      {/* Form body */}
      <div className="bg-white p-4">
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2">
          <input
            type="email"
            required
            placeholder="Your email address *"
            value={email}
            onChange={e => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
            className="w-full rounded-lg border bg-gray-50 px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all"
            style={{ borderColor: status === 'error' ? RED : '#e5e7eb' }}
          />
          {status === 'error' && (
            <p className="text-xs" style={{ color: RED }}>{message}</p>
          )}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-xs font-black hover:opacity-90 disabled:opacity-50 transition-all"
            style={{ background: GREEN }}
          >
            {status === 'loading' ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Subscribing…
              </>
            ) : (
              'Subscribe — Free'
            )}
          </button>
          <p className="text-xs text-gray-400 text-center leading-tight">
            Confirmation email sent. Unsubscribe anytime.
          </p>
        </form>
      </div>

      {/* Three-colour footer stripe */}
      <div className="flex h-1">
        <div className="flex-1" style={{ background: BLUE }} />
        <div className="flex-1" style={{ background: GREEN }} />
        <div className="flex-1" style={{ background: RED }} />
      </div>
    </div>
  );
}