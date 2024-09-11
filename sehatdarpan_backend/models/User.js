const mongoose = require('mongoose');

// User Schema for Patients
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  userMobileNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  userDob: {
    type: Date,
    required: true,
  },
  userGender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other'],
  },
  userAddress: {
    type: String,
    required: true,
    trim: true,
  },
  userAadharNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  medicalHistory: {
    type: String,
    trim: true,
  },
  insuranceInformation: {
    type: String,
    trim: true,
  },
  medicalCardNumber: {
    type: String,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

module.exports = mongoose.model('User', userSchema);


