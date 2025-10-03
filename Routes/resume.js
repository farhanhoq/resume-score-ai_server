const express = require('express');
const router = express.Router();
const ResumeController = require('../Controllers/resume ').addResume;

router.post('/addResume', ResumeController);


module.exports = router;