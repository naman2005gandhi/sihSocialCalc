// src/components/FormulaBar.js
import React from 'react';

const FormulaBar = ({ activeCell, onFormulaChange, cellValue }) => {
  return (
    <div className="formula-bar">
      <input
        type="text"
        value={cellValue || ''}
        placeholder={activeCell ? `Formula for Cell (${activeCell.row}, ${activeCell.col})` : 'Select a cell'}
        onChange={(e) => onFormulaChange(e.target.value)}
      />
    </div>
  );
};

export default FormulaBar;
