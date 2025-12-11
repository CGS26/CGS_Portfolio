import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, Briefcase, Code, Phone } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'top-0' : 'top-0'}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      {/* OS Window Title Bar */}
      <div className="bg-slate-700/95 backdrop-blur-md border-b border-slate-600/50 px-4 py-2">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            {/* Window Controls */}
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 cursor-pointer"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 cursor-pointer"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 cursor-pointer"></div>
            </div>
            
            <motion.div className="text-lg font-bold text-slate-200 tracking-wide flex items-center" whileHover={{ scale: 1.02 }}>
              <div className="w-6 h-6 bg-blue-600 rounded-sm flex items-center justify-center text-white text-xs font-bold mr-2">
                GS
              </div>
              Portfolio.exe - Gaurav Sushant
            </motion.div>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <NavItem key={item.id} {...item} delay={index * 0.1} />
            ))}
          </div>

          <div className="md:hidden">
            <motion.button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-slate-200 focus:outline-none bg-slate-600 hover:bg-slate-500 p-1 rounded" 
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-slate-700/95 backdrop-blur-md border-b border-slate-600/50 p-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item, index) => (
              <NavItem key={item.id} {...item} mobile onClick={() => setIsOpen(false)} delay={index * 0.1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const NavItem = ({ to, title, icon: Icon, mobile, onClick, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.3 }}
  >
    <Link
      to={to}
      spy={true}
      smooth={true}
      offset={-100}
      duration={500}
      onClick={onClick}
      className={`flex items-center gap-2 cursor-pointer transition-all duration-200 ${
        mobile 
          ? 'block py-2 text-slate-200 hover:text-blue-300 hover:bg-slate-600/50 px-2 rounded' 
          : 'px-3 py-1 text-slate-200 hover:text-blue-300 hover:bg-slate-600/50 rounded-md text-sm'
      }`}
    >
      <Icon size={16} />
      <span>{title}</span>
    </Link>
  </motion.div>
);

const navItems = [
  { id: 'home', to: 'home', title: 'Home', icon: Home },
  { id: 'about', to: 'about', title: 'About', icon: User },
  { id: 'skills', to: 'skills', title: 'Skills', icon: Code },
  { id: 'experience', to: 'experience', title: 'Experience', icon: Briefcase },
  { id: 'projects', to: 'projects', title: 'Projects', icon: Code },
  { id: 'contact', to: 'contact', title: 'Contact', icon: Phone }
];

export default Navbar;
