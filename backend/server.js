const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

// Socket.io for real-time collaboration
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('editCell', (data) => {
    io.emit('updateCell', data); // Broadcast changes to all clients
  });

  socket.on('disconnect', () => console.log('Client disconnected'));
});

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/spreadsheets', require('./routes/spreadsheetRoutes'));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
