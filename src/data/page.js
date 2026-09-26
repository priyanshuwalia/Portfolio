import { identity, nav, resume, socials } from '../data/site';
import { projects } from '../data/projects';
import { stack } from '../data/stack';
import { experience, education } from '../data/experience';
import { nowBuilding } from '../data/now';

/**
 * Page composition is data, not JSX. Adding, removing or reordering a section
 * is a one-line change here, and the nav is derived from the same list so the
 * two can never drift apart.
 */
export const page = {
  meta: {
    title: `${identity.name} — Full-Stack Developer`,
    description: identity.lede,
    availability: identity.availability
  },
  identity,
  nav,
  socials,
  resume,
  sections: [
    { id: 'now', label: 'Now', component: 'Now', index: 1 },
    { id: 'work', label: 'Work', component: 'Work', index: 2 },
    { id: 'stack', label: 'Stack', component: 'Stack', index: 3 },
    { id: 'path', label: 'Path', component: 'Path', index: 4 },
    { id: 'about', label: 'About', component: 'About', index: 5 }
  ],
  content: { projects, stack, experience, education, nowBuilding }
};

export default page;
