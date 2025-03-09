import React from "react";
import { Github, ExternalLink } from "lucide-react";

const ProjectCard = ({ title, period, category, description, technologies, github, websitelink }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      {/* Title & Icons */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        
        {/* GitHub & Website Links */}
        <div className="flex items-center space-x-3">
          {github && (
            <div className="relative group">
              <a 
                href={github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-black transition"
              >
                <Github size={22} />
              </a>
              <span className="absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                GitHub Repo
              </span>
            </div>
          )}

          {websitelink && (
            <div className="relative group">
              <a 
                href={websitelink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition"
              >
                <ExternalLink size={20} />
              </a>
              <span className="absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Live Website
              </span>
            </div>
          )}
        </div>
      </div>
      
      {/* Project Details */}
      <p className="text-sm text-gray-600">{period}</p>
      <p className="text-sm text-blue-600 font-medium">{category}</p>
      <p className="mt-2 text-gray-700">{description}</p>
      
      {/* Tech Stack */}
      <div className="mt-3 flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <span key={index} className="px-3 py-1 text-sm bg-gray-200 rounded-lg">{tech}</span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
