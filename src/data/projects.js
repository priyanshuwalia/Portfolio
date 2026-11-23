export const projects = [
  {
    title: 'MerchantGate',
    status: 'shipped',
    year: '2026',
    featured: true,
    tagline: 'The merchant platform built for AI buyers.',
    description:
      'A standards-compliant agent commerce API — discovery, verification, checkout, payment — plus a full management dashboard, so AI buying agents can transact on a merchant’s behalf while the merchant keeps control and an audit trail.',
    highlights: [
      'Discovery → verification → checkout → settlement, as one signed flow',
      'Merchant dashboard with per-agent spend limits and a replayable audit log',
      'Payments running on Razorpay test rails, webhook-verified'
    ],
    tags: ['AI Agent Commerce', 'API Design', 'Razorpay', 'Dashboard'],
    // Defensible, verified facts (resume + repo). These are concrete specs, not
    // invented outcomes. Rendered in the Work section and the static shell.
    metrics: [
      'Rolling 30-day budgets per agent',
      'SHA-256 hash-chained, append-only audit trail',
      'Razorpay test-mode payments, webhook-verified',
      '.well-known/agent-commerce.json agent discovery'
    ],
    // TODO(metrics): no verified quantitative outcome yet — ask Priyanshu for the
    // real numbers before publishing any. Candidates: transactions settled /
    // active buying agents, checkout latency (p50/p95), uptime. Do NOT guess.
    demo: 'https://merchantgate.vercel.app/',
    repo: 'https://github.com/priyanshuwalia/merchantgate',
    // 1920x1080 capture, so the frame keeps the CSS default 16/9 and needs no
    // explicit media size — same as the Formium capture below.
    video: '/Merchangate.mp4'
  },
  {
    title: 'Formium',
    status: 'shipped',
    year: '2025',
    tagline: 'A full-stack form builder that just works.',
    description:
      'Form builder with secure authentication, role-based access control and real-time preview. Designed the REST API end to end and shipped it on Vercel.',
    highlights: [
      'End-to-end REST API design: schemas, validation, error contracts',
      'RBAC down to individual field visibility',
      'Live preview that mirrors the published form exactly'
    ],
    tags: ['TypeScript', 'React', 'Node.js', 'PostgreSQL'],
    // Defensible, verified facts (resume + repo). Rendered in Work + static shell.
    metrics: [
      'RBAC down to individual field visibility',
      'Live preview mirrors the published form exactly',
      'Google Sheets + Slack response exports and notifications',
      'Modular backend architecture: API / service / data-access layers'
    ],
    // TODO(metrics): no verified quantitative outcome yet — ask Priyanshu for the
    // real numbers before publishing any. Candidates: forms created, responses
    // collected, active users, time saved vs. manual setup. Do NOT guess.
    demo: 'https://form-buddy-v68o.vercel.app/',
    repo: 'https://github.com/priyanshuwalia/FormBuddy',
    video: '/Formium.mp4'
  },
  {
    title: 'CivicMind',
    status: 'shipped',
    year: '2025',
    tagline: 'Agentic municipal infrastructure management.',
    description:
      'Citizen reports are plain language; CivicMind is six agents deep. A Gemini orchestrator classifies, verifies, impact-assesses, prioritizes, cost-estimates and predicts failures — with Leaflet/OSM mapping and pin-and-describe reporting.',
    highlights: [
      'Six-agent Gemini orchestrator: classify → verify → assess → prioritise → cost → predict',
      'Failure prediction so crews are dispatched before a collapse, not after',
      'Zero-friction citizen reporting: drop a pin, describe it, done'
    ],
    tags: ['Multi-Agent AI', 'React', 'Node.js', 'Leaflet', 'Firebase'],
    repo: 'https://github.com/priyanshuwalia/civicmind'
  },
  {
    title: 'EventX',
    status: 'built',
    year: '2024',
    tagline: 'On-chain ticketing with a secondary market that can’t be gamed.',
    description:
      'Event ticketing where ownership is verifiable and reselling is secure, so tickets cannot be duplicated or silently scalped.',
    highlights: [
      'Verifiable on-chain ownership of each ticket',
      'Secondary market with enforced price and transfer rules'
    ],
    tags: ['Web3', 'Blockchain', 'Ticketing'],
    repo: 'https://github.com/priyanshuwalia/EventX'
  }
];

export const experiments = [
  {
    title: 'FolderSketch',
    description: 'Generate folder structures straight from a text outline.',
    repo: 'https://github.com/priyanshuwalia/FolderSketch'
  },
  {
    title: 'Vocabtion',
    description: 'Anki-style vocabulary manager with built-in quizzes.',
    repo: 'https://github.com/priyanshuwalia/Vocabtion'
  }
];
