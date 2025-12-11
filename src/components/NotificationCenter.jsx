import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Bell, X, Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

const NotificationCenter = ({ notifications, onDismiss, onClearAll }) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle size={20} className="text-green-400" />;
      case 'warning': return <AlertTriangle size={20} className="text-yellow-400" />;
      case 'error': return <XCircle size={20} className="text-red-400" />;
      default: return <Info size={20} className="text-blue-400" />;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'success': return 'border-green-500/30 bg-green-500/10';
      case 'warning': return 'border-yellow-500/30 bg-yellow-500/10';
      case 'error': return 'border-red-500/30 bg-red-500/10';
      default: return 'border-blue-500/30 bg-blue-500/10';
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-1.5 rounded-lg transition-colors ${theme.colors.surfaceHover}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bell size={14} className={theme.colors.textSecondary} />
        {notifications.length > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">
              {notifications.length > 9 ? '9+' : notifications.length}
            </span>
          </div>
        )}
      </motion.button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Notification Panel */}
            <motion.div
              className={`absolute right-0 top-12 w-80 max-h-96 ${theme.colors.surface} backdrop-blur-md rounded-lg shadow-2xl border ${theme.colors.border} z-50`}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header */}
              <div className={`p-4 border-b ${theme.colors.border}`}>
                <div className="flex items-center justify-between">
                  <h3 className={`${theme.colors.text} font-semibold`}>Notifications</h3>
                  {notifications.length > 0 && (
                    <button
                      onClick={onClearAll}
                      className={`${theme.colors.textMuted} ${theme.colors.text} text-sm transition-colors`}
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>

              {/* Notifications List */}
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className={`p-8 text-center ${theme.colors.textMuted}`}>
                    <Bell size={32} className="mx-auto mb-2 opacity-50" />
                    <p>No notifications</p>
                  </div>
                ) : (
                  <div className="p-2">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        className={`p-3 mb-2 rounded-lg border ${getColor(notification.type)} relative group`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        layout
                      >
                        <div className="flex items-start space-x-3">
                          {getIcon(notification.type)}
                          <div className="flex-1 min-w-0">
                            <h4 className={`${theme.colors.text} text-sm font-medium`}>
                              {notification.title}
                            </h4>
                            <p className={`${theme.colors.textSecondary} text-xs mt-1`}>
                              {notification.message}
                            </p>
                            <p className={`${theme.colors.textMuted} text-xs mt-2`}>
                              {notification.timestamp}
                            </p>
                          </div>
                          <button
                            onClick={() => onDismiss(notification.id)}
                            className={`opacity-0 group-hover:opacity-100 p-1 ${theme.colors.surfaceHover} rounded transition-all`}
                          >
                            <X size={14} className={theme.colors.textMuted} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;