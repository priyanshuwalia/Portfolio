import { useEffect } from 'react';
import { motion, useAnimation, useMotionValue } from 'motion/react';
import { cn } from '../../lib/cn';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * CircularText — vendored from reactbits.dev/text-animations/circular-text
 *
 * Sets a short string around a ring. The original hard-codes a 200px box and
 * 24px type; here the ring is sized entirely by CSS (`--ring-inset`) so it can
 * hug a portrait, and rotation stops for reduced-motion users.
 */
const rotationTransition = (duration, from, loop) => ({
  from,
  to: from + 360,
  ease: 'linear',
  duration,
  type: 'tween',
  repeat: loop ? Infinity : 0
});

const spin = (controls, rotation, duration) => {
  const from = rotation.get();
  controls.start({
    rotate: from + 360,
    scale: 1,
    transition: {
      rotate: rotationTransition(duration, from),
      scale: { type: 'spring', damping: 20, stiffness: 300 }
    }
  });
};

export const CircularText = ({ text = '', spinDuration = 28, className, style, ...rest }) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation = useMotionValue(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    spin(controls, rotation, spinDuration);
  }, [spinDuration, controls, rotation, reduced]);

  return (
    <motion.div
      className={cn('rb-circular', className)}
      style={{ rotate: reduced ? 0 : rotation, ...style }}
      initial={{ rotate: 0 }}
      animate={controls}
      onMouseEnter={() => !reduced && spin(controls, rotation, spinDuration / 4)}
      onMouseLeave={() => !reduced && spin(controls, rotation, spinDuration)}
      aria-hidden="true"
      {...rest}
    >
      {letters.map((letter, i) => {
        const angle = (360 / letters.length) * i;
        return (
          <span key={`${letter}-${i}`} style={{ transform: `rotate(${angle}deg) translateY(var(--ring-inset))` }}>
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;
