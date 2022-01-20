const jwt = require('jsonwebtoken');
const code = require('../../helpers/statusCode');
const { Category, BlogPost, User } = require('../../models');

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

const validateUpdateBlog = async (req, res, next) => {
  const { id } = req.params;
  const { categoryIds, title, content } = req.body;
  const { user: { email } } = jwt.decode(req.headers.authorization, 'seusecrettoken');
  const { id: postId } = await User.findOne({ where: { email } });
  const { userId } = await BlogPost.findOne({ where: { id: Number(id) } });
  if (userId !== postId) { 
    return res.status(code.UNAUTHORIZED).json({ message: 'Unauthorized user' }); 
  }

  if (categoryIds) {
    return res.status(code.BAD_REQUEST).json({ message: 'Categories cannot be edited' });
  }

  if (!title) {
    return res.status(code.BAD_REQUEST).json({ message: '"title" is required' });
  }
  
  if (!content) {
    return res.status(code.BAD_REQUEST).json({ message: '"content" is required' });
  }
  next();
};

const validateDeleteBlog = async (req, res, next) => {
  const { id } = req.params;
  const { user: { email } } = jwt.decode(req.headers.authorization, 'seusecrettoken'); 
  const { id: postId } = await User.findOne({ where: { email } }); 
  const { dataValues: { userId } } = await BlogPost.findOne({ where: { id: Number(id) } }); 
  if (userId !== postId) { 
    return res.status(code.UNAUTHORIZED).json({ message: 'Unauthorized user' }); 
  }
  next();
};

module.exports = {
  validateBlogPost,
  validateBlogById,
  validateUpdateBlog,
  validateDeleteBlog,
};
