const mongoose = require('mongoose');

const clinicSchema = new mongoose.Schema({
    clinicName: {
        type: String,
        required: true,
    },
    clinicAddress: {
        type: String,
        required: true,
    },
    clinicPhoneNumber: {
        type: String,
        required: true,
    },
    clinicEmail: {
        type: String,
        required: true,
        unique: true,
    },
    clinicRegistrationNumber: {
        type: String,
        required: true,
        unique: true,
    },
    clinicSpecializations: [String],
    workingHours: {
        type: String,
        required: true,
    },
    doctors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DoctorUser',
    }],
});

module.exports = mongoose.model('Clinic', clinicSchema);
