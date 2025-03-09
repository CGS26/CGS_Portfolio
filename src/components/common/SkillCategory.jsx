// import React from 'react';

// const SkillCategory = ({ title, skills }) => {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h3 className="text-xl font-semibold mb-4 text-blue-700">{title}</h3>
//       <ul className="space-y-3">
//         {skills.map((skill, index) => (
//           <li key={index} className="flex items-center">
//             <span className="mr-2 text-blue-600">
//               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
//               </svg>
//             </span>
//             <span className="text-gray-700">{skill}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SkillCategory;

import React from 'react';
import { motion } from 'framer-motion';

const SkillCategory = ({ title, skills }) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
    >
      <h3 className="text-xl font-semibold mb-4 text-blue-700">{title}</h3>
      <ul className="space-y-3">
        {skills.map((skill, index) => (
          <motion.li 
            key={index} 
            className="flex items-center"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <motion.span 
              className="mr-2 text-blue-600"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
            </motion.span>
            <span className="text-gray-700">{skill}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default SkillCategory;