// Ensure dotenv is required and configured only once
const dotenv = require('dotenv');
dotenv.config();  // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


// Routes (example)
const patientRoutes = require('./routes/userRoutes');
app.use('/api/patient', patientRoutes);

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
