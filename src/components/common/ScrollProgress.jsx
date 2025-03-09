import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-50"
      style={{ scaleX: scrollYProgress }}
      initial={{ originX: 0 }}
    />
  );
};

export default ScrollProgress;