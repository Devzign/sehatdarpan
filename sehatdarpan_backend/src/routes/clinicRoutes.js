const express = require('express');
const { registerClinic } = require('../controllers/clinicController');

const router = express.Router();

router.post('/register', registerClinic);


module.exports = router;
