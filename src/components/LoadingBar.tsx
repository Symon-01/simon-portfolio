'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ 
  showSpinner: false,
  speed: 400,
  minimum: 0.08,
  easing: 'ease',
  trickle: true,
  trickleSpeed: 300,
});

function LoadingBarContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest('a, button, [role="button"]');
      
      if (clickable) {
        const element = clickable as HTMLElement;
        if (element.tagName === 'A') {
          const href = element.getAttribute('href');
          if (href && href.startsWith('/')) {
            NProgress.start();
            return;
          }
        }
        NProgress.start();
        setTimeout(() => {
          if (window.location.pathname === pathname) {
            NProgress.done();
          }
        }, 100);
      }
    };

    document.addEventListener('click', handleClick, true);
    const handlePopState = () => { NProgress.start(); };
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('click', handleClick, true);
      window.removeEventListener('popstate', handlePopState);
      NProgress.done();
    };
  }, [pathname]);

  return null;
}

export default function LoadingBar() {
  return (
    <Suspense fallback={null}>
      <LoadingBarContent />
    </Suspense>
  );
}