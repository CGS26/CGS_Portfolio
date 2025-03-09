import React from 'react';
import SectionHeader from './common/SectionHeader';

const Awards = () => {
  const awards = [
    {
      title: "Smart India Hackathon 2024",
      description: "Winner in the Software domain (Internal Round), selected for the SIH Finals."
    },
    {
      title: "Merit-based Scholarship",
      description: "Received for Academic Excellence at ICFAI Foundation for Higher Education."
    },
    {
      title: "AI/ML Program Selection",
      description: "Selected for AI/ML Program at IIIT (top 2 students from each institute)."
    },
    {
      title: "Coding Competition Organizer",
      description: "Organized many coding competitions and received appreciation letters."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader title="Awards & Accolades" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {awards.map((award, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm border-l-4 border-blue-600">
              <h4 className="text-lg font-semibold text-blue-700 mb-2">{award.title}</h4>
              <p className="text-gray-700">{award.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;