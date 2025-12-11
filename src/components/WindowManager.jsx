import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { X, Minimize2, Square, Maximize2, RotateCcw } from 'lucide-react';

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
  zIndex = 10,
  onSnapLeft,
  onSnapRight,
  onFocus
}) => {
  const theme = useTheme();
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isSnapped, setIsSnapped] = useState(null); // 'left', 'right', or null
  const [originalState, setOriginalState] = useState({ position: initialPosition, size: initialSize });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState('');
  const dragRef = useRef(null);
  const windowRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-controls')) return;
    
    // Focus window when clicked
    if (onFocus) onFocus(id);
    
    setIsDragging(true);
    const rect = windowRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const handleMouseMove = (e) => {
      const newX = e.clientX - offsetX;
      const newY = Math.max(0, e.clientY - offsetY);
      
      setPosition({ x: newX, y: newY });
      
      // Check for snap zones
      const screenWidth = window.innerWidth;
      const snapZone = 50;
      
      if (newX < snapZone) {
        // Show left snap preview
        document.body.style.cursor = 'w-resize';
      } else if (newX > screenWidth - size.width - snapZone) {
        // Show right snap preview
        document.body.style.cursor = 'e-resize';
      } else {
        document.body.style.cursor = 'grabbing';
      }
    };

    const handleMouseUp = (e) => {
      setIsDragging(false);
      document.body.style.cursor = 'default';
      
      // Handle snapping
      const screenWidth = window.innerWidth;
      const snapZone = 50;
      
      if (e.clientX < snapZone) {
        snapToLeft();
      } else if (e.clientX > screenWidth - snapZone) {
        snapToRight();
      }
      
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const snapToLeft = () => {
    if (!isSnapped) {
      setOriginalState({ position, size });
    }
    setIsSnapped('left');
    setIsMaximized(false);
    setPosition({ x: 0, y: 0 });
    setSize({ width: window.innerWidth / 2, height: window.innerHeight - 56 }); // Account for taskbar
  };

  const snapToRight = () => {
    if (!isSnapped) {
      setOriginalState({ position, size });
    }
    setIsSnapped('right');
    setIsMaximized(false);
    setPosition({ x: window.innerWidth / 2, y: 0 });
    setSize({ width: window.innerWidth / 2, height: window.innerHeight - 56 });
  };

  const restoreWindow = () => {
    setIsSnapped(null);
    setIsMaximized(false);
    setPosition(originalState.position);
    setSize(originalState.size);
  };

  const handleMaximize = () => {
    if (isMaximized || isSnapped) {
      restoreWindow();
    } else {
      if (!isSnapped) {
        setOriginalState({ position, size });
      }
      setPosition({ x: 0, y: 0 });
      setSize({ width: window.innerWidth, height: window.innerHeight - 56 }); // Account for taskbar
      setIsMaximized(true);
      setIsSnapped(null);
    }
  };

  // Handle window resizing
  const handleResizeStart = (direction) => (e) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;
    const startPosX = position.x;
    const startPosY = position.y;

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = startPosX;
      let newY = startPosY;

      if (direction.includes('right')) newWidth = Math.max(300, startWidth + deltaX);
      if (direction.includes('left')) {
        newWidth = Math.max(300, startWidth - deltaX);
        newX = startPosX + (startWidth - newWidth);
      }
      if (direction.includes('bottom')) newHeight = Math.max(200, startHeight + deltaY);
      if (direction.includes('top')) {
        newHeight = Math.max(200, startHeight - deltaY);
        newY = startPosY + (startHeight - newHeight);
      }

      setSize({ width: newWidth, height: newHeight });
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizeDirection('');
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  if (isMinimized) return null;

  return (
    <motion.div
      ref={windowRef}
      className={`fixed ${theme.colors.surface} backdrop-blur-md rounded-lg shadow-2xl border overflow-hidden ${
        isSnapped ? 'border-blue-500/50' : theme.colors.border
      } ${isDragging ? 'shadow-3xl' : ''}`}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex: zIndex,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: 0,
        boxShadow: isDragging 
          ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)" 
          : "0 20px 25px -5px rgba(0, 0, 0, 0.3)"
      }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Window Header */}
      <div 
        className={`px-4 py-3 flex items-center justify-between border-b cursor-grab active:cursor-grabbing ${
          isSnapped 
            ? 'bg-gradient-to-r from-blue-700 to-blue-600 border-blue-500/50' 
            : `${theme.colors.surface} ${theme.colors.border}`
        }`}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleMaximize}
        ref={dragRef}
      >
        <div className="flex items-center space-x-3">
          {windowIcon && (
            <div className="w-5 h-5 flex items-center justify-center">
              {windowIcon}
            </div>
          )}
          <span className={`${theme.colors.text} text-sm font-semibold select-none`}>{title}</span>
          {isSnapped && (
            <div className="px-2 py-1 bg-blue-500/30 rounded text-xs text-blue-200">
              {isSnapped === 'left' ? 'Snapped Left' : 'Snapped Right'}
            </div>
          )}
        </div>
        
        <div className="flex space-x-2 window-controls">
          <button
            onClick={onClose}
            className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors"
            title="Close"
          />
          <button
            onClick={onMinimize}
            className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors"
            title="Minimize"
          />
          <button
            onClick={handleMaximize}
            className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors"
            title={isMaximized || isSnapped ? "Restore" : "Maximize"}
          />
        </div>
      </div>
      
      {/* Window Content */}
      <div className="relative" style={{ height: 'calc(100% - 53px)' }}>
        {children}
      </div>

      {/* Resize handles */}
      {!isMaximized && !isSnapped && (
        <>
          {/* Corner handles */}
          <div
            className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize"
            onMouseDown={handleResizeStart('top-left')}
          />
          <div
            className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize"
            onMouseDown={handleResizeStart('top-right')}
          />
          <div
            className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize"
            onMouseDown={handleResizeStart('bottom-left')}
          />
          <div
            className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize"
            onMouseDown={handleResizeStart('bottom-right')}
          />
          
          {/* Edge handles */}
          <div
            className="absolute top-0 left-3 right-3 h-1 cursor-n-resize"
            onMouseDown={handleResizeStart('top')}
          />
          <div
            className="absolute bottom-0 left-3 right-3 h-1 cursor-s-resize"
            onMouseDown={handleResizeStart('bottom')}
          />
          <div
            className="absolute left-0 top-3 bottom-3 w-1 cursor-w-resize"
            onMouseDown={handleResizeStart('left')}
          />
          <div
            className="absolute right-0 top-3 bottom-3 w-1 cursor-e-resize"
            onMouseDown={handleResizeStart('right')}
          />
        </>
      )}
    </motion.div>
  );
};

export default WindowManager;