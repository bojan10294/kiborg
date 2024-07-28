// src/context/AuthContext.tsx
import React, { createContext, ReactNode } from 'react';
import useAuth from '../hooks/useAuth';
import { AuthTokens } from '../types/auth';

export interface AuthContextProps {
  authTokens: AuthTokens | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
