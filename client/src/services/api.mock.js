// Mock API implementation
// This replaces the axios-based implementation to completely disconnect from the backend

// Mock data
const MOCK_DATA = {
  courses: [
    {
      id: 'course-1',
      title: 'Introduction to React',
      description: 'Learn the fundamentals of React, including components, state, and props.',
      instructor: 'John Smith',
      level: 'Beginner',
      category: 'Web Development',
      tags: ['React', 'JavaScript', 'Frontend'],
      duration: '8 hours',
      rating: 4.8,
      students: 1245,
      price: 49.99,
      isFeatured: true,
      thumbnail: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 'course-2',
      title: 'Advanced JavaScript Patterns',
      description: 'Master advanced JavaScript concepts including closures, prototypes, and design patterns.',
      instructor: 'Emily Chen',
      level: 'Advanced',
      category: 'Programming',
      tags: ['JavaScript', 'ES6', 'Design Patterns'],
      duration: '12 hours',
      rating: 4.9,
      students: 875,
      price: 69.99,
      isFeatured: true,
      thumbnail: 'https://images.unsplash.com/photo-1552308995-2baac1ad5490?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 'course-3',
      title: 'Full Stack Development with MERN',
      description: 'Build complete web applications using MongoDB, Express, React, and Node.js.',
      instructor: 'Michael Rodriguez',
      level: 'Intermediate',
      category: 'Web Development',
      tags: ['MongoDB', 'Express', 'React', 'Node.js'],
      duration: '20 hours',
      rating: 4.7,
      students: 1056,
      price: 89.99,
      isFeatured: false,
      thumbnail: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ],
  
  problems: [
    {
      id: 'problem-1',
      title: 'Two Sum',
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
      difficulty: 'Easy',
      category: 'Arrays',
      tags: ['Array', 'Hash Table'],
      attemptCount: 3425,
      solveCount: 2567,
      authorId: 'admin-123',
      sampleInput: '[2, 7, 11, 15], target = 9',
      sampleOutput: '[0, 1]',
      testCases: [
        { input: '[2, 7, 11, 15], 9', output: '[0, 1]' },
        { input: '[3, 2, 4], 6', output: '[1, 2]' }
      ]
    },
    {
      id: 'problem-2',
      title: 'Valid Parentheses',
      description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
      difficulty: 'Medium',
      category: 'Strings',
      tags: ['String', 'Stack'],
      attemptCount: 2876,
      solveCount: 1934,
      authorId: 'admin-123',
      sampleInput: '()',
      sampleOutput: 'true',
      testCases: [
        { input: '()', output: 'true' },
        { input: '()[]{}', output: 'true' },
        { input: '(]', output: 'false' }
      ]
    }
  ],
  
  users: [
    {
      id: 'admin-123',
      username: 'admin',
      email: 'admin@gmail.com',
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff',
      enrolledCourses: ['course-1', 'course-2'],
      completedCourses: [],
      solvedProblems: ['problem-1']
    },
    {
      id: 'student-456',
      username: 'student',
      email: 'student@gmail.com',
      firstName: 'Student',
      lastName: 'User',
      role: 'STUDENT',
      avatar: 'https://ui-avatars.com/api/?name=Student+User&background=2D8A5A&color=fff',
      enrolledCourses: ['course-1'],
      completedCourses: [],
      solvedProblems: []
    }
  ],
  
  // New mock data for immersive learning platform features
  virtualCampus: {
    buildings: [
      {
        id: 'bldg-1',
        name: 'Computer Science Hall',
        description: 'The main learning center for programming and computer science',
        courses: ['course-1', 'course-2'],
        position: { x: 0, y: 0, z: -10 },
        scale: { x: 5, y: 3, z: 5 },
        model: 'building-cs'
      },
      {
        id: 'bldg-2',
        name: 'Web Development Center',
        description: 'Specialized building for web development courses',
        courses: ['course-3'],
        position: { x: -10, y: 0, z: -5 },
        scale: { x: 4, y: 2, z: 4 },
        model: 'building-web'
      },
      {
        id: 'bldg-3',
        name: 'AI Research Lab',
        description: 'Advanced studies in artificial intelligence',
        courses: [],
        position: { x: 10, y: 0, z: -5 },
        scale: { x: 3, y: 4, z: 3 },
        model: 'building-ai'
      }
    ],
    avatars: [
      { id: 'avatar-1', name: 'Robot', model: 'robot' },
      { id: 'avatar-2', name: 'Programmer', model: 'programmer' },
      { id: 'avatar-3', name: 'Scientist', model: 'scientist' }
    ]
  },
  
  vrSessions: [
    {
      id: 'vr-session-1',
      name: 'React Hooks Workshop',
      description: 'Collaborative session on React Hooks',
      host: 'admin-123',
      participants: ['student-456'],
      startTime: new Date(Date.now() + 86400000).toISOString(),
      duration: 60, // minutes
      codeRepository: 'https://github.com/example/react-hooks-workshop',
      active: false
    },
    {
      id: 'vr-session-2',
      name: 'Algorithm Practice',
      description: 'Pair programming session for algorithm practice',
      host: 'admin-123',
      participants: [],
      startTime: new Date(Date.now() + 172800000).toISOString(),
      duration: 90, // minutes
      codeRepository: 'https://github.com/example/algorithm-practice',
      active: false
    }
  ],
  
  virtualClassrooms: [
    {
      id: 'classroom-1',
      name: 'Main Lecture Hall',
      instructor: 'admin-123',
      students: ['student-456'],
      capacity: 30,
      topic: 'Introduction to Immersive Learning',
      inProgress: false,
      scheduledTime: new Date(Date.now() + 86400000).toISOString(),
      audioChannels: [
        { id: 'channel-1', name: 'Main Discussion', position: { x: 0, y: 0, z: 0 }, radius: 10 },
        { id: 'channel-2', name: 'Group 1', position: { x: -5, y: 0, z: 5 }, radius: 3 },
        { id: 'channel-3', name: 'Group 2', position: { x: 5, y: 0, z: 5 }, radius: 3 }
      ]
    }
  ],
  
  digitalTwins: [
    {
      id: 'twin-1',
      name: 'Google Development Environment',
      description: 'Digital replica of Google\'s development environment',
      features: ['Code Review Process', 'Testing Environment', 'Deployment Pipeline'],
      technologyStack: ['Angular', 'Golang', 'Kubernetes'],
      access: 'premium'
    },
    {
      id: 'twin-2',
      name: 'Startup MVP Environment',
      description: 'Simulated environment for rapid MVP development',
      features: ['Agile Workflow', 'CI/CD Pipeline', 'User Testing'],
      technologyStack: ['React', 'Node.js', 'MongoDB'],
      access: 'standard'
    }
  ],
  
  aiCompanions: [
    {
      id: 'companion-1',
      name: 'CodeBuddy',
      expertise: ['JavaScript', 'React', 'Web Development'],
      personalityTraits: ['Helpful', 'Patient', 'Detailed'],
      chatHistory: [
        { user: 'student-456', message: 'How do I use React hooks?', timestamp: new Date(Date.now() - 86400000).toISOString() },
        { companion: 'companion-1', message: 'React hooks are functions that let you "hook into" React state and lifecycle features from function components...', timestamp: new Date(Date.now() - 86390000).toISOString() }
      ],
      challenges: [
        { id: 'challenge-1', title: 'Create a custom hook', difficulty: 'Intermediate', description: 'Create a custom React hook that manages form state' },
        { id: 'challenge-2', title: 'Optimize renders with useMemo', difficulty: 'Advanced', description: 'Use useMemo to optimize rendering performance' }
      ]
    }
  ],
  
  credentials: [
    {
      id: 'cred-1',
      name: 'React Developer Certificate',
      description: 'Certifies proficiency in React development',
      issuedTo: 'admin-123',
      issueDate: new Date(Date.now() - 7776000000).toISOString(), // 90 days ago
      expiryDate: new Date(Date.now() + 23328000000).toISOString(), // 270 days from now
      skills: ['React', 'JavaScript', 'Frontend Development'],
      verificationHash: '0x3a2b1c4d5e6f7a8b9c0d1e2f3a4b5c6d',
      issuer: 'React Certification Board'
    }
  ],
  
  metaverseEvents: [
    {
      id: 'event-1',
      name: 'Virtual Hackathon',
      description: 'A 48-hour coding competition in the metaverse',
      startDate: new Date(Date.now() + 604800000).toISOString(), // 7 days from now
      endDate: new Date(Date.now() + 777600000).toISOString(), // 9 days from now
      participants: ['admin-123', 'student-456'],
      maxParticipants: 50,
      prizes: ['$1000 in tokens', 'Premium subscriptions', 'NFT badges'],
      location: { x: 0, y: 0, z: 0, worldId: 'main-campus' }
    }
  ],
  
  codeVisualizations: [
    {
      id: 'viz-1',
      name: 'React Component Tree',
      description: '3D visualization of React component hierarchy',
      codebase: 'https://github.com/example/react-app',
      lastGenerated: new Date(Date.now() - 86400000).toISOString(),
      type: 'component-tree',
      screenshot: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ],
  
  collaborativeSessions: [
    {
      id: 'collab-1',
      name: 'Team Project Alpha',
      description: 'Collaborative development of a web application',
      members: ['admin-123', 'student-456'],
      repository: 'https://github.com/example/team-alpha',
      activeUsers: ['admin-123'],
      chatHistory: [
        { userId: 'admin-123', message: 'I\'ve set up the project structure', timestamp: new Date(Date.now() - 3600000).toISOString() },
        { userId: 'student-456', message: 'Great! I\'ll work on the UI components', timestamp: new Date(Date.now() - 3540000).toISOString() }
      ],
      sharedEditorContent: '// App.js\nimport React from "react";\n\nfunction App() {\n  return <div>Hello World</div>;\n}\n\nexport default App;'
    }
  ],
  
  tokens: [
    {
      id: 'token-1',
      userId: 'admin-123',
      balance: 500,
      transactions: [
        { type: 'EARN', amount: 100, description: 'Completed React course', timestamp: new Date(Date.now() - 604800000).toISOString() },
        { type: 'SPEND', amount: 50, description: 'Premium template purchase', timestamp: new Date(Date.now() - 432000000).toISOString() }
      ]
    },
    {
      id: 'token-2',
      userId: 'student-456',
      balance: 100,
      transactions: [
        { type: 'EARN', amount: 100, description: 'Signup bonus', timestamp: new Date(Date.now() - 1209600000).toISOString() }
      ]
    }
  ]
};

// Add simple delay to simulate network latency
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API response
const mockResponse = (data, status = 200) => ({
  data,
  status,
  headers: {},
  config: {},
  statusText: status === 200 ? 'OK' : 'Error'
});

// Mock API error
const mockError = (message, status = 400) => {
  const error = new Error(message);
  error.response = {
    data: { message },
    status,
    headers: {},
    config: {},
    statusText: 'Error'
  };
  return Promise.reject(error);
};

// Mock users for authentication
const MOCK_USERS = [
  {
    id: 'admin-123',
    username: 'admin',
    email: 'admin@gmail.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'ADMIN',
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff'
  },
  {
    id: 'student-456',
    username: 'student',
    email: 'student@gmail.com',
    firstName: 'Student',
    lastName: 'User',
    role: 'STUDENT',
    avatar: 'https://ui-avatars.com/api/?name=Student+User&background=2D8A5A&color=fff'
  }
];

// Helper function to handle various endpoints and return appropriate mock data
const handleEndpoint = (url) => {
  // Virtual Campus endpoints
  if (url.includes('/virtual-campus/buildings')) {
    // Handle specific building ID
    const buildingIdMatch = url.match(/\/buildings\/([a-zA-Z0-9-]+)/);
    if (buildingIdMatch) {
      const buildingId = buildingIdMatch[1];
      const building = MOCK_DATA.virtualCampus.buildings.find(b => b.id === buildingId);
      return building || null;
    }
    
    // Return all buildings
    return MOCK_DATA.virtualCampus.buildings;
  }
  
  if (url.includes('/virtual-campus/avatars')) {
    return MOCK_DATA.virtualCampus.avatars;
  }
  
  // VR Sessions endpoints
  if (url.includes('/vr-sessions')) {
    // Handle specific session ID
    const sessionIdMatch = url.match(/\/vr-sessions\/([a-zA-Z0-9-]+)/);
    if (sessionIdMatch) {
      const sessionId = sessionIdMatch[1];
      const session = MOCK_DATA.vrSessions.find(s => s.id === sessionId);
      return session || null;
    }
    
    // Return all sessions
    return MOCK_DATA.vrSessions;
  }
  
  // Virtual Classrooms endpoints
  if (url.includes('/classrooms')) {
    // Handle specific classroom ID
    const classroomIdMatch = url.match(/\/classrooms\/([a-zA-Z0-9-]+)/);
    if (classroomIdMatch) {
      const classroomId = classroomIdMatch[1];
      const classroom = MOCK_DATA.virtualClassrooms.find(c => c.id === classroomId);
      return classroom || null;
    }
    
    // Return all classrooms
    return MOCK_DATA.virtualClassrooms;
  }
  
  // Digital Twins endpoints
  if (url.includes('/digital-twins')) {
    // Handle specific twin ID
    const twinIdMatch = url.match(/\/digital-twins\/([a-zA-Z0-9-]+)/);
    if (twinIdMatch) {
      const twinId = twinIdMatch[1];
      const twin = MOCK_DATA.digitalTwins.find(t => t.id === twinId);
      return twin || null;
    }
    
    // Return all digital twins
    return MOCK_DATA.digitalTwins;
  }
  
  // AI Companions endpoints
  if (url.includes('/ai-companions')) {
    // Handle specific companion ID
    const companionIdMatch = url.match(/\/ai-companions\/([a-zA-Z0-9-]+)/);
    if (companionIdMatch) {
      const companionId = companionIdMatch[1];
      const companion = MOCK_DATA.aiCompanions.find(c => c.id === companionId);
      return companion || null;
    }
    
    // Return all companions
    return MOCK_DATA.aiCompanions;
  }
  
  // Credentials endpoints
  if (url.includes('/credentials')) {
    // Handle specific credential ID
    const credentialIdMatch = url.match(/\/credentials\/([a-zA-Z0-9-]+)/);
    if (credentialIdMatch) {
      const credentialId = credentialIdMatch[1];
      const credential = MOCK_DATA.credentials.find(c => c.id === credentialId);
      return credential || null;
    }
    
    // Return all credentials
    return MOCK_DATA.credentials;
  }
  
  // Metaverse endpoints
  if (url.includes('/metaverse/events')) {
    // Handle specific event ID
    const eventIdMatch = url.match(/\/events\/([a-zA-Z0-9-]+)/);
    if (eventIdMatch) {
      const eventId = eventIdMatch[1];
      const event = MOCK_DATA.metaverseEvents.find(e => e.id === eventId);
      return event || null;
    }
    
    // Return all events
    return MOCK_DATA.metaverseEvents;
  }
  
  // Code visualizations endpoints
  if (url.includes('/code-visualizations')) {
    // Handle specific visualization ID
    const vizIdMatch = url.match(/\/code-visualizations\/([a-zA-Z0-9-]+)/);
    if (vizIdMatch) {
      const vizId = vizIdMatch[1];
      const viz = MOCK_DATA.codeVisualizations.find(v => v.id === vizId);
      return viz || null;
    }
    
    // Return all visualizations
    return MOCK_DATA.codeVisualizations;
  }
  
  // Collaborative sessions endpoints
  if (url.includes('/collab-sessions')) {
    // Handle specific session ID
    const sessionIdMatch = url.match(/\/collab-sessions\/([a-zA-Z0-9-]+)/);
    if (sessionIdMatch) {
      const sessionId = sessionIdMatch[1];
      const session = MOCK_DATA.collaborativeSessions.find(s => s.id === sessionId);
      return session || null;
    }
    
    // Return all collaborative sessions
    return MOCK_DATA.collaborativeSessions;
  }
  
  // Tokens endpoints
  if (url.includes('/tokens')) {
    // Handle user-specific tokens
    const userIdMatch = url.match(/\/users\/([a-zA-Z0-9-]+)\/tokens/);
    if (userIdMatch) {
      const userId = userIdMatch[1];
      return MOCK_DATA.tokens.find(t => t.userId === userId) || { userId, balance: 0, transactions: [] };
    }
    
    // Return all tokens
    return MOCK_DATA.tokens;
  }
  
  // Courses endpoints
  if (url.includes('/courses')) {
    // Handle specific course ID
    const courseIdMatch = url.match(/\/courses\/([a-zA-Z0-9-]+)/);
    if (courseIdMatch && !url.includes('/instructor/') && !url.includes('/level/') && !url.includes('/category/')) {
      const courseId = courseIdMatch[1];
      const course = MOCK_DATA.courses.find(c => c.id === courseId);
      return course || null;
    }
    
    // Handle courses by instructor
    if (url.includes('/instructor/')) {
      const instructorIdMatch = url.match(/\/instructor\/([a-zA-Z0-9-]+)/);
      if (instructorIdMatch) {
        const instructorId = instructorIdMatch[1];
        return MOCK_DATA.courses.filter(c => c.instructor === instructorId);
      }
    }
    
    // Handle courses by level
    if (url.includes('/level/')) {
      const levelMatch = url.match(/\/level\/([a-zA-Z0-9-]+)/);
      if (levelMatch) {
        const level = levelMatch[1];
        return MOCK_DATA.courses.filter(c => c.level.toLowerCase() === level.toLowerCase());
      }
    }
    
    // Handle courses by category
    if (url.includes('/category/')) {
      const categoryMatch = url.match(/\/category\/([a-zA-Z0-9-]+)/);
      if (categoryMatch) {
        const category = categoryMatch[1];
        return MOCK_DATA.courses.filter(c => c.category.toLowerCase() === category.toLowerCase());
      }
    }
    
    // Handle featured courses
    if (url.includes('/featured')) {
      return MOCK_DATA.courses.filter(c => c.isFeatured);
    }
    
    // Handle course search
    if (url.includes('/search')) {
      const searchParams = new URLSearchParams(url.split('?')[1]);
      const title = searchParams.get('title');
      if (title) {
        return MOCK_DATA.courses.filter(c => 
          c.title.toLowerCase().includes(title.toLowerCase())
        );
      }
    }
    
    // Handle courses by tags
    if (url.includes('/tags')) {
      const searchParams = new URLSearchParams(url.split('?')[1]);
      const tags = searchParams.get('tags');
      if (tags) {
        const tagArray = tags.split(',');
        return MOCK_DATA.courses.filter(c => 
          c.tags.some(tag => tagArray.includes(tag))
        );
      }
    }
    
    // Return all courses
    return MOCK_DATA.courses;
  }
  
  // Users endpoints
  if (url.includes('/users') && !url.includes('/users/me') && !url.includes('/tokens')) {
    // Handle specific user ID
    const userIdMatch = url.match(/\/users\/([a-zA-Z0-9-]+)/);
    if (userIdMatch) {
      const userId = userIdMatch[1];
      const user = MOCK_USERS.find(u => u.id === userId);
      return user || null;
    }
    
    // Return all users
    return MOCK_USERS;
  }
  
  // Default fallback
  return { message: 'Mock data retrieved successfully' };
};

// Create mock API methods
const api = {
  // Mock GET requests
  get: async (url) => {
    await delay();
    
    // If URL includes "users/me" - return the current user
    if (url.includes('/users/me')) {
      // Check for token
      const token = localStorage.getItem('token');
      if (!token) {
        return mockError('Unauthorized', 401);
      }
      
      // Find user from token
      const userId = token.includes('admin') ? 'admin-123' : 'student-456';
      const user = MOCK_USERS.find(u => u.id === userId);
      
      return mockResponse(user);
    }
    
    // For all other requests, use the endpoint handler
    const data = handleEndpoint(url);
    if (data === null) {
      return mockError('Resource not found', 404);
    }
    
    return mockResponse(data);
  },
  
  // Mock POST requests
  post: async (url, data) => {
    await delay();
    
    // Handle auth endpoint
    if (url.includes('/auth')) {
      if (url.includes('/login')) {
        // Check credentials against mock users
        const { username, password } = data;
        const user = MOCK_USERS.find(
          u => (u.username === username || u.email === username) && password === 'password'
        );
        
        if (user) {
          return mockResponse({
            token: `mock-token-${user.id}`,
            user
          });
        } else {
          return mockError('Invalid credentials', 401);
        }
      }
      
      if (url.includes('/register')) {
        return mockResponse({ message: 'Registration successful' });
      }
    }
    
    // For any other POST request, return a mock success with the data
    return mockResponse({ 
      ...data, 
      id: 'mock-id-' + Date.now(),
      createdAt: new Date().toISOString()
    });
  },
  
  // Mock PUT requests
  put: async (url, data) => {
    await delay();
    
    // Get the ID from the URL
    const idMatch = url.match(/\/([a-zA-Z0-9-]+)(?:\/)?$/);
    const id = idMatch ? idMatch[1] : 'unknown';
    
    return mockResponse({ 
      ...data, 
      id, 
      updatedAt: new Date().toISOString() 
    });
  },
  
  // Mock DELETE requests
  delete: async (url) => {
    await delay();
    return mockResponse({ message: 'Resource deleted successfully' });
  }
};

export default api; 