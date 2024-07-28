// src/hooks/useAuth.ts
import { useState } from 'react';
import { AuthTokens } from '../types/auth';

const useAuth = () => {
  const [authTokens, setAuthTokens] = useState<AuthTokens | null>(null);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success) {
        setAuthTokens({ token: data.token, refreshToken: data.refreshToken, name: data.name });
        setError(null); // Clear previous errors
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const logout = () => {
    setAuthTokens(null);
  };

  const refreshToken = async () => {
    if (authTokens?.refreshToken) {
      try {
        const response = await fetch('http://localhost:3000/api/auth/refresh-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken: authTokens.refreshToken }),
        });

        const data = await response.json();
        if (data.success) {
          setAuthTokens({ token: data.token, refreshToken: data.refreshToken, name: data.name });
          setError(null); // Clear previous errors
        } else {
          throw new Error(data.message || 'Refresh token failed');
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        logout(); // Optionally, logout on refresh failure
      }
    }
  };

  return {
    authTokens,
    login,
    logout,
    refreshToken,
    error, // Return error state for handling in components
  };
};

export default useAuth;
