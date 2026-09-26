import { useCallback, useRef } from 'react';
import { cn } from '../../lib/cn';

/**
 * BorderGlow — vendored from reactbits.dev/components/border-glow
 *
 * A cursor-tracked conic gradient that lights the card's border. Rewritten
 * around three gradient slots (instead of seven) and CSS custom properties
 * supplied from tokens, so it stays on-palette.
 */
const hexToRgb = (hex) => {
  const value = hex.replace('#', '');
  const full = value.length === 3 ? [...value].map((c) => c + c).join('') : value;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
  return `${r} ${g} ${b}`;
};

const gradientVars = (colors) => {
  const [one = '#5ee9a8', two = '#8ab4ff', three = '#5ee9a8'] = colors;
  return {
    '--rb-grad-1': `radial-gradient(at 78% 52%, ${hexToRgb(one)} 0px, transparent 55%)`,
    '--rb-grad-2': `radial-gradient(at 22% 38%, ${hexToRgb(two)} 0px, transparent 55%)`,
    '--rb-grad-3': `radial-gradient(at 46% 88%, ${hexToRgb(three)} 0px, transparent 55%)`,
    '--rb-grad-base': `linear-gradient(${hexToRgb(one)} 0 100%)`
  };
};

export const BorderGlow = ({
  children,
  className,
  colors = ['#5ee9a8', '#8ab4ff', '#2dd4bf'],
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 0.55,
  coneSpread = 22,
  edgeSensitivity = 30,
  fillOpacity = 0.5,
  ...rest
}) => {
  const ref = useRef(null);

  const handlePointerMove = useCallback((event) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    // 0 at the centre, 1 at the corners — drives both the glow and its colour.
    const kx = x === cx ? Infinity : cx / Math.max(Math.abs(x - cx), 1);
    const ky = y === cy ? Infinity : cy / Math.max(Math.abs(y - cy), 1);
    const edge = Math.min(Math.max(Math.min(kx, ky), 0), 1);

    const radians = Math.atan2(y - cy, x - cx);
    let degrees = (radians * 180) / Math.PI + 90;
    if (degrees < 0) degrees += 360;

    el.style.setProperty('--edge-proximity', (edge * 100).toFixed(2));
    el.style.setProperty('--cursor-angle', `${degrees.toFixed(2)}deg`);
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      className={cn('rb-glow', className)}
      style={{
        '--border-radius': `${borderRadius}px`,
        '--glow-padding': `${glowRadius}px`,
        '--cone-spread': coneSpread,
        '--edge-sensitivity': edgeSensitivity,
        '--fill-opacity': fillOpacity,
        '--glow-opacity': glowIntensity,
        ...gradientVars(colors)
      }}
      {...rest}
    >
      <span className="rb-glow__edge" />
      <div className="rb-glow__inner">{children}</div>
    </div>
  );
};

export default BorderGlow;
