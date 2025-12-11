import React from 'react';
import { motion } from 'framer-motion';
import { User, GraduationCap, FileText } from 'lucide-react';
import SectionHeader from './common/SectionHeader';
import OSWindow from './common/OSWindow';

const About = () => {
  return (
    <section id="about" className="py-20 bg-slate-900/50 relative">
      <div className="container mx-auto px-4">
        <SectionHeader title="About.exe - System Information" />
        <div className="grid md:grid-cols-2 gap-8">
          {/* Profile Window */}
          <OSWindow 
            title="Profile.txt - Notepad" 
            windowIcon={<User size={16} className="text-blue-400" />}
            className="h-fit"
          >
            <div className="p-6 text-slate-300 font-mono text-sm leading-relaxed">
              <div className="mb-4">
                <span className="text-green-400"># Software Engineer & Data Scientist</span>
              </div>
              <p className="mb-4">
                I am an innovative Software Engineer with technical expertise in all phases of the Software Development Lifecycle (SDLC).
                My experience spans requirement analysis, documentation (HLD/LLD), coding, development, testing (UAT), go-live, 
                post-implementation support, and end-user training.
              </p>
              <p className="mb-4">
                As a results-driven Project Lead, I've executed diverse Full Stack / Web Application Development, Process Automation,
                Cloud, IDS, R&D, and Data Analytics Projects in various domains. I specialize in Data Analysis, Visualization & Reporting,
                interpreting large datasets to provide actionable insights for organizations.
              </p>
              <p className="text-blue-300">
                I'm a collaborative team player, problem solver, and go-getter with proven ability to relate to people at any level of business
                and management, work under pressure, and meet tight deadlines.
              </p>
            </div>
          </OSWindow>

          {/* Education Window */}
          <OSWindow 
            title="Education.sys - System Properties" 
            windowIcon={<GraduationCap size={16} className="text-purple-400" />}
            className="h-fit"
          >
            <div className="p-6">
              <div className="space-y-6">
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
          </OSWindow>
        </div>
      </div>
    </section>
  );
};

export default About;