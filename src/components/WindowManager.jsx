import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minimize2, Square } from 'lucide-react';

const WindowManager = ({ 
  id,
  title, 
  children, 
  windowIcon,
  initialPosition = { x: 100, y: 100 },
  initialSize = { width: 800, height: 600 },
  onClose,
  isMinimized,
  onMinimize,
  zIndex = 10
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const dragRef = useRef(null);
  const windowRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-controls')) return;
    setIsDragging(true);
    const rect = windowRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const handleMouseMove = (e) => {
      setPosition({
        x: e.clientX - offsetX,
        y: Math.max(0, e.clientY - offsetY)
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMaximize = () => {
    if (isMaximized) {
      setPosition(initialPosition);
      setSize(initialSize);
      setIsMaximized(false);
    } else {
      setPosition({ x: 0, y: 0 });
      setSize({ width: window.innerWidth, height: window.innerHeight - 48 }); // Account for taskbar
      setIsMaximized(true);
    }
  };

  if (isMinimized) return null;

  return (
    <motion.div
      ref={windowRef}
      className="fixed bg-slate-800/95 backdrop-blur-md rounded-lg shadow-2xl border border-slate-600/50 overflow-hidden"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex: zIndex,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      {/* Window Header */}
      <div 
        className="bg-slate-700 px-4 py-2 flex items-center justify-between border-b border-slate-600 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        ref={dragRef}
      >
        <div className="flex items-center space-x-2">
          {windowIcon && (
            <div className="w-5 h-5 flex items-center justify-center">
              {windowIcon}
            </div>
          )}
          <span className="text-slate-300 text-sm font-mono select-none">{title}</span>
        </div>
        
        <div className="flex space-x-2 window-controls">
          <button
            onClick={onMinimize}
            className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors"
          />
          <button
            onClick={handleMaximize}
            className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors"
          />
          <button
            onClick={onClose}
            className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors"
          />
        </div>
      </div>
      
      {/* Window Content */}
      <div className="h-full overflow-auto">
        {children}
      </div>
    </motion.div>
  );
};

export default WindowManager;