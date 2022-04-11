const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const creatUser = async (userInfos) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  await User.create(userInfos);
  const token = jwt.sign({ data: userInfos }, process.env.JWT_SECRET, jwtConfig);
  return token;
};

const checkIfEmailExist = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};
module.exports = {
  creatUser,
  checkIfEmailExist,
};