const service = require('../services/categoryService');
const statusCode = require('../helpers/statusCode');

const createCategory = async (req, res) => {
  const category = req.body;

  const createdCategory = await service.createCategory(category);

  return res.status(statusCode.CREATED).json(createdCategory);
};

module.exports = {
  createCategory,
};
