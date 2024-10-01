// src/LoginPage.jsx
import React from 'react';
import './LoginPage.css';  // Import the CSS for styling

const LoginPage = ({ onLogin }) => {
  return (
    <div className="login-page">
      <h1>Welcome to Moodify</h1>
      <button className="login-button" onClick={onLogin}>Get Started</button>
    </div>
  );
};

export default LoginPage;
