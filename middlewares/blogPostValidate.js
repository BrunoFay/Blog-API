const { Category } = require('../models');

const validateTitle = (req, res, next) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: '"title" is required' });
  next();
};

const checkIfCategoryExistInDb = (categoryIds) => {
  const response = Promise.all(categoryIds.map(async (categoryId) => {
    const checkCategory = await Category.findByPk(categoryId);
    if (!checkCategory) return true;
  }));
  return response;
};
const validateCategoryIds = async (req, res, next) => {
  const { categoryIds } = req.body;
  if (!categoryIds) return res.status(400).json({ message: '"categoryIds" is required' });
  const hasError = await checkIfCategoryExistInDb(categoryIds);
  if (hasError.includes(true)) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }
  next();
};
const validateContent = (req, res, next) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ message: '"content" is required' });
  next();
};

module.exports = [validateTitle, validateContent, validateCategoryIds];