import React from 'react';
import SectionHeader from './common/SectionHeader';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader title="About Me" />
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-blue-800">Software Engineer & Data Scientist</h3>
            <p className="text-gray-700 mb-4">
              I am an innovative Software Engineer with technical expertise in all phases of the Software Development Lifecycle (SDLC).
              My experience spans requirement analysis, documentation (HLD/LLD), coding, development, testing (UAT), go-live, 
              post-implementation support, and end-user training.
            </p>
            <p className="text-gray-700 mb-4">
              As a results-driven Project Lead, I've executed diverse Full Stack / Web Application Development, Process Automation,
              Cloud, IDS, R&D, and Data Analytics Projects in various domains. I specialize in Data Analysis, Visualization & Reporting,
              interpreting large datasets to provide actionable insights for organizations.
            </p>
            <p className="text-gray-700">
              I'm a collaborative team player, problem solver, and go-getter with proven ability to relate to people at any level of business
              and management, work under pressure, and meet tight deadlines.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-blue-800">Education & Certification</h3>
            <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-blue-700">Bachelor of Technology (B.Tech.)</h4>
              <p className="text-gray-700">Data Science & Artificial Intelligence</p>
              <p className="text-gray-600">ICFAI Foundation for Higher Education, Hyderabad</p>
              <p className="text-gray-600">Aug 2021 – Jun 2025</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-blue-700">Deep Learning Specialization</h4>
              <p className="text-gray-700">Deep Learning.AI by Andrew Ng</p>
              <p className="text-gray-600">Coursera, Jun 2024</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;