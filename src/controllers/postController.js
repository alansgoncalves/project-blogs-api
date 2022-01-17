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

  const noPosts = blogPosts.map((post) => {
    const { id, title, content, userId, published, updated, user } = post; 
    const categories = post.categories
      .map((category) => ({ id: category.id, name: category.name }));
    return { id, title, content, userId, published, updated, user, categories };
  });

  return res.status(statusCode.OK).json(noPosts);
};

module.exports = {
  createPost,
  getAllBlogPosts,
};