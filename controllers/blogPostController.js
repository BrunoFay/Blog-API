const express = require('express');

const blogPostRouter = express.Router();
const blogPostService = require('../services/blogPostService');
const blogPostValidate = require('../middlewares/blogPostValidate');
const tokenJWTValidate = require('../auth/tokenJWTValidate');

blogPostRouter.post('/', tokenJWTValidate, blogPostValidate, async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const blogPostInfos = { title, content, categoryIds };
    const response = await blogPostService.creatPost(blogPostInfos);
    const { id: userId } = req.user.dataValues;
    const formatedResponse = { ...response, userId };
    return res.status(201).json(formatedResponse);
  } catch (error) {
    next(error);
  }
});
module.exports = blogPostRouter;