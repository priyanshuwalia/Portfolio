import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/cn';
import { identity, nav, socials, resume } from '../../data/site';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useScrollTo } from '../../hooks/useScrollTo';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { brandIcons, Button, IconLink } from '../ui';

const SECTION_IDS = nav.map((item) => item.id);

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);
  const toggleRef = useRef(null);
  const activeId = useActiveSection(SECTION_IDS);
  const reduced = usePrefersReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 900px)');
  useScrollTo(reduced);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Derived rather than synced: on desktop the sheet is unreachable anyway,
  // so there's no effect to keep `open` in step with a media query.
  const sheetOpen = open && !isDesktop;

  // Escape closes the sheet and hands focus back to the control that opened it.
  useEffect(() => {
    if (!sheetOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [sheetOpen]);

  return (
    <header className={cn('nav', lifted && 'nav--lifted')} data-open={sheetOpen}>
      <div className="nav__inner shell">
        <a href="#top" className="nav__brand" aria-label={`${identity.name} — back to top`}>
          {identity.name}
        </a>

        <nav className="nav__links" aria-label="Sections">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="nav__link mono"
              aria-current={activeId === item.id ? 'true' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <span className="nav__availability">
            <span className="pulse-dot" aria-hidden="true" />
            <span className="mono">Available</span>
          </span>
          <Button href={resume.url} download={resume.filename} className="nav__cta">
            Résumé
          </Button>
          <button
            ref={toggleRef}
            type="button"
            className="nav__toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="nav-sheet"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div className="nav__sheet" id="nav-sheet" hidden={!sheetOpen}>
        <nav aria-label="Sections, mobile">
          {nav.map((item, index) => (
            <a key={item.id} href={`#${item.id}`} className="nav__sheet-link" onClick={() => setOpen(false)}>
              <span className="mono dim">{String(index + 1).padStart(2, '0')}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="nav__sheet-foot">
          {socials
            .filter((social) => social.id !== 'email')
            .map((social) => {
              const Icon = brandIcons[social.id];
              return <IconLink key={social.id} href={social.url} label={social.label} icon={<Icon size={16} />} />;
            })}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
