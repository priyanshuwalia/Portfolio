export const identity = {
  name: 'Priyanshu Walia',
  firstName: 'Priyanshu',
  roles: ['Full-Stack Developer', 'AI-Agent Systems', 'Interface Design'],
  location: 'New Delhi, India',
  timezone: 'IST · UTC+5:30',
  // U+2011 (non-breaking hyphen) in "AI-engineering": a plain hyphen is a legal
  // break opportunity, so below ~480px the line broke after "AI-" and stranded
  // "engineering roles" alone. This keeps the compound whole so the sentence
  // falls as "Open to full-stack &" / "AI-engineering roles". Do not
  // "normalise" it back to U+002D.
  availability: 'Open to full-stack & AI‑engineering roles',
  lede: 'I build full-stack products and the agent infrastructure behind them — payments rails, APIs, and the interfaces that make systems legible. Currently turning a merchant API into an on-ramp for AI buyers.',
  statusLine: 'Building in public',
};

/**
 * The kinds of work currently on the table. Rendered by the site-wide
 * AvailabilityPill, so the categories are the single source of truth for both
 * the floating indicator and the contact section.
 */
export const availability = {
  label: 'Available for work',
  summary: 'Taking on new work from this quarter',
  categories: [
    {
      id: 'full-stack',
      label: 'Full-Stack roles',
      detail: 'Product engineering positions — APIs, front ends, and the systems between them.'
    },
    {
      id: 'ai-agents',
      label: 'AI-Agent Systems',
      detail: 'Agent infrastructure, tool-calling, evals, and multi-agent orchestration.'
    },
    {
      id: 'open-source',
      label: 'Open Source',
      detail: 'Collaborating on, or taking maintainership of, projects I actually use.'
    },
    {
      id: 'web3-payments',
      label: 'Web3 / Payments consulting',
      detail: 'Advisory scoped to payment rails, wallets, custody, and agentic commerce.'
    }
  ]
};

export const nav = [
  { label: 'Now', id: 'now' },
  { label: 'Work', id: 'work' },
  { label: 'Stack', id: 'stack' },
  { label: 'Path', id: 'path' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
];

export const socials = [
  { id: 'github', label: 'GitHub', handle: 'priyanshuwalia', url: 'https://github.com/priyanshuwalia' },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'priyanshu-walia',
    url: 'https://www.linkedin.com/in/priyanshu-walia/'
  },
  { id: 'twitter', label: 'X', handle: '@Priyanshuwalia4', url: 'https://x.com/Priyanshuwalia4' },
  {
    id: 'email',
    label: 'Email',
    handle: 'waliapriyanshu07@gmail.com',
    url: 'mailto:waliapriyanshu07@gmail.com'
  }
];

export const resume = {
  label: 'Résumé',
  url: '/Priyanshu_Walia_CV.pdf',
  filename: 'Priyanshu_Walia_CV.pdf'
};

export const githubUser = 'priyanshuwalia';
