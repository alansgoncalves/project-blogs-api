const code = require('../helpers/statusCode');

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (password === undefined) {
    return res.status(code.BAD_REQUEST)
    .json({ message: '"password" is required' });
  }

  if (password.length !== 6) {
    return res.status(code.BAD_REQUEST)
    .json({ message: '"password" length must be 6 characters long' });
  }
  next();
};

module.exports = {
  validatePassword,
};