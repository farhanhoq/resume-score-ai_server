const express = require('express');
const router = express.Router();
const resumeController = require('../Controllers/resume ');
const {upload} = require('../utils/multer');

router.post('/resume', upload.single('resume'), resumeController.addResume);
router.get('/get/:user', resumeController.getAllResumeForUser);

module.exports = router;