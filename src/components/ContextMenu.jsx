import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Copy, 
  Scissors, 
  Clipboard, 
  Trash2, 
  Edit, 
  Info, 
  Folder, 
  FileText,
  Settings,
  RotateCcw,
  Monitor,
  Palette
} from 'lucide-react';

const ContextMenu = ({ isOpen, position, onClose, type = 'desktop', target }) => {
  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) onClose();
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const getMenuItems = () => {
    switch (type) {
      case 'desktop':
        return [
          { icon: <RotateCcw size={16} />, label: 'Refresh', action: () => window.location.reload() },
          { divider: true },
          { icon: <Folder size={16} />, label: 'New Folder', action: () => console.log('New folder') },
          { icon: <FileText size={16} />, label: 'New Document', action: () => console.log('New document') },
          { divider: true },
          { icon: <Clipboard size={16} />, label: 'Paste', action: () => console.log('Paste'), disabled: true },
          { divider: true },
          { icon: <Monitor size={16} />, label: 'Display Settings', action: () => console.log('Display settings') },
          { icon: <Palette size={16} />, label: 'Personalize', action: () => console.log('Personalize') },
          { icon: <Settings size={16} />, label: 'System Settings', action: () => console.log('Settings') }
        ];
      
      case 'window':
        return [
          { icon: <Copy size={16} />, label: 'Copy', action: () => console.log('Copy') },
          { icon: <Scissors size={16} />, label: 'Cut', action: () => console.log('Cut') },
          { icon: <Clipboard size={16} />, label: 'Paste', action: () => console.log('Paste') },
          { divider: true },
          { icon: <Edit size={16} />, label: 'Edit', action: () => console.log('Edit') },
          { icon: <Trash2 size={16} />, label: 'Delete', action: () => console.log('Delete') },
          { divider: true },
          { icon: <Info size={16} />, label: 'Properties', action: () => console.log('Properties') }
        ];
      
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed z-50 bg-slate-800/95 backdrop-blur-md rounded-lg shadow-2xl border border-slate-600/50 py-2 min-w-48"
          style={{
            left: position.x,
            top: position.y,
          }}
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.15 }}
          onClick={(e) => e.stopPropagation()}
        >
          {menuItems.map((item, index) => (
            item.divider ? (
              <div key={index} className="h-px bg-slate-600/50 my-1 mx-2" />
            ) : (
              <motion.button
                key={index}
                onClick={() => {
                  if (!item.disabled) {
                    item.action();
                    onClose();
                  }
                }}
                className={`w-full flex items-center space-x-3 px-4 py-2 text-left transition-colors ${
                  item.disabled 
                    ? 'text-slate-500 cursor-not-allowed' 
                    : 'text-slate-200 hover:bg-slate-700/50 hover:text-white'
                }`}
                whileHover={!item.disabled ? { backgroundColor: 'rgba(51, 65, 85, 0.5)' } : {}}
                disabled={item.disabled}
              >
                <span className={item.disabled ? 'opacity-50' : ''}>{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </motion.button>
            )
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContextMenu;