const { BlogPost } = require('../models');

const [validateTitle, validateContent] = require('./blogPostValidate');

const checkCategoryExistInRequest = (req, res, next) => {
  const { categoryIds } = req.body;
  if (categoryIds) {
    return res.status(400).json({ message: 'Categories cannot be edited' });
  }
  next();
};
const checkIfPostBelongsToUser = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user.dataValues;
  const post = await BlogPost.findOne({ where: { id } });
  const userIdInPost = post.dataValues.userId;
  if (userIdInPost !== userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  next();
};
const checkIfPostExist = async (req, res, next) => {
  const { id } = req.params;
  const post = await BlogPost.findOne({ where: { id } });
  if (!post) return res.status(404).json({ message: 'Post does not exist' });
  next();
};

module.exports = [
  checkIfPostExist,
  checkIfPostBelongsToUser,
  checkCategoryExistInRequest,
  validateTitle,
  validateContent];