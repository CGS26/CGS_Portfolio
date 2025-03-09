import React from 'react';
import SectionHeader from './common/SectionHeader';
import ProjectCard from './common/ProjectCard';

const Projects = () => {
  const projects = [
    {
      title: "Dual CNN-based Intrusion Detection System (IDS)",
      period: "Jan 2024 - Feb 2024",
      category: "Network Security | IOT | Deep Learning",
      description: "Developed a dual CNN Model to enhance Network Security, thereby improving detection rates by 30%. Utilized Python and PyTorch for implementation.",
      technologies: ["Python", "PyTorch", "Deep Learning", "CNN", "Network Security"]
    },
    {
      title: "QuickLeave",
      period: "Oct 2024 - Nov 2024",
      category: "Full Stack | Cloud",
      description: "Designed a Web Application for efficient leave management, streamlining the approval process and reducing administrative workload by 25%.",
      technologies: ["Next.js", "TypeScript", "Material UI", "Firebase", "Cloud"]
    },
    {
      title: "Docuspace",
      period: "Aug 2024 - Sep 2024",
      category: "Full Stack | Cloud | GENAI | LLM",
      description: "Created an LLM-based OCR Document Converter, enabling users to interact with documents through chats. Implemented a user-friendly interface.",
      technologies: ["Next.js", "Flask", "Ollama", "LLM", "OCR", "GenAI"]
    },
    {
      title: "Seminar Planner",
      period: "Jan 2023 - Mar 2024",
      category: "MERN | Web Application",
      description: "Built a Web App using MERN stack to streamline faculty scheduling, report generation & data management for educational institutions.",
      technologies: ["MongoDB", "Express.js", "React", "Node.js", "Web Development"]
    }
  ];

  const researchPapers = [
    {
      title: "Investigating Vulnerabilities of Information Solicitation Process in RPL-based IoT Networks",
      description: "Research paper exploring security vulnerabilities in IoT networks."
    },
    {
      title: "Optimising Networking Systems with Machine Learning Approach",
      description: "Research chapter accepted for publication."
    },
    {
      title: "A Comparative Analysis of Deep Learning Algorithms for Intrusion Detection in IoT",
      description: "Research paper comparing various deep learning approaches for IoT security."
    }
  ];

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
            />
          ))}
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-6 text-blue-800">Research Papers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchPapers.map((paper, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold text-blue-700 mb-2">{paper.title}</h4>
                <p className="text-gray-700">{paper.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;