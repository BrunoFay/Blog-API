const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const creatUser = async (userInfos) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  await User.create(userInfos);
  const token = jwt.sign({
    data: {
      email: userInfos.email,
      password: userInfos.password,
    },
  }, process.env.JWT_SECRET, jwtConfig);
  return token;
};

const listAllUsers = async () => {
  const allUsers = await User.findAll();
  return allUsers;
};
const listUserById = async (id) => {
  const allUsers = await User.findByPk(id);
  return allUsers ? allUsers.dataValues : null;
};
const findUserById = async (id) => {
  const allUsers = await User.findOne({ where: { id } });
  return allUsers;
};
const checkIfEmailExist = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};
const deleteUserById = async (id) => {
  await User.destroy({ where: { id } });
};
module.exports = {
  creatUser,
  checkIfEmailExist,
  listAllUsers,
  listUserById,
  deleteUserById,
  findUserById,
};