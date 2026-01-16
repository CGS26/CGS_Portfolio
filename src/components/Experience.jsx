import React from 'react';
import SectionHeader from './common/SectionHeader';
import ExperienceCard from './common/ExperienceCard';

const Experience = () => {
  const experiences = [
    {
      title: "Freelance Developer",
      company: "Prepstreak, UK",
      period: "Apr 2025 – Jun 2025",
      location: "Remote",
      responsibilities: [
        "Built cross-platform mobile learning app for grades 4–6 using React Native + Supabase",
        "Implemented personalized content + real-time tracking with gamification features (streak rewards)",
        "Improved engagement/retention through interactive UI/UX design",
        "Automated PDF-to-SQL data ingestion pipeline converting SAT practice PDFs to structured relational DB",
        "Used Python processing with LangChain + LlamaIndex for extraction/clean/normalize",
        "Applied LLM-assisted semantic parsing + validation for schema consistency + accuracy",
        "Orchestrated using n8n for automated, repeatable, fault-tolerant execution",
        "Reduced manual data entry; enabled scalable DB-driven features"
      ]
    },
    {
      title: "Intern",
      company: "Xyenta, Hyderabad, India",
      period: "Jan 2025 – Jun 2025",
      location: "Hyderabad",
      responsibilities: [
        "Designed/implemented scalable performance-aware software components for compute-intensive workloads",
        "Developed backend services using Python + cloud infrastructure",
        "Migrated CPU-intensive tasks to AWS Lambda; achieved 10% downtime reduction, 40% cost savings",
        "Managed CI/CD pipelines, version control, and system reliability"
      ]
    },
    {
      title: "Trainee Intern",
      company: "Xyenta, Hyderabad, India",
      period: "Aug 2024 – Dec 2024",
      location: "Hyderabad",
      responsibilities: [
        "Performed SCD Type 1 & 2 transformations on MSSQL databases",
        "Designed ETL pipelines with Azure Data Factory for data processing",
        "Utilized parallel processing with Apache Flink for enhanced performance",
        "Improved data accessibility and pipeline efficiency for product planning decisions"
      ]
    },
    {
      title: "Research Intern",
      company: "Precog@IIITD, Hyderabad, India",
      period: "Feb 2024 – Aug 2024",
      location: "Hyderabad",
      responsibilities: [
        "Developed/evaluated NLP + ML models focusing on efficient inference + system integration",
        "Built analytical dashboards + predictive pipelines for data-driven AI systems",
        "Conducted research in Linux-based environments with reproducible experimentation",
        "Performed benchmarking/testing/validation for real-world deployment"
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
