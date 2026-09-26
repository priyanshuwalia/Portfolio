import { cn } from '../../lib/cn';
import { useInView } from '../../hooks/useInView';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * Reveal — the single scroll-in animation used across the page.
 *
 * Offsets are staggered by `index` so a group of siblings arrives as a wave
 * rather than all at once. Reduced-motion users get the content immediately.
 */
export const Reveal = ({
  as: Tag = 'div',
  children,
  className,
  index = 0,
  y = 18,
  duration = 0.62,
  once = true,
  ...rest
}) => {
  const [ref, inView] = useInView({ once });
  const reduced = usePrefersReducedMotion();
  const shown = reduced || inView;

  return (
    <Tag
      ref={ref}
      className={cn('reveal', className)}
      style={{
        '--reveal-y': `${y}px`,
        '--reveal-delay': `${Math.min(index * 70, 420)}ms`,
        '--reveal-duration': `${duration}s`
      }}
      data-shown={shown ? 'true' : 'false'}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
