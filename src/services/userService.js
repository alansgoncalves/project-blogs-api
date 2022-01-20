const jwt = require('jsonwebtoken');
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

const getUserById = async (id) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: 'password' } });

  return user;
};

const deleteMySelf = async (token) => {
  const { user: { email } } = jwt.decode(token, 'seusecrettoken'); 
  const { dataValues: { id } } = await User.findOne({ where: { email } });
  await User.destroy({
    where: { id },
  });
};

module.exports = {
  createUser,
  userLogin,
  getAllUsers,
  getUserById,
  deleteMySelf,
};