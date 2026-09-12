import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';

const subscribeReducedMotion = (callback) => {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
};

const getReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Reveal = ({ children, className = '', ...rest }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const reduced = useSyncExternalStore(subscribeReducedMotion, getReducedMotion);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  const revealClass = reduced
    ? className
    : `reveal ${visible ? 'reveal-visible' : ''} ${className}`.trim();

  return (
    <div ref={ref} className={revealClass} {...rest}>
      {children}
    </div>
  );
};

export default Reveal;