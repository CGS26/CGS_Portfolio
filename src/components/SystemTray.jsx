import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import {
  Battery,
  Volume2,
  Bluetooth,
  Settings,
  Moon,
  Sun,
  Monitor,
  Cpu,
  HardDrive,
  ChevronRight,
  ChevronLeft,
  Bell,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  X
} from 'lucide-react';
import NotificationCenter from './NotificationCenter';

const ProfessionalDashboard = ({ currentTime, notifications, onDismissNotification, onClearNotifications, onOpenSettings }) => {
  const theme = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Professional metrics that update dynamically
  const [careerStats, setCareerStats] = useState({
    projectsCompleted: 15,
    skillsMastered: 20,
    yearsExperience: 3,
    certifications: 5,
    githubCommits: 450,
    linkedinConnections: 280
  });

  useEffect(() => {
    // Simulate dynamic updates for engagement
    const interval = setInterval(() => {
      setCareerStats(prev => ({
        ...prev,
        githubCommits: prev.githubCommits + Math.floor(Math.random() * 3),
        linkedinConnections: prev.linkedinConnections + Math.floor(Math.random() * 2)
      }));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle size={16} className="text-green-400" />;
      case 'warning': return <AlertTriangle size={16} className="text-yellow-400" />;
      case 'error': return <XCircle size={16} className="text-red-400" />;
      default: return <Info size={16} className="text-blue-400" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success': return 'border-green-500/30 bg-green-500/10';
      case 'warning': return 'border-yellow-500/30 bg-yellow-500/10';
      case 'error': return 'border-red-500/30 bg-red-500/10';
      default: return 'border-blue-500/30 bg-blue-500/10';
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      {/* Windows-like Taskbar - only time visible */}
      <div className="flex items-center space-x-2">
        {/* Time and Date - Windows style with enhanced UI */}
        <motion.div
          className={`flex items-center ${theme.colors.surface} px-3 py-1.5 rounded-lg ${theme.colors.border} border shadow-sm`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <div className={`${theme.colors.text} text-sm font-bold font-mono mr-2`}>
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className={`${theme.colors.textMuted} text-xs font-mono`}>
            {currentTime.toLocaleTimeString([], { hour12: true }).split(' ')[1]}
          </div>
        </motion.div>

        {/* Professional Career Dashboard Toggle */}
        <motion.button
          onClick={toggleSidebar}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 shadow-lg ${
            isSidebarOpen
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
              : 'bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-slate-200'
          }`}
          whileHover={{ scale: 1.05, y: -1 }}
          whileTap={{ scale: 0.95 }}
          title="Open Career Dashboard"
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <Settings size={18} className={isSidebarOpen ? 'text-white' : 'text-slate-300'} />
          </div>
          <span className="text-sm font-medium hidden sm:block">Dashboard</span>
          {notifications.length > 0 && (
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-slate-800"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
            >
              <span className="text-xs text-white font-bold leading-none">{notifications.length}</span>
            </motion.div>
          )}
        </motion.button>
      </div>

      {/* Professional Career Dashboard - Storyboard Style */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={toggleSidebar}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
        {isSidebarOpen && (
                   <motion.div
            className={`fixed right-0 bottom-0 w-full h-full md:absolute md:right-2 md:bottom-12 md:w-[95vw] md:max-w-none md:h-[85vh] backdrop-blur-xl rounded-2xl shadow-2xl border z-50 overflow-hidden ${
              theme.isDarkMode
                ? 'bg-gradient-to-br from-slate-900/98 to-slate-800/98 border-slate-700/60'
                : 'bg-gradient-to-br from-white/98 to-slate-50/98 border-slate-200/60'
            }`}
            initial={{ opacity: 0, x: 50, scale: 0.9, rotateY: 15 }}
            animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, x: 50, scale: 0.9, rotateY: -15 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Professional Header */}
            <div className={`p-4 border-b ${
              theme.isDarkMode
                ? 'bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 border-slate-700/60'
                : 'bg-gradient-to-r from-blue-500/15 via-indigo-500/15 to-purple-500/15 border-slate-200/60'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">GS</span>
                  </div>
                  <div>
                    <h3 className={`${theme.isDarkMode ? 'text-white' : 'text-slate-900'} font-bold text-lg`}>Career Dashboard</h3>
                    <p className={`${theme.isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>Professional Journey</p>
                  </div>
                </div>
                <motion.button
                  onClick={toggleSidebar}
                  className="p-2 rounded-xl bg-slate-700/50 hover:bg-slate-600/50 transition-colors md:hidden"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} className="text-slate-300" />
                </motion.button>
              </div>
            </div>

            {/* Career Storyboard Content */}
            <div className="p-4 space-y-4 h-full overflow-y-auto max-h-[70vh] md:max-h-[500px]">

              {/* Current Status */}
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-3 border border-green-500/20">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h4 className="text-green-400 font-semibold text-sm">Available for Opportunities</h4>
                    <p className={`text-xs ${theme.isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Open to new challenges</p>
                  </div>
                </div>
                <div className={`text-sm ${theme.isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Ready to bring innovation and expertise to your next project
                </div>
              </div>

              {/* Career Metrics Grid */}
              <div className="grid grid-cols-2 gap-3">
                <motion.div
                  className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg p-3 border border-blue-500/20 hover:border-blue-400/40 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-5 h-5 bg-blue-500/20 rounded flex items-center justify-center">
                      <span className="text-blue-400 text-xs font-bold">📊</span>
                    </div>
                    <span className="text-blue-400 text-xs font-medium truncate">Experience</span>
                  </div>
                  <div className={`text-xl font-bold ${theme.isDarkMode ? 'text-white' : 'text-slate-900'}`}>{careerStats.yearsExperience}+</div>
                  <div className={`text-xs ${theme.isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Years</div>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg p-3 border border-purple-500/20 hover:border-purple-400/40 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-5 h-5 bg-purple-500/20 rounded flex items-center justify-center">
                      <span className="text-purple-400 text-xs font-bold">🚀</span>
                    </div>
                    <span className="text-purple-400 text-xs font-medium truncate">Projects</span>
                  </div>
                  <div className={`text-xl font-bold ${theme.isDarkMode ? 'text-white' : 'text-slate-900'}`}>{careerStats.projectsCompleted}+</div>
                  <div className={`text-xs ${theme.isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Completed</div>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 rounded-lg p-3 border border-cyan-500/20 hover:border-cyan-400/40 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-5 h-5 bg-cyan-500/20 rounded flex items-center justify-center">
                      <span className="text-cyan-400 text-xs font-bold">🛠️</span>
                    </div>
                    <span className="text-cyan-400 text-xs font-medium truncate">Skills</span>
                  </div>
                  <div className={`text-xl font-bold ${theme.isDarkMode ? 'text-white' : 'text-slate-900'}`}>{careerStats.skillsMastered}+</div>
                  <div className={`text-xs ${theme.isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Mastered</div>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-lg p-3 border border-orange-500/20 hover:border-orange-400/40 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-5 h-5 bg-orange-500/20 rounded flex items-center justify-center">
                      <span className="text-orange-400 text-xs font-bold">🏆</span>
                    </div>
                    <span className="text-orange-400 text-xs font-medium truncate">Awards</span>
                  </div>
                  <div className={`text-xl font-bold ${theme.isDarkMode ? 'text-white' : 'text-slate-900'}`}>{careerStats.certifications}+</div>
                  <div className={`text-xs ${theme.isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Certifications</div>
                </motion.div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <h4 className={`${theme.isDarkMode ? 'text-slate-300' : 'text-slate-700'} font-semibold text-sm mb-3`}>Quick Actions</h4>

                <motion.button
                  onClick={() => window.open('mailto:gaurav@example.com', '_blank')}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white p-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">✉️</span>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Send Message</div>
                    <div className="text-xs opacity-90">Let's discuss opportunities</div>
                  </div>
                </motion.button>

                <motion.button
                  onClick={() => window.open('https://linkedin.com/in/gaurav-sushant', '_blank')}
                  className="w-full bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-700 hover:to-blue-800 text-white p-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">💼</span>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Connect on LinkedIn</div>
                    <div className="text-xs opacity-90">{careerStats.linkedinConnections} connections</div>
                  </div>
                </motion.button>

                <motion.button
                  onClick={() => window.open('https://github.com/CGS26', '_blank')}
                  className="w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white p-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">💻</span>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">View GitHub</div>
                    <div className="text-xs opacity-90">{careerStats.githubCommits} commits</div>
                  </div>
                </motion.button>
              </div>

              {/* Recent Activity */}
              <div className={`rounded-lg p-3 border ${
                theme.isDarkMode ? 'bg-slate-800/50 border-slate-600/30' : 'bg-slate-50/50 border-slate-200/30'
              }`}>
                <h4 className={`${theme.isDarkMode ? 'text-slate-300' : 'text-slate-700'} font-semibold text-sm mb-3 flex items-center space-x-2`}>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Recent Activity</span>
                </h4>
                <div className="space-y-2 text-sm">
                  <div className={`flex items-center space-x-2 ${theme.isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                    <span>Completed IDS research project</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${theme.isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                    <span>Earned Deep Learning certification</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${theme.isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                    <span>Published research paper</span>
                  </div>
                </div>
              </div>

              {/* Theme Toggle */}
              <motion.button
                onClick={theme.toggleTheme}
                className="w-full p-4 rounded-xl bg-gradient-to-r from-slate-700/50 to-slate-600/50 hover:from-slate-600/50 hover:to-slate-500/50 transition-all duration-300 flex items-center justify-center space-x-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <Sun size={18} className="text-yellow-400" />
                </div>
                <span className={`${theme.isDarkMode ? 'text-slate-300' : 'text-slate-700'} font-medium`}>Toggle Theme</span>
                <div className="w-8 h-8 bg-slate-600/50 rounded-lg flex items-center justify-center">
                  <Moon size={18} className="text-slate-400" />
                </div>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SystemTray = ProfessionalDashboard;
export default SystemTray;