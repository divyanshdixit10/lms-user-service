import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIAssistantProps {
  initialMessage?: string;
  theme?: 'light' | 'dark';
  position?: 'right' | 'left' | 'bottom';
  context?: 'coding' | 'learning' | 'general';
  onClose?: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({
  initialMessage = "Hi there! I'm your AI learning assistant. How can I help you today?",
  theme = 'light',
  position = 'right',
  context = 'general',
  onClose
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: initialMessage,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Predefined context-based suggestions
  const suggestions = {
    coding: [
      "How do I fix this error?",
      "Explain this code pattern",
      "Help me optimize this algorithm",
      "Convert this code to another language"
    ],
    learning: [
      "Explain this concept",
      "Give me practice exercises",
      "What should I learn next?",
      "How do I apply this in a real project?"
    ],
    general: [
      "What are the trending technologies?",
      "Help me with my learning path",
      "Recommend learning resources",
      "How do I prepare for technical interviews?"
    ]
  };

  // Custom titles based on context
  const contextTitles = {
    coding: "Code Assistant",
    learning: "Learning Guide",
    general: "AI Assistant"
  };

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response (would connect to a real API in production)
    setTimeout(() => {
      let response: Message;
      
      // Context-aware responses
      if (input.toLowerCase().includes('error')) {
        response = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "It looks like you're encountering an error. To help you better, could you share the error message or code snippet you're working with?",
          timestamp: new Date()
        };
      } else if (input.toLowerCase().includes('explain')) {
        response = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "I'd be happy to explain! Let me break down this concept for you in simple terms...",
          timestamp: new Date()
        };
      } else if (input.toLowerCase().includes('recommend') || input.toLowerCase().includes('suggest')) {
        response = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "Based on your interests and learning progress, I recommend exploring these resources and topics...",
          timestamp: new Date()
        };
      } else {
        response = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "Thanks for your question! I'm analyzing it and will provide a helpful response tailored to your needs.",
          timestamp: new Date()
        };
      }
      
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Position styles
  const getPositionStyles = () => {
    switch (position) {
      case 'left':
        return { left: '20px', bottom: '20px' };
      case 'bottom':
        return { bottom: '20px', left: '50%', transform: 'translateX(-50%)' };
      case 'right':
      default:
        return { right: '20px', bottom: '20px' };
    }
  };

  return (
    <>
      {/* Chat toggle button */}
      <motion.button
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed z-50 rounded-full shadow-lg p-4 text-white"
        style={{
          ...getPositionStyles(),
          backgroundColor: isOpen ? '#EF4444' : '#6366F1'
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </motion.button>
      
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`fixed z-40 w-80 sm:w-96 h-96 rounded-lg shadow-xl overflow-hidden flex flex-col ${
              theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
            }`}
            style={getPositionStyles()}
          >
            {/* Header */}
            <div className={`p-4 border-b flex justify-between items-center ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-indigo-600 text-white'
            }`}>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-2">
                  <span className="text-indigo-600 text-lg">🤖</span>
                </div>
                <h3 className="font-medium">{contextTitles[context]}</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white opacity-70 hover:opacity-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Messages area */}
            <div className={`flex-1 overflow-y-auto p-4 ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === 'user'
                        ? theme === 'dark'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-indigo-600 text-white'
                        : theme === 'dark'
                        ? 'bg-gray-700 text-white'
                        : 'bg-white text-gray-800 shadow-sm'
                    }`}
                  >
                    <div className="text-sm">{message.content}</div>
                    <div className={`text-xs mt-1 ${
                      message.role === 'user'
                        ? 'text-indigo-200'
                        : theme === 'dark'
                        ? 'text-gray-400'
                        : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex mb-4">
                  <div className={`rounded-lg px-4 py-2 ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-white shadow-sm'
                  }`}>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Suggestions */}
            {messages.length < 3 && (
              <div className={`px-4 py-3 ${
                theme === 'dark' ? 'bg-gray-900 border-t border-gray-700' : 'bg-white border-t border-gray-200'
              }`}>
                <p className={`text-xs mb-2 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Suggested questions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestions[context].map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                        theme === 'dark'
                          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Input area */}
            <form 
              onSubmit={handleSubmit}
              className={`p-3 border-t flex ${
                theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className={`flex-1 py-2 px-3 rounded-l-lg focus:outline-none ${
                  theme === 'dark'
                    ? 'bg-gray-800 text-white border-gray-700 focus:border-gray-600'
                    : 'bg-gray-100 text-gray-900 border-gray-300 focus:border-gray-400'
                }`}
              />
              <button
                type="submit"
                className={`px-4 rounded-r-lg ${
                  input.trim()
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : theme === 'dark'
                    ? 'bg-gray-700 text-gray-400'
                    : 'bg-gray-300 text-gray-500'
                }`}
                disabled={!input.trim()}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant; 