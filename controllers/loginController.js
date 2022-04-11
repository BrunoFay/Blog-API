const express = require('express');

const loginRouter = express.Router();
const loginService = require('../services/loginService');
const loginValidate = require('../middlewares/loginValidate');

loginRouter.post('/', loginValidate, (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userLoginInfos = { email, password };
    const response = loginService(userLoginInfos);
    return res.status(200).json({ token: response });
  } catch (error) {
    next(error);
  }
});
module.exports = loginRouter;