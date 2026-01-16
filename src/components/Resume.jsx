import React from 'react';
import SectionHeader from './common/SectionHeader';

const Resume = () => {
  return (
    <section id="resume" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader title="Resume" />
        <div className="max-w-4xl mx-auto bg-gray-50 p-8 rounded-lg shadow-lg text-sm">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-800 mb-2">Cherukuri Gaurav Sushant</h2>
            <p className="text-gray-600">Dresden, Germany | Email: gauravsushant267@gmail.com | Phone: (+49) 15563933355</p>
            <p className="text-gray-600">LinkedIn: linkedin.com/in/gaurav-sushant-cherukuri | GitHub: github.com/CGS26/ | Portfolio: cgsushant.tech/</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Objective</h3>
            <p className="text-gray-700">
              Master's student in Computational Modeling and Simulation with a strong foundation in Machine Learning, full-stack development, and performance-critical software. Seeking a Working Student (Werkstudent) position to contribute to AI/ML applications, Java enterprise systems, and scalable cloud solutions while continuing my studies. Experienced in Python-based ML development, Java programming, and full-stack web development.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Skills</h3>
            <p className="text-gray-700"><strong>Programming & Systems:</strong> Python (Advanced), C/C++ (Working Knowledge), Java, Linux, Bash, Git</p>
            <p className="text-gray-700"><strong>Machine Learning & AI:</strong> PyTorch, TensorFlow, Keras, Scikit-Learn, Neural Networks, CNNs, NLP, Computer Vision</p>
            <p className="text-gray-700"><strong>Model Deployment & Systems:</strong> ML inference pipelines, model optimization, ONNX (familiarity), performance-aware software design, heterogeneous compute workloads</p>
            <p className="text-gray-700"><strong>Cloud & Tooling:</strong> AWS, Azure, Google Cloud, Docker, Kubernetes, Azure Data Factory, GitLab CI/CD</p>
            <p className="text-gray-700"><strong>Data & Databases:</strong> MySQL, MSSQL, MongoDB, NoSQL, Statistics, Probability, Data Analysis</p>
            <p className="text-gray-700"><strong>Frameworks (Secondary):</strong> Flask, Node.js, React, Next.js</p>
            <p className="text-gray-700"><strong>Soft Skills:</strong> Analytical thinking, independent working style, attention to detail, collaboration</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Experience</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800">Freelance Developer — Prepstreak, UK (Remote)</h4>
                <p className="text-gray-600">April 2025 - June 2025</p>
                <ul className="list-disc list-inside text-gray-700 mt-2">
                  <li>Developed a cross-platform mobile learning application tailored for students in grades 4–6, promoting consistent study habits.</li>
                  <li>Leveraged React Native and Supabase to create an interactive, user-friendly experience with personalized content delivery and real-time user tracking.</li>
                  <li>Designed and implemented gamification features such as streak-based rewards, boosting engagement and long-term user retention.</li>
                  <li>Focused on delivering a curriculum-aligned, dynamic interface optimized for young learners to encourage daily learning participation.</li>
                </ul>
                <p className="font-medium text-gray-800 mt-2">AI Automation & Data Systems (Production Use):</p>
                <ul className="list-disc list-inside text-gray-700 mt-2">
                  <li>Designed and implemented an automated PDF-to-SQL data ingestion pipeline to convert raw SAT practice materials into structured relational databases.</li>
                  <li>Developed Python-based data processing logic using LangChain and LlamaIndex to extract, clean, and normalize unstructured PDF content.</li>
                  <li>Integrated LLM-assisted semantic parsing with validation logic to ensure schema consistency and data accuracy.</li>
                  <li>Orchestrated the workflow using n8n, enabling automated, repeatable, and fault-tolerant execution.</li>
                  <li>Delivered a production-ready system that significantly reduced manual data entry and enabled scalable, database-driven application features.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Intern — Xyenta, Hyderabad, India</h4>
                <p className="text-gray-600">Jan 2025 - June 2025</p>
                <ul className="list-disc list-inside text-gray-700 mt-2">
                  <li>Collaborated with cross-functional teams to design and implement scalable, performance-aware software components.</li>
                  <li>Developed and deployed backend services supporting compute-intensive workloads using Python and cloud platforms.</li>
                  <li>Migrated CPU-intensive tasks to serverless architectures (AWS Lambda), reducing downtime by 10% and operational cost by 40%.</li>
                  <li>Applied best practices in CI/CD, version control, and system reliability, aligning with production-grade software standards.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Trainee Intern — Xyenta, Hyderabad, India</h4>
                <p className="text-gray-600">Aug 2024 - Dec 2024</p>
                <ul className="list-disc list-inside text-gray-700 mt-2">
                  <li>Performed SCD Type 1 & 2 transformations on MSSQL servers ensuring accurate and consistent data warehousing.</li>
                  <li>Built scalable ETL pipelines using Azure Data Factory (ADF) to streamline data workflows and extract critical business insights.</li>
                  <li>Utilized Apache Flink to process large-scale data in parallel, transforming it for advanced analytics and reporting.</li>
                  <li>Worked cross-functionally to enhance data accessibility and pipeline performance.</li>
                  <li>Used data analysis and forecasting to improve product planning decisions.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Research Intern — Precog@IIITD, Hyderabad, India</h4>
                <p className="text-gray-600">Feb 2024 – Aug 2024</p>
                <ul className="list-disc list-inside text-gray-700 mt-2">
                  <li>Developed and evaluated NLP and ML models with emphasis on efficient inference and system integration.</li>
                  <li>Built analytical dashboards and predictive pipelines to support data-driven AI systems.</li>
                  <li>Worked in Linux-based research environments, supporting reproducible ML experimentation.</li>
                  <li>Assisted in benchmarking, testing, and validating ML workflows for real-world deployment scenarios.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Infosec Intern — Newmark, Hyderabad, India</h4>
                <p className="text-gray-600">Jun 2023 – Aug 2023</p>
                <ul className="list-disc list-inside text-gray-700 mt-2">
                  <li>Security & Performance: Automated incident response in Azure Sentinel; developed custom detection rules with KQL to improve proactive threat management.</li>
                  <li>Metrics-Driven Analysis: Employed telemetry data to optimize firewall configurations and threat-hunting processes, ensuring a more stable and secure platform.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Education</h3>
            <div>
              <h4 className="font-medium text-gray-800">Master of Science (M.Sc.) – Computational Modeling and Simulation</h4>
              <p className="text-gray-600">October 2025 - September 2027 | Technische Universität Dresden, Germany</p>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                <li>Focus: Scientific Computing, High-Performance Computing, Applied Mathematics</li>
                <li>Interests: AI-driven modeling, edge intelligence, performance-critical systems</li>
              </ul>
            </div>
            <div className="mt-4">
              <h4 className="font-medium text-gray-800">Bachelor of Technology in Data Science and Artificial Intelligence</h4>
              <p className="text-gray-600">August 2021 - May 2025 | CGPA: 10.0 | ICFAI Foundation for Higher Education, Hyderabad</p>
              <p className="text-gray-700">Core Focus: Machine Learning, Cloud Computing, Computer Science Principles</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Publications</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Research Paper - Title: Investigating Vulnerabilities of Information Solicitation Process in RPL-based IoT Networks</li>
              <li>Research Chapter - Title: Optimizing Networking Systems with Machine Learning Approach</li>
              <li>Research Paper - Title: A Comparative Analysis of Deep Learning Algorithms for Intrusion Detection in IoT</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Projects</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800">QuickLeave | Link: https://quickleave-fst.vercel.app/</h4>
                <p className="text-gray-600">Oct 2024 – Nov 2024 | Next.js, Firebase, Material UI</p>
                <ul className="list-disc list-inside text-gray-700 mt-2">
                  <li>Built an efficient leave management system used by HR teams, delivering a 25% reduction in approval times.</li>
                  <li>Designed with customers in mind, focusing on intuitive workflows and responsive UI.</li>
                  <li>Emphasized high-quality frontend and backend integration for seamless operation.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Docuspace | Link: https://docu-team.web.app/</h4>
                <p className="text-gray-600">Aug 2024 – Sep 2024 | Next.js, Flask, Ollama (LLM)</p>
                <ul className="list-disc list-inside text-gray-700 mt-2">
                  <li>Developed and deployed NLP-based OCR assistant using LLMs with Flask backend; applied deep learning for text extraction and semantic search.</li>
                  <li>Designed an end-to-end neural inference pipeline, focusing on low-latency backend execution and deployment efficiency.</li>
                  <li>Engineered an LLM-driven OCR document tool allowing customers to interact with content via chat.</li>
                  <li>Prioritized high-quality code, responsive design, and low-latency responses.</li>
                  <li>Collaborated with fellow engineers to maintain clean APIs and integrate with GenAI components.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Awards & Accolades</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Credited as Winner of Smart Indian Hackathon-2024, in the Software domain (Internal Round)</li>
              <li>Received Merit-based scholarship for Academic Excellence at ICFAI - till Current Semester</li>
              <li>Selected for AI/ML Program at IIIT (Where the top 2 students from each institute were selected)</li>
              <li>Finalist in Smart India Hackathon 2024 (National Level)</li>
            </ul>
          </div>

          <div className="text-center">
            <a
              href="/Cherukuri Gaurav Sushant.pdf"
              download="Cherukuri_Gaurav_Sushant_CV.pdf"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
            >
              Download Full CV (PDF)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;