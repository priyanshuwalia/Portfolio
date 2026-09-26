import { useEffect, useRef, useState } from 'react';

/**
 * One-shot (or re-armed) in-view flag. Reveal animations should fire once —
 * re-animating on every scroll pass reads as jitter.
 */
export const useInView = ({ threshold = 0.15, rootMargin = '0px 0px -8% 0px', once = true } = {}) => {
  // Without IntersectionObserver there's nothing to observe, so start revealed
  // rather than leaving content permanently hidden behind a transition.
  const supported = typeof IntersectionObserver !== 'undefined';

  const ref = useRef(null);
  const [inView, setInView] = useState(!supported);

  useEffect(() => {
    const el = ref.current;
    if (!el || !supported) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once, supported]);

  return [ref, inView];
};
