import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

interface AITool {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  badge?: string;
  features: string[];
}

const AIToolsPage: React.FC = () => {
  const { theme } = useTheme();
  
  const aiTools: AITool[] = [
    {
      id: 'chat',
      title: 'AI Coding Assistant',
      description: 'Get instant help with coding questions, debugging, and learn programming concepts with our conversational AI.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      link: '/ai/chatbot',
      features: [
        'Get coding answers in natural language',
        'Explain complex programming concepts',
        'Debug code in 20+ programming languages',
        'Suggest best practices and optimizations'
      ]
    },
    {
      id: 'code-assist',
      title: 'Code Generator & Improver',
      description: 'Write and improve code faster with AI-powered suggestions, auto-completion, and code generation.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      link: '/ai/code-assistant',
      badge: 'Popular',
      features: [
        'Generate code from natural language descriptions',
        'Complete code snippets automatically',
        'Get optimization suggestions and best practices',
        'Refactor code for better readability and performance'
      ]
    },
    {
      id: 'explain',
      title: 'Code Explainer',
      description: 'Understand complex code with AI-generated explanations that break down the logic in simple terms.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      link: '/ai/code-explainer',
      features: [
        'Step-by-step code explanations',
        'Identify key algorithms and patterns',
        'Add documentation automatically',
        'Learn from code analysis'
      ]
    },
    {
      id: 'test',
      title: 'Test Generator',
      description: 'Automatically generate comprehensive test cases for your code to ensure reliability and quality.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      link: '/ai/test-generator',
      features: [
        'Generate unit tests automatically',
        'Identify edge cases',
        'Increase code coverage',
        'Support for Jest, Mocha, Pytest and more'
      ]
    },
    {
      id: 'interview',
      title: 'Interview Coach',
      description: 'Practice technical interviews with our AI interview coach. Get feedback on your solutions and improve your skills.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
      link: '/ai/interview-coach',
      badge: 'New',
      features: [
        'Practice with real interview questions',
        'Get personalized feedback',
        'Learn optimal solutions',
        'Improve problem-solving skills'
      ]
    },
    {
      id: 'project',
      title: 'Project Creator',
      description: 'Generate entire project structures, boilerplate code, and scaffolding based on your requirements.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      link: '/ai/project-creator',
      features: [
        'Generate project structure',
        'Set up configurations automatically',
        'Create component hierarchies',
        'Implement design patterns'
      ]
    },
  ];

  return (
    <div className={`min-h-screen pb-16 ${theme === 'dark' ? 'bg-secondary-900' : 'bg-gradient-to-b from-orange-50 to-white'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-secondary-900'}`}>
              OSOP <span className="text-primary">AI Tools</span>
            </h1>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Supercharge your coding skills with our suite of AI-powered tools designed to help you write better code,
              solve problems faster, and accelerate your learning.
            </p>
          </motion.div>
        </div>

        {/* Tools Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {aiTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`rounded-xl shadow-lg overflow-hidden border ${
                theme === 'dark'
                  ? 'bg-secondary-800 border-secondary-700'
                  : 'bg-white border-gray-100'
              } hover:shadow-xl transition-shadow`}
            >
              <div className={`p-6 ${tool.badge ? 'pb-4' : ''}`}>
                <div className="flex justify-between items-start">
                  <div className={`w-12 h-12 rounded-lg ${
                    theme === 'dark' ? 'bg-primary-900/50' : 'bg-primary-500/10'
                  } flex items-center justify-center text-primary-500 mb-4`}>
                    {tool.icon}
                  </div>
                  
                  {tool.badge && (
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      tool.badge === 'New'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-primary-100 text-primary-800'
                    }`}>
                      {tool.badge}
                    </span>
                  )}
                </div>
                
                <h2 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {tool.title}
                </h2>
                
                <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {tool.description}
                </p>
                
                <div className="mb-5">
                  <h3 className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Key Features:
                  </h3>
                  <ul className="space-y-1">
                    {tool.features.map((feature, i) => (
                      <li key={i} className={`flex items-start text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <svg className="w-4 h-4 text-primary-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link
                  to={tool.link}
                  className={`inline-block w-full text-center py-3 px-4 rounded-lg font-medium transition-colors ${
                    theme === 'dark'
                      ? 'bg-primary-700 hover:bg-primary-600 text-white'
                      : 'bg-primary-500 hover:bg-primary-600 text-white'
                  }`}
                >
                  Try Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* AI Subscription Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className={`mt-16 rounded-2xl overflow-hidden shadow-xl ${
            theme === 'dark' ? 'bg-secondary-800' : 'bg-white'
          }`}
        >
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 lg:px-16 lg:py-24">
              <div>
                <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Unlock Premium AI Features
                </h2>
                <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Upgrade to our Pro plan to get unlimited access to all AI tools, priority processing, and advanced features
                  including API access, chat history, and custom AI models.
                </p>
                
                <ul className="space-y-3 mb-8">
                  {[
                    'Unlimited usage of all AI tools',
                    'Priority processing and faster responses',
                    'Save and export your AI conversations',
                    'Access to upcoming advanced AI features',
                    'API access for integration with your workflow'
                  ].map((feature, index) => (
                    <li key={index} className={`flex items-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <svg className="w-5 h-5 text-primary-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button
                  className={`py-3 px-8 rounded-lg font-medium transition-colors ${
                    theme === 'dark'
                      ? 'bg-primary-600 hover:bg-primary-500 text-white'
                      : 'bg-primary-500 hover:bg-primary-600 text-white'
                  }`}
                >
                  Upgrade to Pro
                </button>
              </div>
            </div>
            
            <div className={`${theme === 'dark' ? 'bg-primary-900' : 'bg-gradient-to-br from-primary-500 to-amber-500'} p-8 md:p-12 lg:px-16 lg:py-24 text-white relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-full h-full opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                  <circle cx="75" cy="25" r="20" fill="currentColor" />
                  <circle cx="25" cy="25" r="10" fill="currentColor" />
                  <circle cx="25" cy="75" r="20" fill="currentColor" />
                  <circle cx="75" cy="75" r="10" fill="currentColor" />
                </svg>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6">What Our Users Say</h3>
                
                <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="italic mb-3">
                      "The AI code generator saved me hours of work. It's like having a senior developer guiding you at every step!"
                    </p>
                    <div className="flex items-center">
                      <img 
                        src="https://randomuser.me/api/portraits/women/32.jpg" 
                        alt="User" 
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <div>
                        <p className="text-sm font-medium">Sarah Johnson</p>
                        <p className="text-xs opacity-80">Frontend Developer</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="italic mb-3">
                      "The test generator creates test cases I wouldn't have thought of. My code quality improved significantly."
                    </p>
                    <div className="flex items-center">
                      <img 
                        src="https://randomuser.me/api/portraits/men/62.jpg" 
                        alt="User" 
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <div>
                        <p className="text-sm font-medium">David Miller</p>
                        <p className="text-xs opacity-80">Backend Engineer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIToolsPage; 