declare module "*.js" {
  // Define the AuthContext interface for TypeScript
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
  
  // Declaration for AuthContext
  const AuthContext: React.Context<AuthContextType>;
  export const AuthProvider: React.FC<{ children: React.ReactNode }>;
  export default AuthContext;
}

// AIAssistant props
interface AIAssistantProps {
  contextMessage: string;
}

// ProtectedRoute props
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string | null;
} 