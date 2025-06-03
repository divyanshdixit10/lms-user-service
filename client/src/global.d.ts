// Type definitions for our JavaScript components

// AuthContext types
declare module "../../contexts/AuthContext" {
  interface AuthContextType {
    currentUser: any;
    loading: boolean;
    error: string | null;
    login: (username: string, password: string) => Promise<any>;
    register: (userData: any) => Promise<any>;
    logout: () => void;
    updateCurrentUser: (userData: any) => void;
    isAuthenticated: boolean;
    hasRole: (role: string) => boolean;
  }
  
  const AuthContext: React.Context<AuthContextType>;
  export const AuthProvider: React.FC<{children: React.ReactNode}>;
  export default AuthContext;
}

// Protected Route props
declare module "../../components/common/ProtectedRoute" {
  interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: string | null;
  }
  
  const ProtectedRoute: React.FC<ProtectedRouteProps>;
  export default ProtectedRoute;
}

// AI Assistant props
declare module "../components/ai/AIAssistant" {
  interface AIAssistantProps {
    contextMessage: string;
  }
  
  const AIAssistant: React.FC<AIAssistantProps>;
  export default AIAssistant;
} 