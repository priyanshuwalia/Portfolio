import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';
import { socials } from '../data/socials';
import XLogo from './BrandIcons';

const contactLinks = [
  {
    name: "Email",
    value: socials.email.handle,
    href: socials.email.url,
    icon: <Mail size={20} />,
  },
  {
    name: "LinkedIn",
    value: socials.linkedin.handle,
    href: socials.linkedin.url,
    icon: <Linkedin size={20} />,
  },
  {
    name: "GitHub",
    value: socials.github.handle,
    href: socials.github.url,
    icon: <Github size={20} />,
  },
  {
    name: "X",
    value: socials.twitter.handle,
    href: socials.twitter.url,
    icon: <XLogo size={20} />,
  },
];

const Contact = () => {
    return (
        <section id="contact" className="section" style={{ paddingBottom: 'var(--space-20)' }}>
            <h2 className="section-heading">/ Get In Touch</h2>
            <p className="section-intro" style={{ maxWidth: '560px' }}>
                Looking for a full-stack engineer, or someone who'll tangle with
                your Web3/payments infra? My inbox is open.
            </p>

            <div className="contact-grid">
                {contactLinks.map((link, index) => (
                    <a
                        key={index}
                        href={link.href}
                        target={link.name !== 'Email' ? "_blank" : undefined}
                        rel={link.name !== 'Email' ? "noopener noreferrer" : undefined}
                        className="contact-card"
                    >
                        <div className="contact-icon">
                            {link.icon}
                        </div>
                        <div>
                            <div className="contact-label">{link.name}</div>
                            <div className="contact-value">{link.value}</div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default Contact;