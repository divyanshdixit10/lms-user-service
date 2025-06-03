import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Simple Home component
const Home = () => {
  const { isAuthenticated, user, logout } = useAuth();
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>Home Page</h1>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <button 
            onClick={logout}
            style={{ 
              backgroundColor: '#f44336', 
              color: 'white', 
              padding: '10px 15px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Please <Link to="/login">login</Link> to access your account.</p>
      )}
    </div>
  );
};

// Simple Login component
const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // If already authenticated, redirect to home
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
      // Login success will redirect via the useEffect
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };
  
  const handleQuickLogin = (userType) => {
    if (userType === 'admin') {
      setEmail('admin@gmail.com');
      setPassword('admin123');
    } else {
      setEmail('student@gmail.com');
      setPassword('student123');
    }
  };
  
  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Login Page</h1>
      
      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        
        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        
        <button
          type="submit"
          style={{ 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            padding: '10px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
      </form>
      
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={() => handleQuickLogin('admin')}
          style={{ 
            backgroundColor: '#2196F3', 
            color: 'white', 
            padding: '8px 12px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Use Admin Account
        </button>
        
        <button
          onClick={() => handleQuickLogin('student')}
          style={{ 
            backgroundColor: '#FF9800', 
            color: 'white', 
            padding: '8px 12px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Use Student Account
        </button>
      </div>
      
      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

// Wrapper for Login component with navigation
const Login = () => <LoginComponent />;

// TestApp component
const TestApp = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <nav style={{ 
            backgroundColor: '#333', 
            padding: '10px 20px',
            display: 'flex',
            gap: '15px'
          }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
          </nav>
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default TestApp; 