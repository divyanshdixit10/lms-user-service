import React, { useState, useEffect } from 'react';

const SpatialAudioClassroom = () => {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [participants, setParticipants] = useState([
    { id: 1, name: 'Professor Smith', position: { x: 0, y: 0 }, role: 'instructor', speaking: true },
    { id: 2, name: 'Alex Johnson', position: { x: -2, y: 1 }, role: 'student', speaking: false },
    { id: 3, name: 'Emily Chen', position: { x: 2, y: 1 }, role: 'student', speaking: true },
    { id: 4, name: 'Michael Brown', position: { x: -3, y: 2 }, role: 'student', speaking: false },
    { id: 5, name: 'Sophia Kim', position: { x: 3, y: 2 }, role: 'student', speaking: false },
    { id: 6, name: 'You', position: { x: 0, y: 2 }, role: 'student', speaking: false, isUser: true },
  ]);
  
  const [userPosition, setUserPosition] = useState({ x: 0, y: 2 });
  
  // Simulate spatial audio volume based on distance
  const calculateVolume = (participantPosition) => {
    const dx = participantPosition.x - userPosition.x;
    const dy = participantPosition.y - userPosition.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Inverse square law - volume decreases with square of distance
    // Normalize to keep volume between 0 and 1
    return Math.min(1, Math.max(0, 1 / (1 + distance * 0.5)));
  };
  
  const moveUser = (newX, newY) => {
    setUserPosition({ x: newX, y: newY });
    
    // Update the user's position in the participants array
    setParticipants(participants.map(p => 
      p.isUser ? { ...p, position: { x: newX, y: newY } } : p
    ));
  };
  
  const toggleSpeaking = (id) => {
    setParticipants(participants.map(p => 
      p.id === id ? { ...p, speaking: !p.speaking } : p
    ));
  };
  
  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };
  
  // Classroom dimensions and scale factors
  const classroomWidth = 800;
  const classroomHeight = 500;
  const scaleX = classroomWidth / 10; // 10 units wide
  const scaleY = classroomHeight / 6; // 6 units tall
  
  // Convert logical position to pixel position
  const toPixelPosition = (pos) => {
    return {
      x: (pos.x + 5) * scaleX / 10, // Center at x=0
      y: (pos.y + 1) * scaleY / 6,  // Center at y=0
    };
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="bg-blue-800 text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Advanced JavaScript - Virtual Classroom</h2>
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleAudio} 
              className={`p-2 rounded-full ${audioEnabled ? 'bg-green-500' : 'bg-red-500'}`}
            >
              {audioEnabled ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 01.001-7.072m2.828 9.9a9 9 0 010-12.728" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15.536a5 5 0 01.001-7.072m2.828 9.9a9 9 0 010-12.728M18.364 18.364a9 9 0 11-12.728 0" />
                  <line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2" />
                </svg>
              )}
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Leave Room
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex">
        <div className="flex-1 bg-gray-100 relative overflow-hidden">
          <div 
            className="relative" 
            style={{ 
              width: `${classroomWidth}px`, 
              height: `${classroomHeight}px`,
              margin: '0 auto',
              backgroundColor: '#f0f4f8',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              marginTop: '2rem',
              border: '2px solid #d1d5db',
              position: 'relative'
            }}
          >
            {/* Classroom podium */}
            <div 
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-700 rounded-t-lg"
              style={{ width: '250px', height: '60px' }}
            />

            {/* Interactive whiteboard */}
            <div 
              className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-white border-4 border-gray-700"
              style={{ width: '550px', height: '120px', borderRadius: '4px' }}
            >
              <div className="p-3 text-center text-lg font-semibold text-blue-800">
                Advanced JavaScript: Asynchronous Programming
              </div>
              <div className="px-4 text-sm">
                <code className="bg-gray-100 p-1 rounded">
                  async function fetchData() {'{'} try {'{'} const response = await fetch(url); {'}'} catch(e) {'{'} /* handle error */ {'}'} {'}'}
                </code>
              </div>
            </div>

            {/* Participants */}
            {participants.map(participant => {
              const pixelPos = toPixelPosition(participant.position);
              const volume = calculateVolume(participant.position);
              
              return (
                <div 
                  key={participant.id}
                  className={`absolute ${participant.isUser ? 'bg-green-500' : participant.role === 'instructor' ? 'bg-blue-600' : 'bg-gray-500'} rounded-full flex items-center justify-center text-white font-bold shadow-md cursor-pointer`}
                  style={{ 
                    width: participant.role === 'instructor' ? '70px' : '60px', 
                    height: participant.role === 'instructor' ? '70px' : '60px',
                    left: `${pixelPos.x}px`,
                    top: `${pixelPos.y}px`,
                    transform: 'translate(-50%, -50%)',
                    opacity: audioEnabled ? 1 : 0.5,
                    border: participant.isUser ? '3px solid white' : 'none'
                  }}
                  onClick={() => toggleSpeaking(participant.id)}
                >
                  <span>{participant.name.split(' ').map(n => n[0]).join('')}</span>
                  
                  {/* Speaking indicator */}
                  {participant.speaking && (
                    <div className="absolute -top-2 -right-2 bg-green-400 rounded-full w-4 h-4 border-2 border-white" />
                  )}
                  
                  {/* Audio volume indicator */}
                  {participant.speaking && audioEnabled && (
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-xs text-gray-700 shadow-sm">
                      <div className="flex items-center space-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072" />
                        </svg>
                        <div className="bg-gray-200 w-16 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-green-500 h-full rounded-full" 
                            style={{ width: `${volume * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            
            {/* Grid for moving around */}
            <div className="absolute inset-0 grid grid-cols-10 grid-rows-6 opacity-0 hover:opacity-20 cursor-pointer">
              {[...Array(60)].map((_, i) => {
                const x = (i % 10) - 5 + 0.5; // -4.5 to 4.5
                const y = Math.floor(i / 10) - 1 + 0.5; // -0.5 to 4.5
                
                return (
                  <div 
                    key={i}
                    className="border border-blue-200 hover:bg-blue-100"
                    onClick={() => moveUser(x, y)}
                  />
                );
              })}
            </div>
          </div>

          <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
            <p className="text-sm font-medium text-gray-700 mb-1">Spatial Audio Guide:</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Click on the classroom floor to move your position</li>
              <li>• Audio volume automatically adjusts based on distance</li>
              <li>• Click on a participant to simulate them speaking</li>
            </ul>
          </div>
        </div>
        
        <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
          <h3 className="font-bold text-lg mb-3">Classroom Chat</h3>
          
          <div className="h-96 overflow-y-auto mb-4 bg-gray-50 p-3 rounded border border-gray-200">
            <div className="mb-2">
              <p className="text-xs text-gray-500">Professor Smith · 2:34 PM</p>
              <p className="text-sm">Today we'll explore asynchronous programming in JavaScript</p>
            </div>
            <div className="mb-2">
              <p className="text-xs text-gray-500">Emily Chen · 2:35 PM</p>
              <p className="text-sm">Will we be covering Promises and async/await?</p>
            </div>
            <div className="mb-2">
              <p className="text-xs text-gray-500">Professor Smith · 2:36 PM</p>
              <p className="text-sm">Yes, we'll cover both approaches and when to use each one.</p>
            </div>
            <div className="mb-2">
              <p className="text-xs text-gray-500">Alex Johnson · 2:37 PM</p>
              <p className="text-sm">I've been struggling with error handling in async functions</p>
            </div>
            <div className="mb-2">
              <p className="text-xs text-gray-500">Professor Smith · 2:38 PM</p>
              <p className="text-sm">Great question, we'll spend time on error handling patterns</p>
            </div>
          </div>
          
          <div className="flex">
            <input 
              type="text" 
              className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2"
              placeholder="Type a message..."
            />
            <button className="bg-blue-600 text-white px-4 rounded-r-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpatialAudioClassroom; 