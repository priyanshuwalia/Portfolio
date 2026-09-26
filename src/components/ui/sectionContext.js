import { createContext, useContext } from 'react';

/**
 * Lets SectionHead name its heading after the section it lives in, so
 * `aria-labelledby` on the section always resolves to a real element id.
 */
export const SectionIdContext = createContext(null);

export const useSectionId = () => useContext(SectionIdContext);
