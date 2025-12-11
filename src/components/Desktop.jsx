import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { 
  User, 
  Code, 
  Briefcase, 
  Award, 
  Mail, 
  Folder,
  Terminal as TerminalIcon,
  FileText,
  Database,
  Grid3X3,
  Layout,
  Settings as SettingsIcon
} from 'lucide-react';
import WindowManager from './WindowManager';
import StartMenu from './StartMenu';
import SystemTray from './SystemTray';
import ContextMenu from './ContextMenu';
import About from './About';
import Skills from './Skills';
import Experience from './Experience';
import Projects from './Projects';
import Awards from './Awards';
import Contact from './Contact';
import Terminal from './Terminal';
import Settings from './Settings';

const Desktop = () => {
  const theme = useTheme();
  const [openWindows, setOpenWindows] = useState({});
  const [minimizedWindows, setMinimizedWindows] = useState({});
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [windowZIndex, setWindowZIndex] = useState(10);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [focusedWindow, setFocusedWindow] = useState(null);
  const [contextMenu, setContextMenu] = useState({ isOpen: false, position: { x: 0, y: 0 }, type: 'desktop' });
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'info',
      title: 'Welcome to Gaurav OS',
      message: 'Your portfolio desktop is ready to explore!',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [snapPreview, setSnapPreview] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Windows key or Cmd key to open start menu
      if (e.key === 'Meta' || (e.ctrlKey && e.key === 'Escape')) {
        e.preventDefault();
        setIsStartMenuOpen(!isStartMenuOpen);
      }
      
      // Alt + Tab for window switching
      if (e.altKey && e.key === 'Tab') {
        e.preventDefault();
        const windowIds = Object.keys(openWindows);
        if (windowIds.length > 0) {
          const currentIndex = windowIds.indexOf(focusedWindow);
          const nextIndex = (currentIndex + 1) % windowIds.length;
          focusWindow(windowIds[nextIndex]);
        }
      }
      
      // Windows + D to minimize all windows
      if (e.metaKey && e.key === 'd') {
        e.preventDefault();
        Object.keys(openWindows).forEach(windowId => {
          setMinimizedWindows(prev => ({ ...prev, [windowId]: true }));
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isStartMenuOpen, openWindows, focusedWindow]);

  // Handle right-click context menu
  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({
      isOpen: true,
      position: { x: e.clientX, y: e.clientY },
      type: 'desktop'
    });
  };

  const closeContextMenu = () => {
    setContextMenu({ ...contextMenu, isOpen: false });
  };

  // Notification management
  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString()
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const desktopIcons = [
    { id: 'about', title: 'About.exe', icon: <User size={24} />, position: { x: 50, y: 100 } },
    { id: 'skills', title: 'Skills.exe', icon: <Code size={24} />, position: { x: 50, y: 200 } },
    { id: 'experience', title: 'Work.exe', icon: <Briefcase size={24} />, position: { x: 50, y: 300 } },
    { id: 'projects', title: 'Projects', icon: <Folder size={24} />, position: { x: 150, y: 100 } },
    { id: 'awards', title: 'Awards.exe', icon: <Award size={24} />, position: { x: 150, y: 200 } },
    { id: 'contact', title: 'Mail.exe', icon: <Mail size={24} />, position: { x: 150, y: 300 } },
    { id: 'terminal', title: 'Terminal', icon: <TerminalIcon size={24} />, position: { x: 250, y: 100 } },
    { id: 'settings', title: 'Settings', icon: <SettingsIcon size={24} />, position: { x: 250, y: 200 } },
  ];

  const windowConfigs = {
    about: { 
      title: 'About Me - Profile.exe', 
      icon: <User size={16} className="text-blue-400" />,
      component: About,
      size: { width: 800, height: 600 }
    },
    skills: { 
      title: 'Skills - System Monitor', 
      icon: <Database size={16} className="text-green-400" />,
      component: Skills,
      size: { width: 900, height: 700 }
    },
    experience: { 
      title: 'Experience - Work History', 
      icon: <Briefcase size={16} className="text-orange-400" />,
      component: Experience,
      size: { width: 850, height: 650 }
    },
    projects: { 
      title: 'Projects - File Explorer', 
      icon: <Folder size={16} className="text-yellow-400" />,
      component: Projects,
      size: { width: 1000, height: 750 }
    },
    awards: { 
      title: 'Awards - Achievements', 
      icon: <Award size={16} className="text-purple-400" />,
      component: Awards,
      size: { width: 700, height: 500 }
    },
    contact: { 
      title: 'Contact - Mail Client', 
      icon: <Mail size={16} className="text-red-400" />,
      component: Contact,
      size: { width: 800, height: 600 }
    },
    terminal: { 
      title: 'Terminal - Command Prompt', 
      icon: <TerminalIcon size={16} className="text-green-400" />,
      component: (props) => <Terminal {...props} onExit={() => closeWindow('terminal')} />,
      size: { width: 800, height: 600 }
    },
    settings: { 
      title: 'Settings - System Configuration', 
      icon: <SettingsIcon size={16} className="text-purple-400" />,
      component: Settings,
      size: { width: 900, height: 700 }
    }
  };

  const openWindow = (windowId) => {
    if (!openWindows[windowId]) {
      const newZIndex = windowZIndex + 1;
      setWindowZIndex(newZIndex);
      setFocusedWindow(windowId);
      setOpenWindows(prev => ({
        ...prev,
        [windowId]: {
          zIndex: newZIndex,
          position: { 
            x: 100 + Object.keys(prev).length * 30, 
            y: 100 + Object.keys(prev).length * 30 
          }
        }
      }));
      setMinimizedWindows(prev => ({ ...prev, [windowId]: false }));
      
      // Add notification for window opening
      addNotification({
        type: 'info',
        title: 'Application Opened',
        message: `${windowConfigs[windowId].title} is now running`
      });
    } else {
      // Bring to front
      const newZIndex = windowZIndex + 1;
      setWindowZIndex(newZIndex);
      setFocusedWindow(windowId);
      setOpenWindows(prev => ({
        ...prev,
        [windowId]: { ...prev[windowId], zIndex: newZIndex }
      }));
      setMinimizedWindows(prev => ({ ...prev, [windowId]: false }));
    }
  };

  const focusWindow = (windowId) => {
    const newZIndex = windowZIndex + 1;
    setWindowZIndex(newZIndex);
    setFocusedWindow(windowId);
    setOpenWindows(prev => ({
      ...prev,
      [windowId]: { ...prev[windowId], zIndex: newZIndex }
    }));
  };

  const closeWindow = (windowId) => {
    setOpenWindows(prev => {
      const newWindows = { ...prev };
      delete newWindows[windowId];
      return newWindows;
    });
    setMinimizedWindows(prev => {
      const newMinimized = { ...prev };
      delete newMinimized[windowId];
      return newMinimized;
    });
  };

  const minimizeWindow = (windowId) => {
    setMinimizedWindows(prev => ({ ...prev, [windowId]: true }));
  };



  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      onContextMenu={handleContextMenu}
      onClick={closeContextMenu}
    >
      {/* Enhanced Desktop Background - More Engaging and Interactive */}
      <div className="fixed inset-0 overflow-hidden">
        {/* Dynamic base with subtle animation */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 70%)",
              "radial-gradient(circle at 80% 70%, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 70%)",
              "radial-gradient(circle at 50% 50%, rgba(20, 30, 48, 0.85) 0%, rgba(10, 15, 25, 0.95) 70%)"
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Interactive particle network - creates curiosity */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => {
            const size = 2 + Math.random() * 3;
            const speed = 5 + Math.random() * 10;
            const delay = Math.random() * 5;
            return (
              <motion.div
                key={`particle-${i}`}
                className="absolute bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  boxShadow: `0 0 ${size * 2}px ${size}px rgba(56, 189, 248, 0.2)`
                }}
                animate={{
                  x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                  y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: speed,
                  repeat: Infinity,
                  delay: delay,
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </div>

        {/* Animated connecting lines - creates tech feel */}
        <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
          {[...Array(10)].map((_, i) => {
            const x1 = `${Math.random() * 100}%`;
            const y1 = `${Math.random() * 100}%`;
            const x2 = `${Math.random() * 100}%`;
            const y2 = `${Math.random() * 100}%`;
            const strokeWidth = 0.5 + Math.random() * 1.5;
            const opacity = 0.1 + Math.random() * 0.2;
            return (
              <motion.line
                key={`line-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={`rgba(56, 189, 248, ${opacity})`}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 0.8, 0.2, 0.8] }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </svg>

        {/* Pulsing radial gradients - adds depth */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`radial-${i}`}
            className="absolute rounded-full bg-gradient-to-r from-transparent via-blue-500/5 to-transparent"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              left: `${Math.random() * 60 + 20}%`,
              top: `${Math.random() * 60 + 20}%`,
              opacity: 0.1
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}

        {/* Subtle tech circuit pattern overlay */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2300d4ff' stroke-width='0.5' opacity='0.3'%3E%3Cpath d='M20 20h40v40H20z'/%3E%3Cpath d='M60 60h40v40H60z'/%3E%3Cpath d='M100 100h40v40h-40z'/%3E%3Cpath d='M140 140h40v40h-40z'/%3E%3Cpath d='M20 100h40v40H20z'/%3E%3Cpath d='M100 20h40v40h-40z'/%3E%3Cpath d='M20 180h40v-40H20z'/%3E%3Cpath d='M180 20h-40v40h40z'/%3E%3Cpath d='M180 180h-40v-40h40z'/%3E%3Cpath d='M60 140h40v40H60z'/%3E%3Cpath d='M140 60h40v40h-40z'/%3E%3Cpath d='M140 100h40v40h-40z'/%3E%3Cpath d='M60 100h40v40H60z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px'
          }}></div>
        </div>

        {/* Floating tech elements - interactive feel */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => {
            const size = 15 + Math.random() * 20;
            const icon = ['▲', '●', '■', '▼', '◆'][i % 5];
            return (
              <motion.div
                key={`tech-${i}`}
                className="absolute text-cyan-400/20 font-bold flex items-center justify-center"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 80 + 10}%`,
                  fontSize: `${size * 0.6}px`
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.4, 0.2],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
                whileHover={{
                  scale: 1.5,
                  textShadow: "0 0 10px rgba(56, 189, 248, 0.5)"
                }}
              >
                {icon}
              </motion.div>
            );
          })}
        </div>
        
        {/* Geometric pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpolygon points='50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        
        {/* Tech circuit pattern */}
        <div className="absolute inset-0 opacity-8">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='tech-pattern' x='0' y='0' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cg fill='none' stroke='%2300d4ff' stroke-width='0.5' opacity='0.3'%3E%3Cpath d='M10 10h80v80H10z'/%3E%3Cpath d='M20 20h60v60H20z'/%3E%3Ccircle cx='50' cy='50' r='15'/%3E%3Ccircle cx='25' cy='25' r='3'/%3E%3Ccircle cx='75' cy='25' r='3'/%3E%3Ccircle cx='25' cy='75' r='3'/%3E%3Ccircle cx='75' cy='75' r='3'/%3E%3Cline x1='25' y1='25' x2='35' y2='35'/%3E%3Cline x1='75' y1='25' x2='65' y2='35'/%3E%3Cline x1='25' y1='75' x2='35' y2='65'/%3E%3Cline x1='75' y1='75' x2='65' y2='65'/%3E%3Cpath d='M0 50h10M90 50h10M50 0v10M50 90v10'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect width='400' height='400' fill='url(%23tech-pattern)'/%3E%3C/svg%3E")`,
            backgroundSize: '400px 400px'
          }}></div>
        </div>
        
        {/* Neural network pattern */}
        <div className="absolute inset-0 opacity-4">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='300' height='300' viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' stroke='%23ffffff' stroke-width='0.5' opacity='0.2'%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3Ccircle cx='150' cy='80' r='2'/%3E%3Ccircle cx='250' cy='120' r='2'/%3E%3Ccircle cx='80' cy='180' r='2'/%3E%3Ccircle cx='200' cy='220' r='2'/%3E%3Ccircle cx='120' cy='250' r='2'/%3E%3Cline x1='50' y1='50' x2='150' y2='80'/%3E%3Cline x1='150' y1='80' x2='250' y2='120'/%3E%3Cline x1='50' y1='50' x2='80' y2='180'/%3E%3Cline x1='150' y1='80' x2='200' y2='220'/%3E%3Cline x1='80' y1='180' x2='120' y2='250'/%3E%3Cline x1='200' y1='220' x2='120' y2='250'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '300px 300px'
          }}></div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight,
                opacity: 0 
              }}
              animate={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>
        
        {/* Animated geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`shape-${i}`}
              className="absolute border border-blue-400/10 rounded-full"
              style={{
                width: `${100 + i * 50}px`,
                height: `${100 + i * 50}px`,
                left: `${20 + i * 15}%`,
                top: `${10 + i * 10}%`,
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Radial gradient for depth */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20"></div>

        {/* Welcome Message - Portfolio Branding */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-0 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-white/50 text-lg font-bold mb-2"
          >
            <span className="text-blue-400">Welcome to</span>
            <span className="text-white ml-2">CGS OS</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-white/40 text-sm font-mono"
          >
            Gaurav Sushant's Portfolio Desktop
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 1.5, delay: 1, repeat: Infinity, repeatType: "reverse" }}
            className="mt-4 text-blue-400/30 text-xs font-mono"
          >
            💻 Double-click icons to explore
          </motion.div>
        </div>

        {/* Subtle watermark */}
        <div className="absolute bottom-20 right-8 opacity-20">
          <motion.div
            className="text-white/30 font-mono text-xs"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500/30 rounded-sm"></div>
              <span>Gaurav OS v2024.12 - Portfolio Edition</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Desktop Icons - Enhanced with Draggable Functionality */}
      {desktopIcons.map((icon, index) => (
        <motion.div
          key={icon.id}
          className="fixed cursor-pointer group desktop-icon-glow z-10"
          style={{ left: icon.position.x, top: icon.position.y }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5, type: "spring", stiffness: 200 }}
          whileHover={{
            scale: 1.15,
            y: -5,
            transition: { type: "spring", stiffness: 300 }
          }}
          whileTap={{ scale: 0.9 }}
          whileDrag={{ scale: 1.2, rotate: 2 }}
          drag
          dragConstraints={{ left: 0, right: window.innerWidth - 80, top: 0, bottom: window.innerHeight - 120 }}
          dragElastic={0.1}
          dragTransition={{ bounceStiffness: 500, bounceDamping: 20 }}
          onDragEnd={(event, info) => {
            // Update icon position
            const newIcons = desktopIcons.map(i =>
              i.id === icon.id
                ? { ...i, position: { x: info.point.x, y: info.point.y } }
                : i
            );
            // This would normally update state, but since we're using static data,
            // the icons will reset on refresh. For a real app, you'd save positions.
          }}
          onDoubleClick={() => {
            // Add bounce animation on double click
            const iconElement = event.currentTarget;
            iconElement.animate([
              { transform: 'scale(1)' },
              { transform: 'scale(1.2)' },
              { transform: 'scale(1)' }
            ], {
              duration: 300,
              easing: 'ease-in-out'
            });
            openWindow(icon.id);
          }}
        >
          <div className="flex flex-col items-center p-3 rounded-xl group-hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
            <div className="w-14 h-14 bg-gradient-to-br from-slate-700/90 to-slate-800/90 backdrop-blur-sm rounded-xl flex items-center justify-center mb-2 text-white shadow-xl border border-white/10 group-hover:border-white/20 transition-all duration-300">
              {icon.icon}
            </div>
            <span className="text-white text-xs font-mono text-center max-w-20 leading-tight drop-shadow-lg">
              {icon.title}
            </span>
          </div>
        </motion.div>
      ))}

      {/* Snap Preview */}
      {snapPreview && (
        <div 
          className="fixed bg-blue-500/20 border-2 border-blue-500/50 rounded-lg z-20"
          style={{
            left: snapPreview.x,
            top: snapPreview.y,
            width: snapPreview.width,
            height: snapPreview.height
          }}
        />
      )}

      {/* Windows */}
      {Object.entries(openWindows).map(([windowId, windowState]) => {
        const config = windowConfigs[windowId];
        const Component = config.component;
        
        return (
          <WindowManager
            key={windowId}
            id={windowId}
            title={config.title}
            windowIcon={config.icon}
            initialPosition={windowState.position}
            initialSize={config.size}
            onClose={() => closeWindow(windowId)}
            onMinimize={() => minimizeWindow(windowId)}
            onFocus={focusWindow}
            isMinimized={minimizedWindows[windowId]}
            zIndex={windowState.zIndex}
          >
            {typeof Component === 'function' ? <Component /> : Component}
          </WindowManager>
        );
      })}

      {/* Modern Taskbar */}
      <div className={`fixed bottom-0 left-0 right-0 h-12 ${theme.colors.surface} backdrop-blur-xl border-t ${theme.colors.border} flex items-center justify-between px-3 z-30 shadow-2xl`}>
        <div className="flex items-center space-x-2">
          {/* Start Button */}
          <motion.button
            onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
            className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg transition-all duration-300 shadow-lg ${
              isStartMenuOpen 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center text-blue-600 text-xs font-bold">
              GS
            </div>
            <span className="text-white text-sm font-semibold hidden sm:block">Start</span>
          </motion.button>

          {/* Taskbar Items */}
          <div className="flex space-x-0.5">
            {Object.entries(openWindows).map(([windowId, windowState]) => {
              const config = windowConfigs[windowId];
              const isFocused = focusedWindow === windowId;
              return (
                <motion.button
                  key={windowId}
                  onClick={() => openWindow(windowId)}
                  className={`flex items-center space-x-1 px-1.5 py-1.5 rounded transition-all duration-300 relative ${
                    minimizedWindows[windowId] 
                      ? `${theme.colors.surface} ${theme.colors.textMuted}` 
                      : isFocused
                      ? 'bg-blue-600/20 text-blue-200 border border-blue-500/30'
                      : `${theme.colors.surface} ${theme.colors.textSecondary} ${theme.colors.surfaceHover}`
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    {config.icon}
                  </div>
                  <span className="text-xs max-w-12 truncate hidden md:block">
                    {config.title.split(' - ')[0]}
                  </span>
                  {isFocused && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-blue-400 rounded-full" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
        
        {/* Windows-like Sidebar */}
        <SystemTray
          currentTime={currentTime}
          notifications={notifications}
          onDismissNotification={dismissNotification}
          onClearNotifications={clearAllNotifications}
          onOpenSettings={() => openWindow('settings')}
        />
      </div>

      {/* Start Menu */}
      <StartMenu 
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
        onOpenWindow={openWindow}
      />

      {/* Context Menu */}
      <ContextMenu 
        isOpen={contextMenu.isOpen}
        position={contextMenu.position}
        type={contextMenu.type}
        onClose={closeContextMenu}
      />
    </div>
  );
};

export default Desktop;