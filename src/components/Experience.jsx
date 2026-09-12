import React from 'react';
import { experiences, education } from '../data/experience';

const Experience = () => {
  return (
    <section id="experience" className="section">
      <h2 className="section-heading">/ Experience &amp; Education</h2>

      <div className="timeline">
        {experiences.map((exp, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-rail" aria-hidden="true">
              <span className="timeline-dot" />
            </div>
            <div className="timeline-body">
              <div className="timeline-head">
                <h3 className="timeline-role">{exp.role}</h3>
                <span className="timeline-period">{exp.period}</span>
              </div>
              <div className="timeline-company">
                {exp.company} <span className="timeline-type">· {exp.type}</span>
              </div>
              <ul className="timeline-bullets">
                {exp.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        <div className="timeline-item">
          <div className="timeline-rail" aria-hidden="true">
            <span className="timeline-dot" />
          </div>
          <div className="timeline-body">
            <div className="timeline-head">
              <h3 className="timeline-role">{education.degree}</h3>
              <span className="timeline-period">{education.period}</span>
            </div>
            <div className="timeline-company">
              {education.school} <span className="timeline-type">· {education.status}</span>
            </div>
            <ul className="timeline-bullets">
              <li>Focus: {education.focus}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;