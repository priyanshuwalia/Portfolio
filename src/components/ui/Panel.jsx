import { cn } from '../../lib/cn';

/**
 * Panel — the shared surface. Everything clickable on this page is a Panel, so
 * hover depth, hairline weight and the top-light gradient stay consistent.
 */
export const Panel = ({
  as: Tag = 'div',
  interactive = false,
  flush = false,
  raised = false,
  sheen = false,
  corners = false,
  className,
  children,
  ...rest
}) => (
  <Tag
    className={cn(
      'panel',
      interactive && 'panel-link',
      flush && 'panel--flush',
      raised && 'panel--raised',
      sheen && 'panel-sheen',
      corners && 'corners',
      className
    )}
    {...rest}
  >
    {children}
  </Tag>
);

export default Panel;
