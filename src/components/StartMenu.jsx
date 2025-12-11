import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  User, 
  Code, 
  Briefcase, 
  Award, 
  Mail, 
  FileText,
  Settings,
  Power,
  Folder,
  Terminal
} from 'lucide-react';

const StartMenu = ({ isOpen, onClose, onOpenWindow }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const menuItems = [
    { id: 'about', title: 'About Me', icon: <User size={20} />, description: 'Personal information and background' },
    { id: 'skills', title: 'Skills', icon: <Code size={20} />, description: 'Technical skills and expertise' },
    { id: 'experience', title: 'Experience', icon: <Briefcase size={20} />, description: 'Work history and roles' },
    { id: 'projects', title: 'Projects', icon: <Folder size={20} />, description: 'Portfolio and research work' },
    { id: 'awards', title: 'Awards', icon: <Award size={20} />, description: 'Achievements and recognition' },
    { id: 'contact', title: 'Contact', icon: <Mail size={20} />, description: 'Get in touch with me' },
    { id: 'terminal', title: 'Terminal', icon: <Terminal size={20} />, description: 'Command line interface' },
    { id: 'settings', title: 'Settings', icon: <Settings size={20} />, description: 'System configuration and preferences' },
  ];

  const filteredItems = menuItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemClick = (item) => {
    onOpenWindow(item.id);
    onClose();
    setSearchTerm('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Start Menu */}
          <motion.div
            className="fixed bottom-12 left-4 w-80 bg-slate-800/95 backdrop-blur-md rounded-lg shadow-2xl border border-slate-600/50 z-50"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-600/50">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                  GS
                </div>
                <div>
                  <div className="text-slate-200 font-mono text-sm font-semibold">Gaurav Sushant</div>
                  <div className="text-slate-400 font-mono text-xs">Software Engineer</div>
                </div>
              </div>
              
              {/* Search */}
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded text-slate-200 font-mono text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            
            {/* Menu Items */}
            <div className="p-2 max-h-96 overflow-y-auto">
              {filteredItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="w-full flex items-center space-x-3 p-3 rounded hover:bg-slate-700/50 transition-colors text-left"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="w-8 h-8 bg-slate-600 rounded flex items-center justify-center text-slate-300">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-slate-200 font-mono text-sm font-semibold">{item.title}</div>
                    <div className="text-slate-400 font-mono text-xs">{item.description}</div>
                  </div>
                </motion.button>
              ))}
              
              {filteredItems.length === 0 && (
                <div className="text-center py-8 text-slate-400 font-mono text-sm">
                  No applications found
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="p-2 border-t border-slate-600/50 flex justify-between">
              <button className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-slate-700/50 transition-colors">
                <Settings size={16} className="text-slate-400" />
                <span className="text-slate-300 font-mono text-xs">Settings</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-slate-700/50 transition-colors">
                <Power size={16} className="text-slate-400" />
                <span className="text-slate-300 font-mono text-xs">Shutdown</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default StartMenu;