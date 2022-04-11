const express = require('express');

const userRouter = express.Router();
const userService = require('../services/userService');
const newUserValidates = require('../middlewares/createUserValidate');

userRouter.post('/', newUserValidates, async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    const newUser = { displayName, email, password, image };
    const response = await userService.creatUser(newUser);
    if (response) return res.status(201).json({ token: response });
  } catch (error) {
    next(error);
  }
});
module.exports = userRouter;