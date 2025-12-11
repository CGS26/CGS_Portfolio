import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Awards from "./components/Awards";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PageLoader from "./components/PageLoader";
import ParticleBackground from "./components/ParticleBackground";
import ScrollProgress from "./components/common/ScrollProgress";

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    
    // Update time every second for OS-like clock
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      document.documentElement.style.scrollBehavior = "auto";
      clearInterval(timer);
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 font-mono relative overflow-hidden">
        {/* OS Desktop Background */}
        <div className="fixed inset-0 opacity-50">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-blue-900/30 to-slate-800/50"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        {/* OS Taskbar */}
        <div className="fixed bottom-0 left-0 right-0 h-12 bg-slate-800/90 backdrop-blur-md border-t border-slate-600/50 flex items-center justify-between px-4 z-50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center text-white text-xs font-bold">
              GS
            </div>
            <span className="text-slate-300 text-sm">Gaurav OS</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-slate-300 text-sm">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-slate-300 text-sm">
              {currentTime.toLocaleDateString()}
            </div>
          </div>
        </div>

        <ParticleBackground />
        <Navbar />
        <ScrollProgress />

        <PageLoader />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Awards />
        <Contact />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
