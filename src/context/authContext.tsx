import Cookies from 'js-cookie';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type AuthContextValue = {
  isLogged: boolean;
  token: string | null;
  login: (token: string, expirationTime: number) => void;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = Cookies.get('token');
    if (storedToken) {
      const parsedToken = JSON.parse(atob(storedToken.split('.')[1]));
      const expirationTime = parsedToken.exp * 1000;

      if (Date.now() < expirationTime) {
        setToken(storedToken);
        setIsLogged(true);

        const timeout = expirationTime - Date.now();
        setTimeout(() => {
          logout();
        }, timeout);
      } else {
        logout();
      }
    }
  }, []);

  const login = (newToken: string, expirationTime: number) => {
    setToken(newToken);
    setIsLogged(true);

    const timeout = expirationTime - Date.now();
    setTimeout(() => {
      logout();
    }, timeout);

    Cookies.set('token', newToken);

  };

  const logout = () => {
    setToken(null);
    setIsLogged(false);
    Cookies.remove('token');
    Cookies.remove('id');
    Cookies.remove('expirationTime');
  };

  const contextValue: AuthContextValue = {
    isLogged,
    token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};