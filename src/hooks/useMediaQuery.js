import { useEffect, useState } from 'react';

const subscribe = (query) => (onChange) => {
  const media = window.matchMedia(query);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
};

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setMatches(media.matches);
    onChange();
    return subscribe(query)(onChange);
  }, [query]);

  return matches;
};

/** Coarse pointers get no hover-driven motion, and no tilt. */
export const useHasFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)');
