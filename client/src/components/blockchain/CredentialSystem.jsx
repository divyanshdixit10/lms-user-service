import React, { useState } from 'react';

const CredentialSystem = () => {
  const [activeTab, setActiveTab] = useState('credentials');
  
  const credentials = [
    { 
      id: 'cred001',
      title: 'Full Stack Web Development', 
      issuer: 'CodeMaster Academy',
      issuedOn: '2023-05-15',
      expiresOn: '2026-05-15',
      skills: ['React', 'Node.js', 'MongoDB', 'Express'],
      verified: true,
      tokenId: '0x7d2f...',
      icon: '🔰'
    },
    { 
      id: 'cred002',
      title: 'Advanced JavaScript', 
      issuer: 'JavaScript Institute',
      issuedOn: '2023-03-10',
      expiresOn: null,
      skills: ['ES6+', 'Async/Await', 'Performance', 'Testing'],
      verified: true,
      tokenId: '0x9e3a...',
      icon: '⚡'
    }
  ];
  
  const jobListings = [
    {
      id: 'job001',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'Remote',
      salary: '$120,000 - $150,000',
      skills: ['React', 'TypeScript', 'Redux', 'Performance Optimization'],
      credentialsRequired: ['Full Stack Web Development', 'Advanced JavaScript']
    },
    {
      id: 'job002',
      title: 'Full Stack Developer',
      company: 'Startup Innovations',
      location: 'New York, NY',
      salary: '$100,000 - $130,000',
      skills: ['React', 'Node.js', 'MongoDB', 'Express'],
      credentialsRequired: ['Full Stack Web Development']
    },
    {
      id: 'job003',
      title: 'UI/UX Developer',
      company: 'Creative Solutions',
      location: 'San Francisco, CA',
      salary: '$110,000 - $140,000',
      skills: ['React', 'CSS/SASS', 'UI/UX', 'Wireframing'],
      credentialsRequired: ['UI/UX Design Fundamentals', 'Advanced JavaScript']
    }
  ];
  
  const rewards = [
    {
      id: 'token001',
      title: 'Course Completion Bonus',
      amount: '50 EDU',
      type: 'Achievement',
      description: 'Earned for completing the Full Stack Web Development course'
    },
    {
      id: 'token002',
      title: 'Mentorship Tokens',
      amount: '25 EDU',
      type: 'Community',
      description: 'Earned for mentoring 5 students'
    },
    {
      id: 'token003',
      title: 'Bug Bounty Reward',
      amount: '100 EDU',
      type: 'Contribution',
      description: 'For identifying and fixing a critical bug in the platform'
    }
  ];
  
  const checkCredentialEligibility = (job) => {
    const requiredCreds = job.credentialsRequired;
    const userCreds = credentials.map(cred => cred.title);
    
    const missingCreds = requiredCreds.filter(cred => !userCreds.includes(cred));
    
    return {
      eligible: missingCreds.length === 0,
      missingCreds
    };
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="bg-blue-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Blockchain Credential System</h1>
          <p className="mt-2 text-blue-100">Securely manage, verify, and share your credentials</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="flex border-b">
            <button
              className={`py-4 px-6 text-lg font-medium ${activeTab === 'credentials' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('credentials')}
            >
              My Credentials
            </button>
            <button
              className={`py-4 px-6 text-lg font-medium ${activeTab === 'jobs' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('jobs')}
            >
              Job Marketplace
            </button>
            <button
              className={`py-4 px-6 text-lg font-medium ${activeTab === 'rewards' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('rewards')}
            >
              Token Rewards
            </button>
          </div>
          
          <div className="p-6">
            {/* Credentials Tab */}
            {activeTab === 'credentials' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Your Verified Credentials</h2>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                    Import Credential
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {credentials.map(credential => (
                    <div key={credential.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-700 px-4 py-3 text-white">
                        <div className="flex justify-between items-center">
                          <span className="text-4xl">{credential.icon}</span>
                          {credential.verified && (
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                              <svg className="w-3 h-3 mr-1 text-green-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                              </svg>
                              Verified
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold mt-2">{credential.title}</h3>
                        <p className="text-blue-100">{credential.issuer}</p>
                      </div>
                      <div className="p-4 bg-white">
                        <div className="mb-3">
                          <p className="text-gray-600 text-sm">Issued: {credential.issuedOn}</p>
                          {credential.expiresOn && (
                            <p className="text-gray-600 text-sm">Expires: {credential.expiresOn}</p>
                          )}
                        </div>
                        
                        <div className="mb-3">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">Skills Certified</h4>
                          <div className="flex flex-wrap gap-2">
                            {credential.skills.map((skill, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                          <div className="text-xs text-gray-500 font-mono">
                            Token ID: {credential.tokenId}
                          </div>
                          <div>
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              View on Chain
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Jobs Marketplace Tab */}
            {activeTab === 'jobs' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Job Marketplace</h2>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Search jobs..."
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-6">
                  {jobListings.map(job => {
                    const eligibility = checkCredentialEligibility(job);
                    
                    return (
                      <div key={job.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="px-6 py-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                              <p className="text-gray-600">{job.company} • {job.location}</p>
                            </div>
                            <div>
                              <span 
                                className={`inline-flex px-3 py-1 rounded-full text-sm font-medium
                                  ${eligibility.eligible 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                  }`}
                              >
                                {eligibility.eligible ? '✓ Qualified' : '⚠ Missing Credentials'}
                              </span>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <p className="text-gray-700 font-medium">{job.salary}</p>
                            
                            <div className="mt-3">
                              <h4 className="text-sm font-semibold text-gray-700 mb-2">Required Skills</h4>
                              <div className="flex flex-wrap gap-2">
                                {job.skills.map((skill, index) => (
                                  <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div className="mt-3">
                              <h4 className="text-sm font-semibold text-gray-700 mb-2">Required Credentials</h4>
                              <div className="flex flex-wrap gap-2">
                                {job.credentialsRequired.map((cred, index) => {
                                  const hasCredential = credentials.some(c => c.title === cred);
                                  
                                  return (
                                    <span 
                                      key={index} 
                                      className={`text-xs px-2 py-1 rounded flex items-center
                                        ${hasCredential
                                          ? 'bg-green-100 text-green-800' 
                                          : 'bg-red-100 text-red-800'
                                        }`}
                                    >
                                      {hasCredential && (
                                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                      )}
                                      {!hasCredential && (
                                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                        </svg>
                                      )}
                                      {cred}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-6 flex justify-end">
                            <button 
                              className={`px-4 py-2 rounded-lg font-medium
                                ${eligibility.eligible
                                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                }`}
                              disabled={!eligibility.eligible}
                            >
                              {eligibility.eligible ? 'Apply with Credentials' : 'Missing Required Credentials'}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Token Rewards Tab */}
            {activeTab === 'rewards' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Token Rewards</h2>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-blue-700">
                    <span className="font-bold">175 EDU</span> tokens available
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Your Earned Tokens</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {rewards.map(reward => (
                      <div key={reward.id} className="border rounded-lg overflow-hidden shadow-sm">
                        <div className={`px-4 py-3 text-white
                          ${reward.type === 'Achievement' ? 'bg-gradient-to-r from-green-500 to-green-700' : 
                            reward.type === 'Community' ? 'bg-gradient-to-r from-purple-500 to-purple-700' :
                            'bg-gradient-to-r from-yellow-500 to-yellow-700'
                          }`}
                        >
                          <h4 className="font-bold">{reward.title}</h4>
                          <p className="text-sm opacity-90">{reward.type}</p>
                        </div>
                        <div className="p-4 bg-white">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600">Amount:</span>
                            <span className="font-bold text-lg">{reward.amount}</span>
                          </div>
                          <p className="text-sm text-gray-600">{reward.description}</p>
                          <div className="mt-4 flex justify-end">
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              View Transaction
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Earn More Tokens</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start">
                        <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h4 className="font-medium">Complete Courses</h4>
                          <p className="text-sm text-gray-600 mt-1">Earn 20-50 EDU tokens for each course you complete</p>
                          <button className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Browse Courses
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start">
                        <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h4 className="font-medium">Contribute to Platform</h4>
                          <p className="text-sm text-gray-600 mt-1">Earn tokens by fixing bugs, contributing code, or creating content</p>
                          <button className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium">
                            View Opportunities
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start">
                        <div className="rounded-full bg-green-100 p-3 text-green-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h4 className="font-medium">Mentor Other Students</h4>
                          <p className="text-sm text-gray-600 mt-1">Earn 5 EDU tokens for each student you help</p>
                          <button className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Become a Mentor
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start">
                        <div className="rounded-full bg-red-100 p-3 text-red-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h4 className="font-medium">Complete Challenges</h4>
                          <p className="text-sm text-gray-600 mt-1">Earn 10-30 EDU tokens by completing coding challenges</p>
                          <button className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium">
                            View Challenges
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CredentialSystem; 