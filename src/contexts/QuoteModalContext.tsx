// FILE LOCATION: src/contexts/QuoteModalContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { X, Receipt } from 'lucide-react';

// ── Country codes: [flag, name, dialCode, expectedLocalDigits] ───────────────
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

const DEFAULT_CODE = COUNTRY_CODES[0]; // Kenya

function validatePhone(local: string, expected: number): boolean {
  if (!local) return true;
  const digits = local.replace(/[\s\-(). ]/g, '');
  return /^\d+$/.test(digits) && Math.abs(digits.length - expected) <= 1;
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface OpenModalOptions {
  originService?: string;
  estimateTotal?: number;
  estimateSummary?: string;
  projectType?: string;
}

interface QuoteModalContextType {
  openModal: (options?: OpenModalOptions) => void;
  closeModal: () => void;
  isOpen: boolean;
}

function resolveBudgetBracket(total: number): string {
  if (total <= 50000)  return '0-50k';
  if (total <= 100000) return '50k-100k';
  if (total <= 250000) return '100k-250k';
  return '250k+';
}

// ── Context ───────────────────────────────────────────────────────────────────

const QuoteModalContext = createContext<QuoteModalContextType | undefined>(undefined);

export const useQuoteModal = () => {
  const context = useContext(QuoteModalContext);
  if (!context) throw new Error('useQuoteModal must be used within QuoteModalProvider');
  return context;
};

// ── Provider ──────────────────────────────────────────────────────────────────

export const QuoteModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    localPhone: '',
    countryCode: DEFAULT_CODE,
    projectType: '',
    budget: '',
    description: '',
  });

  // Touched state for inline validation
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [originService, setOriginService]     = useState('');
  const [estimateSummary, setEstimateSummary] = useState('');
  const [isSubmitting, setIsSubmitting]       = useState(false);
  const [submitStatus, setSubmitStatus]       = useState<'idle' | 'success' | 'error'>('idle');

  // ── Derived validation ─────────────────────────────────────────────
  const phoneError =
    touched.localPhone &&
    formData.localPhone &&
    !validatePhone(formData.localPhone, formData.countryCode[3])
      ? `Please enter a valid ${formData.countryCode[1]} phone number`
      : '';

  // ── Open / Close ──────────────────────────────────────────────────
  const openModal = (options?: OpenModalOptions) => {
    setFormData({
      name: '', email: '', localPhone: '', countryCode: DEFAULT_CODE,
      projectType: options?.projectType ?? '',
      budget: options?.estimateTotal != null ? resolveBudgetBracket(options.estimateTotal) : '',
      description: '',
    });
    setTouched({});
    setOriginService(options?.originService ?? '');
    setEstimateSummary(options?.estimateSummary ?? '');
    setSubmitStatus('idle');
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSubmitStatus('idle');
  };

  // ── Handlers ──────────────────────────────────────────────────────
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const found = COUNTRY_CODES.find(c => c[2] + c[1] === e.target.value);
    if (found) {
      setFormData(prev => ({ ...prev, countryCode: found, localPhone: '' }));
      setTouched(prev => ({ ...prev, localPhone: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, localPhone: true, projectType: true, description: true });
    if (phoneError) return;

    setIsSubmitting(true);
    try {
      const fullPhone = formData.localPhone
        ? `${formData.countryCode[2]} ${formData.localPhone}`
        : '';

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: fullPhone,
          projectType: formData.projectType,
          budget: formData.budget,
          description: formData.description,
          type: 'quote-request',
          originService,
          estimateSummary,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', localPhone: '', countryCode: DEFAULT_CODE, projectType: '', budget: '', description: '' });
        setOriginService('');
        setEstimateSummary('');
        setTimeout(() => closeModal(), 2500);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Input style helper ────────────────────────────────────────────
  const inputCls = (hasErr?: boolean) =>
    `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm transition ${
      hasErr
        ? 'border-red-400 focus:ring-red-200'
        : 'border-gray-300 focus:ring-green-500'
    }`;

  // ── Render ────────────────────────────────────────────────────────
  return (
    <QuoteModalContext.Provider value={{ openModal, closeModal, isOpen }}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 z-[1100]"
          style={{ background: 'linear-gradient(135deg, rgba(4,143,2,0.7), rgba(239,98,3,0.7))' }}
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Request a Quote</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 transition-colors" aria-label="Close modal">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {submitStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Quote Request Sent!</h3>
                  <p className="text-gray-600 text-sm">We'll review your request and get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">

                  {/* Estimate Summary Card (read-only) */}
                  {estimateSummary && (
                    <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: 10, padding: '0.75rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Receipt size={13} color="#16a34a" />
                          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            Your Estimate Summary
                          </span>
                        </div>
                        <span style={{ fontSize: '0.62rem', color: '#86efac', fontWeight: 600, background: '#dcfce7', padding: '1px 7px', borderRadius: 999, border: '1px solid #86efac' }}>
                          Auto-attached
                        </span>
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#166534', lineHeight: 1.75, whiteSpace: 'pre-line' }}>
                        {estimateSummary}
                      </div>
                      <div style={{ marginTop: '0.5rem', paddingTop: '0.4rem', borderTop: '1px dashed #86efac', fontSize: '0.65rem', color: '#4ade80', fontStyle: 'italic' }}>
                        This summary is sent automatically with your request — no need to copy it below.
                      </div>
                    </div>
                  )}

                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className={inputCls()} placeholder="Your name" />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className={inputCls()} placeholder="your@email.com" />
                  </div>

                  {/* Phone with country code dropdown */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Phone Number <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <div style={{ display: 'flex', height: '38px' }}>
                      <select
                        value={formData.countryCode[2] + formData.countryCode[1]}
                        onChange={handleCountryChange}
                        disabled={isSubmitting}
                        title="Select country code"
                        style={{
                          flexShrink: 0, minWidth: '100px', border: '1px solid',
                          borderColor: phoneError ? '#f87171' : '#d1d5db',
                          borderRight: 'none', borderRadius: '0.5rem 0 0 0.5rem',
                          background: '#f9fafb', padding: '0 8px',
                          fontSize: '0.875rem', cursor: 'pointer', color: '#374151',
                        }}
                      >
                        {COUNTRY_CODES.map(([flag, name, code]) => (
                          <option key={`${name}-${code}`} value={code + name}>{flag} {code}</option>
                        ))}
                      </select>
                      <input
                        type="tel" name="localPhone"
                        value={formData.localPhone} onChange={handleInputChange}
                        placeholder="Phone number"
                        maxLength={formData.countryCode[3] + 2}
                        className="w-full px-3 py-2 border text-sm transition focus:outline-none focus:ring-2"
                        style={{
                          borderColor: phoneError ? '#f87171' : '#d1d5db',
                          borderRadius: '0 0.5rem 0.5rem 0',
                          focusRingColor: phoneError ? '#fca5a5' : '#86efac',
                        } as React.CSSProperties}
                      />
                    </div>
                    {phoneError && <p className="text-xs text-red-500 mt-1">{phoneError}</p>}
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Project Type *</label>
                    <select name="projectType" value={formData.projectType} onChange={handleInputChange} required className={inputCls()}>
                      <option value="">Select a service...</option>
                      <option value="branding">Brand Identity</option>
                      <option value="marketing">Marketing Materials</option>
                      <option value="uiux">UI/UX Design</option>
                      <option value="print">Publication &amp; Print</option>
                      <option value="packaging">Packaging Design</option>
                    </select>
                  </div>

                  {/* Budget Range */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Budget Range</label>
                    <select name="budget" value={formData.budget} onChange={handleInputChange} className={inputCls()}>
                      <option value="">Select budget...</option>
                      <option value="0-50k">KES 0 – 50,000</option>
                      <option value="50k-100k">KES 50,000 – 100,000</option>
                      <option value="100k-250k">KES 100,000 – 250,000</option>
                      <option value="250k+">KES 250,000+</option>
                    </select>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Project Details *</label>
                    <p style={{ fontSize: '0.71rem', color: '#9ca3af', marginBottom: '0.35rem', lineHeight: 1.5 }}>
                      Tell us anything extra — specific requirements, deadlines, or questions not covered by the estimate above.
                    </p>
                    <textarea
                      name="description" value={formData.description} onChange={handleInputChange} required rows={4}
                      className={`${inputCls()} resize-none`}
                      placeholder="e.g. I need a 48-page magazine with a specific editorial style, tight deadline of 2 weeks..."
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                      Failed to submit. Please try again or contact us directly.
                    </div>
                  )}

                  <button
                    type="submit" disabled={isSubmitting}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Quote Request'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </QuoteModalContext.Provider>
  );
};