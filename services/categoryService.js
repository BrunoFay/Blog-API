const { Category } = require('../modelsSequelize/models');

const creatCategory = async (categoryInfos) => {
  const newCategory = await Category.create(categoryInfos);
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