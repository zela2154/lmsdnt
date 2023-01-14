const express = require('express');
const router = express.Router();
const facebookController = require('../controllers/facebook.js');

router.post('/facebook-login', facebookController.loginWithFacebook);

module.exports = router;
