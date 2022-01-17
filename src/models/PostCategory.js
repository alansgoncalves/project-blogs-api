const PostCategory = (sequelize, _DataTypes) => {
  const PostsCategory = sequelize.define('PostsCategory', {},
    { timestamps: false, tableName: 'PostsCategories' });

  PostsCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogposts',
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

module.exports = PostCategory;