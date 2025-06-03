import React, { useState } from 'react';
import { motion } from 'framer-motion';

const LearningHub = () => {
  const [activeSpace, setActiveSpace] = useState(null);
  
  const spaces = [
    {
      id: 'collab',
      name: 'Collaboration Zone',
      description: 'Meet other students and work together on projects',
      icon: '👥',
      color: 'from-blue-500 to-indigo-600',
      users: 24,
      activities: ['Pair Programming', 'Code Review', 'Group Projects']
    },
    {
      id: 'lecture',
      name: 'Lecture Hall',
      description: 'Attend live classes and workshops',
      icon: '🎓',
      color: 'from-red-500 to-pink-600',
      users: 156,
      activities: ['Live Lectures', 'Q&A Sessions', 'Guest Speakers']
    },
    {
      id: 'hackathon',
      name: 'Hackathon Arena',
      description: 'Participate in coding competitions and challenges',
      icon: '🏆',
      color: 'from-green-500 to-teal-600',
      users: 78,
      activities: ['Weekend Hackathons', 'Speed Coding', 'Team Competitions']
    },
    {
      id: 'visualization',
      name: 'Code Visualization Lab',
      description: 'Explore code structures and algorithms in 3D space',
      icon: '📊',
      color: 'from-purple-500 to-violet-600',
      users: 12,
      activities: ['Algorithm Visualization', 'Data Structure Models', 'System Architecture']
    }
  ];
  
  const upcomingEvents = [
    {
      id: 'event1',
      title: 'Web3 Development Hackathon',
      date: 'April 15-17, 2023',
      participants: 120,
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'event2',
      title: 'AI/ML Workshop Series',
      date: 'Every Tuesday, 7PM ET',
      participants: 85,
      image: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    }
  ];
  
  // Mock avatar data
  const avatarFeatures = [
    { category: 'Outfit', items: ['Casual', 'Professional', 'Futuristic', 'Formal'] },
    { category: 'Accessories', items: ['Glasses', 'Watches', 'Hats', 'Badges'] },
    { category: 'Achievement Badges', items: ['Course Completion', 'Hackathon Winner', 'Top Contributor', 'Mentor'] }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header with 3D effect */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-800 to-indigo-900 py-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="h-full w-full bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <motion.h1 
              className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Metaverse Learning Hub
            </motion.h1>
            <motion.p 
              className="text-xl text-blue-100 max-w-3xl mx-auto"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Immerse yourself in a collaborative virtual world designed for coding, learning, and building together
            </motion.p>
          </div>
          
          <motion.div 
            className="mt-12 flex justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg mr-4 shadow-lg">
              Enter Learning Hub
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg">
              Take a Tour
            </button>
          </motion.div>
        </div>
      </div>
      
      {/* Virtual Spaces */}
      <div className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Virtual Learning Spaces</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {spaces.map((space) => (
              <motion.div
                key={space.id}
                className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                onClick={() => setActiveSpace(space.id === activeSpace ? null : space.id)}
              >
                <div className={`h-32 bg-gradient-to-r ${space.color} flex items-center justify-center`}>
                  <span className="text-6xl">{space.icon}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{space.name}</h3>
                  <p className="text-gray-400 mb-4">{space.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-400 text-sm">{space.users} users online</span>
                    <span className="text-purple-400 text-sm">
                      {space.id === activeSpace ? 'Hide Details' : 'View Details'}
                    </span>
                  </div>
                  
                  {/* Expandable details */}
                  {space.id === activeSpace && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-gray-700"
                    >
                      <h4 className="text-sm font-semibold mb-2 text-gray-300">Activities</h4>
                      <ul className="text-sm text-gray-400 space-y-1">
                        {space.activities.map((activity, index) => (
                          <li key={index} className="flex items-center">
                            <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mr-2"></span>
                            {activity}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4">
                        <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg text-sm font-medium">
                          Join This Space
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Code Visualization */}
      <div className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Interactive Code Visualization</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Experience your code in a whole new dimension with our 3D visualization tools</p>
          </div>
          
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Binary Search Tree Visualization</h3>
              <div className="flex space-x-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-3 rounded">Insert Node</button>
                <button className="bg-red-600 hover:bg-red-700 text-white text-sm py-1 px-3 rounded">Delete Node</button>
                <button className="bg-green-600 hover:bg-green-700 text-white text-sm py-1 px-3 rounded">Traverse</button>
              </div>
            </div>
            
            {/* Mock 3D Visualization */}
            <div className="h-96 bg-gray-900 rounded-lg relative flex items-center justify-center">
              <div className="relative w-4/5 h-4/5">
                {/* Root node */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg text-white font-bold">
                  50
                </div>
                
                {/* Level 1 nodes with connecting lines */}
                <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg text-white font-bold">
                  25
                </div>
                <div className="absolute top-1/4 left-3/4 transform -translate-x-1/2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg text-white font-bold">
                  75
                </div>
                
                {/* Level 2 nodes */}
                <div className="absolute top-2/4 left-1/8 transform -translate-x-1/2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg text-white font-bold">
                  15
                </div>
                <div className="absolute top-2/4 left-3/8 transform -translate-x-1/2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg text-white font-bold">
                  35
                </div>
                <div className="absolute top-2/4 left-5/8 transform -translate-x-1/2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg text-white font-bold">
                  65
                </div>
                <div className="absolute top-2/4 left-7/8 transform -translate-x-1/2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg text-white font-bold">
                  85
                </div>
                
                {/* SVG for lines */}
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
                  {/* Root to left child */}
                  <line x1="50%" y1="8%" x2="25%" y2="25%" stroke="#4F46E5" strokeWidth="2" />
                  {/* Root to right child */}
                  <line x1="50%" y1="8%" x2="75%" y2="25%" stroke="#4F46E5" strokeWidth="2" />
                  
                  {/* Level 1 left to its children */}
                  <line x1="25%" y1="25%" x2="12.5%" y2="50%" stroke="#4F46E5" strokeWidth="2" />
                  <line x1="25%" y1="25%" x2="37.5%" y2="50%" stroke="#4F46E5" strokeWidth="2" />
                  
                  {/* Level 1 right to its children */}
                  <line x1="75%" y1="25%" x2="62.5%" y2="50%" stroke="#4F46E5" strokeWidth="2" />
                  <line x1="75%" y1="25%" x2="87.5%" y2="50%" stroke="#4F46E5" strokeWidth="2" />
                </svg>
              </div>
              
              <div className="absolute bottom-4 right-4 text-xs text-gray-400">
                <p>Click and drag to rotate • Scroll to zoom</p>
              </div>
            </div>
            
            <div className="mt-4 bg-gray-900 rounded p-4 font-mono text-sm text-gray-300">
              <div className="flex items-center text-xs mb-2">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                <span>JavaScript Implementation</span>
              </div>
              <pre>
{`class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  
  insert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    
    let current = this.root;
    while(true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
      
      {/* Upcoming Events */}
      <div className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Upcoming Virtual Events</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {upcomingEvents.map(event => (
              <motion.div
                key={event.id}
                className="bg-gray-900 rounded-xl overflow-hidden shadow-lg"
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-blue-400">{event.date}</span>
                    <span className="bg-blue-900 text-blue-300 px-2 py-1 rounded text-xs">
                      {event.participants} registered
                    </span>
                  </div>
                  <button className="w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-lg font-medium">
                    Join Event
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Avatar Customization */}
      <div className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Customize Your Digital Avatar</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Express yourself and showcase your achievements in the metaverse</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-6">Avatar Customization</h3>
              
              <div className="space-y-6">
                {avatarFeatures.map((feature, index) => (
                  <div key={index}>
                    <h4 className="text-blue-400 font-medium mb-3">{feature.category}</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {feature.items.map((item, itemIndex) => (
                        <button 
                          key={itemIndex}
                          className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded text-sm"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg flex items-center justify-center">
              <div className="text-center p-6">
                <div className="w-48 h-48 bg-blue-900 rounded-full mx-auto mb-4 relative overflow-hidden">
                  {/* This would be the actual avatar preview in a real implementation */}
                  <div className="absolute inset-0 flex items-center justify-center text-6xl">
                    👤
                  </div>
                </div>
                <h4 className="text-xl font-semibold">Your Avatar</h4>
                <p className="text-gray-400 mt-2">Achievement Level: Advanced</p>
                <button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningHub; 