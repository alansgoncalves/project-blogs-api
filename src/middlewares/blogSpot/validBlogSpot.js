const code = require('../../helpers/statusCode');
const { Category } = require('../../models');

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

module.exports = {
  validateBlogPost,
};