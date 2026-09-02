import React from 'react';

const experiences = [
    {
        role: 'Tech Team Member',
        company: 'NAMESPACE Community',
        period: 'Aug 2024 – Sep 2025',
        description: [
            'Supported technical operations for Web3-focused hackathons and developer events.',
            'Assisted participants with debugging smart contracts, dApps, and frontend integrations.',
            'Collaborated with cross-functional teams to ensure smooth execution of workshops and events.',
            'Gained exposure to blockchain development workflows and developer tooling.'
        ]
    }
];

const Experience = () => {
    return (
        <section id="experience" className="section">
            <h2 style={{
                fontSize: 'var(--text-xl)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-6)'
            }}>
              / Experience
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
                {experiences.map((exp, index) => (
                    <div key={index} className="experience-card">
                        <header style={{ marginBottom: 'var(--space-2)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                                <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: '500', color: 'var(--text-primary)' }}>
                                    {exp.role}
                                </h3>
                                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>
                                    {exp.period}
                                </span>
                            </div>
                            <div style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)' }}>
                                {exp.company}
                            </div>
                        </header>
                        <ul style={{
                            listStyle: 'disc',
                            paddingLeft: 'var(--space-4)',
                            color: 'var(--text-secondary)',
                            fontSize: 'var(--text-base)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--space-1)'
                        }}>
                            {exp.description.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
