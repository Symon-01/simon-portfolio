'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Configure NProgress
NProgress.configure({ 
  showSpinner: false,
  speed: 400,
  minimum: 0.08,
  easing: 'ease',
  trickle: true,
  trickleSpeed: 300,
});

export default function LoadingBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Complete the progress bar when route changes
    NProgress.done();
  }, [pathname, searchParams]);

  useEffect(() => {
    // Aggressive click handler - catches EVERYTHING
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Find closest clickable element (link, button, or anything with click handler)
      const clickable = target.closest('a, button, [role="button"]');
      
      if (clickable) {
        const element = clickable as HTMLElement;
        
        // Check if it's a link
        if (element.tagName === 'A') {
          const href = element.getAttribute('href');
          if (href && href.startsWith('/')) {
            // Internal link - start progress
            NProgress.start();
            return;
          }
        }
        
        // For buttons or other clickables, start progress optimistically
        NProgress.start();
        
        // Auto-complete after 100ms if no route change
        setTimeout(() => {
          const currentPath = window.location.pathname;
          // Check if we're still on same page after 100ms
          if (currentPath === pathname) {
            NProgress.done();
          }
        }, 100);
      }
    };

    // Listen to clicks in capture phase (before any other handlers)
    document.addEventListener('click', handleClick, true);
    
    // Also listen to browser back/forward buttons
    const handlePopState = () => {
      NProgress.start();
    };
    
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('click', handleClick, true);
      window.removeEventListener('popstate', handlePopState);
      NProgress.done();
    };
  }, [pathname]);

  return null;
}