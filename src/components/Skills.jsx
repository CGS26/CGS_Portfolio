import React from 'react';
import SectionHeader from './common/SectionHeader';
import SkillCategory from './common/SkillCategory';

const Skills = () => {
  const programmingSystems = [
    "Python (Advanced)",
    "C/C++ (Working Knowledge)",
    "Java",
    "Linux",
    "Bash",
    "Git"
  ];

  const mlAi = [
    "PyTorch",
    "TensorFlow",
    "Keras",
    "Scikit-Learn",
    "Neural Networks",
    "CNNs",
    "NLP",
    "Computer Vision"
  ];

  const modelDeployment = [
    "ML inference pipelines",
    "Model optimization",
    "ONNX (familiarity)",
    "Performance-aware software design",
    "Heterogeneous compute workloads"
  ];

  const cloudTooling = [
    "AWS",
    "Azure",
    "Google Cloud",
    "Docker",
    "Kubernetes",
    "Azure Data Factory",
    "GitLab CI/CD"
  ];

  const dataDatabases = [
    "MySQL",
    "MSSQL",
    "MongoDB",
    "NoSQL",
    "Statistics",
    "Probability",
    "Data Analysis"
  ];

  const frameworksSecondary = [
    "Flask",
    "Node.js",
    "React",
    "Next.js"
  ];

  const softSkills = [
    "Analytical thinking",
    "Independent working style",
    "Attention to detail",
    "Collaboration"
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeader title="Skills & Expertise" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkillCategory title="Programming & Systems" skills={programmingSystems} />
          <SkillCategory title="ML & AI" skills={mlAi} />
          <SkillCategory title="Model Deployment & Systems" skills={modelDeployment} />
          <SkillCategory title="Cloud & Tooling" skills={cloudTooling} />
          <SkillCategory title="Data & Databases" skills={dataDatabases} />
          <SkillCategory title="Frameworks (Secondary)" skills={frameworksSecondary} />
        </div>
        <div className="mt-12">
          <SkillCategory title="Soft Skills" skills={softSkills} />
        </div>
      </div>
    </section>
  );
};

export default Skills;
