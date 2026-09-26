import { useEffect, useRef } from 'react';
import { Noise } from '../reactbits';
import { useHasFinePointer } from '../../hooks/useMediaQuery';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * Backdrop — the page's only fixed, always-painting layer.
 *
 * Three CSS layers (base wash, grid rules, pointer bloom) plus a canvas of
 * film grain sitting above the content. Pointer tracking is rAF-throttled and
 * disabled entirely for coarse pointers and reduced-motion users.
 */
export const Backdrop = () => {
  const glowRef = useRef(null);
  const frame = useRef(0);
  const finePointer = useHasFinePointer();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!finePointer || reduced) return undefined;

    const onPointerMove = (event) => {
      if (event.pointerType !== 'mouse') return;
      if (frame.current) return;

      frame.current = window.requestAnimationFrame(() => {
        frame.current = 0;
        glowRef.current?.style.setProperty('--x', `${event.clientX}px`);
        glowRef.current?.style.setProperty('--y', `${event.clientY}px`);
      });
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      if (frame.current) window.cancelAnimationFrame(frame.current);
    };
  }, [finePointer, reduced]);

  return (
    <>
      <div className="backdrop" aria-hidden="true">
        <div ref={glowRef} className="backdrop__glow" />
        <div className="backdrop__horizon" />
      </div>
      <Noise className="rb-grain" />
    </>
  );
};

export default Backdrop;
