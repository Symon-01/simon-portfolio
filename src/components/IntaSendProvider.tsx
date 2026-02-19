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
    script.async = false; // Load synchronously for immediate availability
    
    script.onload = () => {
      if (window.IntaSend) {
        try {
          // Initialize once globally
          window.intaSendInstance = new window.IntaSend({
            publicAPIKey: "ISPubKey_test_1f96fe11-a51a-45aa-bba4-34d57bcc4510",
            live: false,
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

  return null; // This component doesn't render anything
}