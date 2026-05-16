'use client';

import { useState, useEffect } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────

export type NestedReply = {
  _key: string;
  text: string;
  date: string;
  authorName?: string;
  affiliation?: string;
  helpfulCount?: number;
  replies?: NestedReply[];
};

export type Review = {
  _key?: string;
  reviewerName: string;
  affiliation?: string;
  location?: string;
  rating: number;
  comment: string;
  date?: string;
  helpfulCount?: number;
  replies?: NestedReply[];
};

// ── Star display ──────────────────────────────────────────────────────────────
export function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="13" height="13" viewBox="0 0 16 16"
          fill={s <= rating ? '#EF6203' : 'none'}
          stroke={s <= rating ? '#EF6203' : '#d1d5db'} strokeWidth="1.2">
          <path d="M8 1l1.9 4 4.4.6-3.2 3.1.8 4.4L8 11l-3.9 2.1.8-4.4L1.7 5.6l4.4-.6z" />
        </svg>
      ))}
    </div>
  );
}

// ── Avatar ────────────────────────────────────────────────────────────────────
function Avatar({ name, size = 36 }: { name: string; size?: number }) {
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
  const palette = ['#283583', '#cd171a', '#3fa535', '#EF6203', '#7C3AED', '#0891B2'];
  const bg = palette[name.charCodeAt(0) % palette.length];
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-black flex-shrink-0 select-none"
      style={{
        width: size, height: size,
        fontSize: size * 0.33,
        background: bg,
        boxShadow: `0 0 0 2px white, 0 0 0 3.5px ${bg}40`,
      }}
    >
      {initials}
    </div>
  );
}

// ── Reply composer ─────────────────────────────────────────────────────────────
function ReplyComposer({
  onPost, onCancel, posting,
}: {
  onPost: (name: string, affiliation: string, text: string) => void;
  onCancel: () => void;
  posting: boolean;
}) {
  const [text,  setText]  = useState('');
  const [name,  setName]  = useState('');
  const [affil, setAffil] = useState('');

  const focus = (e: React.FocusEvent<any>) => { e.target.style.borderColor = '#283583'; };
  const blur  = (e: React.FocusEvent<any>) => { e.target.style.borderColor = '#e5e7eb'; };
  const canPost = name.trim().length > 0 && text.trim().length > 0;

  return (
    <div className="mt-3 mb-1 rounded-xl overflow-hidden" style={{ border: '1px solid #e5e7eb' }}>
      <textarea
        autoFocus rows={3}
        placeholder="Write your reply…"
        value={text} onChange={(e) => setText(e.target.value)}
        className="w-full text-sm px-4 py-3 outline-none resize-none border-b"
        style={{ borderColor: '#e5e7eb', color: '#111827', background: '#ffffff' }}
        onFocus={(e) => { e.target.style.borderColor = '#283583'; }}
        onBlur={(e)  => { e.target.style.borderColor = '#e5e7eb'; }}
      />
      <div className="grid grid-cols-2 gap-0 border-b" style={{ borderColor: '#e5e7eb' }}>
        <input type="text" placeholder="Your name (Required)"
          value={name} onChange={(e) => setName(e.target.value)}
          className="text-sm px-4 py-2.5 outline-none border-r appearance-none"
          style={{ borderColor: '#e5e7eb', color: '#111827', background: '#ffffff' }}
          onFocus={focus} onBlur={blur}
        />
        <input type="text" placeholder="Affiliation"
          value={affil} onChange={(e) => setAffil(e.target.value)}
          className="text-sm px-4 py-2.5 outline-none appearance-none"
          style={{ color: '#111827', background: '#ffffff' }}
          onFocus={focus} onBlur={blur}
        />
      </div>
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50">
        <button onClick={onCancel} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
          Cancel
        </button>
        <button
          onClick={() => canPost && onPost(name.trim(), affil.trim(), text.trim())}
          disabled={posting || !canPost}
          className="text-xs font-black px-5 py-2 rounded-lg text-white tracking-wide transition-opacity hover:opacity-80 disabled:opacity-40 uppercase"
          style={{ background: '#283583', letterSpacing: '0.06em' }}
        >
          {posting ? 'Posting…' : 'Post Reply'}
        </button>
      </div>
    </div>
  );
}

// ── Action bar ────────────────────────────────────────────────────────────────
function ActionBar({
  likeCount, liked, onLike,
  replyCount, showReply, onToggleReply,
  onShare, shareDone,
}: {
  likeCount: number; liked: boolean; onLike: () => void;
  replyCount: number; showReply: boolean; onToggleReply: () => void;
  onShare: () => void; shareDone: boolean;
}) {
  return (
    <div className="flex items-center gap-0.5 pt-1.5 mt-1.5 border-t" style={{ borderColor: '#28358312' }}>
      <button
        onClick={onLike}
        className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold transition-all hover:scale-105 active:scale-95 select-none"
        style={{ color: liked ? '#cd171a' : '#9ca3af', background: liked ? '#cd171a10' : 'transparent' }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24"
          fill={liked ? '#cd171a' : 'none'} stroke={liked ? '#cd171a' : '#9ca3af'}
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        {likeCount > 0 ? `Helpful (${likeCount})` : 'Helpful'}
      </button>

      <button
        onClick={onToggleReply}
        className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold transition-all hover:bg-gray-50 select-none"
        style={{ color: showReply ? '#283583' : '#9ca3af' }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 17 4 12 9 7" /><path d="M20 18v-2a4 4 0 0 0-4-4H4" />
        </svg>
        Reply{replyCount > 0 ? ` (${replyCount})` : ''}
      </button>

      <button
        onClick={onShare}
        className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold transition-all hover:bg-gray-50 select-none ml-auto"
        style={{ color: shareDone ? '#3fa535' : '#9ca3af' }}
      >
        {shareDone ? (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="#3fa535" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13l4 4L19 7" />
            </svg>
            Copied!
          </>
        ) : (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Share
          </>
        )}
      </button>
    </div>
  );
}

// ── Recursive reply node ───────────────────────────────────────────────────────
// replyKey is the unique _key of this reply — used as the localStorage key
// so the "already voted" state persists across refreshes at every nesting depth.
function ReplyNode({
  reply,
  depth,
}: {
  reply: NestedReply;
  depth: number;
}) {
  // ── Helpful — persisted in localStorage per reply _key ────────────────────
  const storageKey = `helpful_reply_${reply._key}`;
  const [liked,     setLiked]     = useState(false);
  const [likeCount, setLikeCount] = useState(reply.helpfulCount ?? 0);

  // Restore voted state from localStorage on mount
  useEffect(() => {
    try {
      if (localStorage.getItem(storageKey) === '1') setLiked(true);
    } catch { /* private browsing — silently ignore */ }
  }, [storageKey]);

  function handleLike() {
    if (liked) return;
    setLiked(true);
    setLikeCount((c) => c + 1);
    // Persist flag so vote survives refresh
    try { localStorage.setItem(storageKey, '1'); } catch { /* ignore */ }
    // NOTE: nested reply helpful counts are stored only in localStorage
    // (not synced to Sanity) because Sanity's patch syntax doesn't support
    // deeply nested array-of-array mutations. The top-level review helpful
    // count IS synced to Sanity. For nested replies, localStorage is sufficient
    // — the count resets if the user clears their browser data, which is
    // an acceptable trade-off for deeply nested content.
  }

  const [showReply, setShowReply] = useState(false);
  const [posting,   setPosting]   = useState(false);
  const [shareDone, setShareDone] = useState(false);
  const [children,  setChildren]  = useState<NestedReply[]>(reply.replies || []);

  const indent = Math.min(depth, 4) * 16;

  function handleShare() {
    const snippet = reply.authorName ? `${reply.authorName}: ${reply.text}` : reply.text;
    navigator.clipboard.writeText(`${snippet}\n\n${window.location.href}`).then(() => {
      setShareDone(true);
      setTimeout(() => setShareDone(false), 2500);
    });
  }

  async function handlePost(name: string, affiliation: string, text: string) {
    setPosting(true);
    const newReply: NestedReply = {
      _key:        `reply_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      text,
      date:        new Date().toISOString().split('T')[0],
      authorName:  name,
      affiliation: affiliation || undefined,
      helpfulCount: 0,
      replies:     [],
    };
    setChildren((prev) => [...prev, newReply]);
    setShowReply(false);
    setPosting(false);
  }

  return (
    <div style={{ marginLeft: indent }}>
      <div className="flex gap-2.5 items-start">
        <Avatar name={reply.authorName || 'R'} size={30} />
        <div className="flex-1 min-w-0">
          <div className="rounded-xl px-3 py-2.5" style={{ background: '#f8f9ff', border: '1px solid #28358315' }}>
            {/* Author row */}
            <div className="flex flex-wrap items-center gap-1.5 mb-1">
              <span className="text-xs font-black" style={{ color: '#283583' }}>
                {reply.authorName || 'Anonymous'}
              </span>
              {reply.affiliation && (
                <span className="text-xs font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: '#EF620315', color: '#EF6203', border: '1px solid #EF620335', fontSize: '10px' }}>
                  {reply.affiliation}
                </span>
              )}
              {reply.date && (
                <span className="text-xs text-gray-400 ml-auto" style={{ fontSize: '10px' }}>
                  {new Date(reply.date).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              )}
            </div>

            {/* Reply text */}
            <p className="text-xs text-gray-700 leading-relaxed">{reply.text}</p>

            {/* Action bar — with persisted helpful count */}
            <ActionBar
              likeCount={likeCount} liked={liked} onLike={handleLike}
              replyCount={children.length} showReply={showReply}
              onToggleReply={() => setShowReply((v) => !v)}
              onShare={handleShare} shareDone={shareDone}
            />
          </div>

          {showReply && (
            <ReplyComposer onPost={handlePost} onCancel={() => setShowReply(false)} posting={posting} />
          )}

          {children.length > 0 && (
            <div className="mt-2.5 flex flex-col gap-2.5">
              {children.map((child) => (
                <ReplyNode key={child._key} reply={child} depth={depth + 1} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Top-level review card ─────────────────────────────────────────────────────
function ReviewCard({
  r, index, isNewest, issueId,
}: {
  r: Review; index: number; isNewest: boolean; issueId: string;
}) {
  const reviewKey  = r._key || '';
  const storageKey = `helpful_${issueId}_${reviewKey}`;

  // Helpful count — initial value from Sanity, flag from localStorage
  const [liked,     setLiked]     = useState(false);
  const [likeCount, setLikeCount] = useState(r.helpfulCount ?? 0);

  useEffect(() => {
    try {
      if (localStorage.getItem(storageKey) === '1') setLiked(true);
    } catch { /* ignore */ }
  }, [storageKey]);

  async function handleLike() {
    if (liked) return;
    setLiked(true);
    setLikeCount((c) => c + 1);
    try { localStorage.setItem(storageKey, '1'); } catch { /* ignore */ }
    try {
      await fetch('/api/leadership-review/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'helpful', issueId, reviewKey }),
      });
    } catch { /* keep optimistic update */ }
  }

  const [showReply, setShowReply] = useState(false);
  const [replies,   setReplies]   = useState<NestedReply[]>(r.replies || []);
  const [posting,   setPosting]   = useState(false);
  const [shareDone, setShareDone] = useState(false);

  const stripeGradients = [
    'linear-gradient(to right, #283583, #EF6203)',
    'linear-gradient(to right, #cd171a, #283583)',
    'linear-gradient(to right, #006600, #283583)',
  ];

  function handleShare() {
    const text = `"${r.comment}" — ${r.reviewerName}${r.affiliation ? `, ${r.affiliation}` : ''}\n\n${window.location.href}`;
    navigator.clipboard.writeText(text).then(() => {
      setShareDone(true);
      setTimeout(() => setShareDone(false), 2500);
    });
  }

  async function handlePost(name: string, affiliation: string, text: string) {
    setPosting(true);
    const newReply: NestedReply = {
      _key:         `reply_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      text,
      date:         new Date().toISOString().split('T')[0],
      authorName:   name,
      affiliation:  affiliation || undefined,
      helpfulCount: 0,
      replies:      [],
    };
    setReplies((prev) => [...prev, newReply]);
    setShowReply(false);
    try {
      await fetch('/api/leadership-review/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'reply', issueId, reviewKey: r._key,
          replyText: text, authorName: name, affiliation,
        }),
      });
    } catch { /* keep optimistic reply */ }
    finally { setPosting(false); }
  }

  return (
    <div
      className="bg-white rounded-xl overflow-hidden"
      style={{
        border:    isNewest ? '1.5px solid #3fa535' : '1.5px solid #28358318',
        boxShadow: isNewest ? '0 0 0 3px rgba(63,165,53,0.12)' : '0 2px 10px rgba(40,53,131,0.06)',
      }}
    >
      <div className="h-0.5 w-full" style={{ background: stripeGradients[index % 3] }} />
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start gap-2.5 mb-3">
          <Avatar name={r.reviewerName} />
          <div className="flex-1 min-w-0 pt-0.5">
            <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
              <span className="text-sm font-black leading-tight" style={{ color: '#283583' }}>
                {r.reviewerName}
              </span>
              {r.affiliation && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full leading-tight flex-shrink-0"
                  style={{ background: '#EF620315', color: '#EF6203', border: '1px solid #EF620335' }}>
                  {r.affiliation}
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <StarDisplay rating={r.rating} />
              {r.location && (
                <span className="text-xs text-gray-400 flex items-center gap-0.5">
                  <svg width="9" height="9" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1.5A4.5 4.5 0 0 1 12.5 6c0 3-4.5 8.5-4.5 8.5S3.5 9 3.5 6A4.5 4.5 0 0 1 8 1.5z"
                      stroke="#9ca3af" strokeWidth="1.4" />
                    <circle cx="8" cy="6" r="1.5" stroke="#9ca3af" strokeWidth="1.2" />
                  </svg>
                  {r.location}
                </span>
              )}
              {r.date && (
                <span className="text-xs text-gray-400">
                  {new Date(r.date).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Comment */}
        <p className="text-sm text-gray-700 italic leading-relaxed mb-1" style={{ fontFamily: "'Georgia', serif" }}>
          &ldquo;{r.comment}&rdquo;
        </p>

        {/* Action bar */}
        <ActionBar
          likeCount={likeCount} liked={liked} onLike={handleLike}
          replyCount={replies.length} showReply={showReply}
          onToggleReply={() => setShowReply((v) => !v)}
          onShare={handleShare} shareDone={shareDone}
        />

        {showReply && (
          <ReplyComposer onPost={handlePost} onCancel={() => setShowReply(false)} posting={posting} />
        )}

        {replies.length > 0 && (
          <div className="mt-3 flex flex-col gap-2.5 pt-3 border-t" style={{ borderColor: '#28358310' }}>
            {replies.map((rep) => (
              <ReplyNode key={rep._key} reply={rep} depth={0} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── ReaderReviews ─────────────────────────────────────────────────────────────

const DEFAULT_PROMPT = "What did you think of this issue? Which story resonated most with you?";

export default function ReaderReviews({
  reviews: initialReviews, issueTitle, issueId, responsePrompt,
}: {
  reviews: Review[]; issueTitle: string; issueId: string; responsePrompt?: string;
}) {
  const prompt = responsePrompt?.trim() || DEFAULT_PROMPT;

  const [reviews,     setReviews]     = useState<Review[]>(initialReviews);
  const [newestIndex, setNewestIndex] = useState<number | null>(null);
  const [formData,    setFormData]    = useState({ reviewerName: '', affiliation: '', location: '', rating: 5, comment: '' });
  const [submitting,  setSubmitting]  = useState(false);
  const [submitted,   setSubmitted]   = useState(false);
  const [error,       setError]       = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = async () => {
    if (!formData.reviewerName.trim() || !formData.comment.trim()) return;
    setSubmitting(true);
    setError('');
    const newReview: Review = {
      reviewerName: formData.reviewerName.trim(),
      affiliation:  formData.affiliation.trim() || undefined,
      location:     formData.location.trim(),
      rating:       formData.rating,
      comment:      formData.comment.trim(),
      date:         new Date().toISOString().split('T')[0],
      helpfulCount: 0,
      replies:      [],
    };
    setReviews((prev) => {
      const updated = [...prev, newReview];
      setNewestIndex(updated.length - 1);
      return updated;
    });
    setSubmitted(true);
    setTimeout(() => setNewestIndex(null), 4000);
    try {
      const res = await fetch('/api/leadership-review/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ issueId, issueTitle, ...newReview }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
    } catch (err: any) {
      setReviews((prev) => prev.slice(0, -1));
      setNewestIndex(null);
      setSubmitted(false);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = { borderColor: '#28358330', background: '#f7f8ff', color: '#111827' };
  const inputClass = 'w-full text-sm px-3 py-2.5 rounded-lg border outline-none transition-colors appearance-none';
  const onFocus = (e: React.FocusEvent<any>) => { e.target.style.borderColor = '#283583'; };
  const onBlur  = (e: React.FocusEvent<any>) => { e.target.style.borderColor = '#28358330'; };

  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, #283583, transparent)' }} />
        <h2 className="text-lg font-black px-2" style={{ fontFamily: "'Playfair Display', serif", color: '#283583' }}>
          Reader Responses
        </h2>
        <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, #283583, transparent)' }} />
      </div>

      {!submitted ? (
        <div className="rounded-xl overflow-hidden mb-6" style={{ border: '1.5px solid #283583' }}>
          <div className="px-5 py-3 flex items-center gap-3" style={{ background: '#283583' }}>
            <div className="flex flex-col h-6 w-1 rounded-sm overflow-hidden flex-shrink-0">
              <div className="flex-1" style={{ background: '#006600' }} />
              <div className="flex-1" style={{ background: '#BB0000' }} />
              <div className="flex-1" style={{ background: '#000000' }} />
            </div>
            <div>
              <p className="text-white font-black text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>Share Your Response</p>
              <p className="text-white/60 text-xs">What did you think of &ldquo;{issueTitle}&rdquo;?</p>
            </div>
          </div>
          <div className="bg-white p-5">
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">Your Rating</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button key={s} type="button"
                    onMouseEnter={() => setHoveredStar(s)} onMouseLeave={() => setHoveredStar(0)}
                    onClick={() => setFormData({ ...formData, rating: s })}
                    className="transition-transform hover:scale-110 active:scale-95">
                    <svg width="28" height="28" viewBox="0 0 16 16"
                      fill={s <= (hoveredStar || formData.rating) ? '#EF6203' : 'none'}
                      stroke={s <= (hoveredStar || formData.rating) ? '#EF6203' : '#d1d5db'} strokeWidth="1.2">
                      <path d="M8 1l1.9 4 4.4.6-3.2 3.1.8 4.4L8 11l-3.9 2.1.8-4.4L1.7 5.6l4.4-.6z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Your Name <span style={{ color: '#cd171a' }}>*</span></label>
                <input type="text" placeholder="e.g. James Mwangi"
                  value={formData.reviewerName} onChange={(e) => setFormData({ ...formData, reviewerName: e.target.value })}
                  className={inputClass} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Title / Affiliation <span className="font-normal text-gray-400 text-xs">(optional)</span></label>
                <input type="text" placeholder="e.g. Economist, MP Kiambu, Prof. UoN"
                  value={formData.affiliation} onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                  className={inputClass} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>
            </div>
            <div className="mb-3">
              <label className="text-sm font-semibold text-gray-700 mb-1 block">Location <span className="font-normal text-gray-400 text-xs">(optional)</span></label>
              <input type="text" placeholder="e.g. Nairobi, Nyeri…"
                value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className={inputClass} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
            </div>
            <div className="mb-4">
              <label className="text-sm font-semibold text-gray-700 mb-1 block">Your Response <span style={{ color: '#cd171a' }}>*</span></label>
              <textarea rows={4} placeholder={prompt}
                value={formData.comment} onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                className={`${inputClass} resize-none`} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
            </div>
            {error && <p className="text-sm font-semibold mb-3" style={{ color: '#cd171a' }}>{error}</p>}
            <button type="button" onClick={handleSubmit}
              disabled={submitting || !formData.reviewerName.trim() || !formData.comment.trim()}
              className="px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-50 flex items-center gap-2"
              style={{ background: submitting ? '#9ca3af' : '#283583' }}>
              {submitting && <div className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: '#fff', borderTopColor: 'transparent' }} />}
              {submitting ? 'Posting…' : 'Submit Response'}
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-xl px-5 py-4 mb-6 flex items-center gap-3"
          style={{ background: 'rgba(63,165,53,0.08)', border: '1.5px solid #3fa53540' }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#3fa535' }}>
            <svg width="16" height="16" fill="none" stroke="white" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="font-black text-sm" style={{ color: '#3fa535', fontFamily: "'Playfair Display', serif" }}>Thank you for your response!</p>
            <p className="text-xs text-gray-500">Your review has been posted below.</p>
          </div>
        </div>
      )}

      {reviews.length === 0 ? (
        <p className="text-sm text-gray-400 italic text-center py-4">No reviews yet. Be the first to share your thoughts.</p>
      ) : (
        <div className="space-y-3">
          {reviews.map((r, i) => (
            <ReviewCard key={r._key || i} r={r} index={i} isNewest={i === newestIndex} issueId={issueId} />
          ))}
        </div>
      )}
    </div>
  );
}