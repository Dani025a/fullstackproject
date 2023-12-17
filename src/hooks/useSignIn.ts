import { useState } from 'react';
import { useAuth } from '../context/authContext';
import Cookies from 'js-cookie';
import ApiClient from "../services/api-client";


export interface User {
  token: string;
  id: number;
}

const apiClient = new ApiClient<User>("/users/signin");

const useSignIn = () => {
  const { login, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const result = await apiClient.signIn(email, password);

      if (result.error) {
        setError(result.error);
      } else {
        const { token, id, expirationTimeInSeconds } = result;
        
        const expirationTime = Date.now() + expirationTimeInSeconds * 1000;
        login(token, expirationTime);

        Cookies.set('token', token);
        Cookies.set('id', id);
        Cookies.set('expirationTime', expirationTime.toString());

        return { id, token, expirationTime };
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        logout();
        setError('Session expired. Please log in again.');
      } else {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { signIn, isLoading, error };
};

export default useSignIn;
