import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatusStrip from './components/StatusStrip';
import Now from './components/Now';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Experience from './components/Experience';
import About from './components/About';
import Contact from './components/Contact';
import GridBackground from './components/GridBackground';
import Reveal from './components/Reveal';
function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main className="container" id="main" style={{ paddingTop: '80px' }}>
        <GridBackground />

        <div id="hero">
          <Hero />
        </div>

        <StatusStrip />

        <hr className="divider" />

        <Reveal>
          <Now />
        </Reveal>

        <hr className="divider" />

        <Reveal>
          <div id="projects">
            <Projects />
          </div>
        </Reveal>

        <hr className="divider" />

        <Reveal>
          <TechStack />
        </Reveal>

        <hr className="divider" />

        <Reveal>
          <Experience />
        </Reveal>

        <hr className="divider" />

        <Reveal>
          <div id="about">
            <About />
          </div>
        </Reveal>

        <hr className="divider" />

        <Reveal>
          <div id="contact">
            <Contact />
          </div>
        </Reveal>

        <footer className="site-footer">
          © {new Date().getFullYear()} Priyanshu Walia. Built with React.
        </footer>
      </main>
    </>
  );
}

export default App;