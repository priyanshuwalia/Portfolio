import React from 'react';
import { Github, FileText, Mail, Linkedin } from 'lucide-react';
import { socials } from '../data/socials';
import XLogo from './BrandIcons';

const Hero = () => {
  return (
    <section className="section" style={{ paddingBottom: 'var(--space-8)' }}>
      <header className="hero-grid">
        <div>
          <h1 className="hero-title">
            Priyanshu Walia
            <span className="hero-role"> / Full Stack Developer</span>
          </h1>
          <p className="hero-subtitle">
            I ship full-stack web apps by day and prototype at the intersection
            of tech and art by night — payments, AI agents, and the strange
            little projects in between. Recently that means building software
            that lets AI agents buy things on your behalf.
          </p>

          <ul className="hero-facts">
            <li>New Delhi, India</li>
            <li>3rd-year B.Tech IT · BPIT</li>
            <li>Building in public</li>
          </ul>

          <div className="hero-actions">
            <a
              href={socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-hover hero-action"
            >
              <Github size={18} /> GitHub
            </a>
            <a
              href={socials.resume}
              download="Priyanshu_Walia_CV.pdf"
              className="link-hover hero-action"
            >
              <FileText size={18} /> Resume
            </a>
            <a href="#contact" className="link-hover hero-action">
              <Mail size={18} /> Contact
            </a>
          </div>

          <div className="hero-socials">
            <a
              href={socials.twitter.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="hero-social-link"
            >
              <XLogo size={18} />
            </a>
            <a
              href={socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hero-social-link"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hero-social-link"
            >
              <Github size={18} />
            </a>
          </div>
        </div>

        <div className="hero-portrait-wrap">
          <picture>
            <source
              type="image/webp"
              srcSet="/my-notion-face-portrait-512.webp"
            />
            <img
              src="/my-notion-face-portrait-512.png"
              alt="Portrait of Priyanshu Walia"
              className="hero-portrait"
              width="200"
              height="200"
            />
          </picture>
        </div>
      </header>
    </section>
  );
};

export default Hero;