import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu, Database, Brain, Settings, Users } from 'lucide-react';
import SectionHeader from './common/SectionHeader';
import OSWindow from './common/OSWindow';

const Skills = () => {
  const [cpuUsage, setCpuUsage] = useState(85);
  const [memoryUsage, setMemoryUsage] = useState(72);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 20) + 75);
      setMemoryUsage(Math.floor(Math.random() * 15) + 65);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const skillCategories = [
    {
      title: "Programming & Development",
      icon: <Cpu size={20} className="text-blue-400" />,
      skills: [
        { name: "Java", level: 90 },
        { name: "Python", level: 95 },
        { name: "JavaScript", level: 88 },
        { name: "React.js", level: 92 },
        { name: "Node.js", level: 85 },
        { name: "Next.js", level: 80 }
      ],
      color: "blue"
    },
    {
      title: "Database & Cloud",
      icon: <Database size={20} className="text-green-400" />,
      skills: [
        { name: "MySQL", level: 88 },
        { name: "MongoDB", level: 85 },
        { name: "Azure", level: 82 },
        { name: "AWS", level: 78 },
        { name: "Docker", level: 80 },
        { name: "Kubernetes", level: 75 }
      ],
      color: "green"
    },
    {
      title: "AI & Data Science",
      icon: <Brain size={20} className="text-purple-400" />,
      skills: [
        { name: "Machine Learning", level: 90 },
        { name: "Deep Learning", level: 88 },
        { name: "TensorFlow", level: 85 },
        { name: "Data Analysis", level: 92 },
        { name: "Apache Kafka", level: 75 },
        { name: "PySpark", level: 78 }
      ],
      color: "purple"
    },
    {
      title: "DevOps & Architecture",
      icon: <Settings size={20} className="text-orange-400" />,
      skills: [
        { name: "Microservices", level: 82 },
        { name: "CI/CD Pipelines", level: 80 },
        { name: "Shell Scripting", level: 85 },
        { name: "API Integration", level: 88 },
        { name: "ETL Processes", level: 83 },
        { name: "System Design", level: 80 }
      ],
      color: "orange"
    }
  ];

  return (
    <div className="p-6 h-full bg-slate-900/30 overflow-auto">
      {/* System Performance Header */}
      <div className="mb-6 bg-slate-800/50 rounded-lg p-4 border border-slate-600/30">
        <div className="flex justify-between items-center mb-4">
          <span className="text-green-400 font-mono text-lg"># System Performance Monitor</span>
          <div className="flex space-x-4">
            <div className="text-blue-400 font-mono text-sm">Skill Level: {cpuUsage}%</div>
            <div className="text-green-400 font-mono text-sm">Experience: {memoryUsage}%</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <motion.div 
                className="bg-blue-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${cpuUsage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          <div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <motion.div 
                className="bg-green-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${memoryUsage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category, index) => (
          <div 
            key={index}
            className="bg-slate-800/50 rounded-lg p-6 border border-slate-600/30"
          >
            <div className="flex items-center space-x-2 mb-4">
              {category.icon}
              <span className="text-slate-200 font-mono text-lg font-semibold">{category.title}</span>
            </div>
            <div className="space-y-3">
              {category.skills.map((skill, skillIndex) => (
                <motion.div 
                  key={skillIndex}
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                >
                  <span className="text-slate-300 font-mono text-sm flex-1">{skill.name}</span>
                  <div className="flex-1 mx-3">
                    <div className="w-full bg-slate-700 rounded-full h-1.5">
                      <motion.div 
                        className={`h-1.5 rounded-full ${
                          category.color === 'blue' ? 'bg-blue-500' :
                          category.color === 'green' ? 'bg-green-500' :
                          category.color === 'purple' ? 'bg-purple-500' :
                          'bg-orange-500'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ delay: index * 0.1 + skillIndex * 0.05 + 0.3, duration: 0.8 }}
                      />
                    </div>
                  </div>
                  <span className={`font-mono text-xs w-8 text-right ${
                    category.color === 'blue' ? 'text-blue-400' :
                    category.color === 'green' ? 'text-green-400' :
                    category.color === 'purple' ? 'text-purple-400' :
                    'text-orange-400'
                  }`}>
                    {skill.level}%
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
