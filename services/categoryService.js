const { Category } = require('../models');

const creatCategory = async (userInfos) => {
  const newCategory = await Category.create(userInfos);
  return newCategory.dataValues;
};

const listAllCategories = async () => {
  const allCategories = await Category.findAll();
  return allCategories;
};
module.exports = {
  creatCategory,
  listAllCategories,
};