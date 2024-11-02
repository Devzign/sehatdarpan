const express = require('express');
const { hospitalRegister, hospitalLogin } = require('../controllers/hospitalController');

const router = express.Router();

router.post('/register', hospitalRegister);
router.post('/login', hospitalLogin);

module.exports = router;
