import { ArrowDown, FileText, Mail } from 'lucide-react';
import { identity, resume, socials } from '../data/site';
import { RotatingText } from '../components/reactbits';
import { Button, IconLink, brandIcons } from '../components/ui';

const socialLinks = socials.filter((social) => social.id !== 'email');

export const Hero = () => (
  <section className="hero" id="top">
    <div className="shell hero__inner">
      <div className="hero__body">
        <div className="hero__status">
          <span className="pulse-dot" aria-hidden="true" />
          <span className="eyebrow">{identity.availability}</span>
        </div>

        <h1 className="hero__title">
          <span className="hero__greeting eyebrow">/ {identity.name}</span>
          <span className="hero__line hero__line--role">
            <RotatingText texts={identity.roles} />
          </span>
        </h1>

        <p className="lede hero__lede">{identity.lede}</p>

        <div className="hero__actions">
          <Button href="#work" variant="accent" icon={ArrowDown}>
            See the work
          </Button>
          <Button
            href={resume.url}
            download={resume.filename}
            icon={FileText}
            iconPosition="left"
          >
            Résumé
          </Button>
          <Button href="#contact" as="a" icon={Mail} iconPosition="left" variant="ghost">
            Get in touch
          </Button>
        </div>

        <dl className="hero__meta">
          <div>
            <dt className="eyebrow">Based in</dt>
            <dd>{identity.location}</dd>
          </div>
          <div>
            <dt className="eyebrow">Timezone</dt>
            <dd>{identity.timezone}</dd>
          </div>
        </dl>
      </div>

      <div className="hero__aside">
        <div className="hero__portrait">
          <div className="hero__portrait-frame">
            <picture>
              <source type="image/webp" srcSet="/my-notion-face-portrait-512.webp" />
              <img
                src="/my-notion-face-portrait-512.png"
                alt={`Portrait of ${identity.name}`}
                width="320"
                height="320"
                fetchPriority="high"
              />
            </picture>
          </div>
        </div>

        <ul className="hero__socials">
          {socialLinks.map((social) => {
            const Icon = brandIcons[social.id];
            return (
              <li key={social.id}>
                <IconLink href={social.url} label={social.label} icon={<Icon size={15} />} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  </section>
);

export default Hero;
