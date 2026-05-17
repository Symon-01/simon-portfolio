// FILE LOCATION: src/components/ContactForm.tsx
"use client";

import { useState, useEffect } from 'react';

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

// Strips spaces/dashes then checks digit count (±1 flexibility)
function validatePhone(local: string, expected: number): boolean {
  if (!local) return true; // optional field
  const digits = local.replace(/[\s\-(). ]/g, '');
  return /^\d+$/.test(digits) && Math.abs(digits.length - expected) <= 1;
}

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// ── Component ─────────────────────────────────────────────────────────────────
export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    localPhone: '',
    countryCode: DEFAULT_CODE,
    service: '',
    projectDetails: '',
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [shouldBlink, setShouldBlink] = useState(false);

  // ── Auto-scroll & blink ────────────────────────────────────────────
  useEffect(() => {
    if (window.location.hash === '#form') {
      setTimeout(() => {
        const formCard = document.getElementById('contact-form-card');
        if (formCard) {
          formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setShouldBlink(true);
          setTimeout(() => {
            setShouldBlink(false);
            window.history.replaceState(null, '', '/contact');
          }, 2000);
        }
      }, 500);
    }
  }, []);

  // ── Derived validation ─────────────────────────────────────────────
  const phoneError =
    touched.localPhone &&
    formData.localPhone &&
    !validatePhone(formData.localPhone, formData.countryCode[3])
      ? `Please enter a valid ${formData.countryCode[1]} phone number`
      : '';

  const emailError =
    touched.email && formData.email && !isValidEmail(formData.email)
      ? 'Please enter a valid email address'
      : '';

  // ── Handlers ──────────────────────────────────────────────────────
  const handleChange = (
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
    setTouched({ fullName: true, email: true, localPhone: true, service: true, projectDetails: true });
    if (emailError || phoneError) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const fullPhone = formData.localPhone
      ? `${formData.countryCode[2]} ${formData.localPhone}`
      : '';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: fullPhone,
          service: formData.service,
          projectDetails: formData.projectDetails,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          fullName: '', email: '', localPhone: '',
          countryCode: DEFAULT_CODE, service: '', projectDetails: '',
        });
        setTouched({});
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to send message. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase = "form-input w-full px-4 py-2.5 border rounded-lg transition disabled:bg-gray-100 disabled:cursor-not-allowed";

  return (
    <>
      <style jsx>{`
        .section-title { font-size: 2rem !important; line-height: 1.3 !important; margin-bottom: 0.375rem !important; }
        .section-desc  { font-size: 1rem !important; line-height: 1.6 !important; }
        .form-label    { font-size: 0.875rem !important; font-weight: 600; }
        .form-input    { font-size: 0.875rem !important; }
        .form-input:focus { outline: none; border-color: #048F02; box-shadow: 0 0 0 3px rgba(4,143,2,0.1); }
        .form-input.err:focus { border-color: #f87171; box-shadow: 0 0 0 3px rgba(248,113,113,0.15); }
        @media (min-width: 1024px) {
          button.cta-button {
            padding: 10px 28px !important; font-size: 0.9375rem !important;
            min-height: 44px !important; font-weight: 600 !important;
            display: inline-flex !important; align-items: center !important; justify-content: center !important;
          }
        }
        @media (max-width: 1023px) {
          .section-title { font-size: 1.5rem !important; margin-bottom: 0.25rem !important; }
          .section-desc  { font-size: 0.9rem !important; padding: 0 8px; }
          .form-label    { font-size: 0.8rem !important; }
          .form-input    { font-size: 0.8rem !important; }
        }
        @keyframes slideIn { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
        .alert-animation { animation: slideIn 0.3s ease-out; }
        @keyframes blink-highlight {
          0%,100% { box-shadow:0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06); transform:scale(1); }
          50%      { box-shadow:0 0 60px 20px rgba(4,143,2,0.5),0 0 30px 10px rgba(239,98,3,0.3); transform:scale(1.02); }
        }
        .blink-active { animation: blink-highlight 1s ease-in-out 2; }

        /* Phone row */
        .phone-row { display:flex; }
        .country-select {
          flex-shrink:0; border:1px solid #d1d5db; border-right:none;
          border-radius:0.5rem 0 0 0.5rem; background:#f9fafb;
          padding:0 10px; font-size:0.875rem; cursor:pointer; min-width:105px;
          color:#374151; height:42px;
        }
        .country-select:focus { outline:none; border-color:#048F02; box-shadow:0 0 0 3px rgba(4,143,2,0.1); position:relative; z-index:1; }
        .phone-local { border-radius:0 0.5rem 0.5rem 0 !important; }
      `}</style>

      <section className="py-6 lg:py-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">

          <div className="text-center mb-8">
            <h2 className="section-title font-bold" style={{ color: '#048F02' }}>Send Us a Message</h2>
            <p className="section-desc text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>

          {submitStatus === 'success' && (
            <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg alert-animation">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-semibold text-green-800" style={{ fontSize: '0.875rem' }}>Message sent successfully!</p>
                  <p className="text-green-700" style={{ fontSize: '0.8rem' }}>Thank you for contacting us. We'll get back to you soon.</p>
                </div>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg alert-animation">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-semibold text-red-800" style={{ fontSize: '0.875rem' }}>Error sending message</p>
                  <p className="text-red-700" style={{ fontSize: '0.8rem' }}>{errorMessage}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div
              id="contact-form-card"
              className={`bg-white rounded-2xl shadow-xl p-6 lg:p-8 border-t-4 ${shouldBlink ? 'blink-active' : ''}`}
              style={{ borderTopColor: '#EF6203' }}
            >
              <div className="space-y-5">

                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="form-label block text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text" id="fullName" name="fullName" required
                    value={formData.fullName} onChange={handleChange} disabled={isSubmitting}
                    className={`${inputBase} border-gray-300`} placeholder="John Doe"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="form-label block text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email" id="email" name="email" required
                      value={formData.email} onChange={handleChange} disabled={isSubmitting}
                      className={`${inputBase} ${emailError ? 'border-red-400 err' : 'border-gray-300'}`}
                      placeholder="john@example.com"
                    />
                    {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
                  </div>

                  {/* Phone with country dropdown */}
                  <div>
                    <label className="form-label block text-gray-700 mb-2">
                      Phone Number <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <div className="phone-row" style={{ height: '42px' }}>
                      <select
                        className="country-select"
                        value={formData.countryCode[2] + formData.countryCode[1]}
                        onChange={handleCountryChange}
                        disabled={isSubmitting}
                        title="Select country code"
                      >
                        {COUNTRY_CODES.map(([flag, name, code]) => (
                          <option key={`${name}-${code}`} value={code + name}>
                            {flag} {code}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel" name="localPhone"
                        value={formData.localPhone} onChange={handleChange} disabled={isSubmitting}
                        className={`form-input phone-local w-full px-4 py-2.5 border rounded-lg transition disabled:bg-gray-100 disabled:cursor-not-allowed ${phoneError ? 'border-red-400 err' : 'border-gray-300'}`}
                        placeholder="Phone number"
                        maxLength={formData.countryCode[3] + 2}
                      />
                    </div>
                    {phoneError && <p className="text-xs text-red-500 mt-1">{phoneError}</p>}
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label htmlFor="service" className="form-label block text-gray-700 mb-2">Service Interested In *</label>
                  <select
                    id="service" name="service" required
                    value={formData.service} onChange={handleChange} disabled={isSubmitting}
                    className={`${inputBase} border-gray-300`}
                  >
                    <option value="">Select a service</option>
                    <option value="Branding & Logo Design">Branding & Logo Design</option>
                    <option value="Marketing Materials">Marketing Materials</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Publication & Print">Publication & Print</option>
                    <option value="Packaging Design">Packaging Design</option>
                    <option value="Custom Portrait/Artwork Commission">Custom Portrait/Artwork Commission</option>
                    <option value="Artwork Purchase Inquiry">Artwork Purchase Inquiry</option>
                    <option value="Other / Custom Project">Other / Custom Project</option>
                  </select>
                </div>

                {/* Project Details */}
                <div>
                  <label htmlFor="projectDetails" className="form-label block text-gray-700 mb-2">Project Details *</label>
                  <textarea
                    id="projectDetails" name="projectDetails" required rows={5}
                    value={formData.projectDetails} onChange={handleChange} disabled={isSubmitting}
                    className={`${inputBase} border-gray-300 resize-none`}
                    placeholder="Tell us about your project, timeline, budget, and any specific requirements..."
                  />
                </div>

                {/* Submit */}
                <div className="text-center pt-2">
                  <button
                    type="submit" disabled={isSubmitting}
                    className="cta-button rounded-lg text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    style={{ backgroundColor: isSubmitting ? '#999' : '#048F02', padding: '8px 16px', fontSize: '0.875rem', fontWeight: '600' }}
                    onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.backgroundColor = '#037a01'; }}
                    onMouseLeave={e => { if (!isSubmitting) e.currentTarget.style.backgroundColor = '#048F02'; }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : 'Send Message'}
                  </button>
                </div>

              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}