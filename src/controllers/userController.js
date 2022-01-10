const service = require('../services/userService');

const createUser = async (req, res) => {
  const user = req.body;

  const createdUser = await service.createUser(user);

  res.status(201).json(createdUser);
};

module.exports = {
  createUser,
};