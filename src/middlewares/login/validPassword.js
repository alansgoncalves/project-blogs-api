const code = require('../../helpers/statusCode');

const validatePassword = async (req, res, next) => {
  const { password } = req.body;

  if (password === undefined) {
    return res.status(code.BAD_REQUEST)
    .json({ message: '"password" is required' });
  }

  if (!password.length) {
    return res.status(code.BAD_REQUEST)
    .json({ message: '"password" is not allowed to be empty' });
  } 
  next();
};

module.exports = {
  validatePassword,
};
