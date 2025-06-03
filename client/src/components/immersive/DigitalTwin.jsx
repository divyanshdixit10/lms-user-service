import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DigitalTwin = () => {
  const [activeEnvironment, setActiveEnvironment] = useState('');
  const [viewMode, setViewMode] = useState('3d'); // '3d' or '2d'
  
  const environments = [
    { 
      id: 'startup',
      name: 'Tech Startup Office', 
      description: 'Experience the collaborative, fast-paced environment of a growing tech startup.',
      features: ['Open floor plan', 'Multiple monitors', 'Whiteboard walls', 'Coffee station'],
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
      image: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    { 
      id: 'enterprise',
      name: 'Enterprise Development Team', 
      description: 'Work in a structured corporate environment with established development practices.',
      features: ['Cubicles', 'Meeting rooms', 'Enterprise hardware', 'Formal seating arrangement'],
      technologies: ['Java', '.NET', 'Oracle', 'IBM Cloud'],
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    { 
      id: 'agency',
      name: 'Creative Agency', 
      description: 'Dive into the world of a creative digital agency focused on innovative solutions.',
      features: ['Creative spaces', 'Design-focused', 'Brainstorming areas', 'Relaxation zones'],
      technologies: ['Vue.js', 'Django', 'Figma', 'Adobe Suite'],
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    { 
      id: 'remote',
      name: 'Remote Work Setup', 
      description: 'Experience the flexibility and autonomy of a professional remote work environment.',
      features: ['Home office', 'Ergonomic setup', 'Multiple time zones', 'Digital communication tools'],
      technologies: ['Slack', 'Trello', 'GitHub', 'Zoom'],
      image: 'https://images.unsplash.com/photo-1544140708-514b7837c325?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
  ];
  
  const openEnvironment = (id) => {
    setActiveEnvironment(id);
  };
  
  const closeEnvironment = () => {
    setActiveEnvironment('');
  };
  
  const toggleViewMode = () => {
    setViewMode(viewMode === '3d' ? '2d' : '3d');
  };
  
  if (activeEnvironment) {
    const environment = environments.find(env => env.id === activeEnvironment);
    
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button 
                onClick={closeEnvironment}
                className="text-gray-600 hover:text-gray-900"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h2 className="text-xl font-bold">{environment.name}</h2>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={toggleViewMode}
                className={`px-3 py-1 rounded ${viewMode === '3d' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                3D
              </button>
              <button 
                onClick={toggleViewMode}
                className={`px-3 py-1 rounded ${viewMode === '2d' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                2D
              </button>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 3D Viewer / Map */}
            <div className="md:col-span-2 bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: '60vh' }}>
              {viewMode === '3d' ? (
                <div className="relative h-full w-full bg-gray-900">
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center">
                      <p className="text-xl mb-4">3D View</p>
                      <p>Interactive 3D environment would be rendered here using Three.js or similar technology</p>
                      <div className="mt-8 grid grid-cols-2 gap-4 max-w-md mx-auto">
                        <div className="bg-gray-800 p-3 rounded-lg">
                          <p className="text-blue-400 font-semibold">Workstations</p>
                          <p className="text-sm text-gray-300">Multiple monitors with ergonomic chairs</p>
                        </div>
                        <div className="bg-gray-800 p-3 rounded-lg">
                          <p className="text-green-400 font-semibold">Meeting Area</p>
                          <p className="text-sm text-gray-300">Collaborative space with digital whiteboards</p>
                        </div>
                        <div className="bg-gray-800 p-3 rounded-lg">
                          <p className="text-red-400 font-semibold">Break Room</p>
                          <p className="text-sm text-gray-300">Coffee, snacks, and informal discussions</p>
                        </div>
                        <div className="bg-gray-800 p-3 rounded-lg">
                          <p className="text-yellow-400 font-semibold">Quiet Zone</p>
                          <p className="text-sm text-gray-300">Focus area for deep work sessions</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full w-full bg-gray-100 p-4">
                  <div className="border-2 border-gray-300 rounded-lg h-full relative">
                    {/* Simple 2D floor plan */}
                    <div className="absolute top-10 left-10 w-40 h-24 border-2 border-blue-500 rounded bg-blue-100 flex items-center justify-center">
                      <span className="text-sm">Developer Area 1</span>
                    </div>
                    <div className="absolute top-10 right-10 w-40 h-24 border-2 border-blue-500 rounded bg-blue-100 flex items-center justify-center">
                      <span className="text-sm">Developer Area 2</span>
                    </div>
                    <div className="absolute bottom-10 left-10 w-32 h-32 border-2 border-green-500 rounded bg-green-100 flex items-center justify-center">
                      <span className="text-sm">Meeting Room</span>
                    </div>
                    <div className="absolute bottom-10 right-10 w-32 h-16 border-2 border-red-500 rounded bg-red-100 flex items-center justify-center">
                      <span className="text-sm">Break Room</span>
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-20 border-2 border-yellow-500 rounded bg-yellow-100 flex items-center justify-center">
                      <span className="text-sm">Central Collaboration</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Environment Details */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{environment.name}</h3>
                <p className="text-gray-600 mb-4">{environment.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Environment Features</h4>
                  <ul className="space-y-1">
                    {environment.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {environment.technologies.map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                  Start Working in This Environment
                </button>
              </div>
            </div>
          </div>
          
          {/* Interactive Elements */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="font-bold text-lg mb-3">Team Members</h3>
              <div className="space-y-3">
                <div className="flex items-center p-2 hover:bg-gray-50 rounded">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    JD
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">Jane Doe</p>
                    <p className="text-xs text-gray-500">Senior Developer • Online</p>
                  </div>
                </div>
                <div className="flex items-center p-2 hover:bg-gray-50 rounded">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    MS
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">Mike Smith</p>
                    <p className="text-xs text-gray-500">UX Designer • Away</p>
                  </div>
                </div>
                <div className="flex items-center p-2 hover:bg-gray-50 rounded">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    AT
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">Alex Thompson</p>
                    <p className="text-xs text-gray-500">Product Manager • In a meeting</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="font-bold text-lg mb-3">Current Projects</h3>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-md p-3">
                  <div className="flex justify-between">
                    <h4 className="font-medium">API Redesign</h4>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">In Progress</span>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-md p-3">
                  <div className="flex justify-between">
                    <h4 className="font-medium">Mobile App Development</h4>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">On Track</span>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="font-bold text-lg mb-3">Work Environment</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Noise Level</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Collaboration</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Focus Time</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Work Pace</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Digital Twins of Real-World Coding Environments</h1>
      <p className="text-lg text-gray-600 mb-8">Experience and learn in authentic replicas of professional development environments</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {environments.map(environment => (
          <motion.div 
            key={environment.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden h-full"
            whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
          >
            <div className="h-48 bg-gray-300 relative overflow-hidden">
              <img 
                src={environment.image} 
                alt={environment.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <h3 className="text-white text-2xl font-bold p-4">{environment.name}</h3>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-600 mb-4">{environment.description}</p>
              
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {environment.technologies.map((tech, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => openEnvironment(environment.id)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              >
                Explore Environment
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DigitalTwin; 