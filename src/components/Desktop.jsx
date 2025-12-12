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
  const [storyMode, setStoryMode] = useState(false);
  const [storyStep, setStoryStep] = useState(0);
  const [storyNarrator, setStoryNarrator] = useState(null);
  const [desktopIcons, setDesktopIcons] = useState([
    { id: 'about', title: 'About.exe', icon: <User size={24} />, position: { x: 50, y: 100 }, mobilePosition: { x: 20, y: 150 } },
    { id: 'skills', title: 'Skills.exe', icon: <Code size={24} />, position: { x: 50, y: 200 }, mobilePosition: { x: 120, y: 150 } },
    { id: 'experience', title: 'Work.exe', icon: <Briefcase size={24} />, position: { x: 50, y: 300 }, mobilePosition: { x: 220, y: 150 } },
    { id: 'projects', title: 'Projects', icon: <Folder size={24} />, position: { x: 150, y: 100 }, mobilePosition: { x: 20, y: 250 } },
    { id: 'awards', title: 'Awards.exe', icon: <Award size={24} />, position: { x: 150, y: 200 }, mobilePosition: { x: 120, y: 250 } },
    { id: 'contact', title: 'Mail.exe', icon: <Mail size={24} />, position: { x: 150, y: 300 }, mobilePosition: { x: 220, y: 250 } },
    { id: 'terminal', title: 'Terminal', icon: <TerminalIcon size={24} />, position: { x: 250, y: 100 }, mobilePosition: { x: 70, y: 350 } },
    { id: 'settings', title: 'Settings', icon: <SettingsIcon size={24} />, position: { x: 250, y: 200 }, mobilePosition: { x: 170, y: 350 } },
  ]);

  const storySequence = [
    {
      window: 'about',
      narrator: "Welcome to my digital workspace. Let me introduce myself - I'm Gaurav, a passionate Software Engineer and Data Scientist on a mission to create innovative solutions.",
      delay: 2000
    },
    {
      window: 'skills',
      narrator: "My journey began with mastering the fundamentals. Here are the technical skills I've honed through years of dedication and continuous learning.",
      delay: 3000
    },
    {
      window: 'experience',
      narrator: "Every great developer starts somewhere. Let me walk you through my professional journey - from internships to impactful projects that shaped my career.",
      delay: 4000
    },
    {
      window: 'projects',
      narrator: "Innovation happens in the doing. These are the projects where I've turned ideas into reality, solving real-world problems with technology.",
      delay: 5000
    },
    {
      window: 'awards',
      narrator: "Recognition validates the path. These achievements represent milestones in my journey of growth and excellence.",
      delay: 3000
    },
    {
      window: 'contact',
      narrator: "Stories are meant to connect. If my journey resonates with you, I'd love to hear from you. Let's build something amazing together.",
      delay: 3000
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Story mode functionality
  const startStory = () => {
    setStoryMode(true);
    setStoryStep(0);
    setStoryNarrator(storySequence[0].narrator);
    openWindow(storySequence[0].window);
  };

  const nextStoryStep = () => {
    if (storyStep < storySequence.length - 1) {
      const nextStep = storyStep + 1;
      setStoryStep(nextStep);
      setStoryNarrator(storySequence[nextStep].narrator);
      setTimeout(() => {
        openWindow(storySequence[nextStep].window);
      }, 500);
    } else {
      setStoryMode(false);
      setStoryNarrator(null);
      addNotification({
        type: 'success',
        title: 'Story Complete',
        message: 'Thanks for exploring my portfolio journey!'
      });
    }
  };

  const skipStory = () => {
    setStoryMode(false);
    setStoryNarrator(null);
  };

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

      // Auto-progress story if in story mode
      if (storyMode && windowId === storySequence[storyStep]?.window) {
        setTimeout(() => {
          nextStoryStep();
        }, storySequence[storyStep]?.delay || 3000);
      }
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
      className="min-h-screen relative overflow-hidden touch-pan-y"
      onContextMenu={handleContextMenu}
      onClick={closeContextMenu}
      style={{
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        KhtmlUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none'
      }}
    >
      {/* Enhanced Mobile Detection and Controls */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {/* Mobile Status Indicator */}
        <motion.div
          className="absolute top-4 left-4 text-xs text-white/30 font-mono bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ delay: 1 }}
        >
          {typeof window !== 'undefined' && window.innerWidth < 768 ? '📱 Mobile Optimized' : '💻 Desktop Mode'}
        </motion.div>

        {/* Enhanced Mobile Controls */}
        {typeof window !== 'undefined' && window.innerWidth < 768 && (
          <motion.div
            className="absolute top-4 right-4 flex flex-col space-y-2 pointer-events-auto"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, staggerChildren: 0.1 }}
          >
            <motion.button
              onClick={startStory}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-4 py-3 rounded-xl font-semibold text-sm shadow-lg transition-all duration-300 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">📖</span>
              <span>Story</span>
            </motion.button>
            <motion.button
              onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
              className="bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white px-4 py-3 rounded-xl font-semibold text-sm shadow-lg transition-all duration-300 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">☰</span>
              <span>Menu</span>
            </motion.button>
          </motion.div>
        )}
      </div>
      {/* Enhanced Desktop Background - More Engaging, Interactive and Responsive */}
      <div className="fixed inset-0 overflow-hidden">
        {/* Enhanced Particle Explosion Effects */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`explosion-${i}`}
            className="absolute rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-cyan-500"
            style={{
              width: `${30 + Math.random() * 80}px`,
              height: `${30 + Math.random() * 80}px`,
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
              opacity: 0.08,
              filter: 'blur(15px)'
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.05, 0.15, 0.05],
              rotate: [0, 180, 360],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0]
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          />
        ))}
        {/* Enhanced Dynamic Background with Theme-Aware Colors */}
        <motion.div
          className="absolute inset-0"
          initial={{
            background: theme.isDarkMode
              ? "radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.98) 50%, rgba(10, 15, 25, 1) 100%)"
              : "radial-gradient(circle at 50% 50%, rgba(241, 245, 249, 0.95) 0%, rgba(226, 232, 240, 0.98) 50%, rgba(203, 213, 225, 1) 100%)"
          }}
          animate={theme.isDarkMode ? {
            background: [
              "radial-gradient(circle at 20% 30%, rgba(30, 41, 59, 0.92) 0%, rgba(15, 23, 42, 0.95) 50%, rgba(20, 30, 48, 0.98) 100%)",
              "radial-gradient(circle at 80% 70%, rgba(20, 30, 48, 0.95) 0%, rgba(30, 41, 59, 0.92) 50%, rgba(15, 23, 42, 0.98) 100%)",
              "radial-gradient(circle at 50% 20%, rgba(25, 35, 52, 0.93) 0%, rgba(20, 30, 48, 0.96) 50%, rgba(30, 41, 59, 0.99) 100%)",
              "radial-gradient(circle at 30% 80%, rgba(15, 23, 42, 0.95) 0%, rgba(25, 35, 52, 0.93) 50%, rgba(20, 30, 48, 0.98) 100%)"
            ]
          } : {
            background: [
              "radial-gradient(circle at 20% 30%, rgba(226, 232, 240, 0.92) 0%, rgba(241, 245, 249, 0.95) 50%, rgba(203, 213, 225, 0.98) 100%)",
              "radial-gradient(circle at 80% 70%, rgba(203, 213, 225, 0.95) 0%, rgba(226, 232, 240, 0.92) 50%, rgba(241, 245, 249, 0.98) 100%)",
              "radial-gradient(circle at 50% 20%, rgba(148, 163, 184, 0.93) 0%, rgba(203, 213, 225, 0.96) 50%, rgba(226, 232, 240, 0.99) 100%)",
              "radial-gradient(circle at 30% 80%, rgba(241, 245, 249, 0.95) 0%, rgba(148, 163, 184, 0.93) 50%, rgba(203, 213, 225, 0.98) 100%)"
            ]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Enhanced Interactive Particle Network - Theme Aware */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => {
            const size = 1.5 + Math.random() * 4;
            const speed = 8 + Math.random() * 15;
            const delay = Math.random() * 8;
            const darkColors = ['from-cyan-400 to-blue-500', 'from-purple-400 to-pink-500', 'from-blue-400 to-cyan-500', 'from-indigo-400 to-purple-500'];
            const lightColors = ['from-blue-400 to-indigo-500', 'from-purple-400 to-pink-400', 'from-cyan-400 to-blue-400', 'from-indigo-400 to-purple-400'];
            const colors = theme.isDarkMode ? darkColors : lightColors;
            const colorClass = colors[i % colors.length];
            const shadowColor = theme.isDarkMode ? 'rgba(56, 189, 248, 0.3)' : 'rgba(59, 130, 246, 0.25)';
            return (
              <motion.div
                key={`particle-${i}`}
                className={`absolute bg-gradient-to-br ${colorClass} rounded-full`}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  boxShadow: `0 0 ${size * 3}px ${size}px ${shadowColor}`
                }}
                animate={{
                  x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
                  y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
                  opacity: [0.15, 0.8, 0.15],
                  scale: [0.5, 1.5, 0.5]
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

        {/* Exciting Floating Tech Bubbles */}
        {[...Array(8)].map((_, i) => {
          const size = 20 + Math.random() * 40;
          const delay = Math.random() * 3;
          return (
            <motion.div
              key={`bubble-${i}`}
              className="absolute rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/10"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 80 + 10}%`,
                bottom: `-${size}px`,
              }}
              animate={{
                y: [`${window.innerHeight + size}px`, `-${size * 2}px`],
                opacity: [0, 0.3, 0],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                delay: delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          );
        })}

        {/* Enhanced Welcome Section with Immediate Appeal */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-0 pointer-events-none max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              Gaurav Sushant
            </h1>
            <p className="text-xl text-slate-300 font-mono font-semibold">
              Software Engineer & Data Scientist
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-slate-400 text-sm font-mono leading-relaxed mb-6 max-w-md mx-auto"
          >
            Crafting innovative solutions through code, data, and creativity.
            Explore my journey in technology and innovation.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto"
          >
            <button
              onClick={() => openWindow('about')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            >
              <User size={18} />
              <span>About Me</span>
            </button>
            <button
              onClick={startStory}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            >
              <span className="text-lg">📖</span>
              <span>My Story</span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="mt-8 text-slate-500 text-xs font-mono"
          >
            💡 Double-click desktop icons to explore • Scroll to discover more
          </motion.div>
        </div>

        {/* Enhanced Story Narrator with Mobile Optimization */}
        {storyNarrator && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className={`fixed z-40 ${
              typeof window !== 'undefined' && window.innerWidth < 768
                ? 'bottom-24 left-4 right-4 max-w-none'
                : 'bottom-20 left-1/2 transform -translate-x-1/2 max-w-2xl'
            }`}
          >
            <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-600/50 rounded-xl p-4 md:p-6 shadow-2xl">
              <div className={`flex items-start space-x-3 md:space-x-4 ${
                typeof window !== 'undefined' && window.innerWidth < 768 ? 'flex-col space-y-3' : ''
              }`}>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
                  <span className="text-white text-lg md:text-xl">📖</span>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <p className="text-slate-200 font-mono text-sm md:text-base leading-relaxed mb-4">
                    {storyNarrator}
                  </p>
                  <div className={`flex items-center space-x-3 ${
                    typeof window !== 'undefined' && window.innerWidth < 768 ? 'justify-center' : ''
                  }`}>
                    <button
                      onClick={nextStoryStep}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-mono text-sm font-semibold transition-colors shadow-lg"
                    >
                      {storyStep < storySequence.length - 1 ? 'Continue →' : 'Finish Story'}
                    </button>
                    <button
                      onClick={skipStory}
                      className="text-slate-400 hover:text-slate-300 font-mono text-sm transition-colors"
                    >
                      Skip Story
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-center">
                <div className="flex space-x-2">
                  {storySequence.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index <= storyStep ? 'bg-blue-500' : 'bg-slate-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

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

      {/* Enhanced Desktop Icons with Advanced Interactions */}
      {desktopIcons.map((icon, index) => {
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        const currentPosition = isMobile ? icon.mobilePosition : icon.position;

        return (
        <motion.div
          key={icon.id}
          className="fixed cursor-pointer group desktop-icon-glow z-10"
          style={{ left: currentPosition.x, top: currentPosition.y }}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.6, type: "spring", stiffness: 200 }}
          whileHover={{
            scale: 1.2,
            y: -8,
            transition: { type: "spring", stiffness: 400, damping: 15 },
            boxShadow: "0 0 25px rgba(56, 189, 248, 0.6), 0 0 50px rgba(56, 189, 248, 0.3)"
          }}
          whileTap={{ scale: 0.85 }}
          whileDrag={{
            scale: 1.25,
            rotate: 5,
            boxShadow: "0 0 35px rgba(56, 189, 248, 0.8), 0 0 70px rgba(56, 189, 248, 0.4)"
          }}
          drag
          dragConstraints={{ left: 0, right: window.innerWidth - 80, top: 0, bottom: window.innerHeight - 120 }}
          dragElastic={0.2}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 25 }}
          onDragEnd={(event, info) => {
            setDesktopIcons(prevIcons =>
              prevIcons.map(i =>
                i.id === icon.id
                  ? { ...i, position: { x: info.point.x, y: info.point.y } }
                  : i
              )
            );
          }}
          onDoubleClick={() => {
            const iconElement = event.currentTarget;
            // Enhanced bounce animation
            iconElement.animate([
              { transform: 'scale(1)', filter: 'brightness(1)' },
              { transform: 'scale(1.3)', filter: 'brightness(1.2)' },
              { transform: 'scale(0.95)', filter: 'brightness(1.1)' },
              { transform: 'scale(1)', filter: 'brightness(1)' }
            ], {
              duration: 400,
              easing: 'ease-out'
            });
            openWindow(icon.id);
          }}
          onTouchEnd={(e) => {
            // Handle single tap on mobile
            if (typeof window !== 'undefined' && window.innerWidth < 768) {
              e.preventDefault();
              openWindow(icon.id);
            }
          }}
        >
          <div className="flex flex-col items-center p-4 rounded-2xl group-hover:bg-white/15 backdrop-blur-md transition-all duration-500 border border-transparent group-hover:border-white/20">
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-slate-600/95 to-slate-700/95 backdrop-blur-md rounded-2xl flex items-center justify-center mb-3 text-white shadow-2xl border border-white/10 group-hover:border-white/30 transition-all duration-500 relative overflow-hidden"
              whileHover={{
                background: "linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(139, 92, 246, 0.2))"
              }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {icon.icon}
              </motion.div>
            </motion.div>
            <span className="text-white text-xs font-mono text-center max-w-24 leading-tight drop-shadow-lg group-hover:text-blue-200 transition-colors duration-300">
              {icon.title}
            </span>
            {/* Subtle pulse effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-blue-400/0 group-hover:border-blue-400/50"
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
            />
          </div>
        </motion.div>
        );
      })}

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

      {/* Enhanced Professional Taskbar with Mobile Optimization */}
      <div className={`fixed bottom-0 left-0 right-0 ${typeof window !== 'undefined' && window.innerWidth < 768 ? 'h-20' : 'h-16'} ${theme.colors.cardBg} backdrop-blur-xl border-t ${theme.colors.border} flex items-center justify-between px-3 md:px-4 z-30 shadow-2xl`}>
        <div className="flex items-center space-x-2 md:space-x-3 flex-1 min-w-0">
          {/* Enhanced Start Button */}
          <motion.button
            onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
            className={`flex items-center space-x-2 px-3 py-2 md:px-4 md:py-2 rounded-xl transition-all duration-300 shadow-lg ${
              isStartMenuOpen
                ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-5 h-5 md:w-6 md:h-6 bg-white rounded-lg flex items-center justify-center text-blue-600 text-xs md:text-sm font-bold shadow-sm">
              GS
            </div>
            <span className="text-white text-xs md:text-sm font-semibold hidden sm:block">Start</span>
          </motion.button>

          {/* Enhanced Taskbar Items with Mobile Optimization */}
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide max-w-full">
            {Object.entries(openWindows).map(([windowId, windowState]) => {
              const config = windowConfigs[windowId];
              const isFocused = focusedWindow === windowId;
              return (
                <motion.button
                  key={windowId}
                  onClick={() => openWindow(windowId)}
                  className={`flex items-center space-x-1 md:space-x-2 px-2 py-2 md:px-3 rounded-lg transition-all duration-300 relative min-w-max ${
                    minimizedWindows[windowId]
                      ? `${theme.colors.surface} ${theme.colors.textMuted} hover:bg-slate-700/50`
                      : isFocused
                      ? 'bg-blue-600/20 text-blue-200 border border-blue-500/30 shadow-md'
                      : `${theme.colors.surface} ${theme.colors.textSecondary} hover:bg-slate-700/30`
                  }`}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center flex-shrink-0">
                    {config.icon}
                  </div>
                  <span className="text-xs max-w-12 md:max-w-16 truncate hidden md:block font-medium">
                    {config.title.split(' - ')[0]}
                  </span>
                  {isFocused && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 md:w-6 h-0.5 bg-blue-400 rounded-full" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Professional Career Dashboard - Wider Layout */}
        <div className="flex items-center space-x-2">
          {/* Time Display */}
          {/* <motion.div
            className={`flex items-center ${theme.colors.cardBg} px-3 py-2 rounded-lg ${theme.colors.border} border shadow-sm`}
            whileHover={{ scale: 1.02 }}
          >
            <div className={`${theme.colors.text} text-sm font-bold font-mono mr-2`}>
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className={`${theme.colors.textMuted} text-xs font-mono`}>
              {currentTime.toLocaleTimeString([], { hour12: true }).split(' ')[1]}
            </div>
          </motion.div> */}

          {/* Wider Career Dashboard */}
          <SystemTray
            currentTime={currentTime}
            notifications={notifications}
            onDismissNotification={dismissNotification}
            onClearNotifications={clearAllNotifications}
            onOpenSettings={() => openWindow('settings')}
          />
        </div>
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