import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiTailwindcss,
  SiFramer,
  SiGit,
  SiGithub,
  SiDocker,
  SiRust,
  SiSolana,
  SiRedis
} from 'react-icons/si';

export const stack = [
  {
    name: 'Languages',
    summary: 'Typed by default, loose when it pays off.',
    items: [
      { name: 'TypeScript', icon: SiTypescript, level: 'core' },
      { name: 'JavaScript', icon: SiJavascript, level: 'core' },
      { name: 'Python', icon: SiPython, level: 'core' },
      { name: 'Rust', icon: SiRust, level: 'building' }
    ]
  },
  {
    name: 'Frontend',
    summary: 'Component-first, motion with intent.',
    items: [
      { name: 'React', icon: SiReact, level: 'core' },
      { name: 'Next.js', icon: SiNextdotjs, level: 'core' },
      { name: 'Tailwind', icon: SiTailwindcss, level: 'core' },
      { name: 'Motion', icon: SiFramer, level: 'core' }
    ]
  },
  {
    name: 'Backend & data',
    summary: 'Schemas first, caching second, cleverness last.',
    items: [
      { name: 'Node.js', icon: SiNodedotjs, level: 'core' },
      { name: 'Express', icon: SiExpress, level: 'core' },
      { name: 'PostgreSQL', icon: SiPostgresql, level: 'core' },
      { name: 'MongoDB', icon: SiMongodb, level: 'core' },
      { name: 'MySQL', icon: SiMysql, level: 'familiar' },
      { name: 'Redis', icon: SiRedis, level: 'familiar' }
    ]
  },
  {
    name: 'Systems & tooling',
    summary: 'Where the product actually meets the world.',
    items: [
      { name: 'Solana', icon: SiSolana, level: 'building' },
      { name: 'Docker', icon: SiDocker, level: 'familiar' },
      { name: 'Git', icon: SiGit, level: 'core' },
      { name: 'GitHub', icon: SiGithub, level: 'core' },
      { name: 'Vercel', icon: '▲', level: 'core' }
    ]
  }
];

export const levelLabel = {
  core: 'Daily driver',
  familiar: 'Comfortable',
  building: 'Actively learning'
};
