import { cn } from '../../lib/cn';
import { pad2 } from '../../lib/format';
import { BlurText } from '../reactbits';
import { useSectionId } from './sectionContext';

/**
 * SectionHead — numbered section marker. The index is part of the design
 * language (it makes the page feel like a document), so it lives in the
 * primitive rather than being retyped in every section.
 */
export const SectionHead = ({ index, label, title, lede, aside, className, children }) => {
  const headingId = useSectionId();

  return (
    <header className={cn('section-head', className)}>
      <div className="stack g-3" style={{ maxWidth: 'var(--measure)' }}>
        <div className="section-index">
          {index != null && <span className="section-index__num">{pad2(index)}</span>}
          <span className="section-index__label">/ {label}</span>
        </div>
        {title && (
          <BlurText
            as="h2"
            id={headingId}
            text={title}
            className="h2"
            delay={28}
            animateBy="words"
          />
        )}
        {lede && <p className="lede">{lede}</p>}
      </div>
      {aside && <div className="section-head__aside">{aside}</div>}
      {children}
    </header>
  );
};

export default SectionHead;
