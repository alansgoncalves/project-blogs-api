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

const getPostById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return post;
};

const updatePostById = async (id, { title, content }) => {
  await BlogPost.update(
    { title, content },
    { where: { id: Number(id) } },
  );
  const postUpdated = await BlogPost.findOne({
    where: { id },
    include: [
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
    exclude: [
      'published', 'updated',
    ],
  });
  return postUpdated;
};

const deletePostById = async (id) => {
  const post = await BlogPost.destroy({
    where: { id: Number(id) },
  });
  console.log(id);
  return post;
};

module.exports = {
  createPost,
  getAllBlogPosts,
  getPostById,
  updatePostById,
  deletePostById,
};