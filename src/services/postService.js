const jwt = require('jsonwebtoken');
const { BlogPost, User, Category } = require('../models');

const createPost = async (token, blogPost) => {
  const { title, content } = blogPost;
  const { user: { email } } = jwt.decode(token, 'seusecrettoken');
  const { dataValues: { id } } = await User.findOne({ where: { email } });
  const createdBlogPost = await BlogPost.create({ userId: id, title, content });
  return createdBlogPost;
};

const getAllBlogPosts = async () => {
  const blogPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return blogPosts;
};

module.exports = {
  createPost,
  getAllBlogPosts,
};