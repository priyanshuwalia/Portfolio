import { useId } from 'react';
import { cn } from '../../lib/cn';
import { SectionIdContext } from './sectionContext';

/**
 * Section — the page's vertical unit. Owns the id that navigation and
 * deep links target, and keeps the `rule-top` divider decision in one place.
 */
export const Section = ({ id, children, className, divided = true, labelled = true, ...rest }) => {
  const fallbackId = useId();
  const headingId = id ? `${id}-heading` : `${fallbackId}-heading`;

  return (
    <SectionIdContext.Provider value={headingId}>
      <section
        id={id}
        className={cn('section', className)}
        aria-labelledby={labelled ? headingId : undefined}
        {...rest}
      >
        <div className="shell">
          {divided && <hr className="hairline section-rule" />}
          {children}
        </div>
      </section>
    </SectionIdContext.Provider>
  );
};

export default Section;
