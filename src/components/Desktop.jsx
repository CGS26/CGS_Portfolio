import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Code, 
  Briefcase, 
  Award, 
  Mail, 
  Folder,
  Terminal as TerminalIcon,
  FileText,
  Database
} from 'lucide-react';
import WindowManager from './WindowManager';
import StartMenu from './StartMenu';
import About from './About';
import Skills from './Skills';
import Experience from './Experience';
import Projects from './Projects';
import Awards from './Awards';
import Contact from './Contact';
import Terminal from './Terminal';

const Desktop = () => {
  const [openWindows, setOpenWindows] = useState({});
  const [minimizedWindows, setMinimizedWindows] = useState({});
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [windowZIndex, setWindowZIndex] = useState(10);
  const [currentTime, setCurrentTime] = useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const desktopIcons = [
    { id: 'about', title: 'About.exe', icon: <User size={24} />, position: { x: 50, y: 100 } },
    { id: 'skills', title: 'Skills.exe', icon: <Code size={24} />, position: { x: 50, y: 200 } },
    { id: 'experience', title: 'Work.exe', icon: <Briefcase size={24} />, position: { x: 50, y: 300 } },
    { id: 'projects', title: 'Projects', icon: <Folder size={24} />, position: { x: 150, y: 100 } },
    { id: 'awards', title: 'Awards.exe', icon: <Award size={24} />, position: { x: 150, y: 200 } },
    { id: 'contact', title: 'Mail.exe', icon: <Mail size={24} />, position: { x: 150, y: 300 } },
    { id: 'terminal', title: 'Terminal', icon: <TerminalIcon size={24} />, position: { x: 250, y: 100 } },
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
      component: Terminal,
      size: { width: 800, height: 600 }
    }
  };

  const openWindow = (windowId) => {
    if (!openWindows[windowId]) {
      const newZIndex = windowZIndex + 1;
      setWindowZIndex(newZIndex);
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
    } else {
      // Bring to front
      const newZIndex = windowZIndex + 1;
      setWindowZIndex(newZIndex);
      setOpenWindows(prev => ({
        ...prev,
        [windowId]: { ...prev[windowId], zIndex: newZIndex }
      }));
      setMinimizedWindows(prev => ({ ...prev, [windowId]: false }));
    }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Desktop Background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-blue-900/30 to-slate-800/50"></div>
      </div>

      {/* Desktop Icons */}
      {desktopIcons.map((icon) => (
        <motion.div
          key={icon.id}
          className="fixed cursor-pointer group"
          style={{ left: icon.position.x, top: icon.position.y }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onDoubleClick={() => openWindow(icon.id)}
        >
          <div className="flex flex-col items-center p-2 rounded-lg group-hover:bg-white/10 transition-colors">
            <div className="w-12 h-12 bg-slate-700/80 backdrop-blur-sm rounded-lg flex items-center justify-center mb-2 text-white shadow-lg">
              {icon.icon}
            </div>
            <span className="text-white text-xs font-mono text-center max-w-16 leading-tight">
              {icon.title}
            </span>
          </div>
        </motion.div>
      ))}

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
            isMinimized={minimizedWindows[windowId]}
            zIndex={windowState.zIndex}
          >
            <Component />
          </WindowManager>
        );
      })}

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-slate-800/90 backdrop-blur-md border-t border-slate-600/50 flex items-center justify-between px-4 z-30">
        <div className="flex items-center space-x-4">
          {/* Start Button */}
          <motion.button
            onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
            className="flex items-center space-x-2 px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-6 h-6 bg-blue-600 rounded-sm flex items-center justify-center text-white text-xs font-bold">
              GS
            </div>
            <span className="text-slate-300 text-sm font-mono">Start</span>
          </motion.button>

          {/* Taskbar Items */}
          <div className="flex space-x-2">
            {Object.entries(openWindows).map(([windowId, windowState]) => {
              const config = windowConfigs[windowId];
              return (
                <motion.button
                  key={windowId}
                  onClick={() => openWindow(windowId)}
                  className={`flex items-center space-x-2 px-3 py-1 rounded transition-colors ${
                    minimizedWindows[windowId] 
                      ? 'bg-slate-600 text-slate-400' 
                      : 'bg-slate-700 text-slate-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {config.icon}
                  <span className="text-xs font-mono max-w-24 truncate">
                    {config.title.split(' - ')[0]}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
        
        {/* System Tray */}
        <div className="flex items-center space-x-4">
          <div className="text-slate-300 text-sm font-mono">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="text-slate-300 text-sm font-mono">
            {currentTime.toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Start Menu */}
      <StartMenu 
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
        onOpenWindow={openWindow}
      />
    </div>
  );
};

export default Desktop;