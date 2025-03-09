// import React from 'react';
// import { Link } from 'react-scroll';

// const Hero = () => {
//   return (
//     <section id="home" className="pt-24 pb-20 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
//       <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
//         <div className="md:w-1/2 mb-10 md:mb-0">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">Cherukuri Gaurav Sushant</h1>
//           <h2 className="text-2xl md:text-3xl mb-6">IT Professional | Software Engineer</h2>
//           <p className="text-xl mb-8">Specializing in Data Science, AI, Machine Learning & Full Stack Development</p>
//           <div className="flex space-x-4">
//             <Link 
//               to="contact" 
//               spy={true} 
//               smooth={true} 
//               offset={-70} 
//               duration={500} 
//               className="bg-white text-blue-800 px-6 py-3 rounded-lg font-medium hover:bg-blue-100 transition duration-300 cursor-pointer"
//             >
//               Contact Me
//             </Link>
//             <Link 
//               to="projects" 
//               spy={true} 
//               smooth={true} 
//               offset={-70} 
//               duration={500} 
//               className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-800 transition duration-300 cursor-pointer"
//             >
//               View Projects
//             </Link>
//           </div>
//         </div>
//         <div className="md:w-1/2 flex justify-center">
//           <div className="bg-white p-2 rounded-full w-64 h-64 overflow-hidden shadow-xl">
//             {/* Profile picture placeholder */}
//             <div className="w-full h-full rounded-full bg-blue-200 flex items-center justify-center text-blue-800 text-4xl font-bold">
//               GS
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;


import React, { useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="pt-32 pb-20 bg-gradient-to-r from-blue-800 to-blue-600 text-white overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <motion.div 
          className="md:w-1/2 mb-10 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Cherukuri Gaurav Sushant
          </motion.h1>
          <motion.h2 
            className="text-2xl md:text-3xl mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            IT Professional | Software Engineer
          </motion.h2>
          <motion.p 
            className="text-xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Specializing in Data Science, AI, Machine Learning & Full Stack Development
          </motion.p>
          <motion.div 
            className="flex space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <Link 
              to="contact" 
              spy={true} 
              smooth={true} 
              offset={-70} 
              duration={500} 
              className="bg-white text-blue-800 px-6 py-3 rounded-lg font-medium hover:bg-blue-100 transition duration-300 cursor-pointer"
            >
              Contact Me
            </Link>
            <Link 
              to="projects" 
              spy={true} 
              smooth={true} 
              offset={-70} 
              duration={500} 
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-800 transition duration-300 cursor-pointer"
            >
              View Projects
            </Link>
          </motion.div>
        </motion.div>
        <motion.div 
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.div 
            className="bg-white p-2 rounded-full w-64 h-64 overflow-hidden shadow-xl"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-full h-full rounded-full bg-blue-200 flex items-center justify-center text-blue-800 text-4xl font-bold">
              GS
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;