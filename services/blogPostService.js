const { BlogPost, User, Category } = require('../models');

const creatPost = async (postInfos) => {
  const newPost = await BlogPost.create(postInfos);
  return newPost.dataValues;
};

const listAllPosts = async () => {
  const allPosts = await BlogPost
    .findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] }, 
      }],
    });
  return allPosts;
};

module.exports = {
  creatPost,
  listAllPosts,
};