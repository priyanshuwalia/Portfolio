import React from 'react';

const About = () => {
    return (
        <section id="about" className="section">
            <h2 className="section-heading">/ About</h2>
            <div className="about-body">
                <p>
                    Third-year B.Tech IT student at <strong>BPIT, Delhi</strong>.
                    I spend most of my time building full-stack web apps with the
                    MERN stack and TypeScript, and I care about databases, APIs,
                    and how things survive at scale.
                </p>
                <p>
                    Lately my interests lean toward the systems underneath the
                    web — Rust, crypto protocols, wallet and escrow infrastructure —
                    and toward the agents that are starting to transact on people's
                    behalf. MerchantGate is my attempt to build the on-ramp for that.
                </p>
                <p>
                    Outside code: music, design, and whatever strange project at the
                    intersection of tech and art catches my attention.
                </p>
                <blockquote className="about-quote">
                    "There are two parts to learning craftsmanship: knowledge and work."
                </blockquote>
                <p>
                    Always open to interesting problems and cool people to work with.
                </p>
            </div>
        </section>
    );
};

export default About;