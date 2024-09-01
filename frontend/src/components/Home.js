// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
// import './Home.css'; // Make sure this file exists

function Home() {
  return (
    <div className="home">
      <h1>Welcome to SocialCalc</h1>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default Home;
