import React from 'react';
import { Github, FileText, Mail } from 'lucide-react';

const Hero = () => {
  return (
    <section className="section" style={{ paddingBottom: 'var(--space-8)' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{
            fontSize: 'var(--text-4xl)',
            fontWeight: '600',
            marginBottom: 'var(--space-4)',
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)'
          }}>
            Priyanshu Walia
            <span style={{ color: 'var(--text-tertiary)', fontWeight: '400' }}> / Full Stack Developer</span>
          </h1>
          <p style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            marginBottom: 'var(--space-8)'
          }}>
            I build Full-Stack Web-Apps by day and make strange little projects at the intersection of tech and art by night. Occasionally both happen at the same time.
          </p>

        <div style={{ display: 'flex', gap: 'var(--space-6)' }}>
          <a href="https://github.com/priyanshuwalia" target="_blank" rel="noopener noreferrer" className="link-hover" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Github size={18} /> GitHub
          </a>
          <a href="/Priyanshu's CV.pdf" download="Priyanshu_Walia_CV.pdf" target="_blank" rel="noopener noreferrer" className="link-hover" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <FileText size={18} /> Resume
          </a>
          <a href="#contact" className="link-hover" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Mail size={18} /> Contact
          </a>
        </div>
        </div>
        <img
          src="/my-notion-face-portrait.png"
          alt="Priyanshu Walia"
          style={{
            width: '230px',
            height: '230px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid var(--border-subtle)',
            flexShrink: 0,
          }}
        />
      </header>
    </section>
  );
};

export default Hero;
