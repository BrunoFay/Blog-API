module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    password: DataTypes.STRING,
    displayName: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    image: DataTypes.STRING,
  },
    {
      timestamps: false,
      tableName: 'Users',
    });

  User.associate = (models) => {
    User.hasMany(models.BlogPost,
      { foreignKey: 'userId', as: 'user' });
  };

  return User;
};