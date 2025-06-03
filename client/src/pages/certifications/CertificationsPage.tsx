import React from 'react';
import { Link } from 'react-router-dom';

// Mock data for available certifications
const availableCertifications = [
  {
    id: 1,
    title: 'Front-End Web Development',
    description: 'Master HTML, CSS, JavaScript, and React to build modern, responsive web applications.',
    price: 49.99,
    duration: '4 weeks',
    level: 'Beginner to Intermediate',
    image: 'https://placehold.co/600x400?text=Frontend+Dev',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Responsive Design']
  },
  {
    id: 2,
    title: 'Back-End Development with Node.js',
    description: 'Learn to build scalable server-side applications using Node.js, Express, and MongoDB.',
    price: 59.99,
    duration: '5 weeks',
    level: 'Intermediate',
    image: 'https://placehold.co/600x400?text=Backend+Dev',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'API Design', 'Authentication']
  },
  {
    id: 3,
    title: 'Full Stack JavaScript Developer',
    description: 'Comprehensive training in both front-end and back-end JavaScript technologies.',
    price: 99.99,
    duration: '10 weeks',
    level: 'Intermediate to Advanced',
    image: 'https://placehold.co/600x400?text=Fullstack+Dev',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'RESTful APIs', 'JWT', 'Git']
  },
  {
    id: 4,
    title: 'Python for Data Science',
    description: 'Master Python programming for data analysis, visualization, and machine learning.',
    price: 69.99,
    duration: '6 weeks',
    level: 'Beginner to Intermediate',
    image: 'https://placehold.co/600x400?text=Python+DS',
    skills: ['Python', 'NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn']
  },
  {
    id: 5,
    title: 'DevOps Engineering',
    description: 'Learn modern DevOps practices, CI/CD pipelines, and cloud infrastructure.',
    price: 79.99,
    duration: '8 weeks',
    level: 'Intermediate to Advanced',
    image: 'https://placehold.co/600x400?text=DevOps',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Infrastructure as Code']
  },
  {
    id: 6,
    title: 'Mobile App Development with React Native',
    description: 'Build cross-platform mobile applications using React Native.',
    price: 59.99,
    duration: '5 weeks',
    level: 'Intermediate',
    image: 'https://placehold.co/600x400?text=React+Native',
    skills: ['JavaScript', 'React Native', 'Redux', 'Mobile UI/UX', 'API Integration']
  }
];

// Mock data for user certificates
const userCertificates = [
  {
    id: 101,
    title: 'JavaScript Fundamentals',
    issueDate: '2025-01-15',
    expiryDate: '2028-01-15',
    credentialId: 'OSOP-JS-2025-1234',
    image: 'https://placehold.co/600x400?text=JS+Certificate',
  }
];

const CertificationsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Certifications</h1>
      <p className="text-gray-600 mb-8">
        Earn industry-recognized certifications to showcase your skills and boost your career
      </p>

      {/* User's Certificates Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">My Certificates</h2>
        
        {userCertificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userCertificates.map(certificate => (
              <div key={certificate.id} className="card p-0 overflow-hidden">
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{certificate.title}</h3>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Issued:</span> {certificate.issueDate}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Expires:</span> {certificate.expiryDate}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Credential ID:</span> {certificate.credentialId}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button className="btn btn-primary">View Certificate</button>
                    <button className="btn btn-outline">Share</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No certificates yet</h3>
            <p className="mt-1 text-gray-500">
              Complete courses and exams to earn your first certificate
            </p>
          </div>
        )}
      </div>

      {/* Available Certifications Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Available Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableCertifications.map(cert => (
            <div key={cert.id} className="card p-0 overflow-hidden flex flex-col">
              <img 
                src={cert.image} 
                alt={cert.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-lg font-semibold mb-2">{cert.title}</h3>
                <p className="text-sm text-gray-600 mb-4 flex-grow">{cert.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Skills you'll learn:</h4>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div>Duration: {cert.duration}</div>
                  <div>Level: {cert.level}</div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-primary">${cert.price}</span>
                  <Link 
                    to={`/certifications/${cert.id}`} 
                    className="btn btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="divide-y divide-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                How do I earn a certificate?
              </h3>
              <p className="text-gray-600">
                To earn a certificate, you need to complete all required courses in the certification 
                program and pass the final assessment with a score of at least 70%.
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Are the certificates recognized by employers?
              </h3>
              <p className="text-gray-600">
                Yes, our certificates are recognized by many employers and industry leaders. 
                We work closely with industry partners to ensure our curriculum meets current 
                job market demands.
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                How long are certificates valid?
              </h3>
              <p className="text-gray-600">
                Most certificates are valid for 3 years from the date of issue. After expiration, 
                you can renew your certificate by taking a refresher course and assessment.
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Can I share my certificates on LinkedIn?
              </h3>
              <p className="text-gray-600">
                Absolutely! You can easily share your certificates on LinkedIn and other social 
                media platforms directly from your dashboard. Each certificate has a unique 
                verification URL that employers can use to verify authenticity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationsPage; 