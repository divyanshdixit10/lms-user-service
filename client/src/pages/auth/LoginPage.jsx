import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import osopLogo from '../../assets/images/osop-logo.png';

const LoginPage = () => {
  const { theme } = useTheme();
  const { login, isAuthenticated, error: authError, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the page user was trying to access before being redirected to login
  const from = location.state?.from?.pathname || '/dashboard';
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);
  
  // Update error state when auth error changes
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Please enter both email and password');
      return;
    }
    
    try {
      await login(formData.email, formData.password);
      // Login success is handled by useEffect redirect
    } catch (err) {
      // Error is handled by authError from context
    }
  };
  
  const handleQuickLogin = async (userType) => {
    try {
      if (userType === 'admin') {
        await login('admin@gmail.com', 'admin123');
      } else if (userType === 'student') {
        await login('student@gmail.com', 'student123');
      }
    } catch (err) {
      // Error is handled by authError from context
    }
  };
  
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-12 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="w-full max-w-md">
        {/* Logo and Heading */}
        <div className="text-center mb-6">
          <img 
            src={osopLogo} 
            alt="OSOP-CODING Logo" 
            className="h-12 w-auto mx-auto mb-4" 
          />
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className={`mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Sign in to continue your learning journey
          </p>
        </div>
        
        {/* Login Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } p-6 rounded-lg shadow-md`}
        >
          {error && (
            <div className={`p-3 mb-4 rounded-md text-sm ${
              theme === 'dark' ? 'bg-red-900/50 text-red-200' : 'bg-red-100 text-red-800'
            }`}>
              <p>{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 focus:ring-blue-500'
                      : 'bg-white border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="you@example.com"
                  disabled={isLoading}
                />
              </div>
            </div>
            
            {/* Password Field */}
            <div>
              <div className="flex justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <Link 
                  to="/forgot-password" 
                  className={`text-xs ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 focus:ring-blue-500'
                      : 'bg-white border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className={`h-4 w-4 rounded focus:ring-2 focus:ring-offset-2 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800'
                    : 'bg-white border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-white'
                }`}
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm">
                Remember me
              </label>
            </div>
            
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : theme === 'dark'
                      ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                      : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : 'Sign in'}
              </button>
            </div>
          </form>
        </motion.div>
        
        {/* Quick Login */}
        <div className={`mt-6 p-4 rounded-md ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } shadow-md`}>
          <h3 className="text-sm font-medium mb-3">Quick Login Options</h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickLogin('admin')}
              disabled={isLoading}
              className={`px-3 py-2 rounded text-sm font-medium text-white ${
                theme === 'dark'
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              Login as Admin
            </button>
            <button
              onClick={() => handleQuickLogin('student')}
              disabled={isLoading}
              className={`px-3 py-2 rounded text-sm font-medium text-white ${
                theme === 'dark'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              Login as Student
            </button>
          </div>
          <div className="mt-2 space-y-1 text-xs">
            <div>
              <span className="font-medium">Admin:</span> admin@gmail.com / admin123
            </div>
            <div>
              <span className="font-medium">Student:</span> student@gmail.com / student123
            </div>
          </div>
        </div>
        
        {/* Register Link */}
        <div className="mt-4 text-center">
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
            Don't have an account?{' '}
            <Link
              to="/register"
              className={`font-medium ${
                theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
              }`}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 