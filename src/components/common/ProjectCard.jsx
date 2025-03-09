// import React from 'react';

// const ProjectCard = ({ title, period, category, description, technologies }) => {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
//       <h3 className="text-xl font-semibold text-blue-800 mb-2">{title}</h3>
//       <div className="flex justify-between mb-2">
//         <span className="text-sm text-gray-600">{period}</span>
//         <span className="text-sm text-blue-600">{category}</span>
//       </div>
//       <p className="text-gray-700 mb-4">{description}</p>
//       <div className="flex flex-wrap gap-2">
//         {technologies && technologies.map((tech, index) => (
//           <span 
//             key={index} 
//             className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
//           >
//             {tech}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProjectCard;

import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ title, period, category, description, technologies }) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
    >
      <h3 className="text-xl font-semibold text-blue-800 mb-2">{title}</h3>
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-600">{period}</span>
        <span className="text-sm text-blue-600">{category}</span>
      </div>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {technologies && technologies.map((tech, index) => (
          <motion.span 
            key={index} 
            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + (index * 0.1), duration: 0.3 }}
            whileHover={{ scale: 1.1, backgroundColor: "#4299e1", color: "white" }}
          >
            {tech}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectCard;