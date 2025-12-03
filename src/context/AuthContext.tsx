import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'PROVIDER' | 'CONSUMER') => Promise<boolean>;
  signup: (email: string, password: string, role: 'PROVIDER' | 'CONSUMER') => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isProvider: boolean;
  isConsumer: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('ayurtrace_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string, role: 'PROVIDER' | 'CONSUMER'): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const mockUser: User = {
        id: `user-${Date.now()}`,
        email,
        role,
        providerId: role === 'PROVIDER' ? `prov-${Date.now()}` : undefined,
        walletAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
        createdAt: new Date().toISOString()
      };

      setUser(mockUser);
      localStorage.setItem('ayurtrace_user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const signup = async (email: string, password: string, role: 'PROVIDER' | 'CONSUMER'): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: `user-${Date.now()}`,
        email,
        role,
        providerId: role === 'PROVIDER' ? `prov-${Date.now()}` : undefined,
        walletAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
        createdAt: new Date().toISOString()
      };

      setUser(mockUser);
      localStorage.setItem('ayurtrace_user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Signup failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ayurtrace_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isAuthenticated: !!user,
      isProvider: user?.role === 'PROVIDER',
      isConsumer: user?.role === 'CONSUMER'
    }}>
      {children}
    </AuthContext.Provider>
  );
};