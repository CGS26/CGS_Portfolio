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

const WindowsSidebar = ({ currentTime, notifications, onDismissNotification, onClearNotifications, onOpenSettings }) => {
  const theme = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [wifiStrength, setWifiStrength] = useState(4);
  const [volume, setVolume] = useState(75);
  const [systemStats, setSystemStats] = useState({
    cpu: 45,
    memory: 62,
    disk: 78
  });

  useEffect(() => {
    // Simulate system stats updates
    const interval = setInterval(() => {
      setBatteryLevel(prev => Math.max(20, prev + (Math.random() - 0.5) * 2));
      setSystemStats({
        cpu: Math.floor(Math.random() * 30) + 30,
        memory: Math.floor(Math.random() * 20) + 50,
        disk: Math.floor(Math.random() * 10) + 75
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getBatteryColor = () => {
    if (batteryLevel > 50) return 'text-green-400';
    if (batteryLevel > 20) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getWifiBars = () => {
    return Array.from({ length: 4 }, (_, i) => (
      <div
        key={i}
        className={`w-1 bg-current ${
          i < wifiStrength ? 'opacity-100' : 'opacity-30'
        }`}
        style={{ height: `${(i + 1) * 3}px` }}
      />
    ));
  };

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

        {/* Sidebar toggle button - enhanced with Windows-like styling */}
        <motion.button
          onClick={toggleSidebar}
          className={`p-2 rounded-full transition-colors ${theme.colors.surfaceHover} ${isSidebarOpen ? 'bg-blue-500/20' : ''}`}
          whileHover={{ scale: 1.15, rotate: isSidebarOpen ? -10 : 10 }}
          whileTap={{ scale: 0.9 }}
          title="Show hidden system icons"
        >
          <Settings size={16} className={`${theme.colors.textSecondary} ${isSidebarOpen ? 'text-blue-400' : ''}`} />
          {notifications.length > 0 && (
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            />
          )}
        </motion.button>
      </div>

      {/* Windows-like Sidebar - Enhanced UI with Advanced Responsive Design */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className={`fixed inset-0 bg-black/50 z-40 md:hidden`} // Mobile backdrop
            onClick={toggleSidebar}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
        {isSidebarOpen && (
          <motion.div
            className={`fixed right-0 bottom-0 w-full h-full md:absolute md:right-2 md:bottom-12 md:w-full md:max-w-sm md:h-auto ${theme.colors.surface} backdrop-blur-xl rounded-xl shadow-2xl border ${theme.colors.border} z-50 overflow-y-auto md:overflow-hidden`}
            initial={{ opacity: 0, x: 30, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 30, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Windows-like Header with gradient */}
            <div className={`p-4 border-b ${theme.colors.border} bg-gradient-to-r from-blue-600/10 to-purple-600/10`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 6H11M6 1V11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h3 className={`${theme.colors.text} font-semibold text-sm md:text-base`}>System Tray</h3>
                </div>
                <motion.button
                  onClick={toggleSidebar}
                  className={`p-1 rounded ${theme.colors.surfaceHover} md:hidden`}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={18} className={theme.colors.textSecondary} />
                </motion.button>
              </div>
            </div>

            {/* Sidebar Content with Responsive Adjustments */}
            <div className="p-3 space-y-3 h-full overflow-y-auto">
              {/* System Icons - Enhanced Windows-like grid with Responsive Design */}
              <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-3">
                {/* WiFi - Enhanced */}
                <motion.div
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${theme.colors.surfaceHover} flex items-center space-x-3 hover:bg-blue-500/10`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  title="WiFi Connected"
                >
                  <div className="w-8 h-8 bg-blue-500/10 rounded flex items-end justify-center p-1">
                    <div className="flex items-end space-x-0.5 text-green-400">
                      {getWifiBars()}
                    </div>
                  </div>
                  <div>
                    <span className={`${theme.colors.text} text-sm font-medium`}>WiFi</span>
                    <span className={`${theme.colors.textMuted} text-xs block`}>Connected</span>
                  </div>
                </motion.div>

                {/* Bluetooth - Enhanced */}
                <motion.div
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${theme.colors.surfaceHover} flex items-center space-x-3 hover:bg-blue-500/10`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  title="Bluetooth On"
                >
                  <div className="w-8 h-8 bg-blue-500/10 rounded flex items-center justify-center">
                    <Bluetooth size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <span className={`${theme.colors.text} text-sm font-medium`}>Bluetooth</span>
                    <span className={`${theme.colors.textMuted} text-xs block`}>On</span>
                  </div>
                </motion.div>

                {/* Volume - Enhanced */}
                <motion.div
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${theme.colors.surfaceHover} flex items-center space-x-3 hover:bg-purple-500/10`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  title={`Volume: ${volume}%`}
                >
                  <div className="w-8 h-8 bg-purple-500/10 rounded flex items-center justify-center">
                    <Volume2 size={18} className="text-purple-400" />
                  </div>
                  <div>
                    <span className={`${theme.colors.text} text-sm font-medium`}>Volume</span>
                    <span className={`${theme.colors.textMuted} text-xs block`}>{volume}%</span>
                  </div>
                </motion.div>

                {/* Battery - Enhanced */}
                <motion.div
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${theme.colors.surfaceHover} flex items-center space-x-3 hover:bg-green-500/10`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  title={`Battery: ${Math.round(batteryLevel)}%`}
                >
                  <div className="w-8 h-8 bg-green-500/10 rounded flex items-center justify-center">
                    <div className="relative">
                      <Battery size={18} className={getBatteryColor()} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className={`w-2 h-1.5 ${getBatteryColor().replace('text-', 'bg-')} rounded-sm`}
                          style={{ width: `${batteryLevel * 0.1}px` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className={`${theme.colors.text} text-sm font-medium`}>Battery</span>
                    <span className={`${theme.colors.textMuted} text-xs block`}>{Math.round(batteryLevel)}%</span>
                  </div>
                </motion.div>
              </div>

              {/* System Performance Indicators - Enhanced */}
              <div className={`mt-4 p-3 rounded-lg ${theme.colors.border} border bg-gradient-to-r from-blue-500/5 to-purple-500/5`}>
                <h4 className={`${theme.colors.text} font-semibold text-sm mb-3 flex items-center space-x-2`}>
                  <span>System Performance</span>
                  <div className="w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 4H7M4 1V7" stroke="white" strokeWidth="1" strokeLinecap="round"/>
                    </svg>
                  </div>
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded hover:bg-blue-500/10 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-blue-500/10 rounded flex items-center justify-center">
                        <Cpu size={14} className="text-blue-400" />
                      </div>
                      <span className={`${theme.colors.text} text-sm font-medium`}>CPU Usage</span>
                    </div>
                    <div className="w-16 h-2 bg-slate-600/30 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-500 transition-all duration-500"
                        style={{ width: `${systemStats.cpu}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${systemStats.cpu}%` }}
                      />
                    </div>
                    <span className={`${theme.colors.text} text-sm font-bold`}>{systemStats.cpu}%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Monitor size={14} className="text-green-400" />
                      <span className={`${theme.colors.text} text-xs`}>Memory</span>
                    </div>
                    <div className="w-12 h-1 bg-slate-600 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-400 transition-all duration-500"
                        style={{ width: `${systemStats.memory}%` }}
                      />
                    </div>
                    <span className={`${theme.colors.text} text-xs`}>{systemStats.memory}%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <HardDrive size={14} className="text-purple-400" />
                      <span className={`${theme.colors.text} text-xs`}>Disk</span>
                    </div>
                    <div className="w-12 h-1 bg-slate-600 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-400 transition-all duration-500"
                        style={{ width: `${systemStats.disk}%` }}
                      />
                    </div>
                    <span className={`${theme.colors.text} text-xs`}>{systemStats.disk}%</span>
                  </div>
                </div>
              </div>

              {/* Theme Toggle - Simplified */}
              <motion.button
                onClick={theme.toggleTheme}
                className={`w-full p-3 rounded-lg transition-colors ${theme.colors.surfaceHover} flex items-center justify-center hover:bg-yellow-500/10`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                title="Toggle Theme"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-yellow-500/10 rounded flex items-center justify-center">
                    <Sun size={18} className="text-yellow-400" />
                  </div>
                  <motion.div
                    className="w-12 h-6 bg-slate-600 rounded-full p-0.5 flex items-center"
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.div
                      className="w-5 h-5 bg-white rounded-full"
                      layout
                      transition={{ type: "spring", stiffness: 700, damping: 30 }}
                      animate={{ x: theme.isDarkMode ? 20 : 0 }}
                    />
                  </motion.div>
                  <div className="w-8 h-8 bg-slate-600/10 rounded flex items-center justify-center">
                    <Moon size={18} className="text-slate-400" />
                  </div>
                </div>
              </motion.button>

              {/* Settings */}
              <motion.button
                onClick={onOpenSettings}
                className={`w-full p-2 rounded transition-colors ${theme.colors.surfaceHover} flex items-center space-x-2`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Settings"
              >
                <Settings size={14} className={theme.colors.textSecondary} />
                <span className={`${theme.colors.text} text-xs`}>Settings</span>
              </motion.button>

              {/* Notifications Section */}
              <div className={`mt-3 p-2 rounded-lg ${theme.colors.border} border`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`${theme.colors.text} font-semibold text-xs`}>Notifications</h4>
                  {notifications.length > 0 && (
                    <button
                      onClick={onClearNotifications}
                      className={`${theme.colors.textMuted} ${theme.colors.text} text-xs transition-colors`}
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {notifications.length === 0 ? (
                  <div className={`p-4 text-center ${theme.colors.textMuted}`}>
                    <Bell size={24} className="mx-auto mb-2 opacity-50" />
                    <p className="text-xs">No notifications</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                    {notifications.slice(0, 3).map((notification) => (
                      <motion.div
                        key={notification.id}
                        className={`p-2 rounded border ${getNotificationColor(notification.type)} relative`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        layout
                      >
                        <div className="flex items-start space-x-2">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1 min-w-0">
                            <h5 className={`${theme.colors.text} text-xs font-medium`}>
                              {notification.title}
                            </h5>
                            <p className={`${theme.colors.textSecondary} text-xs mt-1`}>
                              {notification.message}
                            </p>
                            <p className={`${theme.colors.textMuted} text-xs mt-1`}>
                              {notification.timestamp}
                            </p>
                          </div>
                          <button
                            onClick={() => onDismissNotification(notification.id)}
                            className={`p-1 ${theme.colors.surfaceHover} rounded transition-all`}
                          >
                            <X size={12} className={theme.colors.textMuted} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                    {notifications.length > 3 && (
                      <div className="text-center text-xs text-blue-400 cursor-pointer hover:underline">
                        + {notifications.length - 3} more
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SystemTray = WindowsSidebar;
export default SystemTray;