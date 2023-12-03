import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSignIn from '../hooks/useSignIn';
import './signin.css';
const Signin = () => {
  const {
    email,
    password,
    error,
    isLoading,
    setEmail,
    setPassword,
    signIn,
  } = useSignIn();

  const navigate = useNavigate();

const handleSubmit = async (e: { preventDefault: () => void }) => {
  e.preventDefault();
  await signIn();
  if (!error) {
    navigate('/home');
  } else {
    console.error('Sign-in error:', error);
  }
};

  return (
    <div className="website__signin-container">
      <div className="website__signin-box">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="website__signin-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="website__signin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="website__signin-button" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        {error && <p className="website__signin-error">{error}</p>}
        <p>
          Don't have an account?{' '}
          <Link to="/signup" className="website__signin-signup-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
