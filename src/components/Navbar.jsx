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
      className={`fixed w-full z-10 px-6 py-4 transition-all duration-300 backdrop-blur-lg ${scrolled ? 'bg-blue-900/80 shadow-lg' : 'bg-transparent'}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.div className="text-2xl font-extrabold text-white tracking-wide" whileHover={{ scale: 1.05 }}>
          Gaurav Sushant
        </motion.div>

        <div className="hidden md:flex space-x-6">
          {navItems.map((item, index) => (
            <NavItem key={item.id} {...item} delay={index * 0.1} />
          ))}
        </div>

        <div className="md:hidden">
          <motion.button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none" whileTap={{ scale: 0.9 }}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-blue-800 mt-2 rounded-lg shadow-lg p-4"
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
      offset={-70}
      duration={500}
      onClick={onClick}
      className={`flex items-center gap-2 cursor-pointer text-white ${mobile ? 'block py-2' : 'px-3 py-1 hover:text-blue-300'}`}
    >
      <Icon size={20} />
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
