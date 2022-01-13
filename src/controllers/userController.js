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

  return res.status(statusCode.OK).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await service.getUserById(id);

  return res.status(statusCode.OK).json(user);
};

module.exports = {
  createUser,
  userLogin,
  getAllUsers,
  getUserById,
};