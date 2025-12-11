// import React from 'react';
// import SectionHeader from './common/SectionHeader';
// import ProjectCard from './common/ProjectCard';

// const Projects = () => {
//   const projects = [
//     {
//       title: "Dual CNN-based Intrusion Detection System (IDS)",
//       period: "Jan 2024 - Feb 2024",
//       category: "Network Security | IOT | Deep Learning",
//       description: "Developed a dual CNN Model to enhance Network Security, thereby improving detection rates by 30%. Utilized Python and PyTorch for implementation.",
//       technologies: ["Python", "PyTorch", "Deep Learning", "CNN", "Network Security"]
//     },
//     {
//       title: "QuickLeave",
//       period: "Oct 2024 - Nov 2024",
//       category: "Full Stack | Cloud",
//       description: "Designed a Web Application for efficient leave management, streamlining the approval process and reducing administrative workload by 25%.",
//       technologies: ["Next.js", "TypeScript", "Material UI", "Firebase", "Cloud"]
//     },
//     {
//       title: "Docuspace",
//       period: "Aug 2024 - Sep 2024",
//       category: "Full Stack | Cloud | GENAI | LLM",
//       description: "Created an LLM-based OCR Document Converter, enabling users to interact with documents through chats. Implemented a user-friendly interface.",
//       technologies: ["Next.js", "Flask", "Ollama", "LLM", "OCR", "GenAI"]
//     },
//     {
//       title: "Seminar Planner",
//       period: "Jan 2023 - Mar 2024",
//       category: "MERN | Web Application",
//       description: "Built a Web App using MERN stack to streamline faculty scheduling, report generation & data management for educational institutions.",
//       technologies: ["MongoDB", "Express.js", "React", "Node.js", "Web Development"]
//     }
//   ];

//   const researchPapers = [
//     {
//       title: "Investigating Vulnerabilities of Information Solicitation Process in RPL-based IoT Networks",
//       description: "Research paper exploring security vulnerabilities in IoT networks."
//     },
//     {
//       title: "Optimising Networking Systems with Machine Learning Approach",
//       description: "Research chapter accepted for publication."
//     },
//     {
//       title: "A Comparative Analysis of Deep Learning Algorithms for Intrusion Detection in IoT",
//       description: "Research paper comparing various deep learning approaches for IoT security."
//     }
//   ];

//   return (
//     <section id="projects" className="py-20 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <SectionHeader title="Key Projects" />
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {projects.map((project, index) => (
//             <ProjectCard
//               key={index}
//               title={project.title}
//               period={project.period}
//               category={project.category}
//               description={project.description}
//               technologies={project.technologies}
//             />
//           ))}
//         </div>

//         <div className="mt-12">
//           <h3 className="text-2xl font-semibold mb-6 text-blue-800">Research Papers</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {researchPapers.map((paper, index) => (
//               <div key={index} className="bg-white p-6 rounded-lg shadow-md">
//                 <h4 className="text-lg font-semibold text-blue-700 mb-2">{paper.title}</h4>
//                 <p className="text-gray-700">{paper.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Projects;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Folder, File, ExternalLink, Github, Globe, FileText } from "lucide-react";
import SectionHeader from "./common/SectionHeader";
import OSWindow from "./common/OSWindow";

const projects = [
  {
    title: "QuickLeave",
    period: "Oct 2024 - Nov 2024",
    category: "Full Stack | Cloud",
    description:
      "Designed a Web Application for efficient leave management, streamlining the approval process and reducing administrative workload by 25%.",
    technologies: ["Next.js", "TypeScript", "Material UI", "Firebase", "Cloud"],
    websitelink: "http://keppa.vercel.app",
  },
  {
    title: "Docuspace",
    period: "Aug 2024 - Sep 2024",
    category: "Full Stack | Cloud | GENAI | LLM",
    description:
      "Created an LLM-based OCR Document Converter, enabling users to interact with documents through chats. Implemented a user-friendly interface.",
    technologies: ["Next.js", "Flask", "Ollama", "LLM", "OCR", "GenAI"],
    github: "https://github.com/CGS26/docu-web",
    websitelink: "http://docu-team.web.app",
  },
  {
    title: "Notty - Node-based Notes App",
    period: "May 2024 - June 2024",
    category: "Full Stack | Node.js | Productivity",
    description:
      "Developed a minimal yet powerful note-taking app using Node.js and Express. Provides features like markdown support, search, and cloud sync.",
    technologies: ["FastApi", "SQllite", "React", "Tailwind CSS"],
    github: "https://github.com/CGS26/Notes_app",
  },
  {
    title: "Dual CNN-based Intrusion Detection System (IDS)",
    period: "Jan 2024 - Feb 2024",
    category: "Network Security | IOT | Deep Learning",
    description:
      "Developed a dual CNN Model to enhance Network Security, thereby improving detection rates by 30%. Utilized Python and PyTorch for implementation.",
    technologies: [
      "Python",
      "PyTorch",
      "Deep Learning",
      "CNN",
      "Network Security",
    ],
  },

  {
    title: "Seminar Planner",
    period: "Jan 2023 - Mar 2024",
    category: "MERN | Web Application",
    description:
      "Built a Web App using MERN stack to streamline faculty scheduling, report generation & data management for educational institutions.",
    technologies: [
      "MongoDB",
      "Express.js",
      "React",
      "Node.js",
      "Web Development",
    ],
  },
];

const researchPapers = [
  {
    title:
      "Investigating Vulnerabilities of Information Solicitation Process in RPL-based IoT Networks",
    description:
      "Research paper exploring security vulnerabilities in IoT networks.",
    link: "https://link.springer.com/chapter/10.1007/978-981-99-6702-5_54",
  },

  {
    title:
      "A Comparative Analysis of Deep Learning Algorithms for Intrusion Detection in IoT",
    description:
      "Research paper comparing various deep learning approaches for IoT security.",
    link: "https://ieeexplore.ieee.org/abstract/document/10704119",
  },
  {
    title: "Optimising Networking Systems with Machine Learning Approach",
    description: "Research chapter accepted for publication.",
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="p-6 h-full bg-slate-900/30 overflow-auto">
      {/* Address Bar */}
      <div className="bg-slate-700 rounded px-3 py-2 mb-6 font-mono text-sm text-slate-300 border border-slate-600">
        C:\Users\Gaurav\Documents\Projects\
      </div>
      
      {/* File List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="flex items-center p-3 hover:bg-slate-700/50 rounded cursor-pointer border border-slate-600/30 transition-all bg-slate-800/30"
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedProject(selectedProject === index ? null : index)}
          >
            <Folder size={20} className="text-blue-400 mr-3" />
            <div className="flex-1">
              <div className="text-slate-200 font-mono text-sm font-semibold">{project.title}</div>
              <div className="text-slate-400 font-mono text-xs">{project.period}</div>
            </div>
            <div className="flex space-x-2">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" 
                   className="text-slate-400 hover:text-white transition-colors">
                  <Github size={16} />
                </a>
              )}
              {project.websitelink && (
                <a href={project.websitelink} target="_blank" rel="noopener noreferrer"
                   className="text-slate-400 hover:text-white transition-colors">
                  <Globe size={16} />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Details */}
      {selectedProject !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-slate-800/50 rounded-lg p-6 border border-slate-600/30"
        >
          <div className="mb-4">
            <span className="text-green-400 font-mono text-lg"># {projects[selectedProject].title}</span>
          </div>
          <div className="space-y-4">
            <div>
              <span className="text-blue-400 font-mono text-sm">Category: </span>
              <span className="text-slate-300 font-mono text-sm">{projects[selectedProject].category}</span>
            </div>
            <div>
              <span className="text-blue-400 font-mono text-sm">Description: </span>
              <p className="text-slate-300 font-mono text-sm mt-1">{projects[selectedProject].description}</p>
            </div>
            <div>
              <span className="text-blue-400 font-mono text-sm">Technologies: </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {projects[selectedProject].technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Research Papers */}
      <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-600/30">
        <div className="mb-4">
          <span className="text-purple-400 font-mono text-lg"># Research Papers</span>
        </div>
        <div className="space-y-4">
          {researchPapers.map((paper, index) => (
            <motion.div 
              key={index} 
              className="flex items-start p-4 bg-slate-700/30 rounded border border-slate-600/30 hover:bg-slate-700/50 transition-all"
              whileHover={{ scale: 1.01 }}
            >
              <FileText size={20} className="text-purple-400 mr-3 mt-1" />
              <div className="flex-1">
                <h4 className="text-slate-200 font-mono text-sm font-semibold mb-2 flex items-center">
                  {paper.title}
                  {paper.link && (
                    <a
                      href={paper.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </h4>
                <p className="text-slate-400 font-mono text-xs">{paper.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
