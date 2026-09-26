import { useEffect } from 'react';

const NBSP = '\u00A0';
const WORD = /[A-Za-z0-9][\w'’+-]*/g;

/**
 * Text we must not measure or rewrite.
 * - `.rb-rotate` swaps its own content on a timer and clips with
 *   `overflow: hidden`, so a character edit there would fight the animation.
 * - `.rb-blur-text` already joins its per-word segments with a non-breaking
 *   space and animates each one; it owns its own spacing.
 * - Form controls and preformatted text have their own line semantics.
 */
const SKIP =
  '.rb-rotate, .rb-rotate-sr, .rb-blur-text, input, textarea, select, pre, code, kbd, samp, [data-orphan-guard="off"]';

const isSkipped = (el) =>
  !el ||
  el.closest(SKIP) !== null ||
  el.getAttribute('aria-hidden') === 'true';

/** Nearest ancestor that establishes the line boxes for this text node. */
const lineBoxOwner = (node) => {
  let el = node.parentElement;
  while (el && el !== document.body) {
    const display = getComputedStyle(el).display;
    if (
      display === 'block' ||
      display === 'flex' ||
      display === 'grid' ||
      display === 'inline-block' ||
      display === 'list-item' ||
      display === 'table-cell'
    ) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
};

/**
 * Words on each visual line, keyed by rounded `top`. A word with no visible
 * rect is inside a collapsed/hidden subtree and is ignored.
 */
const linesOf = (owner) => {
  const lines = new Map();
  const walker = document.createTreeWalker(owner, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  for (const node of nodes) {
    const text = node.nodeValue;
    WORD.lastIndex = 0;
    let match;
    while ((match = WORD.exec(text)) !== null) {
      const range = document.createRange();
      range.setStart(node, match.index);
      range.setEnd(node, match.index + match[0].length);
      const rects = range.getClientRects();
      const rect = rects[rects.length - 1];
      if (!rect || rect.width === 0 || rect.height === 0) continue;
      const key = Math.round(rect.top * 2) / 2;
      if (!lines.has(key)) lines.set(key, []);
      lines.get(key).push({ word: match[0], node, start: match.index });
      range.detach();
    }
  }
  return [...lines.entries()].sort((a, b) => a[0] - b[0]).map(([, words]) => words);
};

/**
 * The single whitespace character immediately before `entry`, when it sits
 * inside one text node. Returns a setter, or null if the gap is not a lone
 * character we can swap without rewriting a whole text node.
 */
const spaceBefore = ({ node, start }) => {
  if (start > 0) {
    const i = start - 1;
    if (/\s/.test(node.nodeValue[i])) {
      return (to) => {
        node.nodeValue = node.nodeValue.slice(0, i) + to + node.nodeValue.slice(i + 1);
      };
    }
    return null;
  }
  const prev = node.previousSibling;
  if (prev && prev.nodeType === Node.TEXT_NODE && /\s$/.test(prev.nodeValue)) {
    const i = prev.nodeValue.length - 1;
    return (to) => {
      prev.nodeValue = prev.nodeValue.slice(0, i) + to + prev.nodeValue.slice(i + 1);
    };
  }
  return null;
};

/**
 * useOrphanGuard — typographic orphan control.
 *
 * `text-wrap: pretty` shortens the last line where it can, but it still leaves
 * single words stranded in enough cases (narrow measures, inline-block parents,
 * the `li` bullets) that it can't be trusted on its own. This pass finds any
 * block whose final line holds exactly one word and binds that word to the one
 * before it with a non-breaking space, so the two travel to the next line
 * together.
 *
 * Two rules keep it honest:
 *  1. Every binding is reverted at the start of a pass, so passes compose and
 *     never compound.
 *  2. A binding that would push the block into horizontal overflow is reverted
 *     individually — binding is only allowed where the result still fits.
 *
 * Runs on mount, on font load, on resize, and on DOM mutation (debounced).
 */
export const useOrphanGuard = () => {
  useEffect(() => {
    if (typeof document === 'undefined') return undefined;

    let applied = [];
    let frame = 0;

    const pass = () => {
      // Undo last time so repeated passes are idempotent.
      for (const revert of applied) revert(' ');
      applied = [];

      const owners = new Set();
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (!node.nodeValue.trim()) continue;
        if (isSkipped(node.parentElement)) continue;
        const owner = lineBoxOwner(node);
        if (owner) owners.add(owner);
      }

      for (const owner of owners) {
        const lines = linesOf(owner);
        if (lines.length < 2) continue;
        const last = lines[lines.length - 1];
        if (last.length !== 1) continue;

        const setSpace = spaceBefore(last[0]);
        if (!setSpace) continue;

        setSpace(NBSP);
        // Does the pair still fit on one line, or did binding overflow?
        if (owner.scrollWidth > owner.clientWidth + 1) {
          setSpace(' ');
          continue;
        }
        applied.push(setSpace);
      }
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        pass();
        // Drop the mutations our own edits produced.
        if (mutations) mutations.takeRecords();
      });
    };

    const mutations = new MutationObserver(schedule);
    const ro = new ResizeObserver(schedule);
    let resizeTimer = 0;

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(schedule, 150);
    };
    const onInteract = () => schedule();

    ro.observe(document.body);
    mutations.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });
    window.addEventListener('resize', onResize);
    document.addEventListener('click', onInteract, true);
    document.addEventListener('focusin', onInteract, true);
    if (document.fonts?.ready) document.fonts.ready.then(schedule).catch(() => {});

    schedule();

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(resizeTimer);
      ro.disconnect();
      mutations.disconnect();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('click', onInteract, true);
      document.removeEventListener('focusin', onInteract, true);
      for (const revert of applied) revert(' ');
    };
  }, []);
};

export default useOrphanGuard;
