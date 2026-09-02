import React from 'react';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Experience from './components/Experience';
import GridBackground from './components/GridBackground';
import TechStack from './components/TechStack';

import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <main className="container" style={{ paddingTop: '80px' }}>
        <GridBackground />

        <div id="hero">
          <Hero />
        </div>
         <hr className="divider" />
         <div id="projects">
          <Projects />
        </div>
        <hr className="divider" />

        <TechStack />

       

       

        <hr className="divider" />

        <div id="experience">
          <Experience />
        </div>

        <hr className="divider" />

        <div id="about">
          <About />
        </div>

        <hr className="divider" />
        <div id="contact">
          <Contact />
        </div>

        <footer style={{
          padding: 'var(--space-8) 0',
          textAlign: 'center',
          color: 'var(--text-tertiary)',
          fontSize: 'var(--text-sm)',
          marginBottom: 'var(--space-4)'
        }}>
          © {new Date().getFullYear()} Priyanshu Walia. Built with React.
        </footer>
      </main>
    </>
  );
}

export default App;
