const code = require('../helpers/statusCode');

const validateDisplay = (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) {
  return res.status(code.BAD_REQUEST)
  .json({ message: '"displayName" length must be at least 8 characters long' });
  }
  next();
};

module.exports = {
  validateDisplay,
};