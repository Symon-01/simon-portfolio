'use client';

// FILE LOCATION: src/app/support/SupportPageClient.tsx

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    IntaSend: any;
    intaSendLoaded?: boolean;
    intaSendInstance?: any;
  }
}

// ── Preset amounts ────────────────────────────────────────────────────────────
const PRESET_AMOUNTS = [
  { amount: 100,  label: 'KES 100',   sub: 'Buy us a coffee ☕' },
  { amount: 300,  label: 'KES 300',   sub: 'Support a sketch 🖊️' },
  { amount: 500,  label: 'KES 500',   sub: 'Fund a design 🎨' },
  { amount: 1000, label: 'KES 1,000', sub: 'Sponsor a project 🖨️' },
  { amount: 2500, label: 'KES 2,500', sub: 'Featured supporter ⭐' },
  { amount: 5000, label: 'KES 5,000', sub: 'Creative partner 🏆' },
];

// ── FAQs ─────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'Is my payment secure?',
    a: 'Yes. All payments are processed securely through IntaSend, a licensed payment service provider regulated in Kenya. Your card details and M-Pesa information are never stored on our servers. Every transaction is encrypted end-to-end.'
  },
  {
    q: 'Will I receive a receipt after my contribution?',
    a: 'Absolutely. Once your payment is confirmed, a detailed receipt is automatically sent to the email address you provide. The receipt includes the date, amount, and a unique reference number. Please keep it for your records.'
  },
  {
    q: 'What does my contribution go towards?',
    a: 'Every contribution directly funds Simon Designs\' creative work — including pencil art materials and supplies, printing and publishing of The Leadership Review newspaper, design software and tools, and community editorial projects that celebrate Kenyan leadership and creativity.'
  },
  {
    q: 'Can I contribute from outside Kenya?',
    a: 'Yes. International contributions are welcome via card payment (Visa/Mastercard). M-Pesa is available for Kenyan mobile numbers. If you experience any difficulty contributing from outside Kenya, reach out to us directly at simonmachariamugo@gmail.com.'
  },
  {
    q: 'Can I contribute anonymously?',
    a: 'We ask for your name and email only to send you a receipt. If you prefer not to be identified, you may use a preferred name or alias — your contribution is valued regardless. Your email is used solely for the receipt and is never shared.'
  },
  {
    q: 'Is there a minimum or maximum contribution amount?',
    a: 'The minimum contribution is KES 10. There is no maximum — contribute as much as you feel moved to. Every amount, large or small, makes a real difference to our work.'
  },
  {
    q: 'Can I make a recurring monthly contribution?',
    a: 'At the moment, contributions are one-time payments. If you\'d like to support us on a regular basis, you\'re welcome to return and contribute whenever you feel moved to. We are working on a recurring option for the future.'
  },
  {
    q: 'I contributed but haven\'t received my receipt. What should I do?',
    a: 'Please check your spam or junk folder first — automated emails sometimes land there. If it\'s not there after 10 minutes, contact us at simonmachariamugo@gmail.com with your name and the approximate time of your contribution and we\'ll resolve it promptly.'
  },
  {
    q: 'How do I know my contribution actually reaches Simon Designs?',
    a: 'Contributions are received directly into the Simon Designs business account via IntaSend. You\'ll receive a receipt immediately, and we send you a personal thank-you from Simon. We are a real, active studio — you can verify our work at simondesigns.co.ke/portfolio.'
  },
];

type Step = 'amount' | 'details' | 'processing' | 'success' | 'error';

export default function SupportPageClient() {
  // IntaSend
  const [intaSendReady, setIntaSendReady] = useState(false);

  // Widget state
  const [step, setStep] = useState<Step>('amount');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; amount?: string }>({});
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Load IntaSend
  useEffect(() => {
    const init = () => {
      if (window.IntaSend && !window.intaSendInstance) {
        try {
          window.intaSendInstance = new window.IntaSend({
            publicAPIKey: 'ISPubKey_live_21190558-5e93-43fa-a463-35d4c93ba453',
            live: true,
          });
          window.intaSendLoaded = true;
          setIntaSendReady(true);
        } catch (e) {
          console.error('IntaSend init error:', e);
        }
      } else if (window.intaSendInstance) {
        setIntaSendReady(true);
      }
    };

    if (window.intaSendLoaded && window.intaSendInstance) {
      setIntaSendReady(true);
      return;
    }

    if (!document.querySelector('script[src*="intasend-inline.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/intasend-inlinejs-sdk@3.0.4/build/intasend-inline.js';
      script.async = true;
      script.onload = init;
      document.head.appendChild(script);
    } else {
      init();
    }
  }, []);

  const getFinalAmount = (): number => {
    if (isCustom) return parseInt(customAmount) || 0;
    return selectedAmount || 0;
  };

  const resetWidget = () => {
    setStep('amount');
    setSelectedAmount(null);
    setCustomAmount('');
    setIsCustom(false);
    setName('');
    setEmail('');
    setErrors({});
  };

  const handleNext = () => {
    const amount = getFinalAmount();
    if (!amount || amount < 10) {
      setErrors(e => ({ ...e, amount: 'Please select or enter an amount (minimum KES 10)' }));
      return;
    }
    setErrors({});
    setStep('details');
  };

  const handlePay = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = 'Please enter your name';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = 'Please enter a valid email address';
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    if (!window.intaSendInstance && window.IntaSend) {
      window.intaSendInstance = new window.IntaSend({
        publicAPIKey: 'ISPubKey_live_21190558-5e93-43fa-a463-35d4c93ba453',
        live: true,
      });
    }
    if (!window.intaSendInstance) {
      alert('Payment system is initializing, please try again.');
      return;
    }

    const amount = getFinalAmount();
    const reference = `support-${Date.now()}`;
    setStep('processing');

    try {
      window.intaSendInstance
        .run({ amount, currency: 'KES', api_ref: reference, email, name })
        .on('COMPLETE', async () => {
          try {
            await fetch('/api/support-receipt', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name, email, amount, reference }),
            });
          } catch (err) {
            console.error('Receipt error:', err);
          }
          setStep('success');
        })
        .on('FAILED', () => setStep('error'))
        .on('IN-PROGRESS', () => console.log('In progress...'));
    } catch (e) {
      console.error('Payment error:', e);
      setStep('error');
    }
  };

  const amount = getFinalAmount();

  return (
    <>
      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s ease-out forwards; }
        .fade-up-2 { animation: fadeUp 0.6s 0.15s ease-out both; }
        .fade-up-3 { animation: fadeUp 0.6s 0.3s ease-out both; }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type="number"] { -moz-appearance: textfield; }
      `}</style>

      {/* ── HERO SECTION ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #048F02 0%, #036b01 60%, #EF6203 100%)' }}>
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10" style={{ background: '#EF6203' }} />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full opacity-10" style={{ background: '#fff' }} />

        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-20 text-center relative z-10">
          <span className="inline-block bg-white/20 border border-white/30 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 fade-up">
            Simon Designs
          </span>
          <h1 className="text-3xl lg:text-5xl font-black text-white leading-tight mb-4 fade-up-2" style={{ fontFamily: 'Georgia, serif' }}>
            Help Us Keep Creating<br />
            <span style={{ color: '#ffd580' }}>Work That Matters</span>
          </h1>
          <p className="text-white/80 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed fade-up-3">
            Join a community of supporters helping Simon Designs bring ideas to life — one design, one publication, one artwork at a time.
          </p>
        </div>
      </section>

      {/* ── STORY + WIDGET SECTION ────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* LEFT — Story */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#EF6203' }}>
                Why Your Support Matters
              </p>
              <h2 className="text-2xl lg:text-3xl font-black text-gray-900 leading-tight mb-5" style={{ fontFamily: 'Georgia, serif' }}>
                Creative work takes resources.<br />
                <span style={{ color: '#048F02' }}>Your support makes it possible.</span>
              </h2>

              <p className="text-gray-600 leading-relaxed mb-4" style={{ fontSize: '0.9375rem' }}>
                Simon Designs is an independent creative studio based in Kenya. Every project we take on — from brand identities and marketing materials to UI/UX design and packaging — is driven by a genuine belief that good design can transform businesses, communities, and lives.
              </p>

              <p className="text-gray-600 leading-relaxed mb-4" style={{ fontSize: '0.9375rem' }}>
                Beyond client work, we invest our own time and resources into passion projects that celebrate Kenyan creativity and leadership. <em>The Leadership Review</em> — our self-published newspaper — documents exemplary public leadership across Kenya's counties. Our pencil art collection, Simon Arts, preserves hand-drawn portraiture as a dying craft. These projects receive no commercial funding. Your contribution keeps them alive.
              </p>

              <p className="text-gray-600 leading-relaxed mb-6" style={{ fontSize: '0.9375rem' }}>
                Become part of the Simon Designs community — a growing group of individuals who believe in the power of creative work to tell stories, build identities, and inspire action. Every contribution, however small, goes directly into the work.
              </p>

              {/* What support funds */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">What your support funds</p>
                <div className="space-y-3">
                  {[
                    { icon: '🖊️', color: '#048F02', bg: '#f0fdf4', title: 'Pencil Art Materials', desc: 'Quality pencils, paper, and archival supplies for Simon Arts original works' },
                    { icon: '📰', color: '#EF6203', bg: '#fff7ed', title: 'Editorial Publications', desc: 'Printing and distribution of The Leadership Review newspaper' },
                    { icon: '🎨', color: '#7C3AED', bg: '#f5f3ff', title: 'Design Tools & Software', desc: 'Adobe Creative Suite, Figma, and professional design resources' },
                    { icon: '🌍', color: '#0369a1', bg: '#f0f9ff', title: 'Community Projects', desc: 'Pro bono design work for non-profits and community initiatives in Kenya' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-lg" style={{ background: item.bg }}>
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">{item.title}</p>
                        <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — Support Widget */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">

                {/* Widget Header */}
                <div className="px-6 py-5" style={{ background: 'linear-gradient(135deg, #048F02, #036b01)' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-bold">Support Simon Designs</h3>
                      <p className="text-white/70 text-xs">Help us create more amazing work</p>
                    </div>
                  </div>

                  {/* Step indicator */}
                  {(step === 'amount' || step === 'details') && (
                    <div className="flex items-center gap-2">
                      <div className="h-1 flex-1 rounded-full bg-white" />
                      <div className={`h-1 flex-1 rounded-full transition-all ${step === 'details' ? 'bg-white' : 'bg-white/30'}`} />
                    </div>
                  )}
                </div>

                {/* ── STEP 1: Amount ── */}
                {step === 'amount' && (
                  <div className="p-6">
                    <p className="text-sm text-gray-500 mb-4 text-center">Choose how much you'd like to contribute</p>

                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {PRESET_AMOUNTS.map(({ amount: a, label, sub }) => (
                        <button
                          key={a}
                          onClick={() => { setSelectedAmount(a); setIsCustom(false); setErrors(e => ({ ...e, amount: undefined })); }}
                          className={`p-3 rounded-xl border-2 text-left transition-all hover:border-green-500 ${
                            selectedAmount === a && !isCustom
                              ? 'border-green-600 bg-green-50'
                              : 'border-gray-200 bg-white'
                          }`}
                        >
                          <p className={`text-sm font-bold ${selectedAmount === a && !isCustom ? 'text-green-700' : 'text-gray-800'}`}>{label}</p>
                          <p className="text-[10px] text-gray-400 leading-tight mt-0.5">{sub}</p>
                        </button>
                      ))}

                      <button
                        onClick={() => { setSelectedAmount(null); setIsCustom(true); setErrors(e => ({ ...e, amount: undefined })); }}
                        className={`p-3 rounded-xl border-2 text-left transition-all hover:border-orange-400 ${
                          isCustom ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-white'
                        }`}
                      >
                        <p className={`text-sm font-bold ${isCustom ? 'text-orange-600' : 'text-gray-800'}`}>Other</p>
                        <p className="text-[10px] text-gray-400 leading-tight mt-0.5">Custom amount</p>
                      </button>
                    </div>

                    {isCustom && (
                      <div className="mb-3">
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-sm">KES</span>
                          <input
                            type="number"
                            value={customAmount}
                            onChange={e => setCustomAmount(e.target.value)}
                            className="w-full pl-16 pr-4 py-3 text-lg font-bold border-2 border-orange-400 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-100 focus:outline-none"
                            placeholder="Enter amount"
                            min="10"
                            autoFocus
                          />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Minimum: KES 10</p>
                      </div>
                    )}

                    {errors.amount && <p className="text-red-500 text-xs mb-3">{errors.amount}</p>}

                    {amount > 0 && (
                      <div className="rounded-xl px-4 py-2.5 mb-4 flex items-center justify-between" style={{ background: '#f0fdf4', border: '1px solid #bbf7bb' }}>
                        <span className="text-sm text-gray-600">Your contribution</span>
                        <span className="font-bold text-lg" style={{ color: '#048F02' }}>KES {amount.toLocaleString()}</span>
                      </div>
                    )}

                    <button
                      onClick={handleNext}
                      className="w-full py-3.5 text-white font-bold rounded-xl transition-all hover:opacity-90 hover:scale-[1.01] mb-3"
                      style={{ background: 'linear-gradient(135deg, #048F02, #036b01)' }}
                    >
                      Continue →
                    </button>

                    <div className="flex items-center justify-center gap-4">
                      <span className="text-xs text-gray-400">🔒 Secure</span>
                      <span className="text-xs text-gray-400">📱 M-Pesa</span>
                      <span className="text-xs text-gray-400">💳 Visa/Mastercard</span>
                    </div>
                  </div>
                )}

                {/* ── STEP 2: Details ── */}
                {step === 'details' && (
                  <div className="p-6">
                    <div className="rounded-xl px-4 py-2.5 mb-5 flex items-center justify-between" style={{ background: '#f0fdf4', border: '1px solid #bbf7bb' }}>
                      <span className="text-sm text-gray-600">Contributing</span>
                      <span className="font-bold text-lg" style={{ color: '#048F02' }}>KES {amount.toLocaleString()}</span>
                    </div>

                    <p className="text-sm text-gray-500 mb-4">We'll send your receipt to your email after payment.</p>

                    <div className="space-y-4 mb-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Your Name</label>
                        <input
                          type="text"
                          value={name}
                          onChange={e => { setName(e.target.value); setErrors(er => ({ ...er, name: undefined })); }}
                          className={`w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-100 transition-all ${errors.name ? 'border-red-400' : 'border-gray-200 focus:border-green-500'}`}
                          placeholder="e.g. John Kamau"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Email Address</label>
                        <input
                          type="email"
                          value={email}
                          onChange={e => { setEmail(e.target.value); setErrors(er => ({ ...er, email: undefined })); }}
                          className={`w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-100 transition-all ${errors.email ? 'border-red-400' : 'border-gray-200 focus:border-green-500'}`}
                          placeholder="your@email.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        <p className="text-xs text-gray-400 mt-1">✉️ Your receipt will be sent here</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setStep('amount')}
                        className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors text-sm"
                      >
                        ← Back
                      </button>
                      <button
                        onClick={handlePay}
                        className="flex-[2] py-3 text-white font-bold rounded-xl transition-all hover:opacity-90 text-sm"
                        style={{ background: 'linear-gradient(135deg, #EF6203, #c44d00)' }}
                      >
                        Contribute KES {amount.toLocaleString()} →
                      </button>
                    </div>
                  </div>
                )}

                {/* ── STEP 3: Processing ── */}
                {step === 'processing' && (
                  <div className="p-10 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: '#f0fdf4' }}>
                      <svg className="w-8 h-8 animate-spin" style={{ color: '#048F02' }} fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-gray-800 text-lg mb-2">Processing...</h4>
                    <p className="text-gray-500 text-sm">Please complete the payment in the window that opened. Do not close this page.</p>
                  </div>
                )}

                {/* ── STEP 4: Success ── */}
                {step === 'success' && (
                  <div className="p-10 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: '#f0fdf4' }}>
                      <svg className="w-8 h-8" style={{ color: '#048F02' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-gray-800 text-xl mb-2">Thank You, {name}! 🎉</h4>
                    <p className="text-gray-500 text-sm mb-1">
                      Your contribution of <strong style={{ color: '#048F02' }}>KES {amount.toLocaleString()}</strong> has been received.
                    </p>
                    <p className="text-gray-400 text-xs mb-6">A receipt has been sent to <strong>{email}</strong></p>
                    <button
                      onClick={resetWidget}
                      className="px-8 py-3 text-white font-bold rounded-xl transition-all hover:opacity-90"
                      style={{ background: 'linear-gradient(135deg, #048F02, #036b01)' }}
                    >
                      ❤️ Support Again
                    </button>
                  </div>
                )}

                {/* ── STEP 5: Error ── */}
                {step === 'error' && (
                  <div className="p-10 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
                      <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-gray-800 text-lg mb-2">Payment Not Completed</h4>
                    <p className="text-gray-500 text-sm mb-6">No amount has been charged. You can try again whenever you're ready.</p>
                    <div className="flex gap-3 justify-center">
                      <button onClick={resetWidget} className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors text-sm">
                        Cancel
                      </button>
                      <button
                        onClick={() => setStep('amount')}
                        className="px-6 py-2.5 text-white font-bold rounded-xl transition-all hover:opacity-90 text-sm"
                        style={{ background: 'linear-gradient(135deg, #048F02, #036b01)' }}
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Secured by IntaSend
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <span>✉️</span> Receipt guaranteed
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <span>🇰🇪</span> Kenya-based
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ──────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#EF6203' }}>Got questions?</p>
            <h2 className="text-2xl lg:text-3xl font-black text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border overflow-hidden transition-all"
                style={{ borderColor: openFaq === i ? '#048F02' : '#e5e7eb' }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
                  style={{ background: openFaq === i ? '#f0fdf4' : '#fff' }}
                >
                  <span className="text-sm font-bold text-gray-800 pr-4">{faq.q}</span>
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold transition-all"
                    style={{ background: openFaq === i ? '#048F02' : '#EF6203' }}
                  >
                    {openFaq === i ? '−' : '+'}
                  </span>
                </button>

                {openFaq === i && (
                  <div className="px-5 pb-4" style={{ background: '#f0fdf4', borderTop: '1px solid #dcfce7' }}>
                    <p className="text-sm text-gray-600 leading-relaxed pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-10 rounded-2xl p-6 text-center" style={{ background: 'linear-gradient(135deg, #fff7ed, #f0fdf4)', border: '1px solid #fed7aa' }}>
            <p className="text-gray-700 font-semibold mb-1">Still have a question?</p>
            <p className="text-gray-500 text-sm mb-4">We're happy to help. Reach out directly and we'll respond promptly.</p>
            <a
              href="mailto:simonmachariamugo@gmail.com"
              className="inline-block text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #EF6203, #c44d00)' }}
            >
              Email Us →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}