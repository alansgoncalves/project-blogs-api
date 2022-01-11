/* eslint-disable */
const { User } = require('../models');
const JWT = require('../helpers/JWT');
const error = require('../helpers/errors');

const createUser = async (user) => {
  const { displayName, email, password, image } = user;

  if (displayName.length < 8) {
    return error('"displayName" length must be at least 8 characters long', 'BAD_REQUEST');
  }

  if (!email) return error('"email" is required', 'BAD_REQUEST');

  if (!password) return error('"password" is required', 'BAD_REQUEST');

  if (password.length !== 6) {
    return error('"password" length must be 6 characters long', 'BAD_REQUEST');
  }

  if (!/^[a-z\d]+@[a-z\d]+\.com$/.test(email)) {
    return error('"email" must be a valid email', 'BAD_REQUEST');
  }

  const userExists = await User.findOne({ where: { email } });

  if (userExists) return error('User already registered', 'CONFLICT');

  await User.create({ displayName, email, password, image });

  const token = JWT({ email, password });
  
  return { status: 'CREATED', token };
};

const userLogin = async (user) => {
  const { email, password } = user;

  if (email === undefined) return error('"email" is required', 'BAD_REQUEST');

  if (password === undefined) return error('"password" is required', 'BAD_REQUEST');

  if (!email.length) return error('"email" is not allowed to be empty', 'BAD_REQUEST');

  if (!password.length) return error('"password" is not allowed to be empty', 'BAD_REQUEST');

  const userExists = await User.findOne({ where: { email } });

  if (!userExists || userExists.dataValues.password !== password) {
    return error('Invalid fields', 'BAD_REQUEST');
  }

  const token = JWT({ email, password });
  
  return { status: 'OK', token };
};

module.exports = {
  createUser,
  userLogin,
};