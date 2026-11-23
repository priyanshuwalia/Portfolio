/**
 * Build-time static shell + JSON-LD for the SPA.
 *
 * The app mounts with createRoot() (see src/main.jsx), which replaces whatever
 * is inside #root on first render. That makes it safe to ship a semantic,
 * crawler-readable HTML fragment inside #root: search engines and link-preview
 * bots read it from the raw HTML, and React swaps it for the live app on mount.
 *
 * Everything here is generated from src/data/* (the single source of truth) so
 * the shell and the structured data can never drift from the rendered site.
 * Runs in postbuild AFTER scripts/inline-css.mjs, on the built dist/index.html.
 *
 * No runtime dependencies are added; this is a plain Node ESM script.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { identity, socials, resume, availability } from '../src/data/site.js';
import { projects, experiments } from '../src/data/projects.js';
import { experience, education } from '../src/data/experience.js';
import { about } from '../src/data/about.js';
import { stack, levelLabel } from '../src/data/stack.js';
import { nowBuilding, nowReading, nowLearning } from '../src/data/now.js';

// The scoring chain targets "Software Engineer" (full-stack). "Full-Stack
// Developer" stays on as a secondary descriptor everywhere.
const TARGET_ROLE = 'Software Engineer';

const dist = path.resolve('dist');
const htmlPath = path.join(dist, 'index.html');
let html = readFileSync(htmlPath, 'utf8');

// Canonical URL lives in index.html; read it so JSON-LD/url and sameAs stay in
// sync with the deployed site instead of being hand-copied.
const canonicalMatch = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/);
const canonicalUrl = canonicalMatch ? canonicalMatch[1] : 'https://portfolio-nu-one-80.vercel.app/';

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
const esc = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const link = (href, text, extra = '') =>
  `<a href="${esc(href)}"${extra ? ` ${extra}` : ''}>${esc(text)}</a>`;

const socialById = (id) => socials.find((s) => s.id === id);
const github = socialById('github');
const linkedin = socialById('linkedin');
const twitter = socialById('twitter');
const email = socialById('email');

/* ------------------------------------------------------------------ */
/* Static shell fragment                                               */
/* ------------------------------------------------------------------ */
const flagshipTitles = ['MerchantGate', 'Formium'];

const renderProject = (project) => {
  const parts = [];
  parts.push(`<article class="ps-project">`);
  parts.push(`<h3>${esc(project.title)} <span class="ps-dim">· ${esc(project.year)} · ${esc(project.status)}</span></h3>`);
  parts.push(`<p class="ps-tagline">${esc(project.tagline)}</p>`);
  parts.push(`<p>${esc(project.description)}</p>`);

  if (project.highlights?.length) {
    parts.push('<ul class="ps-list">');
    for (const point of project.highlights) parts.push(`<li>${esc(point)}</li>`);
    parts.push('</ul>');
  }

  if (project.metrics?.length) {
    parts.push('<ul class="ps-list ps-metrics">');
    for (const metric of project.metrics) parts.push(`<li>${esc(metric)}</li>`);
    parts.push('</ul>');
  }

  const links = [];
  if (project.demo) links.push(link(project.demo, 'Live demo', 'rel="noopener"'));
  if (project.repo) links.push(link(project.repo, 'Source on GitHub', 'rel="noopener"'));
  if (links.length) parts.push(`<p class="ps-links">${links.join(' · ')}</p>`);

  parts.push('</article>');
  return parts.join('\n');
};

const renderShell = () => {
  const out = [];
  out.push('<div class="prerender-shell">');

  // Header / hero fallback — exactly one <h1> on the page.
  out.push('<header class="ps-hero" id="top">');
  out.push(`<p class="ps-eyebrow">${esc(identity.availability)}</p>`);
  out.push(`<h1>${esc(identity.name)} — ${esc(TARGET_ROLE)}</h1>`);
  out.push(`<p class="ps-secondary">${esc(identity.roles.join(' · '))}</p>`);
  out.push(`<p class="ps-lede">${esc(identity.lede)}</p>`);
  out.push(`<p class="ps-dim">Based in ${esc(identity.location)} · ${esc(identity.timezone)}</p>`);
  out.push('<nav class="ps-nav" aria-label="Sections">');
  out.push(
    ['now', 'work', 'stack', 'path', 'about', 'contact']
      .map((id) => link(`#${id}`, id[0].toUpperCase() + id.slice(1)))
      .join(' · ')
  );
  out.push('</nav>');
  out.push('</header>');

  out.push('<main>');

  // Now
  out.push('<section id="now"><h2>Now</h2>');
  for (const item of nowBuilding) {
    out.push(`<p><strong>${esc(item.title)}</strong> — ${esc(item.note)} <span class="ps-dim">${esc(item.meta)}</span></p>`);
    const links = [];
    if (item.demo) links.push(link(item.demo, 'Live demo', 'rel="noopener"'));
    if (item.repo) links.push(link(item.repo, 'Repo', 'rel="noopener"'));
    if (links.length) out.push(`<p class="ps-links">${links.join(' · ')}</p>`);
  }
  out.push('<h3>Currently reading</h3><ul class="ps-list">');
  for (const book of nowReading) {
    out.push(`<li><strong>${esc(book.title)}</strong> by ${esc(book.author)} — ${esc(book.why)}</li>`);
  }
  out.push('</ul>');
  out.push(`<p><strong>Currently learning:</strong> ${esc(nowLearning.join(', '))}.</p>`);
  out.push('</section>');

  // Work
  out.push('<section id="work"><h2>Work</h2>');
  out.push('<p>Selected projects — shipped, deployed, and still running.</p>');
  const flagships = projects.filter((p) => flagshipTitles.includes(p.title));
  const others = projects.filter((p) => !flagshipTitles.includes(p.title));
  for (const project of [...flagships, ...others]) out.push(renderProject(project));
  if (experiments.length) {
    out.push('<h3>From the lab</h3><ul class="ps-list">');
    for (const item of experiments) {
      out.push(`<li>${link(item.repo, item.title, 'rel="noopener"')} — ${esc(item.description)}</li>`);
    }
    out.push('</ul>');
  }
  out.push('</section>');

  // Stack
  out.push('<section id="stack"><h2>Stack</h2>');
  for (const group of stack) {
    out.push(`<h3>${esc(group.name)}</h3>`);
    out.push(`<p class="ps-dim">${esc(group.summary)}</p>`);
    out.push('<ul class="ps-list">');
    for (const item of group.items) {
      out.push(`<li>${esc(item.name)} <span class="ps-dim">· ${esc(levelLabel[item.level] ?? item.level)}</span></li>`);
    }
    out.push('</ul>');
  }
  out.push('</section>');

  // Path (experience + education)
  out.push('<section id="path"><h2>Path</h2>');
  for (const entry of [...experience, education]) {
    out.push(`<h3>${esc(entry.role)}</h3>`);
    out.push(
      `<p class="ps-dim">${esc(entry.company)} · ${esc(entry.type)} · ${esc(entry.period)}${entry.current ? ' · in progress' : ''}</p>`
    );
    out.push(`<p>${esc(entry.summary)}</p>`);
    out.push('<ul class="ps-list">');
    for (const point of entry.points) out.push(`<li>${esc(point)}</li>`);
    out.push('</ul>');
  }
  out.push('</section>');

  // About
  out.push('<section id="about"><h2>About</h2>');
  for (const paragraph of about.paragraphs) {
    const text = paragraph.body
      .map((chunk) => (typeof chunk === 'string' ? esc(chunk) : `<strong>${esc(chunk.text)}</strong>`))
      .join('');
    out.push(`<p>${text}</p>`);
  }
  out.push(`<blockquote>“${esc(about.quote.text)}”</blockquote>`);
  out.push(`<p>${esc(about.closing)}</p>`);
  out.push(`<p class="ps-dim"><strong>Off the clock:</strong> ${esc(about.interests.join(', '))}.</p>`);
  out.push('</section>');

  // Contact
  out.push('<section id="contact"><h2>Contact</h2>');
  out.push(`<p>${esc(availability.label)} — ${esc(availability.summary)}. ${esc(identity.availability)}.</p>`);
  out.push('<ul class="ps-list">');
  if (email) out.push(`<li>Email: ${link(email.url, email.handle)}</li>`);
  if (github) out.push(`<li>GitHub: ${link(github.url, github.handle, 'rel="noopener"')}</li>`);
  if (linkedin) out.push(`<li>LinkedIn: ${link(linkedin.url, linkedin.handle, 'rel="noopener"')}</li>`);
  if (twitter) out.push(`<li>X: ${link(twitter.url, twitter.handle, 'rel="noopener"')}</li>`);
  out.push(`<li>Résumé: ${link(resume.url, resume.label)}</li>`);
  out.push('</ul>');
  out.push('</section>');

  out.push('</main>');
  out.push('</div>');
  return out.join('\n');
};

/* ------------------------------------------------------------------ */
/* JSON-LD Person                                                      */
/* ------------------------------------------------------------------ */
const knowsAbout = [...new Set(stack.flatMap((group) => group.items.map((item) => item.name)))];

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: identity.name,
  url: canonicalUrl,
  jobTitle: TARGET_ROLE,
  description: identity.lede,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'New Delhi',
    addressCountry: 'IN',
  },
  // BPIT is affiliated with GGSIPU (see resume / src/data/experience.js).
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Bhagwan Parshuram Institute of Technology (BPIT)' },
    { '@type': 'CollegeOrUniversity', name: 'Guru Gobind Singh Indraprastha University (GGSIPU)' },
  ],
  knowsAbout,
  sameAs: [github?.url, linkedin?.url, canonicalUrl].filter(Boolean),
};

/* ------------------------------------------------------------------ */
/* Scoped styles for the no-JS fallback                                */
/* ------------------------------------------------------------------ */
/* The app CSS is already inlined by inline-css.mjs, so design tokens and the
   dark body are present. These unlayered, .prerender-shell-scoped rules only
   add readability/spacing for the static fragment; React removes the fragment
   on mount, so the live app's design is untouched. */
const shellCss = `
.prerender-shell{max-width:760px;margin:0 auto;padding:3rem 1.5rem 4rem;color:var(--ink,#f4f5f7);font-family:var(--font-sans,system-ui,sans-serif);line-height:1.65}
.prerender-shell h1{font-size:2rem;line-height:1.15;margin:0.25rem 0 0.5rem;font-weight:500}
.prerender-shell h2{font-size:1.4rem;margin:2.5rem 0 0.75rem;font-weight:500;border-top:1px solid rgba(255,255,255,0.08);padding-top:1.5rem}
.prerender-shell h3{font-size:1.05rem;margin:1.25rem 0 0.4rem;font-weight:500}
.prerender-shell p{margin:0.4rem 0}
.prerender-shell a{color:var(--accent,#5ee9a8);text-decoration:underline;text-underline-offset:2px}
.prerender-shell ul.ps-list{margin:0.4rem 0 0.8rem;padding-left:1.25rem;list-style:disc}
.prerender-shell ul.ps-list li{margin:0.2rem 0}
.prerender-shell .ps-eyebrow{color:var(--accent,#5ee9a8);text-transform:uppercase;letter-spacing:0.14em;font-size:0.7rem}
.prerender-shell .ps-secondary{color:var(--ink-muted,#a3a7b0)}
.prerender-shell .ps-lede{font-size:1.05rem}
.prerender-shell .ps-dim{color:var(--ink-dim,#828892)}
.prerender-shell .ps-tagline{font-weight:500}
.prerender-shell .ps-metrics{border-left:2px solid var(--accent,#5ee9a8);padding-left:1rem;list-style:none}
.prerender-shell .ps-links{font-size:0.9rem}
.prerender-shell blockquote{margin:1rem 0;padding-left:1rem;border-left:2px solid rgba(255,255,255,0.2);color:var(--ink-muted,#a3a7b0);font-style:italic}
.prerender-shell .ps-nav{margin-top:1rem;font-size:0.9rem}
`;

/* ------------------------------------------------------------------ */
/* Inject into dist/index.html                                         */
/* ------------------------------------------------------------------ */
const shell = renderShell();
const rootEmpty = '<div id="root"></div>';
if (!html.includes(rootEmpty)) {
  console.error('prerender-shell: expected an empty <div id="root"></div> in dist/index.html');
  process.exit(1);
}
html = html.replace(rootEmpty, `<div id="root">\n${shell}\n</div>`);

// Escape "<" so the JSON can never terminate the surrounding <script> tag.
const jsonLdText = JSON.stringify(personJsonLd, null, 2).replace(/</g, '\\u003c');
const headInjection = `<style id="prerender-shell-css">${shellCss}</style>\n<script type="application/ld+json">\n${jsonLdText}\n</script>\n`;
if (!html.includes('</head>')) {
  console.error('prerender-shell: no </head> found in dist/index.html');
  process.exit(1);
}
html = html.replace('</head>', `${headInjection}</head>`);

writeFileSync(htmlPath, html);

// Report a raw-text word count the same way the audit does (outside script/style).
const visibleText = html
  .replace(/<script[\s\S]*?<\/script>/g, ' ')
  .replace(/<style[\s\S]*?<\/style>/g, ' ')
  .replace(/<[^>]+>/g, ' ');
const wordCount = visibleText.split(/\s+/).filter(Boolean).length;
console.log(`prerender-shell: injected static shell + JSON-LD Person into dist/index.html (~${wordCount} words of raw text)`);