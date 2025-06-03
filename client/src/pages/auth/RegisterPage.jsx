import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import osopLogo from '../../assets/images/osop-logo.png';

const RegisterPage = () => {
  const { theme } = useTheme();
  const { register, login, isAuthenticated, error: authError, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  // Update error state when auth error changes
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);
  
  // Check password strength
  useEffect(() => {
    const password = formData.password;
    if (!password) {
      setPasswordStrength(0);
      return;
    }
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    
    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 1;
    
    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 1;
    
    // Contains number
    if (/[0-9]/.test(password)) strength += 1;
    
    // Contains special character
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(strength);
  }, [formData.password]);
  
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
    
    // Validate inputs
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (passwordStrength < 3) {
      setError('Password is too weak. Please use a stronger password.');
      return;
    }
    
    if (!formData.acceptTerms) {
      setError('You must accept the terms and conditions');
      return;
    }
    
    try {
      // Register the user
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        username: formData.username,
        password: formData.password
      });
      
      // Log the user in after successful registration
      await login(formData.email, formData.password);
      
      // Redirect happens automatically due to the isAuthenticated useEffect
    } catch (err) {
      // Error is handled by the authError from useEffect
    }
  };
  
  // Get password strength info
  const getPasswordStrengthInfo = () => {
    if (!formData.password) return { text: '', color: '' };
    
    switch(passwordStrength) {
      case 1:
        return { text: 'Very Weak', color: theme === 'dark' ? 'bg-red-500' : 'bg-red-500' };
      case 2:
        return { text: 'Weak', color: theme === 'dark' ? 'bg-orange-500' : 'bg-orange-500' };
      case 3:
        return { text: 'Medium', color: theme === 'dark' ? 'bg-yellow-500' : 'bg-yellow-500' };
      case 4:
        return { text: 'Strong', color: theme === 'dark' ? 'bg-green-500' : 'bg-green-500' };
      case 5:
        return { text: 'Very Strong', color: theme === 'dark' ? 'bg-emerald-500' : 'bg-emerald-500' };
      default:
        return { text: '', color: '' };
    }
  };
  
  const strengthInfo = getPasswordStrengthInfo();
  
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
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className={`mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Join our learning platform
          </p>
        </div>
        
        {/* Registration Form */}
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
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`block w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 focus:ring-blue-500'
                      : 'bg-white border-gray-300 focus:ring-blue-500'
                  }`}
                  disabled={isLoading}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`block w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 focus:ring-blue-500'
                      : 'bg-white border-gray-300 focus:ring-blue-500'
                  }`}
                  disabled={isLoading}
                />
              </div>
            </div>
            
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
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
            
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={formData.username}
                onChange={handleChange}
                className={`block w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 focus:ring-blue-500'
                    : 'bg-white border-gray-300 focus:ring-blue-500'
                }`}
                disabled={isLoading}
              />
            </div>
            
            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
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
              
              {/* Password strength meter */}
              {formData.password && (
                <div className="mt-1">
                  <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${strengthInfo.color}`} 
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs mt-1">
                    Password strength: <span className="font-medium">{strengthInfo.text}</span>
                  </p>
                </div>
              )}
            </div>
            
            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`block w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 focus:ring-blue-500'
                      : 'bg-white border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>
              {formData.password && formData.confirmPassword && 
                formData.password !== formData.confirmPassword && (
                <p className="text-xs mt-1 text-red-500">Passwords do not match</p>
              )}
            </div>
            
            {/* Terms Checkbox */}
            <div className="flex items-center">
              <input
                id="acceptTerms"
                name="acceptTerms"
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className={`h-4 w-4 rounded focus:ring-2 focus:ring-offset-2 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800'
                    : 'bg-white border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-white'
                }`}
                required
              />
              <label htmlFor="acceptTerms" className="ml-2 block text-xs">
                I agree to the{' '}
                <Link 
                  to="/terms" 
                  className={theme === 'dark' ? 'text-blue-400 underline' : 'text-blue-600 underline'}
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link 
                  to="/privacy" 
                  className={theme === 'dark' ? 'text-blue-400 underline' : 'text-blue-600 underline'}
                >
                  Privacy Policy
                </Link>
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
                    Creating account...
                  </span>
                ) : 'Create account'}
              </button>
            </div>
          </form>
        </motion.div>
        
        {/* Login Link */}
        <div className="mt-4 text-center">
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
            Already have an account?{' '}
            <Link
              to="/login"
              className={`font-medium ${
                theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
              }`}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 