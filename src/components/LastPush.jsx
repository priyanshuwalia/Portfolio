import React, { useEffect, useState } from 'react';

const FALLBACK = 'updated Sep 2026';

const formatAge = (dateStr) => {
  const pushed = new Date(dateStr).getTime();
  if (Number.isNaN(pushed)) return FALLBACK;
  const days = Math.floor((Date.now() - pushed) / 86400000);
  if (days < 0) return 'active right now';
  if (days === 0) return 'active today';
  if (days === 1) return 'pushed a commit yesterday';
  return `last push ${days} days ago`;
};

const LastPush = () => {
  const [label, setLabel] = useState(FALLBACK);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const fetchLatestPush = async () => {
      const response = await fetch(
        'https://api.github.com/users/priyanshuwalia/repos?per_page=100',
        { signal: controller.signal }
      );
      if (!response.ok) return;
      const repos = await response.json();
      const latest = repos.reduce(
        (max, repo) => (repo.pushed_at > max ? repo.pushed_at : max),
        ''
      );
      if (latest) setLabel(formatAge(latest));
    };

    fetchLatestPush().catch(() => {});
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  return <span className="updated-note">{label}</span>;
};

export default LastPush;