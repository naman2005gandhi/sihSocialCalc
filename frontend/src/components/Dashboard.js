// src/components/Dashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Helper function to evaluate simple expressions
const evaluateExpression = (expression) => {
  try {
    // Evaluates the expression safely
    return Function(`"use strict"; return (${expression})`)();
  } catch {
    return "Error";
  }
};

function Dashboard() {
  const navigate = useNavigate();

  // State for spreadsheet cells
  const [cells, setCells] = useState(Array(10).fill().map(() => Array(10).fill('')));

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('isAuthenticated');
    navigate('/login'); // Redirect to login page after logout
  };

  const handleChange = (rowIndex, colIndex, value) => {
    const newCells = [...cells];
    newCells[rowIndex][colIndex] = value;
    setCells(newCells);
  };

  return (
    <div className="dashboard">
      <h2>Google Spreadsheet Clone</h2>
      <button onClick={handleLogout}>Logout</button>
      <table>
        <tbody>
          {cells.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
