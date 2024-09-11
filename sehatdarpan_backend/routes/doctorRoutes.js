const express = require('express');
const { doctorRegister , doctorLogin} = require('../controllers/doctorController');
const router = express.Router();

// Route for Patient Registration
router.post('/register', doctorRegister);

router.post('/login', doctorLogin);

module.exports = router;
