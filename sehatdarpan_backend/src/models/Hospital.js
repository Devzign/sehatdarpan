const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    hospitalName: {
        type: String,
        required: true,
    },
    adminContactPerson: {
        type: String,
        required: true,
    },
    adminEmail: {
        type: String,
        required: true,
        unique: true,
    },
    adminMobileNumber: {
        type: String,
        required: true,
        unique: true,
    },
    registrationNumber: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    numberOfBeds: {
        type: Number,
        required: true,
    },
    availableMedicalServices: {
        type: [String],
        required: true,
    },
    subscriptionPlan: {
        type: String,
        enum: ['Basic', 'Premium', 'Enterprise'],
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    hospitalCardNumber: {
        type: String,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Creating a model from the schema
const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
