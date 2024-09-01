// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import './index.css'; // Import your global CSS file

const CLIENT_ID = '610747845268-slmna79ev773a3bp5uhem52u21n645o2.apps.googleusercontent.com'; // Replace with your actual Google Client ID

ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Router>
        <App />
      </Router>
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
