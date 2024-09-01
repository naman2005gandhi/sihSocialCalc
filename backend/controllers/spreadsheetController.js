const Spreadsheet = require('../models/Spreadsheet');

exports.createSpreadsheet = async (req, res) => {
  const { name, owner } = req.body;
  try {
    const spreadsheet = new Spreadsheet({ name, owner, data: [] });
    await spreadsheet.save();
    res.json(spreadsheet);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getSpreadsheet = async (req, res) => {
  try {
    const spreadsheet = await Spreadsheet.findById(req.params.id).populate('owner collaborators');
    res.json(spreadsheet);
  } catch (err) {
    res.status(404).json({ message: 'Spreadsheet not found' });
  }
};
