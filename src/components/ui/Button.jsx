import { cn } from '../../lib/cn';

const isExternal = (href) => /^https?:/i.test(href);

/**
 * Button — one primitive for every call to action.
 *
 * Buttons sit at a fixed position in the layout. They deliberately do not track
 * the pointer: a call to action that drifts under the cursor costs accuracy
 * without adding anything, and the hover lift is enough feedback.
 */
export const Button = ({
  as,
  href,
  variant = 'default',
  icon: Icon,
  iconPosition = 'right',
  className,
  children,
  ...rest
}) => {
  const Tag = as ?? (href ? 'a' : 'button');
  const classes = cn('btn', variant !== 'default' && `btn--${variant}`, className);

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon size={15} aria-hidden="true" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon size={15} aria-hidden="true" />}
    </>
  );

  return (
    <Tag
      className={classes}
      href={href}
      target={isExternal(href) ? '_blank' : undefined}
      rel={isExternal(href) ? 'noopener noreferrer' : undefined}
      {...rest}
    >
      {content}
    </Tag>
  );
};

export default Button;
