import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './signup.css';

const Signup = () => {
  const [step, setStep] = useState(1);
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: ''
  });
  const [addressDetails, setAddressDetails] = useState({
    zip_code: '',
    street_name: '',
    street_number: '',
    city: ''
  });

  const handleUserChange = (e: { target: { name: any; value: any; }; }) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e: { target: { name: any; value: any; }; }) => {
    setAddressDetails({ ...addressDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
    }
  };

  return (
    <div className="website__signup-container">
      <div className="website__signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <input type="text" name="firstName" placeholder="First Name" value={userDetails.firstName} onChange={handleUserChange} />
              <input type="text" name="lastName" placeholder="Last Name" value={userDetails.lastName} onChange={handleUserChange} />
              <input type="email" name="email" placeholder="Email" value={userDetails.email} onChange={handleUserChange} />
              <input type="password" name="password" placeholder="Password" value={userDetails.password} onChange={handleUserChange} />
              <button type="button" onClick={() => setStep(2)} className="website__signup-button">Next</button>
            </>
          )}
          {step === 2 && (
            <>
              <input type="text" name="zip_code" placeholder="Zip Code" value={addressDetails.zip_code} onChange={handleAddressChange} />
              <input type="text" name="street_name" placeholder="Street Name" value={addressDetails.street_name} onChange={handleAddressChange} />
              <input type="text" name="street_number" placeholder="Street Number" value={addressDetails.street_number} onChange={handleAddressChange} />
              <input type="text" name="city" placeholder="City" value={addressDetails.city} onChange={handleAddressChange} />
              <div className="form-navigation">
                <button type="submit" className="website__signup-button">Sign Up</button>
                 <button type="button" onClick={() => setStep(1)} className="website__previous-button">Previous</button>
              </div>
            </>
          )}
        </form>
        {step === 1 && (
          <p>
            Do have an account? <Link to="/signin" className="website__signup-signin-link">Sign In</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Signup;
