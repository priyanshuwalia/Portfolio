import {
    SiReact, SiTypescript, SiJavascript, SiPython, SiNextdotjs,
    SiNodedotjs, SiExpress, SiMongodb, SiMysql, SiPostgresql,
    SiTailwindcss, SiFramer, SiGit, SiGithub, SiDocker
} from 'react-icons/si';

const techCategories = [
    {
        name: "Languages",
        items: [
            { name: "JavaScript", icon: <SiJavascript /> },
            { name: "TypeScript", icon: <SiTypescript /> },
            { name: "Python", icon: <SiPython /> }
        ]
    },
    {
        name: "Frontend",
        items: [
            { name: "React.js", icon: <SiReact /> },
            { name: "Next.js", icon: <SiNextdotjs /> },
            { name: "HTML5", icon: <span style={{ fontWeight: 'bold' }}>H5</span> }, /* Icon placeholder or use SiHtml5 if available */
            { name: "CSS3", icon: <span style={{ fontWeight: 'bold' }}>CSS</span> }, /* Icon placeholder or use SiCss3 if available */
            { name: "TailwindCSS", icon: <SiTailwindcss /> },
            { name: "Framer Motion", icon: <SiFramer /> }
        ]
    },
    {
        name: "Backend & DB",
        items: [
            { name: "Node.js", icon: <SiNodedotjs /> },
            { name: "Express.js", icon: <SiExpress /> },
            { name: "MongoDB", icon: <SiMongodb /> },
            { name: "MySQL", icon: <SiMysql /> },
            { name: "PostgreSQL", icon: <SiPostgresql /> }
        ]
    },
    {
        name: "Tools & Platforms",
        items: [
            { name: "Git", icon: <SiGit /> },
            { name: "GitHub", icon: <SiGithub /> },
            { name: "Docker", icon: <SiDocker /> },
            { name: "Vercel", icon: <span style={{ fontWeight: 'bold' }}>▲</span> } /* SiVercel might be available but safe fallback */
        ]
    }
];

const TechStack = () => {
    return (
        <section id="stack" className="section">
            <h2 style={{
                fontSize: 'var(--text-xl)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-6)'
            }}>
            / Tech Stack
            </h2>

            <div className="grid grid-cols-1" style={{ gap: 'var(--space-8)' }}>
                {techCategories.map((category) => (
                    <div key={category.name}>
                        <h3 style={{
                            fontSize: 'var(--text-base)',
                            fontWeight: '500',
                            color: 'var(--text-primary)',
                            marginBottom: 'var(--space-4)'
                        }}>
                            {category.name}
                        </h3>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                            gap: 'var(--space-3)'
                        }}>
                            {category.items.map(item => (
                                <div key={item.name} className="tech-card">
                                    <div className="tech-icon" style={{ fontSize: '1.5rem', marginBottom: 'var(--space-2)' }}>
                                        {item.icon}
                                    </div>
                                    <span style={{ fontSize: '0.8rem' }}>{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TechStack;
