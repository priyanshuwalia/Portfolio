import React from 'react';

const cells = [
  {
    label: 'Focus',
    value: 'AI-agent commerce & DeFi tooling',
  },
  {
    label: 'Learning',
    value: 'Rust · Solana · Systems',
  },
  {
    label: 'Seeking',
    value: 'Full-Stack & Web3 roles',
  },
];

const StatusStrip = () => {
  return (
    <div className="status-strip" aria-label="Quick overview">
      {cells.map((cell) => (
        <div key={cell.label} className="status-cell">
          <div className="status-cell-label">{cell.label}</div>
          <div className="status-cell-value">{cell.value}</div>
        </div>
      ))}
    </div>
  );
};

export default StatusStrip;