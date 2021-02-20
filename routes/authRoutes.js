const express = require('express');
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');
const router = express.Router();

// LOGIN A USER
router.post('/login', loginController);
// REGISTER A NEW USER
router.post('/register', registerController);

module.exports = router;