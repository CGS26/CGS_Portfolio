import React from 'react';
import SectionHeader from './common/SectionHeader';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader title="About Me" />
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-blue-800">Working Student Availability</h3>
            <p className="text-gray-700 mb-4">
              Available for Working Student positions up to 20 hours per week during semester breaks and academic periods.
              Based in Dresden, Germany, with strong foundation in ML systems and performance-critical development.
            </p>
            <p className="text-gray-700 mb-4">
              Security-minded approach to development, ensuring robust and reliable systems in production environments.
            </p>
            <h3 className="text-xl font-semibold mb-4 text-blue-800">Now / Next</h3>
            <p className="text-gray-700 mb-4">
              Currently exploring full-stack development with modern frameworks, AI/ML model deployment and optimization,
              Java-based enterprise applications, and cloud-native architectures. Building expertise in scalable systems
              and performance-critical software development.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-blue-800">Education</h3>
            <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-blue-700">Master's in Computational Modeling and Simulation</h4>
              <p className="text-gray-700">Ongoing</p>
              <p className="text-gray-600">Dresden, Germany</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-blue-700">Bachelor of Technology in Data Science and Artificial Intelligence</h4>
              <p className="text-gray-700">CGPA: 10.0</p>
              <p className="text-gray-600">ICFAI Foundation for Higher Education, Hyderabad</p>
              <p className="text-gray-600">Aug 2021 – June 2025</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;