import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Wifi, 
  Battery, 
  Volume2, 
  Bluetooth, 
  Settings, 
  Moon, 
  Sun,
  Monitor,
  Cpu,
  HardDrive
} from 'lucide-react';
import NotificationCenter from './NotificationCenter';

const SystemTray = ({ currentTime, notifications, onDismissNotification, onClearNotifications, onOpenSettings }) => {
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [wifiStrength, setWifiStrength] = useState(4);
  const [volume, setVolume] = useState(75);
  const [isDarkMode, setIsDarkMode] = useState(true);
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

  return (
    <div className="flex items-center space-x-4">
      {/* System Performance Indicators */}
      <div className="hidden md:flex items-center space-x-3 bg-slate-800/50 px-3 py-1 rounded-lg border border-slate-600/30">
        <div className="flex items-center space-x-1" title={`CPU: ${systemStats.cpu}%`}>
          <Cpu size={14} className="text-blue-400" />
          <div className="w-8 h-1 bg-slate-600 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-400 transition-all duration-500"
              style={{ width: `${systemStats.cpu}%` }}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-1" title={`Memory: ${systemStats.memory}%`}>
          <Monitor size={14} className="text-green-400" />
          <div className="w-8 h-1 bg-slate-600 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-400 transition-all duration-500"
              style={{ width: `${systemStats.memory}%` }}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-1" title={`Disk: ${systemStats.disk}%`}>
          <HardDrive size={14} className="text-purple-400" />
          <div className="w-8 h-1 bg-slate-600 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-400 transition-all duration-500"
              style={{ width: `${systemStats.disk}%` }}
            />
          </div>
        </div>
      </div>

      {/* System Icons */}
      <div className="flex items-center space-x-2">
        {/* WiFi */}
        <motion.div 
          className="p-2 rounded hover:bg-slate-700/50 cursor-pointer transition-colors"
          whileHover={{ scale: 1.1 }}
          title="WiFi Connected"
        >
          <div className="flex items-end space-x-0.5 text-green-400">
            {getWifiBars()}
          </div>
        </motion.div>

        {/* Bluetooth */}
        <motion.div 
          className="p-2 rounded hover:bg-slate-700/50 cursor-pointer transition-colors"
          whileHover={{ scale: 1.1 }}
          title="Bluetooth On"
        >
          <Bluetooth size={16} className="text-blue-400" />
        </motion.div>

        {/* Volume */}
        <motion.div 
          className="p-2 rounded hover:bg-slate-700/50 cursor-pointer transition-colors"
          whileHover={{ scale: 1.1 }}
          title={`Volume: ${volume}%`}
        >
          <Volume2 size={16} className="text-slate-300" />
        </motion.div>

        {/* Battery */}
        <motion.div 
          className="p-2 rounded hover:bg-slate-700/50 cursor-pointer transition-colors"
          whileHover={{ scale: 1.1 }}
          title={`Battery: ${Math.round(batteryLevel)}%`}
        >
          <div className="relative">
            <Battery size={16} className={getBatteryColor()} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className={`w-2 h-1 ${getBatteryColor().replace('text-', 'bg-')} rounded-sm`}
                style={{ width: `${batteryLevel * 0.08}px` }}
              />
            </div>
          </div>
        </motion.div>

        {/* Theme Toggle */}
        <motion.button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded hover:bg-slate-700/50 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Toggle Theme"
        >
          {isDarkMode ? (
            <Sun size={16} className="text-yellow-400" />
          ) : (
            <Moon size={16} className="text-slate-400" />
          )}
        </motion.button>

        {/* Notifications */}
        <NotificationCenter 
          notifications={notifications}
          onDismiss={onDismissNotification}
          onClearAll={onClearNotifications}
        />

        {/* Settings */}
        <motion.button
          onClick={onOpenSettings}
          className="p-2 rounded hover:bg-slate-700/50 transition-colors"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.95 }}
          title="Settings"
        >
          <Settings size={16} className="text-slate-300" />
        </motion.button>
      </div>
      
      {/* Time and Date */}
      <div className="flex flex-col items-end bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-600/30">
        <div className="text-white text-sm font-bold font-mono">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className="text-slate-400 text-xs font-mono">
          {currentTime.toLocaleDateString([], { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          })}
        </div>
      </div>
    </div>
  );
};

export default SystemTray;