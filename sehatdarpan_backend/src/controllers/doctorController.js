
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const DoctorUser = require('../models/DoctorUser');

// Patient Registration Controller
exports.doctorRegister = async (req, res) => {
    const {
        userName,
        userEmail,
        userMobileNumber,
        userDob,
        userGender,
        userAddress,
        userAadharNumber,
        specialization,
        yearsOfExperience,
        medicalLicenceNumber,
        clinicHospitalAffiliation,
        consultationFees,
        profilePicture,
        workingHours,
        password
    } = req.body;

    try {

        const doctorExists = await DoctorUser.findOne({
            $or: [{ userEmail }, { userMobileNumber }, { userAadharNumber }],
        });
        if (doctorExists) {
            return res.status(400).json({ message: 'Doctor already exists' });
        }

        const medicalCardNumber = crypto.randomBytes(8).toString('hex').toUpperCase();
        const hashedPassword = await bcrypt.hash(password, 10);

        const newDoctor = new DoctorUser({
            userName,
            userEmail,
            userMobileNumber,
            userDob,
            userGender,
            userAddress,
            userAadharNumber,
            specialization,
            yearsOfExperience,
            medicalLicenceNumber,
            clinicHospitalAffiliation,
            consultationFees,
            profilePicture,
            workingHours,
            password: hashedPassword,
        });

        await newDoctor.save();

        res.status(201).json({
            message: 'Doctor registered successfully',
            medicalCardNumber: newUser.medicalCardNumber,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


//Doctor Login
exports.doctorLogin = async (req, res) => {
    const { userEmail, password } = req.body;

    try {
        // Find the user by email
        const user = await DoctorUser.findOne({ userEmail });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                userName: user.userName,
                userEmail: user.userEmail
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};