import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Desktop from "./components/Desktop";
import PageLoader from "./components/PageLoader";
import ParticleBackground from "./components/ParticleBackground";

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <Router>
      <div className="font-mono">
        <ParticleBackground />
        <PageLoader />
        <Desktop />
      </div>
    </Router>
  );
}

export default App;
