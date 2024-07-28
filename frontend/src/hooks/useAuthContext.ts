// src/hooks/useAuthContext.ts
import { useContext } from 'react';
import { AuthContext, AuthContextProps } from '../context/AuthContext'; // Importing the type

const useAuthContext = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export default useAuthContext;
