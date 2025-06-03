import React from 'react';

/**
 * AI-Powered Coding Companion component
 * This component provides real-time suggestions and personalized learning paths
 */
const CodingCompanion = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 mb-8 text-white">
        <h1 className="text-3xl font-bold mb-4">AI-Powered Coding Companion</h1>
        <p className="text-lg">Get real-time coding assistance and personalized learning recommendations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Smart Code Suggestions</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Our AI analyzes your coding patterns and provides intelligent suggestions to improve your code quality and efficiency.
          </p>
          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 mb-4">
            <pre className="text-sm text-gray-800 dark:text-gray-300">
              <code>
                {`// Example of AI-suggested code improvement
function calculateTotal(items) {
  // AI suggests using reduce for better performance
  return items.reduce((total, item) => 
    total + (item.price * item.quantity), 0);
}`}
              </code>
            </pre>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition">
            Try Code Suggestions
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Personalized Learning Path</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Based on your skill level, learning pace, and career goals, our AI creates a customized learning journey for you.
          </p>
          <ul className="space-y-3 mb-4">
            {['Assess your current skill level', 'Identify knowledge gaps', 'Suggest relevant resources', 'Track your progress', 'Adapt as you improve'].map(item => (
              <li key={item} className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600 dark:text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition">
            Generate My Learning Path
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Real-time Debugging Assistant</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Stuck on a bug? Our AI assistant analyzes your code in real-time to identify issues and provide solutions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
            <h3 className="text-red-600 dark:text-red-400 font-bold mb-2">Error Detected</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              TypeError: Cannot read property 'map' of undefined at line 42
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h3 className="text-green-600 dark:text-green-400 font-bold mb-2">Suggested Fix</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Check if your array exists before using map: {`data && data.map(...)`}
            </p>
          </div>
        </div>
      </div>

      <div className="text-center p-6 bg-gray-100 dark:bg-gray-900 rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Ready to supercharge your coding?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The AI-Powered Coding Companion is included with all OSOP premium subscriptions.
        </p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition">
          Activate Coding Companion
        </button>
      </div>
    </div>
  );
};

export default CodingCompanion; 