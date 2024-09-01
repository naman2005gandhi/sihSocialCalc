// src/components/Grid.js
import React, { useState, useCallback } from 'react';
import './Grid.css'; // Import custom styles

const Grid = ({ cells, onCellChange, activeCell, setActiveCell }) => {
  const [editingCell, setEditingCell] = useState(null);

  // Handle double click to edit a cell
  const handleDoubleClick = useCallback((row, col) => {
    setEditingCell({ row, col });
  }, []);

  // Handle change in cell value
  const handleChange = useCallback((e, row, col) => {
    const value = e.target.value;
    onCellChange(row, col, value); // Update cell value
  }, [onCellChange]);

  // Handle when user presses enter or clicks out of the cell
  const handleBlur = useCallback((row, col) => {
    setEditingCell(null);
  }, []);

  // Handle selection of a cell
  const handleCellClick = useCallback((row, col) => {
    setActiveCell({ row, col });
  }, [setActiveCell]);

  return (
    <div className="grid-container">
      <div className="grid-header">
        <div className="grid-header-cell"></div> {/* Top-left corner */}
        {Array.from({ length: 10 }, (_, col) => (
          <div key={col} className="grid-header-cell">
            {String.fromCharCode(65 + col)} {/* A, B, C, ... */}
          </div>
        ))}
      </div>
      <div className="grid-body">
        {Array.from({ length: 20 }, (_, row) => (
          <div key={row} className="grid-row">
            <div className="grid-header-cell">{row + 1}</div> {/* Row numbers */}
            {Array.from({ length: 10 }, (_, col) => {
              const key = `${row}-${col}`;
              return (
                <div
                  key={key}
                  className={`grid-cell ${activeCell?.row === row && activeCell?.col === col ? 'active' : ''}`}
                  onDoubleClick={() => handleDoubleClick(row, col)}
                  onClick={() => handleCellClick(row, col)}
                  style={{
                    fontWeight: cells[row][col].bold ? 'bold' : 'normal',
                    fontStyle: cells[row][col].italic ? 'italic' : 'normal',
                    textDecoration: cells[row][col].underline ? 'underline' : 'none',
                  }}
                >
                  {editingCell?.row === row && editingCell?.col === col ? (
                    <input
                      type="text"
                      value={cells[row][col].value || ''}
                      onChange={(e) => handleChange(e, row, col)}
                      onBlur={() => handleBlur(row, col)}
                      autoFocus
                    />
                  ) : (
                    cells[row][col].value || ''
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
