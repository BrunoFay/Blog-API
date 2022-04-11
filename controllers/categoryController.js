const express = require('express');

const categoryRouter = express.Router();
const categoryService = require('../services/categoryService');
const newCategoryValidates = require('../middlewares/createCategoryValidate');
const tokenJWTValidate = require('../auth/tokenJWTValidate');

categoryRouter.post('/', tokenJWTValidate, newCategoryValidates, async (req, res, next) => {
  try {
    const { name } = req.body;
    const newCategory = { name };
    const response = await categoryService.creatCategory(newCategory);
    if (response) return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

categoryRouter.get('/', tokenJWTValidate, async (req, res, next) => {
  try {
    const response = await categoryService.listAllCategories();
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = categoryRouter;