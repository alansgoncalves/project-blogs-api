const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
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
  return post;
};

const searchPostByText = async (query) => {
  const searchPosts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { content: { [Op.like]: `%${query}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } }],
  });
  return searchPosts;
};

module.exports = {
  createPost,
  getAllBlogPosts,
  getPostById,
  updatePostById,
  deletePostById,
  searchPostByText,
};