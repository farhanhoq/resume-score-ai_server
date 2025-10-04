const express = require('express');
const router = express.Router();
const resumeController = require('../Controllers/resume');
const { upload } = require('../utils/multer');
const connectDB = require('../conn');

// Add connection handling to routes
router.post('/resume', upload.single('resume'), async (req, res, next) => {
  try {
    await connectDB();
    await resumeController.addResume(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/get/:user', async (req, res, next) => {
  try {
    await connectDB();
    await resumeController.getAllResumeForUser(req, res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;