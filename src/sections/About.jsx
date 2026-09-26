import { about } from '../data/about';
import { Section, SectionHead, Reveal, Tag, TagRow } from '../components/ui';
import { BlurText } from '../components/reactbits';

/** Renders a paragraph from a mix of plain strings and `{ text, strong }` spans. */
const renderInline = (body) =>
  body.map((chunk, index) =>
    typeof chunk === 'string' ? (
      <span key={index}>{chunk}</span>
    ) : (
      <strong key={index}>{chunk.text}</strong>
    )
  );

export const About = ({ section }) => (
  <Section id={section.id} aria-labelledby="about-heading">
    <SectionHead
      index={section.index}
      label={section.label}
      title="The short version"
      lede="Less about a timeline, more about what I think the work is."
    />

    <div className="split split--aside about__split">
      <div className="prose about__prose">
        {about.paragraphs.map((paragraph, index) => (
          <Reveal key={index} index={index}>
            <p>{renderInline(paragraph.body)}</p>
          </Reveal>
        ))}

        <Reveal index={about.paragraphs.length}>
          <blockquote className="about__quote">
            <BlurText
              as="span"
              text={about.quote.text}
              animateBy="words"
              delay={24}
              className="about__quote-text"
            />
          </blockquote>
        </Reveal>

        <Reveal index={about.paragraphs.length + 1}>
          <p className="about__closing">{about.closing}</p>
        </Reveal>
      </div>

      <Reveal as="aside" index={2} className="about__aside">
        <div className="about__aside-inner">
          <span className="eyebrow">Off the clock</span>
          <TagRow tags={about.interests} className="about__interests" />
        </div>
      </Reveal>
    </div>
  </Section>
);

export default About;
