# Mock API and Authentication System

This document explains how the mock API and authentication system works in this project.

## Overview

The application has been configured to work completely offline, without any backend connectivity. This is achieved through:

1. A mock API implementation (`api.mock.js`)
2. A client-side authentication system (`AuthContext.tsx`)
3. Mock data for users, courses, and other entities

## Mock API Implementation

The mock API is implemented in `services/api.mock.js`. It simulates API responses for various endpoints including:

- Authentication (login/register)
- Courses
- Coding problems
- User profiles
- Virtual campus features
- And more

### How It Works

The mock API:
- Intercepts requests that would normally go to the server
- Returns predefined data based on the endpoint
- Simulates network latency with delays
- Handles errors and authentication

## Authentication System

The authentication system is implemented in both JavaScript and TypeScript formats:

- `contexts/AuthContext.js` - JavaScript implementation for maximum browser compatibility
- `contexts/AuthContext.tsx` - TypeScript implementation with type safety

Both versions offer the same functionality:

- User login/logout functionality
- Session persistence using localStorage
- Role-based access control
- Registration capabilities
- Support for both email/password login and direct token/user login

### Dual Login Method Support

Both implementations support two methods of login:

1. Traditional method: `login(email, password)`
2. Direct method: `login(token, userData)`

This flexibility allows the authentication system to handle both normal login flows and special cases like demo logins or social authentication.

### Demo Accounts

For testing purposes, the following demo accounts are available:

| Role   | Email             | Password   |
|--------|-------------------|------------|
| Admin  | admin@gmail.com   | admin123   |
| Student| student@gmail.com | student123 |

### Usage in Components

To use the authentication system in your components:

```jsx
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout, hasRole } = useAuth();
  
  // Example usage
  if (isAuthenticated) {
    // User is logged in
    console.log(user.name);
    
    // Check role
    if (hasRole('ADMIN')) {
      // Admin-specific functionality
    }
  }
  
  // Login function
  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      // Login success
    } catch (error) {
      // Handle login error
    }
  };
  
  // Logout function
  const handleLogout = () => {
    logout();
    // Handle logout (redirect, etc.)
  };
  
  return (
    // Component JSX
  );
}
```

## Protected Routes

The application includes a `ProtectedRoute` component that works with the auth context to restrict access to certain routes:

```jsx
<Route path="/dashboard" element={
  <ProtectedRoute>
    <DashboardPage />
  </ProtectedRoute>
} />

<Route path="/admin" element={
  <ProtectedRoute requiredRole="ADMIN">
    <AdminDashboardPage />
  </ProtectedRoute>
} />
```

## Benefits of the Mock System

1. **Offline Development**: Develop and test without an active backend
2. **Consistent Testing Data**: Predefined data ensures consistent testing scenarios
3. **Fast Development**: No wait times for API responses or backend setup
4. **Easy Demos**: Showcase the application without dependency on server infrastructure
5. **Isolated Frontend Development**: Frontend developers can work independently

## Transitioning to a Real Backend

When ready to connect to a real backend:

1. Create an API service that uses actual HTTP requests
2. Update the AuthContext to use the real API
3. Adjust any mock-specific behavior in components

## File Structure

```
client/src/
├── services/
│   └── api.mock.js      # Mock API implementation
├── contexts/
│   └── AuthContext.tsx  # Authentication context and provider
├── components/
│   └── common/
│       └── ProtectedRoute.jsx  # Route protection component
└── pages/
    └── auth/
        ├── LoginPage.jsx       # Login page implementation
        └── RegisterPage.jsx    # Registration page implementation
``` 