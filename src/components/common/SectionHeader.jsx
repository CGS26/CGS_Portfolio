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
import { Terminal } from 'lucide-react';

const SectionHeader = ({ title, light }) => {
  return (
    <div className="mb-12 text-center">
      <motion.div
        className="flex items-center justify-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-slate-700/50 backdrop-blur-md rounded-lg px-6 py-3 border border-slate-600/50 flex items-center space-x-3">
          <Terminal size={20} className="text-green-400" />
          <motion.h2 
            className="text-2xl font-bold text-slate-200 font-mono"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {title}
          </motion.h2>
        </div>
      </motion.div>
      <motion.div 
        className="mx-auto w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "8rem", opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      ></motion.div>
    </div>
  );
};

export default SectionHeader;