'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const postsCategories = await queryInterface.createTable('PostsCategories', {
      postId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'BlogPosts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
      },
    });

    return postsCategories;
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('PostsCategories');
  },
};