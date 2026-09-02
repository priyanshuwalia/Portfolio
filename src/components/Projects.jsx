import React from "react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Formium",
    description:
      "A full-stack form builder application with secure authentication, role-based access control, and real-time preview features. Designed RESTful APIs and deployed on Vercel.",
    tags: ["TypeScript", "React", "Node.js", "PostgreSQL"],
    demo: "https://form-buddy-v68o.vercel.app/",
    repo: "https://github.com/priyanshuwalia/FormBuddy",
    video: "/Formium.mp4",
  },
  {
    title: "MovieLand",
    description:
      "React-based movie search application using OMDb API with debounced search and a responsive interface.",
    tags: ["React", "OMDb API", "CSS"],
    demo: "https://movie-land-omega-lyart.vercel.app/",
    repo: "https://github.com/priyanshuwalia/MovieLand",
  },
  {
    title: "Positivitus",
    description:
      "Responsive SaaS landing page for a digital marketing agency, optimized for performance, accessibility, and cross-device compatibility.",
    tags: ["React", "HTML", "CSS"],
    demo: "https://positivitus-theta.vercel.app/",
    repo: "https://github.com/priyanshuwalia/Positivitus",
  },
];

const Projects = () => {
  return (
    <section className="section">
      <h2
        style={{
          fontSize: "var(--text-xl)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "var(--text-primary)",
          marginBottom: "var(--space-6)",
        }}
      >
         / Projects
      </h2>

      <div className="grid grid-cols-1" style={{ gap: "var(--space-6)" }}>
        {/* CSS Grid override for 2 cols on tablet+ is handled in index.css via media query if class 'grid-cols-2' is used, 
            but here let's stick to a clean list or grid. Let's use the grid class. */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "var(--space-6)",
          }}
        >
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              {project.video && (
                <video
                  src={project.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    width: "100%",
                    borderRadius: "4px",
                    marginBottom: "var(--space-4)",
                  }}
                />
              )}
              <h3
                style={{
                  fontSize: "var(--text-lg)",
                  fontWeight: "500",
                  marginBottom: "var(--space-2)",
                  color: "var(--text-primary)",
                }}
              >
                {project.title}
              </h3>
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--text-secondary)",
                  marginBottom: "var(--space-4)",
                  flexGrow: 1,
                }}
              >
                {project.description}
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "var(--space-2)",
                  marginBottom: "var(--space-4)",
                }}
              >
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "var(--space-4)",
                  fontSize: "var(--text-sm)",
                }}
              >
                <a
                  href={project.demo}
                  target="_blank"
                  className="link-hover"
                  style={{
                    color: "var(--text-primary)",
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-1)",
                  }}
                >
                  <ExternalLink size={14} /> Live Demo
                </a>
                <a
                  href={project.repo}
                  className="link-hover"
                  target="_blank"
                  style={{
                    color: "var(--text-secondary)",
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-1)",
                  }}
                >
                  <Github size={14} /> Source Code
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
