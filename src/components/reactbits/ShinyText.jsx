import { useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'motion/react';
import { cn } from '../../lib/cn';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * ShinyText — vendored from reactbits.dev/text-animations/shiny-text
 *
 * A specular highlight that sweeps across text. Colours default to this
 * project's ink ramp rather than React Bits' greys.
 */
export const ShinyText = ({
  text,
  className,
  color = 'var(--ink-dim)',
  shineColor = 'var(--ink)',
  spread = 110,
  speed = 2.6,
  delay = 0,
  disabled = false,
  ...rest
}) => {
  const reduced = usePrefersReducedMotion();
  const [paused, setPaused] = useState(false);
  const progress = useMotionValue(0);
  const elapsed = useRef(0);
  const lastFrame = useRef(null);

  const animationDuration = speed * 1000;
  const delayDuration = delay * 1000;

  useAnimationFrame((time) => {
    if (disabled || paused || reduced) {
      lastFrame.current = null;
      return;
    }
    if (lastFrame.current === null) {
      lastFrame.current = time;
      return;
    }
    elapsed.current += time - lastFrame.current;
    lastFrame.current = time;

    const cycle = animationDuration + delayDuration;
    const position = elapsed.current % cycle;
    const p = position < animationDuration ? (position / animationDuration) * 100 : 100;
    progress.set(p);
  });

  const backgroundPosition = useTransform(progress, (p) => `${150 - p * 2}% center`);

  return (
    <motion.span
      className={cn('rb-shiny', className)}
      style={{
        backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 38%, ${shineColor} 50%, ${color} 62%, ${color} 100%)`,
        backgroundSize: '220% auto',
        backgroundPosition: reduced ? '50% center' : backgroundPosition,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      {...rest}
    >
      {text}
    </motion.span>
  );
};

export default ShinyText;
