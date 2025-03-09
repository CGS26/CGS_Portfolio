import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const PageLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); 
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null; 

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-gray-900 text-white z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <motion.div
        className="text-3xl font-semibold"
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        Loading...
      </motion.div>
    </motion.div>
  );
};

export default PageLoader;
