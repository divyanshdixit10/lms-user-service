import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface ChatMessage {
  id: number;
  sender: string;
  message: string;
  time: string;
  isInstructor?: boolean;
  isCurrentUser?: boolean;
}

const LiveClassPage: React.FC = () => {
  const { theme } = useTheme();
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 1, sender: 'Jane Smith', message: 'Hello everyone!', time: '10:02 AM', isInstructor: true },
    { id: 2, sender: 'David Wilson', message: 'Hi Jane, excited for today\'s class!', time: '10:03 AM' },
    { id: 3, sender: 'Sarah Lee', message: 'Quick question - will we be covering async/await today?', time: '10:04 AM' },
    { id: 4, sender: 'Jane Smith', message: 'Yes, Sarah! We\'ll dive deep into async/await and Promises.', time: '10:05 AM', isInstructor: true },
  ]);
  const [messageInput, setMessageInput] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Mock data for participants
  const participants = [
    { id: 1, name: 'Jane Smith', avatar: 'https://randomuser.me/api/portraits/women/32.jpg', isInstructor: true, isMuted: false, hasVideo: true },
    { id: 2, name: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', isMuted: false, hasVideo: true },
    { id: 3, name: 'David Wilson', avatar: 'https://randomuser.me/api/portraits/men/62.jpg', isMuted: true, hasVideo: true },
    { id: 4, name: 'Sarah Lee', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', isMuted: false, hasVideo: false },
    { id: 5, name: 'Michael Brown', avatar: 'https://randomuser.me/api/portraits/men/55.jpg', isMuted: true, hasVideo: false },
  ];

  // Send chat message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim() === '') return;
    
    const newMessage: ChatMessage = {
      id: chatMessages.length + 1,
      sender: 'John Doe',
      message: messageInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true,
    };
    
    setChatMessages([...chatMessages, newMessage]);
    setMessageInput('');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-secondary-900' : 'bg-orange-50'}`}>
      <div className="h-screen flex flex-col">
        {/* Header */}
        <div className={`py-2 px-4 ${
          theme === 'dark' ? 'bg-secondary-800 border-b border-secondary-700' : 'bg-white border-b border-gray-200'
        }`}>
          <div className="flex justify-between items-center">
            <div>
              <h1 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Advanced JavaScript: Promises & Async Programming
              </h1>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Live Class • Instructor: Jane Smith • 26 Participants
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                className={`p-2 rounded-full ${
                  theme === 'dark' ? 'hover:bg-secondary-700' : 'hover:bg-gray-100'
                }`}
                onClick={() => setIsFullScreen(!isFullScreen)}
              >
                {isFullScreen ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5M15 15l5.25 5.25" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                )}
              </button>
              <div className={`h-8 px-3 rounded-full flex items-center ${
                theme === 'dark' ? 'bg-secondary-700' : 'bg-red-100'
              }`}>
                <span className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></span>
                  <span className={`text-xs font-medium ${theme === 'dark' ? 'text-white' : 'text-red-700'}`}>LIVE</span>
                </span>
              </div>
              <button className="bg-red-500 hover:bg-red-600 text-white text-sm py-1.5 px-3 rounded-lg">
                Leave
              </button>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Video Area */}
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            <div className={`flex-1 ${theme === 'dark' ? 'bg-secondary-900' : 'bg-gray-900'} relative`}>
              {/* Main Video */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1531498860502-7c67cf02f657?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                    alt="Instructor teaching JavaScript" 
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs font-semibold">
                    Jane Smith (Instructor)
                  </div>
                </div>
              </div>
              
              {/* Participant Videos */}
              <div className="absolute bottom-4 right-4 flex space-x-2 overflow-x-auto pb-2">
                {participants.slice(1, 5).map((participant) => (
                  <div key={participant.id} className="w-32 h-20 rounded-lg overflow-hidden bg-gray-800 relative flex-shrink-0">
                    {participant.hasVideo ? (
                      <img 
                        src={participant.avatar} 
                        alt={participant.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-secondary-800">
                        <div className={`w-10 h-10 rounded-full ${
                          theme === 'dark' ? 'bg-secondary-700' : 'bg-gray-700'
                        } flex items-center justify-center text-lg font-medium text-white`}>
                          {participant.name.charAt(0)}
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-1 left-1 right-1 flex justify-between items-center">
                      <span className="text-[10px] text-white bg-black/50 px-1 rounded truncate">
                        {participant.name}
                      </span>
                      {participant.isMuted && (
                        <svg className="w-3 h-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                        </svg>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Controls */}
            <div className={`h-16 ${
              theme === 'dark' ? 'bg-secondary-800' : 'bg-white'
            } flex items-center justify-center space-x-2 border-t ${
              theme === 'dark' ? 'border-secondary-700' : 'border-gray-200'
            }`}>
              <button 
                onClick={() => setIsMicOn(!isMicOn)}
                className={`p-3 rounded-full ${
                  isMicOn 
                    ? theme === 'dark' ? 'bg-secondary-700 hover:bg-secondary-600' : 'bg-gray-100 hover:bg-gray-200' 
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                {isMicOn ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                )}
              </button>
              
              <button 
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`p-3 rounded-full ${
                  isVideoOn 
                    ? theme === 'dark' ? 'bg-secondary-700 hover:bg-secondary-600' : 'bg-gray-100 hover:bg-gray-200' 
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                {isVideoOn ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                  </svg>
                )}
              </button>
              
              <button 
                onClick={() => setIsScreenSharing(!isScreenSharing)}
                className={`p-3 rounded-full ${
                  isScreenSharing
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : theme === 'dark' ? 'bg-secondary-700 hover:bg-secondary-600' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>
              
              <button 
                onClick={() => setIsHandRaised(!isHandRaised)}
                className={`p-3 rounded-full ${
                  isHandRaised
                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                    : theme === 'dark' ? 'bg-secondary-700 hover:bg-secondary-600' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              </button>
              
              <button className={`p-3 rounded-full ${
                theme === 'dark' ? 'bg-secondary-700 hover:bg-secondary-600' : 'bg-gray-100 hover:bg-gray-200'
              }`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className={`w-80 border-l ${
            theme === 'dark' ? 'bg-secondary-800 border-secondary-700' : 'bg-white border-gray-200'
          } flex flex-col`}>
            {/* Tabs */}
            <div className={`border-b ${theme === 'dark' ? 'border-secondary-700' : 'border-gray-200'}`}>
              <div className="flex">
                <button className={`flex-1 py-3 text-sm font-medium ${
                  theme === 'dark' 
                    ? 'text-primary-400 border-b-2 border-primary-500' 
                    : 'text-primary-600 border-b-2 border-primary-500'
                }`}>
                  Chat
                </button>
                <button className={`flex-1 py-3 text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                }`}>
                  Participants
                </button>
                <button className={`flex-1 py-3 text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                }`}>
                  Notes
                </button>
              </div>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-lg px-3 py-2 ${
                    msg.isCurrentUser
                      ? 'bg-primary-500 text-white'
                      : msg.isInstructor
                        ? theme === 'dark' 
                          ? 'bg-secondary-700 text-white' 
                          : 'bg-orange-100 text-gray-900'
                        : theme === 'dark'
                          ? 'bg-secondary-700 text-white'
                          : 'bg-gray-100 text-gray-900'
                  }`}>
                    <div className="flex items-center">
                      <span className={`text-xs font-medium ${
                        msg.isCurrentUser
                          ? 'text-white/90'
                          : theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {msg.sender}
                      </span>
                      {msg.isInstructor && (
                        <span className="ml-2 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-primary-500/20 text-primary-500">
                          Instructor
                        </span>
                      )}
                    </div>
                    <p className="mt-1">{msg.message}</p>
                    <div className="mt-1 text-right">
                      <span className={`text-[10px] ${
                        msg.isCurrentUser
                          ? 'text-white/70'
                          : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Chat Input */}
            <div className={`p-3 border-t ${theme === 'dark' ? 'border-secondary-700' : 'border-gray-200'}`}>
              <form onSubmit={handleSendMessage} className="flex items-end gap-2">
                <div className="flex-1 relative">
                  <textarea
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..."
                    className={`w-full rounded-lg resize-none py-2 px-3 text-sm ${
                      theme === 'dark' 
                        ? 'bg-secondary-700 border-secondary-600 text-white placeholder-gray-400' 
                        : 'border-gray-300 text-gray-900 placeholder-gray-500'
                    } border focus:outline-none focus:ring-1 focus:ring-primary-500`}
                    rows={1}
                    style={{ minHeight: '40px', maxHeight: '120px' }}
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="p-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveClassPage; 