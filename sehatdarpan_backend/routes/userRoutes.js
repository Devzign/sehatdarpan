const express = require('express');
const { patientRegister , patientLogin} = require('../controllers/userController');
const router = express.Router();

// Route for Patient Registration
router.post('/register', patientRegister);

router.post('/login', patientLogin);

module.exports = router;
