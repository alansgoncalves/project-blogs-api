const code = require('../../helpers/statusCode');

const validateCategory = async (req, res, next) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(code.BAD_REQUEST)
    .json({ message: '"name" is required' });
  } 
  next();
};

module.exports = {
  validateCategory,
};
