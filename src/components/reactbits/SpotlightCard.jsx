import { useRef } from 'react';
import { cn } from '../../lib/cn';

/**
 * SpotlightCard — vendored from reactbits.dev/components/spotlight-card
 *
 * A soft light that tracks the pointer across a surface. The original painted
 * its own border, background and padding, which fights the `.panel` language
 * used everywhere else here, so all it contributes is the light.
 */
export const SpotlightCard = ({ children, className, spotlightColor, ...rest }) => {
  const ref = useRef(null);

  const handlePointerMove = (event) => {
    const el = ref.current;
    if (!el) return;
    const { clientX, clientY } = event;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mouse-x', `${clientX - rect.left}px`);
    el.style.setProperty('--mouse-y', `${clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      className={cn('rb-spotlight', className)}
      style={spotlightColor ? { '--spotlight-color': spotlightColor } : undefined}
      {...rest}
    >
      {children}
    </div>
  );
};

export default SpotlightCard;
