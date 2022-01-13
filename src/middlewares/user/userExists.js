const code = require('../../helpers/statusCode');
const { User } = require('../../models');

const checkUserExists = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });

  if (!user) {
    return res.status(code.NOT_FOUND).json({ message: 'User does not exist' });
  }

  next();
};

module.exports = {
  checkUserExists,
};
