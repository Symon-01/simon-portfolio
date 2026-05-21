// FILE LOCATION: src/components/IntaSendProvider.tsx

"use client";

import { useEffect } from 'react';

declare global {
  interface Window {
    IntaSend: any;
    intaSendLoaded?: boolean;
    intaSendInstance?: any;
  }
}

export default function IntaSendProvider() {
  useEffect(() => {
    // Only load once
    if (window.intaSendLoaded || document.querySelector('script[src*="intasend-inline.js"]')) {
      return;
    }

    // Preload IntaSend script globally
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/intasend-inlinejs-sdk@3.0.4/build/intasend-inline.js';
    script.async = false;
    
    script.onload = () => {
      if (window.IntaSend) {
        try {
          // Initialize once globally — LIVE mode
          window.intaSendInstance = new window.IntaSend({
            publicAPIKey: "ISPubKey_live_21190558-5e93-43fa-a463-35d4c93ba453", // ← Replace with your live key from IntaSend → Integrations
            live: true, // ← Changed from false to true
          });
          window.intaSendLoaded = true;
          console.log('IntaSend initialized globally');
        } catch (error) {
          console.error('Failed to initialize IntaSend:', error);
        }
      }
    };
    
    document.head.appendChild(script);
  }, []);

  return null;
}