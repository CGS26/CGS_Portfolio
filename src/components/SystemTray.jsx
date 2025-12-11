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
        {/* Time and Date - Windows style */}
        <div className={`flex items-center ${theme.colors.surface} px-3 py-1 rounded-lg ${theme.colors.border} border`}>
          <div className={`${theme.colors.text} text-sm font-bold font-mono`}>
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

        {/* Sidebar toggle button - changed to meaningful Settings icon */}
        <motion.button
          onClick={toggleSidebar}
          className={`p-1.5 rounded transition-colors ${theme.colors.surfaceHover}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Show hidden system icons"
        >
          <Settings size={14} className={theme.colors.textSecondary} />
        </motion.button>
      </div>

      {/* Windows-like Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className={`absolute right-0 bottom-12 w-64 ${theme.colors.surface} backdrop-blur-md rounded-lg shadow-2xl border ${theme.colors.border} z-50`}
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Sidebar Header */}
            <div className={`p-3 border-b ${theme.colors.border}`}>
              <div className="flex items-center justify-between">
                <h3 className={`${theme.colors.text} font-semibold text-sm`}>Hidden Icons</h3>
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="p-3 space-y-2">
              {/* System Icons */}
              <div className="grid grid-cols-2 gap-2">
                {/* WiFi */}
                <motion.div
                  className={`p-2 rounded cursor-pointer transition-colors ${theme.colors.surfaceHover} flex items-center space-x-2`}
                  whileHover={{ scale: 1.05 }}
                  title="WiFi Connected"
                >
                  <div className="flex items-end space-x-0.5 text-green-400">
                    {getWifiBars()}
                  </div>
                  <span className={`${theme.colors.text} text-xs`}>WiFi</span>
                </motion.div>

                {/* Bluetooth */}
                <motion.div
                  className={`p-2 rounded cursor-pointer transition-colors ${theme.colors.surfaceHover} flex items-center space-x-2`}
                  whileHover={{ scale: 1.05 }}
                  title="Bluetooth On"
                >
                  <Bluetooth size={14} className="text-blue-400" />
                  <span className={`${theme.colors.text} text-xs`}>Bluetooth</span>
                </motion.div>

                {/* Volume */}
                <motion.div
                  className={`p-2 rounded cursor-pointer transition-colors ${theme.colors.surfaceHover} flex items-center space-x-2`}
                  whileHover={{ scale: 1.05 }}
                  title={`Volume: ${volume}%`}
                >
                  <Volume2 size={14} className={theme.colors.textSecondary} />
                  <span className={`${theme.colors.text} text-xs`}>Volume</span>
                </motion.div>

                {/* Battery */}
                <motion.div
                  className={`p-2 rounded cursor-pointer transition-colors ${theme.colors.surfaceHover} flex items-center space-x-2`}
                  whileHover={{ scale: 1.05 }}
                  title={`Battery: ${Math.round(batteryLevel)}%`}
                >
                  <div className="relative">
                    <Battery size={14} className={getBatteryColor()} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className={`w-2 h-1 ${getBatteryColor().replace('text-', 'bg-')} rounded-sm`}
                        style={{ width: `${batteryLevel * 0.08}px` }}
                      />
                    </div>
                  </div>
                  <span className={`${theme.colors.text} text-xs`}>Battery</span>
                </motion.div>
              </div>

              {/* System Performance Indicators */}
              <div className={`mt-3 p-2 rounded-lg ${theme.colors.border} border`}>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Cpu size={14} className="text-blue-400" />
                      <span className={`${theme.colors.text} text-xs`}>CPU</span>
                    </div>
                    <div className="w-12 h-1 bg-slate-600 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-400 transition-all duration-500"
                        style={{ width: `${systemStats.cpu}%` }}
                      />
                    </div>
                    <span className={`${theme.colors.text} text-xs`}>{systemStats.cpu}%</span>
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

              {/* Theme Toggle */}
              <motion.button
                onClick={theme.toggleTheme}
                className={`w-full p-2 rounded transition-colors ${theme.colors.surfaceHover} flex items-center justify-between`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Toggle Theme"
              >
                <div className="flex items-center space-x-2">
                  {theme.isDarkMode ? (
                    <Sun size={16} className="text-yellow-400" />
                  ) : (
                    <Moon size={16} className="text-slate-400" />
                  )}
                  <span className={`${theme.colors.text} text-xs`}>Theme</span>
                </div>
                <span className={`${theme.colors.text} text-xs`}>
                  {theme.isDarkMode ? 'Light' : 'Dark'}
                </span>
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
                  <div className="space-y-2 max-h-40 overflow-y-auto">
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