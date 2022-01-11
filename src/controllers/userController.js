const service = require('../services/userService');
const { CREATED } = require('../helpers/statusCode');

const createUser = async (req, res) => {
  const user = req.body;

  const createdUser = await service.createUser(user);

  res.status(CREATED).json(createdUser);
};

module.exports = {
  createUser,
};