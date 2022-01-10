const User = require('../models/User');

const createUser = async (user) => {
  const { displayName, email, password, image } = user;
  const createdUser = await User.create({ displayName, email, password, image });
  
  return createdUser;
};

module.exports = {
  createUser,
};