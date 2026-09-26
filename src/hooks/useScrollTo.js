import { useEffect } from 'react';

/** Smooth in-page navigation that respects the fixed nav and reduced motion. */
export const useScrollTo = (reducedMotion) => {
  useEffect(() => {
    const onClick = (event) => {
      const anchor = event.target.closest?.('a[href^="#"]');
      if (!anchor) return;

      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;

      const target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });

      // Keep the URL shareable without letting the browser jump the viewport.
      window.history.replaceState(null, '', id);
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [reducedMotion]);
};
