import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Star, Medal } from 'lucide-react';
import SectionHeader from './common/SectionHeader';
import OSWindow from './common/OSWindow';

const Awards = () => {
  const awards = [
    {
      title: "Smart India Hackathon 2024",
      description: "Finalist in SIH 2024.",
      icon: <Trophy size={20} className="text-yellow-400" />
    },
    {
      title: "Merit-based Scholarship",
      description: "Received for Academic Excellence at ICFAI Foundation for Higher Education.",
      icon: <Medal size={20} className="text-blue-400" />
    },
    {
      title: "AI/ML Program Selection",
      description: "Selected for AI/ML Program at IIIT (top 2 students from each institute).",
      icon: <Star size={20} className="text-purple-400" />
    },
    {
      title: "Coding Competition Organizer",
      description: "Organized many coding competitions and received appreciation letters.",
      icon: <Award size={20} className="text-green-400" />
    }
  ];

  return (
    <section className="py-20 bg-slate-900/50 relative">
      <div className="container mx-auto px-4">
        <SectionHeader title="Achievements.exe - Awards & Accolades" />
        
        <OSWindow 
          title="Awards Registry - System Achievements"
          windowIcon={<Trophy size={16} className="text-yellow-400" />}
        >
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {awards.map((award, index) => (
                <motion.div 
                  key={index} 
                  className="bg-slate-700/30 p-4 rounded border border-slate-600/30 hover:bg-slate-700/50 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="bg-slate-600 p-2 rounded">
                      {award.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-slate-200 font-mono text-sm font-semibold mb-2">
                        {award.title}
                      </h4>
                      <p className="text-slate-400 font-mono text-xs leading-relaxed">
                        {award.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </OSWindow>
      </div>
    </section>
  );
};

export default Awards;