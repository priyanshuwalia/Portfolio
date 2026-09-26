import { useEffect, useRef, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { availability } from '../../data/site';
import { useHasFinePointer } from '../../hooks/useMediaQuery';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * AvailabilityPill — a site-wide "currently taking work" indicator.
 *
 * It stays docked to the viewport so the signal survives any amount of
 * scrolling, and expands to list what is actually on the table. The panel
 * opens on hover for pointer users and on click everywhere, so it is reachable
 * by keyboard and on touch without a hover-only affordance.
 */
export const AvailabilityPill = () => {
  const [open, setOpen] = useState(false);
  // A click pins the panel open; hover only borrows it.
  const [pinned, setPinned] = useState(false);
  const finePointer = useHasFinePointer();
  const reduced = usePrefersReducedMotion();
  const triggerRef = useRef(null);
  const rootRef = useRef(null);
  // A single instance lives on the page, so a fixed id keeps the
  // trigger→panel relationship readable in the DOM.
  const panelId = 'avail-panel';

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        setPinned(false);
        triggerRef.current?.focus();
      }
    };

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
        setPinned(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    setPinned(next);
  };

  return (
    <div
      ref={rootRef}
      className="avail"
      data-open={open}
      onPointerEnter={finePointer && !pinned ? () => setOpen(true) : undefined}
      onPointerLeave={finePointer && !pinned ? () => setOpen(false) : undefined}
    >
      <button
        ref={triggerRef}
        type="button"
        className="avail__trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
      >
        <span className="pulse-dot" aria-hidden="true" />
        <span className="avail__label mono">{availability.label}</span>
        {open ? (
          <Minus size={14} aria-hidden="true" className="avail__icon" />
        ) : (
          <Plus size={14} aria-hidden="true" className="avail__icon" />
        )}
        <span className="sr-only">
          {open ? ' — hide the kinds of work available' : ' — show the kinds of work available'}
        </span>
      </button>

      <div
        id={panelId}
        className="avail__panel"
        data-shown={open}
        // Kept in the DOM so the expand/collapse can transition, but inert and
        // unfocusable while collapsed so it is not a hidden tab trap.
        inert={!open}
        hidden={!open && reduced}
      >
        <p className="avail__summary">{availability.summary}</p>
        <ul className="avail__list">
          {availability.categories.map((category) => (
            <li key={category.id} className="avail__item">
              <span className="avail__item-label">{category.label}</span>
              <span className="avail__item-detail">{category.detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AvailabilityPill;
