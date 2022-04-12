const express = require('express');

const blogPostRouter = express.Router();
const blogPostService = require('../services/blogPostService');
const blogPostValidate = require('../middlewares/blogPostValidate');
const blogPostUpdateValidate = require('../middlewares/blogPostUpdateValidate');
const [
  checkIfPostExist,
  checkIfPostBelongsToUser] = require('../middlewares/blogPostUpdateValidate');
const tokenJWTValidate = require('../auth/tokenJWTValidate');

blogPostRouter.post('/', tokenJWTValidate, blogPostValidate, async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id: userId } = req.user.dataValues;
    const blogPostInfos = { title, content, categoryIds, userId };
    const response = await blogPostService.creatPost(blogPostInfos);
    return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

blogPostRouter.get('/', tokenJWTValidate, async (req, res, next) => {
  try {
    const response = await blogPostService.listAllPosts();
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

blogPostRouter.get('/:id', tokenJWTValidate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await blogPostService.listPostById(id);
    if (!response) return res.status(404).json({ message: 'Post does not exist' });
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});
blogPostRouter.put('/:id',
  tokenJWTValidate,
  blogPostUpdateValidate, async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const postToEdit = { title, content };
      const response = await blogPostService.editPostById(postToEdit, id);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  });

blogPostRouter.delete('/:id',
  tokenJWTValidate,
  checkIfPostExist,
  checkIfPostBelongsToUser, async (req, res, next) => {
    try {
      const { id } = req.params;
      await blogPostService.removePostById(id);
      return res.status(204).end();
    } catch (error) {
      next(error);
    }
  });

module.exports = blogPostRouter;