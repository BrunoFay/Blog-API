const { Category } = require('../models');

const creatCategory = async (userInfos) => {
  const newCategory = await Category.create(userInfos);
  return newCategory.dataValues;
};

module.exports = {
  creatCategory,
};