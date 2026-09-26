import page from './data/page';
import { AvailabilityPill, Navbar, Backdrop, Footer } from './components/layout';
import { useOrphanGuard } from './hooks/useOrphanGuard';
import { Hero } from './sections/Hero';
import { Now } from './sections/Now';
import { Work } from './sections/Work';
import { Stack } from './sections/Stack';
import { Path } from './sections/Path';
import { About } from './sections/About';
import { Contact } from './sections/Contact';

/**
 * Section order, numbering and nav labels all come from data/page.js — this
 * file only decides which component renders which entry.
 */
const registry = { Now, Work, Stack, Path, About };

const App = () => {
  // Site-wide typographic orphan control, applied after layout settles.
  useOrphanGuard();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Backdrop />
      <Navbar />
      <AvailabilityPill />

      <main id="main">
        <Hero />
        {page.sections.map((section) => {
          const SectionComponent = registry[section.component];
          return SectionComponent ? <SectionComponent key={section.id} section={section} /> : null;
        })}
        <Contact />
      </main>

      <Footer />
    </>
  );
};

export default App;
