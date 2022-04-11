const express = require('express');

const userRouter = express.Router();
const userService = require('../services/userService');
const newUserValidates = require('../middlewares/createUserValidate');
const tokenJWTValidate = require('../auth/tokenJWTValidate');

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
userRouter.get('/', tokenJWTValidate, async (req, res, next) => {
  try {
    const response = await userService.listAllUsers();
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});
module.exports = userRouter;