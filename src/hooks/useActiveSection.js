import { useEffect, useState } from 'react';

/**
 * Tracks which section owns the reading line — the band across the upper-middle
 * of the viewport — so the nav highlight changes as a heading arrives.
 *
 * The intersecting set is kept as a whole rather than reading each callback's
 * entries, because IntersectionObserver only reports what *changed*: acting on a
 * single callback would leave the highlight stuck on whichever section happened
 * to leave the viewport last.
 */
export const useActiveSection = (ids, anchor = 0.4) => {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (sections.length === 0) return undefined;

    const order = new Map(sections.map((section, index) => [section.id, index]));
    const visible = new Set();

    const resolve = () => {
      // Whichever tracked section is furthest down the document and still
      // crossing the reading line owns the highlight.
      let owner = null;
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * anchor) owner = section.id;
      }
      if (owner) {
        setActiveId(owner);
        return;
      }
      // Above the first section — fall back to the earliest one in view.
      const inView = [...visible].sort((a, b) => order.get(a) - order.get(b));
      if (inView.length > 0) setActiveId(inView[0]);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        resolve();
      },
      { rootMargin: `-${Math.round(anchor * 100)}% 0px -${Math.round((1 - anchor) * 100)}% 0px` }
    );

    sections.forEach((section) => observer.observe(section));
    window.addEventListener('resize', resolve);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resolve);
    };
  }, [ids, anchor]);

  return activeId;
};
