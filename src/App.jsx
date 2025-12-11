import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Desktop from "./components/Desktop";
import PageLoader from "./components/PageLoader";
import ParticleBackground from "./components/ParticleBackground";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <div className="font-mono">
          <ParticleBackground />
          <PageLoader />
          <Desktop />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
