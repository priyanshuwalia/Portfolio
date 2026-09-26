import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * Noise — vendored from reactbits.dev/animations/noise
 *
 * Animated film grain. Draws into a quarter-resolution buffer scaled up by the
 * browser, which is the cheap way to get grain on a 4K display.
 */
const SIZE = 256;

export const Noise = ({ alpha = 16, refreshInterval = 3, className }) => {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return undefined;

    canvas.width = SIZE;
    canvas.height = SIZE;

    const paint = () => {
      const frame = ctx.createImageData(SIZE, SIZE);
      const data = frame.data;
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = alpha;
      }
      ctx.putImageData(frame, 0, 0);
    };

    paint();
    if (reduced) return undefined;

    // Grain is only legible when it changes; a slow tick keeps it alive
    // without holding the main thread at 60fps for a background texture.
    let frameCount = 0;
    let rafId;
    const tick = () => {
      if (frameCount % refreshInterval === 0) paint();
      frameCount += 1;
      rafId = window.requestAnimationFrame(tick);
    };
    rafId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(rafId);
  }, [alpha, refreshInterval, reduced]);

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ imageRendering: 'pixelated' }}
      aria-hidden="true"
    />
  );
};

export default Noise;
