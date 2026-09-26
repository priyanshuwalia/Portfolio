import { useCallback, useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'motion/react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const decimalPlaces = (num) => {
  const [, decimals] = String(num).split('.');
  if (!decimals || parseInt(decimals, 10) === 0) return 0;
  return decimals.length;
};

/**
 * CountUp — vendored from reactbits.dev/text-animations/count-up
 *
 * Spring-smoothed numeric counter that only starts once scrolled into view.
 * Reduced-motion users get the final value immediately.
 */
export const CountUp = ({
  to,
  from = 0,
  duration = 1.8,
  delay = 0,
  className,
  prefix = '',
  suffix = '',
  pad = 0,
  ...rest
}) => {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const motionValue = useMotionValue(from);
  const spring = useSpring(motionValue, {
    damping: 20 + 40 * (1 / duration),
    stiffness: 100 * (1 / duration)
  });

  const isInView = useInView(ref, { once: true, margin: '0px' });
  const maxDecimals = Math.max(decimalPlaces(from), decimalPlaces(to));

  const format = useCallback(
    (value) => {
      const fixed = value.toFixed(maxDecimals);
      const [whole, decimals] = fixed.split('.');
      const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      const body = decimals ? `${grouped}.${decimals}` : grouped;
      return `${prefix}${pad > 0 ? body.padStart(pad, '0') : body}${suffix}`;
    },
    [maxDecimals, prefix, suffix, pad]
  );

  useEffect(() => {
    if (ref.current) ref.current.textContent = format(reduced ? to : from);
  }, [from, to, reduced, format]);

  useEffect(() => {
    if (isInView && !reduced) {
      const timer = setTimeout(() => motionValue.set(to), delay * 1000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isInView, reduced, motionValue, to, delay]);

  useEffect(() => {
    if (reduced) return undefined;
    return spring.on('change', (latest) => {
      if (ref.current) ref.current.textContent = format(latest);
    });
  }, [spring, format, reduced]);

  return <span ref={ref} className={className} {...rest} />;
};

export default CountUp;
