import { ArrowUpRight, FileText, Mail } from 'lucide-react';
import { availability, socials, resume } from '../data/site';
import { Section, Reveal, Button, brandIcons } from '../components/ui';
import { useSectionId } from '../components/ui/sectionContext';
import { BorderGlow, BlurText } from '../components/reactbits';

const email = socials.find((social) => social.id === 'email');
const channels = socials.filter((social) => social.id !== 'email');

const ChannelLink = ({ social, index }) => {
  const Icon = brandIcons[social.id];
  return (
    <Reveal as="li" index={index}>
      <a
        className="contact__channel"
        href={social.url}
        target={social.id === 'email' ? undefined : '_blank'}
        rel={social.id === 'email' ? undefined : 'noopener noreferrer'}
      >
        <span className="contact__channel-icon" aria-hidden="true">
          <Icon size={16} />
        </span>
        <span className="contact__channel-body">
          <span className="contact__channel-label eyebrow">{social.label}</span>
          <span className="contact__channel-handle">{social.handle}</span>
        </span>
        <ArrowUpRight size={15} aria-hidden="true" className="contact__channel-arrow" />
      </a>
    </Reveal>
  );
};

const ContactPanel = () => {
  const headingId = useSectionId();

  return (
    <>
      <Reveal index={0}>
        <BorderGlow
          className="contact__panel"
          colors={['#5ee9a8', '#8ab4ff', '#5ee9a8']}
          borderRadius={28}
          glowRadius={44}
          coneSpread={24}
        >
          <div className="contact__inner">
            <span className="eyebrow contact__eyebrow">
              <span className="pulse-dot" aria-hidden="true" />
              {availability.label}
            </span>

            <BlurText
              as="h2"
              id={headingId}
              text="Let’s build something worth shipping."
              className="contact__headline"
              animateBy="words"
              delay={40}
            />

            <p className="contact__body">
              Looking for a full-stack engineer, or someone who’ll tangle with your
              Web3 and payments infrastructure? My inbox is open — I read everything
              and reply to anything interesting.
            </p>

            <div className="contact__actions">
              <Button href={email.url} variant="accent" icon={Mail} iconPosition="left">
                {email.handle}
              </Button>
              <Button
                href={resume.url}
                download={resume.filename}
                icon={FileText}
                iconPosition="left"
              >
                Download résumé
              </Button>
            </div>

            <ul className="contact__channels">
              {channels.map((social, index) => (
                <ChannelLink key={social.id} social={social} index={index + 1} />
              ))}
            </ul>
          </div>
        </BorderGlow>
      </Reveal>
    </>
  );
};

export const Contact = () => (
  <Section id="contact" divided={false} className="contact">
    <ContactPanel />
  </Section>
);

export default Contact;
