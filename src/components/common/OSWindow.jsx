import React from 'react';
import { motion } from 'framer-motion';

const OSWindow = ({ 
  title, 
  children, 
  className = "", 
  headerColor = "bg-slate-700",
  windowIcon,
  minimizable = true,
  maximizable = true,
  closable = true 
}) => {
  return (
    <motion.div
      className={`bg-slate-800/90 backdrop-blur-md rounded-lg shadow-2xl border border-slate-600/50 overflow-hidden ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Window Header */}
      <div className={`${headerColor} px-4 py-2 flex items-center justify-between border-b border-slate-600`}>
        <div className="flex items-center space-x-2">
          {/* Window Controls */}
          <div className="flex space-x-2">
            {closable && <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 cursor-pointer transition-colors"></div>}
            {minimizable && <div className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 cursor-pointer transition-colors"></div>}
            {maximizable && <div className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 cursor-pointer transition-colors"></div>}
          </div>
          
          {windowIcon && (
            <div className="w-5 h-5 flex items-center justify-center">
              {windowIcon}
            </div>
          )}
        </div>
        
        <span className="text-slate-300 text-sm font-mono flex-1 text-center">{title}</span>
        <div className="w-16"></div>
      </div>
      
      {/* Window Content */}
      <div className="relative">
        {children}
      </div>
    </motion.div>
  );
};

export default OSWindow;