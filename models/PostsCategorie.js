module.exports = (sequelize, _DataTypes) => {
  const PostsCategory = sequelize.define('PostsCategorie',
    {},
    { timestamps: false, tableName: 'PostsCategories' });
  PostsCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: PostsCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostsCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return PostsCategory;
};
