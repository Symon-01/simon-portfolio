// FILE LOCATION: src/components/SupportButton.tsx

"use client";

import { useEffect, useState } from 'react';

interface SupportButtonProps {
  position?: 'top' | 'bottom';
  className?: string;
}

declare global {
  interface Window {
    IntaSend: any;
    intaSendLoaded?: boolean;
    intaSendInstance?: any;
  }
}

export default function SupportButton({ position = 'top', className = '' }: SupportButtonProps) {
  const [isReady, setIsReady] = useState(true);
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [customAmount, setCustomAmount] = useState('');

  useEffect(() => {
    if (window.intaSendLoaded && window.intaSendInstance) {
      return;
    }

    if (window.IntaSend && !window.intaSendInstance) {
      initializeIntaSend();
      return;
    }

    if (!document.querySelector('script[src*="intasend-inline.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/intasend-inlinejs-sdk@3.0.4/build/intasend-inline.js';
      script.async = true;
      
      script.onload = () => {
        initializeIntaSend();
      };
      
      script.onerror = () => {
        console.error('Failed to load IntaSend script');
      };
      
      document.head.appendChild(script);
    }
  }, []);

  const initializeIntaSend = () => {
    if (typeof window !== 'undefined' && window.IntaSend) {
      try {
        window.intaSendInstance = new window.IntaSend({
          publicAPIKey: "ISPubKey_live_21190558-5e93-43fa-a463-35d4c93ba453", // ← Replace with your live key from IntaSend → Integrations
          live: true, // ← Changed from false to true
        });
        window.intaSendLoaded = true;
      } catch (error) {
        console.error('Failed to initialize IntaSend:', error);
      }
    }
  };

  const handleButtonClick = () => {
    setShowAmountModal(true);
  };

  const handlePayment = () => {
    if (!window.intaSendInstance && window.IntaSend) {
      initializeIntaSend();
    }

    if (!window.intaSendInstance) {
      alert('Payment system is initializing, please try again in a moment.');
      return;
    }

    const amount = parseInt(customAmount);
    
    if (!customAmount || isNaN(amount) || amount < 10) {
      alert('Please enter a valid amount (minimum KES 10)');
      return;
    }

    setShowAmountModal(false);

    try {
      window.intaSendInstance
        .run({
          amount: amount,
          currency: "KES",
          api_ref: `support-${Date.now()}`,
        })
        .on("COMPLETE", (response: any) => {
          console.log("Payment completed:", response);
          alert("Thank you for your support! 🎉");
        })
        .on("FAILED", (response: any) => {
          console.log("Payment failed:", response);
          alert("Payment was not completed. Please try again.");
        })
        .on("IN-PROGRESS", () => {
          console.log("Payment in progress...");
        });
    } catch (error) {
      console.error('Payment error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <div className={`${position === 'top' ? 'mb-8' : 'mt-8'} ${className}`}>
        <div className="flex justify-center">
          <button
            onClick={handleButtonClick}
            className="support-button support-button-pop group relative inline-flex items-center gap-3 px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #048F02 0%, #06b003 100%)',
              boxShadow: '0 4px 15px rgba(4, 143, 2, 0.3)',
              cursor: 'pointer',
            }}
          >
            <svg
              className="w-6 h-6 transition-transform group-hover:rotate-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>

            <span className="text-base md:text-lg">Support our Work</span>

            <div
              className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                animation: 'shimmer 2s infinite',
              }}
            />
          </button>
        </div>

        <p className="text-center mt-3 text-sm text-gray-600">
          💳 Cards · 📱 M-Pesa · 🏦 Bank Transfer
        </p>
      </div>

      {/* Custom Amount Modal */}
      {showAmountModal && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{
            background: 'linear-gradient(135deg, rgba(4, 143, 2, 0.7), rgba(239, 98, 3, 0.7))'
          }}
          onClick={() => setShowAmountModal(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Support Our Work ❤️
            </h3>
            
            <p className="text-gray-600 text-sm mb-6 text-center">
              Enter the amount you'd like to contribute. Every support helps us create more amazing designs!
            </p>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                💰 Your Support Amount (KES)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-sm">
                  KES
                </span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full pl-16 pr-4 py-3 text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all"
                  placeholder="Enter amount"
                  min="10"
                  autoFocus
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-gray-500">💡 Minimum: KES 10</p>
                <p className="text-xs font-semibold" style={{ color: '#048F02' }}>✨ Your amount is appreciated!</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mb-5 pb-5 border-b border-gray-200">
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Secure Payment</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">M-Pesa & Cards</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowAmountModal(false)}
                className="flex-1 py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                className="flex-1 py-3 px-4 text-white font-semibold rounded-lg transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #048F02 0%, #06b003 100%)',
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes smooth-pop {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 4px 15px rgba(4, 143, 2, 0.3); }
          50% { box-shadow: 0 6px 25px rgba(4, 143, 2, 0.5), 0 0 30px rgba(4, 143, 2, 0.2); }
        }
        .support-button-pop {
          animation: smooth-pop 2.5s ease-in-out infinite, pulse-glow 2.5s ease-in-out infinite;
        }
        .support-button-pop:hover {
          animation: smooth-pop 1.2s ease-in-out infinite, pulse-glow 1.2s ease-in-out infinite;
        }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </>
  );
}