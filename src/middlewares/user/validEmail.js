const { User } = require('../../models');
const code = require('../../helpers/statusCode');

const validateEmail = async (req, res, next) => {
  const { email } = req.body;

  if (email === undefined) {
    return res.status(code.BAD_REQUEST).json({ message: '"email" is required' });
  }

    if (!/^[a-z\d]+@[a-z\d]+\.com$/.test(email)) {
    return res.status(code.BAD_REQUEST)
    .json({ message: '"email" must be a valid email' });
  }

  const userExists = await User.findOne({ where: { email } });

  if (userExists) { 
    return res.status(code.CONFLICT)
  .json({ message: 'User already registered' });
  }
  next();
};

module.exports = {
  validateEmail,
};