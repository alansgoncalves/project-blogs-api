const service = require('../services/postService');
const statusCode = require('../helpers/statusCode');

const createPost = async (req, res) => {
  const blogPost = req.body;
  const token = req.headers.authorization;
  const createdPost = await service.createPost(token, blogPost);
  return res.status(statusCode.CREATED).json(createdPost);
};

const getAllBlogPosts = async (_req, res) => {
  const blogPosts = await service.getAllBlogPosts();
  return res.status(statusCode.OK).json(blogPosts);
};

module.exports = {
  createPost,
  getAllBlogPosts,
};
