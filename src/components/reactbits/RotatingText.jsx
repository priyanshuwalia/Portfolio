import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '../../lib/cn';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * RotatingText — vendored from reactbits.dev/text-animations/rotating-text
 *
 * Cycles a list of strings with a vertical roll. Trimmed to what this site
 * needs (auto-advance, no imperative handle) and pauses on hover/focus so the
 * text is readable when someone stops to read it.
 */
export const RotatingText = ({
  texts = [],
  interval = 2600,
  className,
  transition = { type: 'spring', damping: 24, stiffness: 260 },
  ...rest
}) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || paused || texts.length < 2) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % texts.length), interval);
    return () => clearInterval(id);
  }, [reduced, paused, texts.length, interval]);

  if (reduced || texts.length === 0) {
    return (
      <span className={cn('rb-rotate', className)} {...rest}>
        {texts[0]}
      </span>
    );
  }

  return (
    <span
      className={cn('rb-rotate', className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      {...rest}
    >
      <span className="rb-rotate-sr">{texts[index]}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          aria-hidden="true"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-110%', opacity: 0 }}
          transition={transition}
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default RotatingText;
