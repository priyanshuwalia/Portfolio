import { identity, resume, socials, githubUser } from '../../data/site';
import { brandIcons, IconLink } from '../ui';
import { ShinyText } from '../reactbits';
import { pad2 } from '../../lib/format';

const socialLinks = socials.filter((social) => social.id !== 'email');

export const Footer = () => (
  <footer className="footer">
    <div className="shell footer__inner">
      <div className="footer__lead">
        <p className="footer__name">{identity.name}</p>
        <p className="footer__note dim">
          Designed and built in the browser — type, motion and layout by hand.
        </p>
      </div>

      <nav className="footer__links" aria-label="Elsewhere">
        {socialLinks.map((social) => {
          const Icon = brandIcons[social.id];
          return (
            <IconLink
              key={social.id}
              href={social.url}
              label={`${social.label} — ${social.handle}`}
              icon={<Icon size={15} />}
            />
          );
        })}
      </nav>

      <div className="footer__meta">
        <p className="mono dim">
          © {new Date().getFullYear()} · github.com/{githubUser}
        </p>
        <p className="mono dim">
          <ShinyText text={resume.label} speed={4} />
        </p>
      </div>
    </div>

    <div className="footer__rule" aria-hidden="true">
      <span className="mono">{pad2(new Date().getFullYear())}</span>
    </div>
  </footer>
);

export default Footer;
