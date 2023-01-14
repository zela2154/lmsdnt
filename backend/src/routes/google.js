const express = require('express');
const router = express.Router();
const googleController = require('../controllers/google.js');

router.post('/google-login', googleController.loginWithGoogle);

module.exports = router;
