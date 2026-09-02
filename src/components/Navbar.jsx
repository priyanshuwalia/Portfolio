import React from 'react';

const Navbar = () => {
    const scrollToSection = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="navbar">
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
                <a
                    href="#hero"
                    onClick={(e) => scrollToSection(e, 'hero')}
                    style={{ fontWeight: '600', fontSize: 'var(--text-lg)', color: 'var(--text-primary)' }}
                >
                    Priyanshu Walia
                </a>

                <ul style={{ display: 'flex', gap: 'var(--space-6)' }}>
                    <li>
                        <a href="#stack" onClick={(e) => scrollToSection(e, 'stack')} className="link-hover" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Tech Stack</a>
                    </li>
                    <li>
                        <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="link-hover" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Projects</a>
                    </li>
                    <li>
                        <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="link-hover" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>About Me</a>
                    </li>
                    <li>
                        <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="link-hover" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Get In Touch</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
