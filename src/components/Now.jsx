import React from 'react';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { nowBuilding, nowReading, currentlyLearning } from '../data/now';
import LastPush from './LastPush';

const SectionHeading = ({ children }) => (
  <h2 className="section-heading">/ {children}</h2>
);

const Now = () => {
  return (
    <section id="now" className="section">
      <div className="section-heading-row">
        <SectionHeading>Now</SectionHeading>
        <LastPush />
      </div>

      <h3 className="subsection-heading">Currently building</h3>
      <div className="now-grid">
        {nowBuilding.map((item) => (
          <article key={item.title} className="now-card">
            <div className="now-card-top">
              <h4 className="now-card-title">{item.title}</h4>
              <span className={`status-chip ${item.status}`}>{item.status}</span>
            </div>
            <p className="now-card-note">{item.note}</p>
            <div className="now-card-meta">{item.meta}</div>
            <div className="now-card-links">
              {item.demo && (
                <a
                  href={item.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-hover"
                >
                  <ExternalLink size={14} /> Live demo
                </a>
              )}
              <a
                href={item.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="link-hover"
              >
                <Github size={14} /> Repo
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="reading-grid">
        <div>
          <h3 className="subsection-heading">Currently reading</h3>
          <ul className="book-list">
            {nowReading.map((book) => (
              <li key={book.title} className="book-row">
                <ArrowUpRight size={14} className="book-arrow" aria-hidden="true" />
                <div>
                  <div className="book-title">
                    {book.title}
                    <span className="book-tag">{book.tag}</span>
                  </div>
                  <div className="book-author">{book.author}</div>
                  <div className="book-why">{book.why}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="subsection-heading">Currently learning</h3>
          <div className="learning-chips">
            {currentlyLearning.map((topic) => (
              <span key={topic} className="learning-chip">
                {topic}
              </span>
            ))}
          </div>
          <p className="learning-note">
            Same lane as the books — Rust, Solana, and the crypto-systems
            plumbing that makes wallets, escrow, and agent payments trustworthy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Now;