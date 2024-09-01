// src/components/Spreadsheet.js
import React, { useState, useCallback, useEffect } from 'react';
import Grid from './Grid';
import Toolbar from './Toolbar';
import FormulaBar from './FormulaBar';
import io from 'socket.io-client';

// Connect to the Socket.io server
const socket = io('http://localhost:3000');

const Spreadsheet = () => {
  const [cells, setCells] = useState(createInitialCells());
  const [activeCell, setActiveCell] = useState(null);
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  // Initialize a 10x10 grid
  function createInitialCells() {
    const rows = 100;
    const cols = 100;
    return Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({
        value: '',
        bold: false,
        italic: false,
        underline: false,
      }))
    );
  }

  useEffect(() => {
    // Listen for updates from the server
    socket.on('updateCell', (data) => {
      const { row, col, value, bold, italic, underline } = data;
      updateCellState(row, col, value, bold, italic, underline);
    });

    // Clean up on component unmount
    return () => {
      socket.off('updateCell');
    };
  }, [cells]);

  const updateCellState = (row, col, value, bold = null, italic = null, underline = null) => {
    const updatedCells = cells.map((r, rowIndex) =>
      r.map((c, colIndex) =>
        rowIndex === row && colIndex === col
          ? {
              ...c,
              value,
              bold: bold !== null ? bold : c.bold,
              italic: italic !== null ? italic : c.italic,
              underline: underline !== null ? underline : c.underline,
            }
          : c
      )
    );
    setHistory([...history, cells]); // Save current state to history
    setCells(updatedCells);
    setRedoStack([]); // Clear the redo stack on any new change
  };

  // Handle cell change
  const handleCellChange = useCallback((row, col, value) => {
    socket.emit('editCell', { row, col, value });
    updateCellState(row, col, value);
  }, []);

  // Handle formula change from the formula bar
  const handleFormulaChange = useCallback((formula) => {
    if (activeCell) {
      handleCellChange(activeCell.row, activeCell.col, formula);
    }
  }, [activeCell, handleCellChange]);

  // Undo function
  const handleUndo = useCallback(() => {
    if (history.length > 0) {
      const previousState = history[history.length - 1];
      setRedoStack([cells, ...redoStack]);
      setHistory(history.slice(0, -1));
      setCells(previousState);
    }
  }, [history, cells, redoStack]);

  // Redo function
  const handleRedo = useCallback(() => {
    if (redoStack.length > 0) {
      const nextState = redoStack[0];
      setHistory([...history, cells]);
      setRedoStack(redoStack.slice(1));
      setCells(nextState);
    }
  }, [redoStack, history, cells]);

  // Formatting functions
  const toggleFormatting = useCallback((formatType) => {
    if (activeCell) {
      const { row, col } = activeCell;
      const updatedCells = cells.map((r, rowIndex) =>
        r.map((c, colIndex) =>
          rowIndex === row && colIndex === col
            ? {
                ...c,
                [formatType]: !c[formatType],
              }
            : c
        )
      );
      setCells(updatedCells);
      socket.emit('editCell', {
        row,
        col,
        value: updatedCells[row][col].value,
        [formatType]: updatedCells[row][col][formatType]
      });
    }
  }, [cells, activeCell]);

  const clearFormatting = useCallback(() => {
    if (activeCell) {
      const { row, col } = activeCell;
      const updatedCells = cells.map((r, rowIndex) =>
        r.map((c, colIndex) =>
          rowIndex === row && colIndex === col
            ? {
                ...c,
                bold: false,
                italic: false,
                underline: false,
              }
            : c
        )
      );
      setCells(updatedCells);
      socket.emit('editCell', {
        row,
        col,
        value: updatedCells[row][col].value,
        bold: false,
        italic: false,
        underline: false
      });
    }
  }, [cells, activeCell]);

  return (
    <div>
      <Toolbar
        onUndo={handleUndo}
        onRedo={handleRedo}
        onBold={() => toggleFormatting('bold')}
        onItalic={() => toggleFormatting('italic')}
        onUnderline={() => toggleFormatting('underline')}
        onClearFormatting={clearFormatting}
      />
      <FormulaBar
        activeCell={activeCell}
        onFormulaChange={handleFormulaChange}
        cellValue={activeCell ? cells[activeCell.row][activeCell.col].value : ''}
      />
      <Grid
        cells={cells}
        onCellChange={handleCellChange}
        activeCell={activeCell}
        setActiveCell={setActiveCell}
      />
    </div>
  );
};

export default Spreadsheet;
