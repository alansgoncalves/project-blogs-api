const service = require('../services/userService');
const statusCode = require('../helpers/statusCode');

const createUser = async (req, res) => {
  const user = req.body;

  const { message, status, token } = await service.createUser(user);

  return res.status(statusCode[status]).json(token ? { token } : { message });
};

module.exports = {
  createUser,
};