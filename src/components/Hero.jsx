// // import React from 'react';
// // import { Link } from 'react-scroll';

// // const Hero = () => {
// //   return (
// //     <section id="home" className="pt-24 pb-20 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
// //       <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
// //         <div className="md:w-1/2 mb-10 md:mb-0">
// //           <h1 className="text-4xl md:text-5xl font-bold mb-4">Cherukuri Gaurav Sushant</h1>
// //           <h2 className="text-2xl md:text-3xl mb-6">IT Professional | Software Engineer</h2>
// //           <p className="text-xl mb-8">Specializing in Data Science, AI, Machine Learning & Full Stack Development</p>
// //           <div className="flex space-x-4">
// //             <Link
// //               to="contact"
// //               spy={true}
// //               smooth={true}
// //               offset={-70}
// //               duration={500}
// //               className="bg-white text-blue-800 px-6 py-3 rounded-lg font-medium hover:bg-blue-100 transition duration-300 cursor-pointer"
// //             >
// //               Contact Me
// //             </Link>
// //             <Link
// //               to="projects"
// //               spy={true}
// //               smooth={true}
// //               offset={-70}
// //               duration={500}
// //               className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-800 transition duration-300 cursor-pointer"
// //             >
// //               View Projects
// //             </Link>
// //           </div>
// //         </div>
// //         <div className="md:w-1/2 flex justify-center">
// //           <div className="bg-white p-2 rounded-full w-64 h-64 overflow-hidden shadow-xl">
// //             {/* Profile picture placeholder */}
// //             <div className="w-full h-full rounded-full bg-blue-200 flex items-center justify-center text-blue-800 text-4xl font-bold">
// //               GS
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default Hero;

// import React, { useEffect } from 'react';
// import { Link } from 'react-scroll';
// import { motion } from 'framer-motion';

// const Hero = () => {
//   return (
//     <section id="home" className="pt-32 pb-20 bg-gradient-to-r from-blue-800 to-blue-600 text-white overflow-hidden">
//       <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
//         <motion.div
//           className="md:w-1/2 mb-10 md:mb-0"
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <motion.h1
//             className="text-4xl md:text-5xl font-bold mb-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3, duration: 0.8 }}
//           >
//             Cherukuri Gaurav Sushant
//           </motion.h1>
//           <motion.h2
//             className="text-2xl md:text-3xl mb-6"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5, duration: 0.8 }}
//           >
//             IT Professional | Software Engineer
//           </motion.h2>
//           <motion.p
//             className="text-xl mb-8"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.7, duration: 0.8 }}
//           >
//             Specializing in Data Science, AI, Machine Learning & Full Stack Development
//           </motion.p>
//           <motion.div
//             className="flex space-x-4"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.9, duration: 0.8 }}
//           >
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
//           </motion.div>
//         </motion.div>
//         <motion.div
//           className="md:w-1/2 flex justify-center"
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.5, duration: 0.8 }}
//         >
//           <motion.div
//             className="bg-white p-2 rounded-full w-64 h-64 overflow-hidden shadow-xl"
//             whileHover={{
//               scale: 1.05,
//               boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
//             }}
//             transition={{ type: "spring", stiffness: 300 }}
//           >
//             <div className="w-full h-full rounded-full bg-blue-200 flex items-center justify-center text-blue-800 text-4xl font-bold">
//               GS
//             </div>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

import React, { useEffect, useRef } from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { User, Code, Briefcase } from "lucide-react";
import Typed from "typed.js";

const Hero = () => {
  // Create reference to store the DOM element containing the animation
  const typeTarget = useRef(null);

  useEffect(() => {
    const typed = new Typed(typeTarget.current, {
      // strings: [
      //   'IT Professional',
      //   'Software Engineer',
      //   'Full Stack Developer',
      //   'Data Scientist',
      //   'AI/ML Specialist',
      //   'Network Security Expert'
      // ],
      strings: [
        "IT Professional",
        "Software Engineer",
        "Full Stack Developer",
        "AI/ML Specialist",
        "Deep Learning Researcher",
        "Cloud & DevOps Engineer",
        "Database Engineer",
        "Cybersecurity Analyst",
        "Software Development Engineer",
        "NLP & AI Ethics Researcher",
      ],
      typeSpeed: 50,
      backSpeed: 40,
      backDelay: 1500,
      startDelay: 1000,
      loop: true,
      loopCount: Infinity,
      showCursor: true,
      cursorChar: "|",
    });

    // Cleanup function to destroy Typed instance on unmounting
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section
      id="home"
      className="pt-20 pb-16 min-h-screen flex items-center relative"
    >
      {/* Desktop Icons */}
      <div className="absolute top-24 left-8 space-y-6 z-10">
        <motion.div 
          className="flex flex-col items-center cursor-pointer group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-1 shadow-lg group-hover:bg-blue-500 transition-colors">
            <User className="text-white" size={24} />
          </div>
          <span className="text-slate-200 text-xs">About.exe</span>
        </motion.div>
        
        <motion.div 
          className="flex flex-col items-center cursor-pointer group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-1 shadow-lg group-hover:bg-green-500 transition-colors">
            <Code className="text-white" size={24} />
          </div>
          <span className="text-slate-200 text-xs">Projects.exe</span>
        </motion.div>
        
        <motion.div 
          className="flex flex-col items-center cursor-pointer group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-1 shadow-lg group-hover:bg-purple-500 transition-colors">
            <Briefcase className="text-white" size={24} />
          </div>
          <span className="text-slate-200 text-xs">Experience.exe</span>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* Main Terminal Window */}
        <motion.div
          className="md:w-1/2 mb-10 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-slate-800/90 backdrop-blur-md rounded-lg shadow-2xl border border-slate-600/50 overflow-hidden">
            {/* Terminal Header */}
            <div className="bg-slate-700 px-4 py-2 flex items-center justify-between border-b border-slate-600">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-slate-300 text-sm font-mono">Terminal - gaurav@portfolio</span>
              <div className="w-12"></div>
            </div>
            
            {/* Terminal Content */}
            <div className="p-6 font-mono text-green-400">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <div className="mb-2">
                  <span className="text-blue-400">gaurav@portfolio:~$</span> whoami
                </div>
                <motion.h1
                  className="text-2xl md:text-3xl font-bold mb-4 text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  Cherukuri Gaurav Sushant
                </motion.h1>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <div className="mb-2">
                  <span className="text-blue-400">gaurav@portfolio:~$</span> cat role.txt
                </div>
                <motion.h2
                  className="text-lg md:text-xl mb-4 h-8 text-yellow-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                >
                  <span ref={typeTarget}></span>
                </motion.h2>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.8 }}
              >
                <div className="mb-2">
                  <span className="text-blue-400">gaurav@portfolio:~$</span> cat education.txt
                </div>
                <motion.p
                  className="text-base mb-6 text-slate-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3, duration: 0.8 }}
                >
                  B.Tech in Data Science & AI | Deep Learning Certified
                </motion.p>
              </motion.div>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                <Link
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-mono text-sm transition duration-300 cursor-pointer text-center"
                >
                  ./contact.sh
                </Link>
                <Link
                  to="projects"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  className="border border-green-400 text-green-400 hover:bg-green-400 hover:text-slate-800 px-4 py-2 rounded font-mono text-sm transition duration-300 cursor-pointer text-center"
                >
                  ls projects/
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        {/* System Info Window */}
        <motion.div
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="bg-slate-800/90 backdrop-blur-md rounded-lg shadow-2xl border border-slate-600/50 overflow-hidden w-80">
            {/* Window Header */}
            <div className="bg-slate-700 px-4 py-2 flex items-center justify-between border-b border-slate-600">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-slate-300 text-sm font-mono">System Info</span>
              <div className="w-12"></div>
            </div>
            
            {/* System Info Content */}
            <div className="p-6">
              <motion.div
                className="flex flex-col items-center"
                whileHover={{
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">
                  GS
                </div>
                <div className="text-slate-300 font-mono text-sm space-y-1 w-full">
                  <div className="flex justify-between">
                    <span className="text-blue-400">OS:</span>
                    <span>Gaurav OS v2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-400">CPU:</span>
                    <span>Brain.exe</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-400">RAM:</span>
                    <span>∞ GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-400">Status:</span>
                    <span className="text-green-400">Online</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
