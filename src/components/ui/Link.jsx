import { ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/cn';

const isExternal = (href) => /^https?:/i.test(href);

/** ArrowLink — the workhorse link for outbound references. */
export const ArrowLink = ({ href, children, className, icon: Icon = ArrowUpRight, ...rest }) => {
  const external = isExternal(href);

  return (
    <a
      href={href}
      className={cn('arrow-link', className)}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      {...rest}
    >
      {Icon && <Icon size={13} aria-hidden="true" />}
      <span>{children}</span>
    </a>
  );
};

/** IconLink — square, icon-only, always labelled for assistive tech. */
export const IconLink = ({ href, label, icon, className, ...rest }) => {
  const external = isExternal(href);

  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      className={cn('icon-link', className)}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      {...rest}
    >
      {icon}
    </a>
  );
};

export default ArrowLink;
