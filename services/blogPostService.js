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
const checkIfPostExistInDb = async (id) => {
  const postExist = await BlogPost.findByPk(id);
  return postExist;
};
const listPostById = async (id) => {
  const postValidate = await checkIfPostExistInDb(id);
  if (!postValidate) return false;
  const post = await BlogPost
    .findOne({
      where: { id },
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
  return post;
};

module.exports = {
  creatPost,
  listAllPosts,
  listPostById,

};