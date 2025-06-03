import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import api from '../services/api.mock';

// Define User interface
interface User {
  id: string;
  name: string;
  email: string;
  role?: 'ADMIN' | 'STUDENT' | 'INSTRUCTOR';
  avatar?: string;
}

// Mock user type with password
interface MockUser extends User {
  password: string;
}

// Auth Context type
interface AuthContextType {
  user: User | null;
  error: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (emailOrToken: string, passwordOrUserData: string | User) => Promise<User>;
  register: (userData: any) => Promise<User>;
  logout: () => void;
  hasRole: (role: string) => boolean;
}

// Mock user data for quick login
const MOCK_USERS: MockUser[] = [
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

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  error: null,
  isLoading: false,
  isAuthenticated: false,
  login: async () => ({ id: '', name: '', email: '' }),
  register: async () => ({ id: '', name: '', email: '' }),
  logout: () => {},
  hasRole: () => false
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user from localStorage on initial render
  useEffect(() => {
    // Check for existing user in localStorage
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Failed to parse stored user data:', err);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    
    setIsLoading(false);
  }, []);

  // Login function - supports both email/password and token/userData
  const login = async (emailOrToken: string, passwordOrUserData: string | User): Promise<User> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Case 1: Called with token and userData (from login/register pages)
      if (typeof passwordOrUserData !== 'string') {
        const userData = passwordOrUserData;
        const token = emailOrToken;
        
        // Set user data
        setUser(userData);
        setIsAuthenticated(true);
        
        // Store in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
        
        return userData;
      }
      // Case 2: Called with email and password (direct login)
      else {
        const email = emailOrToken;
        const password = passwordOrUserData;
        
        // For mock implementation, check against MOCK_USERS directly
        const mockUser = MOCK_USERS.find(u => 
          u.email === email && u.password === password
        );
        
        if (!mockUser) {
          throw new Error('Invalid email or password');
        }
        
        // Create a user object without the password
        const { password: _, ...userWithoutPassword } = mockUser;
        
        // Set user data
        setUser(userWithoutPassword);
        setIsAuthenticated(true);
        
        // Store in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        localStorage.setItem('token', `mock-token-${mockUser.id}`);
        
        return userWithoutPassword;
      }
    } catch (err: any) {
      setError(err.message || 'Failed to login');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData: any): Promise<User> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // For mock implementation, create a new user
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        role: 'STUDENT',
        avatar: `https://ui-avatars.com/api/?name=${userData.firstName}+${userData.lastName}&background=4CAF50&color=fff`
      };
      
      // Return the new user
      return newUser;
    } catch (err: any) {
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
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Check if user has a specific role
  const hasRole = (role: string): boolean => {
    if (!user || !user.role) return false;
    return user.role === role;
  };

  // Context value
  const value: AuthContextType = {
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

// Custom hook to use the auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext; 