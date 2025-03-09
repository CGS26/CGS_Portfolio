import React from 'react';
import SectionHeader from './common/SectionHeader';
import ExperienceCard from './common/ExperienceCard';

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
    <section id="experience" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader title="Work Experience" />
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <ExperienceCard 
              key={index}
              title={exp.title}
              company={exp.company}
              period={exp.period}
              location={exp.location}
              responsibilities={exp.responsibilities}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
