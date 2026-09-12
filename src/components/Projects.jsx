import React from 'react';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { featuredProjects, labProjects } from '../data/projects';
import { getTagColor, hexToRgba } from '../data/tagColors';
import SmartVideo from './SmartVideo';

const tagStyle = (tag) => {
  const color = getTagColor(tag);
  return {
    color,
    borderColor: hexToRgba(color, 0.4),
    backgroundColor: hexToRgba(color, 0.12),
  };
};

const Projects = () => {
  return (
    <section id="projects" className="section">
      <h2 className="section-heading">/ Selected Work</h2>
      <p className="section-intro">
        The four most representative things I've shipped — AI-agent commerce, a
        full-stack product, an AI systems build, and a Web3 experiment.
      </p>

      <div className="project-grid">
        {featuredProjects.map((project) => (
          <article key={project.title} className="project-card">
            {project.video && (
              <SmartVideo src={project.video} className="project-video" />
            )}
            <div className="project-card-head">
              <h3 className="project-title">{project.title}</h3>
              <span className={`status-chip ${project.status}`}>
                {project.status}
              </span>
            </div>
            {project.tagline && (
              <div className="project-tagline">{project.tagline}</div>
            )}
            <p className="project-desc">{project.description}</p>

            <div className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="tag" style={tagStyle(tag)}>
                  {tag}
                </span>
              ))}
            </div>

            <div className="project-links">
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="link-hover"
                style={{ display: project.demo ? 'inline-flex' : 'none' }}
              >
                <ExternalLink size={14} /> Live Demo
              </a>
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="link-hover"
              >
                <Github size={14} /> Source Code
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="lab-section">
        <h3 className="subsection-heading">From the lab</h3>
        <p className="section-intro">
          Smaller experiments and curiosities — fetch, learn, break, move on.
        </p>
        <div className="lab-grid">
          {labProjects.map((item) => (
            <a
              key={item.title}
              href={item.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="lab-card"
            >
              <div className="lab-card-head">
                <span className="lab-title">{item.title}</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </div>
              <p className="lab-desc">{item.description}</p>
              {item.demo && (
                <span className="lab-demo link-hover">
                  <ExternalLink size={12} /> demo
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;