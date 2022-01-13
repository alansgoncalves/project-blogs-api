/* eslint-disable */
const { User } = require('../models');
const JWT = require('../helpers/JWT');

const createUser = async ({ displayName, email, password, image }) => {
  await User.create({ displayName, email, password, image });

  const token = JWT({ email, password });
  
  return { token };
};

const userLogin = async ({ email, password }) => {
  await User.findOne({ where: { email } });

  const token = JWT({ email, password });
  
  return { token };
};

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: 'password' } });

  return users;
};

module.exports = {
  createUser,
  userLogin,
  getAllUsers,
};