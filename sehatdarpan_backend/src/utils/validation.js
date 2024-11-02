// src/utils/validation.js

// Regular expressions
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const phoneNumberRegex = /^[0-9]{10}$/;

// Validation functions
const validatePassword = (password) => passwordRegex.test(password);
const validateEmail = (email) => emailRegex.test(email);
const validatePhoneNumber = (phoneNumber) => phoneNumberRegex.test(phoneNumber);

module.exports = {
  validatePassword,
  validateEmail,
  validatePhoneNumber,
};
