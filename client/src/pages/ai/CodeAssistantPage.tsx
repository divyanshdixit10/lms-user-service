import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const CodeAssistantPage: React.FC = () => {
  const { theme } = useTheme();
  const [code, setCode] = useState<string>(`// Write your code here and get AI suggestions
function calculateSum(a, b) {
  return a + b;
}

// Example usage
const result = calculateSum(5, 10);
console.log(result);
`);
  const [language, setLanguage] = useState<string>('javascript');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useState<'editor' | 'preview'>('editor');
  const [output, setOutput] = useState<string>('');

  const supportedLanguages = [
    { id: 'javascript', name: 'JavaScript', icon: 'js' },
    { id: 'typescript', name: 'TypeScript', icon: 'ts' },
    { id: 'python', name: 'Python', icon: 'py' },
    { id: 'java', name: 'Java', icon: 'java' },
    { id: 'csharp', name: 'C#', icon: 'cs' },
    { id: 'cpp', name: 'C++', icon: 'cpp' },
    { id: 'go', name: 'Go', icon: 'go' },
    { id: 'rust', name: 'Rust', icon: 'rs' },
    { id: 'html', name: 'HTML', icon: 'html' },
    { id: 'css', name: 'CSS', icon: 'css' },
  ];

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const requestAISuggestion = () => {
    setIsLoading(true);
    setSuggestions([]);

    // Simulate API call delay
    setTimeout(() => {
      if (language === 'javascript') {
        setSuggestions([
          "Add input validation: Check if 'a' and 'b' are numbers before performing the calculation",
          "Add JSDoc comments to document the function parameters and return type",
          "Consider using ES6 arrow function syntax",
          "Write unit tests for the calculateSum function"
        ]);
      } else if (language === 'python') {
        setSuggestions([
          "Add type hints to the function parameters",
          "Implement error handling for invalid inputs",
          "Add docstring to document the function",
          "Create a main() function for better organization"
        ]);
      } else {
        setSuggestions([
          "Add documentation comments",
          "Implement error handling for edge cases",
          "Add unit tests for your code",
          "Consider refactoring for better performance"
        ]);
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleRunCode = () => {
    setIsLoading(true);
    setSelectedTab('preview');
    
    // Simulate code execution
    setTimeout(() => {
      if (language === 'javascript') {
        try {
          // Create a safe environment to execute JavaScript code
          const consoleLogs: string[] = [];
          const tempConsole = {
            log: (...args: any[]) => consoleLogs.push(args.map(arg => String(arg)).join(' ')),
            error: (...args: any[]) => consoleLogs.push(`Error: ${args.map(arg => String(arg)).join(' ')}`),
            warn: (...args: any[]) => consoleLogs.push(`Warning: ${args.map(arg => String(arg)).join(' ')}`),
          };
          
          // Execute the code in a function with a custom console
          const func = new Function('console', code);
          func(tempConsole);
          
          setOutput(consoleLogs.join('\n'));
        } catch (error) {
          setOutput(`Execution error: ${error instanceof Error ? error.message : String(error)}`);
        }
      } else {
        setOutput(`[${language.toUpperCase()} Execution]\n\n15\n\nExecution completed successfully.`);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleApplySuggestion = (suggestion: string) => {
    if (suggestion.includes('input validation')) {
      setCode(`// Write your code here and get AI suggestions
function calculateSum(a, b) {
  // Add input validation
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both arguments must be numbers');
  }
  return a + b;
}

// Example usage
const result = calculateSum(5, 10);
console.log(result);
`);
    } else if (suggestion.includes('JSDoc')) {
      setCode(`// Write your code here and get AI suggestions
/**
 * Calculate the sum of two numbers
 * @param {number} a - The first number
 * @param {number} b - The second number
 * @returns {number} The sum of a and b
 */
function calculateSum(a, b) {
  return a + b;
}

// Example usage
const result = calculateSum(5, 10);
console.log(result);
`);
    } else if (suggestion.includes('arrow function')) {
      setCode(`// Write your code here and get AI suggestions
// Using ES6 arrow function syntax
const calculateSum = (a, b) => {
  return a + b;
};

// Example usage
const result = calculateSum(5, 10);
console.log(result);
`);
    } else if (suggestion.includes('unit tests')) {
      setCode(`// Write your code here and get AI suggestions
function calculateSum(a, b) {
  return a + b;
}

// Unit tests for calculateSum
function testCalculateSum() {
  console.log('Running tests...');
  
  // Test case 1: Positive numbers
  const test1 = calculateSum(5, 10) === 15;
  console.log('Test 1 (Positive numbers):', test1 ? 'PASS' : 'FAIL');
  
  // Test case 2: Negative numbers
  const test2 = calculateSum(-5, -10) === -15;
  console.log('Test 2 (Negative numbers):', test2 ? 'PASS' : 'FAIL');
  
  // Test case 3: Mixed numbers
  const test3 = calculateSum(-5, 10) === 5;
  console.log('Test 3 (Mixed numbers):', test3 ? 'PASS' : 'FAIL');
  
  console.log('All tests completed.');
}

// Run tests
testCalculateSum();
`);
    }
  };

  const handleSaveCode = () => {
    alert('Code saved successfully! In a real app, this would save to your account or download the file.');
  };

  const handleShareCode = () => {
    alert('Sharing link generated! In a real app, this would create a shareable link to your code.');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-secondary-900' : 'bg-orange-50'} py-8`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Left Panel - Code Editor */}
            <div className="md:w-3/4">
              <div className={`rounded-xl shadow-xl overflow-hidden ${theme === 'dark' ? 'bg-secondary-800' : 'bg-white'}`}>
                {/* Editor Header */}
                <div className={`px-4 py-3 ${theme === 'dark' ? 'bg-secondary-700' : 'bg-orange-500'} text-white flex items-center justify-between`}>
                  <div className="flex items-center">
                    <h2 className="font-bold">OSOP Code Assistant</h2>
                    <div className="ml-4 flex gap-1">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {/* Language Selector */}
                    <select 
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="bg-white/20 border-0 rounded text-white text-sm py-1 px-2 focus:ring-0 focus:border-0"
                    >
                      {supportedLanguages.map(lang => (
                        <option key={lang.id} value={lang.id}>{lang.name}</option>
                      ))}
                    </select>
                    
                    {/* Action Buttons */}
                    <button 
                      onClick={handleRunCode}
                      className="bg-primary-700 hover:bg-primary-800 text-white text-sm py-1 px-3 rounded flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Run
                    </button>
                  </div>
                </div>
                
                {/* Tab Navigation */}
                <div className={`flex ${theme === 'dark' ? 'bg-secondary-700 border-secondary-600' : 'bg-gray-100 border-gray-200'} border-b`}>
                  <button
                    onClick={() => setSelectedTab('editor')}
                    className={`px-4 py-2 text-sm font-medium ${
                      selectedTab === 'editor' 
                        ? theme === 'dark'
                          ? 'bg-secondary-800 text-white border-t-2 border-primary-500'
                          : 'bg-white text-primary-500 border-t-2 border-primary-500'
                        : theme === 'dark'
                          ? 'text-gray-300 hover:text-white'
                          : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      Editor
                    </span>
                  </button>
                  <button
                    onClick={() => setSelectedTab('preview')}
                    className={`px-4 py-2 text-sm font-medium ${
                      selectedTab === 'preview' 
                        ? theme === 'dark'
                          ? 'bg-secondary-800 text-white border-t-2 border-primary-500'
                          : 'bg-white text-primary-500 border-t-2 border-primary-500'
                        : theme === 'dark'
                          ? 'text-gray-300 hover:text-white'
                          : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                      Output
                      {output && <span className="ml-2 w-2 h-2 rounded-full bg-green-500"></span>}
                    </span>
                  </button>
                </div>
                
                {/* Editor/Preview Content */}
                <div className="h-[500px]">
                  {selectedTab === 'editor' ? (
                    <textarea
                      value={code}
                      onChange={handleCodeChange}
                      className={`w-full h-full p-4 font-mono text-sm resize-none focus:outline-none focus:ring-0 ${
                        theme === 'dark' 
                          ? 'bg-secondary-800 text-gray-200' 
                          : 'bg-white text-gray-800'
                      }`}
                      spellCheck="false"
                    />
                  ) : (
                    <div 
                      className={`w-full h-full p-4 font-mono text-sm overflow-auto ${
                        theme === 'dark' 
                          ? 'bg-secondary-800 text-gray-200' 
                          : 'bg-white text-gray-800'
                      }`}
                    >
                      {isLoading ? (
                        <div className="flex justify-center items-center h-full">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
                        </div>
                      ) : output ? (
                        <pre>{output}</pre>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                          <svg className="w-12 h-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                          </svg>
                          <p>Run your code to see the output here</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Editor Footer */}
                <div className={`px-4 py-3 border-t flex justify-between ${
                  theme === 'dark' 
                    ? 'bg-secondary-700 border-secondary-600 text-gray-300' 
                    : 'bg-gray-100 border-gray-200 text-gray-600'
                }`}>
                  <div className="text-xs">
                    {code.split('\n').length} lines | {language}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleSaveCode}
                      className="text-xs flex items-center hover:text-primary-500"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                      </svg>
                      Save
                    </button>
                    <button 
                      onClick={handleShareCode}
                      className="text-xs flex items-center hover:text-primary-500"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Panel - AI Assistance */}
            <div className="md:w-1/4">
              <div className={`rounded-xl shadow-xl overflow-hidden ${theme === 'dark' ? 'bg-secondary-800' : 'bg-white'}`}>
                {/* AI Panel Header */}
                <div className={`px-4 py-3 ${theme === 'dark' ? 'bg-secondary-700' : 'bg-orange-500'} text-white`}>
                  <h2 className="font-bold flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    AI Suggestions
                  </h2>
                </div>
                
                {/* AI Content */}
                <div className={`p-4 h-[calc(500px+3rem)] overflow-auto ${
                  theme === 'dark' ? 'bg-secondary-800 text-white' : 'bg-white text-gray-800'
                }`}>
                  {suggestions.length > 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-sm font-medium mb-3">Suggested improvements:</h3>
                      <div className="space-y-3">
                        {suggestions.map((suggestion, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                            className={`p-3 rounded-lg border ${
                              theme === 'dark' 
                                ? 'border-secondary-700 bg-secondary-700/50' 
                                : 'border-gray-200 bg-gray-50'
                            }`}
                          >
                            <p className="text-sm mb-2">{suggestion}</p>
                            <button
                              onClick={() => handleApplySuggestion(suggestion)}
                              className={`text-xs px-3 py-1 rounded-full ${
                                theme === 'dark' 
                                  ? 'bg-primary-700 hover:bg-primary-600 text-white' 
                                  : 'bg-primary-500 hover:bg-primary-600 text-white'
                              }`}
                            >
                              Apply suggestion
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="h-full flex flex-col justify-between">
                      <div>
                        {isLoading ? (
                          <div className="flex justify-center items-center p-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
                          </div>
                        ) : (
                          <>
                            <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                              Get AI-powered suggestions to improve your code. Click the button below to analyze your code.
                            </p>
                            
                            <button
                              onClick={requestAISuggestion}
                              className={`w-full py-2 px-4 rounded-lg ${
                                theme === 'dark' 
                                  ? 'bg-primary-700 hover:bg-primary-600 text-white' 
                                  : 'bg-primary-500 hover:bg-primary-600 text-white'
                              } transition-colors flex items-center justify-center`}
                            >
                              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                              Analyze Code
                            </button>
                            
                            <div className={`mt-6 p-4 rounded-lg ${
                              theme === 'dark' ? 'bg-secondary-700/40' : 'bg-orange-50'
                            }`}>
                              <h3 className="text-sm font-medium mb-2 flex items-center">
                                <svg className="w-4 h-4 mr-1 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Tips
                              </h3>
                              <ul className={`text-xs space-y-1 list-disc pl-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                <li>Write a complete function for best results</li>
                                <li>Include comments to explain your intention</li>
                                <li>AI suggestions are better with more context</li>
                                <li>Run your code to see the output before applying suggestions</li>
                              </ul>
                            </div>
                          </>
                        )}
                      </div>
                      
                      <div className={`mt-6 pt-4 border-t ${theme === 'dark' ? 'border-secondary-700' : 'border-gray-100'}`}>
                        <h3 className="text-sm font-medium mb-2">Keyboard Shortcuts:</h3>
                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          <div className="flex justify-between mb-1">
                            <span>Analyze Code</span>
                            <span className="font-mono">Ctrl+Shift+A</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span>Run Code</span>
                            <span className="font-mono">Ctrl+Enter</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span>Save Code</span>
                            <span className="font-mono">Ctrl+S</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Format Code</span>
                            <span className="font-mono">Ctrl+Shift+F</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CodeAssistantPage; 