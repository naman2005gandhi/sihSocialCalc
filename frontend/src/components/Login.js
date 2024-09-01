// src/components/Login.js
import React from 'react';
import './Login.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const CLIENT_ID = '610747845268-slmna79ev773a3bp5uhem52u21n645o2.apps.googleusercontent.com'; // Replace with your Google Client ID

function Login() {
  const navigate = useNavigate();

  const handleSuccess = (response) => {
    // Handle success scenario, e.g., save token and redirect
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/spreadsheet'); // Redirect to the spreadsheet after successful login
  };

  const handleError = (error) => {
    // Handle error scenario
    console.error('Login Failed:', error);
  };

  const handleContinueWithoutLogin = () => {
    // Redirect to the bypass route
    navigate('/continue-without-login');
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </GoogleOAuthProvider>
      <button onClick={handleContinueWithoutLogin} className="continue-without-login">
        Continue Without Login
      </button>
    </div>
  );
}

export default Login;
