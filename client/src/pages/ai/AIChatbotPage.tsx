import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

const AIChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'system',
      content: 'Hello! I\'m your OSOP AI Coding Assistant. How can I help you with your coding journey today?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions] = useState([
    'How do I create a React component?',
    'Explain CSS Grid vs Flexbox',
    'Help me debug this JavaScript code',
    'What are closures in JavaScript?',
    'Python vs JavaScript for beginners',
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isLoading) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Simulate API call to get AI response
      const aiResponse = await getMockAIResponse(inputValue);
      
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: aiResponse,
          timestamp: new Date(),
        }]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setIsLoading(false);
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error while processing your request. Please try again later.',
        timestamp: new Date(),
      }]);
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };
  
  // Mock AI response based on user input
  const getMockAIResponse = async (userInput: string): Promise<string> => {
    // This would be replaced with a real API call in production
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const lowercaseInput = userInput.toLowerCase();
    
    if (lowercaseInput.includes('react component')) {
      return `
To create a React component, you have a few options:

**Function Component (recommended):**
\`\`\`jsx
import React from 'react';

const MyComponent = ({ name }) => {
  return <div>Hello, {name}!</div>;
};

export default MyComponent;
\`\`\`

**Class Component:**
\`\`\`jsx
import React, { Component } from 'react';

class MyComponent extends Component {
  render() {
    return <div>Hello, {this.props.name}!</div>;
  }
}

export default MyComponent;
\`\`\`

Function components are preferred for most cases due to their simplicity and support for hooks.
      `;
    } else if (lowercaseInput.includes('grid') && lowercaseInput.includes('flexbox')) {
      return `
**CSS Grid vs Flexbox:**

**Flexbox**
- One-dimensional layout system (either row OR column)
- Best for: UI elements, smaller layouts, aligning items within a container
- Great for: distributing space between items in a container

Example:
\`\`\`css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

**Grid**
- Two-dimensional layout system (rows AND columns)
- Best for: Overall page layout and complex grid-based designs
- Great for: Creating complex layouts with precise placement

Example:
\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
\`\`\`

**When to use which:**
- Use Flexbox for simple 1-dimensional layouts
- Use Grid for complex 2-dimensional layouts
- You can use both together: Grid for overall layout, Flexbox for content alignment
      `;
    } else if (lowercaseInput.includes('debug') && lowercaseInput.includes('javascript')) {
      return `
**JavaScript Debugging Tips:**

1. **Use console.log()** to inspect values at different points in your code
   \`\`\`javascript
   console.log('Variable value:', myVariable);
   \`\`\`

2. **Use the browser's DevTools**
   - Set breakpoints by clicking on line numbers in the Sources panel
   - Step through code execution with the controls
   - Inspect variable values in the Scope panel

3. **Use try/catch blocks** to catch and handle errors
   \`\`\`javascript
   try {
     // Code that might throw an error
   } catch (error) {
     console.error('An error occurred:', error.message);
   }
   \`\`\`

4. **Check for common issues:**
   - Typos in variable/function names
   - Missing semicolons or parentheses
   - Scope issues (using a variable before it's defined)
   - Type errors (trying to use a method on the wrong type)

Would you like me to help debug a specific piece of code?
      `;
    } else if (lowercaseInput.includes('closure')) {
      return `
**JavaScript Closures:**

A closure is a function that has access to variables in its outer (enclosing) function's scope, even after the outer function has returned.

**Example:**
\`\`\`javascript
function createCounter() {
  let count = 0;  // This variable is enclosed in the closure
  
  return function() {
    count++;  // The inner function can access and modify 'count'
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
\`\`\`

**Key Points:**
1. Closures "remember" the environment they were created in
2. They maintain access to variables from parent scopes
3. Each closure has its own separate instance of those variables
4. They're commonly used for:
   - Data privacy (creating private variables)
   - Function factories
   - Event handlers
   - Callbacks
   - Module patterns

Closures are powerful but can lead to memory leaks if not handled carefully.
      `;
    } else if (lowercaseInput.includes('python') && lowercaseInput.includes('javascript')) {
      return `
**Python vs JavaScript for Beginners:**

**JavaScript:**
- **Pros:**
  - Essential for web development (runs in browsers)
  - Versatile (front-end, back-end with Node.js)
  - Great job market demand
  - Flexible syntax
- **Cons:**
  - Some quirky behaviors and inconsistencies
  - Asynchronous concepts can be challenging
  - Prototype-based inheritance is confusing at first

**Python:**
- **Pros:**
  - Extremely readable syntax
  - Gentle learning curve
  - Consistent behavior
  - Great for data science, AI, automation
  - Strong standard library
- **Cons:**
  - Limited use in browsers (needs WASM or Pyodide)
  - Performance can be slower for certain tasks
  - Optional typing (vs JavaScript's TypeScript)

**Recommendation:**
- Choose **JavaScript** if you're primarily interested in web development
- Choose **Python** if you want a gentler start or are interested in data science, AI, or automation
- Both are excellent first languages with massive ecosystems and communities

Both languages are in high demand and have great career potential!
      `;
    } else {
      return `I don't have specific information about "${userInput}", but I'd be happy to help if you could provide more details or try a different question. You can ask me about programming concepts, languages, frameworks, or specific code problems!`;
    }
  };
  
  return (
    <div className={`min-h-screen bg-gradient-to-b ${theme === 'dark' ? 'from-secondary-900 to-secondary-950' : 'from-primary-50 to-orange-50'}`}>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className={`rounded-xl shadow-xl overflow-hidden ${theme === 'dark' ? 'bg-secondary-800' : 'bg-white'}`}>
            {/* Header */}
            <div className={`p-4 ${theme === 'dark' ? 'bg-primary-900/40' : 'bg-gradient-to-r from-primary-500 to-amber-500'} text-white flex items-center justify-between`}>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold">OSOP AI Coding Assistant</h1>
                  <p className="text-xs text-white/70">Powered by advanced language models</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-white/20'} transition-colors`}
                  title="Clear conversation"
                  onClick={() => setMessages([{
                    id: Date.now().toString(),
                    role: 'system',
                    content: 'Hello! I\'m your OSOP AI Coding Assistant. How can I help you with your coding journey today?',
                    timestamp: new Date(),
                  }])}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                <button 
                  className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-white/20'} transition-colors`}
                  title="Export conversation"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Chat Messages */}
            <div 
              className={`h-[500px] overflow-y-auto p-4 ${theme === 'dark' ? 'bg-secondary-800' : 'bg-white'}`}
            >
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-xl px-4 py-3 ${
                        message.role === 'user' 
                          ? theme === 'dark' 
                            ? 'bg-primary-900 text-white' 
                            : 'bg-primary-500 text-white' 
                          : theme === 'dark'
                            ? 'bg-secondary-700 text-white'
                            : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.role === 'assistant' && (
                        <div className="flex items-center mb-1">
                          <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center mr-2">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <div className="text-xs font-medium">OSOP AI</div>
                        </div>
                      )}
                      <div 
                        className="prose prose-sm max-w-full"
                        dangerouslySetInnerHTML={{ 
                          __html: message.content
                            .replace(/\n/g, '<br />')
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\`\`\`([a-z]*)\n([\s\S]*?)\n\`\`\`/g, '<pre><code class="language-$1">$2</code></pre>')
                            .replace(/\`(.*?)\`/g, '<code>$1</code>')
                        }} 
                      />
                      <div className="text-xs opacity-70 mt-1 text-right">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div 
                      className={`rounded-xl px-4 py-3 ${theme === 'dark' ? 'bg-secondary-700' : 'bg-gray-100'}`}
                    >
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse animation-delay-200"></div>
                        <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse animation-delay-400"></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* Suggested Questions */}
            {messages.length <= 2 && (
              <div className={`px-4 py-3 border-t border-b ${theme === 'dark' ? 'border-secondary-700 bg-secondary-800/50' : 'border-gray-100'}`}>
                <p className={`text-xs font-medium mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-gray-500'}`}>
                  Try asking:
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className={`text-xs px-3 py-1.5 rounded-full border ${
                        theme === 'dark' 
                          ? 'border-secondary-700 bg-secondary-700 text-white hover:bg-secondary-600' 
                          : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                      } transition-colors`}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Input Area */}
            <div className={`p-4 ${theme === 'dark' ? 'bg-secondary-800' : 'bg-white'}`}>
              <div className={`flex items-end gap-2 p-2 border rounded-lg ${
                theme === 'dark' 
                  ? 'border-secondary-700 bg-secondary-700/50' 
                  : 'border-gray-200 bg-gray-50'
              }`}>
                <textarea
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything about coding..."
                  className={`flex-1 resize-none p-2 text-sm h-10 max-h-32 bg-transparent border-0 focus:ring-0 focus:outline-none ${
                    theme === 'dark' ? 'text-white placeholder-white/50' : 'text-gray-800 placeholder-gray-400'
                  }`}
                  rows={1}
                  style={{ 
                    minHeight: '40px',
                    height: 'auto',
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={inputValue.trim() === '' || isLoading}
                  className={`p-2 rounded-full ${
                    inputValue.trim() === '' || isLoading
                      ? theme === 'dark' 
                        ? 'bg-secondary-700 text-white/50' 
                        : 'bg-gray-200 text-gray-400'
                      : 'bg-primary-500 text-white hover:bg-primary-600'
                  } transition-colors`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              <div className={`text-xs mt-2 text-center ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'}`}>
                OSOP AI is designed to assist with coding questions. For complex problems, consult documentation or human experts.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIChatbotPage; 