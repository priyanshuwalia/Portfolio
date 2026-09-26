import { ArrowUpRight, Check, Github } from 'lucide-react';
import { projects, experiments } from '../data/projects';
import { Section, SectionHead, Reveal, Panel, StatusChip, TagRow, ArrowLink, SmartVideo } from '../components/ui';
import { GlareHover, SpotlightCard } from '../components/reactbits';

/**
 * Media block for a project. Video and image are treated identically by the
 * layout so cards stay the same height regardless of which a project has.
 */
const ProjectMedia = ({ project }) => {
  if (!project.video && !project.image) return null;

  // Lock the frame to the asset's own ratio. A fixed 16:9 frame crops a wide
  // UI capture, so the ratio travels with the asset instead of being guessed.
  const frameStyle = project.mediaWidth
    ? { '--media-aspect': `${project.mediaWidth} / ${project.mediaHeight}` }
    : undefined;

  const frame = (
    <div className="work__media-frame" style={frameStyle}>
      {project.video ? (
        <SmartVideo src={project.video} className="work__media" />
      ) : (
        <img
          src={project.image}
          alt={project.imageAlt ?? `${project.title} preview`}
          className="work__media work__media--fit"
          loading="lazy"
          decoding="async"
          width={project.mediaWidth}
          height={project.mediaHeight}
        />
      )}
      <span className="work__media-glare" aria-hidden="true" />
    </div>
  );

  return <GlareHover className="work__media-glare-host">{frame}</GlareHover>;
};

const ProjectCard = ({ project, index }) => (
  <Reveal as="li" index={index} className="work__item">
    <SpotlightCard className="work__spotlight">
      <Panel as="article" interactive className="work__card">
        <div className="work__card-head">
          <div className="row g-3 wrap">
            <h3 className="work__title">{project.title}</h3>
            <StatusChip status={project.status} />
          </div>
          <span className="work__year mono dim">{project.year}</span>
        </div>

        {project.media !== false && <ProjectMedia project={project} />}

        <div className="work__card-body">
          <p className="work__tagline">{project.tagline}</p>
          <p className="work__desc">{project.description}</p>

          {project.highlights && (
            <ul className="work__points">
              {project.highlights.map((point) => (
                <li key={point}>
                  <Check size={12} aria-hidden="true" className="work__point-check" />
                  {point}
                </li>
              ))}
            </ul>
          )}

          <TagRow tags={project.tags} className="work__tags" />

          <div className="work__links">
            {project.demo && (
              <ArrowLink href={project.demo} className="work__link-primary">
                Live demo
              </ArrowLink>
            )}
            <ArrowLink href={project.repo} icon={Github}>
              Source
            </ArrowLink>
          </div>
        </div>
      </Panel>
    </SpotlightCard>
  </Reveal>
);

const ExperimentRow = ({ item, index }) => (
  <Reveal as="li" index={index}>
    <Panel as="a" href={item.repo} interactive className="work__experiment">
      <ArrowUpRight size={14} aria-hidden="true" className="work__experiment-arrow" />
      <span className="work__experiment-body">
        <span className="work__experiment-title">{item.title}</span>
        <span className="work__experiment-desc">{item.description}</span>
      </span>
    </Panel>
  </Reveal>
);

export const Work = ({ section }) => (
  <Section id={section.id} aria-labelledby="work-heading">
    <SectionHead
      index={section.index}
      label={section.label}
      title="Selected work"
      lede="Four things worth reading closely: agent commerce, a full-stack product, an agentic pipeline, and a Web3 experiment. Each shipped, deployed, and still running."
    />

    <ul className="work__grid">
      {projects.map((project, index) => (
        <ProjectCard key={project.title} project={project} index={index} />
      ))}
    </ul>

    <div className="work__lab">
      <h3 className="h3 work__lab-title">From the lab</h3>
      <p className="work__lab-note dim">
        Smaller experiments — fetch, learn, break, move on.
      </p>
      <ul className="work__experiments">
        {experiments.map((item, index) => (
          <ExperimentRow key={item.title} item={item} index={index} />
        ))}
      </ul>
    </div>
  </Section>
);

export default Work;
