import React from 'react';
import { motion } from 'framer-motion';
import { User, GraduationCap, FileText } from 'lucide-react';
import SectionHeader from './common/SectionHeader';
import OSWindow from './common/OSWindow';

const About = () => {
  const stats = [
    { label: "Years Experience", value: "3+", icon: "🚀" },
    { label: "Projects Completed", value: "15+", icon: "💼" },
    { label: "Technologies Mastered", value: "20+", icon: "🛠️" },
    { label: "Research Papers", value: "3", icon: "📚" },
    { label: "Certifications", value: "5+", icon: "🏆" },
    { label: "Lines of Code", value: "50K+", icon: "💻" }
  ];

  return (
    <div className="p-6 h-full bg-slate-900/30 overflow-auto">
      {/* Achievement Stats */}
      <div className="mb-6 bg-gradient-to-r from-slate-800/60 to-slate-700/60 rounded-lg p-6 border border-slate-600/40">
        <div className="mb-4">
          <span className="text-yellow-400 font-mono text-lg"># Career Impact Metrics</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/30 text-center hover:bg-slate-700/70 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-xl font-bold text-blue-400 font-mono">{stat.value}</div>
              <div className="text-xs text-slate-400 font-mono">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Profile Section */}
        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-600/30">
          <div className="mb-4">
            <span className="text-green-400 font-mono text-lg"># Software Engineer & Data Scientist</span>
          </div>
          <div className="text-slate-300 font-mono text-sm leading-relaxed space-y-4">
            <p>
              I am an innovative Software Engineer with technical expertise in all phases of the Software Development Lifecycle (SDLC).
              My experience spans requirement analysis, documentation (HLD/LLD), coding, development, testing (UAT), go-live,
              post-implementation support, and end-user training.
            </p>
            <p>
              As a results-driven Project Lead, I've executed diverse Full Stack / Web Application Development, Process Automation,
              Cloud, IDS, R&D, and Data Analytics Projects in various domains. I specialize in Data Analysis, Visualization & Reporting,
              interpreting large datasets to provide actionable insights for organizations.
            </p>
            <p className="text-blue-300 font-semibold">
              I'm a collaborative team player, problem solver, and go-getter with proven ability to relate to people at any level of business
              and management, work under pressure, and meet tight deadlines.
            </p>
          </div>
        </div>

        {/* Education Section */}
        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-600/30">
          <div className="mb-4">
            <span className="text-purple-400 font-mono text-lg"># Education & Certification</span>
          </div>
          <div className="space-y-4">
            <motion.div 
              className="bg-slate-700/50 p-4 rounded border border-slate-600/50"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <h4 className="text-lg font-semibold text-blue-400 font-mono">Bachelor of Technology (B.Tech.)</h4>
              </div>
              <p className="text-slate-300 font-mono text-sm">Data Science & Artificial Intelligence</p>
              <p className="text-slate-400 font-mono text-xs">ICFAI Foundation for Higher Education, Hyderabad</p>
              <p className="text-slate-400 font-mono text-xs">Aug 2021 – Jun 2025</p>
            </motion.div>
            
            <motion.div 
              className="bg-slate-700/50 p-4 rounded border border-slate-600/50"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <h4 className="text-lg font-semibold text-green-400 font-mono">Deep Learning Specialization</h4>
              </div>
              <p className="text-slate-300 font-mono text-sm">Deep Learning.AI by Andrew Ng</p>
              <p className="text-slate-400 font-mono text-xs">Coursera, Jun 2024</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;