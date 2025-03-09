import React from 'react';
import SectionHeader from './common/SectionHeader';
import SkillCategory from './common/SkillCategory';

const Skills = () => {
  const programmingSkills = [
    "Java, Python, JavaScript",
    "HTML, CSS, SQL, Solidity",
    "Node.js, React.js, Express.js",
    "Next.js, Angular",
    "Git, GitHub, Bitbucket",
    "Django, Flask"
  ];

  const databaseSkills = [
    "MySQL, MongoDB, MSSQL",
    "Azure, AWS",
    "Azure Data Factory (ADF)",
    "REST API, API Integration",
    "ETL Processes",
    "Database Administration"
  ];

  const aiSkills = [
    "Deep Learning, Machine Learning",
    "Data Analysis & Visualization",
    "TensorFlow, Matplotlib",
    "Predictive Modeling",
    "Apache Kafka, PySpark",
    "Apache Flink"
  ];

  const devopsSkills = [
    "Microservices",
    "Docker, Containerization",
    "Shell Scripting",
    "Kubernetes",
    "CI/CD Pipelines",
    "Cloud Enablement"
  ];

  const softSkills = [
    "Effective Communication",
    "Analytical Thinking",
    "Problem-Solving",
    "Team Collaboration",
    "Project Management",
    "Attention to Detail"
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeader title="Skills & Expertise" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SkillCategory title="Programming & Development" skills={programmingSkills} />
          <SkillCategory title="Database & Cloud" skills={databaseSkills} />
          <SkillCategory title="AI & Data Science" skills={aiSkills} />
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkillCategory title="DevOps & Architecture" skills={devopsSkills} />
          <SkillCategory title="Soft Skills" skills={softSkills} />
        </div>
      </div>
    </section>
  );
};

export default Skills;
