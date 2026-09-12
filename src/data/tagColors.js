export const tagColors = {
  TypeScript: '#3178C6',
  React: '#61DAFB',
  'Node.js': '#339933',
  PostgreSQL: '#4169E1',
  Gemini: '#A78BFA',
  Firebase: '#FFA000',
  Leaflet: '#7CB342',
  Razorpay: '#4FC3F7',
  Web3: '#14F195',
  Blockchain: '#F7931A',
  Ticketing: '#FB7185',
  'AI Agent Commerce': '#8B5CF6',
  'API Design': '#F59E0B',
  Dashboard: '#22D3EE',
  'Multi-Agent AI': '#F472B6',
};

export const hexToRgba = (hex, alpha) => {
  const value = hex.replace('#', '');
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const fallbackPalette = [...new Set(Object.values(tagColors))];

export const getTagColor = (tag) => {
  if (tagColors[tag]) return tagColors[tag];
  let hash = 0;
  for (const char of tag) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return fallbackPalette[hash % fallbackPalette.length];
};