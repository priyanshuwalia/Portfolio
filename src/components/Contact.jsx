import React from 'react';
import { Mail, Twitter, Linkedin, Github, Globe } from 'lucide-react';

const contactLinks = [
  {
    name: "Email",
    value: "waliapriyanshu07@gmail.com",
    href: "mailto:waliapriyanshu07@gmail.com",
    icon: <Mail size={20} />,
  },
  {
    name: "LinkedIn",
    value: "Priyanshu Walia", // Placeholder as CV link just says "Linkedin"
    href: "https://linkedin.com/in/priyanshu-walia", // Assuming standard URL structure or placeholder
    icon: <Linkedin size={20} />,
  },
  {
    name: "GitHub",
    value: "priyanshuwalia",
    href: "https://github.com/priyanshuwalia",
    icon: <Github size={20} />,
  },
];

const Contact = () => {
    return (
        <section id="contact" className="section" style={{ paddingBottom: 'var(--space-20)' }}>
            <h2 style={{
                fontSize: 'var(--text-sm)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--text-tertiary)',
                marginBottom: 'var(--space-6)'
            }}>
                Contact
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 'var(--space-4)' }}>
                {contactLinks.map((link, index) => (
                    <a
                        key={index}
                        href={link.href}
                        target={link.name !== 'Email' ? "_blank" : undefined}
                        rel={link.name !== 'Email' ? "noopener noreferrer" : undefined}
                        className="contact-card"
                    >
                        <div style={{ color: 'var(--text-secondary)' }}>
                            {link.icon}
                        </div>
                        <div>
                            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>{link.name}</div>
                            <div style={{ fontSize: 'var(--text-base)', color: 'var(--text-primary)' }}>{link.value}</div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default Contact;
