// import React from 'react';

// const SectionHeader = ({ title, light }) => {
//   return (
//     <div className="mb-12 text-center">
//       <h2 className={`text-3xl font-bold ${light ? 'text-white' : 'text-blue-800'}`}>{title}</h2>
//       <div className={`mt-3 mx-auto w-24 h-1 ${light ? 'bg-white' : 'bg-blue-600'}`}></div>
//     </div>
//   );
// };

// export default SectionHeader;

import React from 'react';
import { motion } from 'framer-motion';

const SectionHeader = ({ title, light }) => {
  return (
    <div className="mb-12 text-center">
      <motion.h2 
        className={`text-3xl font-bold ${light ? 'text-white' : 'text-blue-800'}`}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      <motion.div 
        className={`mt-3 mx-auto w-24 h-1 ${light ? 'bg-white' : 'bg-blue-600'}`}
        initial={{ width: 0 }}
        whileInView={{ width: "6rem" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      ></motion.div>
    </div>
  );
};

export default SectionHeader;