import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Copyright } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-800/90 backdrop-blur-md border-t border-slate-600/50 py-6 mb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-blue-600 rounded-sm flex items-center justify-center text-white text-xs font-bold">
              GS
            </div>
            <span className="text-slate-300 font-mono text-sm">
              <Copyright size={14} className="inline mr-1" />
              2025 Cherukuri Gaurav Sushant. All rights reserved.
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-slate-400 font-mono text-xs">Connect:</span>
            <motion.a 
              href="https://linkedin.com/in/gaurav-sushant-cherukuri" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a 
              href="https://github.com/CGS267/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={20} />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

      export default Footer;