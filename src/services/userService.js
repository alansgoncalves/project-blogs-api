const { User } = require('../models');

console.log(User);
const createUser = async (user) => {
  const { displayName, email, password, image } = user;
  const createdUser = await User.create({ displayName, email, password, image });
  
  return createdUser;
};

module.exports = {
  createUser,
};