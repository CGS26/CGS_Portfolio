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

import React from "react";
import SectionHeader from "./common/SectionHeader";
import ProjectCard from "./common/ProjectCard";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "QuickLeave",
    period: "Oct 2024 - Nov 2024",
    category: "Full Stack | Cloud",
    description:
      "Problem: Inefficient leave management processes causing administrative overhead.\n\nSolution: Designed web application for streamlined leave approvals.\n\nTech: Next.js, TypeScript, Material UI, Firebase, Cloud.\n\nImpact: Reduced administrative workload by 25%.\n\nMy Role: Full-stack development, UI/UX design, cloud deployment.\n\nLinks: Website - http://keppa.vercel.app",
    technologies: ["Next.js", "TypeScript", "Material UI", "Firebase", "Cloud"],
    websitelink: "http://keppa.vercel.app",
  },
  {
    title: "Docuspace",
    period: "Aug 2024 - Sep 2024",
    category: "Full Stack | Cloud | GENAI | LLM",
    description:
      "Problem: Need for interactive document processing beyond static OCR.\n\nSolution: Created LLM-based OCR converter with chat interface.\n\nTech: Next.js, Flask, Ollama, LLM, OCR, GenAI.\n\nImpact: Enabled conversational document interaction.\n\nMy Role: Full-stack development, AI integration, interface design.\n\nLinks: GitHub - https://github.com/CGS26/docu-web, Website - http://docu-team.web.app",
    technologies: ["Next.js", "Flask", "Ollama", "LLM", "OCR", "GenAI"],
    github: "https://github.com/CGS26/docu-web",
    websitelink: "http://docu-team.web.app",
  },
  {
    title: "Notty - Node-based Notes App",
    period: "May 2024 - June 2024",
    category: "Full Stack | Node.js | Productivity",
    description:
      "Problem: Lack of powerful yet minimal note-taking tools with cloud sync.\n\nSolution: Developed Node.js app with markdown, search, and cloud features.\n\nTech: FastApi, SQLite, React, Tailwind CSS.\n\nImpact: Provided efficient productivity tool for users.\n\nMy Role: Backend development, database design, frontend integration.\n\nLinks: GitHub - https://github.com/CGS26/Notes_app",
    technologies: ["FastApi", "SQllite", "React", "Tailwind CSS"],
    github: "https://github.com/CGS26/Notes_app",
  },
  {
    title: "Dual CNN-based Intrusion Detection System (IDS)",
    period: "Jan 2024 - Feb 2024",
    category: "Network Security | IOT | Deep Learning",
    description:
      "Problem: Inadequate detection rates in network security for IoT.\n\nSolution: Developed dual CNN model for enhanced intrusion detection.\n\nTech: Python, PyTorch, Deep Learning, CNN, Network Security.\n\nImpact: Improved detection rates by 30%.\n\nMy Role: Model development, implementation, evaluation.\n\nLinks: N/A",
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
      "Problem: Manual faculty scheduling and report generation in educational institutions.\n\nSolution: Built MERN stack web app for streamlined management.\n\nTech: MongoDB, Express.js, React, Node.js, Web Development.\n\nImpact: Improved scheduling and data management efficiency.\n\nMy Role: Full-stack development, database design, feature implementation.\n\nLinks: N/A",
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
  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeader title="Key Projects" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              period={project.period}
              category={project.category}
              description={project.description}
              technologies={project.technologies}
              github={project.github}
              websitelink={project.websitelink}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
