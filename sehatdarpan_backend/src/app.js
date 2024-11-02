const dotenv = require('dotenv');
dotenv.config();

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

const doctorRoutes = require('./routes/doctorRoutes');
app.use('/api/doctor', doctorRoutes);

const hospitalRoutes = require('./routes/hospitalRoutes');
app.use('/api/hospital', hospitalRoutes);

const clinicRoutes = require('./routes/clinicRoutes');
app.use('/api/clinic', clinicRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
