const express = require('express');
const router = express.Router();
const register = require('../Controllers/user').register;

router.post('/user', register);

module.exports = router;