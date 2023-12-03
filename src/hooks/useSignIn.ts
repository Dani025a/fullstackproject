import { Dispatch, SetStateAction, useState } from 'react';
import axios from 'axios';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone_number: string;
}

interface SignInResult {
  email: string;
  password: string;
  error: string | null;
  isLoading: boolean;
  user: User | null;
  token: string | null;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  signIn: () => Promise<void>;
}

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/sql/",
});

const useSignIn = (): SignInResult => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null); // Initialize token state

  const signIn = async () => {
    try {
      setIsLoading(true);
  
      const response = await apiClient.post('/users/signin', {
        email,
        password,
      });
  
      console.log('Server Response:', response);
  
      const responseToken = response.data.user.token;
      const userData = response.data.user.user;
      console.log(userData)
      localStorage.setItem('user', userData)
      localStorage.setItem('token', responseToken);
  
      setUser(userData);
      setToken(responseToken); 
      setError(null);
    } catch (error: any) {
      console.error('Signin error:', error);
  
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('An error occurred during sign-in');
      }
    } finally {
      setIsLoading(false);
       console.log(localStorage.getItem('token'))
    }
  };
  

  return {
    email,
    password,
    error,
    isLoading,
    user,
    token,
    setEmail,
    setPassword,
    signIn,
  };
};

export default useSignIn;
