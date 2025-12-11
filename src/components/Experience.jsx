import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, ChevronRight } from 'lucide-react';
import SectionHeader from './common/SectionHeader';
import OSWindow from './common/OSWindow';

const Experience = () => {
  const experiences = [
    {
      title: "Trainee Intern",
      company: "Xyenta",
      period: "Aug 2024 - Present",
      location: "Hyderabad",
      responsibilities: [
        "Managed MSSQL Servers and performed SCD Type 1 and Type 2 Transformations",
        "Designed & implemented ETL Processes from staging to dimension and fact tables",
        "Worked with cross-functional teams to gather requirements and deliver innovative data solutions",
        "Leveraged Microsoft Azure and SQL Server to address complex data challenges",
        "Utilized Apache Flink to process data in parallel and transform data for analysis",
        "Created pipelines using Azure Data Factory (ADF) to streamline business processes"
      ]
    },
    {
      title: "Research Intern",
      company: "Precog@IIITD",
      period: "Feb 2024 - Jul 2024",
      location: "Hyderabad",
      responsibilities: [
        "Led collaborative efforts in NLP and AI Ethics Initiatives and research projects",
        "Worked with interdisciplinary teams to deliver innovative research outcomes",
        "Created an analytical dashboard for the last 3 Indian Elections and integrated models for functionalities like fake news detection",
        "Conducted NLP research on factors affecting crowdfunding success and the impact of natural/man-made disasters"
      ]
    },
    {
      title: "Infosec Intern",
      company: "Newmark",
      period: "Jun 2023 - Aug 2023",
      location: "Hyderabad",
      responsibilities: [
        "Automated Sentinel using Playbooks, improved Firewall Configurations and Proactive Threat Management",
        "Conducted Security Incident Log Analysis and linked incidents with Advanced Threat Protection (ATP) tools",
        "Automated events in Security Information & Event Management (SIEM) to rapidly detect incidents",
        "Developed Near Real-Time Rules for quickly sending alerts across Teams",
        "Implemented Automated Incident Response for efficient threat containment and mitigation",
        "Contributed to Threat Hunting and Investigation through automation of context analysis"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-slate-900/30 relative">
      <div className="container mx-auto px-4">
        <SectionHeader title="Experience.log - Work History" />
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <OSWindow 
              key={index}
              title={`${exp.company} - ${exp.title}.exe`}
              windowIcon={<Briefcase size={16} className="text-orange-400" />}
              className="w-full"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-200 font-mono">{exp.title}</h3>
                    <p className="text-blue-400 font-mono text-sm">{exp.company}</p>
                  </div>
                  <div className="flex flex-col md:items-end mt-2 md:mt-0">
                    <div className="flex items-center text-slate-400 font-mono text-sm">
                      <Calendar size={14} className="mr-1" />
                      {exp.period}
                    </div>
                    <div className="flex items-center text-slate-400 font-mono text-sm">
                      <MapPin size={14} className="mr-1" />
                      {exp.location}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <span className="text-green-400 font-mono text-sm"># Responsibilities:</span>
                  {exp.responsibilities.map((responsibility, respIndex) => (
                    <motion.div 
                      key={respIndex}
                      className="flex items-start space-x-2 text-slate-300 font-mono text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + respIndex * 0.05 }}
                    >
                      <ChevronRight size={14} className="text-blue-400 mt-0.5 flex-shrink-0" />
                      <span>{responsibility}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </OSWindow>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
