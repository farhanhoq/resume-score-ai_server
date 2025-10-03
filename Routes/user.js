const express = require('express');
const router = express.Router();
const register = require('../Controllers/user');
const user = require('../Controllers/user');

router.post('/user', register.register);
router.get('/users', user.getAllUsers);

module.exports = router;