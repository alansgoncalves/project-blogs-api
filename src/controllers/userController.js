const service = require('../services/userService');
const statusCode = require('../helpers/statusCode');

const createUser = async (req, res) => {
  const user = req.body;

  const token = await service.createUser(user);

  return res.status(statusCode.CREATED).json(token);
};

const userLogin = async (req, res) => {
  const user = req.body;

  const token = await service.userLogin(user);
  return res.status(statusCode.OK).json(token);
};

const getAllUsers = async (req, res) => {
  const auth = req.headers.authorization;

  const users = await service.getAllUsers(auth);

  // todo: Fix nested ternary.
  return res.status(statusCode.OK).json(users);
};

module.exports = {
  createUser,
  userLogin,
  getAllUsers,
};