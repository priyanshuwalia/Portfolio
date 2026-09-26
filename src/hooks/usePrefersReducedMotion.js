import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

const subscribe = (onChange) => {
  const media = window.matchMedia(QUERY);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
};

const getSnapshot = () => window.matchMedia(QUERY).matches;

/** Live-updating, SSR-safe `prefers-reduced-motion`. */
export const usePrefersReducedMotion = () =>
  useSyncExternalStore(subscribe, getSnapshot, () => false);
