const code = require('../../helpers/statusCode');
const { Category, BlogPost } = require('../../models');

const validateBlogPost = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  
  if (!title) {
    return res.status(code.BAD_REQUEST).json({ message: '"title" is required' });
  }
  
  if (!content) {
    return res.status(code.BAD_REQUEST).json({ message: '"content" is required' });
  }
  
  if (!categoryIds) {
    return res.status(code.BAD_REQUEST).json({ message: '"categoryIds" is required' });
  }

  const categories = await Category.findAll({ raw: true });

  if (!categories.some(({ id }) => categoryIds.includes(id))) {
    return res.status(code.BAD_REQUEST).json({ message: '"categoryIds" not found' });
  }
  next();
};

const validateBlogById = async (req, res, next) => {
  const { id } = req.params;
  const blogPost = await BlogPost.findOne({ where: { id } });

  if (!blogPost) {
    return res.status(code.NOT_FOUND).json({ message: 'Post does not exist' });
  }
  next();
};

module.exports = {
  validateBlogPost,
  validateBlogById,
};