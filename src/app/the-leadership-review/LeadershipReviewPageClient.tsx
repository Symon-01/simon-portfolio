'use client';

import { useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import type { LeadershipReviewIssueSummary } from '@/types/leadershipReview';
import AllIssuesGrid from '@/components/leadershipReview/AllIssuesGrid';
import SupportButton from '@/components/SupportButton';
import SubscribeForm from '@/components/SubscribeForm';

// ── Brand colours ─────────────────────────────────────────────────────────────
const BLUE  = '#273583';
const GREEN = '#40a535';
const RED   = '#cd1719';

// ── Country codes: [flag, name, dialCode, expectedLocalDigits] ────────────────
const COUNTRY_CODES: [string, string, string, number][] = [
  ['🇰🇪', 'Kenya',           '+254', 9],
  ['🇺🇬', 'Uganda',          '+256', 9],
  ['🇹🇿', 'Tanzania',        '+255', 9],
  ['🇷🇼', 'Rwanda',          '+250', 9],
  ['🇪🇹', 'Ethiopia',        '+251', 9],
  ['🇸🇸', 'South Sudan',     '+211', 9],
  ['🇸🇴', 'Somalia',         '+252', 8],
  ['🇩🇯', 'Djibouti',        '+253', 8],
  ['🇳🇬', 'Nigeria',         '+234', 10],
  ['🇬🇭', 'Ghana',           '+233', 9],
  ['🇿🇦', 'South Africa',    '+27',  9],
  ['🇪🇬', 'Egypt',           '+20',  10],
  ['🇲🇦', 'Morocco',         '+212', 9],
  ['🇸🇩', 'Sudan',           '+249', 9],
  ['🇿🇲', 'Zambia',          '+260', 9],
  ['🇿🇼', 'Zimbabwe',        '+263', 9],
  ['🇧🇼', 'Botswana',        '+267', 8],
  ['🇳🇦', 'Namibia',         '+264', 9],
  ['🇲🇿', 'Mozambique',      '+258', 9],
  ['🇲🇼', 'Malawi',          '+265', 9],
  ['🇦🇴', 'Angola',          '+244', 9],
  ['🇨🇩', 'DR Congo',        '+243', 9],
  ['🇨🇲', 'Cameroon',        '+237', 9],
  ['🇸🇳', 'Senegal',         '+221', 9],
  ['🇬🇧', 'UK',              '+44',  10],
  ['🇺🇸', 'USA',             '+1',   10],
  ['🇨🇦', 'Canada',          '+1',   10],
  ['🇦🇺', 'Australia',       '+61',  9],
  ['🇩🇪', 'Germany',         '+49',  10],
  ['🇫🇷', 'France',          '+33',  9],
  ['🇮🇳', 'India',           '+91',  10],
  ['🇦🇪', 'UAE',             '+971', 9],
  ['🇸🇦', 'Saudi Arabia',    '+966', 9],
  ['🇶🇦', 'Qatar',           '+974', 8],
];

const DEFAULT_CODE = COUNTRY_CODES[0];

function validatePhone(local: string, expected: number): boolean {
  if (!local) return true;
  const digits = local.replace(/[\s\-(). ]/g, '');
  return /^\d+$/.test(digits) && Math.abs(digits.length - expected) <= 1;
}

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// ── Constants ─────────────────────────────────────────────────────────────────

const KENYAN_COUNTIES = [
  'Baringo','Bomet','Bungoma','Busia','Elgeyo-Marakwet','Embu','Garissa',
  'Homa Bay','Isiolo','Kajiado','Kakamega','Kericho','Kiambu','Kilifi',
  'Kirinyaga','Kisii','Kisumu','Kitui','Kwale','Laikipia','Lamu','Machakos',
  'Makueni','Mandera','Marsabit','Meru','Migori','Mombasa',"Murang'a",
  'Nairobi','Nakuru','Nandi','Narok','Nyamira','Nyandarua','Nyeri','Samburu',
  'Siaya','Taita-Taveta','Tana River','Tharaka-Nithi','Trans Nzoia','Turkana',
  'Uasin Gishu','Vihiga','Wajir','West Pokot',
];

const POSITION_OPTIONS = [
  'President','Deputy President','Governor','Senator',
  'Member of Parliament (MP)','Woman Representative','MCA',
  'Cabinet Secretary','Principal Secretary','County Executive',
  'Mayor','NGO Leader','Community Leader','Corporate Leader','Other',
];

const IMPACT_AREAS = [
  'Education','Healthcare','Infrastructure','Youth Empowerment',
  'Women Empowerment','Technology & Innovation','Governance',
  'Transparency','Agriculture','Environment','Security',
  'Business & Economy','Community Development','Sports & Culture','Other',
];

// ── Types ─────────────────────────────────────────────────────────────────────

interface FormData {
  nominatorName: string;
  nominatorEmail: string;
  nominatorPhone: string;
  nominatorCounty: string;
  leaderName: string;
  leaderPosition: string;
  leaderPositionOther: string;
  areaRepresented: string;
  mainReason: string;
  areasOfImpact: string[];
  notableAchievements: string;
  supportingLink: string;
  consentGiven: boolean;
}

const EMPTY_FORM: FormData = {
  nominatorName: '', nominatorEmail: '', nominatorPhone: '', nominatorCounty: '',
  leaderName: '', leaderPosition: '', leaderPositionOther: '', areaRepresented: '',
  mainReason: '', areasOfImpact: [], notableAchievements: '',
  supportingLink: '', consentGiven: false,
};

interface LeadershipReviewPageClientProps {
  initialIssues: LeadershipReviewIssueSummary[];
  initialMastheadBgUrl?: string;
}

// ── Subscribe status toast ────────────────────────────────────────────────────

function SubscribeToastInner() {
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);
  const [toast, setToast] = useState<{ message: string; color: string } | null>(null);

  useState(() => {
    const status = searchParams.get('subscribe');
    if (!status) return;
    const map: Record<string, { message: string; color: string }> = {
      confirmed:    { message: '🎉 You\'re subscribed! Welcome to The Leadership Review.', color: GREEN },
      already:      { message: '✅ You\'re already subscribed — watch your inbox!', color: BLUE },
      unsubscribed: { message: 'You have been unsubscribed successfully.', color: '#666' },
      invalid:      { message: 'That confirmation link is invalid or has expired. Please subscribe again.', color: RED },
      error:        { message: 'Something went wrong. Please try again.', color: RED },
    };
    const t = map[status];
    if (t) { setToast(t); setVisible(true); }
  });

  if (!visible || !toast) return null;

  return (
    <div
      className="fixed top-6 left-1/2 z-50 px-5 py-3 rounded-2xl text-white text-sm font-bold shadow-2xl transition-all"
      style={{ transform: 'translateX(-50%)', background: toast.color, maxWidth: '90vw' }}
    >
      {toast.message}
    </div>
  );
}

function SubscribeToast() {
  return (
    <Suspense fallback={null}>
      <SubscribeToastInner />
    </Suspense>
  );
}

// ── Masthead ──────────────────────────────────────────────────────────────────

function Masthead({ bgImageUrl }: { bgImageUrl?: string }) {
  return (
    <div className="relative border-b border-gray-100 overflow-hidden">
      {bgImageUrl && (
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${bgImageUrl}')` }}>
          <div className="absolute inset-0 bg-white/93" />
        </div>
      )}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-3 sm:py-4 relative z-10">
        <div className="flex items-center justify-between pb-2 sm:pb-3" style={{ borderBottom: '3px solid #111', fontSize: 'clamp(7px, 2.8vw, 13px)', color: '#444' }}>
          <div className="flex items-center gap-1.5 sm:gap-4 flex-nowrap min-w-0">
            <span style={{ color: BLUE, fontWeight: 700, whiteSpace: 'nowrap' }}>
              {new Date().toLocaleDateString('en-KE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span style={{ flexShrink: 0 }}>|</span>
            <span style={{ whiteSpace: 'nowrap' }}>Free Digital Edition</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0 ml-2">
            <span className="hidden sm:inline" style={{ whiteSpace: 'nowrap' }}>www.simondesigns.co.ke</span>
            <span className="hidden sm:inline">|</span>
            <span style={{ whiteSpace: 'nowrap' }}>@TheLeadershipReview</span>
          </div>
        </div>
        <p className="text-center font-bold tracking-widest uppercase pt-2 sm:pt-3 pb-1" style={{ color: BLUE, fontSize: 'clamp(9px, 1.5vw, 13px)', letterSpacing: '0.08em' }}>
          Your Number One Newspaper for Celebrating Exemplary Leadership
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingBottom: '0px', marginTop: '-2px' }}>
          <span style={{ fontFamily: "'Playfair Display', serif", color: '#000000', fontWeight: 900, fontSize: 'clamp(14px, 2.6vw, 30px)', lineHeight: 1, display: 'block', marginBottom: '-0.02em', paddingLeft: '0.08em' }}>The</span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontStyle: 'normal', lineHeight: 0.88, whiteSpace: 'nowrap', fontSize: 'clamp(32px, 10.5vw, 120px)', display: 'block', marginTop: '-0.02em', marginBottom: '4px', letterSpacing: '-0.01em' }}>
            <span style={{ color: BLUE }}>L</span><span style={{ color: GREEN }}>eadership</span>{' '}
            <span style={{ color: RED }}>Review</span>
          </span>
        </div>
        <div style={{ height: '4px', background: BLUE, marginTop: 'clamp(4px, 2vw, 18px)' }} />
        <div style={{ marginTop: '2px', marginBottom: '2px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div style={{ height: '3px', background: BLUE }} />
          <div style={{ height: '1px', background: BLUE, opacity: 0.45 }} />
        </div>
        <div style={{ height: '6px' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
          <div style={{ display: 'flex', overflow: 'hidden', border: '1px solid #ddd' }}>
            <div style={{ background: RED, padding: 'clamp(5px, 0.8vw, 10px) clamp(6px, 0.9vw, 10px)', width: '50%', flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#fff', fontSize: 'clamp(8px, 1.1vw, 14px)', lineHeight: 1.25, margin: '0 0 4px 0' }}>Proven Impact</p>
              <p style={{ color: '#fff', fontSize: 'clamp(7px, 0.85vw, 11px)', lineHeight: 1.4, opacity: 0.9, margin: 0 }}>Leaders with measurable, documented results on the ground</p>
            </div>
            <div style={{ flex: 1, overflow: 'hidden', minHeight: 'clamp(60px, 7.5vw, 90px)' }}>
              <img src="Image 1.jpeg" alt="Proven Impact" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
          <div style={{ display: 'flex', overflow: 'hidden', border: '1px solid #ddd' }}>
            <div style={{ background: '#3a7d3a', padding: 'clamp(5px, 0.8vw, 10px) clamp(6px, 0.9vw, 10px)', width: '50%', flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#fff', fontSize: 'clamp(8px, 1.1vw, 14px)', lineHeight: 1.25, margin: '0 0 4px 0' }}>Across Kenya</p>
              <p style={{ color: '#fff', fontSize: 'clamp(7px, 0.85vw, 11px)', lineHeight: 1.4, opacity: 0.9, margin: 0 }}>Exemplary performers at every level of public service</p>
            </div>
            <div style={{ flex: 1, overflow: 'hidden', minHeight: 'clamp(60px, 7.5vw, 90px)' }}>
              <img src="Image 2.jpg" alt="Across Kenya" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
          <div style={{ display: 'flex', overflow: 'hidden', border: '1px solid #ddd' }}>
            <div style={{ background: BLUE, padding: 'clamp(5px, 0.8vw, 10px) clamp(6px, 0.9vw, 10px)', width: '50%', flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#fff', fontSize: 'clamp(8px, 1.1vw, 14px)', lineHeight: 1.25, margin: '0 0 4px 0' }}>Their Story, Told Right</p>
              <p style={{ color: '#fff', fontSize: 'clamp(7px, 0.85vw, 11px)', lineHeight: 1.4, opacity: 0.9, margin: 0 }}>In-depth profiles that go beyond politics to celebrate real service</p>
            </div>
            <div style={{ flex: 1, overflow: 'hidden', minHeight: 'clamp(60px, 7.5vw, 90px)' }}>
              <img src="Image 3.jpeg" alt="Their Story, Told Right" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </div>
        <div style={{ height: '6px' }} />
        <div style={{ height: '6px', background: RED, marginBottom: '10px' }} />
        <div className="flex items-start justify-between flex-wrap gap-1 sm:gap-2" style={{ fontSize: 'clamp(12px, 1.5vw, 15px)' }}>
          <div className="flex flex-col gap-1">
            <p style={{ color: '#666', margin: 0, fontStyle: 'italic' }}>
              Published by{' '}
              <Link href="/portfolio" className="font-semibold hover:underline" style={{ color: BLUE }}>Simon Designs</Link>
            </p>
            <Link href="/portfolio" className="font-semibold flex items-center gap-1 hover:gap-2 transition-all" style={{ color: '#EF6203', fontSize: 'clamp(13px, 1.6vw, 16px)' }}>
              ← Back to Portfolio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Nomination Modal ──────────────────────────────────────────────────────────

const STEPS = [
  { label: 'Your Details',  icon: '👤' },
  { label: 'Leader Info',   icon: '🏛️' },
  { label: 'Why Nominate', icon: '⭐' },
  { label: 'Evidence',      icon: '🔗' },
  { label: 'Confirm',       icon: '✅' },
];

function NominationModal({ onClose }: { onClose: () => void }) {
  const [step, setStep]             = useState(0);
  const [form, setForm]             = useState<FormData>(EMPTY_FORM);
  const [touched, setTouched]       = useState<Partial<Record<string, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [error, setError]           = useState('');

  const [localPhone, setLocalPhone]   = useState('');
  const [countryCode, setCountryCode] = useState<[string, string, string, number]>(DEFAULT_CODE);

  const set = (field: keyof FormData, value: string | boolean | string[]) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const toggleImpact = (area: string) => {
    setForm(prev => ({
      ...prev,
      areasOfImpact: prev.areasOfImpact.includes(area)
        ? prev.areasOfImpact.filter(a => a !== area)
        : [...prev.areasOfImpact, area],
    }));
  };

  const phoneError = touched.localPhone && localPhone && !validatePhone(localPhone, countryCode[3])
    ? `Please enter a valid ${countryCode[1]} phone number`
    : '';

  const emailError = touched.nominatorEmail && form.nominatorEmail && !isValidEmail(form.nominatorEmail)
    ? 'Enter a valid email address'
    : '';

  const canProceed = (): boolean => {
    if (step === 0) return !!(
      form.nominatorName &&
      form.nominatorEmail && isValidEmail(form.nominatorEmail) &&
      form.nominatorCounty &&
      validatePhone(localPhone, countryCode[3])
    );
    if (step === 1) return !!(
      form.leaderName && form.leaderPosition &&
      (form.leaderPosition !== 'Other' || form.leaderPositionOther)
    );
    if (step === 2) return !!(form.mainReason && form.areasOfImpact.length > 0);
    if (step === 3) return true;
    if (step === 4) return form.consentGiven;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    const fullPhone = localPhone ? `${countryCode[2]} ${localPhone}` : '';
    try {
      const res = await fetch('/api/nominate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, nominatorPhone: fullPhone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = (hasError?: boolean) =>
    `w-full rounded-lg border px-3 py-2.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 transition-all placeholder:text-gray-400 ${
      hasError ? 'border-red-400 focus:ring-red-200 focus:border-red-400' : 'border-gray-200'
    }`;

  const labelCls = 'block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide';
  const reqStar  = <span style={{ color: RED }} className="ml-0.5">*</span>;
  const errMsg   = (msg: string) => msg ? <p className="text-xs text-red-500 mt-1">{msg}</p> : null;

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Full Name {reqStar}</label>
              <input className={inputCls()} placeholder="e.g. John Mwangi" value={form.nominatorName} onChange={e => set('nominatorName', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Email Address {reqStar}</label>
              <input type="email" className={inputCls(!!emailError)} placeholder="john@example.com" value={form.nominatorEmail} onChange={e => set('nominatorEmail', e.target.value)} />
              {errMsg(emailError)}
            </div>
            <div>
              <label className={labelCls}>Phone Number <span className="text-gray-400 font-normal normal-case">(optional)</span></label>
              <div style={{ display: 'flex', height: '42px' }}>
                <select
                  value={countryCode[2] + countryCode[1]}
                  onChange={e => {
                    const found = COUNTRY_CODES.find(c => c[2] + c[1] === e.target.value);
                    if (found) { setCountryCode(found); setLocalPhone(''); setTouched(p => ({ ...p, localPhone: false })); }
                  }}
                  style={{ flexShrink: 0, minWidth: '105px', border: `1px solid ${phoneError ? '#f87171' : '#e5e7eb'}`, borderRight: 'none', borderRadius: '0.5rem 0 0 0.5rem', background: '#f9fafb', padding: '0 8px', fontSize: '0.8rem', cursor: 'pointer', color: '#374151' }}
                  title="Select country code"
                >
                  {COUNTRY_CODES.map(([flag, name, code]) => (
                    <option key={`${name}-${code}`} value={code + name}>{flag} {code}</option>
                  ))}
                </select>
                <input type="tel" value={localPhone} placeholder="Phone number" maxLength={countryCode[3] + 2}
                  onChange={e => { setLocalPhone(e.target.value); setTouched(p => ({ ...p, localPhone: true })); }}
                  style={{ flex: 1, padding: '0 12px', border: `1px solid ${phoneError ? '#f87171' : '#e5e7eb'}`, borderRadius: '0 0.5rem 0.5rem 0', fontSize: '0.875rem', color: '#1f2937', outline: 'none', background: 'white' }}
                />
              </div>
              {errMsg(phoneError)}
            </div>
            <div>
              <label className={labelCls}>Your County {reqStar}</label>
              <select className={inputCls()} value={form.nominatorCounty} onChange={e => set('nominatorCounty', e.target.value)}>
                <option value="">Select county…</option>
                {KENYAN_COUNTIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Leader's Full Name {reqStar}</label>
              <input className={inputCls()} placeholder="e.g. Hon. Jane Wanjiku" value={form.leaderName} onChange={e => set('leaderName', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Leadership Position {reqStar}</label>
              <select className={inputCls()} value={form.leaderPosition} onChange={e => set('leaderPosition', e.target.value)}>
                <option value="">Select position…</option>
                {POSITION_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            {form.leaderPosition === 'Other' && (
              <div>
                <label className={labelCls}>Specify Position {reqStar}</label>
                <input className={inputCls()} placeholder="e.g. Ward Administrator" value={form.leaderPositionOther} onChange={e => set('leaderPositionOther', e.target.value)} />
              </div>
            )}
            <div>
              <label className={labelCls}>Area Represented / Institution <span className="text-gray-400 font-normal normal-case">(optional)</span></label>
              <input className={inputCls()} placeholder="e.g. Kiharu Constituency, Ministry of Health…" value={form.areaRepresented} onChange={e => set('areaRepresented', e.target.value)} />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Main Reason for Nomination {reqStar}</label>
              <textarea className={`${inputCls()} resize-none`} rows={4} placeholder="Describe the leader's achievements, impact, development projects, integrity, or service to the people…" value={form.mainReason} onChange={e => set('mainReason', e.target.value)} />
              <p className="text-xs text-gray-400 mt-1">{form.mainReason.length} characters</p>
            </div>
            <div>
              <label className={labelCls}>Key Areas of Impact {reqStar} <span className="text-gray-400 font-normal normal-case ml-1">(select all that apply)</span></label>
              <div className="flex flex-wrap gap-2 mt-1">
                {IMPACT_AREAS.map(area => {
                  const active = form.areasOfImpact.includes(area);
                  return (
                    <button key={area} type="button" onClick={() => toggleImpact(area)} className="text-xs px-3 py-1.5 rounded-full border font-medium transition-all"
                      style={{ background: active ? BLUE : 'white', color: active ? 'white' : '#555', borderColor: active ? BLUE : '#ddd' }}>
                      {area}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label className={labelCls}>Notable Achievements <span className="text-gray-400 font-normal normal-case">(optional)</span></label>
              <textarea className={`${inputCls()} resize-none`} rows={3} placeholder="e.g. Built 12 ECDE centres, launched bursary programme, improved road network…" value={form.notableAchievements} onChange={e => set('notableAchievements', e.target.value)} />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 leading-relaxed">Supporting material strengthens the nomination and helps our editorial team verify the leader's impact. This field is optional but highly encouraged.</p>
            <div>
              <label className={labelCls}>Supporting Link <span className="text-gray-400 font-normal normal-case">(optional)</span></label>
              <input type="url" className={inputCls()} placeholder="https://example.com/article-about-leader" value={form.supportingLink} onChange={e => set('supportingLink', e.target.value)} />
              <p className="text-xs text-gray-400 mt-1">News articles, project websites, social media posts, government reports, etc.</p>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-5">
            <div className="rounded-xl p-4 space-y-2 text-sm" style={{ border: `1.5px solid ${BLUE}20`, background: `${BLUE}08` }}>
              <p className="font-bold text-gray-700" style={{ fontFamily: "'Playfair Display', serif" }}>Nomination Summary</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                {[
                  ['Nominator', form.nominatorName],
                  ['Leader', form.leaderName],
                  ['Position', form.leaderPosition === 'Other' ? form.leaderPositionOther : form.leaderPosition],
                  ...(form.areaRepresented ? [['Area', form.areaRepresented]] : []),
                  ['Impact Areas', form.areasOfImpact.join(', ') || '—'],
                ].map(([label, val]) => (
                  <>
                    <span key={`l-${label}`} className="text-xs uppercase tracking-wide" style={{ color: '#9ca3af' }}>{label}</span>
                    <span key={`v-${label}`} className="font-medium text-gray-800 text-sm">{val}</span>
                  </>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', height: '3px', borderRadius: '99px', overflow: 'hidden', gap: '2px' }}>
              <div style={{ flex: 1, background: BLUE }} />
              <div style={{ flex: 1, background: GREEN }} />
              <div style={{ flex: 1, background: RED }} />
            </div>
            <label className="flex items-start gap-3 cursor-pointer">
              <div className="mt-0.5 w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all"
                style={{ background: form.consentGiven ? BLUE : 'white', borderColor: form.consentGiven ? BLUE : '#ccc' }}
                onClick={() => set('consentGiven', !form.consentGiven)}>
                {form.consentGiven && (
                  <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                    <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-gray-600 leading-relaxed">
                I confirm that the information I have provided is accurate to the best of my knowledge, and I understand that submission does not guarantee publication. {reqStar}
              </span>
            </label>
            <div className="rounded-lg p-3" style={{ borderLeft: `4px solid ${BLUE}`, background: `${BLUE}0a` }}>
              <p className="text-xs text-gray-600 leading-relaxed italic">
                <span className="font-semibold not-italic text-gray-700">Editorial Note:</span> All nominations undergo review by The Leadership Review editorial team. We may reach out to you for further details before making any publication decision.
              </p>
            </div>
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
          </div>
        );
      default: return null;
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}>
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
          <div style={{ display: 'flex', height: '4px', borderRadius: '99px 99px 0 0', overflow: 'hidden', marginBottom: '24px' }}>
            <div style={{ flex: 1, background: BLUE }} />
            <div style={{ flex: 1, background: GREEN }} />
            <div style={{ flex: 1, background: RED }} />
          </div>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: GREEN }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M6 16L13 23L26 9" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Nomination Received!</h3>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">Thank you for recognising exceptional leadership. Our editorial team will review your submission and may contact you for more details.</p>
          <button onClick={onClose} className="px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90" style={{ background: BLUE }}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden">
        <div className="flex-shrink-0 px-6 pt-5 pb-4 border-b border-gray-100">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: BLUE }} />
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: GREEN }} />
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: RED }} />
                <span className="text-xs font-bold uppercase tracking-widest ml-1" style={{ color: BLUE }}>The Leadership Review</span>
              </div>
              <h2 className="text-xl font-black text-gray-900 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Recognise Exceptional Leadership</h2>
            </div>
            <button onClick={onClose} className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors text-gray-500" aria-label="Close">✕</button>
          </div>
          <div className="flex items-center gap-1 mt-4">
            {STEPS.map((_, i) => {
              const segColors = [BLUE, BLUE, GREEN, GREEN, RED];
              return <div key={i} className="h-1.5 flex-1 rounded-full transition-all duration-300" style={{ background: i <= step ? segColors[i] : '#e5e7eb' }} />;
            })}
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <p className="text-xs font-semibold text-gray-500">Step {step + 1} of {STEPS.length}</p>
            <p className="text-xs font-bold" style={{ color: BLUE }}>{STEPS[step].icon} {STEPS[step].label}</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5">{renderStep()}</div>
        <div className="flex-shrink-0 px-6 pb-6 pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
          <button onClick={() => setStep(s => s - 1)} disabled={step === 0} className="px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed">← Back</button>
          {step < STEPS.length - 1 ? (
            <button onClick={() => setStep(s => s + 1)} disabled={!canProceed()} className="px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90" style={{ background: step < 2 ? BLUE : step < 4 ? GREEN : RED }}>Continue →</button>
          ) : (
            <button onClick={handleSubmit} disabled={submitting || !canProceed()} className="px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 flex items-center gap-2" style={{ background: '#EF6203' }}>
              {submitting ? (<><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Submitting…</>) : 'Submit Nomination →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── CTA strip ─────────────────────────────────────────────────────────────────

function CTAStrip({ onNominate }: { onNominate: () => void }) {
  return (
    <div className="rounded-2xl overflow-hidden mt-12" style={{ border: `1.5px solid ${BLUE}30` }}>
      <div style={{ display: 'flex', height: '4px' }}>
        <div style={{ flex: 1, background: BLUE }} />
        <div style={{ flex: 1, background: GREEN }} />
        <div style={{ flex: 1, background: RED }} />
      </div>
      <div className="px-6 sm:px-10 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ background: `${BLUE}0d` }}>
        <div className="flex items-start gap-4 text-center sm:text-left">
          <div className="flex-shrink-0 hidden sm:flex w-10 h-10 rounded-lg items-center justify-center mt-0.5" style={{ background: BLUE }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l2.5 7.5H22l-6.5 4.5 2.5 7.5L12 17l-6 4.5 2.5-7.5L2 9.5h7.5z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <p className="font-bold mb-1 leading-snug" style={{ fontFamily: "'Playfair Display', serif", color: BLUE, fontSize: 'clamp(1rem, 2.5vw, 1.15rem)' }}>
              Know a leader worth celebrating?
            </p>
            <p className="text-xs leading-relaxed" style={{ color: `${BLUE}99` }}>
              Nominate a ward, constituency, county or national leader for a future edition of The Leadership Review.
            </p>
          </div>
        </div>
        <button onClick={onNominate} className="flex-shrink-0 flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-xl transition-opacity hover:opacity-90 whitespace-nowrap text-white" style={{ background: RED }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l2.5 7.5H22l-6.5 4.5 2.5 7.5L12 17l-6 4.5 2.5-7.5L2 9.5h7.5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Nominate a Leader →
        </button>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function LeadershipReviewPageClient({
  initialIssues,
  initialMastheadBgUrl,
}: LeadershipReviewPageClientProps) {
  const [showModal, setShowModal] = useState(false);
  const openModal  = useCallback(() => setShowModal(true), []);
  const closeModal = useCallback(() => setShowModal(false), []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap');
      `}</style>

      <SubscribeToast />
      {showModal && <NominationModal onClose={closeModal} />}

      <main>
        <Masthead bgImageUrl={initialMastheadBgUrl} />

        <section className="py-10 bg-gray-50 min-h-screen">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">

            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${BLUE}, transparent)` }} />
              <h2 className="text-base sm:text-lg font-bold text-gray-800 px-2 whitespace-nowrap" style={{ fontFamily: "'Playfair Display', serif" }}>
                All Published Issues
              </h2>
              <div className="h-px flex-1" style={{ background: `linear-gradient(to left, ${BLUE}, transparent)` }} />
            </div>

            <AllIssuesGrid issues={initialIssues} />

            <CTAStrip onNominate={openModal} />

            <div className="mt-8">
              <SubscribeForm variant="inline" />
            </div>

            <div className="mt-8 flex justify-center">
              <SupportButton position="bottom" />
            </div>
            <div className="mt-8 h-0.5" style={{ background: 'linear-gradient(to right, transparent, #EF6203, transparent)' }} />

          </div>
        </section>
      </main>
    </>
  );
}