import { cn } from '../../lib/cn';
import { tagChipStyle, STATUS_TONE } from '../../lib/tagColors';

export const StatusChip = ({ status, tone, className, children }) => (
  <span className={cn('chip', className)} data-tone={tone ?? STATUS_TONE[status] ?? 'neutral'}>
    {children ?? status}
  </span>
);

/** Tech tag, tinted by a deterministic per-language colour. */
export const Tag = ({ children, className, tinted = true, ...rest }) => (
  <span className={cn('tag', className)} style={tinted ? tagChipStyle(children) : undefined} {...rest}>
    {children}
  </span>
);

export const TagRow = ({ tags, className, limit }) => (
  <ul className={cn('row wrap g-2', className)}>
    {(limit ? tags.slice(0, limit) : tags).map((tag) => (
      <li key={tag}>
        <Tag>{tag}</Tag>
      </li>
    ))}
  </ul>
);
