import React from 'react';

const About = () => {
    return (
        <section className="section">
            <h2 style={{
                fontSize: 'var(--text-xl)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-6)'
            }}>
               / About
            </h2>
            <div style={{ maxWidth: '650px' }}>
                <p style={{ marginBottom: 'var(--space-4)', color: 'var(--text-secondary)' }}>
                    Third-year BTech IT student at <strong>BPIT, Delhi</strong>. I spend most of my time building full-stack web apps with the MERN stack and TypeScript. I like working with databases, APIs, and figuring out how to make things scale. Outside of code, I'm into music, design, and whatever random project catches my attention.
                </p>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Always open to interesting problems and cool people to work with.
                </p>
            </div>
        </section>
    );
};

export default About;
