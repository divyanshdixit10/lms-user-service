import React, { useState } from 'react';

const DevEnvironment = () => {
  const [code, setCode] = useState(`import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default Counter;`);

  const [collaborators, setCollaborators] = useState([
    { id: 1, name: 'Maya Rodriguez', role: 'Senior Developer', status: 'active', avatar: 'MR' },
    { id: 2, name: 'Alex Kim', role: 'Frontend Engineer', status: 'active', avatar: 'AK' },
    { id: 3, name: 'Jordan Taylor', role: 'Backend Developer', status: 'away', avatar: 'JT' },
    { id: 4, name: 'AI Assistant', role: 'Coding Assistant', status: 'active', avatar: '🤖' }
  ]);

  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'Maya Rodriguez', content: 'I think we should refactor the Counter component to use useReducer instead.', time: '10:32 AM' },
    { id: 2, sender: 'Alex Kim', content: 'Good idea. That would make it easier to add more features later.', time: '10:34 AM' },
    { id: 3, sender: 'AI Assistant', content: 'I can help with that refactoring. Would you like me to suggest a code snippet?', time: '10:36 AM' }
  ]);

  const [branches, setBranches] = useState([
    { name: 'main', isActive: false },
    { name: 'feature/counter-enhancements', isActive: true },
    { name: 'bugfix/state-reset', isActive: false }
  ]);

  const [activeTab, setActiveTab] = useState('editor');

  // Mock function for sending a message
  const sendMessage = () => {
    // Implementation would go here
  };

  // Mock function for the AI suggestion
  const requestAISuggestion = () => {
    // Implementation would go here
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header/Toolbar */}
      <div className="bg-gray-800 text-white p-3">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-xl font-bold">CodeCollab IDE</span>
            <div className="border-l border-gray-600 h-6"></div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Project:</span>
              <span className="font-medium">React Counter App</span>
            </div>
            <div className="border-l border-gray-600 h-6"></div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Branch:</span>
              <select className="bg-gray-700 text-white text-sm rounded px-2 py-1 border-none focus:ring-2 focus:ring-blue-500">
                {branches.map(branch => (
                  <option key={branch.name} selected={branch.isActive}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
              Share
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex items-center">
              <span>Run</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <div className="flex -space-x-2">
              {collaborators.slice(0, 3).map(collaborator => (
                <div 
                  key={collaborator.id}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-xs border-2 border-gray-800 ${
                    collaborator.status === 'active' ? 'bg-blue-600' : 'bg-gray-500'
                  }`}
                  title={collaborator.name}
                >
                  {collaborator.avatar}
                </div>
              ))}
              {collaborators.length > 3 && (
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-600 text-white text-xs border-2 border-gray-800"
                  title="More collaborators"
                >
                  +{collaborators.length - 3}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* File explorer sidebar */}
        <div className="w-64 bg-gray-800 text-white overflow-y-auto">
          <div className="p-3">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-medium">Files</h2>
              <button className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center px-2 py-1 rounded hover:bg-gray-700 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                <span>src</span>
              </div>
              <div className="pl-6 space-y-1">
                <div className="flex items-center px-2 py-1 rounded hover:bg-gray-700 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>App.js</span>
                </div>
                <div className="flex items-center px-2 py-1 bg-blue-700 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Counter.js</span>
                </div>
                <div className="flex items-center px-2 py-1 rounded hover:bg-gray-700 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>index.js</span>
                </div>
              </div>
              <div className="flex items-center px-2 py-1 rounded hover:bg-gray-700 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>package.json</span>
              </div>
              <div className="flex items-center px-2 py-1 rounded hover:bg-gray-700 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>README.md</span>
              </div>
            </div>
          </div>
          
          <div className="p-3 border-t border-gray-700">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-medium">Collaborators</h2>
            </div>
            
            <div className="space-y-2">
              {collaborators.map(collaborator => (
                <div key={collaborator.id} className="flex items-center space-x-2">
                  <div 
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${
                      collaborator.status === 'active' ? 'bg-blue-600' : 'bg-gray-500'
                    }`}
                  >
                    {collaborator.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{collaborator.name}</p>
                    <p className="text-xs text-gray-400 truncate">{collaborator.role}</p>
                  </div>
                  <div 
                    className={`w-2 h-2 rounded-full ${
                      collaborator.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                    title={collaborator.status === 'active' ? 'Online' : 'Away'}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Center content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="bg-gray-100 border-b border-gray-300">
            <div className="flex">
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'editor'
                    ? 'bg-white border-t border-l border-r border-gray-300 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab('editor')}
              >
                Counter.js
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'preview'
                    ? 'bg-white border-t border-l border-r border-gray-300 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab('preview')}
              >
                Preview
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'git'
                    ? 'bg-white border-t border-l border-r border-gray-300 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab('git')}
              >
                Git
              </button>
            </div>
          </div>
          
          {/* Content based on active tab */}
          <div className="flex-1 overflow-auto bg-white p-4">
            {activeTab === 'editor' && (
              <div className="h-full flex flex-col">
                {/* Code editor toolbar */}
                <div className="flex justify-between items-center mb-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <select className="bg-gray-100 border border-gray-300 rounded px-2 py-1">
                      <option>JavaScript</option>
                      <option>TypeScript</option>
                      <option>HTML</option>
                      <option>CSS</option>
                    </select>
                    <button 
                      className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded px-2 py-1 flex items-center" 
                      onClick={requestAISuggestion}
                    >
                      <span className="mr-1">AI Suggestions</span>
                      <span className="text-blue-600">🤖</span>
                    </button>
                  </div>
                  <div>
                    <span className="text-gray-500">Maya is editing...</span>
                  </div>
                </div>
                
                {/* Code editor */}
                <div className="flex-1 font-mono text-sm border border-gray-300 p-3 bg-gray-50 overflow-auto rounded">
                  <pre className="whitespace-pre-wrap">{code}</pre>
                </div>
                
                {/* AI Assistant suggestion box */}
                <div className="mt-3 border border-blue-200 bg-blue-50 p-3 rounded">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs mr-2">
                      🤖
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800 text-sm">AI Assistant Suggestion</h4>
                      <p className="text-blue-700 text-xs">Consider refactoring using useReducer for better state management</p>
                    </div>
                  </div>
                  <div className="mt-2 bg-white border border-blue-200 p-2 rounded font-mono text-xs text-gray-800">
{`import React, { useReducer } from 'react';

// Define reducer function
function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  
  return (
    <div>
      <h1>Count: {state.count}</h1>
      <button onClick={() => dispatch({ type: 'increment' })}>
        Increment
      </button>
      <button onClick={() => dispatch({ type: 'decrement' })}>
        Decrement
      </button>
    </div>
  );
}

export default Counter;`}
                  </div>
                  <div className="mt-2 flex justify-end space-x-2">
                    <button className="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded">
                      Dismiss
                    </button>
                    <button className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded">
                      Apply Suggestion
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'preview' && (
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Live Preview</h3>
                  <div className="flex items-center space-x-2">
                    <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded px-2 py-1 text-sm">
                      Desktop
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded px-2 py-1 text-sm">
                      Tablet
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded px-2 py-1 text-sm">
                      Mobile
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 border border-gray-300 rounded p-4 flex items-center justify-center">
                  <div className="text-center border rounded p-6 bg-white shadow-sm">
                    <h1 className="text-2xl mb-4">Count: 0</h1>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                      Increment
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'git' && (
              <div className="h-full">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Git Changes</h3>
                  <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded">
                    Commit Changes
                  </button>
                </div>
                
                <div className="border border-gray-300 rounded overflow-hidden">
                  <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 font-medium text-sm">
                    Changes
                  </div>
                  <div className="p-4">
                    <div className="flex items-center space-x-2 text-sm mb-2">
                      <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                      <span>Modified:</span>
                      <span className="font-mono">src/Counter.js</span>
                    </div>
                    
                    <div className="border border-gray-300 rounded font-mono text-xs">
                      <div className="bg-gray-100 px-3 py-1 border-b border-gray-300 text-gray-700">
                        Diff: Counter.js
                      </div>
                      <div className="p-3 bg-gray-50 overflow-auto" style={{ maxHeight: '200px' }}>
                        <div className="text-green-800 bg-green-100 px-2">+ import React, {'{'} useReducer {'}'} from 'react';</div>
                        <div className="text-red-800 bg-red-100 px-2">- import React, {'{'} useState {'}'} from 'react';</div>
                        <div className="text-gray-700 px-2">{'  '}</div>
                        <div className="text-green-800 bg-green-100 px-2">+ // Define reducer function</div>
                        <div className="text-green-800 bg-green-100 px-2">+ function counterReducer(state, action) {'{'}</div>
                        <div className="text-green-800 bg-green-100 px-2">+   switch (action.type) {'{'}</div>
                        <div className="text-green-800 bg-green-100 px-2">+     case 'increment':</div>
                        <div className="text-green-800 bg-green-100 px-2">+       return {'{'} count: state.count + 1 {'}'};</div>
                        <div className="text-green-800 bg-green-100 px-2">+     case 'decrement':</div>
                        <div className="text-green-800 bg-green-100 px-2">+       return {'{'} count: state.count - 1 {'}'};</div>
                        <div className="text-green-800 bg-green-100 px-2">+     default:</div>
                        <div className="text-green-800 bg-green-100 px-2">+       return state;</div>
                        <div className="text-green-800 bg-green-100 px-2">+   {'}'}</div>
                        <div className="text-green-800 bg-green-100 px-2">+ {'}'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Right sidebar - chat/communication */}
        <div className="w-80 bg-gray-100 border-l border-gray-300 flex flex-col">
          <div className="p-3 border-b border-gray-300">
            <h2 className="font-medium">Team Chat</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {chatMessages.map(message => (
              <div key={message.id} className="bg-white rounded-lg shadow-sm p-3">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium text-sm">{message.sender}</span>
                  <span className="text-xs text-gray-500">{message.time}</span>
                </div>
                <p className="text-sm text-gray-700">{message.content}</p>
              </div>
            ))}
          </div>
          
          <div className="p-3 border-t border-gray-300">
            <div className="flex">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-r px-4"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <div className="flex mt-2 text-sm text-gray-600 space-x-3 justify-center">
              <button className="flex items-center hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Emoji</span>
              </button>
              <button className="flex items-center hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
                <span>Attach</span>
              </button>
              <button className="flex items-center hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span>Screenshot</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevEnvironment; 