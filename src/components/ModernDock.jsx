import React from 'react';
import { motion } from 'framer-motion';

const ModernDock = ({ desktopIcons, openWindow, openWindows, focusedWindow }) => {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <motion.div
        className="flex items-center space-x-2 bg-slate-800/80 backdrop-blur-xl rounded-2xl px-4 py-3 border border-slate-600/30 shadow-2xl"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5, type: "spring", stiffness: 300 }}
      >
        {desktopIcons.map((icon, index) => {
          const isOpen = openWindows[icon.id];
          const isFocused = focusedWindow === icon.id;
          
          return (
            <motion.button
              key={icon.id}
              onClick={() => openWindow(icon.id)}
              className={`relative p-3 rounded-xl transition-all duration-300 ${
                isOpen 
                  ? isFocused 
                    ? 'bg-blue-500/30 shadow-lg' 
                    : 'bg-slate-700/50'
                  : 'hover:bg-slate-700/30'
              }`}
              whileHover={{ 
                scale: 1.2, 
                y: -8,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-8 h-8 text-white flex items-center justify-center">
                {icon.icon}
              </div>
              
              {/* Active indicator */}
              {isOpen && (
                <motion.div
                  className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
                    isFocused ? 'bg-blue-400' : 'bg-slate-400'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                />
              )}
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {icon.title}
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ModernDock;