import React from 'react';
import { PenLine } from 'lucide-react';
import { socials } from '../data/socials';

const posts = [];

const FieldNotes = () => {
  return (
    <section id="writing" className="section">
      <h2 className="section-heading">/ Field Notes</h2>

      {posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <a
              key={post.title}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-hover post-row"
            >
              <span>{post.title}</span>
              <span className="post-meta">{post.date}</span>
            </a>
          ))}
        </div>
      ) : (
        <div className="writing-soon">
          <span className="writing-soon-icon">
            <PenLine size={16} aria-hidden="true" />
          </span>
          <div>
            <p>
              First post incoming — long-form notes on shipping in public,
              Solana, and building for AI-agent commerce.
            </p>
            <p className="writing-soon-sub">
              For now, snippets land{' '}
              <a
                href={socials.twitter.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-hover"
              >
                on X
              </a>
              .
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default FieldNotes;