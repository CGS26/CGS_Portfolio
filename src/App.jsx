import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Resume from "./components/Resume";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Awards from "./components/Awards";
import Contact from "./components/Contact";
import Keywords from "./components/Keywords";
import Footer from "./components/Footer";
import PageLoader from "./components/PageLoader";
import ParticleBackground from "./components/ParticleBackground";
import ScrollProgress from "./components/common/ScrollProgress";

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans">
        <ParticleBackground />

        <Navbar />
        <ScrollProgress />

        <PageLoader />
        <Hero />
        <About />
        <Resume />
        <Skills />
        <Experience />
        <Projects />
        <Awards />
        <Contact />
        <Keywords />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
