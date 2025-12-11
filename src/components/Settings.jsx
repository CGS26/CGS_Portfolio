import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Monitor, 
  Palette, 
  Volume2, 
  Wifi, 
  Battery, 
  User, 
  Shield, 
  HardDrive,
  Bell,
  Keyboard,
  Mouse,
  Bluetooth
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('system');

  const settingsTabs = [
    { id: 'system', label: 'System', icon: <Monitor size={20} /> },
    { id: 'personalization', label: 'Personalization', icon: <Palette size={20} /> },
    { id: 'accounts', label: 'Accounts', icon: <User size={20} /> },
    { id: 'privacy', label: 'Privacy', icon: <Shield size={20} /> },
    { id: 'devices', label: 'Devices', icon: <Mouse size={20} /> },
    { id: 'network', label: 'Network', icon: <Wifi size={20} /> }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'system':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">System Information</h3>
              <div className="bg-slate-700/30 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-300">OS Version:</span>
                  <span className="text-white">Gaurav OS v2024.12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Processor:</span>
                  <span className="text-white">Brain.exe (64-bit)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Memory:</span>
                  <span className="text-white">∞ GB RAM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Storage:</span>
                  <span className="text-white">Unlimited SSD</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Performance</h3>
              <div className="bg-slate-700/30 rounded-lg p-4 space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-300">CPU Usage</span>
                    <span className="text-blue-400">45%</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-300">Memory Usage</span>
                    <span className="text-green-400">62%</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'personalization':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Theme</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-700/30 rounded-lg p-4 border-2 border-blue-500">
                  <div className="w-full h-20 bg-gradient-to-br from-indigo-900 to-slate-900 rounded mb-2"></div>
                  <span className="text-white text-sm">Dark Theme (Active)</span>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-4 border-2 border-transparent hover:border-slate-500 cursor-pointer">
                  <div className="w-full h-20 bg-gradient-to-br from-blue-200 to-white rounded mb-2"></div>
                  <span className="text-slate-300 text-sm">Light Theme</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Background</h3>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <p className="text-slate-300 text-sm">Current: Dynamic Gradient Wallpaper</p>
                <button className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white text-sm transition-colors">
                  Change Background
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'accounts':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">User Account</h3>
              <div className="bg-slate-700/30 rounded-lg p-4 flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  GS
                </div>
                <div>
                  <h4 className="text-white font-semibold">Gaurav Sushant</h4>
                  <p className="text-slate-300 text-sm">gauravsushant267@gmail.com</p>
                  <p className="text-slate-400 text-xs">Administrator</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Account Settings</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg transition-colors">
                  <span className="text-white">Change Password</span>
                </button>
                <button className="w-full text-left p-3 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg transition-colors">
                  <span className="text-white">Privacy Settings</span>
                </button>
                <button className="w-full text-left p-3 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg transition-colors">
                  <span className="text-white">Security Options</span>
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <Monitor size={48} className="mx-auto" />
            </div>
            <h3 className="text-white text-lg mb-2">Settings Panel</h3>
            <p className="text-slate-400">Select a category from the sidebar to view settings.</p>
          </div>
        );
    }
  };

  return (
    <div className="h-full bg-slate-900/30 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800/50 border-r border-slate-600/30 p-4">
        <h2 className="text-white text-xl font-bold mb-6">Settings</h2>
        <nav className="space-y-2">
          {settingsTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
              }`}
            >
              {tab.icon}
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;