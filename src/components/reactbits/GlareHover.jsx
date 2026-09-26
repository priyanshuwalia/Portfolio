import { cn } from '../../lib/cn';

/**
 * GlareHover — vendored from reactbits.dev/animations/glare-hover
 *
 * A specular sweep across a surface on hover. The original sizes itself with
 * fixed width/height props; this version stretches to its parent and takes its
 * proportions from CSS instead.
 */
export const GlareHover = ({
  children,
  className,
  glareColor = '#ffffff',
  glareOpacity = 0.12,
  glareAngle = -45,
  glareSize = 250,
  duration = 700,
  ...rest
}) => {
  const hex = glareColor.replace('#', '');
  const full = hex.length === 3 ? [...hex].map((c) => c + c).join('') : hex;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));

  return (
    <div
      className={cn('rb-glare', className)}
      style={{
        '--gh-angle': `${glareAngle}deg`,
        '--gh-size': `${glareSize}%`,
        '--gh-duration': `${duration}ms`,
        '--gh-rgba': `rgba(${r}, ${g}, ${b}, ${glareOpacity})`
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default GlareHover;
