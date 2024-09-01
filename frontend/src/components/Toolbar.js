// src/components/Toolbar.js
import React from 'react';
import './Toolbar.css';

const Toolbar = ({ onUndo, onRedo, onBold, onItalic, onUnderline, onClearFormatting }) => {
  return (
    <div className="toolbar">
      <button onClick={onUndo}>Undo</button>
      <button onClick={onRedo}>Redo</button>
      <button onClick={onBold}>Bold</button>
      <button onClick={onItalic}>Italic</button>
      <button onClick={onUnderline}>Underline</button>
      <button onClick={onClearFormatting}>Clear Formatting</button>
    </div>
  );
};

export default Toolbar;
