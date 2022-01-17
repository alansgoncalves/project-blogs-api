const jwt = require('jsonwebtoken');
const { BlogPost, User } = require('../models');

const createPost = async (token, blogPost) => {
  const { title, content } = blogPost;
  const { user: { email } } = jwt.decode(token, 'seusecrettoken');
  const { dataValues: { id } } = await User.findOne({ where: { email } });
  const createdBlogPost = await BlogPost.create({ userId: id, title, content });
  return createdBlogPost;
};

module.exports = {
  createPost,
};