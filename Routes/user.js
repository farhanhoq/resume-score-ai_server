const express = require('express');
const router = express.Router();
const register = require('../Controllers/user').register;

router.post('/', register);

module.exports = router;