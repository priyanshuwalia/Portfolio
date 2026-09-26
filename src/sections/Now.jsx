import { ArrowUpRight, BookOpen, ExternalLink, Github, Layers } from 'lucide-react';
import { nowBuilding, nowReading, nowLearning } from '../data/now';
import { Section, SectionHead, Reveal, Panel, StatusChip, ArrowLink, Tag } from '../components/ui';

const NowCard = ({ item, index }) => (
  <Reveal index={index} className="now__card-wrap">
    <Panel as="article" interactive raised sheen className="now__card">
      <div className="now__card-head">
        <div className="now__card-title">
          <Layers size={14} aria-hidden="true" className="dim" />
          {item.title}
        </div>
        <StatusChip status={item.status} />
      </div>
      <p className="now__card-note">{item.note}</p>
      <p className="now__card-meta mono dim">{item.meta}</p>
      <div className="now__card-links">
        {item.demo && (
          <ArrowLink href={item.demo}>
            Live demo
          </ArrowLink>
        )}
        <ArrowLink href={item.repo} icon={Github}>
          Repo
        </ArrowLink>
      </div>
    </Panel>
  </Reveal>
);

const ReadingRow = ({ book, index }) => (
  <Reveal as="li" index={index} className="now__book">
    <ArrowUpRight size={13} className="now__book-arrow" aria-hidden="true" />
    <div>
      <div className="now__book-title">
        {book.title}
        <Tag tinted={false}>{book.tag}</Tag>
      </div>
      <div className="now__book-author mono dim">{book.author}</div>
      <p className="now__book-why">{book.why}</p>
    </div>
  </Reveal>
);

export const Now = ({ section }) => (
  <Section id={section.id} aria-labelledby="now-heading">
    <SectionHead
      index={section.index}
      label={section.label}
      title="What I'm doing right now"
      lede="A live snapshot rather than a résumé: what's shipping, what I'm reading, and what I'm trying to understand next."
    />

    <div className="now__grid">
      {nowBuilding.map((item, index) => (
        <NowCard key={item.title} item={item} index={index} />
      ))}
    </div>

    <div className="split split--even now__lower">
      <div>
        <h3 className="h3 now__sub">
          <BookOpen size={15} aria-hidden="true" className="dim" />
          Currently reading
        </h3>
        <ul className="now__books">
          {nowReading.map((book, index) => (
            <ReadingRow key={book.title} book={book} index={index} />
          ))}
        </ul>
      </div>

      <div>
        <h3 className="h3 now__sub">
          <Layers size={15} aria-hidden="true" className="dim" />
          Currently learning
        </h3>
        <Reveal index={1}>
          <ul className="row wrap g-2 now__chips">
            {nowLearning.map((topic) => (
              <li key={topic}>
                <Tag tinted={false}>{topic}</Tag>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal index={2}>
          <p className="now__note">
            Same lane as the books — Rust, Solana, and the crypto-systems plumbing
            that makes wallets, escrow and agent payments trustworthy.
          </p>
        </Reveal>
      </div>
    </div>
  </Section>
);

export default Now;
