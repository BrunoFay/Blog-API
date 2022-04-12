const { Op } = require('sequelize');
const { BlogPost, User, Category, PostsCategorie } = require('../models');

/* op reference https://sequelize.org/docs/v6/core-concepts/model-querying-basics/ */

const createLinkPostAndCategory = async (categories, postId) => {
  categories.map(async (category) => {
    await PostsCategorie.create({ postId, categoryId: category });
  });
};
const creatPost = async (postInfos) => {
  const postFormated = {
    ...postInfos,
    published: Date.now(),
    updated: Date.now(),
  };
  const newPost = await BlogPost.create(postFormated);
  const newPostResponse = newPost.dataValues;
  await createLinkPostAndCategory(postInfos.categoryIds, newPostResponse.id);
  return newPostResponse;
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

const editPostById = async (postUpdated, id) => {
  await BlogPost.update(
    { title: postUpdated.title, content: postUpdated.content },
    { where: { id } },
  );
  const postEdited = await BlogPost
    .findOne({
      where: { id },
      include: [
        {
          model: Category,
          as: 'categories',
          through: { attributes: [] },

        }],
      attributes: { exclude: ['id', 'published', 'updated'] },
    });
  return postEdited;
};
const removePostById = async (id) => {
  await BlogPost.destroy({ where: { id } });
};
const getPostByQuery = async (query) => {
  const post = await BlogPost.findAll({
    where: {
      [Op.or]:
        [{ title: { [Op.substring]: query } },
        { content: { [Op.substring]: query } }],
    },
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
  editPostById,
  removePostById,
  getPostByQuery,
};