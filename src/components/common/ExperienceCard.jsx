import React from 'react';

const ExperienceCard = ({ title, company, period, location, responsibilities }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-blue-800">{title}</h3>
          <p className="text-lg text-blue-600">{company}</p>
        </div>
        <div className="mt-2 md:mt-0 text-right">
          <p className="text-gray-600">{period}</p>
          <p className="text-gray-600">{location}</p>
        </div>
      </div>
      <ul className="space-y-2">
        {responsibilities.map((item, index) => (
          <li key={index} className="flex">
            <span className="mr-2 mt-1 text-blue-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
            </span>
            <span className="text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExperienceCard;