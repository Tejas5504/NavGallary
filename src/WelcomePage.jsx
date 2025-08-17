import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <h1>Welcome to Your Media Gallery</h1>
      <p>Please log in or create an account to continue.</p>
      <div className="welcome-actions">
        <Link to="/login" className="welcome-btn">Login</Link>
        <Link to="/signup" className="welcome-btn signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default WelcomePage;