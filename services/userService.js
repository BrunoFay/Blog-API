const jwt = require('jsonwebtoken');
const { User } = require('../modelsSequelize/models');
require('dotenv').config();

const encryptPassword = (password) => {
  const jwtConfig = {
    algorithm: 'HS256',
  };
  const passwordToDB = jwt.sign({ data: { password } }, process.env.JWT_SECRET, jwtConfig);
  return passwordToDB;
}

const creatUser = async (userInfos) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const user = { ...userInfos, password: encryptPassword(userInfos.password) };
  await User.create(user);
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