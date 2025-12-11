import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const [scrollPercent, setScrollPercent] = useState(0);
  
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      setScrollPercent(Math.round(latest * 100));
    });
    return unsubscribe;
  }, [scrollYProgress]);
  
  return (
    <>
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 z-50 shadow-lg"
        style={{ scaleX: scrollYProgress }}
        initial={{ originX: 0 }}
      />
      
      {/* Progress Indicator */}
      <div className="fixed top-16 right-4 z-40 bg-slate-800/90 backdrop-blur-md rounded border border-slate-600/50 px-3 py-1">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-slate-300 font-mono text-xs">
            {scrollPercent}%
          </span>
        </div>
      </div>
    </>
  );
};

export default ScrollProgress;