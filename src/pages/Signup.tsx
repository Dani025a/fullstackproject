import React from 'react'
import { Link } from 'react-router-dom'
import './signup.css';


const Signup = () => {
  return (
    <div className="website__signup-container">
    <div className="website__signup-box">
      <h2>Sign Up</h2>
      <form>
      <input 
            type="text"
            placeholder="First Name"
          />
          <input 
            type="text"
            placeholder="Last Name"
          />
          <input 
            type="email" 
            placeholder="Email" 
          />
          <input 
            type="password" 
            placeholder="Password" 
          />
          <input 
            type="tel" 
            placeholder="Phone Number" 
          />
        <button type="submit" className="website__signup-button">
          Sign Up
        </button>
      </form>
      <p>
        Do have an account? <Link to="/signin" className="website__signup-signin-link">Sign In</Link>
      </p>
    </div>
  </div>
  )
}

export default Signup