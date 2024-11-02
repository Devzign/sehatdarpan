const Hospital = require('../models/Hospital');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { validatePassword, validateEmail, validatePhoneNumber } = require('../utils/validation');

exports.hospitalRegister = async (req, res) => {
    const {
        hospitalName,
        adminContactPerson,
        adminEmail,
        adminMobileNumber,
        registrationNumber,
        address,
        numberOfBeds,
        availableMedicalServices,
        subscriptionPlan,
        password
    } = req.body;

    try {
        // Validate email and password
        if (!validateEmail(adminEmail)) {
            return res.status(400).json({ message: 'Invalid email format.' });
        }
        if (!validatePassword(password)) {
            return res.status(400).json({ message: 'Password requirements not met.' });
        }

        // Check for duplicate entries in adminMobileNumber, registrationNumber, or adminEmail
        const hospitalExists = await Hospital.findOne({
            $or: [
                { registrationNumber },
                { adminEmail },
                { adminMobileNumber }
            ]
        });
        if (hospitalExists) {
            return res.status(400).json({ message: 'Hospital with this email, mobile number, or registration number already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a 16-character hospital card number
        const hospitalCardNumber = crypto.randomBytes(8).toString('hex').toUpperCase();

        // Create new hospital record
        const newHospital = new Hospital({
            hospitalName,
            adminContactPerson,
            adminEmail,
            adminMobileNumber,
            registrationNumber,
            address,
            numberOfBeds,
            availableMedicalServices,
            subscriptionPlan,
            password: hashedPassword,
            hospitalCardNumber
        });

        await newHospital.save();

        res.status(201).json({
            message: 'Hospital registered successfully',
            hospitalCardNumber: newHospital.hospitalCardNumber
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.hospitalLogin = async (req, res) => {
    const { identifier, password } = req.body;

    try {
        // Find hospital by either admin email or hospital card number
        const hospital = await Hospital.findOne({
            $or: [{ adminEmail: identifier }, { hospitalCardNumber: identifier }]
        });

        // Check if hospital exists
        if (!hospital) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Verify the password
        const isMatch = await bcrypt.compare(password, hospital.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ hospitalId: hospital._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({
            message: 'Login successful',
            token,
            hospital: {
                id: hospital._id,
                hospitalName: hospital.hospitalName,
                adminEmail: hospital.adminEmail,
                hospitalCardNumber: hospital.hospitalCardNumber
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


