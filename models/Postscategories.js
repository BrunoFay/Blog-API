module.exports = (sequelize, _DataTypes) => {
  const PostsCategorie = sequelize.define('PostsCategorie',
    {},
    { timestamps: false, tableName: 'PostsCategories' });
  PostsCategorie.associate = (models) => {
    models.Categorie.belongsToMany(models.Blogpost, {
      as: 'posts',
      through: PostsCategorie,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.Blogpost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostsCategorie,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return PostsCategorie;
};
