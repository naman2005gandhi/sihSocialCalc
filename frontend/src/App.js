// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Spreadsheet from './components/Spreadsheet';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/spreadsheet" element={<Spreadsheet />} />
        <Route path="/continue-without-login" element={<Spreadsheet />} />
      </Routes>
    </div>
  );
}

export default App;
