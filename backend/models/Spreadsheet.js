const mongoose = require('mongoose');

const CellSchema = new mongoose.Schema({
  row: Number,
  column: Number,
  value: String,
  formula: String
});

const SpreadsheetSchema = new mongoose.Schema({
  name: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  data: [CellSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Spreadsheet', SpreadsheetSchema);
