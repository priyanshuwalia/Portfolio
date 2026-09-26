import { useEffect, useRef, useState } from 'react';
import { experience, education } from '../data/experience';
import { Section, SectionHead, Reveal } from '../components/ui';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const entries = [...experience, education];

const Entry = ({ entry, index }) => (
  <Reveal as="li" index={index} className="path__entry">
    <div className="path__rail" aria-hidden="true">
      <span className="path__dot" />
    </div>
    <div className="path__body">
      <div className="path__head">
        <div>
          <h3 className="path__role">{entry.role}</h3>
          <p className="path__company">
            {entry.company}
            <span className="path__type dim"> · {entry.type}</span>
            {entry.current && <span className="path__current"> · in progress</span>}
          </p>
        </div>
        <span className="path__period mono dim">{entry.period}</span>
      </div>
      <p className="path__summary">{entry.summary}</p>
      <ul className="path__points">
        {entry.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </div>
  </Reveal>
);

/**
 * The rail fills as the timeline scrolls past. Driven by a scroll listener
 * rather than a scroll-linked animation library, and skipped entirely when the
 * visitor has asked for reduced motion.
 */
const useRailProgress = (ref, reduced) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const anchor = window.innerHeight * 0.6;
      const ratio = (anchor - rect.top) / rect.height;
      setProgress(Math.min(Math.max(ratio, 0), 1));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ref, reduced]);

  return progress;
};

export const Path = ({ section }) => {
  const listRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const progress = useRailProgress(listRef, reduced);

  return (
    <Section id={section.id} aria-labelledby="path-heading">
      <SectionHead
        index={section.index}
        label={section.label}
        title="Experience & education"
        lede="Where the time went, and what it turned into. Short, because most of the work happened in the repos."
      />

      <div className="path__wrap">
        <div
          className="path__track"
          style={{ '--rail-progress': reduced ? 1 : progress }}
          aria-hidden="true"
        />
        <ol className="path__list" ref={listRef}>
          {entries.map((entry, index) => (
            <Entry key={entry.role} entry={entry} index={index} />
          ))}
        </ol>
      </div>
    </Section>
  );
};

export default Path;
