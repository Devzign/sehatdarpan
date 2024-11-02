const Clinic = require('../models/Clinic');
const { validateEmail, validatePhoneNumber } = require('../utils/validation');

exports.registerClinic = async (req, res) => {
    const {
        clinicName,
        clinicAddress,
        clinicPhoneNumber,
        clinicEmail,
        clinicRegistrationNumber,
        clinicSpecializations,
        workingHours,
        doctors,
    } = req.body;

    console.log("Request Body:", req.body);

    try {
        // Validate email
        if (!validateEmail(clinicEmail)) {
            return res.status(400).json({
                message: 'Invalid email format. Example: example@example.com'
            });
        }

        // Validate phone number
        if (!validatePhoneNumber(clinicPhoneNumber)) {
            return res.status(400).json({
                message: 'Invalid phone number format. Please enter a 10-digit number, e.g., 1234567890'
            });
        }

        // Check if the clinic already exists
        const clinicExists = await Clinic.findOne({
            $or: [{ clinicEmail }, { clinicRegistrationNumber }]
        });
        if (clinicExists) {
            return res.status(400).json({ message: 'Clinic already exists' });
        }

        // Create new clinic
        const newClinic = new Clinic({
            clinicName,
            clinicAddress,
            clinicPhoneNumber,
            clinicEmail,
            clinicRegistrationNumber,
            clinicSpecializations,
            workingHours,
            doctors,
        });

        // Save clinic in the database
        await newClinic.save();

        res.status(201).json({
            message: 'Clinic registered successfully',
            clinicId: newClinic._id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
