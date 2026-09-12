import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const htmlPath = path.join(dist, 'index.html');
const html = readFileSync(htmlPath, 'utf8');

const linkMatch = html.match(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+\.css)"[^>]*>/);

if (!linkMatch) {
  console.error('No stylesheet link found in dist/index.html');
  process.exit(1);
}

const cssPath = path.join(dist, linkMatch[1].replace(/^\//, ''));
const css = readFileSync(cssPath, 'utf8');

const inlineStyle = `<style>\n${css}\n</style>`;
const nextHtml = html.replace(linkMatch[0], inlineStyle);

writeFileSync(htmlPath, nextHtml);
rmSync(cssPath);

console.log(`Inlined ${linkMatch[1]} (${css.length} bytes) into index.html`);