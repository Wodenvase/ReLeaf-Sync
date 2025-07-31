import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name: string, role: User['role']) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthToken {
  token: string;
  expiresAt: number;
  user: User;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Password validation utility
const validatePassword = (password: string): { isValid: boolean; error?: string } => {
  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters long' };
  }
  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one lowercase letter' };
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one uppercase letter' };
  }
  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one number' };
  }
  if (!/(?=.*[@$!%*?&])/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one special character (@$!%*?&)' };
  }
  return { isValid: true };
};

// Email validation utility
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Generate secure token
const generateToken = (): string => {
  return 'token_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36);
};

// Simulated user database (in real app, this would be a backend API)
const mockUsers = new Map<string, { user: User; password: string }>();

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored authentication token
    const checkAuth = async () => {
      try {
        const storedAuth = localStorage.getItem('releaf_auth_token');
        if (storedAuth) {
          const authData: AuthToken = JSON.parse(storedAuth);
          
          // Check if token is expired
          if (Date.now() < authData.expiresAt) {
            setUser(authData.user);
            setIsAuthenticated(true);
          } else {
            // Token expired, remove it
            localStorage.removeItem('releaf_auth_token');
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        localStorage.removeItem('releaf_auth_token');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      // Validate email format
      if (!validateEmail(email)) {
        return { success: false, error: 'Please enter a valid email address' };
      }

      // Validate password
      if (password.length < 1) {
        return { success: false, error: 'Password is required' };
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user exists in mock database
      const userData = mockUsers.get(email);
      
      if (!userData) {
        return { success: false, error: 'Invalid email or password' };
      }

      if (userData.password !== password) {
        return { success: false, error: 'Invalid email or password' };
      }

      // Generate authentication token
      const token = generateToken();
      const expiresAt = Date.now() + (24 * 60 * 60 * 1000); // 24 hours

      const authToken: AuthToken = {
        token,
        expiresAt,
        user: userData.user
      };

      // Store authentication data
      localStorage.setItem('releaf_auth_token', JSON.stringify(authToken));
      
      setUser(userData.user);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, role: User['role']): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      // Validate email format
      if (!validateEmail(email)) {
        return { success: false, error: 'Please enter a valid email address' };
      }

      // Validate password
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        return { success: false, error: passwordValidation.error };
      }

      // Validate name
      if (name.trim().length < 2) {
        return { success: false, error: 'Name must be at least 2 characters long' };
      }

      // Check if user already exists
      if (mockUsers.has(email)) {
        return { success: false, error: 'An account with this email already exists' };
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name: name.trim(),
        role,
        organizationId: role !== 'individual' ? 'org_' + Date.now() : undefined,
        createdAt: new Date().toISOString()
      };

      // Store user in mock database
      mockUsers.set(email, { user: newUser, password });

      // Generate authentication token
      const token = generateToken();
      const expiresAt = Date.now() + (24 * 60 * 60 * 1000); // 24 hours

      const authToken: AuthToken = {
        token,
        expiresAt,
        user: newUser
      };

      // Store authentication data
      localStorage.setItem('releaf_auth_token', JSON.stringify(authToken));
      
      setUser(newUser);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('releaf_auth_token');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      isLoading, 
      isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  );
};