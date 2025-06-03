import React, { createContext, useState, useEffect, useContext } from 'react';

// Create AuthContext
const AuthContext = createContext(null);

// Mock user data
const MOCK_USERS = [
  {
    id: 'admin-123',
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: 'admin123',
    role: 'ADMIN',
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff'
  },
  {
    id: 'student-456',
    name: 'Student User',
    email: 'student@gmail.com',
    password: 'student123',
    role: 'STUDENT',
    avatar: 'https://ui-avatars.com/api/?name=Student+User&background=2D8A5A&color=fff'
  }
];

// AuthProvider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for user in localStorage on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        // Clear invalid data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    
    setIsLoading(false);
  }, []);

  // Flexible login function that supports both methods:
  // 1. login(email, password) - Traditional login
  // 2. login(token, userData) - Direct login with token and user data
  const login = async (emailOrToken, passwordOrUserData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Case 1: Login with token and userData object
      if (typeof passwordOrUserData === 'object') {
        const userData = passwordOrUserData;
        const token = emailOrToken;
        
        // Set user data
        setUser(userData);
        setIsAuthenticated(true);
        
        // Store in localStorage for persistence
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        return userData;
      } 
      // Case 2: Login with email and password
      else {
        const email = emailOrToken;
        const password = passwordOrUserData;
        
        // Find the user in the mock data
        const mockUser = MOCK_USERS.find(u => u.email === email && u.password === password);
        
        if (!mockUser) {
          throw new Error('Invalid email or password');
        }
        
        // Create a user object without the password
        const { password: _, ...userWithoutPassword } = mockUser;
        
        // Set user data
        setUser(userWithoutPassword);
        setIsAuthenticated(true);
        
        // Store in localStorage for persistence
        localStorage.setItem('token', `mock-token-${mockUser.id}`);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        
        return userWithoutPassword;
      }
    } catch (err) {
      setError(err.message || 'Failed to login');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Create a new user object
      const newUser = {
        id: `user-${Date.now()}`,
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        role: 'STUDENT',
        avatar: `https://ui-avatars.com/api/?name=${userData.firstName}+${userData.lastName}&background=4CAF50&color=fff`
      };
      
      return newUser;
    } catch (err) {
      setError(err.message || 'Failed to register');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Check if user has a specific role
  const hasRole = (role) => {
    if (!user || !user.role) return false;
    return user.role === role;
  };

  // Auth context value
  const value = {
    user,
    error,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    hasRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext; 