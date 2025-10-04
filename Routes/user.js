const express = require('express');
const router = express.Router();
const userController = require('../Controllers/user');
const connectDB = require('../conn');

router.post('/user', async (req, res, next) => {
  try {
    await connectDB();
    await userController.register(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/users', async (req, res, next) => {
  try {
    await connectDB();
    await userController.getAllUsers(req, res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;