const express = require('express');
const router = express.Router();
const resumeController = require('../Controllers/resume ').addResume;
const {upload} = require('../utils/multer');

router.post('/resume', upload.single('resume'), resumeController);

module.exports = router;