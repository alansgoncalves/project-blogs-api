const service = require('../services/userService');

const createUser = (req, res) => {
  const user = req.body;

  const createdUser = service.createUser(user);

  res.status(201).json(createdUser);
};

module.exports = {
  createUser,
};