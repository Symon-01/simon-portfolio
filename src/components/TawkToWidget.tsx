// FILE LOCATION: src/components/TawkToWidget.tsx

'use client';

import { useEffect } from 'react';

export default function TawkToWidget() {
  useEffect(() => {
    // Tawk.to Live Chat Widget
    var Tawk_API = (window as any).Tawk_API || {};
    var Tawk_LoadStart = new Date();
    
    (function() {
      var s1 = document.createElement("script");
      var s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/68ebccb1ab07261951f584d4/1j7chf5nn';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      if (s0 && s0.parentNode) {
        s0.parentNode.insertBefore(s1, s0);
      }
    })();
  }, []);

  return null; // This component doesn't render anything visible
}