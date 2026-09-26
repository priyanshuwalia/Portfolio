import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/cn';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * BlurText — vendored from reactbits.dev/text-animations/blur-text
 *
 * Adapts to project tokens, adds a reduced-motion bypass, and renders as a
 * caller-chosen element (the original hard-coded a <p>, which is invalid
 * inside a heading).
 */
const NBSP = '\u00A0';

const fromFor = (direction) =>
  direction === 'top'
    ? { filter: 'blur(12px)', opacity: 0, y: -40 }
    : { filter: 'blur(12px)', opacity: 0, y: 40 };

const toFor = (direction) => [
  { filter: 'blur(6px)', opacity: 0.4, y: direction === 'top' ? 6 : -6 },
  { filter: 'blur(0px)', opacity: 1, y: 0 },
];

const buildKeyframes = (from, steps) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap((step) => Object.keys(step))]);
  const keyframes = {};
  keys.forEach((key) => {
    keyframes[key] = [from[key], ...steps.map((step) => step[key])];
  });
  return keyframes;
};

export const BlurText = ({
  text = '',
  as: Tag = 'span',
  className,
  delay = 45,
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  stepDuration = 0.32,
  easing = (t) => t,
  style,
  ...rest
}) => {
  const segments = useMemo(
    () => (animateBy === 'words' ? text.split(' ') : [...text]),
    [text, animateBy]
  );

  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, reduced]);

  if (reduced) {
    return (
      <Tag ref={ref} className={cn('rb-blur-text', className)} style={style} {...rest}>
        {text}
      </Tag>
    );
  }

  const keyframes = buildKeyframes(fromFor(direction), toFor(direction));
  const stepCount = toFor(direction).length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  );

  return (
    <Tag
      ref={ref}
      className={cn('rb-blur-text', className)}
      style={{ display: 'flex', flexWrap: 'wrap', ...style }}
      {...rest}
    >
      {/* The animated segments are per-word and aria-hidden; this carries the
          full string once for assistive tech. A visually hidden node is used
          rather than aria-label because BlurText also renders as <span>. */}
      <span className="sr-only">{text}</span>
      {segments.map((segment, index) => (
        <motion.span
          key={`${segment}-${index}`}
          aria-hidden="true"
          className="rb-blur-text__seg"
          initial={fromFor(direction)}
          animate={inView ? keyframes : fromFor(direction)}
          transition={{
            duration: totalDuration,
            times,
            delay: (index * delay) / 1000,
            ease: easing
          }}
        >
          {segment === ' ' ? NBSP : segment}
          {animateBy === 'words' && index < segments.length - 1 ? NBSP : ''}
        </motion.span>
      ))}
    </Tag>
  );
};

export default BlurText;
