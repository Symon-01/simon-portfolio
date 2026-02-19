// FILE: src/contexts/QuoteModalContext.tsx
// LOCATION: simon-designs/src/contexts/QuoteModalContext.tsx

'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { X } from 'lucide-react';

// Create the context
interface QuoteModalContextType {
  openModal: () => void;
  closeModal: () => void;
  isOpen: boolean;
}

const QuoteModalContext = createContext<QuoteModalContextType | undefined>(undefined);

// Hook to use the modal
export const useQuoteModal = () => {
  const context = useContext(QuoteModalContext);
  if (!context) {
    throw new Error('useQuoteModal must be used within QuoteModalProvider');
  }
  return context;
};

// Provider component
export const QuoteModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setSubmitStatus('idle');
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type: 'quote-request',
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          budget: '',
          description: '',
        });
        setTimeout(() => {
          closeModal();
        }, 2000);
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

  return (
    <QuoteModalContext.Provider value={{ openModal, closeModal, isOpen }}>
      {children}

      {/* Global Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          style={{
            background: 'linear-gradient(135deg, rgba(4, 143, 2, 0.7), rgba(239, 98, 3, 0.7))'
          }}
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Request a Quote</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {submitStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Quote Request Sent!
                  </h3>
                  <p className="text-gray-600 text-sm">
                    We'll review your request and get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                      placeholder="+254 7XX XXX XXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Project Type *
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    >
                      <option value="">Select a service...</option>
                      <option value="branding">Brand Identity</option>
                      <option value="marketing">Marketing Materials</option>
                      <option value="uiux">UI/UX Design</option>
                      <option value="print">Publication & Print</option>
                      <option value="packaging">Packaging Design</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    >
                      <option value="">Select budget...</option>
                      <option value="0-50k">KES 0 - 50,000</option>
                      <option value="50k-100k">KES 50,000 - 100,000</option>
                      <option value="100k-250k">KES 100,000 - 250,000</option>
                      <option value="250k+">KES 250,000+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Project Details *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none text-sm"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                      Failed to submit. Please try again or contact us directly.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
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