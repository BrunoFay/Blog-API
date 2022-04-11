const { BlogPost } = require('../models');

const creatPost = async (postInfos) => {
  const newPost = await BlogPost.create(postInfos);
  return newPost.dataValues;
};

module.exports = {
  creatPost,
};