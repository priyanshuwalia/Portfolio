import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * SmartVideo — autoplaying loop that only runs while on screen.
 *
 * Muted + playsInline is what lets a browser autoplay at all; the observer then
 * pauses it offscreen, which matters because a portfolio can hold several of
 * these at once and background decoding is expensive.
 */
export const SmartVideo = ({ src, className, poster, ...rest }) => {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video) return undefined;

    if (reduced) {
      video.pause();
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      tabIndex={-1}
      aria-hidden="true"
      {...rest}
    />
  );
};

export default SmartVideo;
