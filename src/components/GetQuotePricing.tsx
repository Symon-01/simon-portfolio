'use client';

import { useQuoteModal } from '@/contexts/QuoteModalContext';

interface GetQuotePricingProps {
  noteTitle?: string;
  noteContent?: string;
  buttonText?: string;
}

const GetQuotePricing = ({
  noteTitle = 'Note:',
  noteContent = 'All prices are indicative and may vary based on project complexity, timeline, and specific requirements. Custom packages are available.',
  buttonText = 'Request a Quote',
}: GetQuotePricingProps) => {
  const { openModal } = useQuoteModal();

  return (
    <>
      <style jsx>{`
        .quote-text {
          font-size: 0.9375rem !important;
          line-height: 1.6 !important;
        }

        .quote-content {
          background: white;
          padding: 2rem 1.5rem;
          border-radius: 1rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          border-left: 4px solid #EF6203;
        }

        .quote-content strong {
          color: #048F02;
          font-weight: 600;
        }

        .quote-btn {
          display: inline-block;
          background: #048F02;
          color: white;
          padding: 8px 16px;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 6px -1px rgba(4, 143, 2, 0.2), 0 2px 4px -1px rgba(4, 143, 2, 0.1);
        }

        .quote-btn:hover {
          background: #037a01;
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(4, 143, 2, 0.3), 0 4px 6px -2px rgba(4, 143, 2, 0.2);
        }

        @media (max-width: 1023px) {
          .quote-text {
            font-size: 0.85rem !important;
            line-height: 1.5 !important;
          }

          .quote-content {
            padding: 1.5rem 1.25rem;
          }

          .quote-btn {
            font-size: 0.8rem;
            padding: 8px 14px;
          }
        }

        @media (min-width: 1024px) {
          .quote-content {
            padding: 2.5rem 2rem;
          }
        }
      `}</style>

      <section className="py-6 lg:py-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="quote-content">
            <p className="quote-text text-gray-700 text-center mb-6">
              <strong>{noteTitle}</strong> {noteContent}
            </p>
            <div className="text-center">
              <button
                onClick={openModal}
                className="quote-btn"
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GetQuotePricing;