import React, { useState } from 'react';
import { motion } from 'framer-motion';

const VRPairProgramming = () => {
  const [isJoined, setIsJoined] = useState(false);
  const [availableSessions, setAvailableSessions] = useState([
    { id: 1, title: 'React Hooks Deep Dive', participants: 1, maxParticipants: 2, level: 'Intermediate' },
    { id: 2, title: 'Building a REST API with Node.js', participants: 0, maxParticipants: 2, level: 'Beginner' },
    { id: 3, title: 'Advanced TypeScript Patterns', participants: 1, maxParticipants: 2, level: 'Advanced' },
  ]);

  const joinSession = (sessionId) => {
    setIsJoined(true);
    // In a real implementation, this would connect to a WebRTC session
    // and initialize the VR environment
  };

  const leaveSession = () => {
    setIsJoined(false);
  };

  if (isJoined) {
    return (
      <div className="flex flex-col h-screen">
        <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">VR Pair Programming Session</h2>
          <button 
            onClick={leaveSession}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Leave Session
          </button>
        </div>
        
        <div className="flex flex-1">
          {/* VR Viewport */}
          <div className="flex-1 bg-gray-900 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center">
                <p className="text-xl mb-4">VR Session Active</p>
                <p>In a real implementation, this would be your WebVR viewport</p>
                <div className="mt-10 p-6 bg-gray-800 rounded-lg w-3/4 mx-auto">
                  <pre className="text-green-400 text-left">
                    {`function calculateTotal(items) {
  return items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
          
          {/* Collaboration Panel */}
          <div className="w-96 bg-gray-100 p-4 overflow-y-auto">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Participants</h3>
              <div className="flex items-center p-2 bg-white rounded shadow mb-2">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  JP
                </div>
                <div className="ml-3">
                  <p className="font-medium">John Programmer</p>
                  <p className="text-xs text-gray-500">Online • Coding</p>
                </div>
              </div>
              <div className="flex items-center p-2 bg-white rounded shadow">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  YOU
                </div>
                <div className="ml-3">
                  <p className="font-medium">You</p>
                  <p className="text-xs text-gray-500">Online • Viewing</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Voice Chat</h3>
              <div className="flex space-x-2">
                <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 01.001-7.072m2.828 9.9a9 9 0 010-12.728" />
                  </svg>
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Chat</h3>
              <div className="bg-white p-3 rounded shadow h-48 overflow-y-auto mb-2">
                <div className="mb-2">
                  <span className="font-semibold text-blue-600">John: </span>
                  <span>I think we need to add error handling to this function</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-green-600">You: </span>
                  <span>Good point, let's wrap it in a try/catch</span>
                </div>
              </div>
              <div className="flex">
                <input 
                  type="text" 
                  className="flex-1 border border-gray-300 rounded-l p-2"
                  placeholder="Type a message..."
                />
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">VR Pair Programming Sessions</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableSessions.map(session => (
          <motion.div 
            key={session.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white">
              <h3 className="text-xl font-bold">{session.title}</h3>
              <p className="text-blue-100">Level: {session.level}</p>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">
                  {session.participants}/{session.maxParticipants} participants
                </span>
                <span className={`px-2 py-1 rounded text-xs ${
                  session.participants < session.maxParticipants 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {session.participants < session.maxParticipants ? 'Available' : 'Full'}
                </span>
              </div>
              <button
                onClick={() => joinSession(session.id)}
                disabled={session.participants >= session.maxParticipants}
                className={`w-full py-2 rounded font-semibold ${
                  session.participants < session.maxParticipants
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Join Session
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Create Your Own Session</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Session Title</label>
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Enter a title for your session"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Difficulty Level</label>
              <select className="w-full border border-gray-300 rounded p-2">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea 
              className="w-full border border-gray-300 rounded p-2"
              rows="3"
              placeholder="Describe what you want to work on"
            ></textarea>
          </div>
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
            Create New Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default VRPairProgramming; 