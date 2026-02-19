// FILE LOCATION: src/components/ContactForm.tsx

"use client";

import { useState, useEffect } from 'react';

export default function ContactForm() {
  // Form data state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: '',
    projectDetails: ''
  });

  // Form status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [shouldBlink, setShouldBlink] = useState(false);

  // ✨ AUTO-SCROLL & BLINK EFFECT
  // When someone clicks a button with link: /contact#form
  useEffect(() => {
    // Check if URL has #form
    const hasFormHash = window.location.hash === '#form';
    
    if (hasFormHash) {
      // Wait 500ms for page to load completely
      setTimeout(() => {
        // Find the form card
        const formCard = document.getElementById('contact-form-card');
        
        if (formCard) {
          // Scroll smoothly to the form
          formCard.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
          
          // Start blinking animation
          setShouldBlink(true);
          
          // Stop blinking after 2 seconds (2 blinks)
          setTimeout(() => {
            setShouldBlink(false);
            // Clean up URL - remove #form
            window.history.replaceState(null, '', '/contact');
          }, 2000);
        }
      }, 500);
    }
  }, []);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        // Clear form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          service: '',
          projectDetails: ''
        });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
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

  return (
    <>
      <style jsx>{`
        /* Typography */
        .section-title {
          font-size: 2rem !important;
          line-height: 1.3 !important;
          margin-bottom: 0.375rem !important;
        }

        .section-desc {
          font-size: 1rem !important;
          line-height: 1.6 !important;
        }

        .form-label {
          font-size: 0.875rem !important;
          font-weight: 600;
        }

        .form-input {
          font-size: 0.875rem !important;
        }

        .form-input:focus {
          outline: none;
          border-color: #048F02;
          box-shadow: 0 0 0 3px rgba(4, 143, 2, 0.1);
        }

        /* Button */
        @media (min-width: 1024px) {
          button.cta-button {
            padding: 10px 28px !important;
            font-size: 0.9375rem !important;
            min-height: 44px !important;
            font-weight: 600 !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
        }

        /* Mobile */
        @media (max-width: 1023px) {
          .section-title {
            font-size: 1.5rem !important;
            margin-bottom: 0.25rem !important;
          }
          
          .section-desc {
            font-size: 0.9rem !important;
            padding: 0 8px;
          }

          .form-label {
            font-size: 0.8rem !important;
          }

          .form-input {
            font-size: 0.8rem !important;
          }
        }

        /* Animations */
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .alert-animation {
          animation: slideIn 0.3s ease-out;
        }

        /* ✨ BLINK EFFECT - Only for the form card */
        @keyframes blink-highlight {
          0%, 100% {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 60px 20px rgba(4, 143, 2, 0.5), 0 0 30px 10px rgba(239, 98, 3, 0.3);
            transform: scale(1.02);
          }
        }

        .blink-active {
          animation: blink-highlight 1s ease-in-out 2;
        }
      `}</style>

      <section className="py-6 lg:py-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="section-title font-bold" style={{color: '#048F02'}}>
              Send Us a Message
            </h2>
            <p className="section-desc text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>

          {/* Success Alert */}
          {submitStatus === 'success' && (
            <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg alert-animation">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-semibold text-green-800" style={{fontSize: '0.875rem'}}>Message sent successfully!</p>
                  <p className="text-green-700" style={{fontSize: '0.8rem'}}>Thank you for contacting us. We'll get back to you soon.</p>
                </div>
              </div>
            </div>
          )}

          {/* Error Alert */}
          {submitStatus === 'error' && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg alert-animation">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-semibold text-red-800" style={{fontSize: '0.875rem'}}>Error sending message</p>
                  <p className="text-red-700" style={{fontSize: '0.8rem'}}>{errorMessage}</p>
                </div>
              </div>
            </div>
          )}

          {/* Form Card - THIS WILL BLINK */}
          <form onSubmit={handleSubmit}>
            <div 
              id="contact-form-card"
              className={`bg-white rounded-2xl shadow-xl p-6 lg:p-8 border-t-4 ${shouldBlink ? 'blink-active' : ''}`}
              style={{borderTopColor: '#EF6203'}}
            >
              <div className="space-y-5">
                
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="form-label block text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="form-input w-full px-4 py-2.5 border border-gray-300 rounded-lg transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="form-label block text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="form-input w-full px-4 py-2.5 border border-gray-300 rounded-lg transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="form-label block text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="form-input w-full px-4 py-2.5 border border-gray-300 rounded-lg transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="+254 XXX XXX XXX"
                    />
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label htmlFor="service" className="form-label block text-gray-700 mb-2">
                    Service Interested In *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="form-input w-full px-4 py-2.5 border border-gray-300 rounded-lg transition disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                  <label htmlFor="projectDetails" className="form-label block text-gray-700 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="projectDetails"
                    name="projectDetails"
                    required
                    value={formData.projectDetails}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    rows={5}
                    className="form-input w-full px-4 py-2.5 border border-gray-300 rounded-lg transition resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Tell us about your project, timeline, budget, and any specific requirements..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="text-center pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cta-button rounded-lg text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    style={{
                      backgroundColor: isSubmitting ? '#999' : '#048F02',
                      padding: '8px 16px',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.backgroundColor = '#037a01';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.backgroundColor = '#048F02';
                      }
                    }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
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