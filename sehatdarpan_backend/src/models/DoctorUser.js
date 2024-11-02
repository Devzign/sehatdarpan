const mongoose = require('mongoose');

const doctorUserSchema = new mongoose.Schema({
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
    specialization: {
      type: String,
      required: true,
      trim: true,
    },
    yearsOfExperience: {
      type: Number,
      required: true,
      min: 0,
    },
    medicalLicenceNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    clinicHospitalAffiliation: {
      type: String,
      trim: true,
    },
    consultationFees: {
      type: Number,
      required: true,
    },
    profilePicture: {
      type: String,
      trim: true,
    },
    workingHours: {
      type: String,
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
    doctorCardNumber: {
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
  
  module.exports = mongoose.model('DoctorUser', doctorUserSchema);