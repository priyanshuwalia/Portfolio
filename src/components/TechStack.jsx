import {
    SiReact, SiTypescript, SiJavascript, SiPython, SiNextdotjs,
    SiNodedotjs, SiExpress, SiMongodb, SiMysql, SiPostgresql,
    SiTailwindcss, SiFramer, SiGit, SiGithub, SiDocker
} from 'react-icons/si';

const techCategories = [
    {
        name: "Languages",
        items: [
            { name: "JavaScript", icon: <SiJavascript />, depth: "core" },
            { name: "TypeScript", icon: <SiTypescript />, depth: "core" },
            { name: "Python", icon: <SiPython />, depth: "core" }
        ]
    },
    {
        name: "Frontend",
        items: [
            { name: "React.js", icon: <SiReact />, depth: "core" },
            { name: "Next.js", icon: <SiNextdotjs />, depth: "core" },
            { name: "TailwindCSS", icon: <SiTailwindcss />, depth: "core" },
            { name: "Framer Motion", icon: <SiFramer />, depth: "exploring" }
        ]
    },
    {
        name: "Backend & DB",
        items: [
            { name: "Node.js", icon: <SiNodedotjs />, depth: "core" },
            { name: "Express.js", icon: <SiExpress />, depth: "core" },
            { name: "MongoDB", icon: <SiMongodb />, depth: "core" },
            { name: "MySQL", icon: <SiMysql />, depth: "exploring" },
            { name: "PostgreSQL", icon: <SiPostgresql />, depth: "exploring" }
        ]
    },
    {
        name: "Tools & Platforms",
        items: [
            { name: "Git", icon: <SiGit />, depth: "core" },
            { name: "GitHub", icon: <SiGithub />, depth: "core" },
            { name: "Docker", icon: <SiDocker />, depth: "exploring" },
            { name: "Vercel", icon: <span style={{ fontWeight: 'bold' }}>▲</span>, depth: "core" }
        ]
    }
];

const TechStack = () => {
    return (
        <section id="stack" className="section">
            <h2 className="section-heading">/ Tech Stack</h2>

            <div className="grid grid-cols-1" style={{ gap: 'var(--space-8)' }}>
                {techCategories.map((category) => (
                    <div key={category.name}>
                        <h3 className="subsection-heading">{category.name}</h3>
                        <div className="tech-grid">
                            {category.items.map(item => (
                                <div key={item.name} className="tech-card">
                                    <div className="tech-icon" style={{ fontSize: '1.5rem', marginBottom: 'var(--space-2)' }}>
                                        {item.icon}
                                    </div>
                                    <span className="tech-name">{item.name}</span>
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