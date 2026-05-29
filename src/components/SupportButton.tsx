// FILE LOCATION: src/components/SupportButton.tsx
//
// CHANGES FROM PREVIOUS VERSION:
// Animation now uses a global <style> tag injected into document head
// instead of styled-jsx, which doesn't work on <Link> elements.
// This ensures the pop and glow animations actually run on the button.

"use client";

import Link from 'next/link';
import { useEffect } from 'react';

interface SupportButtonProps {
  position?: 'top' | 'bottom';
  className?: string;
}

export default function SupportButton({ position = 'top', className = '' }: SupportButtonProps) {
  // Inject animation CSS globally — styled-jsx doesn't apply to Link components
  useEffect(() => {
    const styleId = 'support-button-animations';
    if (document.getElementById(styleId)) return;
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes support-pop {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.06); }
      }
      @keyframes support-glow {
        0%, 100% { box-shadow: 0 4px 15px rgba(4,143,2,0.3); }
        50% { box-shadow: 0 6px 25px rgba(4,143,2,0.55), 0 0 32px rgba(4,143,2,0.22); }
      }
      .support-btn-anim {
        animation: support-pop 2.5s ease-in-out infinite,
                   support-glow 2.5s ease-in-out infinite;
      }
      .support-btn-anim:hover {
        animation: support-pop 1.2s ease-in-out infinite,
                   support-glow 1.2s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div className={`${position === 'top' ? 'mb-8' : 'mt-8'} ${className}`}>
      <div className="flex justify-center">
        <Link
          href="/support"
          className="support-btn-anim group relative inline-flex items-center gap-3 px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #048F02 0%, #06b003 100%)',
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
        </Link>
      </div>

      <p className="text-center mt-3 text-sm text-gray-600">
        💳 Cards · 📱 M-Pesa · 🏦 Bank Transfer
      </p>
    </div>
  );
}