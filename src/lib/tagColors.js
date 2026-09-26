// Brand hues lightened where the stock colour fell short of 4.5:1 as chip text
// on the 9%-tinted surface; the recognisable hue is kept.
export const tagColors = {
  TypeScript: '#5AA3E8',
  React: '#61DAFB',
  'Next.js': '#8AB4F8',
  'Node.js': '#57B84A',
  PostgreSQL: '#7A93F0',
  Gemini: '#A78BFA',
  Firebase: '#FFA000',
  Leaflet: '#7CB342',
  Razorpay: '#4FC3F7',
  Web3: '#14F195',
  Blockchain: '#F7931A',
  Ticketing: '#FB7185',
  'AI Agent Commerce': '#5EE9A8',
  'API Design': '#F59E0B',
  Dashboard: '#22D3EE',
  'Multi-Agent AI': '#F472B6',
  Authentication: '#7DD3FC',
  'Role-Based Access': '#C4B5FD',
};

export const hexToRgba = (hex, alpha) => {
  const value = hex.replace('#', '');
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const palette = [...new Set(Object.values(tagColors))];

/** Deterministic colour for tags that aren't explicitly mapped, so a tag
 *  never renders in an arbitrary colour between builds. */
export const getTagColor = (tag) => {
  if (tagColors[tag]) return tagColors[tag];
  let hash = 0;
  for (const char of tag) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return palette[hash % palette.length];
};

/** Project status → chip tone. Shared by projects and the "now" feed. */
export const STATUS_TONE = {
  live: 'live',
  shipping: 'live',
  shipped: 'info',
  'in-progress': 'warn',
  in_progress: 'warn',
  built: 'neutral'
};

export const tagChipStyle = (tag) => {
  const color = getTagColor(tag);
  return {
    color,
    borderColor: hexToRgba(color, 0.32),
    backgroundColor: hexToRgba(color, 0.09),
  };
};
