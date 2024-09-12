const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Patient Registration Controller
exports.patientRegister = async (req, res) => {
  const {
    userName,
    userEmail,
    userMobileNumber,
    userDob,
    userGender,
    userAddress,
    userAadharNumber,
    medicalHistory,
    insuranceInformation,
    password,
  } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({
      $or: [{ userEmail }, { userMobileNumber }, { userAadharNumber }],
    });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a unique medical card number
    const medicalCardNumber = crypto.randomBytes(8).toString('hex').toUpperCase();

    // Create new user
    const newUser = new User({
      userName,
      userEmail,
      userMobileNumber,
      userDob,
      userGender,
      userAddress,
      userAadharNumber,
      medicalHistory,
      insuranceInformation,
      medicalCardNumber,
      password: hashedPassword,
    });

    // Save user in the database
    await newUser.save();

    res.status(201).json({
      message: 'Patient registered successfully',
      medicalCardNumber: newUser.medicalCardNumber,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

//Patient Login
exports.patientLogin = async (req, res) => {
  const { userEmail, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ userEmail });
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
      expiresIn: '1h', // Token expires in 1 hour
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        userName: user.userName,
        userEmail: user.userEmail,
        medicalCardNumber: user.medicalCardNumber,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};